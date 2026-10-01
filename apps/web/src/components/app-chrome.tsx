'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { roleHome, rolesAllowedFor } from '@sportcomplex/core'
import { useApp } from '@/components/app-provider'
import { ToastMessage } from '@/components/toast-message'
import { TopBar } from '@/components/top-bar'

/** Marco común del sitio: barra superior, tema, avisos y protección de rutas por rol. */
export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { session, ready, dark, toast, closeToast } = useApp()

  const allowed = rolesAllowedFor(pathname)
  const openRoutes = process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_DEV_OPEN_ROUTES === 'true'
  const blocked = !openRoutes && allowed !== null && (!session || !allowed.includes(session.role))

  useEffect(() => {
    if (!ready || !blocked) return
    router.replace(session ? roleHome[session.role] : `/login?next=${encodeURIComponent(pathname)}`)
  }, [ready, blocked, session, pathname, router])

  const hideTopBar = pathname.startsWith('/admin') || pathname === '/scanner'
  const showContent = allowed === null || (ready && !blocked)

  return <div className={`club-app ${dark ? 'dark' : ''}`}>
    {!hideTopBar && <TopBar />}
    {showContent ? children : <div className="route-loading" role="status">Cargando…</div>}
    <ToastMessage message={toast.message} kind={toast.kind} close={closeToast} />
  </div>
}
