import { useState, useEffect } from 'react'
import { Search, User, ShoppingBag } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../Cart/CartContext'
import { useStorefront } from '../../useStorefront'
import type { StoreSettings, Product } from '../../../types'

interface MinimalNavbarProps {
  settings: StoreSettings
  products?: Product[]
  onSearchOpen: () => void
}

export default function MinimalNavbar({ settings, products = [], onSearchOpen }: MinimalNavbarProps) {
  const { path, customer } = useStorefront()
  const { count, openCart } = useCart()
  const { search } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  const navBg = (settings as any).nav?.bg || '#ffffff'
  const navTextColor = (settings as any).nav?.textColor || '#1c1917'
  const logo = (settings as any).logos?.primary || settings.logoUrl
  const accountHref = customer ? path('account') : path('login')

  // Extract query parameters to track active category
  const queryParams = new URLSearchParams(search)
  const activeCategory = queryParams.get('category') || 'All'

  // Extract unique categories from products list
  const categories = [
    'All',
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))
  ] as string[]

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
      {/* 1. Main Header Strip (Compact) */}
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between border-b border-stone-100/50">
        {/* Left Side: Brand Logo */}
        <Link to={path()} className="flex items-center gap-2 text-lg font-bold tracking-tight" style={{ color: navTextColor }}>
          {logo ? (
            <img src={logo} alt={settings.storeName} className="h-7 w-auto object-contain" />
          ) : (
            <>{settings.storeName}<span className="text-stone-400">.</span></>
          )}
        </Link>

        {/* Right Side: Quick Action Icons */}
        <div className="flex items-center gap-5">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="hover:opacity-85 transition-opacity"
            style={{ color: navTextColor }}
          >
            <Search size={17} />
          </button>

          <Link
            to={accountHref}
            aria-label={customer ? 'My account' : 'Sign in'}
            className="relative hover:opacity-85 transition-opacity"
            style={{ color: navTextColor }}
          >
            <User size={17} />
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
            <ShoppingBag size={17} />
            {count > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: settings.accentColor || '#1c1917' }}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Sticky Category Bar */}
      <div className="max-w-7xl mx-auto px-6 h-11 flex items-center overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-none w-full flex-nowrap" aria-label="Category navigation tagbar">
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat
            const href = cat === 'All' ? path('products') : path(`products?category=${encodeURIComponent(cat)}`)
            
            return (
              <Link
                key={cat}
                to={href}
                className="text-[11px] font-medium uppercase tracking-wider px-3.5 py-1 rounded-full transition-all duration-200 whitespace-nowrap"
                style={{
                  backgroundColor: isCatActive ? (settings.accentColor || '#1c1917') : 'transparent',
                  color: isCatActive ? '#ffffff' : `${navTextColor}a6`,
                  border: isCatActive ? '1px solid transparent' : '1px solid rgba(28,25,23,0.08)'
                }}
              >
                {cat}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.header>
  )
}
