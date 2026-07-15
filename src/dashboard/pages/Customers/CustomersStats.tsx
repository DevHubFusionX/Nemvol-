import { TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Customers', value: '0', change: '+2.4%' },
  { label: 'Active Customers', value: '0', change: '+1.1%' },
];

export default function CustomersStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map(({ label, value, change }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
            {label}
          </p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-medium text-emerald-500">
            <TrendingUp size={11} strokeWidth={2} />
            {change} vs last month
          </div>
        </div>
      ))}
    </div>
  );
}
