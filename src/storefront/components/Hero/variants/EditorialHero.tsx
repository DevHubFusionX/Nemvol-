import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'

export default function EditorialHero() {
  const { path } = useStorefrontPaths()
  const { heroLook, colors } = useTemplateState()
  const images = heroLook?.images ?? []
  const img1 = images[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
  const img2 = images[1] || 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'

  return (
    <section className="w-full min-h-[90vh] bg-stone-50 grid grid-cols-1 lg:grid-cols-2">
      {/* Left: text column */}
      <div className="flex flex-col justify-center px-10 py-20 lg:px-16 order-2 lg:order-1">
        <span className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-6">
          New Collection
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-light tracking-wide text-stone-950 leading-tight mb-8">
          Looks You<br />Remember
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed max-w-sm mb-10">
          Timeless pieces crafted for the modern wardrobe. Discover the new season.
        </p>
        <Link
          to={path('/products')}
          className="self-start px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors duration-200"
          style={{ backgroundColor: colors?.primary ?? '#1c1917', color: '#ffffff' }}
        >
          Shop Now ↗
        </Link>
      </div>

      {/* Right: image collage */}
      <div className="relative h-[60vh] lg:h-auto order-1 lg:order-2 overflow-hidden">
        <img src={img1} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute bottom-6 right-6 w-36 h-48 rounded-xl overflow-hidden border-4 border-white shadow-xl hidden lg:block">
          <img src={img2} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
