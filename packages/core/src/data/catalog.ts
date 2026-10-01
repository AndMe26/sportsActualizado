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

export interface CatalogItem {
  id: string
  name: string
  category: string
  sede: string
  description: string
  price: number
  capacity: number
  status: 'Disponible' | 'Mantenimiento' | 'Ocupado'
  image?: string 
}

/** Datos iniciales. Cuando exista base de datos, esto se reemplaza por una consulta. */
export const initialCatalog: CatalogItem[] = [
  { 
    id: 'tenis-cancha-1', 
    category: 'canchas', 
    name: 'Cancha de tenis · Cancha 1', 
    description: 'Polvo de ladrillo con iluminación nocturna.', 
    price: 48000, 
    sede: 'Poblado', 
    capacity: 4, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'tenis-cancha-2', 
    category: 'canchas', 
    name: 'Cancha de tenis · Cancha 2', 
    description: 'Cancha profesional en polvo de ladrillo.', 
    price: 48000, 
    sede: 'Poblado', 
    capacity: 4, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'padel-cancha-1', 
    category: 'canchas', 
    name: 'Pádel · Cancha 1', 
    description: 'Cancha panorámica con cerramiento en vidrio.', 
    price: 60000, 
    sede: 'Laureles', 
    capacity: 4, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'futbol-5-cancha-1', 
    category: 'canchas', 
    name: 'Fútbol 5 · Cancha 1', 
    description: 'Césped sintético con graderías.', 
    price: 95000, 
    sede: 'Poblado', 
    capacity: 10, 
    status: 'Mantenimiento',
    image: 'https://images.unsplash.com/photo-1529900245534-5e69e007d4b4?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'futbol-5-cancha-2', 
    category: 'canchas', 
    name: 'Fútbol 5 · Cancha 2', 
    description: 'Césped sintético techado.', 
    price: 95000, 
    sede: 'Laureles', 
    capacity: 10, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'piscina-nado-libre', 
    category: 'piscinas', 
    name: 'Piscina · Nado libre', 
    description: 'Carriles de nado libre en piscina semiolímpica.', 
    price: 22000, 
    sede: 'Laureles', 
    capacity: 6, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'piscina-carril-entrenamiento', 
    category: 'piscinas', 
    name: 'Piscina · Carril de entrenamiento', 
    description: 'Carril exclusivo para entrenamiento.', 
    price: 30000, 
    sede: 'Poblado', 
    capacity: 2, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'gimnasio-sesion-individual', 
    category: 'gimnasio', 
    name: 'Gimnasio · Sesión individual', 
    description: 'Acceso a zona de pesas y cardio.', 
    price: 18000, 
    sede: 'Laureles', 
    capacity: 1, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'gimnasio-funcional', 
    category: 'gimnasio', 
    name: 'Gimnasio · Zona funcional', 
    description: 'Espacio de entrenamiento funcional.', 
    price: 20000, 
    sede: 'Poblado', 
    capacity: 1, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'zona-humeda-sauna', 
    category: 'zona-humeda', 
    name: 'Zona húmeda · Sauna', 
    description: 'Sauna seco para relajación.', 
    price: 25000, 
    sede: 'Poblado', 
    capacity: 6, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  { 
    id: 'zona-humeda-turco-jacuzzi', 
    category: 'zona-humeda', 
    name: 'Zona húmeda · Turco y jacuzzi', 
    description: 'Turco y jacuzzi de agua caliente.', 
    price: 28000, 
    sede: 'Poblado', 
    capacity: 6, 
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  },
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
