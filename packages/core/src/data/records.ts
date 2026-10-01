import type { CategorySlug } from './catalog'
import type { Role } from '../domain/navigation'

export type BookingStatus = 'Confirmada' | 'Pendiente' | 'Cancelada' | 'Usada'

export type Booking = {
  id: string
  code: string
  client: string
  category: CategorySlug
  service: string
  sede: string
  /** Fecha ISO (YYYY-MM-DD). */
  date: string
  time: string
  attendees: number
  amount: number
  status: BookingStatus
}

export const initialBookings: Booking[] = [
  { id: 'b1', code: 'ALT-2909-1837', client: 'María Camila Restrepo', category: 'canchas', service: 'Cancha de tenis · Cancha 2', sede: 'Poblado', date: '2026-10-02', time: '6:30 p. m.', attendees: 1, amount: 48000, status: 'Confirmada' },
  { id: 'b2', code: 'ALT-2809-1044', client: 'María Camila Restrepo', category: 'piscinas', service: 'Piscina · Nado libre', sede: 'Laureles', date: '2026-09-28', time: '10:00 a. m.', attendees: 1, amount: 22000, status: 'Usada' },
  { id: 'b3', code: 'ALT-2909-2210', client: 'Juan Pablo Gómez', category: 'piscinas', service: 'Piscina · Nado libre', sede: 'Laureles', date: '2026-10-02', time: '6:15 p. m.', attendees: 1, amount: 22000, status: 'Confirmada' },
  { id: 'b4', code: 'ALT-2909-3057', client: 'Sofía López Mejía', category: 'canchas', service: 'Fútbol 5 · Cancha 2', sede: 'Laureles', date: '2026-10-02', time: '5:30 p. m.', attendees: 1, amount: 95000, status: 'Pendiente' },
  { id: 'b5', code: 'ALT-2909-4412', client: 'Daniel Vélez Castro', category: 'gimnasio', service: 'Gimnasio · Sesión individual', sede: 'Laureles', date: '2026-10-02', time: '5:00 p. m.', attendees: 1, amount: 18000, status: 'Confirmada' },
]

export type Employee = { id: string; name: string; email: string; role: Role }

export const initialEmployees: Employee[] = [
  { id: 'e1', name: 'Catalina Ríos', email: 'catalina@altura.co', role: 'Administrador' },
  { id: 'e2', name: 'Andrés Muñoz', email: 'andres@altura.co', role: 'Empleado' },
  { id: 'e3', name: 'Laura Pérez', email: 'laura@altura.co', role: 'Cliente' },
]

export type MembershipPeriod = 'Mensual' | 'Trimestral' | 'Anual'
export type Membership = { id: string; name: string; period: MembershipPeriod; price: number; expires: string; active: boolean }

export const initialMemberships: Membership[] = [
  { id: 'm1', name: 'Esencial', period: 'Mensual', price: 90000, expires: '2026-10-30', active: true },
  { id: 'm2', name: 'Plus', period: 'Trimestral', price: 240000, expires: '2026-12-14', active: true },
  { id: 'm3', name: 'Familiar', period: 'Anual', price: 850000, expires: '2026-09-10', active: false },
]

export type Session = { name: string; email: string; role: Role }

/** Cuentas de ejemplo mientras no exista autenticación real (Auth.js / OAuth). */
export const sampleAccounts: Session[] = [
  { name: 'Catalina Ríos', email: 'admin@altura.co', role: 'Administrador' },
  { name: 'Andrés Muñoz', email: 'empleado@altura.co', role: 'Empleado' },
  { name: 'María Camila Restrepo', email: 'cliente@altura.co', role: 'Cliente' },
]
