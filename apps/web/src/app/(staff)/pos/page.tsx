'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react'
import { formatMoney } from '@sportcomplex/core'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { useBookings, useCatalog } from '@/lib/stores'

export default function PointOfSalePage() {
  const { session, notify } = useApp()
  const [catalog] = useCatalog()
  const [bookings] = useBookings()
  const services = catalog.filter((item) => item.status === 'Disponible')
  const clients = Array.from(new Set(bookings.map((booking) => booking.client)))
  const [serviceId, setServiceId] = useState('')
  const [client, setClient] = useState('Cliente ocasional')
  const [member, setMember] = useState(false)
  const [saleCode, setSaleCode] = useState<string | null>(null)
  const service = services.find((item) => item.id === serviceId) ?? services[0]
  const subtotal = service?.price ?? 0
  const discount = member ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  return <main className="section-shell app-page demo-page">
    <PageHeading eyebrow="ALTURA CLUB · CAJA" title="Punto de venta" description="Registra una venta y revisa el cálculo antes de completarla." />
    <div className="demo-columns"><section className="demo-card"><div className="demo-card-heading"><div><h2>Nueva venta</h2><p>Selecciona el servicio y el cliente.</p></div><CreditCard size={19} /></div>
      <label className="demo-field">Servicio<select value={service?.id ?? ''} onChange={(event) => setServiceId(event.target.value)}>{services.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label className="demo-field">Cliente<select value={client} onChange={(event) => setClient(event.target.value)}><option>Cliente ocasional</option>{clients.map((name) => <option key={name}>{name}</option>)}</select></label>
      <label className="demo-check"><input type="checkbox" checked={member} onChange={(event) => setMember(event.target.checked)} /> Aplicar descuento de membresía (10%)</label>
      <div className="demo-total-row"><span>Servicio</span><b>{formatMoney(subtotal)} COP</b></div>
      <div className="demo-total-row"><span>Descuento de miembro</span><b>−{formatMoney(discount)} COP</b></div>
      <div className="demo-total-row demo-total-final"><span>Total</span><b>{formatMoney(total)} COP</b></div>
      {/* TODO(ventas): persistir la venta en la base de datos. */}
      <button className="action-button" disabled={!service} onClick={() => {
        if (saleCode) { setSaleCode(null); return }
        setSaleCode(`POS-${Date.now().toString().slice(-6)}`)
        notify('Venta registrada correctamente.', 'success')
      }}>{saleCode ? 'Iniciar otra venta' : 'Completar venta'} <ArrowRight size={16} /></button>
      {saleCode && <p className="demo-success" role="status"><CheckCircle2 size={17} /> Venta {saleCode} completada.</p>}
    </section><aside className="demo-card demo-side-note"><ShieldCheck size={22} /><h2>Resumen de caja</h2><p>Vendedor: {session?.name}</p><p>Cliente: {client}</p></aside></div>
  </main>
}
