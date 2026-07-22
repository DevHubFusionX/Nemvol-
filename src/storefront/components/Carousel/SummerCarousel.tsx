import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useStorefrontPaths } from '../../hooks/useStorefrontPaths'
import { useStorefront } from '../../context/StorefrontProvider'
import { useFormatPrice } from '../../hooks/useFormatPrice'

interface CarouselItem {
    id: number
    imageUrl: string
    alt: string
    name: string
    price: string
}

const items: CarouselItem[] = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
        alt: 'Linen Blend Blazer',
        name: 'Linen Blend Blazer',
        price: '$189.00',
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
        alt: 'Ribbed Knit Dress',
        name: 'Ribbed Knit Dress',
        price: '$145.00',
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
        alt: 'Silk Wrap Maxi Dress',
        name: 'Silk Wrap Maxi Dress',
        price: '$299.00',
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop',
        alt: 'Tailored Linen Trouser',
        name: 'Tailored Linen Trouser',
        price: '$125.00',
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
        alt: 'Cropped Cotton Shirt',
        name: 'Cropped Cotton Shirt',
        price: '$95.00',
    },
]

export default function SummerCarousel() {
    const { products, addToCart } = useStorefront()
    const { path } = useStorefrontPaths()
    const navigate = useNavigate()
    const formatPrice = useFormatPrice()

    const [activeIndex, setActiveIndex] = useState(2) // Start with center item active
    const [isHovered, setIsHovered] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // Use actual products if available, otherwise fallback to mock items
    const displayItems = products.length >= 3 ? products.slice(0, 5).map(p => ({
        id: p.id,
        name: p.name,
        price: formatPrice(p.price),
        imageUrl: p.images?.[0] || '',
        alt: p.name,
        slug: p.slug,
        rawProduct: p
    })) : items.map(item => ({
        id: 'mock-' + item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        alt: item.alt,
        slug: 'mock-' + item.id,
        rawProduct: {
            id: 'mock-' + item.id,
            name: item.name,
            price: parseFloat(item.price.replace(/[^0-9.]/g, '')) * 100,
            images: [item.imageUrl],
            category: 'Collection',
            slug: 'mock-' + item.id,
            variants: [{ id: 'mock-var-' + item.id }]
        }
    }))

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % displayItems.length)
    }

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length)
    }

    // Auto-play sliding logic
    useEffect(() => {
        if (!isHovered && displayItems.length > 0) {
            timerRef.current = setInterval(handleNext, 4000)
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isHovered, displayItems.length])

    const getCardStyle = (index: number) => {
        const diff = index - activeIndex

        if (diff === 0) {
            // Active center card
            return {
                transform: 'scale(1.05) translateZ(0px) rotateY(0deg)',
                zIndex: 10,
                opacity: 1,
            }
        } else if (diff === -1 || diff === displayItems.length - 1) {
            // Left card
            return {
                transform: 'scale(0.9) translateX(-115%) translateZ(-100px) rotateY(25deg)',
                zIndex: 5,
                opacity: 0.85,
            }
        } else if (diff === 1 || diff === -(displayItems.length - 1)) {
            // Right card
            return {
                transform: 'scale(0.9) translateX(115%) translateZ(-100px) rotateY(-25deg)',
                zIndex: 5,
                opacity: 0.85,
            }
        } else if (diff === -2 || diff === displayItems.length - 2) {
            // Far left card
            return {
                transform: 'scale(0.8) translateX(-220%) translateZ(-200px) rotateY(40deg)',
                zIndex: 2,
                opacity: 0.6,
            }
        } else if (diff === 2 || diff === -(displayItems.length - 2)) {
            // Far right card
            return {
                transform: 'scale(0.8) translateX(220%) translateZ(-200px) rotateY(-40deg)',
                zIndex: 2,
                opacity: 0.6,
            }
        } else {
            // Hidden cards
            return {
                transform: `scale(0.5) translateX(${diff > 0 ? 300 : -300}%) translateZ(-300px)`,
                zIndex: 0,
                opacity: 0,
                pointerEvents: 'none' as const,
            }
        }
    }

    return (
        <section
            className="py-20 bg-white overflow-hidden flex flex-col items-center select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-stone-950 text-center mb-16 uppercase font-light">
                THIS SUMMER
            </h2>

            {/* Carousel Container (Desktop only) */}
            <div className="hidden md:flex relative w-full max-w-7xl h-[450px] items-center justify-center px-12">
                {/* Left Navigation Arrow */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 z-20 w-12 h-12 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-stone-50 transition-colors duration-150 shadow-sm"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Cards Wrapper */}
                <div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                    {displayItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                if (index === activeIndex) {
                                    navigate(path(`/product/${item.slug || item.id}`))
                                } else {
                                    setActiveIndex(index)
                                }
                            }}
                            className="absolute w-[280px] sm:w-[320px] h-[400px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-out cursor-pointer group/card"
                            style={getCardStyle(index)}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.alt}
                                className="w-full h-full object-cover object-center pointer-events-none group-hover/card:scale-105 transition-transform duration-500 ease-out"
                            />
                            {/* E-commerce Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                                <h3 className="text-sm font-bold tracking-wide mb-1">{item.name}</h3>
                                <p className="text-xs font-medium text-stone-300 mb-4">{item.price}</p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        addToCart({
                                            productId: item.rawProduct.id,
                                            variantId: item.rawProduct.variants?.[0]?.id || item.rawProduct.id,
                                            name: item.rawProduct.name,
                                            variantLabel: 'Default / M',
                                            price: item.rawProduct.price,
                                            quantity: 1,
                                            imageUrl: item.rawProduct.images?.[0],
                                        })
                                    }}
                                    className="w-full py-2.5 rounded-full bg-white text-stone-950 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-100 transition-colors duration-150 shadow-sm flex items-center justify-center gap-1"
                                >
                                    <span>Quick Add</span>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Navigation Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-4 z-20 w-12 h-12 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-stone-50 transition-colors duration-150 shadow-sm"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Grid (Visible on mobile only) */}
            <div className="grid grid-cols-2 gap-4 md:hidden px-4 w-full">
                {displayItems.map((item) => (
                    <Link
                        key={item.id}
                        to={path(`/product/${item.slug || item.id}`)}
                        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-md transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="aspect-[3/4] w-full bg-stone-50 overflow-hidden relative">
                            <img
                                src={item.imageUrl}
                                alt={item.alt}
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Quick Add Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 via-transparent to-transparent flex justify-center">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        addToCart({
                                            productId: item.rawProduct.id,
                                            variantId: item.rawProduct.variants?.[0]?.id || item.rawProduct.id,
                                            name: item.rawProduct.name,
                                            variantLabel: 'Default / M',
                                            price: item.rawProduct.price,
                                            quantity: 1,
                                            imageUrl: item.rawProduct.images?.[0],
                                        })
                                    }}
                                    className="w-full py-2 rounded-full bg-white text-stone-950 text-[9px] font-bold tracking-widest uppercase hover:bg-stone-100 transition-colors duration-150 shadow-sm flex items-center justify-center gap-1"
                                >
                                    <span>Quick Add</span>
                                    <span>+</span>
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-3 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="text-[8px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-1">
                                    Collection
                                </span>
                                <h3 className="text-[11px] font-bold text-stone-900 tracking-wide line-clamp-1">
                                    {item.name}
                                </h3>
                            </div>
                            <div className="text-[11px] font-bold text-stone-900 mt-1">
                                {item.price}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Button */}
            <Link
                to={path('/products')}
                className="mt-12 px-8 py-3.5 rounded-full border border-stone-200 text-stone-950 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors duration-200 flex items-center gap-2"
            >
                <span>Explore the Collection</span>
                <span className="text-sm">↗</span>
            </Link>
        </section>
    )
}
