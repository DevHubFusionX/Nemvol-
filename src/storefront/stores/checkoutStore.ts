import { create } from 'zustand'

export type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation'

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
}

export interface SelectedShipping {
  zoneId: string
  zoneName: string
  rate: number
  rateType: string
}

interface CheckoutStore {
  step: CheckoutStep
  address: ShippingAddress | null
  shipping: SelectedShipping | null
  couponCode: string
  couponDiscount: number
  placedOrderId: string | null

  setStep: (step: CheckoutStep) => void
  setAddress: (address: ShippingAddress) => void
  setShipping: (shipping: SelectedShipping) => void
  setCoupon: (code: string, discount: number) => void
  setPlacedOrderId: (id: string) => void
  reset: () => void
}

const initialState = {
  step: 'information' as CheckoutStep,
  address: null,
  shipping: null,
  couponCode: '',
  couponDiscount: 0,
  placedOrderId: null,
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setAddress: (address) => set({ address }),
  setShipping: (shipping) => set({ shipping }),
  setCoupon: (couponCode, couponDiscount) => set({ couponCode, couponDiscount }),
  setPlacedOrderId: (placedOrderId) => set({ placedOrderId }),
  reset: () => set(initialState),
}))
