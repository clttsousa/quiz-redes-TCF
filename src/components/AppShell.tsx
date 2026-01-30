import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wifi, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import tcfLogo from '@/assets/tcf-logo.png'
import { AnimatePresence, motion } from 'framer-motion'
import { TechBackground3D } from '@/components/TechBackground3D'
import { TooltipProvider } from '@/components/ui/tooltip'

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
  const location = useLocation()
  return (
    <TooltipProvider delayDuration={250}>
      <div className="min-h-full">
      <TechBackground3D />
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
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
    </TooltipProvider>
  )
}
