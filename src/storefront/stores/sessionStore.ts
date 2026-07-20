import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StorefrontCustomer {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

interface SessionStore {
  customer: StorefrontCustomer | null
  accessGranted: boolean   // access gate — has visitor submitted their details?

  setCustomer: (c: StorefrontCustomer | null) => void
  grantAccess: () => void
  logout: () => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      customer: null,
      accessGranted: false,

      setCustomer: (customer) => set({ customer }),
      grantAccess: () => set({ accessGranted: true }),
      logout: () => set({ customer: null }),
    }),
    {
      name: 'nemvol-session',
      partialize: (s) => ({ customer: s.customer, accessGranted: s.accessGranted }),
    }
  )
)
