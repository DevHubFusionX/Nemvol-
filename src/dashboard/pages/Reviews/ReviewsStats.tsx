import { TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  { label: 'Total Reviews', value: '0', change: '0%', up: false },
  { label: 'Rating', value: '0.0/5.0', change: '0%', up: false },
  { label: 'Excellence Reviews', value: '0', change: '0%', up: false },
  { label: 'Negative Reviews', value: '0', change: '0%', up: true },
];

export default function ReviewsStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(({ label, value, change, up }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-5">
          <p className="text-[12px] text-slate-400 mb-2">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-[11px] font-medium ${up ? 'text-emerald-500' : 'text-red-400'}`}>
            {up ? <TrendingUp size={11} strokeWidth={2} /> : <TrendingDown size={11} strokeWidth={2} />}
            {change} vs last month
          </div>
        </div>
      ))}
    </div>
  );
}
