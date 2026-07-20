import { useState } from 'react'
import { Search, User, ShoppingBag, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../Cart/CartContext'
import { useStorefront } from '../../useStorefront'
import type { StoreSettings, Product } from '../../../types'

interface DroleNavbarProps {
  settings: StoreSettings
  products?: Product[]
  onSearchOpen: () => void
}

export default function DroleNavbar({ settings, products = [], onSearchOpen }: DroleNavbarProps) {
  const { path, pages, customer } = useStorefront()
  const { count, openCart } = useCart()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const navBg = (settings as any).nav?.bg || '#ffffff'
  const navTextColor = (settings as any).nav?.textColor || '#1c1917'
  const logo = (settings as any).logos?.primary || settings.logoUrl
  const accountHref = customer ? path('account') : path('login')

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))).slice(0, 5) as string[]

  // Extract 2 featured products with images
  const featuredProducts = products.filter(p => p.images?.length > 0).slice(0, 2)

  const navLinks = [
    { label: 'Home', href: path() },
    { label: 'Shop All', href: path('products') },
    ...pages.map(p => ({ label: p.title, href: path(`pages/${p.slug}`) })),
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-stone-100/60"
      style={{ backgroundColor: navBg, color: navTextColor }}
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between relative">
        {/* Logo */}
        <Link to={path()} className="flex items-center gap-2 text-xl font-bold tracking-tight" style={{ color: navTextColor }}>
          {logo ? (
            <img src={logo} alt={settings.storeName} className="h-8 w-auto object-contain" />
          ) : (
            <>{settings.storeName}<span className="text-stone-400">.</span></>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full" aria-label="Mega menu navigation">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm transition-colors duration-200 tracking-wide font-medium py-6"
              style={{ color: pathname === link.href ? navTextColor : `${navTextColor}bf` }}
            >
              {link.label}
            </Link>
          ))}

          {/* Shop Megamenu trigger link */}
          <button
            onMouseEnter={() => setMegaMenuOpen(true)}
            className="flex items-center gap-1 text-sm font-medium tracking-wide py-6 focus:outline-none"
            style={{ color: megaMenuOpen || pathname.includes('products') ? navTextColor : `${navTextColor}bf` }}
          >
            Shop
            <ChevronDown size={14} className={`transition-transform duration-250 ${megaMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm transition-colors duration-200 tracking-wide font-medium py-6"
              style={{ color: pathname === link.href ? navTextColor : `${navTextColor}bf` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="hover:opacity-85 transition-opacity"
            style={{ color: navTextColor }}
          >
            <Search size={18} />
          </button>

          <Link
            to={accountHref}
            aria-label={customer ? 'My account' : 'Sign in'}
            className="relative hover:opacity-85 transition-opacity hidden sm:block"
            style={{ color: navTextColor }}
          >
            <User size={18} />
            {customer && (
              <span
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: settings.accentColor || navTextColor }}
              />
            )}
          </Link>

          <button
            onClick={openCart}
            aria-label={`Cart, ${count} items`}
            className="relative hover:opacity-85 transition-opacity"
            style={{ color: navTextColor }}
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                style={{ backgroundColor: settings.accentColor || '#1c1917' }}
              >
                {count}
              </span>
            )}
          </button>

          {/* Mobile Hamburg Trigger */}
          <button
            className="md:hidden flex flex-col gap-1.5 ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>

        {/* ── DESKTOP MEGAMENU DROPDOWN PANEL ── */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="hidden md:block absolute top-full left-0 right-0 bg-white border-b border-stone-200/50 shadow-xl z-50 text-stone-900"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-4 gap-8">
                {/* Column 1: Shop Categories */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2 mb-1">Shop Categories</p>
                  <Link
                    to={path('products')}
                    onClick={() => setMegaMenuOpen(false)}
                    className="text-sm font-medium hover:text-stone-600 transition-colors"
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={path(`products?category=${encodeURIComponent(cat)}`)}
                      onClick={() => setMegaMenuOpen(false)}
                      className="text-sm hover:text-stone-600 transition-colors text-stone-600"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

                {/* Column 2: Quick Links / Pages */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2 mb-1">Information</p>
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      to={path(`pages/${p.slug}`)}
                      onClick={() => setMegaMenuOpen(false)}
                      className="text-sm hover:text-stone-600 transition-colors text-stone-600"
                    >
                      {p.title}
                    </Link>
                  ))}
                  <Link
                    to={accountHref}
                    onClick={() => setMegaMenuOpen(false)}
                    className="text-sm hover:text-stone-600 transition-colors text-stone-600"
                  >
                    Customer Portal
                  </Link>
                </div>

                {/* Column 3: Featured Products */}
                <div className="flex flex-col gap-3 col-span-1">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2 mb-1">Featured Items</p>
                  <div className="flex flex-col gap-4">
                    {featuredProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={path(`products/${p.id}`)}
                        onClick={() => setMegaMenuOpen(false)}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded object-cover border border-stone-100 group-hover:opacity-85 transition-opacity"
                        />
                        <div>
                          <p className="text-xs font-semibold text-stone-800 group-hover:text-stone-600 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-stone-500 font-mono">
                            ₦{Number(p.price).toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 4: Promo Banner */}
                <div
                  className="rounded-xl p-5 flex flex-col justify-between text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${settings.accentColor || '#1c1917'} 0%, #1e293b 100%)` }}
                >
                  <div className="z-10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">New Arrivals</p>
                    <h4 className="text-base font-bold leading-tight mb-2">Upgrade Your Collection Today</h4>
                    <p className="text-xs text-white/70">Check out this season's exclusive designer pieces.</p>
                  </div>
                  <Link
                    to={path('products')}
                    onClick={() => setMegaMenuOpen(false)}
                    className="z-10 bg-white text-stone-900 text-xs font-bold px-4 py-2 rounded-lg inline-block text-center hover:bg-stone-50 transition-colors mt-4 self-start"
                  >
                    Shop Collection
                  </Link>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="md:hidden fixed top-0 bottom-0 right-0 w-72 max-w-[85vw] bg-white z-50 p-8 flex flex-col justify-between"
              style={{ backgroundColor: navBg, color: navTextColor }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold">{settings.storeName}</span>
                  <button onClick={() => setMobileOpen(false)} style={{ color: navTextColor }}>
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6" aria-label="Mobile navigation stack">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold tracking-wide"
                        style={{ color: isActive ? settings.accentColor || navTextColor : `${navTextColor}bf` }}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                  <div className="border-t border-stone-100 pt-4 flex flex-col gap-3">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Shop Categories</p>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={path(`products?category=${encodeURIComponent(cat)}`)}
                        onClick={() => setMobileOpen(false)}
                        className="text-xs hover:text-stone-900 text-stone-600"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>

              <div className="flex flex-col gap-4 pt-6 border-t border-stone-100">
                <button
                  onClick={() => { setMobileOpen(false); onSearchOpen() }}
                  className="flex items-center gap-3 text-sm text-left"
                  style={{ color: `${navTextColor}bf` }}
                >
                  <Search size={16} />
                  <span>Search Products</span>
                </button>

                <Link
                  to={accountHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: `${navTextColor}bf` }}
                >
                  <User size={16} />
                  <span>{customer ? 'My Account' : 'Sign In'}</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
