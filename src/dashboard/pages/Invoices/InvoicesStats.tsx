import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const stats = [
  { label: 'Total Invoices', value: '0', icon: FileText, color: 'text-slate-400' },
  { label: 'Paid', value: '₦0', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Unpaid', value: '₦0', icon: Clock, color: 'text-amber-400' },
  { label: 'Overdue', value: '0', icon: AlertCircle, color: 'text-red-400' },
];

export default function InvoicesStats() {
  return (
    <>
      {/* Mobile — snap scroll */}
      <div className="lg:hidden -mx-4 px-4">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="snap-start shrink-0 w-[72%] bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Icon size={16} className={color} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* Desktop — 4-column grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={17} className={color} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
