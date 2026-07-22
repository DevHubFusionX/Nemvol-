import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../../../types'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useStorefront } from '../../../context/StorefrontProvider'

export default function DroleProductCard({ product }: { product: Product }) {
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
    <Link to={path(`/product/${product.slug}`)} className="group flex flex-col">
      {/* Image — no border radius, editorial feel */}
      <div className="aspect-[2/3] w-full bg-stone-100 overflow-hidden relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md text-lg font-light"
          aria-label="Quick add"
        >
          +
        </button>
      </div>

      {/* Details — left-aligned editorial */}
      <div className="pt-3 space-y-0.5">
        <h3 className="text-[13px] font-medium text-stone-900 leading-snug line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-stone-400">{product.category || 'Collection'}</span>
          <span className="text-[12px] font-semibold text-stone-900">{formatPrice(product.price)}</span>
        </div>
      </div>
    </Link>
  )
}
