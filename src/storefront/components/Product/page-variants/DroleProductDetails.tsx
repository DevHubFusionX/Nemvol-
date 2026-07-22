import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Minus, ShoppingBag, ChevronLeft } from 'lucide-react'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import ProductCard from '../ProductCard'

export default function DroleProductDetails() {
  const { productId } = useParams<{ productId: string }>()
  const { products, addToCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const navigate = useNavigate()

  const product = products.find(p => p.id === productId || p.slug === productId)
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

  return (
    <div className="bg-white min-h-screen">
      {/* Full-width hero image */}
      <div className="relative w-full h-[70vh] bg-stone-100 overflow-hidden">
        {product.images?.[0]
          ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center" />
          : <div className="w-full h-full flex items-center justify-center text-stone-300"><ShoppingBag className="w-16 h-16" /></div>
        }
        <button onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-xs font-bold tracking-wider uppercase text-stone-700 hover:bg-white transition-colors shadow-sm"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>

      {/* Details below hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="w-24 h-28 lg:w-full lg:h-48 rounded-xl overflow-hidden shrink-0">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-2">{product.category || 'Collection'}</span>
              <h1 className="font-serif text-4xl font-light tracking-wide text-stone-950 uppercase leading-tight">{product.name}</h1>
              <p className="text-2xl font-light text-stone-900 mt-4">{formatPrice(product.price)}</p>
            </div>

            {product.description && <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>}

            <div className="space-y-3">
              <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase block">Size</span>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-full border text-xs font-bold transition-all ${selectedSize === size ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-200 text-stone-700 hover:border-stone-400'}`}
                  >{size}</button>
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
                className="flex-1 py-3.5 bg-stone-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>
            </div>
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
