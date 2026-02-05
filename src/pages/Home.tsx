import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBank } from '@/bank/BankContext'
import { useQuiz } from '@/quiz/QuizContext'
import type { QuizConfig } from '@/lib/types'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BookOpen, ClipboardList, PlayCircle } from 'lucide-react'

function getLastStudy(): { id: string; title?: string } | null {
  try {
    const raw = localStorage.getItem('study:lastTopic')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function HomePage() {
  const nav = useNavigate()
  const bankState = useBank()
  const { start } = useQuiz()

  const ready = bankState.status === 'ready'

  const last = useMemo(() => getLastStudy(), [])
  const [loadingText, setLoadingText] = useState('Carregando banco de questões…')

  useEffect(() => {
    if (ready) return
    const msgs = ['Carregando banco de questões…', 'Preparando perguntas…', 'Organizando categorias…']
    let i = 0
    const t = setInterval(() => {
      i = (i + 1) % msgs.length
      setLoadingText(msgs[i])
    }, 900)
    return () => clearInterval(t)
  }, [ready])

  const startQuickPractice = () => {
    // Treino rápido: 10 questões, todas as categorias, dificuldade média
    if (bankState.status !== 'ready') return
    const cfg: QuizConfig = {
      mode: 'treino',
      count: 10,
      difficulty: 'medium',
      categories: [],
      balanced: true,
    }
    start(cfg, bankState.bank)
    nav('/quiz')
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl">Treinamento – Redes para Suporte Interno</CardTitle>
              <CardDescription>Estude por apostilas completas e pratique com questões.</CardDescription>
            </div>
            <Badge variant="secondary">Avaliação: 07/02/2026</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!ready ? (
            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <div className="text-sm opacity-80">{loadingText}</div>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Estudar</CardTitle>
                <CardDescription>Apostilas detalhadas, mapas mentais, diagramas e vídeos em PT-BR.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button onClick={() => nav('/study')} className="w-full" disabled={!ready}>
                  Abrir Estudos
                </Button>
                {last?.id ? (
                  <Button variant="secondary" onClick={() => nav(`/study?topic=${encodeURIComponent(last.id)}`)} className="w-full">
                    Continuar: {last.title ?? last.id.toUpperCase()}
                  </Button>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" /> Praticar</CardTitle>
                <CardDescription>Treino rápido ou simulado configurável para fixar o conteúdo.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button onClick={startQuickPractice} className="w-full" disabled={!ready}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Treino rápido (10 questões)
                </Button>
                <Button variant="outline" onClick={() => nav('/quiz/setup')} className="w-full" disabled={!ready}>
                  Configurar simulado / prova
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="rounded-xl border bg-muted/20 p-3 text-sm text-muted-foreground">
            <b>Sugestão de estudo:</b> escolha 1 tema em <span className="font-medium">Estudos</span>, revise o mapa mental e faça <span className="font-medium">10 questões</span> do tema.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
