import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { BookOpen, PlayCircle } from 'lucide-react'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { StudyLoader } from '@/components/StudyLoader'
import { applyGlossary, GlossaryProvider } from '@/components/GlossaryText'

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

export function StudyPage() {
  const [params] = useSearchParams()
  const initialTopic = params.get('topic') || ''

  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string>(initialTopic)
  const [markdown, setMarkdown] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [error, setError] = useState<string>('')

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
            {/* Sidebar */}
            <div className="rounded-2xl border bg-background/30 p-3 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="text-sm font-medium">Temas</div>
                {manifest?.generated ? (
                  <Badge variant="outline" className="font-mono">{manifest.generated}</Badge>
                ) : null}
              </div>

              <div className="grid gap-1">
                {manifest?.topics.map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => setSelectedSlug(t.slug)}
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

            {/* Content */}
            <div className="grid gap-4">
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
                      <div className="grid gap-3">
                        <div className="text-xs font-medium text-muted-foreground">Diagramas</div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {selected.images.map((img) => (
                            <div key={img} className="rounded-2xl border bg-card p-3">
                              <img
                                src={`/study/images/${img}`}
                                alt={img}
                                className="h-auto w-full"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                        <Separator />
                      </div>
                    ) : null}

                    {/* Markdown */}
                    <article className="grid gap-3">
                      <GlossaryProvider>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                          h1: ({ ...props }) => <h1 className="text-2xl font-semibold tracking-tight" {...props} />,
                          h2: ({ ...props }) => <h2 className="mt-4 text-xl font-semibold tracking-tight" {...props} />,
                          h3: ({ ...props }) => <h3 className="mt-3 text-lg font-semibold tracking-tight" {...props} />,
                          p: ({ children, ...props }) => (
                            <p className="leading-7 text-foreground/90" {...props}>
                              {applyGlossary(children)}
                            </p>
                          ),
                          ul: ({ ...props }) => <ul className="list-disc space-y-1 pl-6" {...props} />,
                          ol: ({ ...props }) => <ol className="list-decimal space-y-1 pl-6" {...props} />,
                          li: ({ children, ...props }) => (
                            <li className="leading-7" {...props}>
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
    return <YouTubeEmbed id={id} />
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

      <div className="text-xs text-muted-foreground">
        Dica: você também pode abrir um tema direto com <span className="font-mono">/study?topic=dns</span>.
      </div>
    </div>
  )
}