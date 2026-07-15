import { Users, ShieldCheck, MapPin } from 'lucide-react';

interface Props {
  total: number;
  admins: number;
  locations: number;
}

export default function StaffsStats({ total, admins, locations }: Props) {
  const stats = [
    { label: 'Total Workforce', value: String(total), icon: Users },
    { label: 'Administrative Access', value: String(admins), icon: ShieldCheck },
    { label: 'Active Locations', value: String(locations), icon: MapPin },
  ];

  return (
    <>
      {/* Mobile — snap scroll */}
      <div className="lg:hidden -mx-4 px-4">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="snap-start shrink-0 w-[72%] bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {label}
                </p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-slate-400" strokeWidth={1.6} />
              </div>
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* Desktop — 3-column grid */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {label}
              </p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-slate-400" strokeWidth={1.6} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
