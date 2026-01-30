import type React from 'react'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { RenderQuestion } from '@/lib/types'
import { buildLesson } from '@/lib/lesson'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Target,
  XCircle,
} from 'lucide-react'
import { KeywordHover } from '@/components/KeywordHover'

function letter(idx: number) {
  return String.fromCharCode(65 + idx)
}

const KEYWORDS = [
  'TCP', 'UDP', 'DNS', 'DHCP', 'NAT', 'CGNAT', 'VLAN', 'IP', 'IPv4', 'IPv6', 'CIDR',
  'sub-rede', 'máscara', 'gateway', 'roteador', 'switch', 'OSI', 'MTU', 'ARP', 'ICMP',
  'fibra', 'GPON', 'ONT', 'OLT', 'ONU',
]

function highlight(text: string): React.ReactNode {
  // split preserving delimiters
  const parts: React.ReactNode[] = []
  let remaining = text
  while (remaining.length) {
    const hit = KEYWORDS
      .map((k) => ({ k, idx: remaining.toLowerCase().indexOf(k.toLowerCase()) }))
      .filter((x) => x.idx >= 0)
      .sort((a, b) => a.idx - b.idx)[0]
    if (!hit) {
      parts.push(remaining)
      break
    }
    if (hit.idx > 0) parts.push(remaining.slice(0, hit.idx))
    parts.push(
      <KeywordHover
        key={`${hit.k}-${parts.length}`}
        term={remaining.slice(hit.idx, hit.idx + hit.k.length)}
      />
    )
    remaining = remaining.slice(hit.idx + hit.k.length)
  }
  return <>{parts}</>
}

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
}

export function LessonPanel({ q, selected }: { q: RenderQuestion; selected?: number }) {
  const lesson = useMemo(() => buildLesson(q, selected), [q, selected])
  const [open, setOpen] = useState(true)

  const isAnswered = typeof selected === 'number'
  const isCorrect = isAnswered && selected === q.answer
  const selectedText = isAnswered ? q.choices[selected as number] : undefined
  const correctText = q.choices[q.answer]

  // Some banks may not provide a one-liner; fall back to the first takeaway.
  const oneLiner =
    (lesson as any).oneLiner ||
    (lesson.keyTakeaways?.[0] ? lesson.keyTakeaways[0] : 'a alternativa correta bate exatamente com o conceito do enunciado')

  return (
    <div className="mt-3 rounded-2xl border bg-background/25 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div className="grid">
            <div className="text-sm font-semibold leading-tight">{lesson.title}</div>
            <div className="text-xs text-muted-foreground">Mini aula • 30–60s</div>
          </div>

          {isAnswered && (
            <Badge className={isCorrect ? 'bg-primary/12 text-primary' : 'bg-destructive/12 text-destructive'}>
              {isCorrect ? (
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Acertou
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <XCircle className="h-4 w-4" /> Errou — vamos destravar
                </span>
              )}
            </Badge>
          )}
        </div>

        <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)} className="rounded-xl">
          {open ? 'Recolher' : 'Abrir'}
          <ChevronDown className={cn('ml-2 h-4 w-4 transition-transform', open && 'rotate-180')} />
        </Button>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2">
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Você marcou:</span>
            <span className={cn('font-medium', isCorrect ? 'text-primary' : 'text-destructive')}>
              {isAnswered ? `${letter(selected as number)} — ${selectedText}` : '—'}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 rounded-xl border bg-primary/10 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Correta:</span>
            <span className="font-medium text-primary">
              {letter(q.answer)} — {correctText}
            </span>
          </span>
        </div>

        <div className="h-px w-full bg-border/60" />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mt-4 grid gap-4 text-sm"
            >
              {lesson.concept && lesson.concept.length > 0 && (
                <motion.div variants={sectionVariants} className="rounded-2xl border bg-background/20 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    Conceito em 1 minuto
                  </div>
                  <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                    {lesson.concept.map((x, i) => (
                      <li key={i} className="leading-relaxed">{highlight(x)}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {lesson.steps && lesson.steps.length > 0 && (
                <motion.div variants={sectionVariants} className="rounded-2xl border bg-muted/20 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                    <ListChecks className="h-4 w-4 text-muted-foreground" />
                    Como resolver (passo a passo)
                  </div>
                  <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                    {lesson.steps.map((x, i) => (
                      <li key={i} className="leading-relaxed">{highlight(x)}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div variants={sectionVariants} className="rounded-2xl border bg-primary/6 p-4">
                <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Por que a correta é a correta
                </div>
                <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                  {lesson.whyCorrect.map((x, i) => (
                    <li key={i} className="leading-relaxed">{highlight(x)}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} className="rounded-2xl border bg-destructive/6 p-4">
                <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                  <Target className="h-4 w-4 text-destructive" />
                  Onde a gente costuma errar
                </div>
                <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                  {lesson.whyWrong.map((x, i) => (
                    <li key={i} className="leading-relaxed">{highlight(x)}</li>
                  ))}
                </ul>
              </motion.div>

              {lesson.distractors && lesson.distractors.length > 0 && (
                <motion.div variants={sectionVariants} className="rounded-2xl border bg-background/25 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    Por que as outras parecem certas (e não são)
                  </div>
                  <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                    {lesson.distractors.map((x, i) => (
                      <li key={i} className="leading-relaxed">{highlight(x)}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div variants={sectionVariants} className="rounded-2xl border bg-muted/25 p-4">
                <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  Resumo do conteúdo (guarde isso)
                </div>
                <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                  {lesson.keyTakeaways.map((x, i) => (
                    <li key={i} className="leading-relaxed">{highlight(x)}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} className="rounded-2xl border bg-amber-500/10 p-4">
                <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                  <Target className="h-4 w-4 text-amber-500" />
                  <span className="inline-flex items-center gap-2">Dica de prova (atalho)
                    <span className="ml-1 inline-flex rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 animate-[pulse_2.6s_ease-in-out_infinite]">PROVA</span>
                  </span>
                </div>
                <ul className="grid gap-2 pl-5 text-muted-foreground list-disc">
                  {lesson.examTips.map((x, i) => (
                    <li key={i} className="leading-relaxed">{highlight(x)}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} className="rounded-2xl border bg-background/20 p-4">
                <div className="mb-2 font-semibold">Pratique em 10 segundos</div>
                <div className="text-muted-foreground leading-relaxed">
                  Releia o enunciado e responda em voz alta:{' '}
                  <span className="text-foreground font-medium">“Porque {oneLiner}.”</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
