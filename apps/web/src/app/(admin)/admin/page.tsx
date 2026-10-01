'use client'

import {
  ArrowRight, BarChart3, CalendarCheck, ChevronDown, CreditCard, Gauge, Sparkles, Users,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatMoney, initials } from '@sportcomplex/core'
import { IconBox } from '@/components/icon-box'
import { useApp } from '@/components/app-provider'
import { useBookings } from '@/lib/stores'
import { useToday } from '@/lib/persistent-state'

export default function AdminDashboardPage() {
  const { session, notify } = useApp()
  const [bookings] = useBookings()
  const today = useToday()
  const tones = { canchas: 'lime', piscinas: 'blue', gimnasio: 'purple', 'zona-humeda': 'orange' } as const
  return <><div className="admin-page-heading"><div><div className="eyebrow">{today ? formatDate(today, { weekday: 'long' }).toUpperCase() : ''}</div><h1>Hola, {session?.name.split(' ')[0]} <Sparkles aria-hidden="true" /></h1><p>Esto es lo que pasa en tu complejo hoy.</p></div><button onClick={() => notify('La exportación de informes estará disponible pronto.')} className="admin-export"><BarChart3 size={16} /> Exportar informe</button></div>
        <div className="metrics-grid">{[
          { label: 'Reservas de hoy', value: '128', change: '+12.8%', icon: CalendarCheck, tone: 'lime', note: 'vs. lunes pasado' },
          { label: 'Ingresos del día', value: '$4.860.000', change: '+8.2%', icon: CreditCard, tone: 'blue', note: 'vs. lunes pasado' },
          { label: 'Ocupación actual', value: '76%', change: '+5.4%', icon: Gauge, tone: 'orange', note: 'vs. lunes pasado' },
          { label: 'Miembros activos', value: '2.406', change: '+3.1%', icon: Users, tone: 'purple', note: 'este mes' },
        ].map(({ label, value, change, icon, tone, note }) => <article key={label} className="metric-card"><div className="metric-card-top"><span>{label}</span><IconBox icon={icon} tone={tone} /></div><div className="metric-card-value">{value}</div><div className="metric-card-foot"><span className="metric-change">↗ {change}</span><span>{note}</span></div><div className="metric-sparkline"><i style={{ height: '34%' }} /><i style={{ height: '55%' }} /><i style={{ height: '45%' }} /><i style={{ height: '70%' }} /><i style={{ height: '52%' }} /><i style={{ height: '82%' }} /><i style={{ height: '62%' }} /><i style={{ height: '100%' }} /></div></article>)}</div>
        <div className="admin-data-grid"><section className="chart-card"><div className="data-card-heading"><div><h2>Reservas por servicio</h2><p>Comportamiento durante el día</p></div><button className="chart-period" onClick={() => notify('Mostrando datos de hoy')}>Hoy <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i /> Reservas completadas</span><span><i /> En curso</span></div><div className="bar-chart"><div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-plot"><div className="chart-grid-lines"><i /><i /><i /><i /><i /></div><div className="bars">{[
          { day: '6 a. m.', a: 22, b: 10 }, { day: '8 a. m.', a: 54, b: 22 }, { day: '10 a. m.', a: 44, b: 19 }, { day: '12 p. m.', a: 68, b: 24 }, { day: '2 p. m.', a: 50, b: 17 }, { day: '4 p. m.', a: 78, b: 14 }, { day: '6 p. m.', a: 87, b: 8 }, { day: '8 p. m.', a: 62, b: 12 },
        ].map((item) => <div className="bar-group" key={item.day}><div className="bar-pair"><i style={{ height: `${item.a}%` }} /><i style={{ height: `${item.b}%` }} /></div><span>{item.day}</span></div>)}</div></div></div></section>
          <section className="occupancy-card"><div className="data-card-heading"><div><h2>Ocupación por sede</h2><p>Estado en tiempo real</p></div><button aria-label="Más opciones" onClick={() => notify('Sedes: Poblado y Laureles')}>•••</button></div><div className="occupancy-main"><div className="donut-chart"><div><b>76<span>%</span></b><small>OCUPACIÓN</small></div></div><div className="occupancy-label"><span><i className="occupancy-lime" /> Poblado</span><b>82%</b><span><i className="occupancy-blue" /> Laureles</span><b>68%</b></div></div><div className="occupancy-bottom"><span><i /> Capacidad total</span><b>386 / 508 espacios</b></div></section></div>
        <section className="reservations-card"><div className="data-card-heading"><div><h2>Reservas recientes</h2><p>Actividad registrada hoy en tus sedes.</p></div><Link href="/admin/bookings" className="text-link">Ver todas <ArrowRight size={15} /></Link></div><div className="table-wrap"><table><thead><tr><th>CLIENTE</th><th>SERVICIO</th><th>HORARIO</th><th>VALOR</th><th>ESTADO</th></tr></thead><tbody>{bookings.slice(0, 4).map((row) => <tr key={row.id}><td><div className="table-client"><span className={`client-initials tone-${tones[row.category]}`}>{initials(row.client)}</span><span><b>{row.client}</b><small>{row.service} · {row.sede}</small></span></div></td><td>{row.service.split(' · ')[0]}</td><td>{row.time}</td><td className="table-price">{formatMoney(row.amount)}</td><td><span className={`reservation-status ${row.status === 'Confirmada' || row.status === 'Usada' ? 'reservation-confirmed' : 'reservation-pending'}`}><i />{row.status}</span></td></tr>)}</tbody></table></div></section>
    </>
}
