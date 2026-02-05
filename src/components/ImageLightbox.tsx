import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Minus, Plus, RotateCcw, X } from 'lucide-react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  src: string
  alt?: string
}

export function ImageLightbox({ open, onOpenChange, src, alt }: Props) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!open) setScale(1)
  }, [open])

  const title = useMemo(() => alt || 'Imagem', [alt])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[96vw] rounded-2xl p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b bg-background/80 p-3 backdrop-blur">
          <DialogHeader className="p-0">
            <DialogTitle className="text-sm">{title}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-xl" onClick={() => setScale((s) => Math.max(0.6, +(s - 0.2).toFixed(2)))}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl" onClick={() => setScale((s) => Math.min(3, +(s + 0.2).toFixed(2)))}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl" onClick={() => setScale(1)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-[85vh] overflow-auto p-3">
          <div className="grid place-items-center">
            <img
              src={src}
              alt={alt || 'Imagem'}
              className="h-auto w-full max-w-[1100px] origin-center object-contain"
              style={{ transform: `scale(${scale})` }}
              draggable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
