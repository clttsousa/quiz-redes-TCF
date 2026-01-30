import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { BankQuestion } from '@/lib/types'
import { loadBank } from '@/lib/bank'

type BankState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; bank: BankQuestion[] }

const Ctx = createContext<BankState>({ status: 'loading' })

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BankState>({ status: 'loading' })

  useEffect(() => {
    let alive = true
    loadBank()
      .then((bank) => {
        if (!alive) return
        setState({ status: 'ready', bank })
      })
      .catch((e) => {
        if (!alive) return
        setState({ status: 'error', error: e?.message ?? 'Erro ao carregar banco' })
      })
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(() => state, [state])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBank() {
  return useContext(Ctx)
}
