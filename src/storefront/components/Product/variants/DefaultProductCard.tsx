import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import type { Product } from '../../../types'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useStorefront } from '../../../context/StorefrontProvider'
import QuickView from '../../QuickView/QuickView'

export default function DefaultProductCard({ product }: { product: Product }) {
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()
  const { addToCart } = useStorefront()
  const [qvOpen, setQvOpen] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      productId: product.id,
      variantId: product.variants?.[0]?.id || product.id,
      name: product.name,
      variantLabel: 'Default / M',
      price: product.price,
      quantity: 1,
      imageUrl: product.images?.[0],
    })
  }

  return (
    <>
      <Link
        to={path(`/product/${product.slug}`)}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-md transition-all duration-300"
      >
        <div className="aspect-[3/4] w-full bg-stone-50 overflow-hidden relative">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400"><ShoppingBag className="w-8 h-8" /></div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
            <button onClick={handleQuickAdd}
              className="flex-1 py-2 rounded-full bg-white text-stone-950 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-100 transition-colors shadow-sm"
            >Quick Add +</button>
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); setQvOpen(true) }}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm transition-colors"
              aria-label="Quick view"
            ><Eye className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[8px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-1">{product.category || 'Collection'}</span>
            <h3 className="text-xs font-bold text-stone-900 tracking-wide line-clamp-1 group-hover:text-stone-600 transition-colors">{product.name}</h3>
          </div>
          <div className="text-xs font-bold text-stone-900 mt-2">{formatPrice(product.price)}</div>
        </div>
      </Link>
      <QuickView product={qvOpen ? product : null} onClose={() => setQvOpen(false)} />
    </>
  )
}
