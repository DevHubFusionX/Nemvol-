import { useState } from 'react'

export interface ShippingData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

interface Props {
  onNext: (data: ShippingData) => void
}

const field = (label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] tracking-widest text-stone-400 uppercase">{label}</label>
    <input
      {...props}
      className="border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-stone-500 transition-colors bg-white"
    />
  </div>
)

export default function ShippingForm({ onNext }: Props) {
  const [form, setForm] = useState<ShippingData>({
    email: '', firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
  })

  const set = (k: keyof ShippingData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const valid = Object.values(form).every(v => v.trim() !== '')

  return (
    <form onSubmit={e => { e.preventDefault(); if (valid) onNext(form) }} className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-stone-700 mb-4">Contact</p>
        {field('Email', { type: 'email', value: form.email, onChange: set('email'), required: true, placeholder: 'you@example.com' })}
      </div>

      <div>
        <p className="text-xs font-medium text-stone-700 mb-4">Shipping Address</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('First Name', { value: form.firstName, onChange: set('firstName'), required: true })}
          {field('Last Name',  { value: form.lastName,  onChange: set('lastName'),  required: true })}
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {field('Address', { value: form.address, onChange: set('address'), required: true, placeholder: '123 Main St' })}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {field('City',  { value: form.city,  onChange: set('city'),  required: true })}
            {field('State', { value: form.state, onChange: set('state'), required: true })}
            {field('ZIP',   { value: form.zip,   onChange: set('zip'),   required: true })}
          </div>
          {field('Country', { value: form.country, onChange: set('country'), required: true })}
        </div>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </form>
  )
}
