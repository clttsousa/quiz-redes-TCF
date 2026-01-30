import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

type Node = { x: number; y: number; z: number }
type Edge = { a: number; b: number }

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildNetwork(seed = 1337, n = 58) {
  const rand = mulberry32(seed)
  const nodes: Node[] = Array.from({ length: n }, () => {
    const x = (rand() - 0.5) * 14
    const y = (rand() - 0.5) * 8
    const z = (rand() - 0.5) * 3
    return { x, y, z }
  })

  const edges: Edge[] = []
  // connect each node to its 3 nearest neighbors
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((p, j) => {
        if (i === j) return { j, d: Number.POSITIVE_INFINITY }
        const dx = nodes[i].x - p.x
        const dy = nodes[i].y - p.y
        const dz = nodes[i].z - p.z
        return { j, d: dx * dx + dy * dy + dz * dz }
      })
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)

    for (const nn of dists) {
      const a = Math.min(i, nn.j)
      const b = Math.max(i, nn.j)
      if (!edges.find((e) => e.a === a && e.b === b)) edges.push({ a, b })
    }
  }
  return { nodes, edges }
}

function CameraRig({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())

  useEffect(() => {
    // suaviza o movimento da câmera com gsap (cinematográfico, mas discreto)
    const cx = gsap.quickTo(camera.position, 'x', { duration: 0.9, ease: 'power3.out' })
    const cy = gsap.quickTo(camera.position, 'y', { duration: 0.9, ease: 'power3.out' })
    const lookX = gsap.quickTo(target.current, 'x', { duration: 1.2, ease: 'power3.out' })
    const lookY = gsap.quickTo(target.current, 'y', { duration: 1.2, ease: 'power3.out' })

    const id = window.setInterval(() => {
      const mx = (mouse.current.x - 0.5) * 1.2
      const my = (0.5 - mouse.current.y) * 0.8
      cx(mx)
      cy(my)
      lookX(mx * 0.25)
      lookY(my * 0.2)
    }, 50)

    return () => window.clearInterval(id)
  }, [camera, mouse])

  useFrame(() => {
    camera.lookAt(target.current)
  })
  return null
}

function Packet({ nodes, edge, color, speed, phase }: { nodes: Node[]; edge: Edge; color: string; speed: number; phase: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const t = useRef(phase)

  useEffect(() => {
    // anima t 0..1 com gsap para efeito de "pacote" trafegando
    const tween = gsap.to(t, {
      current: 1,
      duration: speed,
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        t.current = 0
      },
    })
    return () => {
      tween.kill()
    }
  }, [speed])

  useFrame(() => {
    const a = nodes[edge.a]
    const b = nodes[edge.b]
    const tt = t.current
    // curva leve (bezier) para ficar orgânico
    const mid = {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2 + 0.6,
      z: (a.z + b.z) / 2,
    }
    const p0 = new THREE.Vector3(a.x, a.y, a.z)
    const p1 = new THREE.Vector3(mid.x, mid.y, mid.z)
    const p2 = new THREE.Vector3(b.x, b.y, b.z)
    const pos = new THREE.QuadraticBezierCurve3(p0, p1, p2).getPoint(tt)
    if (mesh.current) mesh.current.position.copy(pos)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.06, 10, 10]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} />
    </mesh>
  )
}

function NetworkScene({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const { nodes, edges } = useMemo(() => buildNetwork(1337, 60), [])

  const positions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((p, i) => {
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [nodes])

  const packetEdges = useMemo(() => {
    // pega algumas arestas bem espalhadas
    const picks = edges.filter((_, i) => i % 6 === 0).slice(0, 10)
    return picks.length ? picks : edges.slice(0, 10)
  }, [edges])

  return (
    <>
      <CameraRig mouse={mouse} />

      {/* Linhas */}
      {edges.map((e, i) => {
        const a = nodes[e.a]
        const b = nodes[e.b]
        return (
          <Line
            key={i}
            points={[
              [a.x, a.y, a.z],
              [b.x, b.y, b.z],
            ]}
            color={i % 3 === 0 ? '#22d3ee' : '#6366f1'}
            lineWidth={1}
            transparent
            opacity={0.18}
          />
        )
      })}

      {/* Nós */}
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={'#22d3ee'}
          size={0.08}
          sizeAttenuation
          depthWrite={false}
          opacity={0.65}
        />
      </Points>

      {/* Pacotes trafegando */}
      {packetEdges.slice(0, 6).map((e, i) => (
        <Packet
          key={`p-${i}`}
          nodes={nodes}
          edge={e}
          color={i % 2 === 0 ? '#22d3ee' : '#a5b4fc'}
          speed={6.2 + i * 0.8}
          phase={(i * 0.18) % 1}
        />
      ))}

      {/* Glow volumétrico suave */}
      <mesh position={[0, -0.5, -2.2]}>
        <planeGeometry args={[28, 18]} />
        <meshBasicMaterial color={'#0b1220'} transparent opacity={0.35} />
      </mesh>
    </>
  )
}

/**
 * Background 3D "rede" com R3F + GSAP
 * - nós e linhas (rede)
 * - pacotes trafegando
 * - câmera suave com parallax
 * - mantém overlay de glow/noise por CSS (sem distrair)
 */
export function TechBackground3D() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const mouse = useRef({ x: 0.5, y: 0.35 })

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width
      const my = (e.clientY - rect.top) / rect.height
      mouse.current.x = mx
      mouse.current.y = my
      // CSS vars (glow)
      el.style.setProperty('--mx', String(mx))
      el.style.setProperty('--my', String(my))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden tech-bg">
      {/* 3D canvas */}
      <div className="absolute inset-0 opacity-70">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={[0, 0, 0]} />
          <ambientLight intensity={0.6} />
          <NetworkScene mouse={mouse} />
        </Canvas>
      </div>

      {/* Overlay (glow + grid/noise) para acabamento premium */}
      <div className="absolute inset-0 tech-mouse-glow" />
      <div className="absolute inset-0 tech-grid" />
      <div className="absolute inset-0 tech-noise" />
      <div className="tech-blob tech-blob-a" />
      <div className="tech-blob tech-blob-b" />
      <div className="tech-blob tech-blob-c" />
    </div>
  )
}
