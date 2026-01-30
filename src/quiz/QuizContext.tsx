import React, { createContext, useContext, useMemo, useState } from 'react'
import type { BankQuestion, QuizConfig, RenderQuestion } from '@/lib/types'
import { generateQuiz } from '@/lib/generator'
import { saveAttempt } from '@/lib/stats'

interface Session {
  config: QuizConfig
  questions: RenderQuestion[]
  answers: Record<string, number>
  startedAt: number
  finishedAt?: number
}

interface QuizContextValue {
  session: Session | null
  currentIndex: number
  setCurrentIndex: (n: number) => void
  start: (cfg: QuizConfig, bank: BankQuestion[]) => void
  answer: (questionId: string, choiceIndex: number) => void
  next: () => void
  finish: () => void
  reset: () => void
}

const Ctx = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const start = (cfg: QuizConfig, bank: BankQuestion[]) => {
    const questions = generateQuiz(bank, cfg)
    setSession({
      config: cfg,
      questions,
      answers: {},
      startedAt: Date.now(),
    })
    setCurrentIndex(0)
  }

  const answer = (questionId: string, choiceIndex: number) => {
    setSession((s) => {
      if (!s) return s
      return { ...s, answers: { ...s.answers, [questionId]: choiceIndex } }
    })
  }

  const next = () => {
    setCurrentIndex((i) => Math.min(i + 1, (session?.questions.length ?? 1) - 1))
  }

  const finish = () => {
    setSession((s) => {
      if (!s) return s
      const finishedAt = Date.now()
      const byCategory: Record<string, { correct: number; total: number }> = {}
      let correct = 0
      for (const q of s.questions) {
        const sel = s.answers[q.id]
        const isCorrect = sel === q.answer
        if (isCorrect) correct += 1
        const bucket = byCategory[q.category] ?? { correct: 0, total: 0 }
        bucket.total += 1
        if (isCorrect) bucket.correct += 1
        byCategory[q.category] = bucket
      }
      saveAttempt({
        ts: finishedAt,
        mode: s.config.mode,
        difficulty: s.config.difficulty,
        count: s.questions.length,
        correct,
        byCategory,
      })
      return { ...s, finishedAt }
    })
  }

  const reset = () => {
    setSession(null)
    setCurrentIndex(0)
  }

  const value = useMemo(
    () => ({ session, currentIndex, setCurrentIndex, start, answer, next, finish, reset }),
    [session, currentIndex]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useQuiz() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useQuiz deve ser usado dentro de QuizProvider')
  return ctx
}
