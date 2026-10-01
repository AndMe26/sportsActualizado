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
