import type { RenderQuestion } from '@/lib/types'
import { buildLesson } from '@/lib/lesson'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Info, XCircle } from 'lucide-react'

export function LessonPanel({ q, selected }: { q: RenderQuestion; selected?: number }) {
  const lesson = buildLesson(q, selected)
  const isAnswered = typeof selected === 'number'
  const isCorrect = isAnswered && selected === q.answer

  return (
    <details className="group mt-3 rounded-2xl border bg-background/20 p-4 open:shadow-lg transition-all">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Info className="h-4 w-4" />
          </span>
          {lesson.title}
          {isAnswered && (
            <Badge className={isCorrect ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Certo
                </>
              ) : (
                <>
                  <XCircle className="mr-1 h-4 w-4" /> Errou — vamos entender
                </>
              )}
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground group-open:hidden">Clique para abrir</span>
        <span className="text-xs text-muted-foreground hidden group-open:inline">Clique para fechar</span>
      </summary>

      <div className="mt-3 grid gap-4 text-sm">
        <div className="grid gap-2">
          <div className="font-medium">✅ Por que a correta é a correta</div>
          <ul className="list-disc pl-5 text-muted-foreground">
            {lesson.whyCorrect.map((x, i) => (
              <li key={i} className="leading-relaxed">{x}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-2">
          <div className="font-medium">🧠 Onde a gente costuma escorregar</div>
          <ul className="list-disc pl-5 text-muted-foreground">
            {lesson.whyWrong.map((x, i) => (
              <li key={i} className="leading-relaxed">{x}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-2">
          <div className="font-medium">📌 Resumo do conteúdo</div>
          <ul className="list-disc pl-5 text-muted-foreground">
            {lesson.keyTakeaways.map((x, i) => (
              <li key={i} className="leading-relaxed">{x}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-2">
          <div className="font-medium">🎯 Dica de prova</div>
          <ul className="list-disc pl-5 text-muted-foreground">
            {lesson.examTips.map((x, i) => (
              <li key={i} className="leading-relaxed">{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  )
}
