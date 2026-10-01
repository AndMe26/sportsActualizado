'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, ShieldCheck, Users } from 'lucide-react'
import { categoryBySlug, formatDate, formatMoney, timeSlots as slots, toIso } from '@sportcomplex/core'
import { categoryIcons } from '@/components/category-icons'
import { IconBox } from '@/components/icon-box'
import { ReservationModal } from '@/components/reservation-modal'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog, useDraft, useSettings } from '@/lib/stores'
import { useToday } from '@/lib/persistent-state'

export default function BookingPage() {
  const { category: slug, id } = useParams<{ category: string; id: string }>()
  const router = useRouter()
  const { session, ready, notify } = useApp()
  const [catalog] = useCatalog()
  const [bookings] = useBookings()
  const [, setDraft] = useDraft()
  const [settings] = useSettings()
  const today = useToday()
  const category = categoryBySlug(slug)
  const item = catalog.find((entry) => entry.id === id && entry.category === slug)
  const [dayIndex, setDayIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState('6:30 p. m.')
  const [attendees, setAttendees] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const days = useMemo(() => {
    if (!today) return []
    const [year, month, day] = today.split('-').map(Number)
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(year, month - 1, day + index, 12)
      return { iso: toIso(date), label: date.toLocaleDateString('es-CO', { weekday: 'short' }).replace('.', ''), day: date.getDate() }
    })
  }, [today])

  if (ready && (!category || !item)) notFound()
  if (!category || !item) return <main className="section-shell booking-page" />

  const selected = days[dayIndex]
  const taken = new Set(bookings.filter((booking) => booking.service === item.name && booking.date === selected?.iso && booking.status !== 'Cancelada').map((booking) => booking.time))
  const Icon = categoryIcons[category.icon]
  const maxAttendees = Math.max(1, Math.min(item.capacity, 6))

  const reserve = () => {
    if (!selected) return
    if (!settings.bookingsOpen) { notify('Las reservas en línea están pausadas por ahora.', 'error'); return }
    if (item.status !== 'Disponible') { notify('Este espacio no está disponible por ahora.', 'error'); return }
    if (!session) { notify('Inicia sesión para continuar con tu reserva.'); router.push(`/login?next=${encodeURIComponent(`/services/${category.slug}/${item.id}`)}`); return }
    setDraft({ itemId: item.id, date: selected.iso, time: selectedSlot, attendees })
    setModalOpen(true)
  }

  return <main className="section-shell booking-page">
    <Link href={`/services/${category.slug}`} className="back-link"><ArrowLeft size={15} /> Volver a {category.name.toLowerCase()}</Link>
    <div className="booking-layout"><div className="booking-main">
      <div className="booking-heading"><IconBox icon={Icon} tone={category.tone} className="booking-icon" /><div><div className="eyebrow">RESERVA TU ESPACIO</div><h1>{item.name}</h1><p>{item.description} · Sede {item.sede}</p></div></div>
      <div className="booking-photo"><div className="booking-photo-overlay"><span><span className="live-dot" /> {item.status.toUpperCase()}</span><span><MapPin size={13} /> Sede {item.sede}</span></div></div>
      <div className="calendar-section"><div className="calendar-heading"><div><h2>Elige tu día</h2><p>Selecciona una fecha para ver los horarios disponibles.</p></div>{selected && <span className="calendar-month">{formatDate(selected.iso, { month: 'long', year: 'numeric' })}</span>}</div>
        <div className="week-grid">{days.map((day, i) => <button key={day.iso} onClick={() => setDayIndex(i)} className={`day-choice ${dayIndex === i ? 'day-selected' : ''}`}><span>{day.label}</span><b>{day.day}</b></button>)}</div>
      </div>
      <div className="slots-section"><div className="slots-title"><div><h2>Horarios disponibles</h2><p>{selected ? formatDate(selected.iso) : ''}</p></div><div className="slot-legend"><span><i className="legend-open" />Disponible</span><span><i className="legend-blocked" />Ocupado</span></div></div>
        <div className="slot-grid">{slots.map((slot) => <button disabled={taken.has(slot)} key={slot} onClick={() => setSelectedSlot(slot)} className={`slot-button ${taken.has(slot) ? 'slot-disabled' : ''} ${slot === selectedSlot ? 'slot-selected' : ''}`}>{slot}</button>)}</div>
      </div>
    </div>
    <aside className="booking-summary"><div className="summary-top"><span className="eyebrow">RESUMEN DE RESERVA</span><span className="summary-secure"><ShieldCheck size={14} /> Reserva segura</span></div>
      <h3>Tu próximo<br />momento te espera.</h3>
      <div className="summary-detail"><CalendarDays size={17} /><div><small>Fecha</small><b>{selected ? formatDate(selected.iso) : '—'}</b></div></div>
      <div className="summary-detail"><Clock3 size={17} /><div><small>Hora y duración</small><b>{selectedSlot} · 60 minutos</b></div></div>
      <div className="summary-detail"><MapPin size={17} /><div><small>Sede</small><b>{item.sede} · Medellín</b></div></div>
      <label className="summary-detail attendee-select"><Users size={17} /><span>Asistentes</span><select aria-label="Cantidad de asistentes" value={attendees} onChange={(event) => setAttendees(Number(event.target.value))}>{Array.from({ length: maxAttendees }, (_, i) => i + 1).map((count) => <option key={count} value={count}>{count}</option>)}</select></label>
      <div className="summary-total"><span>Total a pagar</span><b>{formatMoney(item.price * attendees)} <small>COP</small></b></div>
      <button className="action-button w-full justify-center" onClick={reserve} disabled={!selected}>Reservar este horario <ArrowRight size={16} /></button>
      {!session && ready && <p className="summary-note"><ShieldCheck size={13} /> Necesitas iniciar sesión para confirmar.</p>}
    </aside></div>
    {modalOpen && selected && <ReservationModal item={item} date={selected.iso} time={selectedSlot} attendees={attendees} close={() => setModalOpen(false)} proceed={() => { setModalOpen(false); router.push('/checkout') }} />}
  </main>
}
