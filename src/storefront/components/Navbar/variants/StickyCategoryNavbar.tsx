import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'
import CartDrawer from '../../Cart/CartDrawer'

const CATEGORIES = ['All', 'Women', 'Men', 'Kids', 'Sale']

export default function StickyCategoryNavbar() {
  const { cartCount } = useStorefront()
  const { path } = useStorefrontPaths()
  const { nav } = useTemplateState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const bg = nav?.bg ?? '#ffffff'
  const textColor = nav?.textColor ?? '#000000'

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: bg }}>
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" style={{ color: textColor }} /> : <Menu className="w-5 h-5" style={{ color: textColor }} />}
          </button>

          <Link to={path('/')} className="font-serif text-xl font-bold tracking-tighter" style={{ color: textColor }}>
            N<span className="font-sans text-base font-light align-super -ml-0.5">S</span>
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:opacity-60 transition-opacity hidden sm:block" aria-label="Search">
              <Search className="w-4 h-4" style={{ color: textColor }} />
            </button>
            <button onClick={() => setCartOpen(true)} className="p-2 flex items-center gap-1 hover:opacity-60 transition-opacity" aria-label="Cart">
              <ShoppingBag className="w-4 h-4" style={{ color: textColor }} />
              {cartCount > 0 && <span className="text-[11px] font-bold" style={{ color: textColor }}>({cartCount})</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky category strip */}
      <div className="border-t border-b" style={{ borderColor: `${textColor}15` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={cat === 'All' ? path('/products') : path(`/category/${cat.toLowerCase()}`)}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-colors duration-150 border-b-2"
              style={{
                color: activeCategory === cat ? textColor : `${textColor}80`,
                borderBottomColor: activeCategory === cat ? textColor : 'transparent',
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: bg }}
          >
            <div className="px-4 py-4 space-y-2">
              {CATEGORIES.map(cat => (
                <Link key={cat} to={cat === 'All' ? path('/products') : path(`/category/${cat.toLowerCase()}`)}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-xs font-bold tracking-wider uppercase hover:opacity-60 transition-opacity"
                  style={{ color: textColor }}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
