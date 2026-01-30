import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '@/quiz/QuizContext'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle, RotateCcw, Home, BarChart3 } from 'lucide-react'
import { LessonPanel } from '@/components/LessonPanel'

export function ResultsPage() {
  const { session, reset } = useQuiz()
  const nav = useNavigate()

  useEffect(() => {
    if (!session) nav('/')
  }, [session, nav])

  const summary = useMemo(() => {
    if (!session) return null
    let correct = 0
    const byCat: Record<string, { correct: number; total: number }> = {}
    for (const q of session.questions) {
      const sel = session.answers[q.id]
      const ok = sel === q.answer
      if (ok) correct++
      const bucket = byCat[q.category] ?? { correct: 0, total: 0 }
      bucket.total += 1
      if (ok) bucket.correct += 1
      byCat[q.category] = bucket
    }
    const total = session.questions.length
    const pct = total ? Math.round((correct / total) * 100) : 0
    return { correct, total, pct, byCat }
  }, [session])

  if (!session || !summary) return null

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Resultado</CardTitle>
              <CardDescription>Revisão completa e estatísticas por tema.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{session.config.mode === 'simulado' ? 'Simulado' : session.config.mode === 'treino' ? 'Treino' : 'Prova'}</Badge>
              <Badge variant="secondary">{summary.correct}/{summary.total}</Badge>
              <Badge variant="outline" className="font-mono">{summary.pct}%</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border bg-background/20 p-4">
              <div className="text-sm font-medium">Desempenho</div>
              <div className="mt-2 text-3xl font-semibold">{summary.pct}%</div>
              <div className="text-sm text-muted-foreground">
                {summary.correct} acertos • {summary.total - summary.correct} erros
              </div>
            </div>

            <div className="rounded-2xl border bg-background/20 p-4">
              <div className="text-sm font-medium">Por categoria</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(summary.byCat)
                  .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'))
                  .map(([cat, v]) => {
                    const pct = Math.round((v.correct / v.total) * 100)
                    return (
                      <Badge key={cat} className="bg-primary/10 text-primary">
                        {cat}: {pct}%
                      </Badge>
                    )
                  })}
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-sm font-medium">Revisão</div>
          <div className="grid gap-3">
            {session.questions.map((q, idx) => {
              const sel = session.answers[q.id]
              const ok = sel === q.answer
              return (
                <div key={q.id} className="rounded-2xl border bg-background/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="text-sm font-medium">
                      <span className="text-muted-foreground">{idx + 1}.</span> {q.q}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{q.category}</Badge>
                      {ok ? (
                        <Badge className="bg-primary/10 text-primary">
                          <CheckCircle2 className="mr-1 h-4 w-4" /> Certo
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/10 text-destructive">
                          <XCircle className="mr-1 h-4 w-4" /> Errado
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Sua resposta:</span>{' '}
                      {typeof sel === 'number' ? q.choices[sel] : <span className="text-muted-foreground">não respondida</span>}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Correta:</span> {q.choices[q.answer]}
                    </div>
                    {/* Mini aula (explicação detalhada) */}
                    <LessonPanel q={q} selected={sel as number | undefined} />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => nav('/stats')}>
              <BarChart3 className="mr-2 h-4 w-4" /> Estatísticas
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => { reset(); nav('/') }}>
              <Home className="mr-2 h-4 w-4" /> Início
            </Button>
            <Button onClick={() => { reset(); nav('/') }}>
              <RotateCcw className="mr-2 h-4 w-4" /> Nova prova
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
