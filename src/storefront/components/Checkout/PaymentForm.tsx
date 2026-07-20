import { useState } from 'react'
import { Lock, CreditCard, Building2, Truck } from 'lucide-react'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import type { ShippingData } from './ShippingForm.tsx'
import type { PublicPaymentMethods } from '../../types'

export type PaymentMethod = 'card' | 'transfer' | 'pod'

export interface PaymentData {
  method: PaymentMethod
  cardName?: string
  cardNumber?: string
  expiry?: string
  cvv?: string
}

interface Props {
  shipping: ShippingData
  total: number
  paymentMethods: PublicPaymentMethods
  onBack: () => void
  onNext: (data: PaymentData) => void
  isLoading?: boolean
}

function formatCard(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

export default function PaymentForm({ shipping, total, paymentMethods, onBack, onNext, isLoading }: Props) {
  const formatPrice = useFormatPrice()

  // Build list of enabled methods from dashboard config
  const available: { id: PaymentMethod; label: string; icon: React.ElementType }[] = []
  if (paymentMethods.cards?.enabled)    available.push({ id: 'card',     label: 'Card',          icon: CreditCard })
  if (paymentMethods.transfer?.enabled) available.push({ id: 'transfer', label: 'Bank Transfer',  icon: Building2  })
  if (paymentMethods.pod?.enabled)      available.push({ id: 'pod',      label: 'Pay on Delivery', icon: Truck      })

  // Fallback: if merchant hasn't configured anything, show card
  if (available.length === 0) available.push({ id: 'card', label: 'Card', icon: CreditCard })

  const [method, setMethod] = useState<PaymentMethod>(available[0].id)
  const [card, setCard] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })

  const setC = (k: keyof typeof card, transform?: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCard(f => ({ ...f, [k]: transform ? transform(e.target.value) : e.target.value }))

  const cardValid = card.cardName && card.cardNumber.replace(/\s/g, '').length === 16
    && card.expiry.length === 5 && card.cvv.length >= 3

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (method === 'card' && !cardValid) return
    onNext({ method, ...card })
  }

  const transfer = paymentMethods.transfer

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Shipping recap */}
      <div className="bg-stone-50 border border-stone-100 px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-0.5">Ship to</p>
          <p className="text-xs text-stone-700 leading-relaxed">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
        </div>
        <button type="button" onClick={onBack} className="text-xs text-stone-400 underline underline-offset-2 hover:text-stone-700 self-start sm:self-auto shrink-0">
          Edit
        </button>
      </div>

      {/* Method tabs */}
      {available.length > 1 && (
        <div>
          <p className="text-xs font-medium text-stone-700 mb-3">Payment Method</p>
          <div className={`grid gap-2 grid-cols-${available.length}`}>
            {available.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                className={`flex flex-col items-center gap-2 py-4 border text-xs transition-colors ${
                  method === id
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card fields */}
      {method === 'card' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-stone-700">Card Details</p>
            <div className="flex items-center gap-1 text-stone-400">
              <Lock size={11} strokeWidth={1.5} />
              <span className="text-[10px]">Secure & encrypted</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest text-stone-400 uppercase">Name on Card</label>
            <input value={card.cardName} onChange={setC('cardName')} placeholder="John Doe" required
              className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors bg-white" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest text-stone-400 uppercase">Card Number</label>
            <input value={card.cardNumber} onChange={setC('cardNumber', formatCard)} placeholder="1234 5678 9012 3456" required
              className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors bg-white font-mono tracking-widest" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">Expiry</label>
              <input value={card.expiry} onChange={setC('expiry', formatExpiry)} placeholder="MM/YY" required
                className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors bg-white" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest text-stone-400 uppercase">CVV</label>
              <input value={card.cvv} onChange={e => setCard(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} placeholder="•••" required
                className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors bg-white" />
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer */}
      {method === 'transfer' && (
        <div className="bg-stone-50 border border-stone-100 p-6 flex flex-col gap-4">
          <p className="text-xs font-medium text-stone-700">Transfer to this account</p>
          <div className="grid grid-cols-2 gap-y-3 text-xs">
            {transfer?.bankName && (
              <><span className="text-stone-400">Bank Name</span><span className="text-stone-900 font-medium">{transfer.bankName}</span></>
            )}
            {transfer?.accountName && (
              <><span className="text-stone-400">Account Name</span><span className="text-stone-900 font-medium">{transfer.accountName}</span></>
            )}
            {transfer?.accountNumber && (
              <><span className="text-stone-400">Account Number</span><span className="text-stone-900 font-medium font-mono">{transfer.accountNumber}</span></>
            )}
            <span className="text-stone-400">Amount</span>
            <span className="text-stone-900 font-medium">{formatPrice(total)}</span>
          </div>
          <p className="text-[10px] text-stone-400 leading-relaxed border-t border-stone-200 pt-3">
            Use your order number as the payment reference. Your order will be confirmed once payment is received.
          </p>
        </div>
      )}

      {/* Pay on Delivery */}
      {method === 'pod' && (
        <div className="bg-stone-50 border border-stone-100 p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Truck size={20} strokeWidth={1.5} className="text-stone-500 shrink-0" />
            <p className="text-sm font-medium text-stone-900">Pay on Delivery</p>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            Pay with cash or card when your order is delivered. Our delivery agent will collect payment at your door.
          </p>
          <div className="text-xs text-stone-500 bg-white border border-stone-100 px-4 py-2">
            Amount due: <span className="text-stone-900 font-medium">{formatPrice(total)}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="w-1/3 border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase py-4 hover:border-stone-400 transition-colors">
          Back
        </button>
        <button
          type="submit"
          disabled={(method === 'card' && !cardValid) || isLoading}
          className="flex-1 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {isLoading ? 'Placing Order…' : method === 'pod' ? 'Place Order' : method === 'transfer' ? 'Confirm Order' : 'Place Order'}
        </button>
      </div>
    </form>
  )
}
