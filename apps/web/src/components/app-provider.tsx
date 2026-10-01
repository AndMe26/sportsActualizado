'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { sampleAccounts, type Session } from '@sportcomplex/core'
import { usePersistentState, useHydrated } from '@/lib/persistent-state'
import { useStoredSession } from '@/lib/stores'
import type { ToastKind } from '@/components/toast-message'

type AppContextValue = {
  session: Session | null
  /** false hasta que se haya leído la sesión guardada en el navegador. */
  ready: boolean
  /** TODO(auth): reemplazar por el proveedor real (Auth.js / OAuth). Hoy no valida contraseña. Con `name` (registro) siempre crea un Cliente. */
  login: (email: string, name?: string) => Session
  logout: () => void
  notify: (message: string, kind?: ToastKind) => void
  toast: { message: string; kind: ToastKind }
  closeToast: () => void
  dark: boolean
  setDark: (value: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp debe usarse dentro de AppProvider')
  return context
}

function nameFromEmail(email: string) {
  return email.split('@')[0].split(/[._-]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') || 'Cliente'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const ready = useHydrated()
  const [session, setSession] = useStoredSession()
  const [dark, setDark] = usePersistentState<boolean>('altura:dark', false)
  const [toast, setToast] = useState<{ message: string; kind: ToastKind }>({ message: '', kind: 'info' })
  const timer = useRef<number | undefined>(undefined)

  const closeToast = useCallback(() => setToast((current) => ({ ...current, message: '' })), [])
  const notify = useCallback((message: string, kind: ToastKind = 'info') => {
    setToast({ message, kind })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(closeToast, 3600)
  }, [closeToast])

  const login = useCallback((email: string, name?: string) => {
    const normalized = email.trim().toLowerCase()
    const known = name ? undefined : sampleAccounts.find((account) => account.email === normalized)
    const next: Session = known ?? { name: name?.trim() || nameFromEmail(normalized), email: normalized, role: 'Cliente' }
    setSession(next)
    return next
  }, [setSession])

  const logout = useCallback(() => {
    setSession(null)
    router.push('/')
    notify('Cerraste sesión correctamente.', 'success')
  }, [router, setSession, notify])

  const value = useMemo(
    () => ({ session, ready, login, logout, notify, toast, closeToast, dark, setDark }),
    [session, ready, login, logout, notify, toast, closeToast, dark, setDark],
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
