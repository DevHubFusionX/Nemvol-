import { ClipboardList, Clock, Truck } from 'lucide-react';

const stats = [
  { label: 'Total Purchase Orders', value: '0', icon: ClipboardList },
  { label: 'Outstanding Orders', value: '0', icon: Clock },
  { label: 'Completed Orders', value: '0', icon: Truck },
];

export default function PurchasesStats() {
  return (
    <>
      {/* Mobile: snap carousel */}
      <div
        className="flex lg:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="snap-start shrink-0 w-[82%] bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4"
          >
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

      {/* Desktop: grid */}
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
