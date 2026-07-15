import { TrendingUp, TrendingDown } from 'lucide-react';
import { Banknote, Clock, CheckCircle, XCircle } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '₦0', icon: Banknote, change: '+0%', up: true },
  { label: 'Pending Payouts', value: '₦0', icon: Clock, change: '+0%', up: false },
  { label: 'Completed Payouts', value: '₦0', icon: CheckCircle, change: '+0%', up: true },
  { label: 'Failed Transactions', value: '0', icon: XCircle, change: '0%', up: true },
];

export default function PaymentsStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, change, up }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
              <Icon size={16} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <span className={`flex items-center gap-0.5 text-[11px] font-medium ${up ? 'text-emerald-500' : 'text-red-400'}`}>
              {up ? <TrendingUp size={11} strokeWidth={2} /> : <TrendingDown size={11} strokeWidth={2} />}
              {change}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-1">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
}
