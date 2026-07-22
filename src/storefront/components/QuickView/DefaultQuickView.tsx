import { X, ShoppingBag, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { useStorefront } from '../../context/StorefrontProvider'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../hooks/useStorefrontPaths'

interface Props { product: Product | null; onClose: () => void }

export default function DefaultQuickView({ product, onClose }: Props) {
  const { addToCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()
  const [qty, setQty] = useState(1)

  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row max-h-[90vh]"
          >
            <div className="w-full sm:w-64 shrink-0 bg-stone-50 aspect-[3/4] sm:aspect-auto overflow-hidden">
              {product.images?.[0]
                ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-stone-200"><ShoppingBag className="w-10 h-10" /></div>
              }
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-3">
                <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 transition-colors text-stone-400"><X className="w-4 h-4" /></button>
                <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase">{product.category || 'Collection'}</span>
                <h2 className="text-lg font-bold text-stone-900 leading-tight">{product.name}</h2>
                <p className="text-base font-bold text-stone-900">{formatPrice(product.price)}</p>
                {product.description && <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">{product.description}</p>}
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-full py-1.5 px-3 gap-3">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-stone-400 hover:text-stone-900"><Minus className="w-3 h-3" /></button>
                    <span className="text-xs font-bold text-stone-900 min-w-[16px] text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="text-stone-400 hover:text-stone-900"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button
                    onClick={() => { addToCart({ productId: product.id, variantId: product.variants?.[0]?.id || product.id, name: product.name, variantLabel: 'Default', price: product.price, quantity: qty, imageUrl: product.images?.[0] }); onClose() }}
                    className="flex-1 py-2.5 rounded-full bg-stone-950 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors"
                  >Add to Cart</button>
                </div>
                <Link to={path(`/product/${product.slug}`)} onClick={onClose}
                  className="block text-center text-[10px] font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors underline underline-offset-4"
                >View Full Details</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
