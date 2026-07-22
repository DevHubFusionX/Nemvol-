import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../../../types'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useStorefront } from '../../../context/StorefrontProvider'

export default function ElevatedProductCard({ product }: { product: Product }) {
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
    <Link
      to={path(`/product/${product.slug}`)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[3/4] w-full bg-stone-50 overflow-hidden relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 rounded-full bg-stone-950 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors shadow-lg flex items-center justify-center gap-1"
          >
            Quick Add +
          </button>
        </div>
      </div>
      <div className="p-4">
        <span className="text-[8px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-1">{product.category || 'Collection'}</span>
        <h3 className="text-xs font-bold text-stone-900 line-clamp-1">{product.name}</h3>
        <p className="text-xs font-bold text-stone-900 mt-2">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
