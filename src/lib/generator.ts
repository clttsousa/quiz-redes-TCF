import type { BankQuestion, Difficulty, QuizConfig, RenderQuestion } from '@/lib/types'
import { secureRandomInt, shuffleInPlace } from '@/lib/random'

const SIMULADO_ALLOW_CATEGORIES = new Set<string>([
  'Conceitos',
  'Tipos de Rede',
  'Topologias',
  'Equipamentos',
  'TCP/IP',
  'OSI vs TCP/IP',
  'UDP',
  'UDP/TCP',
  'NAT',
  'CGNAT',
  'DHCP',
  'IP Público x Privado',
  'DNS',
  'Sub-rede',
  'Wireless',
  'Roteamento',
])

function profileKey(cfg: QuizConfig) {
  const cats = cfg.mode === 'simulado' ? ['SIMULADO'] : (cfg.categories.length ? cfg.categories.slice().sort() : ['ALL'])
  return `${cfg.mode}|${cfg.difficulty}|${cfg.balanced ? 'bal' : 'free'}|${cats.join(',')}`
}

function loadRecent(key: string): string[] {
  try {
    const raw = localStorage.getItem(`recent:${key}`)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

function saveRecent(key: string, ids: string[], cap: number) {
  const trimmed = ids.slice(-cap)
  localStorage.setItem(`recent:${key}`, JSON.stringify(trimmed))
}

function difficultyMatch(qd: Difficulty, cfg: QuizConfig) {
  if (cfg.difficulty === 'mix') return true
  return qd === cfg.difficulty
}

function filterPool(bank: BankQuestion[], cfg: QuizConfig): BankQuestion[] {
  return bank.filter((q) => {
    if (!difficultyMatch(q.difficulty, cfg)) return false
    if (cfg.mode === 'simulado') return SIMULADO_ALLOW_CATEGORIES.has(q.category)
    if (cfg.categories.length === 0) return true
    return cfg.categories.includes(q.category)
  })
}

function pickFromCategory(
  items: BankQuestion[],
  want: number,
  recentSet: Set<string>,
  picked: Set<string>
): BankQuestion[] {
  if (want <= 0) return []
  // Prefer not recently used
  const fresh = items.filter((q) => !recentSet.has(q.id) && !picked.has(q.id))
  const stale = items.filter((q) => !picked.has(q.id) && recentSet.has(q.id))

  const out: BankQuestion[] = []
  const take = (source: BankQuestion[], n: number) => {
    if (n <= 0 || source.length === 0) return
    const pool = source.slice()
    shuffleInPlace(pool)
    for (const q of pool) {
      if (out.length >= want) break
      if (picked.has(q.id)) continue
      out.push(q)
      picked.add(q.id)
    }
  }

  take(fresh, want)
  if (out.length < want) take(stale, want - out.length)
  return out
}

function balancedPick(pool: BankQuestion[], count: number, recentSet: Set<string>): BankQuestion[] {
  const byCat = new Map<string, BankQuestion[]>()
  for (const q of pool) {
    const arr = byCat.get(q.category) ?? []
    arr.push(q)
    byCat.set(q.category, arr)
  }
  const cats = Array.from(byCat.keys())
  shuffleInPlace(cats)

  const picked = new Set<string>()
  const result: BankQuestion[] = []

  if (cats.length === 0) return []
  const base = Math.floor(count / cats.length)
  let rem = count % cats.length

  for (const cat of cats) {
    const want = base + (rem > 0 ? 1 : 0)
    if (rem > 0) rem -= 1
    const got = pickFromCategory(byCat.get(cat)!, want, recentSet, picked)
    result.push(...got)
    if (result.length >= count) break
  }

  // If still missing (pool small), fill from any
  if (result.length < count) {
    const any = pool.filter((q) => !picked.has(q.id))
    shuffleInPlace(any)
    for (const q of any) {
      if (result.length >= count) break
      result.push(q)
      picked.add(q.id)
    }
  }

  return result.slice(0, count)
}

function freePick(pool: BankQuestion[], count: number, recentSet: Set<string>): BankQuestion[] {
  const picked = new Set<string>()
  const fresh = pool.filter((q) => !recentSet.has(q.id))
  const stale = pool.filter((q) => recentSet.has(q.id))

  const out: BankQuestion[] = []
  const take = (source: BankQuestion[]) => {
    const arr = source.slice()
    shuffleInPlace(arr)
    for (const q of arr) {
      if (out.length >= count) break
      if (picked.has(q.id)) continue
      out.push(q)
      picked.add(q.id)
    }
  }
  take(fresh)
  if (out.length < count) take(stale)
  return out.slice(0, count)
}

function shuffleChoices(q: BankQuestion): RenderQuestion {
  const indexed = q.choices.map((c, i) => ({ c, i }))
  shuffleInPlace(indexed)
  const newAnswer = indexed.findIndex((x) => x.i === q.answer)
  return {
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    q: q.q,
    choices: indexed.map((x) => x.c),
    answer: newAnswer,
    explain: q.explain,
    originalAnswer: q.answer,
    originalChoices: q.choices,
  }
}

export function generateQuiz(bank: BankQuestion[], cfg: QuizConfig): RenderQuestion[] {
  const key = profileKey(cfg)
  const pool = filterPool(bank, cfg)
  if (pool.length === 0) return []

  const recent = loadRecent(key)
  const recentSet = new Set(recent)

  const count = Math.min(Math.max(1, cfg.count), pool.length)

  const picked =
    cfg.balanced ? balancedPick(pool, count, recentSet) : freePick(pool, count, recentSet)

  // update recent (adaptive cap)
  const cap = Math.min(300, Math.max(60, pool.length * 2))
  const newRecent = recent.concat(picked.map((q) => q.id))
  saveRecent(key, newRecent, cap)

  // randomize question order + choices
  const render = picked.map(shuffleChoices)
  shuffleInPlace(render)

  // avoid identical sequence: tiny nudge
  if (render.length > 3 && recent.length > 0) {
    const roll = secureRandomInt(4)
    if (roll === 0) shuffleInPlace(render)
  }

  return render
}

export function simuladoCategories() {
  return Array.from(SIMULADO_ALLOW_CATEGORIES)
}
