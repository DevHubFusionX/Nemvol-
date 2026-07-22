import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

interface Props { isOpen: boolean; onClose: () => void }

export default function ModernCartDrawer({ isOpen, onClose }: Props) {
  const { cartItems, cartSubtotal, updateCartItem, removeFromCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-stone-100">
              <h2 className="text-sm font-bold tracking-widest uppercase text-stone-900">Cart ({cartItems.length})</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="py-16 flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-stone-300" />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase text-stone-400">Nothing here yet</p>
                  <button onClick={onClose} className="px-6 py-2.5 rounded-full border border-stone-200 text-xs font-bold tracking-widest uppercase text-stone-600 hover:bg-stone-50 transition-colors">
                    Keep Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.variantId} className="flex gap-4 p-4 rounded-xl bg-stone-50">
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        {item.imageUrl
                          ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-stone-300"><ShoppingBag className="w-4 h-4" /></div>
                        }
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-xs font-semibold text-stone-900 line-clamp-1">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.variantId)} className="text-stone-300 hover:text-red-500 transition-colors shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        {item.variantLabel && <p className="text-[10px] text-stone-400 uppercase tracking-wider">{item.variantLabel}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-stone-200">
                            <button onClick={() => updateCartItem(item.variantId, item.quantity - 1)} className="text-stone-400 hover:text-stone-900"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-bold text-stone-900 min-w-[16px] text-center">{item.quantity}</span>
                            <button onClick={() => updateCartItem(item.variantId, item.quantity + 1)} className="text-stone-400 hover:text-stone-900"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="text-xs font-bold text-stone-900">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-500 font-bold tracking-widest uppercase">Total</span>
                  <span className="text-base font-bold text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>
                <Link to={path('/checkout')} onClick={onClose}
                  className="w-full py-3.5 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout ↗
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
