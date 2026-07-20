import { ShoppingBag } from 'lucide-react'
import type { Product } from '../../types'
import { useCart } from '../Cart/CartContext'
import { useToast } from '../ui/ToastContext.tsx'
import { useFormatPrice } from '../../hooks/useFormatPrice'

interface Props {
  product: Product
  size: string
  qty: number
  color: string
}

export default function StickyAddToCart({ product, size, qty, color }: Props) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const formatPrice = useFormatPrice()

  function handle() {
    addItem(product, qty, size, color)
    toast(`${product.name} added to cart`)
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-stone-100 px-4 py-3 flex items-center gap-3 shadow-lg">
      <div className="flex-1">
        <p className="text-xs font-medium text-stone-900 truncate">{product.name}</p>
        <p className="text-xs text-stone-500">{formatPrice(product.price)} · Size: {size}</p>
      </div>
      <button
        onClick={handle}
        className="bg-stone-900 text-white text-xs tracking-[0.15em] uppercase px-6 py-3 flex items-center gap-2 hover:bg-stone-700 transition-colors shrink-0"
      >
        <ShoppingBag size={13} strokeWidth={1.5} />
        Add to Cart
      </button>
    </div>
  )
}
