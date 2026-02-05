import React, { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'

export function YouTubeEmbed({ id }: { id: string }) {
  const safeId = (id || '').replace(/[^a-zA-Z0-9_-]/g, '')
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [play, setPlay] = useState(false)

  const thumb = useMemo(() => {
    if (!safeId) return ''
    // Thumbnail padrão (boa qualidade e estável)
    return `https://i.ytimg.com/vi/${safeId}/hqdefault.jpg`
  }, [safeId])

  if (!safeId) return null

  // No desktop, mantém o embed direto (não muda a experiência do PC)
  if (isDesktop) {
    return (
      <div className="my-3 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${safeId}`}
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  // No mobile, carrega leve: thumbnail -> iframe só após toque
  return (
    <div className="my-3 overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        {!play ? (
          <button
            type="button"
            className="absolute inset-0 h-full w-full"
            onClick={() => setPlay(true)}
            aria-label="Tocar vídeo"
          >
            <img
              src={thumb}
              alt="Thumbnail do vídeo"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/25">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow">
                <Play className="h-6 w-6 text-black" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${safeId}`}
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}
