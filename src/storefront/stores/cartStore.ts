import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  variantId: string
  name: string
  variantLabel?: string
  price: number
  quantity: number
  imageUrl?: string
}

interface CartStore {
  storeId: string | null
  items: CartItem[]

  setStoreId: (id: string) => void
  add: (item: CartItem) => void
  remove: (variantId: string) => void
  update: (variantId: string, qty: number) => void
  clear: () => void

  count: () => number
  subtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      storeId: null,
      items: [],

      setStoreId: (id) => {
        if (get().storeId && get().storeId !== id) {
          set({ storeId: id, items: [] })
        } else {
          set({ storeId: id })
        }
      },

      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.variantId === item.variantId)
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...s.items, item] }
        }),

      remove: (variantId) =>
        set((s) => ({ items: s.items.filter((i) => i.variantId !== variantId) })),

      update: (variantId, qty) => {
        if (qty <= 0) { get().remove(variantId); return }
        set((s) => ({
          items: s.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity: qty } : i
          ),
        }))
      },

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'nemvol-cart',
      partialize: (s) => ({ storeId: s.storeId, items: s.items }),
    }
  )
)
