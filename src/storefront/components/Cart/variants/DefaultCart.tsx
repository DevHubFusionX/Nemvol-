import { X, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../CartContext'
import { useToast } from '../../ui/ToastContext'
import { useStorefront } from '../../useStorefront'
import { useFormatPrice } from '../../../hooks/useFormatPrice'

export default function DefaultCart() {
  const { items, closeCart, removeItem, updateQty, total, count } = useCart()
  const { toast } = useToast()
  const { go, settings } = useStorefront()
  const formatPrice = useFormatPrice()

  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
        <h2 className="text-sm font-medium text-stone-900 tracking-wide">
          Your Cart {count > 0 && <span className="text-stone-400 font-normal">({count})</span>}
        </h2>
        <button onClick={closeCart} className="text-stone-400 hover:text-stone-900 transition-colors">
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-20">
            <p className="text-stone-400 text-sm">Your cart is empty.</p>
            <button
              onClick={closeCart}
              className="text-xs underline underline-offset-2 text-stone-500 hover:text-stone-900"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          items.map(item => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
              {/* Image */}
              <div className="w-20 h-24 bg-stone-100 shrink-0 flex items-center justify-center overflow-hidden">
                {item.product.images[0]
                  ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  : <span className="text-stone-300 text-[10px]">IMG</span>
                }
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-900">{item.product.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">Size: {item.size}</p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Qty */}
                  <div className="flex items-center border border-stone-200">
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                      className="w-7 h-7 text-stone-500 hover:bg-stone-50 text-sm"
                    >−</button>
                    <span className="w-8 text-center text-xs text-stone-900">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                      className="w-7 h-7 text-stone-500 hover:bg-stone-50 text-sm"
                    >+</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-stone-900">{formatPrice(item.product.price * item.qty)}</span>
                    <button
                      onClick={() => { removeItem(item.product.id, item.size); toast('Item removed', 'info') }}
                      className="text-stone-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-stone-100 px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="text-stone-900 font-medium">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-stone-400">Shipping & taxes calculated at checkout.</p>
          <button
            onClick={() => { closeCart(); go('checkout') }}
            className="w-full text-white text-xs tracking-[0.2em] uppercase py-4 hover:opacity-90 transition-colors"
            style={{ backgroundColor: settings?.accentColor || '#1c1917' }}
          >
            Checkout
          </button>
          <button
            onClick={closeCart}
            className="w-full border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase py-3 hover:border-stone-400 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </motion.aside>
  )
}
