import { useState, useEffect } from 'react'
import { Search, User, ShoppingBag } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../Cart/CartContext'
import { useStorefront } from '../../useStorefront'
import type { StoreSettings } from '../../../types'

interface DefaultNavbarProps {
  settings: StoreSettings
  onSearchOpen: () => void
}

export default function DefaultNavbar({ settings, onSearchOpen }: DefaultNavbarProps) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{
        backgroundColor: scrolled ? `${navBg}f2` : navBg,
        color: navTextColor,
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={path()} className="flex items-center gap-2 text-xl font-bold tracking-tight" style={{ color: navTextColor }}>
          {logo ? (
            <img src={logo} alt={settings.storeName} className="h-8 w-auto object-contain" />
          ) : (
            <>{settings.storeName}<span className="text-stone-400">.</span></>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm transition-colors duration-200 tracking-wide pb-0.5 border-b-2"
                style={{
                  color: isActive ? navTextColor : `${navTextColor}bf`,
                  borderColor: isActive ? navTextColor : 'transparent'
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="hover:opacity-80 transition-opacity hidden sm:block"
            style={{ color: navTextColor }}
          >
            <Search size={18} />
          </button>

          <Link
            to={accountHref}
            aria-label={customer ? 'My account' : 'Sign in'}
            className="relative hover:opacity-80 transition-opacity hidden sm:block"
            style={{ color: navTextColor }}
          >
            <User size={18} />
            {customer && (
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: settings.accentColor || navTextColor }}
              />
            )}
          </Link>

          <button
            onClick={openCart}
            aria-label={`Cart, ${count} items`}
            className="relative hover:opacity-80 transition-opacity"
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: navTextColor }} />
            <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: navTextColor }} />
            <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: navTextColor }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-stone-100/50"
            aria-label="Mobile navigation"
            style={{ backgroundColor: navBg }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm tracking-wide"
                    style={{
                      color: isActive ? navTextColor : `${navTextColor}bf`,
                      fontWeight: isActive ? 550 : 400
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="border-t border-stone-100/50 pt-4 flex items-center gap-4">
                <Link
                  to={accountHref}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm"
                  style={{ color: `${navTextColor}bf` }}
                >
                  {customer ? 'My Account' : 'Sign In'}
                </Link>
                <button
                  onClick={() => { openCart(); setMenuOpen(false) }}
                  className="relative"
                  style={{ color: navTextColor }}
                >
                  <ShoppingBag size={18} />
                  {count > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: settings.accentColor || '#1c1917' }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
