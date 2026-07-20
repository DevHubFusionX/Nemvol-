import { CheckCircle } from 'lucide-react'
import { useStorefront } from '../useStorefront'
import type { ShippingData } from './ShippingForm.tsx'

interface Props {
  shipping: ShippingData
  orderNumber: string
}

export default function OrderConfirmation({ shipping, orderNumber }: Props) {
  const { go } = useStorefront()

  return (
    <div className="flex flex-col items-center text-center py-10 gap-6">
      <CheckCircle size={48} strokeWidth={1} className="text-stone-900" />

      <div>
        <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-2">Order Confirmed</p>
        <h2 className="text-2xl font-light text-stone-900">Thank you, {shipping.firstName}!</h2>
      </div>

      <p className="text-sm text-stone-500 max-w-sm leading-relaxed">
        Your order <span className="text-stone-900 font-medium">#{orderNumber}</span> has been placed.
        A confirmation will be sent to <span className="text-stone-900">{shipping.email}</span>.
      </p>

      <div className="bg-stone-50 border border-stone-100 px-8 py-5 text-left w-full max-w-sm">
        <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-3">Shipping to</p>
        <p className="text-sm text-stone-700">{shipping.firstName} {shipping.lastName}</p>
        <p className="text-sm text-stone-500">{shipping.address}</p>
        <p className="text-sm text-stone-500">{shipping.city}, {shipping.state} {shipping.zip}</p>
        <p className="text-sm text-stone-500">{shipping.country}</p>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => go()}
          className="border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase px-8 py-3 hover:border-stone-400 transition-colors"
        >
          Back to Home
        </button>
        <button
          onClick={() => go('products')}
          className="bg-stone-900 text-white text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-stone-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
