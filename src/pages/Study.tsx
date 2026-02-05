import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { BookOpen, PlayCircle, List, ListOrdered, Sparkles } from 'lucide-react'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { ImageLightbox } from '@/components/ImageLightbox'
import { StudyLoader } from '@/components/StudyLoader'
import { applyGlossary, GlossaryProvider } from '@/components/GlossaryText'
import { useMediaQuery } from '@/lib/useMediaQuery'

type ManifestTopic = {
  slug: string
  title: string
  sections: string[]
  markdown: string
  images: string[]
}

type Manifest = {
  generated: string
  topics: ManifestTopic[]
}

// Mapeia slug do estudo -> categorias do banco (pra botão "Treinar questões")
const QUIZ_CATEGORIES_BY_TOPIC: Record<string, string[]> = {
  redes: ['Conceitos', 'Tipos de Rede', 'Topologias', 'Equipamentos'],
  tcpip: ['TCP/IP', 'OSI vs TCP/IP'],
  udp: ['UDP', 'UDP/TCP'],
  nat: ['NAT', 'CGNAT'],
  dhcp: ['DHCP'],
  'ip-publico-privado': ['IP Público x Privado', 'CGNAT'],
  dns: ['DNS'],
  subnet: ['Sub-rede'],
  wireless: ['Wireless', 'Segurança'],
  'rotas-gateway': ['Roteamento'],
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Falha ao carregar ${url} (${res.status})`)
  return res.json() as Promise<T>
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Falha ao carregar ${url} (${res.status})`)
  return res.text()
}

function stripFrontmatter(md: string) {
  // Remove o bloco --- ... --- do início, se existir
  if (!md.startsWith('---')) return md
  const end = md.indexOf('\n---', 3)
  if (end === -1) return md
  return md.slice(end + 4).trimStart()
}

function formatGenerated(generated?: string) {
  if (!generated) return ''
  const d = new Date(generated)
  if (Number.isNaN(d.getTime())) return ''
  // pt-BR curto para não quebrar no mobile
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function getText(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getText).join('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (node && typeof node === 'object' && 'props' in (node as any)) return getText((node as any).props?.children)
  return ''
}

function extractToc(md: string) {
  const lines = md.split(/\r?\n/)
  let inCode = false
  const items: { level: number; text: string; id: string }[] = []
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!m) continue
    const level = m[1].length
    const text = m[2].replace(/#+\s*$/, '').trim()
    if (!text) continue
    items.push({ level, text, id: slugify(text) })
  }
  return items
}

export function StudyPage() {
  const [params] = useSearchParams()
  const initialTopic = params.get('topic') || ''

  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    // No mobile, começa em modo leitura para reduzir poluição visual.
    setReadingMode(!isDesktop)
  }, [isDesktop])

  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string>(initialTopic)
  const [markdown, setMarkdown] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState<string>('')
  const [topicDialogOpen, setTopicDialogOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; alt?: string }>({ open: false, src: '' })

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setStatus('loading')
        const m = await fetchJson<Manifest>('/study/manifest.json')
        if (!alive) return
        setManifest(m)
        const fallback = m.topics[0]?.slug
        setSelectedSlug((s) => s || fallback || '')
        setStatus('ready')
      } catch (e) {
        if (!alive) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Erro desconhecido')
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const selected = useMemo(() => {
    if (!manifest) return null
    return manifest.topics.find((t) => t.slug === selectedSlug) || manifest.topics[0] || null
  }, [manifest, selectedSlug])


  useEffect(() => {
    if (!selected) return
    try {
      localStorage.setItem('study:lastTopic', JSON.stringify({ id: selected.slug, title: selected.title }))
    } catch {
      // ignore
    }
  }, [selected])

  useEffect(() => {
    let alive = true
    ;(async () => {
      if (!selected) return
      try {
        setStatus('loading')
        const md = await fetchText(`/study/${selected.markdown}`)
        if (!alive) return
        setMarkdown(stripFrontmatter(md))
        setStatus('ready')
      } catch (e) {
        if (!alive) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Erro desconhecido')
      }
    })()
    return () => {
      alive = false
    }
  }, [selected?.markdown])


const toc = useMemo(() => extractToc(markdown), [markdown])
  const quizCats = useMemo(() => {
    if (!selected) return []
    return QUIZ_CATEGORIES_BY_TOPIC[selected.slug] ?? []
  }, [selected])

  return (
    <div className="grid gap-6">
      <Card className="transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Estudos (Aulas)
          </CardTitle>
          <CardDescription>
            Conteúdo aprofundado por tema, com exemplos e diagramas. Use o botão “Treinar” para ir direto ao quiz do assunto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5 md:grid-cols-[320px_1fr]">
            {/* Sidebar (desktop) */}
            {isDesktop ? (
              <div className="rounded-2xl border bg-background/30 p-3 shadow-sm backdrop-blur">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">Temas</div>
                  {manifest?.generated ? (
                    <Badge variant="outline" className="max-w-[240px] truncate font-mono" title={manifest.generated}>Atualizado: {formatGenerated(manifest.generated) || '—'}</Badge>
                  ) : null}
                </div>

                <div className="grid gap-1">
                  {manifest?.topics.map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => { setSelectedSlug(t.slug); setTopicDialogOpen(false) }}
                      className={cn(
                        'w-full rounded-xl px-3 py-2 text-left text-sm transition-colors',
                        t.slug === selected?.slug ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <div className="font-medium text-foreground/90">{t.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {t.sections?.slice(0, 2).join(' • ')}
                        {t.sections?.length > 2 ? ' • ...' : ''}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Content */}
            <div className="grid gap-4">
              {/* Mobile topic picker (não interfere no desktop) */}
              {!isDesktop ? (
                <div className="sticky top-20 z-10 grid gap-2 rounded-2xl border bg-background/60 p-3 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium">Tema</div>
							{manifest?.generated ? (
								<Badge
									variant="outline"
									className="max-w-[56vw] truncate font-mono text-[10px]"
									title={manifest.generated}
								>
									Atualizado: {formatGenerated(manifest.generated) || '—'}
								</Badge>
							) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Select value={selectedSlug} onValueChange={setSelectedSlug}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Escolha um tema" />
                        </SelectTrigger>
                        <SelectContent>
                          {manifest?.topics.map((t) => (
                            <SelectItem key={t.slug} value={t.slug}>
                              {t.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Lista completa em modal (melhor que empurrar a aula pra baixo) */}
                    <Dialog open={topicDialogOpen} onOpenChange={setTopicDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-xl" aria-label="Ver lista de temas">
                          <List className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[92vw] max-h-[80vh] overflow-auto rounded-2xl">
                        <DialogHeader>
                          <DialogTitle>Temas</DialogTitle>
                          <DialogDescription>Toque em um tema para abrir.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2">
                          {manifest?.topics.map((t) => (
                            <Button
                              key={t.slug}
                              variant={t.slug === selected?.slug ? 'default' : 'secondary'}
                              className="justify-start rounded-xl"
                              onClick={() => { setSelectedSlug(t.slug); setTopicDialogOpen(false) }}
                            >
                              {t.title}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
<div className="flex items-center gap-2">
  <Button
    variant="secondary"
    className="flex-1 rounded-xl"
    onClick={() => setTocOpen(true)}
  >
    <ListOrdered className="mr-2 h-4 w-4" />
    Sumário
  </Button>
  <Button
    variant={readingMode ? 'default' : 'secondary'}
    className="flex-1 rounded-xl"
    onClick={() => setReadingMode((v) => !v)}
    title="Modo leitura reduz elementos abertos (diagramas/vídeos) no celular"
  >
    <Sparkles className="mr-2 h-4 w-4" />
    {readingMode ? 'Modo leitura' : 'Modo completo'}
  </Button>
</div>

<Dialog open={tocOpen} onOpenChange={setTocOpen}>
  <DialogContent className="max-w-[92vw] max-h-[80vh] overflow-auto rounded-2xl">
    <DialogHeader>
      <DialogTitle>Sumário</DialogTitle>
      <DialogDescription>Toque em uma seção para ir direto no conteúdo.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-1">
      {toc.length ? (
        toc.map((it) => (
          <button
            key={it.id}
            className={cn(
              'rounded-xl px-3 py-2 text-left text-sm hover:bg-muted',
              it.level === 3 ? 'pl-7 text-muted-foreground' : 'font-medium'
            )}
            onClick={() => {
              setTocOpen(false)
              const el = document.getElementById(it.id)
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {it.text}
          </button>
        ))
      ) : (
        <div className="text-sm text-muted-foreground">Sem seções detectadas.</div>
      )}
    </div>
  </DialogContent>
</Dialog>
                </div>
              ) : null}
              {selected ? (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge>{selected.title}</Badge>
                    {quizCats.length ? (
                      <span className="text-xs text-muted-foreground">Categorias: {quizCats.join(', ')}</span>
                    ) : null}
                  </div>
                  {quizCats.length ? (
                    <Button asChild>
                      <Link to={`/?cat=${encodeURIComponent(quizCats[0] || '')}`}>
                        <PlayCircle className="mr-2 h-4 w-4" /> Treinar questões
                      </Link>
                    </Button>
                  ) : null}
                </div>
              ) : null}

              <div className="rounded-2xl border bg-background/30 p-4 shadow-sm backdrop-blur">
                {status === 'error' ? (
                  <div className="text-sm">
                    <div className="font-medium">Não foi possível carregar o conteúdo.</div>
                    <div className="mt-1 text-muted-foreground">{error}</div>
                    <div className="mt-3 text-xs text-muted-foreground">Verifique se existe <span className="font-mono">/public/study</span> no build.</div>
                  </div>
                ) : null}

                {status !== 'error' ? (
                  <div className="grid gap-4">
                    {status === 'loading' ? <StudyLoader text="Abrindo aula…" /> : null}
                    {status !== 'loading' ? (
                      <>
                    {/* Imagens/diagramas do tema */}
                    {selected?.images?.length ? (
                      isDesktop ? (
                        <div className="grid gap-3">
                          <div className="text-xs font-medium text-muted-foreground">Diagramas</div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {selected.images.map((img) => (
                              <div key={img} className="rounded-2xl border bg-card p-3">
                                <img
                                  src={`/study/images/${img}`}
                                  alt={img}
                                  className="h-auto w-full max-h-[60vh] object-contain cursor-zoom-in"
                                  loading="lazy"
                                  onClick={() => setLightbox({ open: true, src: `/study/images/${img}`, alt: img })}
                                  role="button"
                                />
                              </div>
                            ))}
                          </div>
                          <Separator />
                        </div>
                      ) : (
                        <Accordion type="single" collapsible defaultValue={readingMode ? undefined : 'diagrams'}>
                          <AccordionItem value="diagrams" className="border-none">
                            <AccordionTrigger className="rounded-xl border bg-muted/10 px-3 py-2 text-sm">
                              Diagramas e mapas mentais
                            </AccordionTrigger>
                            <AccordionContent className="pt-3">
                              <div className="grid gap-3">
                                {selected.images.map((img) => (
                                  <div key={img} className="rounded-2xl border bg-card p-3">
                                    <img
                                      src={`/study/images/${img}`}
                                      alt={img}
                                      className="h-auto w-full max-h-[60vh] object-contain cursor-zoom-in"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="pt-3">
                                <Separator />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    ) : null}

                    {/* Markdown */}
                    <article className="grid gap-3 break-words">
                      <GlossaryProvider>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                          h1: ({ children, ...props }) => {
                            const id = slugify(getText(children))
                            return <h1 id={id || undefined} className="text-xl md:text-2xl font-semibold tracking-tight scroll-mt-24" {...props}>{children}</h1>
                          },
                          h2: ({ children, ...props }) => {
                            const id = slugify(getText(children))
                            return <h2 id={id || undefined} className="mt-4 text-lg md:text-xl font-semibold tracking-tight scroll-mt-24" {...props}>{children}</h2>
                          },
                          h3: ({ children, ...props }) => {
                            const id = slugify(getText(children))
                            return <h3 id={id || undefined} className="mt-3 text-base md:text-lg font-semibold tracking-tight scroll-mt-24" {...props}>{children}</h3>
                          },
                          p: ({ children, ...props }) => (
                            <p className="leading-7 text-foreground/90 break-words" {...props}>
                              {applyGlossary(children)}
                            </p>
                          ),
                          ul: ({ ...props }) => <ul className="list-disc space-y-1 pl-6" {...props} />,
                          ol: ({ ...props }) => <ol className="list-decimal space-y-1 pl-6" {...props} />,
                          li: ({ children, ...props }) => (
                            <li className="leading-7 break-words" {...props}>
                              {applyGlossary(children)}
                            </li>
                          ),
                          blockquote: ({ ...props }) => (
                            <blockquote className="rounded-xl border-l-4 bg-muted/30 p-3 text-sm text-muted-foreground" {...props} />
                          ),
                          code: ({ inline, className, children, ...props }) => {
  const lang = (className || '').toLowerCase()
  if (!inline && lang.includes('language-youtube')) {
    const id = String(children).trim()
    if (isDesktop) return <YouTubeEmbed id={id} />

    // No mobile, mantém o texto mais “limpo”: o vídeo fica recolhível.
    return (
      <Accordion type="single" collapsible defaultValue={readingMode ? undefined : `yt-${id}`}>
        <AccordionItem value={`yt-${id}`} className="border-none">
          <AccordionTrigger className="rounded-xl border bg-muted/10 px-3 py-2 text-sm">
            Vídeo (toque para abrir)
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <YouTubeEmbed id={id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  return (
    <code
      className={cn('rounded bg-muted/40 px-1 py-0.5 font-mono text-[0.9em]', className)}
      {...props}
    >
      {children}
    </code>
  )
},
                          pre: ({ children, ...props }) => {
  // Não envolver embeds (ex.: bloco ```youtube```) em <pre>
  const onlyChild = Array.isArray(children) ? children[0] : children
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (onlyChild && (onlyChild as any).type === YouTubeEmbed) {
    return <>{children}</>
  }
  return (
    <pre className="overflow-auto rounded-2xl border bg-muted/20 p-3 text-sm" {...props}>
      {children}
    </pre>
  )
},
                          table: ({ ...props }) => (
                            <div className="overflow-auto rounded-2xl border">
                              <table className="w-full text-sm" {...props} />
                            </div>
                          ),
                          thead: ({ ...props }) => <thead className="bg-muted/30" {...props} />,
                          th: ({ ...props }) => <th className="px-3 py-2 text-left font-medium" {...props} />,
                          td: ({ ...props }) => <td className="border-t px-3 py-2 align-top" {...props} />,
                          a: ({ ...props }) => <a className="text-primary underline-offset-4 hover:underline" {...props} />,
                          }}
                        >
                          {markdown}
                        </ReactMarkdown>
                      </GlossaryProvider>
                    </article>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      
<ImageLightbox
  open={lightbox.open}
  src={lightbox.src}
  alt={lightbox.alt}
  onOpenChange={(open) => setLightbox((s) => ({ ...s, open }))}
/>
<div className="text-xs text-muted-foreground">
        Dica: você também pode abrir um tema direto com <span className="font-mono">/study?topic=dns</span>.
      </div>
    </div>
  )
}