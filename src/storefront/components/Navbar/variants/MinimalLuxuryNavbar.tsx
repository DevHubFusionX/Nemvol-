import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'
import CartDrawer from '../../Cart/CartDrawer'

export default function MinimalLuxuryNavbar() {
  const { cartCount } = useStorefront()
  const { path } = useStorefrontPaths()
  const { nav } = useTemplateState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const bg = nav?.bg ?? 'transparent'
  const textColor = nav?.textColor ?? '#ffffff'

  const navLinks = [
    { label: 'Collection', to: path('/products') },
    { label: 'Women', to: path('/category/women') },
    { label: 'Men', to: path('/category/men') },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: bg, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className="text-[11px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
                style={{ color: textColor }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Center logo */}
          <Link to={path('/')} className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="text-2xl font-serif font-bold tracking-tighter leading-none" style={{ color: textColor }}>
              N<span className="font-sans text-lg font-light align-super -ml-0.5">S</span>
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:opacity-50 transition-opacity hidden lg:block" aria-label="Search">
              <Search className="w-4 h-4" style={{ color: textColor }} />
            </button>
            <button onClick={() => setCartOpen(true)} className="p-2 flex items-center gap-1 hover:opacity-50 transition-opacity" aria-label="Cart">
              <ShoppingBag className="w-4 h-4" style={{ color: textColor }} />
              {cartCount > 0 && (
                <span className="text-[10px] font-bold" style={{ color: textColor }}>({cartCount})</span>
              )}
            </button>
          </div>
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
            className="lg:hidden overflow-hidden border-t border-white/10"
            style={{ backgroundColor: nav?.bg ?? '#000000' }}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className="block text-sm tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
                  style={{ color: textColor }}
                >
                  {link.label}
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
