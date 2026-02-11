import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Wifi, BarChart3, BookOpen, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import tcfLogo from '@/assets/tcf-logo.png'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { TechBackground } from '@/components/TechBackground'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const TechBackground3D = lazy(() => import('@/components/TechBackground3D').then((m) => ({ default: m.TechBackground3D })))

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
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reducedMotion = useReducedMotion()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={250}>
      <div className="min-h-full">
        {/* Desktop keeps the 3D AAA background; mobile falls back to a lighter 2D tech bg */}
        {isDesktop && !reducedMotion ? (
          <Suspense fallback={null}>
            <TechBackground3D />
          </Suspense>
        ) : (
          <TechBackground />
        )}

        <header className="sticky top-0 z-40 border-b bg-background/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:py-3">
          <Link to="/" className="flex items-center gap-3">
            {/* Logo com fundo neutro para garantir contraste (a logo é azul) */}
            <div className="grid h-9 w-[76px] place-items-center rounded-2xl border bg-white px-2 shadow-sm dark:bg-card sm:h-11 sm:w-[88px]">
              <img src={tcfLogo} alt="TCF Telecom" className="h-7 w-auto sm:h-8" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight sm:text-base">Quiz Redes</span>
                <Badge>TCF</Badge>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavItem to="/" label="Início" icon={<Wifi className="h-4 w-4" />} />
            <NavItem to="/study" label="Estudos" icon={<BookOpen className="h-4 w-4" />} />
            <NavItem to="/stats" label="Estatísticas" icon={<BarChart3 className="h-4 w-4" />} />
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile menu (não interfere no desktop) */}
            <div className="md:hidden">
              <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Abrir menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[92vw] max-h-[80vh] overflow-auto rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Navegação</DialogTitle>
                    <DialogDescription>Escolha para onde ir.</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-2">
                    <Button asChild variant="secondary" className="justify-start">
                      <Link to="/" onClick={() => setMobileNavOpen(false)}>
                        <Wifi className="mr-2 h-4 w-4" /> Início
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="justify-start">
                      <Link to="/study" onClick={() => setMobileNavOpen(false)}>
                        <BookOpen className="mr-2 h-4 w-4" /> Estudos
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="justify-start">
                      <Link to="/stats" onClick={() => setMobileNavOpen(false)}>
                        <BarChart3 className="mr-2 h-4 w-4" /> Estatísticas
                      </Link>
                    </Button>
                    <Separator />
                    <Button asChild variant="outline" className="justify-start">
                      <a href="/questions/bank.json" target="_blank" rel="noreferrer" onClick={() => setMobileNavOpen(false)}>
                        Ver banco
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <a href="/questions/bank.json" target="_blank" rel="noreferrer" onClick={() => setMobileNavOpen(false)}>
                Ver banco
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 md:py-8">
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
            <span>Feito para treinar redes</span>
          </div>
        </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}
