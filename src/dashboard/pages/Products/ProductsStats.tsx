import { TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  { label: 'Total Products Value', value: '₦0', change: '+1.5%', up: true },
  { label: 'Total Categories', value: '0', change: '+2.3%', up: true },
  { label: 'Total Products', value: '0', change: '-11.4%', up: false },
];

export default function ProductsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {stats.map(({ label, value, change, up }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
            {label}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-[11px] font-medium ${up ? 'text-emerald-500' : 'text-red-400'}`}>
            {up ? <TrendingUp size={12} strokeWidth={2} /> : <TrendingDown size={12} strokeWidth={2} />}
            {change} vs last month
          </div>
        </div>
      ))}
    </div>
  );
}
