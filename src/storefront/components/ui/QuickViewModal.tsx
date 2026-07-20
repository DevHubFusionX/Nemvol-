import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart } from 'lucide-react'
import { useQuickView } from '../QuickViewContext'
import { useCart } from '../Cart/CartContext.tsx'
import { useToast } from './ToastContext.tsx'
import { useStorefront } from '../useStorefront'
import { useFormatPrice } from '../../hooks/useFormatPrice'

const colors = ['#c8b89a', '#7ec8a4', '#6baed6', '#2d2d2d']
const sizes = ['XS', 'S', 'M', 'L', 'XL']

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useQuickView()
  const { addItem } = useCart()
  const { toast } = useToast()
  const { settings } = useStorefront()
  const formatPrice = useFormatPrice()

  const [color, setColor] = useState(0)
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)

  if (!quickViewProduct) return null

  const quickViewVariant = (settings as any).quickView?.variant || 'default'

  const handleAddToCart = () => {
    addItem(quickViewProduct, qty, size, colors[color])
    toast(`${quickViewProduct.name} added to cart`)
    closeQuickView()
  }

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* DROLE Variant: Slide-Up Bottom Panel */}
          {quickViewVariant === 'drole' ? (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl border-t border-stone-200 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Drag Handle */}
              <div className="h-1.5 w-12 bg-stone-200 rounded-full mx-auto my-3 shrink-0" onClick={closeQuickView} />
              
              <div className="flex-1 overflow-y-auto px-6 pb-12 pt-2">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Image Column */}
                  <div className="relative aspect-4/5 bg-stone-50 overflow-hidden rounded-xl border border-stone-100 flex items-center justify-center">
                    {quickViewProduct.images && quickViewProduct.images[0] ? (
                      <img
                        src={quickViewProduct.images[0]}
                        alt={quickViewProduct.name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span className="text-stone-300 text-xs tracking-widest uppercase">No Image</span>
                    )}
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col gap-5 pt-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-stone-400 mb-1.5 block">
                          {quickViewProduct.category}
                        </span>
                        <h2 className="text-2xl font-serif font-light text-stone-900 leading-tight">
                          {quickViewProduct.name}
                        </h2>
                      </div>
                      <button
                        onClick={closeQuickView}
                        className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-stone-900">{formatPrice(quickViewProduct.price)}</span>
                      {quickViewProduct.compareAt && (
                        <span className="text-xs text-stone-400 line-through">{formatPrice(quickViewProduct.compareAt)}</span>
                      )}
                    </div>

                    {quickViewProduct.description && (
                      <p className="text-xs leading-relaxed text-stone-500 font-serif italic">
                        {quickViewProduct.description}
                      </p>
                    )}

                    {/* Color */}
                    <div className="flex flex-col gap-1.5 pt-2">
                      <p className="text-[10px] tracking-wider text-stone-500 uppercase font-semibold">Select Color</p>
                      <div className="flex gap-2">
                        {colors.map((c, i) => (
                          <button
                            key={c}
                            onClick={() => setColor(i)}
                            style={{ backgroundColor: c }}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${
                              color === i ? 'border-stone-900 scale-105' : 'border-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <p className="text-[10px] tracking-wider text-stone-500 uppercase font-semibold">Select Size</p>
                      <div className="flex gap-2">
                        {sizes.map(s => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`w-9 h-9 text-xs border transition-colors ${
                              size === s
                                ? 'border-stone-900 bg-stone-900 text-white'
                                : 'border-stone-200 text-stone-600 hover:border-stone-400'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selector + Add to Cart */}
                    <div className="flex gap-3 pt-3 mt-auto">
                      <div className="flex border border-stone-200 items-center">
                        <button
                          onClick={() => setQty(q => Math.max(1, q - 1))}
                          className="w-8 h-10 text-stone-600 hover:bg-stone-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-xs text-stone-900 font-medium">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(q => q + 1)}
                          className="w-8 h-10 text-stone-600 hover:bg-stone-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-stone-900 text-white text-[11px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors h-10"
                      >
                        <ShoppingBag size={13} />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => setWished(w => !w)}
                        className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                          wished ? 'border-stone-900 text-stone-900 bg-stone-50' : 'border-stone-200 text-stone-400 hover:border-stone-400'
                        }`}
                      >
                        <Heart size={14} fill={wished ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            
            /* DEFAULT Variant: Centered Dialog Modal */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 m-4 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-950 transition-colors shadow-sm"
              >
                <X size={15} />
              </button>

              {/* Left Column: Image */}
              <div className="md:w-1/2 relative bg-stone-50 aspect-square md:aspect-auto md:min-h-120 flex items-center justify-center">
                {quickViewProduct.images && quickViewProduct.images[0] ? (
                  <img
                    src={quickViewProduct.images[0]}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <span className="text-stone-300 text-xs tracking-widest uppercase">No Image</span>
                )}
              </div>

              {/* Right Column: Info & Actions */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-stone-450 uppercase mb-1 block">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="text-xl font-light text-stone-900 tracking-tight leading-snug mb-3">
                    {quickViewProduct.name}
                  </h2>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-medium text-stone-900">{formatPrice(quickViewProduct.price)}</span>
                    {quickViewProduct.compareAt && (
                      <span className="text-xs text-stone-400 line-through">{formatPrice(quickViewProduct.compareAt)}</span>
                    )}
                  </div>

                  {quickViewProduct.description && (
                    <p className="text-xs text-stone-500 leading-relaxed mb-6">
                      {quickViewProduct.description}
                    </p>
                  )}

                  {/* Colors selector */}
                  <div className="flex flex-col gap-2 mb-4">
                    <span className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Color</span>
                    <div className="flex gap-1.5">
                      {colors.map((c, i) => (
                        <button
                          key={c}
                          onClick={() => setColor(i)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            color === i ? 'border-stone-900 scale-110 ring-1 ring-stone-900/10' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes Selector */}
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-[10px] tracking-wider uppercase text-stone-400 font-semibold">Size</span>
                    <div className="flex gap-1.5">
                      {sizes.map(s => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`w-8 h-8 text-[11px] border transition-colors font-medium ${
                            size === s
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="flex gap-2">
                  <div className="flex border border-stone-200 items-center">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-7 h-10 text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs text-stone-900">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-7 h-10 text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-stone-900 text-white text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 hover:bg-stone-750 transition-colors h-10"
                  >
                    <ShoppingBag size={12} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setWished(w => !w)}
                    className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                      wished ? 'border-stone-900 text-stone-900' : 'border-stone-200 text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <Heart size={13} fill={wished ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      )}
    </AnimatePresence>
  )
}
