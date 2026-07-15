import { Star, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  { label: 'Total Reviews', value: '0', change: '0%', up: false },
  { label: 'Average Rating', value: '0.0/5.0', change: '0%', up: false },
  { label: 'Excellent Reviews', value: '0', change: '0%', up: false },
  { label: 'Negative Reviews', value: '0', change: '0%', up: true },
];

export default function ReviewsStats() {
  return (
    <div
      className="flex lg:grid lg:grid-cols-4 gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory pb-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {stats.map(({ label, value, change, up }) => (
        <div
          key={label}
          className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-auto bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Star size={16} className="text-slate-400" strokeWidth={1.6} />
            </div>
          </div>
          <div className={`flex items-center gap-1.5 mt-3 text-[11px] font-medium ${up ? 'text-emerald-500' : 'text-red-400'}`}>
            {up ? <TrendingUp size={12} strokeWidth={2} /> : <TrendingDown size={12} strokeWidth={2} />}
            <span>{change} vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
