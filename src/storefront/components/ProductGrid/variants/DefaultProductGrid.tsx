import type { Product } from '../../../types'
import ProductCard from '../../Product/ProductCard'

export default function DefaultProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
