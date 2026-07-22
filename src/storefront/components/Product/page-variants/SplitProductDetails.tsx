import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import ProductCard from '../ProductCard'

export default function SplitProductDetails() {
  const { productId } = useParams<{ productId: string }>()
  const { products, addToCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const navigate = useNavigate()

  const product = products.find(p => p.id === productId || p.slug === productId)
  const [imgIndex, setImgIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const related = products.filter(p => p.id !== product?.id).slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg font-bold text-stone-900 uppercase mb-4">Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="px-8 py-3.5 rounded-full border border-stone-200 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 transition-colors">Go Back</button>
      </div>
    )
  }

  const images = product.images ?? []
  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setImgIndex(i => (i + 1) % images.length)

  return (
    <div className="bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: image carousel — full height */}
        <div className="relative bg-stone-50 flex items-center justify-center min-h-[60vh] lg:min-h-screen overflow-hidden">
          {images.length > 0
            ? <img src={images[imgIndex]} alt={product.name} className="w-full h-full object-cover object-center absolute inset-0" />
            : <ShoppingBag className="w-16 h-16 text-stone-200" />
          }
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>
            </>
          )}
          <button onClick={() => navigate(-1)} className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase text-stone-700 hover:bg-white transition-colors shadow-sm">
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
        </div>

        {/* Right: details */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16 space-y-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-2">{product.category || 'Collection'}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-stone-950 uppercase leading-tight">{product.name}</h1>
            <p className="text-xl font-light text-stone-900 mt-4">{formatPrice(product.price)}</p>
          </div>

          {product.description && <p className="text-stone-500 text-sm leading-relaxed max-w-md">{product.description}</p>}

          <div>
            <p className="text-[9px] font-bold tracking-widest uppercase text-stone-400 mb-3">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-full border text-xs font-bold transition-all ${selectedSize === s ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-200 text-stone-700 hover:border-stone-400'}`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-stone-200 rounded-full py-2 px-4 gap-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-stone-400 hover:text-stone-900"><Minus className="w-3.5 h-3.5" /></button>
              <span className="text-sm font-bold text-stone-900 min-w-[20px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-stone-400 hover:text-stone-900"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <button
              onClick={() => addToCart({ productId: product.id, variantId: product.variants?.[0]?.id || product.id, name: product.name, variantLabel: `Default / ${selectedSize}`, price: product.price, quantity, imageUrl: product.images?.[0] })}
              className="flex-1 py-3.5 rounded-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl tracking-widest text-stone-950 text-center mb-10 uppercase font-light">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
