'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Check, CheckCircle2, CreditCard, MapPin } from 'lucide-react'
import { formatDate, formatMoney } from '@sportcomplex/core'
import { useBookings, useLastCode } from '@/lib/stores'

function QRGraphic() {
  const blocks = useMemo(() => Array.from({ length: 441 }, (_, i) => {
    const x = i % 21; const y = Math.floor(i / 21)
    const inEye = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
    if (inEye) {
      const ax = x < 7 ? x : x - 14; const ay = y < 7 ? y : y - 14
      return ax === 0 || ax === 6 || ay === 0 || ay === 6 || (ax >= 2 && ax <= 4 && ay >= 2 && ay <= 4)
    }
    return (x * 7 + y * 11 + x * y * 3) % 5 < 2
  }), [])
  return <div className="qr-shell" aria-label="Código QR de acceso"><div className="qr-grid">{blocks.map((active, i) => <i key={i} className={active ? 'qr-on' : ''} />)}</div></div>
}

export default function ReservationConfirmationPage() {
  const [bookings] = useBookings()
  const [code] = useLastCode()
  const booking = bookings.find((entry) => entry.code === code)

  if (!booking) {
    return <main className="confirmation-page"><h1>No encontramos <span>esa reserva.</span></h1><p className="confirmation-copy">Consulta tus reservas en la sección de tiquetes.</p><div className="confirmation-actions"><Link href="/tickets" className="action-button">Ir a mis tiquetes <ArrowRight size={16} /></Link></div></main>
  }

  return <main className="confirmation-page"><div className="success-ring"><Check size={37} strokeWidth={2.5} /></div><div className="eyebrow success-eyebrow"><span className="live-dot" /> RESERVA CONFIRMADA</div><h1>¡Tu reserva está <span>lista!</span></h1><p className="confirmation-copy">Presenta este código QR en el acceso de la sede.</p>
    <div className="ticket-card"><div className="ticket-header"><div><span className="eyebrow">TU PASE DE ACCESO</span><h2>{booking.service}</h2><p>Sede {booking.sede} · Medellín</p></div><span className="ticket-status"><BadgeCheck size={14} /> {booking.status.toUpperCase()}</span></div><div className="ticket-separator"><i /><span /><i /></div>
      <div className="ticket-info"><div><small>FECHA</small><b>{formatDate(booking.date)}</b></div><div><small>HORA · ASISTENTES</small><b>{booking.time} · {booking.attendees} {booking.attendees === 1 ? 'persona' : 'personas'}</b></div></div>
      <div className="ticket-qr"><QRGraphic /><div><b>Tu entrada, siempre a mano.</b><span>Muestra el código en el control de acceso.</span><small>{booking.code}</small></div></div>
      <div className="ticket-footer"><span><MapPin size={14} /> Sede {booking.sede}</span><span><CreditCard size={14} /> {formatMoney(booking.amount)} COP</span></div></div>
    <div className="email-notice"><span className="email-icon"><CheckCircle2 size={19} /></span><p><b>Pago en el complejo</b><span>Recuerda cancelar el valor al llegar a la sede.</span></p></div>
    <div className="confirmation-actions"><Link href="/tickets" className="action-button">Ir a mis tiquetes <ArrowRight size={16} /></Link><Link href="/" className="text-link">Volver al inicio</Link></div></main>
}
