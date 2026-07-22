import { X, ShoppingBag, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { useStorefront } from '../../context/StorefrontProvider'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../hooks/useStorefrontPaths'

interface Props { product: Product | null; onClose: () => void }

export default function DroleQuickView({ product, onClose }: Props) {
  const { addToCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()
  const [qty, setQty] = useState(1)

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[200]" onClick={onClose} />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 z-[201] bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100">
              <div className="w-10 h-1 rounded-full bg-stone-200 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <div className="mt-2">
                <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase block">{product.category || 'Collection'}</span>
                <h2 className="text-base font-bold text-stone-900">{product.name}</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 shrink-0"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex gap-5 p-6">
              <div className="w-28 h-36 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                {product.images?.[0]
                  ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-stone-200"><ShoppingBag className="w-6 h-6" /></div>
                }
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-lg font-bold text-stone-900">{formatPrice(product.price)}</p>
                {product.description && <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{product.description}</p>}
                <div className="flex items-center gap-3 pt-2">
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
                  className="block text-[10px] font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors underline underline-offset-4"
                >View Full Details</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
