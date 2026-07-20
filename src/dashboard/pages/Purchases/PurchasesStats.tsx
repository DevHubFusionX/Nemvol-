import { ClipboardList, Clock, Truck } from 'lucide-react';
import { usePurchases } from '../../../hooks/usePurchases';

export default function PurchasesStats() {
  const { data } = usePurchases();
  const all       = data?.data ?? [];
  const pending   = all.filter(p => p.status === 'pending').length;
  const completed = all.filter(p => p.status === 'completed').length;

  const stats = [
    { label: 'Total Purchase Orders', value: String(data?.total ?? 0), icon: ClipboardList },
    { label: 'Outstanding Orders',    value: String(pending),           icon: Clock },
    { label: 'Completed Orders',      value: String(completed),         icon: Truck },
  ];

  return (
    <>
      <div className="flex lg:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-1" style={{ scrollbarWidth: 'none' }}>
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="snap-start shrink-0 w-[82%] bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={17} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={17} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
