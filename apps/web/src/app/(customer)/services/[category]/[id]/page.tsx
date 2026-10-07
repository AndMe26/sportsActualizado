'use client'

import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, ShieldCheck, Users } from 'lucide-react'
import { calculateBookingPrice, categoryBySlug, formatDate, formatMoney, roleHome, timeSlots } from '@sportcomplex/core'
import { Badge } from '@sportcomplex/ui'
import { categoryIcons } from '@/components/category-icons'
import { IconBox } from '@/components/icon-box'
import { SportsSpecsGrid } from '@/components/sports-specs-grid'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog, useDraft } from '@/lib/stores'
import { useToday } from '@/lib/persistent-state'

function getWeekDates(today: string) {
  if (!today) return []
  const [year, month, day] = today.split('-').map(Number)
  const firstDate = new Date(year, month - 1, day, 12)
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(firstDate)
    date.setDate(firstDate.getDate() + offset)
    const pad = (value: number) => String(value).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  })
}

export default function ServiceBookingPage() {
  const { category: slug, id } = useParams<{ category: string; id: string }>()
  const router = useRouter()
  const { notify, ready, session } = useApp()
  const [catalog] = useCatalog()
  const [bookings] = useBookings()
  const [, setDraft] = useDraft()
  const category = categoryBySlug(slug)
  const item = catalog.find((entry) => entry.id === id && entry.category === slug)
  const today = useToday()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [attendees, setAttendees] = useState(1)
  const reservationPath = `/services/${slug}/${id}`

  useEffect(() => {
    if (today) {
      setSelectedDate(today)
      setSelectedTime('')
      setAttendees(1)
    }
  }, [id, today])

  if (!category || !item) notFound()
  if (!ready) return <main className="section-shell booking-page" aria-busy="true" />

  const available = item.status === 'Disponible'
  const isCourt = item.category === 'canchas'
  const weekDates = getWeekDates(today)
  const total = calculateBookingPrice(item, attendees)
  const maxAttendees = Math.max(1, item.capacity)
  const Icon = categoryIcons[category.icon]

  const continueToCheckout = () => {
    if (!available || !selectedDate || !selectedTime) return
    if (!session) {
      router.push(`/login?next=${encodeURIComponent(reservationPath)}`)
      return
    }
    setDraft({ itemId: item.id, date: selectedDate, time: selectedTime, attendees })
    router.push('/checkout')
  }

  return (
    <main className="section-shell booking-page">
      <Link href={`/services/${category.slug}`} className="back-link">
        <ArrowLeft size={15} /> Volver a {category.name.toLowerCase()}
      </Link>
      <div className="booking-layout">
        <section>
          {/* Hero Panorámico de Reserva con Card Glass Flotante */}
          <div className="booking-hero-container">
            <img
              className="booking-cover-image"
              src={item.image || '/images/club-hero.png'}
              alt={item.name}
              onError={(event) => { event.currentTarget.src = '/images/club-hero.png' }}
            />
            <div className="booking-hero-gradient" />

            {/* Contenedor Glassmorphism Flotante con Icono y Detalles */}
            <div className="booking-glass-info-card">
              <IconBox icon={Icon} tone={category.tone} className="booking-glass-icon" />
              <div className="booking-glass-text">
                <div className="booking-glass-title-row">
                  <h1 className="booking-glass-title">
                    {item.name.toLowerCase().startsWith((category.singular || category.name).toLowerCase())
                      ? item.name
                      : `${category.singular || category.name} · ${item.name}`}
                  </h1>
                  {session?.role === 'admin' && (
                    <Badge variant="admin" className="ml-2">ADMIN</Badge>
                  )}
                </div>
                <p className="booking-glass-desc">
                  {item.description} · Sede {item.sede}
                </p>
              </div>
            </div>

            {/* Badges Flotantes de Estado y Sede */}
            <div className="booking-bottom-badges">
              <span className="booking-status-badge">
                <i className="live-dot" style={{ background: available ? undefined : '#edb45b' }} />
                {available ? 'DISPONIBLE' : 'NO DISPONIBLE'}
              </span>
              <span className="booking-sede-badge">
                <MapPin size={13} /> Sede {item.sede}
              </span>
            </div>
          </div>

          {/* Ficha técnica deportiva (Alpine Guides & Roland Garros) */}
          <SportsSpecsGrid categorySlug={category.slug} itemId={item.id} capacity={item.capacity} />

          {/* Divisor estilo líneas de cancha (Roland Garros) */}
          <div className="court-line-divider" />

          <section className="calendar-section">
            <div className="calendar-heading">
              <div><h2>Elige tu día</h2><p>Selecciona una fecha para ver los horarios disponibles.</p></div>
              <span className="calendar-month"><CalendarDays size={13} />{weekDates[0] ? formatDate(weekDates[0], { month: 'long', year: 'numeric' }) : ''}</span>
            </div>
            <div className="week-grid">
              {weekDates.map((date) => (
                <button key={date} type="button" className={`day-choice ${date === selectedDate ? 'day-selected' : ''}`} aria-pressed={date === selectedDate} onClick={() => { setSelectedDate(date); setSelectedTime('') }}>
                  <span>{formatDate(date, { weekday: 'short' })}</span><b>{Number(date.slice(-2))}</b><i />
                </button>
              ))}
            </div>
          </section>

          <section className="slots-section">
            <div className="slots-title">
              <div><h2>Horarios disponibles</h2><p>{selectedDate ? formatDate(selectedDate) : 'Selecciona un día'}</p></div>
              <div className="slot-legend"><span><i className="legend-open" />Disponible</span><span><i className="legend-blocked" />Ocupado</span></div>
            </div>
            <div className="slot-grid">
              {timeSlots.map((time) => {
                const booked = bookings.some((booking) => booking.service === item.name && booking.date === selectedDate && booking.time === time && booking.status !== 'Cancelada')
                const disabled = !available || !selectedDate || booked
                return <button key={time} type="button" className={`slot-button ${selectedTime === time ? 'slot-selected' : ''} ${disabled ? 'slot-disabled' : ''}`} disabled={disabled} aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}>{time}</button>
              })}
            </div>
          </section>
        </section>

        <aside className="booking-summary">
          <div className="summary-top"><div className="eyebrow">RESUMEN DE RESERVA</div><div className="summary-secure"><ShieldCheck size={11} /> Reserva segura</div></div>
          <h3>Tu próximo<br />momento te espera.</h3>
          <div className="summary-detail"><CalendarDays size={15} /><div><small>Fecha</small><b>{selectedDate ? formatDate(selectedDate) : 'Elige un día'}</b></div></div>
          <div className="summary-detail"><Clock3 size={15} /><div><small>Hora y duración</small><b>{selectedTime ? `${selectedTime} · 60 minutos` : 'Elige un horario'}</b></div></div>
          <div className="summary-detail"><MapPin size={15} /><div><small>Sede</small><b>{item.sede}</b></div></div>
          {!isCourt && <label className="attendee-select"><span><Users size={14} /> Asistentes</span><select aria-label="Cantidad de asistentes" value={attendees} onChange={(event) => setAttendees(Number(event.target.value))}>{Array.from({ length: maxAttendees }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count}</option>)}</select></label>}
          <div className="summary-total"><span>Total a pagar</span><b>{formatMoney(total)} <small>COP</small></b></div>
          <button className="action-button w-full justify-center" onClick={continueToCheckout} disabled={!available || !selectedDate || !selectedTime}>
            {selectedTime ? (session?.role === 'admin' ? 'Probar checkout (Auditor)' : !session ? 'Continuar (Iniciar sesión)' : 'Reservar este horario') : 'Elige un horario'} <ArrowRight size={15} />
          </button>
          <p className="summary-note"><ShieldCheck size={11} /> El horario se confirma al terminar la reserva.</p>
        </aside>
      </div>
    </main>
  )
}