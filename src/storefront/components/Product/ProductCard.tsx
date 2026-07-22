import type { Product } from '../../types'
import { useTemplateState } from '../../hooks/useTemplateState'
import DefaultProductCard from './variants/DefaultProductCard'
import DroleProductCard from './variants/DroleProductCard'
import MinimalProductCard from './variants/MinimalProductCard'
import ModernProductCard from './variants/ModernProductCard'
import ElevatedProductCard from './variants/ElevatedProductCard'

export default function ProductCard({ product }: { product: Product }) {
  const { productCard } = useTemplateState()

  switch (productCard?.variant) {
    case 'drole': return <DroleProductCard product={product} />
    case 'minimal': return <MinimalProductCard product={product} />
    case 'modern': return <ModernProductCard product={product} />
    case 'elevated': return <ElevatedProductCard product={product} />
    default: return <DefaultProductCard product={product} />
  }
}
