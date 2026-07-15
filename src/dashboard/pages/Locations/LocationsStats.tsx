import { MapPin, Globe, Layers } from 'lucide-react';

interface Props {
  branches: number;
  hubs: number;
  pickups: number;
}

export default function LocationsStats({ branches, hubs, pickups }: Props) {
  const stats = [
    { label: 'Total Branches', value: String(branches), icon: MapPin, dot: 'bg-slate-400' },
    { label: 'Logistics Hubs', value: String(hubs), icon: Layers, dot: 'bg-purple-400' },
    { label: 'Pickup Points', value: String(pickups), icon: Globe, dot: 'bg-emerald-400' },
  ];

  return (
    <>
      {/* Mobile — snap scroll */}
      <div className="lg:hidden -mx-4 px-4">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {stats.map(({ label, value, icon: Icon, dot }) => (
            <div
              key={label}
              className="snap-start shrink-0 w-[72%] bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-slate-400" strokeWidth={1.5} />
              </div>
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* Desktop — 3-column grid */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, dot }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={17} className="text-slate-400" strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
