import { Coins, Tag, Gift, Shirt } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../hooks/useStorefrontPaths'

interface Benefit {
    id: number
    icon: React.ComponentType<{ className?: string }>
    title: string
}

const benefits: Benefit[] = [
    {
        id: 1,
        icon: Coins,
        title: 'POINTS FOR PURCHASES',
    },
    {
        id: 2,
        icon: Tag,
        title: 'EXCLUSIVE DISCOUNTS',
    },
    {
        id: 3,
        icon: Gift,
        title: 'BIRTHDAY GIFTS',
    },
    {
        id: 4,
        icon: Shirt,
        title: 'EARLY ACCESS TO DROPS',
    },
]

export default function MembershipClub() {
    const { path } = useStorefrontPaths()
    return (
        <section className="py-20 bg-stone-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl my-12">
            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-stone-950 text-center mb-16 uppercase font-light">
                MEMBERSHIP CLUB
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left: 2x2 Benefits Grid */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon
                        return (
                            <div
                                key={benefit.id}
                                className="bg-white p-8 rounded-2xl border border-stone-200/60 flex flex-col items-center justify-center text-center group hover:shadow-md hover:border-stone-300 transition-all duration-300 min-h-[200px]"
                            >
                                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-700 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xs font-bold tracking-widest text-stone-900 uppercase">
                                    {benefit.title}
                                </h3>
                            </div>
                        )
                    })}
                </div>

                {/* Right: Large Promo Card */}
                <div className="lg:col-span-6 rounded-2xl overflow-hidden relative min-h-[400px] lg:min-h-full bg-stone-200 shadow-sm group flex flex-col justify-end p-8">
                    <img
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop"
                        alt="Membership Promo"
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

                    {/* Join CTA */}
                    <div className="relative z-10 flex flex-col items-start text-white">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-300 mb-2">Exclusive Access</span>
                        <h3 className="font-serif text-2xl font-light tracking-wide mb-6">Unlock premium perks & early drops</h3>
                        <button className="px-6 py-3 rounded-full bg-white text-stone-950 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-100 transition-colors duration-150 shadow-sm flex items-center gap-1">
                            <span>Join the Club</span>
                            <span className="text-xs">↗</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-12">
                <Link
                    to={path('/products')}
                    className="px-8 py-3.5 rounded-full border border-stone-200 bg-white text-stone-950 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                >
                    <span>Explore Benefits</span>
                    <span className="text-sm">↗</span>
                </Link>
            </div>
        </section>
    )
}
