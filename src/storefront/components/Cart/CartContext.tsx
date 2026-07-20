/**
 * Shared Cart context: exposes useCart / CartProvider backed by Zustand cartStore.
 * Used by all templates via the shared component kit.
 */
import { useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useCartStore } from '../../stores/cartStore'
import type { Product } from '../../types'

export interface CartItem {
  product: Product
  qty: number
  size: string
  color: string
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  clearCart: () => void
  addItem: (product: Product, qty: number, size: string, color: string) => void
  removeItem: (id: string, size: string) => void
  updateQty: (id: string, size: string, qty: number) => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const store = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product: Product, qty: number, size: string, color: string) => {
    store.add({
      productId: product.id,
      variantId: `${product.id}-${size}-${color}`,
      name: product.name,
      variantLabel: size,
      price: product.price,
      quantity: qty,
      imageUrl: product.images?.[0],
    })
    setIsOpen(true)
  }

  const removeItem = (id: string, size: string) => {
    store.remove(`${id}-${size}-`)
    // find by productId prefix since color is unknown
    const match = store.items.find(i => i.productId === id && i.variantLabel === size)
    if (match) store.remove(match.variantId)
  }

  const updateQty = (id: string, size: string, qty: number) => {
    const match = store.items.find(i => i.productId === id && i.variantLabel === size)
    if (match) store.update(match.variantId, qty)
  }

  // Reconstruct CartItem[] shape components expect
  const items: CartItem[] = store.items.map(i => ({
    product: {
      id: i.productId,
      name: i.name,
      price: i.price,
      images: i.imageUrl ? [i.imageUrl] : [],
    } as Product,
    qty: i.quantity,
    size: i.variantLabel ?? '',
    color: '',
  }))

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      clearCart: () => store.clear(),
      addItem,
      removeItem,
      updateQty,
      total: store.subtotal(),
      count: store.count(),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
