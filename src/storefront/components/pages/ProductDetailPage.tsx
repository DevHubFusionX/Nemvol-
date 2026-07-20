import { useParams } from 'react-router-dom'
import NubiaProductDetail from '../ProductDetail/NubiaProductDetail'
import { useStorefront } from '../useStorefront'
import type { Product } from '../../types'

interface Props {
  products: Product[]
}

export default function ProductDetailPage({ products }: Props) {
  const { id } = useParams()
  const { go } = useStorefront()
  const product = products.find(p => p.id === id)
  const related = products.filter(p => p.id !== id).slice(0, 4)

  if (!product) return (
    <div className="max-w-7xl mx-auto px-6 pt-32 text-center">
      <p className="text-stone-400 text-sm">Product not found.</p>
      <button onClick={() => go('products')} className="mt-4 text-xs underline text-stone-500">
        Back to shop
      </button>
    </div>
  )

  return <NubiaProductDetail product={product} related={related} />
}
