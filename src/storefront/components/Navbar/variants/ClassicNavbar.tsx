import { useState, useEffect } from 'react'
import { Search, User, ShoppingBag } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../Cart/CartContext'
import { useStorefront } from '../../useStorefront'
import type { StoreSettings, Product } from '../../../types'

interface ClassicNavbarProps {
  settings: StoreSettings
  products?: Product[]
  onSearchOpen: () => void
}

export default function ClassicNavbar({ settings, onSearchOpen }: ClassicNavbarProps) {
  const { path, pages, customer } = useStorefront()
  const { count, openCart } = useCart()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navBg = (settings as any).nav?.bg || '#ffffff'
  const navTextColor = (settings as any).nav?.textColor || '#1c1917'
  const logo = (settings as any).logos?.primary || settings.logoUrl
  const accountHref = customer ? path('account') : path('login')

  const navLinks = [
    { label: 'Home', href: path() },
    { label: 'Shop', href: path('products') },
    ...pages.map(p => ({ label: p.title, href: path(`pages/${p.slug}`) })),
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-stone-200/30 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{
        backgroundColor: scrolled ? `${navBg}f2` : navBg,
        color: navTextColor,
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      {/* Desktop Classic Layout: Centered Logo, Left Nav Links/Search, Right Icons/Bag */}
      <div className="hidden md:flex max-w-7xl mx-auto px-8 h-20 items-center justify-between">
        {/* Left Side: Navigation Links */}
        <nav className="flex items-center gap-6 w-1/3" aria-label="Classic navigation left">
          {navLinks.slice(0, 3).map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                to={link.href}
                className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-250 pb-0.5 border-b"
                style={{
                  color: isActive ? navTextColor : `${navTextColor}99`,
                  borderColor: isActive ? navTextColor : 'transparent',
                  fontWeight: isActive ? 600 : 400
                }}
              >
                {link.label}
              </Link>
            )
          })}
          {navLinks.length > 3 && (
            <Link
              to={path('products')}
              className="text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-700 transition-colors"
            >
              +More
            </Link>
          )}
        </nav>

        {/* Center: Brand Logo */}
        <div className="w-1/3 flex justify-center">
          <Link to={path()} className="flex items-center gap-2 text-2xl font-bold tracking-[0.25em] uppercase font-serif" style={{ color: navTextColor }}>
            {logo ? (
              <img src={logo} alt={settings.storeName} className="h-9 w-auto object-contain" />
            ) : (
              <>{settings.storeName}</>
            )}
          </Link>
        </div>

        {/* Right Side: Search, Account, Bag */}
        <div className="w-1/3 flex items-center justify-end gap-6">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="hover:opacity-85 transition-opacity flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium"
            style={{ color: `${navTextColor}99` }}
          >
            <Search size={15} />
            <span className="hidden lg:inline">Search</span>
          </button>

          <Link
            to={accountHref}
            aria-label={customer ? 'My account' : 'Sign in'}
            className="hover:opacity-85 transition-opacity flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium"
            style={{ color: `${navTextColor}99` }}
          >
            <User size={15} />
            <span className="hidden lg:inline">{customer ? 'Account' : 'Login'}</span>
          </Link>

          <button
            onClick={openCart}
            aria-label={`Cart, ${count} items`}
            className="relative hover:opacity-85 transition-opacity flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em]"
            style={{ color: navTextColor }}
          >
            <ShoppingBag size={15} />
            <span className="font-semibold">Bag ({count})</span>
          </button>
        </div>
      </div>

      {/* Mobile Classic Layout */}
      <div className="md:hidden max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Hamburger left */}
        <button
          className="flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: navTextColor }} />
          <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: navTextColor }} />
          <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: navTextColor }} />
        </button>

        {/* Logo center */}
        <Link to={path()} className="text-lg font-bold tracking-widest uppercase font-serif" style={{ color: navTextColor }}>
          {logo ? (
            <img src={logo} alt={settings.storeName} className="h-7 w-auto object-contain" />
          ) : (
            <>{settings.storeName}</>
          )}
        </Link>

        {/* Bag right */}
        <button
          onClick={openCart}
          aria-label={`Cart, ${count} items`}
          className="relative hover:opacity-80 transition-opacity"
          style={{ color: navTextColor }}
        >
          <ShoppingBag size={18} />
          {count > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
              style={{ backgroundColor: settings.accentColor || '#1c1917' }}
            >
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-stone-100/50 bg-white"
            aria-label="Mobile classic navigation"
            style={{ backgroundColor: navBg }}
          >
            <div className="px-6 py-5 flex flex-col gap-4 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-xs uppercase tracking-widest font-medium"
                    style={{
                      color: isActive ? navTextColor : `${navTextColor}99`,
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="border-t border-stone-100/50 pt-4 flex justify-center gap-6">
                <button
                  onClick={() => { setMenuOpen(false); onSearchOpen() }}
                  className="text-xs uppercase tracking-widest flex items-center gap-2"
                  style={{ color: `${navTextColor}99` }}
                >
                  <Search size={15} /> Search
                </button>
                <Link
                  to={accountHref}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs uppercase tracking-widest flex items-center gap-2"
                  style={{ color: `${navTextColor}99` }}
                >
                  <User size={15} /> {customer ? 'Account' : 'Sign In'}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
