import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

export default function DroleCategoryGrid() {
  const { path } = useStorefrontPaths()

  const categories = [
    { id: 'women', name: 'WOMEN', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop', to: path('/category/women') },
    { id: 'men', name: 'MEN', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', to: path('/category/men') },
    { id: 'kids', name: 'KIDS', imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop', to: path('/category/kids') },
  ]

  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[600px]">
        {/* Large left card */}
        <Link to={categories[0].to}
          className="group relative lg:col-span-2 h-[400px] lg:h-full overflow-hidden bg-stone-100 flex flex-col justify-end p-8"
        >
          <img src={categories[0].imageUrl} alt={categories[0].name}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="relative z-10">
            <span className="text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase block mb-1">Shop</span>
            <h3 className="font-serif text-4xl font-light text-white tracking-widest uppercase">{categories[0].name}</h3>
            <span className="text-[10px] text-white/70 tracking-widest uppercase mt-1 block">Explore Collection ↗</span>
          </div>
        </Link>

        {/* Right: 2 stacked small cards */}
        <div className="flex flex-col gap-4 h-[400px] lg:h-full">
          {categories.slice(1).map(cat => (
            <Link key={cat.id} to={cat.to}
              className="group relative flex-1 overflow-hidden bg-stone-100 flex flex-col justify-end p-6"
            >
              <img src={cat.imageUrl} alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-light text-white tracking-widest uppercase">{cat.name}</h3>
                <span className="text-[9px] text-white/70 tracking-widest uppercase mt-0.5 block">Shop ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
