'use client'

import Link from 'next/link'
import { ArrowRight, CalendarCheck, CalendarDays, ShieldCheck, Sparkles } from 'lucide-react'
import { formatDate, formatMoney, minPrice, serviceCategories } from '@sportcomplex/core'
import { categoryIcons } from '@/components/category-icons'
import { IconBox } from '@/components/icon-box'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog, useLastCode } from '@/lib/stores'
import { useToday } from '@/lib/persistent-state'

export default function CustomerDashboardPage() {
  const { session } = useApp()
  const [catalog] = useCatalog()
  const [bookings] = useBookings()
  const [, setLastCode] = useLastCode()
  const today = useToday()
  const next = bookings
    .filter((booking) => booking.client === session?.name && booking.status === 'Confirmada')
    .sort((a, b) => a.date.localeCompare(b.date))[0]
  const available = catalog.filter((item) => item.status === 'Disponible').length

  return <main className="section-shell app-page">
    <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot" /> {today ? formatDate(today).toUpperCase() : ''}</div><h1>Hola, {session?.name.split(' ').slice(0, 2).join(' ')} <Sparkles aria-hidden="true" /></h1><p>Un gran día para moverte. ¿Qué te gustaría hacer?</p></div><Link href="/services" className="calendar-shortcut"><CalendarDays size={17} /> Reservar un espacio</Link></div>
    {next
      ? <div className="dashboard-appointment"><div className="appointment-icon"><CalendarCheck size={21} /></div><div className="appointment-info"><span>TU PRÓXIMA RESERVA</span><b>{next.service}</b><small>{formatDate(next.date)}, {next.time} <i>·</i> Sede {next.sede}</small></div><div className="appointment-count"><b>{formatMoney(next.amount)}</b><small>{next.attendees} {next.attendees === 1 ? 'asistente' : 'asistentes'}</small></div><Link href="/confirmation" aria-label="Ver reserva" onClick={() => setLastCode(next.code)} className="appointment-arrow"><ArrowRight size={19} /></Link></div>
      : <div className="dashboard-empty"><span className="empty-icon"><CalendarDays size={21} /></span><div><b>Aún no tienes reservas</b><p>Encuentra un espacio y empieza a planear tu próximo partido.</p></div><Link href="/services">Explorar servicios <ArrowRight size={15} /></Link></div>}
    <div className="section-heading dashboard-heading"><div><div className="eyebrow">HECHO PARA TI</div><h2>¿Qué hacemos <span>hoy?</span></h2></div><span className="open-status"><i /> {available} espacios disponibles ahora</span></div>
    <div className="dashboard-category-grid">{serviceCategories.map(({ slug, name, description, icon, tone, unit }) => {
      const from = minPrice(catalog, slug)
      return <Link href={`/services/${slug}`} key={slug} className="dashboard-category"><IconBox icon={categoryIcons[icon]} tone={tone} /><span className="dash-card-arrow"><ArrowRight size={16} /></span><h3>{name}</h3><p>{description}</p><div className="dashboard-price">{from ? <>Desde {formatMoney(from)}<span>/ {unit}</span></> : 'Próximamente'}</div></Link>
    })}</div>
    <div className="dashboard-bottom"><div className="dashboard-promo"><div className="promo-copy"><div className="eyebrow">ALTURA PARA TODOS</div><h3>Activa tu energía.<br />Conoce nuestros servicios.</h3><Link href="/services" className="text-link">Ver todos los servicios <ArrowRight size={15} /></Link></div></div><div className="mini-tip"><IconBox icon={ShieldCheck} tone="lime" /><div><b>Reserva con confianza</b><p>Cambios gratis hasta 4 horas antes.</p></div></div></div>
  </main>
}
