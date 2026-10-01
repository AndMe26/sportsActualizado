'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { formatDate, formatMoney, timeSlots, type Booking, type BookingStatus } from '@sportcomplex/core'
import { ActionButton } from '@/components/action-button'
import { ConfirmDialog, Modal } from '@/components/modal'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog } from '@/lib/stores'
import { useToday } from '@/lib/persistent-state'

const statuses: BookingStatus[] = ['Confirmada', 'Pendiente', 'Cancelada', 'Usada']

export default function AdminBookingsPage() {
  const { notify } = useApp()
  const [bookings, setBookings] = useBookings()
  const [catalog] = useCatalog()
  const today = useToday()
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState<Booking | null>(null)
  const [form, setForm] = useState({ client: '', itemId: '', date: '', time: timeSlots[8], attendees: 1, status: 'Confirmada' as BookingStatus })
  const item = catalog.find((entry) => entry.id === form.itemId) ?? catalog[0]

  const add = (event: React.FormEvent) => {
    event.preventDefault()
    if (!item) return
    const date = form.date || today
    if (bookings.some((booking) => booking.service === item.name && booking.date === date && booking.time === form.time && booking.status !== 'Cancelada')) { notify('Ese horario ya está reservado para este espacio.', 'error'); return }
    const [, month, day] = date.split('-')
    setBookings([{ id: `b${Date.now()}`, code: `ALT-${day}${month}-${Math.floor(1000 + Math.random() * 9000)}`, client: form.client.trim(), category: item.category, service: item.name, sede: item.sede, date, time: form.time, attendees: form.attendees, amount: item.price * form.attendees, status: form.status }, ...bookings])
    setAdding(false)
    notify('Reserva agregada.', 'success')
  }

  return <main className="section-shell app-page demo-page">
    <PageHeading eyebrow="ADMINISTRACIÓN" title="Reservas" description="Todas las reservas del complejo y su estado." action={<button className="action-button" onClick={() => { setForm({ client: '', itemId: catalog[0]?.id ?? '', date: today, time: timeSlots[8], attendees: 1, status: 'Confirmada' }); setAdding(true) }} disabled={catalog.length === 0}><Plus size={16} /> Agregar reserva</button>} />
    <section className="demo-card"><div className="demo-card-heading"><div><h2>Reservas</h2><p>{bookings.length} {bookings.length === 1 ? 'reserva' : 'reservas'} registradas.</p></div></div>
      <div className="demo-table-wrap"><table className="demo-table"><thead><tr><th>Código</th><th>Cliente</th><th>Servicio</th><th>Horario</th><th>Valor</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
        {bookings.length === 0 && <tr><td colSpan={7}>Aún no hay reservas.</td></tr>}
        {bookings.map((booking) => <tr key={booking.id}><td>{booking.code}</td><td>{booking.client}</td><td>{booking.service} · {booking.sede}</td><td>{formatDate(booking.date, { day: 'numeric', month: 'short' })} · {booking.time}</td><td>{formatMoney(booking.amount)}</td>
          <td><select aria-label={`Estado de la reserva de ${booking.client}`} value={booking.status} onChange={(event) => { setBookings(bookings.map((entry) => entry.id === booking.id ? { ...entry, status: event.target.value as BookingStatus } : entry)); notify('Estado actualizado.', 'success') }}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
          <td><div className="row-actions"><button className="icon-action icon-danger" aria-label={`Eliminar la reserva de ${booking.client}`} onClick={() => setDeleting(booking)}><Trash2 size={15} /></button></div></td></tr>)}
      </tbody></table></div>
    </section>
    {adding && item && <Modal title="Agregar reserva" description="Registra una reserva a nombre de un cliente." onClose={() => setAdding(false)}>
      <form onSubmit={add}>
        <label className="demo-field">Cliente<input required value={form.client} onChange={(event) => setForm({ ...form, client: event.target.value })} placeholder="Nombre del cliente" /></label>
        <label className="demo-field">Servicio<select value={item.id} onChange={(event) => setForm({ ...form, itemId: event.target.value })}>{catalog.map((entry) => <option key={entry.id} value={entry.id}>{entry.name} · {entry.sede}</option>)}</select></label>
        <div className="form-row">
          <label className="demo-field">Fecha<input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label>
          <label className="demo-field">Hora<select value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}>{timeSlots.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
        </div>
        <div className="form-row">
          <label className="demo-field">Asistentes<input required type="number" min="1" max={item.capacity} value={form.attendees} onChange={(event) => setForm({ ...form, attendees: Number(event.target.value) })} /></label>
          <label className="demo-field">Estado<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as BookingStatus })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        </div>
        <p className="form-total">Total: <b>{formatMoney(item.price * form.attendees)} COP</b></p>
        <div className="form-actions"><ActionButton secondary onClick={() => setAdding(false)}>Cancelar</ActionButton><ActionButton type="submit">Agregar</ActionButton></div>
      </form>
    </Modal>}
    {deleting && <ConfirmDialog title="Eliminar reserva" message={`¿Eliminar la reserva ${deleting.code} de ${deleting.client}? El horario quedará libre.`} onCancel={() => setDeleting(null)} onConfirm={() => { setBookings(bookings.filter((entry) => entry.id !== deleting.id)); setDeleting(null); notify('Reserva eliminada.', 'success') }} />}
  </main>
}
