import { Link, NavLink, Outlet } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wifi, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import tcfLogo from '@/assets/tcf-logo.png'

function NavItem({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
          isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}

export function AppShell() {
  return (
    <div className="min-h-full">
      {/* Camada extra de fundo (nós/bolhas) para um visual mais “telecom” */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Linhas animadas (efeito “rede/telecom”) */}
        <div className="absolute inset-0 tech-lines" />

        <div className="absolute -top-28 left-[-6rem] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl animate-float-slow" />
        <div className="absolute top-10 right-[-8rem] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-[-10rem] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-float-slow" />

        {/* SVG de “conexões” com traços animados */}
        <svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
        >
          <path className="tech-path" d="M80,540 C220,380 360,580 520,430 C680,280 860,520 1040,360" />
          <path className="tech-path tech-path-2" d="M120,220 C320,140 420,300 580,240 C760,170 880,260 1120,160" />
          <path className="tech-path tech-path-3" d="M140,640 C280,520 420,620 560,520 C720,410 860,540 1100,430" />

          <circle className="tech-node" cx="80" cy="540" r="4" />
          <circle className="tech-node" cx="520" cy="430" r="4" />
          <circle className="tech-node" cx="1040" cy="360" r="4" />
          <circle className="tech-node tech-node-2" cx="120" cy="220" r="4" />
          <circle className="tech-node tech-node-2" cx="580" cy="240" r="4" />
          <circle className="tech-node tech-node-2" cx="1120" cy="160" r="4" />
        </svg>

        {/* Pontos “nós da rede” */}
        <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-primary/70 shadow-[0_0_24px_rgba(34,211,238,0.45)] animate-glow" />
        <div className="absolute left-[78%] top-[28%] h-2 w-2 rounded-full bg-indigo-400/70 shadow-[0_0_24px_rgba(99,102,241,0.45)] animate-glow" />
        <div className="absolute left-[58%] top-[72%] h-2 w-2 rounded-full bg-primary/70 shadow-[0_0_24px_rgba(34,211,238,0.45)] animate-glow" />
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            {/* Logo com fundo neutro para garantir contraste (a logo é azul) */}
            <div className="grid h-11 w-[88px] place-items-center rounded-2xl border bg-white px-2 shadow-sm dark:bg-card">
              <img src={tcfLogo} alt="TCF Telecom" className="h-8 w-auto" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight">Quiz Redes</span>
                <Badge>TCF</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Fibra óptica • React + Vite</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavItem to="/" label="Início" icon={<Wifi className="h-4 w-4" />} />
            <NavItem to="/stats" label="Estatísticas" icon={<BarChart3 className="h-4 w-4" />} />
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <a href="/questions/bank.json" target="_blank" rel="noreferrer">
                Ver banco
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-[56px] place-items-center rounded-xl border bg-white px-2 shadow-sm dark:bg-card">
              <img src={tcfLogo} alt="TCF Telecom" className="h-5 w-auto" />
            </span>
            <span>Feito para treinar redes • banco em JSON</span>
          </div>
          <span className="font-mono">/questions/bank.json</span>
        </div>
      </footer>
    </div>
  )
}
