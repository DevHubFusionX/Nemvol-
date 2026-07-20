import { X, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../CartContext'
import { useToast } from '../../ui/ToastContext'
import { useStorefront } from '../../useStorefront'
import { useFormatPrice } from '../../../hooks/useFormatPrice'

export default function DroleCart() {
  const { items, closeCart, removeItem, updateQty, total, count } = useCart()
  const { toast } = useToast()
  const { go, settings } = useStorefront()
  const formatPrice = useFormatPrice()

  return (
    <motion.aside
      initial={{ x: '110%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '110%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="fixed top-4 bottom-4 right-4 w-[calc(100vw-32px)] max-w-100 bg-white z-50 flex flex-col shadow-2xl rounded-2xl border border-stone-200/20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
        <div>
          <h2 className="text-sm font-semibold text-stone-900 tracking-wide">
            Shopping Bag
          </h2>
          <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-widest font-mono">
            {count} {count === 1 ? 'item' : 'items'} selected
          </p>
        </div>
        <button onClick={closeCart} className="w-8 h-8 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-200 transition-colors">
          <X size={16} strokeWidth={1.8} />
        </button>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6 scrollbar-none">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-20">
            <span className="text-stone-300 text-3xl font-light">Bag is empty</span>
            <p className="text-stone-400 text-xs max-w-50">Add some luxury items to get started.</p>
            <button
              onClick={closeCart}
              className="mt-2 text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-900 pb-0.5"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          items.map(item => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
              {/* Product Image */}
              <div className="w-20 h-24 bg-stone-50 shrink-0 flex items-center justify-center overflow-hidden rounded-xl border border-stone-100/50">
                {item.product.images[0]
                  ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  : <span className="text-stone-300 text-[10px]">IMG</span>
                }
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <p className="text-xs font-bold text-stone-900 line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mt-0.5">Size: {item.size}</p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Actions */}
                  <div className="flex items-center border border-stone-100 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                      className="w-6.5 h-6.5 text-stone-500 hover:bg-stone-100 text-xs font-semibold"
                    >−</button>
                    <span className="w-6 text-center text-xs text-stone-900 font-bold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                      className="w-6.5 h-6.5 text-stone-500 hover:bg-stone-100 text-xs font-semibold"
                    >+</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-stone-900 font-mono">{formatPrice(item.product.price * item.qty)}</span>
                    <button
                      onClick={() => { removeItem(item.product.id, item.size); toast('Removed from bag', 'info') }}
                      className="text-stone-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Summary */}
      {items.length > 0 && (
        <div className="border-t border-stone-100 px-6 py-6 flex flex-col gap-4 bg-stone-50/50">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-stone-500 uppercase tracking-wider">Subtotal</span>
            <span className="text-stone-900 font-mono text-sm">{formatPrice(total)}</span>
          </div>
          <p className="text-[10px] text-stone-400">Duties, tax and shipping calculated at checkout.</p>
          
          <button
            onClick={() => { closeCart(); go('checkout') }}
            className="w-full text-white text-xs tracking-[0.2em] uppercase py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: settings?.accentColor || '#1c1917' }}
          >
            Go to Checkout
          </button>
          
          <button
            onClick={closeCart}
            className="w-full border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase py-3 rounded-xl hover:border-stone-400 hover:bg-white transition-all"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </motion.aside>
  )
}
