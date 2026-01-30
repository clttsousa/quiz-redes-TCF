import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '@/quiz/QuizContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, CheckCircle2, Flag, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LessonPanel } from '@/components/LessonPanel'

const DIFF_LABEL: Record<string, string> = {
  very_easy: 'Muito fácil',
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
  mix: 'Misto',
}

function letter(idx: number) {
  return String.fromCharCode(65 + idx)
}

function AnimatedProgress({ value }: { value: number }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/80">
      <motion.div
        className="h-full bg-primary"
        initial={false}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      />
    </div>
  )
}

function RippleButton(
  props: React.ComponentProps<typeof Button> & { ripple?: boolean }
) {
  const { className, ripple = true, onPointerDown, ...rest } = props
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Button
      ref={ref as any}
      className={cn('relative overflow-hidden active:scale-[0.98]', className)}
      onPointerDown={(e) => {
        onPointerDown?.(e)
        if (!ripple) return
        const el = (ref.current as any) as HTMLElement | null
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const s = Math.max(rect.width, rect.height) * 1.1
        const rippleEl = document.createElement('span')
        rippleEl.style.position = 'absolute'
        rippleEl.style.left = `${x - s / 2}px`
        rippleEl.style.top = `${y - s / 2}px`
        rippleEl.style.width = `${s}px`
        rippleEl.style.height = `${s}px`
        rippleEl.style.borderRadius = '999px'
        rippleEl.style.background = 'rgba(255,255,255,0.16)'
        rippleEl.style.transform = 'scale(0)'
        rippleEl.style.opacity = '0.9'
        rippleEl.style.pointerEvents = 'none'
        rippleEl.style.transition = 'transform 520ms ease, opacity 620ms ease'
        el.appendChild(rippleEl)
        requestAnimationFrame(() => {
          rippleEl.style.transform = 'scale(1)'
          rippleEl.style.opacity = '0'
        })
        window.setTimeout(() => {
          rippleEl.remove()
        }, 700)
      }}
      {...rest}
    />
  )
}

export function QuizPage() {
  const { session, currentIndex, setCurrentIndex, answer, next, finish } = useQuiz()
  const nav = useNavigate()
  const [direction, setDirection] = useState<1 | -1>(1)
  const lastConfettiFor = useRef<string | null>(null)

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

  const fireConfetti = () => {
    // confetti bem leve (sem distrair)
    try {
      confetti({
        particleCount: 42,
        spread: 60,
        startVelocity: 16,
        scalar: 0.8,
        ticks: 140,
        gravity: 0.95,
        origin: { x: 0.5, y: 0.2 },
      })
    } catch {
      // ignore
    }
  }

  const choose = (idx: number) => {
    if (isAnswered) return
    answer(q.id, idx)

    // Treino: feedback imediato + mini-aula
    if (isTreino) {
      const correct = idx === q.answer
      if (correct && lastConfettiFor.current !== q.id) {
        lastConfettiFor.current = q.id
        setTimeout(fireConfetti, 60)
      }
      return
    }

    // Prova/Simulado: avança rápido
    if (currentIndex < total - 1) {
      setDirection(1)
      setTimeout(() => next(), 150)
    }
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }
  const goNext = () => {
    setDirection(1)
    setCurrentIndex(Math.min(total - 1, currentIndex + 1))
  }

  const finishQuiz = () => {
    finish()
    nav('/results')
  }

  const showFeedback = isTreino && isAnswered

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge>
            {session.config.mode === 'simulado' ? 'Simulado' : session.config.mode === 'treino' ? 'Treino' : 'Prova'}
          </Badge>
          <Badge variant="secondary">{DIFF_LABEL[session.config.difficulty]}</Badge>
          <Badge variant="outline" className="font-mono">
            {answeredCount}/{total}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => nav('/')}
            className="hover:scale-[1.02] transition">
            <ArrowLeft className="mr-2 h-4 w-4" />Config
          </Button>
          <Button variant="destructive" onClick={finishQuiz} className="hover:scale-[1.02] transition">
            <Flag className="mr-2 h-4 w-4" />Finalizar
          </Button>
        </div>
      </div>

      <AnimatedProgress value={progress} />

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={q.id}
          custom={direction}
          initial={(d) => ({ opacity: 0, x: d * 30, y: 6 })}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={(d) => ({ opacity: 0, x: d * -30, y: -6 })}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Card className="bg-background/30 backdrop-blur supports-[backdrop-filter]:bg-background/25">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-lg md:text-xl">
                  <span className="text-muted-foreground">{currentIndex + 1}/{total}</span>{' '}
                  <span className="ml-2 font-semibold tracking-tight">{q.q}</span>
                </CardTitle>
                <Badge className="bg-primary/10 text-primary">{q.category}</Badge>
              </div>
            </CardHeader>

            <CardContent className="grid gap-3">
              {q.choices.map((c, idx) => {
                const chosen = selected === idx
                const correct = idx === q.answer

                const ok = showFeedback && correct
                const bad = showFeedback && chosen && !correct
                const dim = showFeedback && !chosen && !correct

                return (
                  <motion.button
                    key={idx}
                    onClick={() => choose(idx)}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    animate={bad ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 }}
                    transition={{ duration: bad ? 0.36 : 0.2 }}
                    className={cn(
                      'relative w-full rounded-2xl p-[1px] text-left transition',
                      'bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-transparent',
                      'hover:from-cyan-500/40 hover:via-indigo-500/30',
                      chosen && 'from-cyan-500/55 via-indigo-500/35',
                      ok && 'from-emerald-400/50 via-cyan-400/30',
                      bad && 'from-rose-500/45 via-rose-500/20',
                      dim && 'opacity-75'
                    )}
                    disabled={isAnswered && !isTreino}
                  >
                    <div
                      className={cn(
                        'group flex items-start justify-between gap-3 rounded-2xl border bg-background/35 px-4 py-3 text-sm',
                        'shadow-sm backdrop-blur transition-all',
                        'hover:bg-muted/25 hover:shadow-md',
                        chosen && 'border-primary/40 bg-primary/10',
                        ok && 'border-emerald-400/40 bg-emerald-500/10',
                        bad && 'border-destructive/50 bg-destructive/10'
                      )}
                    >
                      <div className="flex gap-3">
                        <span
                          className={cn(
                            'mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-semibold',
                            'bg-muted/40 text-muted-foreground transition group-hover:text-foreground',
                            chosen && 'bg-primary/15 text-primary',
                            ok && 'bg-emerald-500/15 text-emerald-300',
                            bad && 'bg-destructive/15 text-destructive'
                          )}
                        >
                          {letter(idx)}
                        </span>
                        <span className="leading-relaxed">{c}</span>
                      </div>

                      {showFeedback && (
                        <span className="mt-0.5">
                          {ok ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : bad ? (
                            <XCircle className="h-5 w-5 text-destructive" />
                          ) : null}
                        </span>
                      )}
                    </div>

                    {/* glow de acerto/erro */}
                    {ok && <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_28px_rgba(52,211,153,0.18)]" />}
                    {bad && <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_26px_rgba(244,63,94,0.18)]" />}
                  </motion.button>
                )
              })}

              {showFeedback && typeof selected === 'number' && (
                <LessonPanel q={q} selected={selected} />
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
                  <RippleButton
                    onClick={() => (currentIndex === total - 1 ? finishQuiz() : next())}
                    disabled={!isAnswered}
                    className="hover:scale-[1.02]"
                  >
                    {currentIndex === total - 1 ? 'Ver resultado' : 'Continuar'}
                  </RippleButton>
                ) : (
                  <RippleButton
                    onClick={() => (currentIndex === total - 1 ? finishQuiz() : next())}
                    className="hover:scale-[1.02]"
                  >
                    {currentIndex === total - 1 ? 'Ver resultado' : 'Avançar'}
                  </RippleButton>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="text-xs text-muted-foreground">
        Dica: em <span className="font-medium text-foreground">Prova/Simulado</span> o resultado aparece só no final.
      </div>
    </div>
  )
}
