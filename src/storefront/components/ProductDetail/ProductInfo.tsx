import { useState } from 'react'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '../Cart/CartContext'
import { useToast } from '../ui/ToastContext.tsx'
import { useStorefront } from '../useStorefront'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import type { Product } from '../../types'

interface Props {
  product: Product
  onSizeChange?: (size: string) => void
}

const colors = ['#c8b89a', '#7ec8a4', '#6baed6', '#2d2d2d']
const sizes  = ['XS', 'S', 'M', 'L', 'XL']

export default function ProductInfo({ product, onSizeChange }: Props) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const { go, settings } = useStorefront()
  const formatPrice = useFormatPrice()
  const whatsappNumber = settings?.whatsapp || '15550000000'
  const [color, setColor]   = useState(0)
  const [size, setSize]     = useState('M')

  function handleSize(s: string) {
    setSize(s)
    onSizeChange?.(s)
  }
  const [qty, setQty]       = useState(1)
  const [wished, setWished] = useState(false)

  function handleBuyNow() {
    addItem(product, qty, size, colors[color])
    toast(`${product.name} added to cart`)
    go('checkout')
  }

  const waMessage = encodeURIComponent(`Hi! I'm interested in *${product.name}* (${formatPrice(product.price)}). Can you tell me more?`)
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <p className="text-[10px] tracking-widest text-stone-400 uppercase">
        Home &rsaquo; {product.category} &rsaquo; {product.name}
      </p>

      {/* Name */}
      <h1 className="text-3xl font-light text-stone-900 leading-snug tracking-tight">
        {product.name}
      </h1>

      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} viewBox="0 0 12 12" className={`w-3.5 h-3.5 ${ s <= Math.round(product.rating!) ? 'fill-amber-400' : 'fill-stone-200'}`}>
                <path d="M6 0l1.5 3.5L11 4l-2.5 2.5.6 3.5L6 8.5 2.9 10l.6-3.5L1 4l3.5-.5z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-400">{product.rating} ({product.reviewCount} reviews)</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl text-stone-900">{formatPrice(product.price)}</span>
        {product.compareAt && (
          <span className="text-sm text-stone-400 line-through">{formatPrice(product.compareAt)}</span>
        )}
      </div>

      {/* Stock */}
      <p className="text-xs">
        {product.stock === 0
          ? <span className="text-red-500">Out of stock</span>
          : product.stock <= 5
          ? <span className="text-orange-500 font-medium">Only {product.stock} left in stock — order soon!</span>
          : <span className="text-green-600">{product.stock} people are looking at this product</span>
        }
      </p>

      {/* Color */}
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-widest text-stone-500 uppercase">Color</p>
        <div className="flex gap-2">
          {colors.map((c, i) => (
            <button
              key={c}
              onClick={() => setColor(i)}
              style={{ backgroundColor: c }}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                color === i ? 'border-stone-900 scale-110' : 'border-transparent'
              }`}
              aria-label={`Color ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-widest text-stone-500 uppercase">Size</p>
          <button className="text-xs text-stone-400 underline underline-offset-2">Size guide</button>
        </div>
        <div className="flex gap-2">
          {sizes.map(s => (
            <button
              key={s}
              onClick={() => handleSize(s)}
              className={`w-10 h-10 text-xs border transition-colors ${
                size === s
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 text-stone-600 hover:border-stone-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex gap-3 mt-2">
        <div className="flex border border-stone-200">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-10 h-12 text-stone-600 hover:bg-stone-50 transition-colors text-lg"
          >
            −
          </button>
          <span className="w-12 h-12 flex items-center justify-center text-sm text-stone-900">
            {qty}
          </span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-10 h-12 text-stone-600 hover:bg-stone-50 transition-colors text-lg"
          >
            +
          </button>
        </div>

        <button
          onClick={() => { addItem(product, qty, size, colors[color]); toast(`${product.name} added to cart`) }}
          className="flex-1 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors">
          <ShoppingBag size={14} strokeWidth={1.5} />
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-green-500 text-white text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-green-600 transition-colors h-12">
          Buy Now
        </button>

        <button
          onClick={() => setWished(w => !w)}
          aria-label="Wishlist"
          className={`w-12 h-12 border flex items-center justify-center transition-colors ${
            wished ? 'border-stone-900 text-stone-900' : 'border-stone-200 text-stone-400 hover:border-stone-400'
          }`}
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Share */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-stone-400 tracking-widest uppercase">Share</span>
        <button
          onClick={() => { navigator.clipboard.writeText(window.location.href); toast('Link copied!', 'success') }}
          className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-2 transition-colors"
        >
          Copy link
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(product.name + ' — ' + window.location.href)}`}
          target="_blank" rel="noopener noreferrer"
          className="text-xs text-green-600 hover:text-green-700 underline underline-offset-2"
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank" rel="noopener noreferrer"
          className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-2"
        >
          Twitter
        </a>
      </div>

      {/* WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 border border-green-500 text-green-600 text-xs tracking-[0.15em] uppercase py-3 hover:bg-green-500 hover:text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat on WhatsApp
      </a>

      {/* Meta */}
      <div className="border-t border-stone-100 pt-5 grid grid-cols-2 gap-y-2 text-xs text-stone-500">
        {product.sku && <><span className="text-stone-400">SKU</span><span>{product.sku}</span></>}
        <span className="text-stone-400">Category</span>  <span>{product.category}</span>
        {product.tagList.length > 0 && (
          <><span className="text-stone-400">Tags</span><span>{product.tagList.join(', ')}</span></>
        )}
      </div>
    </div>
  )
}
