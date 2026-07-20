import { Star, TrendingUp, TrendingDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useReviews } from '../../../hooks/useReviews';

function StarRow({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-amber-400' : 'fill-slate-200'}`}>
          <path d="M6 0l1.5 3.5L11 4l-2.5 2.5.6 3.5L6 8.5 2.9 10l.6-3.5L1 4l3.5-.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsStats() {
  const { data } = useReviews();
  const all = data?.data ?? [];

  const total     = all.length;
  const avgRating = total > 0 ? all.reduce((s, r) => s + parseInt(r.rating), 0) / total : 0;
  const excellent = all.filter(r => parseInt(r.rating) >= 4).length;
  const negative  = all.filter(r => parseInt(r.rating) <= 2).length;

  const stats = [
    { label: 'Total Reviews',     value: String(total),                    icon: Star,       trend: null },
    { label: 'Average Rating',    value: `${avgRating.toFixed(1)} / 5.0`,  icon: Star,       trend: null, isRating: true, avg: avgRating },
    { label: 'Excellent Reviews', value: String(excellent),                 icon: ThumbsUp,   trend: 'up' },
    { label: 'Negative Reviews',  value: String(negative),                  icon: ThumbsDown, trend: 'down' },
  ];

  return (
    <div
      className="flex lg:grid lg:grid-cols-4 gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory pb-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {stats.map(({ label, value, icon: Icon, trend, isRating, avg }) => (
        <div
          key={label}
          className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-auto bg-white rounded-xl border border-slate-100 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
              {isRating && avg > 0 && <StarRow rating={avg} />}
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-slate-400" strokeWidth={1.6} />
            </div>
          </div>
          {trend && (
            <div className={`flex items-center gap-1.5 mt-3 text-[11px] font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-400'}`}>
              {trend === 'up'
                ? <TrendingUp size={12} strokeWidth={2} />
                : <TrendingDown size={12} strokeWidth={2} />}
              <span>vs last month</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
