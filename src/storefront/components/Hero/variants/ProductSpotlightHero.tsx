import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'
import { useStorefront } from '../../../context/StorefrontProvider'

export default function ProductSpotlightHero() {
  const { path } = useStorefrontPaths()
  const { heroLook, colors } = useTemplateState()
  const { products } = useStorefront()
  const images = heroLook?.images ?? []
  const spotlightImg = images[0] || products[0]?.images?.[0] || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
  const bgImg = images[1] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
  const overlay = (heroLook?.overlayOpacity ?? 50) / 100

  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center">
      <img src={bgImg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlay})` }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-white">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase block mb-4">
            Featured Drop
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light tracking-wide leading-tight mb-6 uppercase">
            The Piece<br />Everyone Wants
          </h1>
          <Link
            to={path('/products')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-200"
            style={{ backgroundColor: colors?.primary ?? '#ffffff', color: colors?.secondary ?? '#1c1917' }}
          >
            Shop Now ↗
          </Link>
        </div>

        {/* Floating product image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div
            className="w-64 h-80 lg:w-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl"
            style={{ transform: 'perspective(800px) rotateY(-8deg) rotateX(2deg)' }}
          >
            <img src={spotlightImg} alt="Featured product" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
