import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { GLOSSARY, GLOSSARY_TERMS } from '@/lib/glossary'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/lib/useMediaQuery'

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// termos maiores primeiro ("dhcp relay" antes de "dhcp")
const TERMS_SORTED = [...GLOSSARY_TERMS].sort((a, b) => b.length - a.length)

// Regex que casa termos por palavra inteira (com suporte a termos com espaço).
// Ex.: broadcast, unicast, dhcp relay...
const TERMS_REGEX = new RegExp(
  `\\b(${TERMS_SORTED.map(escapeRegExp).join('|')})\\b`,
  'gi'
)

export function GlossaryTerm({ term }: { term: string }) {
  const key = term.toLowerCase()
  const entry = GLOSSARY[key]
  if (!entry) return <>{term}</>

  // Em celulares não há "hover". Usamos Popover (toque/click) no mobile e Tooltip no desktop.
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const TriggerButton = (
    <button
      type="button"
      className={cn(
        'inline-flex items-center rounded px-0.5',
        'underline decoration-dotted underline-offset-4',
        'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40'
      )}
      aria-label={`${entry.label}: ${entry.short}`}
    >
      {term}
    </button>
  )

  const Content = (
    <div className="grid gap-1">
      <div className="text-xs font-medium">{entry.label}</div>
      <div className="text-xs text-muted-foreground">{entry.short}</div>
      {entry.long ? <div className="mt-1 text-xs">{entry.long}</div> : null}
      {entry.links?.length ? (
        <div className="mt-1 grid gap-1">
          {entry.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary underline-offset-4 hover:underline"
            >
              {l.title}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )

  if (!isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
        <PopoverContent className="max-w-xs">{Content}</PopoverContent>
      </Popover>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {TriggerButton}
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        {Content}
      </TooltipContent>
    </Tooltip>
  )
}

/**
 * Aplica o glossário em textos (p/ parágrafos, listas, etc.).
 * Mantém nós React intactos e substitui apenas trechos de string.
 */
export function applyGlossary(children: React.ReactNode) {
  const walk = (node: React.ReactNode): React.ReactNode => {
    if (node == null || typeof node === 'boolean') return node
    if (typeof node === 'number') return node

    if (typeof node === 'string') {
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      const text = node

      text.replace(TERMS_REGEX, (match, _g1, offset) => {
        const start = offset as number
        if (start > lastIndex) {
          parts.push(text.slice(lastIndex, start))
        }
        parts.push(<GlossaryTerm key={`${start}-${match}`} term={match} />)
        lastIndex = start + match.length
        return match
      })

      if (parts.length === 0) return node
      if (lastIndex < text.length) parts.push(text.slice(lastIndex))
      return <>{parts}</>
    }

    if (Array.isArray(node)) return node.map((n, i) => <React.Fragment key={i}>{walk(n)}</React.Fragment>)

    if (React.isValidElement(node)) {
      // não mexe em code/pre/a para evitar “quebrar” comandos e URLs
      const tag = (node.type as any)?.toString?.() || ''
      const isNative = typeof node.type === 'string'
      if (isNative && ['code', 'pre', 'a'].includes(node.type)) return node

      return React.cloneElement(node, {
        ...(node.props || {}),
        children: walk(node.props?.children),
      })
    }

    return node
  }

  return walk(children)
}

export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  return <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
}
