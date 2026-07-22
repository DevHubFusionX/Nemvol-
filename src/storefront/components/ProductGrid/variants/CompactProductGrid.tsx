import type { Product } from '../../../types'
import ProductCard from '../../Product/ProductCard'

export default function CompactProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
