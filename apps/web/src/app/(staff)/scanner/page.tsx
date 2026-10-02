'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Check, Clock3, LogOut, MapPin, Menu, QrCode, ShieldCheck, Ticket, X } from 'lucide-react'
import { formatDate, initials, roleHome, roleNavigation, serviceCategories, type CategorySlug } from '@sportcomplex/core'
import { Badge, Input } from '@sportcomplex/ui'
import { Brand } from '@/components/brand'
import { UserMenu } from '@/components/user-menu'
import { useApp } from '@/components/app-provider'
import { useBookings } from '@/lib/stores'

type Result = 'valid' | 'used' | 'missing' | 'wrong' | 'inactive'

export default function AccessScannerPage() {
  const { session, notify, logout } = useApp()
  const [bookings, setBookings] = useBookings()
  const [menuOpen, setMenuOpen] = useState(false)
  const [code, setCode] = useState('')
  const [access, setAccess] = useState<CategorySlug>('canchas')
  const [result, setResult] = useState<Result | null>(null)
  const booking = bookings.find((entry) => entry.code === code.trim().toUpperCase())
  const nav = (session?.role && roleNavigation[session.role]) ? roleNavigation[session.role] : roleNavigation.staff

  const validate = () => {
    const next: Result = !booking ? 'missing' : booking.status === 'Usada' ? 'used' : booking.status !== 'Confirmada' ? 'inactive' : booking.category !== access ? 'wrong' : 'valid'
    setResult(next)
    notify(
      next === 'valid' ? 'Tiquete válido: acceso disponible.' : next === 'used' ? 'Este tiquete ya fue utilizado.' : next === 'wrong' ? 'Servicio incorrecto para este punto de acceso.' : next === 'inactive' ? `La reserva está ${booking?.status.toLowerCase()}.` : 'No se encontró el tiquete.',
      next === 'valid' ? 'success' : 'error',
    )
  }
  const label: Record<Result, string> = { valid: 'VÁLIDO', used: 'YA USADO', wrong: 'SERVICIO INCORRECTO', missing: 'NO ENCONTRADO', inactive: 'RESERVA NO ACTIVA' }
  const showTicket = booking && result && result !== 'missing'

  return <main className="scanner-page"><div className="scanner-top"><Link aria-label="Ir al punto de venta" href={session ? roleHome[session.role] : '/'} className="scanner-brand"><Brand light /></Link>
    <nav className="scanner-employee-nav" aria-label="Tareas del empleado">{nav.map(({ label: text, href }) => <Link key={href} href={href} className={href === '/scanner' ? 'scanner-nav-active' : ''}>{text}</Link>)}</nav>
    <UserMenu variant="dark" />
    <button className="scanner-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
    {menuOpen && <nav className="scanner-mobile-nav" aria-label="Tareas del empleado">{nav.map(({ label: text, href }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{text}<ArrowRight size={15} /></Link>)}<button onClick={() => { setMenuOpen(false); logout() }}>Cerrar sesión <LogOut size={15} /></button></nav>}
    <div className="scanner-title"><div className="eyebrow">ALTURA CLUB · CONTROL DE ACCESO</div><h1>Control de <span>acceso.</span></h1><p>Introduce el código del tiquete para validar el ingreso.</p></div>
    <div className="scanner-workspace"><section className="camera-preview" aria-label="Vista del escáner"><div className="camera-texture" /><div className="camera-visual"><div className="camera-frame" aria-hidden="true"><i /><i /><i /><i /><span className="camera-scanline" /></div><span className="camera-hint">ENCUADRA EL CÓDIGO QR</span></div><div className="camera-status"><span><i /> Escáner</span><small>Por ahora, ingresa el código manualmente</small></div></section>
      <form className="scanner-controls" onSubmit={(event) => { event.preventDefault(); validate() }}><div className="scanner-controls-heading"><span><QrCode size={19} /></span><div><h2>Validar tiquete</h2><p>Ingresa el código para revisar el acceso.</p></div></div>
        <label className="scanner-field">Código del tiquete<Input value={code} onChange={(event) => { setCode(event.target.value); setResult(null) }} placeholder="ALT-0000-0000" autoComplete="off" /></label>
        <label className="scanner-field">Acceso seleccionado<select value={access} onChange={(event) => { setAccess(event.target.value as CategorySlug); setResult(null) }}>{serviceCategories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></label>
        <button type="submit" className="camera-trigger" disabled={!code.trim()}><QrCode size={19} /> Validar tiquete</button></form></div>
    {process.env.NODE_ENV !== 'production' && <div className="scanner-examples"><b>Solo en desarrollo</b><div>{bookings.slice(0, 5).map((entry) => <button key={entry.id} onClick={() => { setCode(entry.code); setAccess(entry.category); setResult(null) }} className="scanner-example">{entry.code}</button>)}</div></div>}
    {result ? <section className="scan-result" aria-live="polite"><div className="scan-status"><Badge variant={result === 'valid' ? 'success' : result === 'used' ? 'warning' : 'destructive'} className="text-[12px] px-3 py-1 font-bold tracking-wider inline-flex items-center gap-1.5"><BadgeCheck size={16} /> {label[result]}</Badge></div>
      {showTicket ? <><div className="scan-person"><span className="scan-avatar">{initials(booking.client)}</span><div><b>{booking.client}</b><span>Cliente</span></div></div><div className="scan-details"><span><Ticket size={15} /> {booking.service}</span><span><Clock3 size={15} /> {formatDate(booking.date, { day: 'numeric', month: 'short', year: 'numeric' })} · {booking.time}</span><span><MapPin size={15} /> Sede {booking.sede}</span></div>
        {result === 'valid' && <div className="scan-actions"><button className="allow-button" onClick={() => { setBookings(bookings.map((entry) => entry.id === booking.id ? { ...entry, status: 'Usada' } : entry)); setResult('used'); notify('Acceso registrado.', 'success') }}><Check size={17} /> Registrar acceso</button></div>}</>
        : <p className="scanner-error" role="alert">No existe un tiquete asociado a este código.</p>}</section>
      : <div className="scanner-instructions"><span><ShieldCheck size={17} /></span><p><b>Validación de tiquetes</b><small>Consulta si el tiquete es válido, ya fue usado o corresponde a otro servicio.</small></p></div>}
    <div className="scanner-bottom"><span>ALTURA CLUB · SISTEMA DE ACCESO</span><span>SEDE POBLADO</span></div>
  </main>
}
