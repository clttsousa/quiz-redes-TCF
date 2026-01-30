import type { BankQuestion } from '@/lib/types'

let cached: BankQuestion[] | null = null

export async function loadBank(): Promise<BankQuestion[]> {
  if (cached) return cached
  const res = await fetch('/questions/bank.json', { cache: 'no-cache' })
  if (!res.ok) throw new Error(`Falha ao carregar banco de questões: ${res.status}`)
  const data = (await res.json()) as BankQuestion[]
  cached = data
  return data
}

export function distinctCategories(bank: BankQuestion[]) {
  return Array.from(new Set(bank.map((q) => q.category))).sort((a, b) => a.localeCompare(b, 'pt-BR'))
}
