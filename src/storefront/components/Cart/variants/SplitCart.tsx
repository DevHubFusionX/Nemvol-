import { X, Trash2, ShieldCheck, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../CartContext'
import { useToast } from '../../ui/ToastContext'
import { useStorefront } from '../../useStorefront'
import { useFormatPrice } from '../../../hooks/useFormatPrice'

export default function SplitCart() {
  const { items, closeCart, removeItem, updateQty, total, count } = useCart()
  const { toast } = useToast()
  const { go, settings } = useStorefront()
  const formatPrice = useFormatPrice()

  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 bottom-0 right-0 h-full w-full max-w-225 bg-white z-50 flex flex-col md:flex-row shadow-2xl overflow-hidden"
    >
      {/* ── LEFT HALF: Cart Items List ── */}
      <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full bg-white">
        {/* Header Left */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 shrink-0">
          <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-widest">
            Shopping Bag ({count})
          </h2>
          {/* Close button inside Left Header on Mobile only */}
          <button onClick={closeCart} className="md:hidden text-stone-400 hover:text-stone-900 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5 scrollbar-none">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-10">
              <p className="text-stone-400 text-xs">Your bag is currently empty.</p>
              <button
                onClick={closeCart}
                className="text-[10px] uppercase tracking-widest font-bold text-stone-900 underline"
              >
                Back to Store
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-stone-100/50">
                <div className="w-16 h-20 bg-stone-50 shrink-0 rounded-lg overflow-hidden border border-stone-100">
                  {item.product.images[0]
                    ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    : <span className="text-stone-300 text-[10px]">IMG</span>
                  }
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <p className="text-xs font-bold text-stone-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 mt-0.5">Size: {item.size}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                        className="w-6 h-6 text-stone-500 hover:bg-stone-100 text-xs"
                      >−</button>
                      <span className="w-6 text-center text-[11px] font-bold text-stone-900">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                        className="w-6 h-6 text-stone-500 hover:bg-stone-100 text-xs"
                      >+</button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-stone-900 font-mono">{formatPrice(item.product.price * item.qty)}</span>
                      <button
                        onClick={() => { removeItem(item.product.id, item.size); toast('Item removed', 'info') }}
                        className="text-stone-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT HALF: Checkout Panel ── */}
      <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full bg-stone-50 border-t md:border-t-0 md:border-l border-stone-200/50">
        {/* Header Right (Close button desktop) */}
        <div className="hidden md:flex items-center justify-between px-8 py-5 border-b border-stone-200/30 shrink-0 bg-stone-50">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Checkout Panel</span>
          <button onClick={closeCart} className="text-stone-400 hover:text-stone-900 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Checkout detail columns */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-450">Summary</h3>
            
            <div className="space-y-3.5 border-b border-stone-200/50 pb-5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Cart Total</span>
                <span className="font-semibold text-stone-900 font-mono">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Standard Shipping</span>
                <span className="text-stone-500">FREE</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>Estimated Taxes</span>
                <span>Included in price</span>
              </div>
            </div>

            {/* Promo Code input mockup */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-450">Promo Code</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400"><Tag size={12} /></span>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full text-xs border border-stone-200 rounded-lg pl-8 pr-2 py-2 bg-white focus:outline-none focus:border-stone-400"
                  />
                </div>
                <button className="bg-stone-900 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-stone-850 transition-colors">Apply</button>
              </div>
            </div>

            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2">
              <span>Total Price</span>
              <span className="font-mono text-base">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-2 bg-stone-100 border border-stone-200/40 rounded-xl p-3 text-stone-600">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <span className="text-[10px] leading-tight font-medium">Safe and Secure Checkout Guarantee. Complete your order seamlessly.</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                disabled={items.length === 0}
                onClick={() => { closeCart(); go('checkout') }}
                className="w-full text-white text-xs tracking-[0.2em] uppercase py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: settings?.accentColor || '#1c1917' }}
              >
                Checkout Now
              </button>
              <button
                onClick={closeCart}
                className="w-full text-stone-500 hover:text-stone-800 text-[10px] uppercase tracking-widest font-bold py-2 text-center"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
