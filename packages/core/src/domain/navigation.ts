export type Role = 'Cliente' | 'Administrador' | 'Empleado'

export const roles: Role[] = ['Administrador', 'Cliente', 'Empleado']

export type NavItem = { label: string; href: string }

/** Pantalla de inicio de cada rol después de iniciar sesión. */
export const roleHome: Record<Role, string> = {
  Administrador: '/admin',
  Cliente: '/dashboard',
  Empleado: '/pos',
}

/** Navegación del sitio para quien aún no ha iniciado sesión. */
export const publicNavigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/services' },
]

export const roleNavigation: Record<Role, NavItem[]> = {
  Cliente: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/services' },
    { label: 'Mi cuenta', href: '/dashboard' },
    { label: 'Tiquetes', href: '/tickets' },
  ],
  Empleado: [
    { label: 'Punto de venta', href: '/pos' },
    { label: 'Escáner', href: '/scanner' },
    { label: 'Tiquetes', href: '/tickets' },
  ],
  Administrador: [
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
  { prefix: '/admin', roles: ['Administrador'] },
  { prefix: '/pos', roles: ['Empleado', 'Administrador'] },
  { prefix: '/scanner', roles: ['Empleado', 'Administrador'] },
  { prefix: '/tickets', roles: ['Cliente', 'Empleado', 'Administrador'] },
  { prefix: '/dashboard', roles: ['Cliente'] },
  { prefix: '/checkout', roles: ['Cliente'] },
  { prefix: '/confirmation', roles: ['Cliente'] },
]

export function rolesAllowedFor(pathname: string): Role[] | null {
  return routeAccess.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.roles ?? null
}
