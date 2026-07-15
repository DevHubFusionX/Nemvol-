import { Link2, ShoppingCart, Truck, Store } from 'lucide-react';

const perks = [
  { icon: Link2, label: 'Free Nemvol sub-domain', sub: 'Shareable store link on every plan' },
  { icon: ShoppingCart, label: 'Checkout & orders', sub: 'Cart, checkout, and order flow included' },
  { icon: Truck, label: 'Payment & delivery', sub: 'Configured based on your plan' },
  { icon: Store, label: 'Built for Nigerian brands', sub: 'Instagram, WhatsApp, TikTok, retail' },
];

export default function BillingPerks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {perks.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={14} className="text-slate-500" strokeWidth={1.7} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-800 leading-snug">{label}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
