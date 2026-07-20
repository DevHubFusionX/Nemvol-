import { Truck, Clock, RefreshCw } from 'lucide-react'

const perks = [
  { icon: Truck,      label: 'Free Shipping',  sub: 'On qualifying orders' },
  { icon: Clock,      label: 'Support 24/7',   sub: 'Around the clock assistance' },
  { icon: RefreshCw,  label: 'Money Return',   sub: '30-day hassle-free returns' },
]

export default function PerksBar() {
  return (
    <div className="grid grid-cols-3 divide-x divide-stone-200 border-y border-stone-200 py-10">
      {perks.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex flex-col items-center gap-3 px-6 text-center">
          <Icon size={28} strokeWidth={1.25} className="text-stone-700" />
          <p className="text-sm font-medium text-stone-900 tracking-wide">{label}</p>
          <p className="text-xs text-stone-400 leading-relaxed">{sub}</p>
        </div>
      ))}
    </div>
  )
}
