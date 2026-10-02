export type Role = 'customer' | 'admin' | 'staff'

export const roles: Role[] = ['admin', 'customer', 'staff']

export type NavItem = { label: string; href: string }

/** Pantalla de inicio de cada rol después de iniciar sesión. */
export const roleHome: Record<Role, string> = {
  admin: '/admin',
  customer: '/dashboard',
  staff: '/pos',
}

/** Navegación del sitio para quien aún no ha iniciado sesión. */
export const publicNavigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/services' },
]

export const roleNavigation: Record<Role, NavItem[]> = {
  customer: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/services' },
    { label: 'Mi cuenta', href: '/dashboard' },
    { label: 'Tiquetes', href: '/tickets' },
  ],
  staff: [
    { label: 'Punto de venta', href: '/pos' },
    { label: 'Escáner', href: '/scanner' },
    { label: 'Tiquetes', href: '/tickets' },
  ],
  admin: [
    { label: 'Resumen', href: '/admin' },
    { label: 'Catálogo', href: '/admin/catalog' },
    { label: 'Empleados', href: '/admin/employees' },
    { label: 'Reservas', href: '/admin/bookings' },
    { label: 'Membresías', href: '/admin/memberships' },
    { label: 'Configuración', href: '/admin/settings' },
  ],
}

/** Qué roles pueden entrar a cada zona del sitio (por prefijo de ruta). */
export const routeAccess: { prefix: string; roles: Role[] }[] = [
  { prefix: '/admin', roles: ['admin'] },
  { prefix: '/pos', roles: ['staff', 'admin'] },
  { prefix: '/scanner', roles: ['staff', 'admin'] },
  { prefix: '/tickets', roles: ['customer', 'staff', 'admin'] },
  { prefix: '/dashboard', roles: ['customer'] },
  { prefix: '/checkout', roles: ['customer', 'admin'] },
  { prefix: '/confirmation', roles: ['customer', 'admin'] },
]

export function rolesAllowedFor(pathname: string): Role[] | null {
  return routeAccess.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.roles ?? null
}
