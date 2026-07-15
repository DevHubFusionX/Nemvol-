import { TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: 'Total Customers', value: '0', change: '+2.4%' },
  { label: 'Active Customers', value: '0', change: '+1.1%' },
];

export default function CustomersStats() {
  return (
    <div
      className="flex sm:grid sm:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {stats.map(({ label, value, change }) => (
        <div key={label} className="snap-start shrink-0 w-[82%] sm:w-auto bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {label}
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Users size={16} className="text-slate-400" strokeWidth={1.6} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-medium text-emerald-500">
            <TrendingUp size={11} strokeWidth={2} />
            {change} vs last month
          </div>
        </div>
      ))}
    </div>
  );
}
