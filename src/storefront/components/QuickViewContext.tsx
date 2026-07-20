import { createContext, useContext, useState } from 'react'
import type { Product } from '../types'

interface QuickViewContextType {
  quickViewProduct: Product | null
  openQuickView: (product: Product) => void
  closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined)

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  
  return (
    <QuickViewContext.Provider value={{
      quickViewProduct,
      openQuickView: setQuickViewProduct,
      closeQuickView: () => setQuickViewProduct(null)
    }}>
      {children}
    </QuickViewContext.Provider>
  )
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext)
  if (!ctx) throw new Error('useQuickView must be used within a QuickViewProvider')
  return ctx
}
