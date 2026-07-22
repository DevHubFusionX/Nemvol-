import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Minus, ShoppingBag, ChevronLeft } from 'lucide-react'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useFormatPrice } from '../../../hooks/useFormatPrice'
import ProductCard from '../ProductCard'

export default function ModernProductDetails() {
  const { productId } = useParams<{ productId: string }>()
  const { products, addToCart } = useStorefront()
  const formatPrice = useFormatPrice()
  const navigate = useNavigate()

  const product = products.find(p => p.id === productId || p.slug === productId)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeTab, setActiveTab] = useState<string | null>(null)
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

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-stone-400 hover:text-stone-900 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: image grid */}
          <div className="grid grid-cols-2 gap-3">
            {images.length > 0
              ? images.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-xl bg-stone-50 ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                  <img src={img} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))
              : <div className="col-span-2 aspect-[16/9] rounded-xl bg-stone-50 flex items-center justify-center text-stone-300"><ShoppingBag className="w-12 h-12" /></div>
            }
          </div>

          {/* Right: sticky details */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase">{product.category || 'Collection'}</span>
              <h1 className="text-2xl font-bold text-stone-900 mt-1 leading-tight">{product.name}</h1>
              <p className="text-xl font-bold text-stone-900 mt-3">{formatPrice(product.price)}</p>
            </div>

            {product.description && <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>}

            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${selectedSize === s ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-700 hover:border-stone-400'}`}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-200 rounded-lg py-2 px-3 gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-stone-400 hover:text-stone-900"><Minus className="w-3.5 h-3.5" /></button>
                <span className="text-sm font-bold text-stone-900 min-w-[20px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-stone-400 hover:text-stone-900"><Plus className="w-3.5 h-3.5" /></button>
              </div>
              <button
                onClick={() => addToCart({ productId: product.id, variantId: product.variants?.[0]?.id || product.id, name: product.name, variantLabel: `Default / ${selectedSize}`, price: product.price, quantity, imageUrl: product.images?.[0] })}
                className="flex-1 py-3 rounded-lg bg-stone-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>

            <div className="border-t border-stone-100 pt-4 space-y-2">
              {[{ id: 'details', title: 'Details & Care' }, { id: 'shipping', title: 'Shipping & Returns' }].map(tab => (
                <div key={tab.id} className="border-b border-stone-100 pb-2">
                  <button onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                    className="w-full flex justify-between items-center py-2 text-[11px] font-bold tracking-widest uppercase text-stone-700"
                  >
                    {tab.title} <span>{activeTab === tab.id ? '−' : '+'}</span>
                  </button>
                  {activeTab === tab.id && (
                    <p className="text-[11px] text-stone-500 leading-relaxed pb-2">
                      {tab.id === 'details' ? 'Premium materials, ethically sourced. Dry clean recommended.' : 'Standard delivery 3–5 business days. Free returns within 30 days.'}
                    </p>
                  )}
                </div>
              ))}
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
