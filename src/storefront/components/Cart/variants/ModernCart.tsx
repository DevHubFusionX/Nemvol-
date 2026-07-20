import { X, Trash2, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../CartContext'
import { useToast } from '../../ui/ToastContext'
import { useStorefront } from '../../useStorefront'
import { useFormatPrice } from '../../../hooks/useFormatPrice'

export default function ModernCart() {
  const { items, closeCart, removeItem, updateQty, total, count } = useCart()
  const { toast } = useToast()
  const { go, settings } = useStorefront()
  const formatPrice = useFormatPrice()

  return (
    <motion.aside
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto px-6 md:px-16 py-8 md:py-12"
    >
      {/* Upper Navigation & Close Row */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-6 mb-8 md:mb-12">
        <h2 className="text-xl md:text-3xl font-light tracking-[0.15em] uppercase font-serif">
          Your Collection <span className="text-stone-400 font-mono text-sm md:text-base">[{count}]</span>
        </h2>
        <button
          onClick={closeCart}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
        >
          <span>Close</span>
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <p className="text-stone-400 text-lg md:text-xl font-light tracking-wide mb-6">Your shopping bag is empty.</p>
          <button
            onClick={closeCart}
            className="text-xs uppercase tracking-[0.2em] font-bold border border-stone-900 px-8 py-3.5 hover:bg-stone-900 hover:text-white transition-colors duration-300"
          >
            Explore products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Spacious list of products */}
          <div className="lg:col-span-7 space-y-8">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-6 pb-6 border-b border-stone-100">
                {/* Large high-contrast image */}
                <div className="w-24 h-32 md:w-32 md:h-40 bg-stone-50 shrink-0 overflow-hidden rounded-md border border-stone-100">
                  {item.product.images[0]
                    ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    : <span className="text-stone-300 text-xs">NO IMAGE</span>
                  }
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-sm md:text-base font-semibold text-stone-900 leading-tight">{item.product.name}</h3>
                      <span className="text-sm font-semibold font-mono text-stone-900">{formatPrice(item.product.price * item.qty)}</span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">Size: {item.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-stone-200 rounded-md">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                        aria-label="Decrease quantity"
                        className="p-2 text-stone-500 hover:bg-stone-50 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-900">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                        aria-label="Increase quantity"
                        className="p-2 text-stone-500 hover:bg-stone-50 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => { removeItem(item.product.id, item.size); toast('Removed item', 'info') }}
                      className="text-stone-300 hover:text-red-400 transition-colors flex items-center gap-1 text-[11px] uppercase tracking-widest"
                    >
                      <Trash2 size={13} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order summary and actions */}
          <div className="lg:col-span-5 bg-stone-50/50 p-6 md:p-8 rounded-xl border border-stone-100 flex flex-col gap-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-450 border-b border-stone-200/60 pb-3">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Items subtotal</span>
                <span className="font-semibold text-stone-900 font-mono">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xs text-stone-400 border-b border-stone-250/20 pb-4">
                <span>Tax</span>
                <span>Included in price</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2">
                <span>Estimated Total</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => { closeCart(); go('checkout') }}
                className="w-full text-white text-xs tracking-[0.2em] uppercase py-4 font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: settings?.accentColor || '#1c1917' }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={closeCart}
                className="w-full border border-stone-250 text-stone-600 text-xs tracking-[0.15em] uppercase py-3 hover:border-stone-900 hover:bg-white transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  )
}
