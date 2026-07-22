import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

interface Props { isOpen: boolean; onClose: () => void }

export default function SplitCartDrawer({ isOpen, onClose }: Props) {
  const { cartItems, cartSubtotal, updateCartItem, removeFromCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()
  const shipping = 0
  const total = cartSubtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 180 }}
            className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white z-[101] shadow-2xl flex"
          >
            {/* Left: Items */}
            <div className="flex-1 flex flex-col border-r border-stone-100">
              <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
                <h2 className="text-sm font-bold tracking-widest uppercase text-stone-900">Cart</h2>
                <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-900 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
                    <ShoppingBag className="w-8 h-8 text-stone-200" />
                    <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Empty</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.variantId} className="flex gap-3">
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-50 shrink-0">
                        {item.imageUrl
                          ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-stone-200"><ShoppingBag className="w-4 h-4" /></div>
                        }
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div className="flex justify-between gap-1">
                          <h3 className="text-[11px] font-semibold text-stone-900 line-clamp-2 leading-snug">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.variantId)} className="text-stone-200 hover:text-red-400 transition-colors shrink-0 mt-0.5"><Trash2 className="w-3 h-3" /></button>
                        </div>
                        {item.variantLabel && <p className="text-[9px] text-stone-400 uppercase tracking-wider">{item.variantLabel}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-stone-100 rounded-full px-2 py-0.5">
                            <button onClick={() => updateCartItem(item.variantId, item.quantity - 1)} className="text-stone-300 hover:text-stone-900"><Minus className="w-2.5 h-2.5" /></button>
                            <span className="text-[10px] font-bold text-stone-900">{item.quantity}</span>
                            <button onClick={() => updateCartItem(item.variantId, item.quantity + 1)} className="text-stone-300 hover:text-stone-900"><Plus className="w-2.5 h-2.5" /></button>
                          </div>
                          <span className="text-[11px] font-bold text-stone-900">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="w-56 shrink-0 flex flex-col bg-stone-50">
              <div className="px-5 py-5 border-b border-stone-100">
                <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Order Summary</p>
              </div>
              <div className="flex-1 px-5 py-5 space-y-3">
                <div className="flex justify-between text-[11px] text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="border-t border-stone-200 pt-3 flex justify-between text-[12px] font-bold text-stone-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <div className="px-5 pb-6 space-y-2">
                {cartItems.length > 0 && (
                  <Link to={path('/checkout')} onClick={onClose}
                    className="w-full py-3 rounded-xl bg-stone-950 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors flex items-center justify-center"
                  >
                    Checkout
                  </Link>
                )}
                <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-stone-200 text-[10px] font-bold tracking-widest uppercase text-stone-500 hover:bg-stone-100 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
