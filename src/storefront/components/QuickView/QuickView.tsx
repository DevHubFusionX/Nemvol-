import { useState } from 'react'
import type { Product } from '../../types'
import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultQuickView from './DefaultQuickView'
import DroleQuickView from './DroleQuickView'

interface Props { product: Product | null; onClose: () => void }

export default function QuickView({ product, onClose }: Props) {
  const { quickView } = useTemplateState()

  switch (quickView?.variant) {
    case 'drole': return <DroleQuickView product={product} onClose={onClose} />
    default: return <DefaultQuickView product={product} onClose={onClose} />
  }
}

export function useQuickView() {
  const [product, setProduct] = useState<Product | null>(null)
  return {
    quickViewProduct: product,
    openQuickView: (p: Product) => setProduct(p),
    closeQuickView: () => setProduct(null),
  }
}
