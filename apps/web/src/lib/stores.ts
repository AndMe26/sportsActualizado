'use client'

import {
  initialBookings, initialCatalog, initialEmployees, initialMemberships,
  type Booking, type CatalogItem, type Employee, type Membership, type Session,
} from '@sportcomplex/core'
import { usePersistentState } from '@/lib/persistent-state'

// Un hook por entidad. Hoy leen/escriben localStorage; mañana llamarán a la API.
export const useCatalog = () => usePersistentState<CatalogItem[]>('altura:catalog', initialCatalog)
export const useBookings = () => usePersistentState<Booking[]>('altura:bookings', initialBookings)
export const useEmployees = () => usePersistentState<Employee[]>('altura:employees', initialEmployees)
export const useMemberships = () => usePersistentState<Membership[]>('altura:memberships', initialMemberships)

export type Draft = { itemId: string; date: string; time: string; attendees: number }
export const useDraft = () => usePersistentState<Draft | null>('altura:draft', null)

export const useStoredSession = () => usePersistentState<Session | null>('altura:session', null)

/** Código del último tiquete generado, para mostrar la confirmación. */
export const useLastCode = () => usePersistentState<string | null>('altura:last-code', null)

export const defaultSettings = { businessName: 'Altura Club', businessHours: '06:00 a. m. – 10:00 p. m.', bookingsOpen: true }
export const useSettings = () => usePersistentState('altura:settings', defaultSettings)
