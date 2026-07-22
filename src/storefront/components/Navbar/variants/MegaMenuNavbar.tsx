import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'
import CartDrawer from '../../Cart/CartDrawer'

const MEGA_CATEGORIES = [
  { label: 'Women', links: ['Dresses', 'Tops', 'Trousers', 'Outerwear', 'Accessories'] },
  { label: 'Men', links: ['Shirts', 'Trousers', 'Jackets', 'Shoes', 'Accessories'] },
  { label: 'Kids', links: ['Girls', 'Boys', 'Newborn', 'Shoes'] },
]

export default function MegaMenuNavbar() {
  const { cartCount } = useStorefront()
  const { path } = useStorefrontPaths()
  const { nav } = useTemplateState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)

  const bg = nav?.bg ?? '#ffffff'
  const textColor = nav?.textColor ?? '#000000'

  return (
    <header
      className="sticky top-0 z-50 border-b border-stone-100"
      style={{ backgroundColor: bg, color: textColor }}
      onMouseLeave={() => setMegaOpen(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link to={path('/')} className="flex flex-col items-center group absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <span className="text-2xl font-serif font-bold tracking-tighter leading-none" style={{ color: textColor }}>
              N<span className="font-sans text-lg font-light align-super -ml-0.5">S</span>
            </span>
          </Link>

          {/* Desktop nav with mega menu triggers */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {MEGA_CATEGORIES.map(cat => (
              <div key={cat.label} className="relative" onMouseEnter={() => setMegaOpen(cat.label)}>
                <button className="flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
                  {cat.label} <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            ))}
            <Link to={path('/products')} className="text-[11px] font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
              All Products
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:opacity-60 transition-opacity" aria-label="Search"><Search className="w-4 h-4" /></button>
            <button onClick={() => setCartOpen(true)} className="p-2 flex items-center gap-1 hover:opacity-60 transition-opacity" aria-label="Cart">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[11px] font-bold">({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu dropdown */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="hidden lg:block absolute inset-x-0 border-t border-stone-100 shadow-lg z-50"
            style={{ backgroundColor: bg }}
          >
            <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
              {MEGA_CATEGORIES.map(cat => (
                <div key={cat.label}>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: textColor, opacity: 0.5 }}>{cat.label}</p>
                  <ul className="space-y-2">
                    {cat.links.map(link => (
                      <li key={link}>
                        <Link
                          to={path(`/category/${link.toLowerCase()}`)}
                          onClick={() => setMegaOpen(null)}
                          className="text-[13px] hover:opacity-60 transition-opacity"
                          style={{ color: textColor }}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-stone-100"
            style={{ backgroundColor: bg }}
          >
            <div className="px-4 py-4 space-y-2">
              {MEGA_CATEGORIES.map(cat => (
                <Link key={cat.label} to={path(`/category/${cat.label.toLowerCase()}`)} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-bold tracking-wider hover:opacity-60 transition-opacity"
                  style={{ color: textColor }}
                >
                  {cat.label}
                </Link>
              ))}
              <Link to={path('/products')} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-bold tracking-wider hover:opacity-60 transition-opacity"
                style={{ color: textColor }}
              >
                All Products
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
