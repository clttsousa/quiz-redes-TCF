import React from 'react'

export function YouTubeEmbed({ id }: { id: string }) {
  const safeId = (id || '').replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safeId) return null

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
