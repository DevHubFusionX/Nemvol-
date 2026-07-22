import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, User, Search, ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import CartDrawer from '../../Cart/CartDrawer'

export default function DefaultNavbar() {
  const { cartCount } = useStorefront()
  const { path } = useStorefrontPaths()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const navLinks = [
    { label: 'WOMEN', to: path('/category/women') },
    { label: 'MEN', to: path('/category/men') },
    { label: 'KIDS', to: path('/category/kids') },
    { label: 'BESTSELLERS', to: path('/bestsellers') },
    { label: 'BRAND', to: path('/brand') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[11px] font-bold tracking-widest text-stone-900 hover:text-stone-500 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Left: Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-stone-900 hover:text-stone-500 transition-colors duration-150"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Center: Monogram Logo */}
          <Link to={path('/')} className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center group">
            <span className="text-2xl font-serif font-bold tracking-tighter text-stone-950 leading-none group-hover:scale-105 transition-transform duration-200">
              N<span className="font-sans text-lg font-light align-super -ml-0.5">S</span>
            </span>
            <span className="text-[7px] tracking-[0.25em] text-stone-400 uppercase font-semibold mt-0.5">
              Since
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <button
              className="p-2 text-stone-900 hover:text-stone-500 transition-colors duration-150"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Selector */}
            <button
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold tracking-wider text-stone-900 hover:text-stone-500 transition-colors duration-150"
              aria-label="Language"
            >
              <span>EN</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {/* Wishlist */}
            <button
              className="p-2 text-stone-900 hover:text-stone-500 transition-colors duration-150"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Account */}
            <button
              className="p-2 text-stone-900 hover:text-stone-500 transition-colors duration-150"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-stone-900 hover:text-stone-500 transition-colors duration-150 flex items-center gap-1"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[11px] font-bold">({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-stone-100 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-bold tracking-wider text-stone-900 hover:text-stone-500 hover:bg-stone-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
