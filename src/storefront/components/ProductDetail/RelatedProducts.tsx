import type { Product } from '../../types'
import ProductCard from '../ProductCard/CardSwitcher'

interface Props {
  products: Product[]
}

export default function RelatedProducts({ products }: Props) {
  if (!products.length) return null

  return (
    <div className="pt-16 border-t border-stone-100">
      <h2 className="text-xl font-light text-stone-900 tracking-tight mb-8">You might also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
