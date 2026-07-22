import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../../../types'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useStorefront } from '../../../context/StorefrontProvider'

export default function ModernProductCard({ product }: { product: Product }) {
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
    <Link to={path(`/product/${product.slug}`)} className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[3/4] w-full bg-stone-100 overflow-hidden relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}

        {/* Full overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 rounded-full bg-white text-stone-950 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-sm"
          >
            Quick Add +
          </button>
        </div>

        {product.compareAt && product.compareAt > product.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>

      <div className="p-3 bg-white">
        <h3 className="text-[12px] font-semibold text-stone-900 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[12px] font-bold text-stone-900">{formatPrice(product.price)}</span>
          {product.compareAt && product.compareAt > product.price && (
            <span className="text-[11px] text-stone-400 line-through">{formatPrice(product.compareAt)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
