import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useStorefront } from '../../useStorefront'
import { useQuickView } from '../../QuickViewContext'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import type { Product } from '../../../types'

interface Props {
  product: Product
}

export default function ModernCard({ product }: Props) {
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
      className="group relative cursor-pointer overflow-hidden flex flex-col gap-3"
    >
      {/* Zoom Image container */}
      <div className="relative aspect-4/5 overflow-hidden bg-stone-100 rounded-xl">
        {product.images[0] ? (
          <motion.img
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs uppercase font-mono">
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

      {/* Info */}
      <div className="flex justify-between items-start gap-4 px-1 py-1">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-stone-900 truncate leading-snug">
            {product.name}
          </h3>
          <p className="text-[10px] text-stone-400 mt-0.5 tracking-wider font-semibold uppercase">{product.category}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-bold font-mono text-stone-900">{formatPrice(product.price)}</span>
        </div>
      </div>
    </article>
  )
}
