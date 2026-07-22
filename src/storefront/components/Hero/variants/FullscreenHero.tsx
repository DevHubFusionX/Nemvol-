import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'

export default function FullscreenHero() {
  const { path } = useStorefrontPaths()
  const { heroLook, colors } = useTemplateState()
  const images = heroLook?.images ?? []
  const bg = images[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
  const overlay = (heroLook?.overlayOpacity ?? 40) / 100

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img src={bg} alt="Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlay})` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl font-light tracking-widest text-white mb-10 max-w-5xl leading-tight uppercase">
          LOOKS YOU REMEMBER
        </h1>
        <Link
          to={path('/products')}
          className="px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-200 shadow-sm"
          style={{ backgroundColor: colors?.primary ?? '#ffffff', color: colors?.secondary ?? '#1c1917' }}
        >
          Shop Now ↗
        </Link>
      </div>
    </section>
  )
}
