import { useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '@/quiz/QuizContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LessonPanel } from '@/components/LessonPanel'

const DIFF_LABEL: Record<string, string> = {
  very_easy: 'Muito fácil',
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
  mix: 'Misto',
}

export function QuizPage() {
  const { session, currentIndex, setCurrentIndex, answer, next, finish } = useQuiz()
  const nav = useNavigate()

  useEffect(() => {
    if (!session) nav('/')
  }, [session, nav])

  const q = session?.questions[currentIndex]
  const total = session?.questions.length ?? 0
  const answeredCount = useMemo(() => {
    if (!session) return 0
    return Object.keys(session.answers).length
  }, [session])

  if (!session || !q) return null

  const selected = session.answers[q.id]
  const isTreino = session.config.mode === 'treino'
  const isAnswered = typeof selected === 'number'
  const progress = total ? Math.round(((currentIndex + 1) / total) * 100) : 0

  const choose = (idx: number) => {
    if (isAnswered) return
    answer(q.id, idx)
    if (!isTreino) {
      // auto-advance on prova/simulado if not last
      if (currentIndex < total - 1) {
        setTimeout(() => next(), 120)
      }
    }
  }

  const goPrev = () => setCurrentIndex(Math.max(0, currentIndex - 1))
  const goNext = () => setCurrentIndex(Math.min(total - 1, currentIndex + 1))

  const finishQuiz = () => {
    finish()
    nav('/results')
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge>{session.config.mode === 'simulado' ? 'Simulado' : session.config.mode === 'treino' ? 'Treino' : 'Prova'}</Badge>
          <Badge variant="secondary">{DIFF_LABEL[session.config.difficulty]}</Badge>
          <Badge variant="outline" className="font-mono">{answeredCount}/{total}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => nav('/')}><ArrowLeft className="mr-2 h-4 w-4" />Config</Button>
          <Button variant="destructive" onClick={finishQuiz}><Flag className="mr-2 h-4 w-4" />Finalizar</Button>
        </div>
      </div>

      <Progress value={progress} />
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-lg">
              <span className="text-muted-foreground">{currentIndex + 1}/{total}</span>{' '}
              <span className="ml-2">{q.q}</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary">{q.category}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-3">
          {q.choices.map((c, idx) => {
            const chosen = selected === idx
            const correct = idx === q.answer
            const showFeedback = isTreino && isAnswered
            const ok = showFeedback && correct
            const bad = showFeedback && chosen && !correct

            return (
              <motion.button
                key={idx}
                onClick={() => choose(idx)}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                animate={bad ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: bad ? 0.35 : 0.2 }}
                className={cn(
                  "group flex w-full items-start justify-between gap-3 rounded-2xl border bg-background/20 px-4 py-3 text-left text-sm transition-all hover:bg-muted hover:-translate-y-0.5 hover:shadow-md",
                  chosen && "border-primary/40 bg-primary/10",
                  ok && "border-primary bg-primary/15",
                  bad && "border-destructive bg-destructive/10",
                  isAnswered && !isTreino && "cursor-default"
                )}
                disabled={isAnswered && !isTreino}
              >
                <div className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground group-hover:text-foreground">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{c}</span>
                </div>

                {showFeedback && (
                  <span className="mt-0.5">
                    {ok ? <CheckCircle2 className="h-5 w-5 text-primary" /> : bad ? <XCircle className="h-5 w-5 text-destructive" /> : null}
                  </span>
                )}
              </motion.button>
            )
          })}

          {isTreino && isAnswered && (
            <LessonPanel q={q} selected={selected as number} />
          )}
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />Anterior
            </Button>
            <Button variant="outline" onClick={goNext} disabled={currentIndex === total - 1}>
              Próxima<ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {isTreino ? (
              <Button onClick={() => (currentIndex === total - 1 ? finishQuiz() : next())} disabled={!isAnswered}>
                {currentIndex === total - 1 ? 'Ver resultado' : 'Continuar'}
              </Button>
            ) : (
              <Button onClick={() => (currentIndex === total - 1 ? finishQuiz() : next())}>
                {currentIndex === total - 1 ? 'Ver resultado' : 'Avançar'}
              </Button>
            )}
          </div>
        </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
        </motion.div>
      </AnimatePresence>
        </motion.div>
      </AnimatePresence>
        </motion.div>
      </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="text-xs text-muted-foreground">
        Dica: em <span className="font-medium text-foreground">Prova/Simulado</span> o resultado aparece só no final.
      </div>
    </div>
  )
}
