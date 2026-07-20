import { motion } from 'framer-motion'
import { ShoppingBag, Eye } from 'lucide-react'
import { useCart } from '../../Cart/CartContext'
import { useStorefront } from '../../useStorefront'
import { useQuickView } from '../../QuickViewContext'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { hasSalePrice } from '../../../lib/formatPrice'
import type { Product } from '../../../types'

interface Props {
  product: Product
}

function badge(product: Product) {
  if (hasSalePrice(product.price, product.compareAt)) {
    return {
      label: `-${Math.round((1 - product.price / product.compareAt) * 100)}%`,
      color: 'text-violet-500',
    }
  }
  if (product.tagList.includes('new')) return { label: 'New', color: 'text-violet-500' }
  return null
}

export default function DefaultCard({ product }: Props) {
  const { go } = useStorefront()
  const formatPrice = useFormatPrice()
  const { addItem } = useCart()
  const { openQuickView } = useQuickView()
  const b = badge(product)

  function handleBuyNow(e: React.MouseEvent) {
    e.stopPropagation()
    addItem(product, 1, 'M', '')
    go('checkout')
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation()
    addItem(product, 1, 'M', '')
  }

  function handleQuickView(e: React.MouseEvent) {
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => go(`products/${product.id}`)}
      className="group relative bg-stone-100 rounded-sm overflow-hidden cursor-pointer"
    >
      {/* Badge */}
      {b && (
        <span className={`absolute top-3 right-3 z-10 text-xs font-medium tracking-wide ${b.color}`}>
          {b.label}
        </span>
      )}

      {/* Image area */}
      <div className="relative aspect-4/5 flex items-center justify-center bg-stone-100 overflow-hidden">
        {product.images[0]
          ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          : <span className="text-stone-300 text-[10px] tracking-widest uppercase">Image</span>
        }

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/95 border border-stone-200/50 flex items-center justify-center text-stone-500 hover:text-stone-900 shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
          title="Quick View"
        >
          <Eye size={12} strokeWidth={2} />
        </button>

        {/* Action buttons — always visible on mobile, hover on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-2 flex flex-col gap-1.5 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={handleBuyNow}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-[10px] tracking-[0.15em] uppercase py-2.5 transition-colors font-medium"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full bg-stone-900/90 hover:bg-stone-900 text-white text-[10px] tracking-[0.15em] uppercase py-2.5 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={11} strokeWidth={1.5} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 py-3 bg-white border-t border-stone-100">
        <p className="text-[10px] text-stone-400 tracking-widest uppercase mb-0.5">{product.category}</p>
        <p className="text-sm text-stone-900 font-medium truncate">{product.name}</p>
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            {[1,2,3,4,5].map(s => (
              <svg key={s} viewBox="0 0 12 12" className={`w-2.5 h-2.5 ${ s <= Math.round(product.rating!) ? 'fill-amber-400' : 'fill-stone-200'}`}>
                <path d="M6 0l1.5 3.5L11 4l-2.5 2.5.6 3.5L6 8.5 2.9 10l.6-3.5L1 4l3.5-.5z"/>
              </svg>
            ))}
            <span className="text-[10px] text-stone-400 ml-0.5">({product.reviewCount})</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-stone-900">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-stone-400 line-through">{formatPrice(product.compareAt)}</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
