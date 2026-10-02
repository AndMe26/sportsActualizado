import type { CatalogItem } from '../data/catalog'

export function formatMoney(amount: number): string {
  return `$${amount.toLocaleString('es-CO')}`
}

export function initials(name: string): string {
  return name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('').toUpperCase()
}

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }): string {
  const [year, month, day] = iso.split('-').map(Number)
  const text = new Date(year, month - 1, day, 12).toLocaleDateString('es-CO', options)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function toIso(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/**
 * Calcula el valor total de una reserva.
 * Si el servicio es una cancha, el cobro es fijo por el espacio completo.
 * Para los demás servicios, se multiplica por la cantidad de asistentes.
 */
export function calculateBookingPrice(item: CatalogItem, attendees: number): number {
  if (item.category === 'canchas') {
    return item.price
  }
  return item.price * Math.max(1, attendees)
}