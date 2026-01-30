import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBank } from '@/bank/BankContext'
import { useQuiz } from '@/quiz/QuizContext'
import { distinctCategories } from '@/lib/bank'
import type { Difficulty, Mode, QuizConfig } from '@/lib/types'
import { simuladoCategories } from '@/lib/generator'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Network, Shuffle, ClipboardList, GraduationCap } from 'lucide-react'

const DIFF_LABEL: Record<string, string> = {
  very_easy: 'Muito fácil',
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
  mix: 'Misto',
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function HomePage() {
  const bankState = useBank()
  const { start } = useQuiz()
  const nav = useNavigate()

  const [mode, setMode] = useState<Mode>('prova')
  const [difficulty, setDifficulty] = useState<Difficulty | 'mix'>('mix')
  const [count, setCount] = useState<number>(25)
  const [balanced, setBalanced] = useState<boolean>(true)
  const [pickedCats, setPickedCats] = useState<string[]>([])

  const allCats = useMemo(() => {
    if (bankState.status !== 'ready') return []
    return distinctCategories(bankState.bank)
  }, [bankState])

  const simCats = useMemo(() => simuladoCategories().sort((a, b) => a.localeCompare(b, 'pt-BR')), [])

  const effectiveCats = mode === 'simulado' ? simCats : allCats

  const selectedCountLabel = mode === 'simulado' ? `${simCats.length} categorias` : (pickedCats.length ? `${pickedCats.length} selecionadas` : 'Todas')

  const canStart = bankState.status === 'ready'

  const startQuiz = () => {
    if (bankState.status !== 'ready') return
    const cfg: QuizConfig = {
      mode,
      difficulty,
      count: clamp(count, 1, 200),
      categories: mode === 'simulado' ? [] : pickedCats,
      balanced: mode === 'simulado' ? true : balanced,
    }
    start(cfg, bankState.bank)
    nav('/quiz')
  }

  return (
    <div className="grid gap-6">
      <Card className="transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                Configurar prova
              </CardTitle>
              <CardDescription>
                Banco em JSON, randomização forte e simulado focado em fundamentos de redes.
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono">/questions/bank.json</Badge>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="prova" className="flex-1">
                <ClipboardList className="mr-2 h-4 w-4" /> Prova
              </TabsTrigger>
              <TabsTrigger value="treino" className="flex-1">
                <GraduationCap className="mr-2 h-4 w-4" /> Treino
              </TabsTrigger>
              <TabsTrigger value="simulado" className="flex-1">
                <Shuffle className="mr-2 h-4 w-4" /> Simulado (Redes base)
              </TabsTrigger>
            </TabsList>

            <TabsContent value={mode}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-background/30 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Dificuldade</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border bg-muted/20 text-[10px] text-muted-foreground">i</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Escolha a dificuldade. <span className="font-medium">Misto</span> embaralha níveis.
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="mt-2">
                    <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty | 'mix')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {(['very_easy', 'easy', 'medium', 'hard', 'mix'] as const).map((d) => (
                          <SelectItem key={d} value={d}>
                            {DIFF_LABEL[d]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-2xl border bg-background/30 p-4 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Quantidade de questões</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border bg-muted/20 text-[10px] text-muted-foreground">i</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Ajuste o tamanho do simulado. Sugestões: 10/25/40.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="mt-2 grid gap-2">
                    <Select value={String(count)} onValueChange={(v) => setCount(Number(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 25, 40, 50, 75, 100, 150, 200].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground">Sugestões: 10 / 25 / 40</div>
                  </div>

                  <div className="mt-3 flex items-start gap-2">
                    <Checkbox
                      id="balanced"
                      checked={mode === 'simulado' ? true : balanced}
                      disabled={mode === 'simulado'}
                      onCheckedChange={(v) => setBalanced(Boolean(v))}
                    />
                    <div className="grid gap-0.5">
                      <Label htmlFor="balanced" className="leading-none">Balancear por categoria</Label>
                      <span className="text-xs text-muted-foreground">Reduz repetição e concentrações</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">Categorias</div>
                    <div className="text-xs text-muted-foreground">
                      {mode === 'simulado'
                        ? 'No simulado, usamos apenas os assuntos base de Redes de Computadores.'
                        : 'Você pode filtrar por tema (ou deixar “Todas”).'}
                    </div>
                  </div>

                  {mode !== 'simulado' ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          Selecionar • <span className="ml-2 text-muted-foreground">{selectedCountLabel}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Selecionar categorias</DialogTitle>
                          <DialogDescription>
                            Deixe vazio para usar todas. O gerador evita repetir perguntas recentes.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-2 max-h-[60vh] overflow-auto rounded-xl border p-3">
                          <div className="grid gap-2">
                            {effectiveCats.map((c) => {
                              const checked = pickedCats.includes(c)
                              return (
                                <label key={c} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 hover:bg-muted">
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(v) => {
                                      setPickedCats((prev) => {
                                        const on = Boolean(v)
                                        if (on) return Array.from(new Set([...prev, c]))
                                        return prev.filter((x) => x !== c)
                                      })
                                    }}
                                  />
                                  <span className="text-sm">{c}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button variant="ghost" onClick={() => setPickedCats([])}>
                            Limpar
                          </Button>
                          <DialogClose asChild>
                            <Button>Fechar</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Badge variant="secondary">{selectedCountLabel}</Badge>
                  )}
                </div>

                {mode === 'simulado' && (
                  <div className="grid gap-2 rounded-2xl border bg-background/20 p-4">
                    <div className="text-sm font-medium">Assuntos inclusos</div>
                    <div className="flex flex-wrap gap-2">
                      {simCats.map((c) => (
                        <Badge key={c} className="bg-primary/10 text-primary">{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            Dica: no modo Treino você vê a resposta e explicação na hora.
          </div>
          <Button onClick={startQuiz} disabled={!canStart}>
            Começar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
