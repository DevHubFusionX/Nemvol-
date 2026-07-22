import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

interface Props { isOpen: boolean; onClose: () => void }

export default function DroleCartDrawer({ isOpen, onClose }: Props) {
  const { cartItems, cartSubtotal, updateCartItem, removeFromCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const { path } = useStorefrontPaths()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/50 z-[100]" />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 180 }}
            className="fixed inset-y-0 right-0 w-full max-w-lg bg-stone-50 z-[101] shadow-2xl flex flex-col"
          >
            <div className="px-8 py-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl tracking-widest text-stone-950 uppercase font-light">Your Bag</h2>
                <p className="text-[10px] text-stone-400 tracking-widest uppercase mt-0.5">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-900 transition-colors" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag className="w-10 h-10 text-stone-300" />
                  <p className="text-xs font-bold tracking-widest uppercase text-stone-400">Your bag is empty</p>
                  <button onClick={onClose} className="text-[10px] font-bold tracking-widest uppercase text-stone-500 underline underline-offset-4 hover:text-stone-900 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.variantId} className="flex gap-5">
                    <div className="w-24 h-32 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-stone-300"><ShoppingBag className="w-6 h-6" /></div>
                      }
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-[13px] font-medium text-stone-900 leading-snug">{item.name}</h3>
                        {item.variantLabel && <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-wider">{item.variantLabel}</p>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-stone-200 rounded-full py-1 px-3 bg-white gap-3">
                          <button onClick={() => updateCartItem(item.variantId, item.quantity - 1)} className="text-stone-400 hover:text-stone-900 transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold text-stone-900 min-w-[16px] text-center">{item.quantity}</span>
                          <button onClick={() => updateCartItem(item.variantId, item.quantity + 1)} className="text-stone-400 hover:text-stone-900 transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-stone-900">{formatPrice(item.price)}</span>
                          <button onClick={() => removeFromCart(item.variantId)} className="text-stone-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-8 py-6 border-t border-stone-200 space-y-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-stone-500">Subtotal</span>
                  <span className="font-serif text-lg text-stone-950">{formatPrice(cartSubtotal)}</span>
                </div>
                <Link to={path('/checkout')} onClick={onClose}
                  className="w-full py-4 flex items-center justify-center gap-3 bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
