'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, LogOut, Menu, Moon, Sun, X } from 'lucide-react'
import { publicNavigation, roleHome, roleNavigation } from '@sportcomplex/core'
import { Brand } from '@/components/brand'
import { UserMenu } from '@/components/user-menu'
import { useApp } from '@/components/app-provider'

export function TopBar() {
  const pathname = usePathname()
  const { session, ready, logout, dark, setDark } = useApp()
  const [openMenu, setOpenMenu] = useState(false)
  const items = session ? roleNavigation[session.role] : publicNavigation
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))
  const close = () => setOpenMenu(false)

  return <header className={`topbar sticky top-0 z-50 backdrop-blur-md ${session?.role === 'staff' ? 'employee-topbar' : ''}`}>
    <div className="topbar-inner">
      <Link href={session && roleHome[session.role] ? roleHome[session.role] : '/'} aria-label="Ir al inicio" onClick={close}><Brand /></Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
        {items && items.map(({ label, href }) => <Link key={href} href={href} className={`nav-link ${isActive(href) ? 'nav-active' : ''}`}>{label}</Link>)}
      </nav>
      <div className="flex items-center gap-4">
        <button type="button" className="theme-toggle" aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <span className="topbar-action-divider" aria-hidden="true" />
        {ready && (session
          ? <UserMenu />
          : <Link href="/login" className="action-button nav-access">Acceso al complejo <ArrowRight size={15} /></Link>)}
        <button type="button" aria-label={openMenu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={openMenu} className="mobile-menu" onClick={() => setOpenMenu(!openMenu)}>{openMenu ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
    {openMenu && <div className="mobile-nav">
      {items.map(({ label, href }) => <Link key={href} href={href} onClick={close}>{label}<ArrowRight size={15} /></Link>)}
      <button type="button" className="mobile-theme-option" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? <Sun size={16} /> : <Moon size={16} />}{dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}</button>
      {ready && session && <button type="button" className="mobile-logout" onClick={() => { close(); logout() }}>Cerrar sesión <LogOut size={15} /></button>}
    </div>}
  </header>
}
