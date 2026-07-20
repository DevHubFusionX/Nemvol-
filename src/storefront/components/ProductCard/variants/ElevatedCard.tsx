import { motion } from 'framer-motion'
import { ShoppingBag, Eye } from 'lucide-react'
import { useCart } from '../../Cart/CartContext'
import { useStorefront } from '../../useStorefront'
import { useQuickView } from '../../QuickViewContext'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import type { Product } from '../../../types'

interface Props {
  product: Product
}

export default function ElevatedCard({ product }: Props) {
  const { go } = useStorefront()
  const { openQuickView } = useQuickView()
  const formatPrice = useFormatPrice()
  const { addItem } = useCart()

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
      whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => go(`products/${product.id}`)}
      className="group relative bg-white border border-stone-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm flex flex-col h-full"
    >
      {/* Image frame */}
      <div className="relative aspect-4/5 overflow-hidden bg-stone-50 m-2 rounded-xl border border-stone-100/50">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs font-mono uppercase">
            No Image
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 border border-stone-200/50 flex items-center justify-center text-stone-500 hover:text-stone-900 shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
          title="Quick View"
        >
          <Eye size={12} strokeWidth={2} />
        </button>
      </div>

      {/* Info details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">{product.category}</span>
          <h3 className="text-xs md:text-sm font-bold text-stone-900 leading-snug mt-1 group-hover:text-stone-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-5 pt-3 border-t border-stone-100">
          <span className="text-sm font-bold text-stone-900 font-mono">{formatPrice(product.price)}</span>
          
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-850 transition-colors shadow-sm"
          >
            <ShoppingBag size={13} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
