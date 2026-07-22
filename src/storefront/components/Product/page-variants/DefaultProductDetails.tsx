import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Plus, Minus, Heart, Share2, ShoppingBag, ChevronLeft, Star } from 'lucide-react'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import ProductCard from '../ProductCard'
import { fetchPublicReviews } from '../../../lib/publicApi'

export default function ProductDetails() {
    const { productId } = useParams<{ productId: string }>()
    const { products, addToCart, slug } = useStorefront()
    const formatPrice = useFormatPrice()
    const { path } = useStorefrontPaths()
    const navigate = useNavigate()

    const [reviews, setReviews] = useState<any[]>([])

    useEffect(() => {
        if (!slug) return
        fetchPublicReviews(slug)
            .then((data) => {
                setReviews(data)
            })
            .catch((err) => console.error('Failed to fetch reviews:', err))
    }, [slug])

    const mockItems = [
        {
            id: 'mock-1',
            slug: 'mock-1',
            name: 'Linen Blend Blazer',
            price: 18900,
            images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop'],
            category: 'Collection',
            description: 'A premium linen blend blazer perfect for summer evenings.',
            variants: [{ id: 'mock-var-1' }]
        },
        {
            id: 'mock-2',
            slug: 'mock-2',
            name: 'Ribbed Knit Dress',
            price: 14500,
            images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'],
            category: 'Collection',
            description: 'A comfortable and stylish ribbed knit dress for everyday wear.',
            variants: [{ id: 'mock-var-2' }]
        },
        {
            id: 'mock-3',
            slug: 'mock-3',
            name: 'Silk Wrap Maxi Dress',
            price: 29900,
            images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop'],
            category: 'Collection',
            description: 'An elegant silk wrap maxi dress for special occasions.',
            variants: [{ id: 'mock-var-3' }]
        },
        {
            id: 'mock-4',
            slug: 'mock-4',
            name: 'Tailored Linen Trouser',
            price: 12500,
            images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop'],
            category: 'Collection',
            description: 'Classic tailored linen trousers for a sophisticated look.',
            variants: [{ id: 'mock-var-4' }]
        },
        {
            id: 'mock-5',
            slug: 'mock-5',
            name: 'Cropped Cotton Shirt',
            price: 9500,
            images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop'],
            category: 'Collection',
            description: 'A casual cropped cotton shirt for a relaxed summer style.',
            variants: [{ id: 'mock-var-5' }]
        }
    ]

    const product = products.find((p) => p.id === productId || p.slug === productId) || mockItems.find((p) => p.id === productId || p.slug === productId)

    const [activeImage, setActiveImage] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState('M')
    const [selectedColor] = useState('Default')
    const [activeTab, setActiveTab] = useState<string | null>(null)

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setActiveImage(product.images[0])
        }
    }, [product])

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-lg font-bold text-stone-900 uppercase mb-4">Product Not Found</h2>
                <p className="text-stone-500 text-xs mb-8">The product you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3.5 rounded-full border border-stone-200 text-stone-950 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors"
                >
                    Go Back
                </button>
            </div>
        )
    }

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            variantId: product.variants?.[0]?.id || product.id,
            name: product.name,
            variantLabel: `${selectedColor} / ${selectedSize}`,
            price: product.price,
            quantity: quantity,
            imageUrl: product.images?.[0],
        })
    }

    // Related products (excluding current product)
    const relatedProducts = products
        .filter((p) => p.id !== product.id)
        .slice(0, 4)

    const sizes = ['XS', 'S', 'M', 'L', 'XL']

    const defaultMockReviews = [
        {
            id: 'rev-1',
            authorName: 'Sarah M.',
            rating: '5',
            comment: 'Absolutely stunning piece. The fabric feels incredibly premium and the fit is true to size. Perfect for both casual and formal wear.',
            createdAt: '2025-06-15T10:00:00Z',
        },
        {
            id: 'rev-2',
            authorName: 'James L.',
            rating: '4',
            comment: 'Very high quality craftsmanship. The details are beautiful. Delivery was fast and the packaging was lovely.',
            createdAt: '2025-06-10T14:30:00Z',
        },
        {
            id: 'rev-3',
            authorName: 'Elena R.',
            rating: '5',
            comment: 'Exceeded my expectations. The drape is perfect and it feels so luxurious. Will definitely purchase from this collection again.',
            createdAt: '2025-06-01T09:15:00Z',
        },
    ]

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs & Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-stone-100">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-500 hover:text-stone-950 transition-colors uppercase"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                </button>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    <Link to={path('/')} className="hover:text-stone-950 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-stone-950">{product.name}</span>
                </div>
            </div>

            {/* Main Product Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="aspect-[4/5] max-h-[550px] w-full rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 relative group">
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                    <ShoppingBag className="w-12 h-12" />
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-20 h-24 rounded-xl overflow-hidden border shrink-0 transition-all duration-200 ${activeImage === img
                                                ? 'border-stone-950 ring-1 ring-stone-950'
                                                : 'border-stone-200 hover:border-stone-400'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            {/* Stock Badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-bold tracking-widest uppercase animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>In Stock & Ready to Ship</span>
                            </div>

                            <div>
                                <span className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-2">
                                    {product.category || 'Collection'}
                                </span>
                                <h1 className="font-serif text-3xl sm:text-4xl tracking-wider text-stone-950 uppercase font-light leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="text-xl font-bold text-stone-900">
                                {formatPrice(product.price)}
                            </div>

                            <p className="text-stone-600 text-xs leading-relaxed">
                                {product.description ||
                                    'A premium piece crafted from carefully selected materials, designed to offer both exceptional comfort and a timeless, sophisticated silhouette.'}
                            </p>

                            {/* Size Selector */}
                            <div className="space-y-3">
                                <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase block">
                                    Select Size
                                </span>
                                <div className="flex gap-3">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full border text-xs font-bold tracking-wider transition-all duration-150 ${selectedSize === size
                                                    ? 'border-stone-950 bg-stone-950 text-white'
                                                    : 'border-stone-200 text-stone-800 hover:border-stone-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase block">
                                    Quantity
                                </span>
                                <div className="flex items-center border border-stone-200 rounded-full w-32 py-1.5 px-3 bg-stone-50">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-xs font-bold text-stone-900 flex-1 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-900 transition-colors duration-150 shadow-sm flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>Add to Cart</span>
                            </button>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3.5 rounded-full border border-stone-200 text-stone-800 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                                    <Heart className="w-3.5 h-3.5" />
                                    <span>Wishlist</span>
                                </button>
                                <button className="flex-1 py-3.5 rounded-full border border-stone-200 text-stone-800 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                                    <Share2 className="w-3.5 h-3.5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Accordion Info Sections */}
                        <div className="border-t border-stone-100 pt-6 space-y-4">
                            {[
                                {
                                    id: 'details',
                                    title: 'Details & Care',
                                    content: (
                                        <ul className="list-disc list-inside space-y-1.5 text-stone-500">
                                            <li>Premium material blend selected for comfort and durability</li>
                                            <li>Breathable, lightweight fabric perfect for all seasons</li>
                                            <li>Dry clean recommended to maintain shape and texture</li>
                                            <li>Ethically sourced and responsibly manufactured</li>
                                        </ul>
                                    )
                                },
                                {
                                    id: 'fit',
                                    title: 'Size & Fit',
                                    content: (
                                        <div className="space-y-2 text-stone-500">
                                            <p>Fits true to size. Take your normal size.</p>
                                            <p>Designed for a clean, contemporary silhouette.</p>
                                            <p>Model is 6\'1" / 185cm and wears a size Medium.</p>
                                        </div>
                                    )
                                },
                                {
                                    id: 'shipping',
                                    title: 'Shipping & Returns',
                                    content: (
                                        <div className="space-y-2 text-stone-500">
                                            <p>Complimentary standard delivery on orders over $150.</p>
                                            <p>Standard delivery: 3-5 business days.</p>
                                            <p>Easy returns within 30 days of purchase.</p>
                                        </div>
                                    )
                                }
                            ].map((tab) => {
                                const isOpen = activeTab === tab.id
                                return (
                                    <div key={tab.id} className="border-b border-stone-100 pb-4">
                                        <button
                                            onClick={() => setActiveTab(isOpen ? null : tab.id)}
                                            className="w-full flex items-center justify-between text-[10px] font-bold tracking-widest text-stone-900 uppercase py-2"
                                        >
                                            <span>{tab.title}</span>
                                            <span className="text-xs transition-transform duration-200 transform">
                                                {isOpen ? '−' : '+'}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="mt-3 text-[11px] leading-relaxed text-stone-600">
                                                {tab.content}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="border-t border-stone-100 py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-serif text-2xl tracking-widest text-stone-950 text-center mb-12 uppercase font-light">
                        Customer Reviews
                    </h2>

                    {/* Rating Summary */}
                    <div className="flex flex-col items-center justify-center text-center mb-12 pb-12 border-b border-stone-100">
                        <div className="text-4xl font-serif text-stone-950 mb-2">4.8</div>
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-stone-950 text-stone-950" />
                            ))}
                        </div>
                        <p className="text-stone-500 text-[10px] tracking-widest uppercase">
                            Based on {(reviews.length > 0 ? reviews : defaultMockReviews).length} reviews
                        </p>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-8">
                        {(reviews.length > 0 ? reviews : defaultMockReviews).map((rev) => {
                            const ratingNum = parseInt(rev.rating || '5', 10)
                            return (
                                <div key={rev.id} className="border-b border-stone-100 pb-8 last:border-none last:pb-0">
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                                                {rev.authorName || 'Anonymous'}
                                            </span>
                                            <div className="flex items-center gap-0.5 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < ratingNum
                                                                ? 'fill-stone-950 text-stone-950'
                                                                : 'text-stone-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {rev.createdAt && (
                                            <span className="text-[10px] text-stone-400">
                                                {new Date(rev.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-stone-600 text-xs leading-relaxed">
                                        {rev.comment}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="bg-stone-50/50 border-t border-stone-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-2xl tracking-widest text-stone-950 text-center mb-12 uppercase font-light">
                            YOU MAY ALSO LIKE
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
