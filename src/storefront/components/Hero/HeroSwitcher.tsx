import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStorefront } from '../useStorefront'
import { useThemeConfig } from '../../hooks/useThemeConfig'
import type { StoreSettings, Product } from '../../types'

interface Props {
  settings: StoreSettings
  products?: Product[]
}

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: 'easeOut' as const, delay },
  }
}

export default function HeroSwitcher({ settings, products = [] }: Props) {
  const { path } = useStorefront()
  const { getVariant } = useThemeConfig()
  const { storeName, tagline, accentColor } = settings

  const heroLook = (settings as any).heroLook || {}
  const configImages = heroLook.images || []
  
  // Extract product image fallbacks
  const fallbackImages = products
    .flatMap(p => p.images || [])
    .filter(Boolean)
  
  const images = configImages.length > 0 ? configImages : fallbackImages
  const heroImage = images[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  
  const variant = getVariant('hero')
  const overlayOpacity = heroLook.overlayOpacity !== undefined ? heroLook.overlayOpacity / 100 : 0.4

  // 1. Fullscreen Showcase
  if (variant === 'fullscreen') {
    return (
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={heroImage}
          alt={storeName}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />

        <div className="relative z-10 max-w-3xl px-6 py-24 flex flex-col items-center text-center text-white">
          <motion.p
            {...fadeUp(0.25)}
            className="text-xs uppercase tracking-[0.25em] text-stone-300 font-medium mb-5"
          >
            Welcome to
          </motion.p>
          <motion.h1
            {...fadeUp(0.4)}
            className="text-4xl md:text-7xl font-extralight tracking-tight leading-tight mb-6"
          >
            {storeName}
          </motion.h1>
          {tagline && (
            <motion.p
              {...fadeUp(0.55)}
              className="text-sm md:text-base text-stone-200/90 tracking-wide max-w-xl leading-relaxed mb-10"
            >
              {tagline}
            </motion.p>
          )}
          <motion.div {...fadeUp(0.7)}>
            <Link
              to={path('products')}
              className="inline-block text-xs uppercase tracking-[0.2em] px-9 py-4 font-semibold text-white transition-opacity duration-200 hover:opacity-90 shadow-md"
              style={{ backgroundColor: accentColor || '#1c1917' }}
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // 2. Editorial Column
  if (variant === 'editorial') {
    return (
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center bg-[#faf9f6] text-stone-900 py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.p
            {...fadeUp(0.15)}
            className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold mb-4"
          >
            ESTABLISHED STORE
          </motion.p>

          <motion.h1
            {...fadeUp(0.3)}
            className="text-4xl md:text-7xl font-light tracking-tight text-center leading-none mb-10 font-serif"
          >
            {storeName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
            className="w-full max-w-3xl aspect-16/10 overflow-hidden rounded-md border border-stone-200/10 shadow-sm mb-10 bg-stone-100"
          >
            <img
              src={heroImage}
              alt={storeName}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {tagline && (
            <motion.p
              {...fadeUp(0.6)}
              className="text-stone-500 text-xs md:text-sm tracking-wide text-center max-w-md leading-relaxed mb-8"
            >
              {tagline}
            </motion.p>
          )}

          <motion.div {...fadeUp(0.75)}>
            <Link
              to={path('products')}
              className="inline-block text-[11px] uppercase tracking-[0.25em] border border-stone-900 text-stone-900 px-9 py-3.5 hover:bg-stone-900 hover:text-white transition-all duration-300 font-semibold"
            >
              Shop New Arrivals
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // 3. Product Spotlight
  if (variant === 'product-banner') {
    const spotlightProduct = products[0]
    const spotlightImage = spotlightProduct?.images?.[0] || heroImage
    const spotlightCategory = spotlightProduct?.category || 'Collection'

    return (
      <section className="relative w-full min-h-[85vh] flex flex-col md:flex-row items-stretch bg-[#f4f2ee] text-stone-950 overflow-hidden">
        {/* Left Side: Typography and Call to Action */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-16 md:py-24 z-10">
          <div className="max-w-md">
            <motion.p
              {...fadeUp(0.2)}
              className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase mb-4"
            >
              {spotlightCategory} Spotlight
            </motion.p>
            <motion.h1
              {...fadeUp(0.35)}
              className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none mb-6 font-sans text-stone-900"
            >
              {storeName}
            </motion.h1>
            {tagline && (
              <motion.p
                {...fadeUp(0.5)}
                className="text-stone-600 text-sm md:text-base leading-relaxed mb-10"
              >
                {tagline}
              </motion.p>
            )}
            <motion.div {...fadeUp(0.65)}>
              <Link
                to={path('products')}
                className="inline-block text-xs uppercase tracking-widest px-8 py-3.5 text-white font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accentColor || '#1c1917' }}
              >
                Buy Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Oscillating 3D product showcase */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative w-full max-w-md aspect-square flex items-center justify-center"
          >
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              src={spotlightImage}
              alt={spotlightProduct?.name || storeName}
              className="w-4/5 h-4/5 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] select-none"
            />
          </motion.div>
        </div>
      </section>
    )
  }

  // 4. Split Minimalist (Default Variant)
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col md:flex-row items-stretch bg-stone-50/40">
      {/* Left side: Spaced brand copy */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-16 md:py-24">
        <div className="max-w-md">
          <motion.p
            {...fadeUp(0.15)}
            className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-semibold mb-4"
          >
            NEW SEASON
          </motion.p>

          <motion.h1
            {...fadeUp(0.3)}
            className="text-4xl md:text-6xl font-light tracking-tight text-stone-900 leading-tight mb-6"
          >
            {storeName}
          </motion.h1>

          {tagline && (
            <motion.p
              {...fadeUp(0.45)}
              className="text-stone-500 text-sm md:text-base leading-relaxed mb-10 font-normal max-w-sm"
            >
              {tagline}
            </motion.p>
          )}

          <motion.div {...fadeUp(0.6)}>
            <Link
              to={path('products')}
              className="inline-block text-xs uppercase tracking-widest px-8 py-3.5 text-white font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: accentColor || '#1c1917' }}
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right side: High-contrast single focused product image */}
      <div className="flex-1 bg-stone-100/35 flex items-center justify-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full max-h-150 aspect-4/5 overflow-hidden rounded-xl border border-stone-200/20 shadow-md bg-stone-200"
        >
          <img
            src={heroImage}
            alt={storeName}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
