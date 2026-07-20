import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormatPrice } from '../../hooks/useFormatPrice'

interface Props {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  activeCategory: string
  onCategory: (c: string) => void
  maxPrice: number
  priceMax: number
  onPrice: (v: number) => void
}

export default function MobileFilterDrawer({ isOpen, onClose, categories, activeCategory, onCategory, maxPrice, priceMax, onPrice }: Props) {
  const formatPrice = useFormatPrice()
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-50"
          />
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <p className="text-sm font-medium text-stone-900">Filters</p>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-stone-400 uppercase mb-4">Category</p>
                <div className="flex flex-col gap-3">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => { onCategory(c); onClose() }}
                      className={`text-left text-sm transition-colors ${
                        activeCategory === c ? 'text-stone-900 font-medium' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.25em] text-stone-400 uppercase mb-4">Price</p>
                <input
                  type="range" min={0} max={maxPrice} value={priceMax}
                  onChange={e => onPrice(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(priceMax)}</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
