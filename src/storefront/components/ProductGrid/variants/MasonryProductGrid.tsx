import type { Product } from '../../../types'
import ProductCard from '../../Product/ProductCard'

export default function MasonryProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {products.map((p, i) => (
        <div key={p.id} className="break-inside-avoid" style={{ marginBottom: '1rem' }}>
          {/* Vary aspect ratio to create masonry feel */}
          <div style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '3/5' }}>
            <ProductCard product={p} />
          </div>
        </div>
      ))}
    </div>
  )
}
