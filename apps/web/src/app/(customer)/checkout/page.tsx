'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, ShieldCheck } from 'lucide-react'
import { categoryBySlug, formatDate, formatMoney, type Booking } from '@sportcomplex/core'
import { categoryIcons } from '@/components/category-icons'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog, useDraft, useLastCode } from '@/lib/stores'

export default function CheckoutPage() {
  const router = useRouter()
  const { session, notify } = useApp()
  const [catalog] = useCatalog()
  const [bookings, setBookings] = useBookings()
  const [draft, setDraft] = useDraft()
  const [, setLastCode] = useLastCode()
  const item = draft ? catalog.find((entry) => entry.id === draft.itemId) : undefined
  const category = item ? categoryBySlug(item.category) : undefined

  if (!draft || !item || !category) {
    return <main className="section-shell payment-page"><div className="dashboard-empty"><div><b>No tienes una reserva en curso</b><p>Elige un espacio y un horario para continuar.</p></div><Link href="/services">Ver servicios <ArrowRight size={15} /></Link></div></main>
  }

  const total = item.price * draft.attendees
  const Icon = categoryIcons[category.icon]

  const confirm = () => {
    const clash = bookings.some((booking) => booking.service === item.name && booking.date === draft.date && booking.time === draft.time && booking.status !== 'Cancelada')
    if (clash) { notify('Ese horario acaba de ser reservado. Elige otro.', 'error'); router.push(`/services/${item.category}/${item.id}`); return }
    const [, month, day] = draft.date.split('-')
    const booking: Booking = {
      id: `b${Date.now()}`,
      code: `ALT-${day}${month}-${Math.floor(1000 + Math.random() * 9000)}`,
      client: session?.name ?? 'Cliente',
      category: item.category,
      service: item.name,
      sede: item.sede,
      date: draft.date,
      time: draft.time,
      attendees: draft.attendees,
      amount: total,
      status: 'Confirmada',
    }
    setBookings([booking, ...bookings])
    setLastCode(booking.code)
    setDraft(null)
    router.push('/confirmation')
  }

  return <main className="section-shell payment-page"><Link href={`/services/${item.category}/${item.id}`} className="back-link"><ArrowLeft size={15} /> Volver a la reserva</Link><div className="checkout-progress"><span className="progress-step done"><Check size={13} /> Espacio</span><i /><span className="progress-step active">2&nbsp; Pago</span><i /><span className="progress-step">3&nbsp; Confirmación</span></div><div className="payment-layout"><section className="payment-form"><div className="eyebrow">UN ÚLTIMO PASO</div><h1>Completa tu <span>reserva.</span></h1><p>Revisa los datos y confirma. Tu tiquete con código QR quedará disponible en «Tiquetes».</p>
    {/* TODO(pagos): reemplazar por la pasarela de pago cuando se conecte un proveedor. */}
    <div className="payment-method"><div className="payment-method-heading"><span>Pago en el complejo</span></div><p>Por ahora el pago se realiza en la sede al llegar. El pago en línea se habilitará próximamente.</p></div>
    <button onClick={confirm} className="action-button w-full justify-center">Confirmar reserva · {formatMoney(total)} <ArrowRight size={16} /></button>
    <Link href="/dashboard" className="demo-payment-link">Cancelar y volver a mi cuenta</Link>
    <div className="secure-foot"><ShieldCheck size={15} /> No se solicitan datos bancarios</div>
  </section><aside className="order-card"><div className="eyebrow">RESUMEN DE COMPRA</div><h3>Tu reserva</h3><div className="order-service"><div className="order-service-thumb"><Icon size={23} /></div><div><b>{item.name}</b><span>Sede {item.sede} · {draft.attendees} {draft.attendees === 1 ? 'asistente' : 'asistentes'}</span></div></div><div className="order-item"><span><CalendarDays size={15} /> {formatDate(draft.date)}</span><span><Clock3 size={15} /> {draft.time} · 60 minutos</span></div><div className="order-price"><span>{formatMoney(item.price)} × {draft.attendees}</span><b>{formatMoney(total)}</b></div><div className="order-total"><span>Total</span><b>{formatMoney(total)} <small>COP</small></b></div></aside></div></main>
}
