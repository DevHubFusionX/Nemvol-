import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useStorefront } from '../../useStorefront'
import { useQuickView } from '../../QuickViewContext'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import type { Product } from '../../../types'

interface Props {
  product: Product
}

export default function MinimalCard({ product }: Props) {
  const { go } = useStorefront()
  const { openQuickView } = useQuickView()
  const formatPrice = useFormatPrice()

  function handleQuickView(e: React.MouseEvent) {
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <article
      onClick={() => go(`products/${product.id}`)}
      className="group relative cursor-pointer flex flex-col gap-3 py-2 bg-transparent"
    >
      {/* Image frame */}
      <div className="relative aspect-square overflow-hidden bg-stone-50 rounded-lg border border-stone-100">
        {product.images[0] ? (
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] uppercase font-mono">
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

      {/* Copy */}
      <div className="flex flex-col gap-1 px-1">
        <span className="text-[9px] uppercase tracking-widest text-stone-400 font-medium">{product.category}</span>
        <h3 className="text-xs font-semibold text-stone-900 leading-normal line-clamp-1 group-hover:text-stone-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-bold text-stone-950 font-mono">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-[10px] text-stone-400 line-through font-mono">{formatPrice(product.compareAt)}</span>
          )}
        </div>
      </div>
    </article>
  )
}
