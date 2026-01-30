import type { Mode } from '@/lib/types'

export interface Attempt {
  ts: number
  mode: Mode
  difficulty: string
  count: number
  correct: number
  byCategory: Record<string, { correct: number; total: number }>
}

const KEY = 'quiz:attempts'

export function loadAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function saveAttempt(attempt: Attempt) {
  const prev = loadAttempts()
  const next = [attempt, ...prev].slice(0, 30)
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function clearAttempts() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
