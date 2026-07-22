import { Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

export default function DefaultHero() {
  const sections = ['LIMITED DROPS', 'ICONIC STYLING', 'THIS SEASON', 'NS STORY']
  const { path } = useStorefrontPaths()

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-stone-900">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
        alt="Luxury Fashion Hero"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light tracking-widest text-white mb-8 select-none max-w-4xl leading-tight">
          LOOKS YOU REMEMBER
        </h1>
        <Link
          to={path('/products')}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-stone-950 text-xs font-bold tracking-widest uppercase hover:bg-stone-100 transition-colors duration-200 shadow-sm"
        >
          <span>Shop Now</span>
          <span className="text-sm">↗</span>
        </Link>
      </div>
      <button
        className="absolute bottom-16 md:bottom-24 right-6 sm:right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-150"
        aria-label="Toggle sound"
      >
        <Volume2 className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 inset-x-0 bg-white/10 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-4 divide-x divide-white/10 text-center">
          {sections.map((sec) => (
            <button
              key={sec}
              className="py-4 md:py-5 text-[8px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.2em] text-white hover:bg-white/5 transition-colors duration-150 truncate px-1"
            >
              {sec}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
