import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

interface CategoryItem {
    id: string
    name: string
    imageUrl: string
    to: string
}

export default function CategoryGrid() {
    const { path } = useStorefrontPaths()

    const categories: CategoryItem[] = [
        {
            id: 'women',
            name: 'WOMEN',
            imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
            to: path('/category/women'),
        },
        {
            id: 'men',
            name: 'MEN',
            imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
            to: path('/category/men'),
        },
        {
            id: 'kids',
            name: 'KIDS',
            imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&auto=format&fit=crop',
            to: path('/category/kids'),
        },
    ]

    return (
        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.to}
                        className="group relative h-[280px] md:h-[480px] rounded-2xl overflow-hidden shadow-sm bg-stone-100 flex flex-col justify-end p-6"
                    >
                        {/* Background Image */}
                        <img
                            src={cat.imageUrl}
                            alt={cat.name}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

                        {/* Glassmorphism Label */}
                        <div className="relative z-10 w-full rounded-full py-3 px-6 bg-white/10 backdrop-blur-md border border-white/10 text-white text-center transition-all duration-300 group-hover:border-white group-hover:bg-white/20 shadow-sm flex flex-col items-center justify-center gap-0.5">
                            <span className="text-xs font-bold tracking-widest uppercase">{cat.name}</span>
                            <span className="text-[9px] font-medium tracking-wider text-white/70 group-hover:text-white transition-colors duration-150">Shop Category ↗</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
