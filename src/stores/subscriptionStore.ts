import { create } from 'zustand'

export type PlanId = 'free' | 'pro' | 'business'
export type SubStatus = 'trialing' | 'active' | 'past_due' | 'cancelled' | 'pending_verification'

export interface Subscription {
  planId: PlanId
  status: SubStatus
  trialEndsAt: string | null
  currentPeriodEnd: string | null
}

export const PLAN_LIMITS: Record<PlanId, { products: number; staff: number; locations: number; customDomain: boolean }> = {
  free:     { products: 10,  staff: 1,  locations: 1,  customDomain: false },
  pro:      { products: -1,  staff: 5,  locations: 3,  customDomain: true  },
  business: { products: -1,  staff: -1, locations: -1, customDomain: true  },
}

interface SubscriptionStore {
  subscription: Subscription | null
  setSubscription: (s: Subscription) => void
  canAdd: (resource: 'products' | 'staff' | 'locations', currentCount: number) => boolean
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscription: null,
  setSubscription: (s) => set({ subscription: s }),
  canAdd: (resource, currentCount) => {
    const plan = get().subscription?.planId ?? 'free'
    const limit = PLAN_LIMITS[plan][resource]
    return limit === -1 || currentCount < limit
  },
}))
