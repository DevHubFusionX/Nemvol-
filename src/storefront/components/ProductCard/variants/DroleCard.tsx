import { motion } from 'framer-motion'
import { ArrowUpRight, Eye } from 'lucide-react'
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
      label: `Sale -${Math.round((1 - product.price / product.compareAt) * 100)}%`,
      color: 'bg-stone-900 text-white',
    }
  }
  if (product.tagList.includes('new')) return { label: 'New Arrival', color: 'bg-stone-100 text-stone-900 border border-stone-200' }
  return null
}

export default function DroleCard({ product }: Props) {
  const { go } = useStorefront()
  const { openQuickView } = useQuickView()
  const formatPrice = useFormatPrice()
  const b = badge(product)

  function handleQuickView(e: React.MouseEvent) {
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <article
      onClick={() => go(`products/${product.id}`)}
      className="group relative bg-white border border-stone-200/60 rounded-md overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Badge overlay */}
      {b && (
        <span className={`absolute top-4 left-4 z-10 text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold rounded ${b.color}`}>
          {b.label}
        </span>
      )}

      {/* Image container */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#faf9f6] shrink-0 border-b border-stone-100">
        {product.images[0] ? (
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] uppercase font-mono">
            No Image
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/95 border border-stone-200/50 flex items-center justify-center text-stone-500 hover:text-stone-900 shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
          title="Quick View"
        >
          <Eye size={12} strokeWidth={2} />
        </button>
      </div>

      {/* Editorial copy and stats */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1.5">{product.category}</p>
          <h3 className="text-base font-medium tracking-tight text-stone-900 font-serif leading-tight group-hover:underline">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-6 pt-3 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold font-mono text-stone-900">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-[11px] font-mono text-stone-400 line-through">{formatPrice(product.compareAt)}</span>
            )}
          </div>

          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-850 flex items-center gap-0.5 group-hover:text-stone-550 transition-colors">
            <span>View</span>
            <ArrowUpRight size={12} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </article>
  )
}
