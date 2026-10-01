export type CategorySlug = 'canchas' | 'piscinas' | 'gimnasio' | 'zona-humeda'
export type CategoryIcon = 'court' | 'pool' | 'gym' | 'wellness'

export type ServiceCategory = {
  slug: CategorySlug
  name: string
  singular: string
  description: string
  icon: CategoryIcon
  tone: string
  /** Texto de la unidad de cobro: "/ hora", "/ sesión"… */
  unit: string
}

export const serviceCategories: ServiceCategory[] = [
  { slug: 'canchas', name: 'Canchas', singular: 'Cancha', description: 'Fútbol, pádel y tenis', icon: 'court', tone: 'lime', unit: 'hora' },
  { slug: 'piscinas', name: 'Piscinas', singular: 'Piscina', description: 'Carriles y nado libre', icon: 'pool', tone: 'blue', unit: 'entrada' },
  { slug: 'gimnasio', name: 'Gimnasio', singular: 'Gimnasio', description: 'Entrena a tu ritmo', icon: 'gym', tone: 'orange', unit: 'sesión' },
  { slug: 'zona-humeda', name: 'Zona húmeda', singular: 'Zona húmeda', description: 'Sauna, turco y jacuzzi', icon: 'wellness', tone: 'purple', unit: 'acceso' },
]

export function categoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug)
}

export type CatalogStatus = 'Disponible' | 'Mantenimiento'

export type CatalogItem = {
  id: string
  category: CategorySlug
  name: string
  description: string
  price: number
  sede: string
  capacity: number
  status: CatalogStatus
}

/** Datos iniciales. Cuando exista base de datos, esto se reemplaza por una consulta. */
export const initialCatalog: CatalogItem[] = [
  { id: 'tenis-cancha-1', category: 'canchas', name: 'Cancha de tenis · Cancha 1', description: 'Polvo de ladrillo con iluminación nocturna.', price: 48000, sede: 'Poblado', capacity: 4, status: 'Disponible' },
  { id: 'tenis-cancha-2', category: 'canchas', name: 'Cancha de tenis · Cancha 2', description: 'Cancha profesional en polvo de ladrillo.', price: 48000, sede: 'Poblado', capacity: 4, status: 'Disponible' },
  { id: 'padel-cancha-1', category: 'canchas', name: 'Pádel · Cancha 1', description: 'Cancha panorámica con cerramiento en vidrio.', price: 60000, sede: 'Laureles', capacity: 4, status: 'Disponible' },
  { id: 'futbol-5-cancha-1', category: 'canchas', name: 'Fútbol 5 · Cancha 1', description: 'Césped sintético con graderías.', price: 95000, sede: 'Poblado', capacity: 10, status: 'Mantenimiento' },
  { id: 'futbol-5-cancha-2', category: 'canchas', name: 'Fútbol 5 · Cancha 2', description: 'Césped sintético techado.', price: 95000, sede: 'Laureles', capacity: 10, status: 'Disponible' },
  { id: 'piscina-nado-libre', category: 'piscinas', name: 'Piscina · Nado libre', description: 'Carriles de nado libre en piscina semiolímpica.', price: 22000, sede: 'Laureles', capacity: 6, status: 'Disponible' },
  { id: 'piscina-carril-entrenamiento', category: 'piscinas', name: 'Piscina · Carril de entrenamiento', description: 'Carril exclusivo para entrenamiento.', price: 30000, sede: 'Poblado', capacity: 2, status: 'Disponible' },
  { id: 'gimnasio-sesion-individual', category: 'gimnasio', name: 'Gimnasio · Sesión individual', description: 'Acceso a zona de pesas y cardio.', price: 18000, sede: 'Laureles', capacity: 1, status: 'Disponible' },
  { id: 'gimnasio-funcional', category: 'gimnasio', name: 'Gimnasio · Zona funcional', description: 'Espacio de entrenamiento funcional.', price: 20000, sede: 'Poblado', capacity: 1, status: 'Disponible' },
  { id: 'zona-humeda-sauna', category: 'zona-humeda', name: 'Zona húmeda · Sauna', description: 'Sauna seco para relajación.', price: 25000, sede: 'Poblado', capacity: 6, status: 'Disponible' },
  { id: 'zona-humeda-turco-jacuzzi', category: 'zona-humeda', name: 'Zona húmeda · Turco y jacuzzi', description: 'Turco y jacuzzi de agua caliente.', price: 28000, sede: 'Poblado', capacity: 6, status: 'Disponible' },
]

export function minPrice(items: CatalogItem[], slug: CategorySlug): number | null {
  const prices = items.filter((item) => item.category === slug && item.status === 'Disponible').map((item) => item.price)
  return prices.length ? Math.min(...prices) : null
}

export function makeId(name: string): string {
  const base = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${base || 'item'}-${Math.random().toString(36).slice(2, 7)}`
}

export const sedes = ['Poblado', 'Laureles']

export const timeSlots = ['7:00 a. m.', '8:30 a. m.', '10:00 a. m.', '11:30 a. m.', '1:00 p. m.', '2:30 p. m.', '4:00 p. m.', '5:00 p. m.', '6:30 p. m.', '7:30 p. m.', '8:30 p. m.', '9:00 p. m.']
