import type { CartItem } from '../Cart/CartContext'
import { useFormatPrice } from '../../hooks/useFormatPrice'

interface Props {
  items: CartItem[]
  total: number
}

const SHIPPING = 0
const TAX_RATE = 0.08

export default function OrderSummary({ items, total }: Props) {
  const formatPrice = useFormatPrice()
  const tax = total * TAX_RATE
  const grand = total + SHIPPING + tax

  return (
    <div className="bg-stone-50 border border-stone-100 p-5 flex flex-col gap-5">
      <p className="text-xs tracking-[0.2em] text-stone-400 uppercase">Order Summary</p>

      {/* Items */}
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
            <div className="relative w-14 h-16 bg-stone-200 shrink-0 overflow-hidden">
              {item.product.images[0]
                ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                : <span className="absolute inset-0 flex items-center justify-center text-stone-400 text-[10px]">IMG</span>
              }
              <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {item.qty}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xs text-stone-900 font-medium leading-snug">{item.product.name}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Size: {item.size}</p>
            </div>
            <span className="text-xs text-stone-900">{formatPrice(item.product.price * item.qty)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-200 pt-4 flex flex-col gap-2 text-xs text-stone-500">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{SHIPPING === 0 ? 'Free' : formatPrice(SHIPPING)}</span></div>
        <div className="flex justify-between"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
      </div>

      <div className="border-t border-stone-200 pt-4 flex justify-between text-sm font-medium text-stone-900">
        <span>Total</span>
        <span>{formatPrice(grand)}</span>
      </div>
    </div>
  )
}
