'use client'

import Link from 'next/link'
import { ArrowRight, Ticket } from 'lucide-react'
import { formatDate } from '@sportcomplex/core'
import { Badge } from '@sportcomplex/ui'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog, useLastCode } from '@/lib/stores'

export default function TicketsPage() {
  const { session } = useApp()
  const [bookings] = useBookings()
  const [catalog] = useCatalog()
  const [, setLastCode] = useLastCode()
  const isClient = session ? session.role === 'customer' : true
  const tickets = session && session.role !== 'customer'
    ? bookings
    : bookings.filter((booking) => booking.client.toLowerCase() === session?.name.toLowerCase())

  return <main className="section-shell app-page demo-page">
    <PageHeading
      eyebrow={isClient ? 'TU ACCESO' : 'CONTROL DE ACCESO'}
      title={isClient ? 'Mis Tiquetes' : 'Tiquetes'}
      description={isClient ? 'Consulta tus reservas vigentes y sus códigos de acceso QR.' : 'Todos los tiquetes registrados en el complejo.'}
    />
    <section className="demo-card">
      <div className="demo-card-heading">
        <div>
          <h2>{isClient ? 'Tus tiquetes' : 'Tiquetes registrados'}</h2>
          <p>{tickets.length} {tickets.length === 1 ? 'tiquete' : 'tiquetes'}</p>
        </div>
        <Ticket size={19} />
      </div>
      {tickets.length === 0 && (
        <div className="demo-record">
          <div>
            <b>Aún no tienes tiquetes</b>
            <span>Cuando hagas una reserva aparecerá aquí.</span>
          </div>
          <Link href="/services" className="calendar-shortcut">
            Explorar servicios <ArrowRight size={14} />
          </Link>
        </div>
      )}
      {tickets.map((booking) => {
        const item = catalog.find((entry) => entry.name === booking.service)
        return (
          <div className="demo-record" key={booking.id}>
            <div>
              <b>{booking.code}</b>
              <span>
                {booking.service} · {formatDate(booking.date, { day: 'numeric', month: 'short', year: 'numeric' })}, {booking.time}
                {!isClient && ` · ${booking.client}`}
              </span>
              <div className="mt-1">
                <Badge variant={booking.status === 'Confirmada' ? 'success' : booking.status === 'Usada' ? 'secondary' : 'warning'}>
                  {booking.status}
                </Badge>
              </div>
            </div>
            {isClient && (
              booking.status === 'Confirmada'
                ? <Link href="/confirmation" onClick={() => setLastCode(booking.code)} className="calendar-shortcut">Ver pase digital <ArrowRight size={14} /></Link>
                : <Link href={item ? `/services/${item.category}/${item.id}` : `/services/${booking.category}`} className="calendar-shortcut">Reservar de nuevo <ArrowRight size={14} /></Link>
            )}
          </div>
        )
      })}
    </section>
  </main>
}
