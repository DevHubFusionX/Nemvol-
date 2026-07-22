import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../../../types'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useStorefront } from '../../../context/StorefrontProvider'

export default function MinimalProductCard({ product }: { product: Product }) {
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()
  const { addToCart } = useStorefront()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      productId: product.id,
      variantId: product.variants?.[0]?.id || product.id,
      name: product.name,
      variantLabel: 'Default',
      price: product.price,
      quantity: 1,
      imageUrl: product.images?.[0],
    })
  }

  return (
    <Link to={path(`/product/${product.slug}`)} className="group flex flex-col gap-3">
      <div className="aspect-square w-full bg-stone-50 overflow-hidden relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <ShoppingBag className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[12px] text-stone-900 leading-snug line-clamp-2">{product.name}</h3>
          <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-wider">{product.category || 'Collection'}</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-[12px] font-medium text-stone-900">{formatPrice(product.price)}</span>
          <button
            onClick={handleQuickAdd}
            className="text-[9px] font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
          >
            + Add
          </button>
        </div>
      </div>
    </Link>
  )
}
