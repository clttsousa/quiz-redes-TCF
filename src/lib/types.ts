export type Difficulty = 'very_easy' | 'easy' | 'medium' | 'hard'

export interface BankQuestion {
  id: string
  category: string
  difficulty: Difficulty
  q: string
  choices: string[]
  answer: number
  explain?: string
}

export type Mode = 'prova' | 'treino' | 'simulado'

export interface QuizConfig {
  mode: Mode
  difficulty: Difficulty | 'mix'
  count: number
  categories: string[] // empty means all (except simulado which uses a fixed allowlist)
  balanced: boolean
}

export interface RenderQuestion {
  id: string
  category: string
  difficulty: Difficulty
  q: string
  choices: string[]
  answer: number
  explain?: string
  // mapping
  originalAnswer: number
  originalChoices: string[]
}
