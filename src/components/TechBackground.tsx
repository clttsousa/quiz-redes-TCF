import { useEffect, useMemo, useRef } from 'react'

type Node = { id: string; x: number; y: number; s: number; d: number; a: number }

/**
 * Background "telecom/network" vivo mas discreto:
 * - glow reativo ao mouse
 * - nós/partículas com parallax (bem leve)
 * - trilhas com "pacotes" trafegando
 */
export function TechBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const nodes = useMemo<Node[]>(() => {
    // Determinístico (sem Math.random em render) para evitar flicker.
    const seed = [
      0.12, 0.22, 0.35, 0.48, 0.58, 0.66, 0.74, 0.82, 0.9,
      0.18, 0.28, 0.4, 0.52, 0.62, 0.7, 0.78, 0.86, 0.94,
    ]
    return seed.map((v, i) => {
      const x = (v * 100) % 100
      const y = ((v * 73) * 100) % 100
      const s = 1 + (i % 3) * 0.7
      const d = 8 + (i % 7) * 2.5
      const a = 0.25 + (i % 4) * 0.1
      return { id: `n${i}`, x, y, s, d, a }
    })
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width
      const my = (e.clientY - rect.top) / rect.height
      // CSS vars 0..1
      el.style.setProperty('--mx', String(mx))
      el.style.setProperty('--my', String(my))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden tech-bg">
      {/* Glow reativo ao mouse */}
      <div className="absolute inset-0 tech-mouse-glow" />

      {/* Grid + ruído */}
      <div className="absolute inset-0 tech-grid" />
      <div className="absolute inset-0 tech-noise" />

      {/* Trilhas (linhas) */}
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <path className="tech-path" d="M60,560 C220,360 360,590 520,430 C690,260 870,540 1120,320" />
        <path className="tech-path tech-path-2" d="M120,220 C320,140 420,320 600,240 C760,160 900,300 1160,160" />
        <path className="tech-path tech-path-3" d="M80,120 C260,260 420,80 620,210 C800,330 980,200 1180,360" />
      </svg>

      {/* "Pacotes" trafegando */}
      <div className="tech-packet packet-1" />
      <div className="tech-packet packet-2" />
      <div className="tech-packet packet-3" />
      <div className="tech-packet packet-4" />

      {/* Nós/partículas (parallax suave) */}
      {nodes.map((n, i) => (
        <div
          key={n.id}
          className={i % 4 === 0 ? 'tech-node-dot tech-node-dot-2' : 'tech-node-dot'}
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: `${n.s * 6}px`,
            height: `${n.s * 6}px`,
            opacity: n.a,
            animationDuration: `${n.d}s`,
          }}
        />
      ))}

      {/* Blobs discretos para profundidade */}
      <div className="tech-blob tech-blob-a" />
      <div className="tech-blob tech-blob-b" />
      <div className="tech-blob tech-blob-c" />
    </div>
  )
}
