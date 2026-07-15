import { Check, X, Minus } from 'lucide-react';

type Cell = true | false | 'partial' | string;

const rows: { feature: string; starter: Cell; growth: Cell; premium: Cell }[] = [
  { feature: 'Store duration', starter: '3 months', growth: '3 months', premium: '3 months' },
  { feature: 'Free Nemvol sub-domain', starter: true, growth: true, premium: true },
  { feature: 'Custom domain', starter: false, growth: true, premium: true },
  { feature: 'Custom domain free period', starter: false, growth: 'First year only', premium: 'First year only' },
  { feature: 'Mobile-friendly storefront', starter: true, growth: true, premium: true },
  { feature: 'Unlimited products', starter: false, growth: true, premium: true },
  { feature: 'Unlimited orders', starter: false, growth: true, premium: true },
  { feature: 'Cart and checkout', starter: true, growth: true, premium: true },
  { feature: 'Order dashboard', starter: true, growth: true, premium: true },
  { feature: 'Payment & delivery setup', starter: true, growth: true, premium: true },
  { feature: 'Product variants', starter: 'partial', growth: true, premium: true },
  { feature: 'Pre-order products', starter: false, growth: true, premium: true },
  { feature: 'Minimum order quantity', starter: false, growth: true, premium: true },
  { feature: 'Abandoned cart reminders', starter: false, growth: true, premium: true },
  { feature: 'Customer follow-up tools', starter: false, growth: true, premium: true },
  { feature: 'Advanced sales analytics', starter: false, growth: 'partial', premium: true },
  { feature: 'Customer analytics', starter: false, growth: 'partial', premium: true },
  { feature: 'Custom design touches', starter: false, growth: false, premium: true },
  { feature: 'Priority support', starter: false, growth: false, premium: true },
  { feature: 'Dedicated account manager', starter: false, growth: false, premium: true },
];

function Cell({ value }: { value: Cell }) {
  if (value === true) return <Check size={14} strokeWidth={2.5} className="text-emerald-500 mx-auto" />;
  if (value === false) return <X size={13} strokeWidth={2} className="text-slate-300 mx-auto" />;
  if (value === 'partial') return <Minus size={13} strokeWidth={2} className="text-slate-400 mx-auto" />;
  return <span className="text-[12px] text-slate-500">{value}</span>;
}

export default function BillingTable() {
  return (
    <div>
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Compare features
        </p>
        <h2 className="text-[17px] font-bold text-slate-900">See exactly what each plan includes</h2>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Growth is recommended for most serious brands.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 w-1/2">
                Feature
              </th>
              {['Starter', 'Growth', 'Premium'].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-center ${
                    h === 'Growth' ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {h === 'Growth' ? (
                    <span className="inline-flex items-center gap-1.5">
                      {h}
                      <span className="text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded-full normal-case tracking-normal">
                        Popular
                      </span>
                    </span>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ feature, starter, growth, premium }, i) => (
              <tr
                key={feature}
                className={`border-b border-slate-50 last:border-0 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}
              >
                <td className="px-5 py-3 text-[13px] text-slate-700">{feature}</td>
                <td className="px-4 py-3 text-center"><Cell value={starter} /></td>
                <td className="px-4 py-3 text-center"><Cell value={growth} /></td>
                <td className="px-4 py-3 text-center"><Cell value={premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
