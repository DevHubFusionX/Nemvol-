import type { Product } from '../../types'
import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultProductGrid from './variants/DefaultProductGrid'
import CompactProductGrid from './variants/CompactProductGrid'
import MasonryProductGrid from './variants/MasonryProductGrid'

export default function ProductGrid({ products }: { products: Product[] }) {
  const { productGrid } = useTemplateState()

  switch (productGrid?.variant) {
    case 'compact': return <CompactProductGrid products={products} />
    case 'masonry': return <MasonryProductGrid products={products} />
    default: return <DefaultProductGrid products={products} />
  }
}
