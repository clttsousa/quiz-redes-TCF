import { useMemo, useState } from 'react'
import { clearAttempts, loadAttempts } from '@/lib/stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

function fmt(ts: number) {
  const d = new Date(ts)
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export function StatsPage() {
  const [attempts, setAttempts] = useState(() => loadAttempts())

  const byCat = useMemo(() => {
    const agg: Record<string, { correct: number; total: number }> = {}
    for (const a of attempts) {
      for (const [cat, v] of Object.entries(a.byCategory || {})) {
        const b = agg[cat] ?? { correct: 0, total: 0 }
        b.correct += v.correct
        b.total += v.total
        agg[cat] = b
      }
    }
    return Object.entries(agg)
      .map(([cat, v]) => ({ cat, pct: v.total ? Math.round((v.correct / v.total) * 100) : 0, ...v }))
      .sort((a, b) => a.cat.localeCompare(b.cat, 'pt-BR'))
  }, [attempts])

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Estatísticas</CardTitle>
              <CardDescription>Últimas tentativas e desempenho acumulado por categoria.</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                clearAttempts()
                setAttempts([])
              }}
              disabled={attempts.length === 0}
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Limpar estatísticas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border bg-background/20 p-4">
              <div className="text-sm font-medium">Tentativas salvas</div>
              <div className="mt-2 text-3xl font-semibold">{attempts.length}</div>
              <div className="text-sm text-muted-foreground">Armazenadas localmente no navegador.</div>
            </div>

            <div className="rounded-2xl border bg-background/20 p-4">
              <div className="text-sm font-medium">Por categoria (acumulado)</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {byCat.length === 0 ? (
                  <span className="text-sm text-muted-foreground">Sem dados ainda. Faça uma prova e volte aqui.</span>
                ) : (
                  byCat.map((x) => (
                    <Badge key={x.cat} className="bg-primary/10 text-primary">
                      {x.cat}: {x.pct}%
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-sm font-medium">Últimas tentativas</div>
          <div className="grid gap-3">
            {attempts.length === 0 ? (
              <div className="rounded-2xl border bg-background/20 p-4 text-sm text-muted-foreground">
                Sem tentativas salvas ainda.
              </div>
            ) : (
              attempts.map((a) => {
                const pct = a.count ? Math.round((a.correct / a.count) * 100) : 0
                return (
                  <div key={a.ts} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-background/20 p-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">
                        {a.mode.toUpperCase()} • {a.difficulty} • {a.correct}/{a.count} ({pct}%)
                      </div>
                      <div className="text-xs text-muted-foreground">{fmt(a.ts)}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(a.byCategory || {}).slice(0, 6).map(([cat, v]) => {
                        const p = Math.round((v.correct / v.total) * 100)
                        return (
                          <Badge key={cat} variant="outline">
                            {cat}: {p}%
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
