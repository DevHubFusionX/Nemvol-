import { MapPin, Globe, Layers } from 'lucide-react';

const stats = [
  { label: 'Total Branches', value: '0', icon: MapPin, dot: 'bg-slate-400' },
  { label: 'Operational Regions', value: '0', icon: Globe, dot: 'bg-emerald-400' },
  { label: 'Logistics Hubs', value: '0', icon: Layers, dot: 'bg-blue-400' },
];

export default function LocationsStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, dot }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {label}
              </p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Icon size={17} className="text-slate-400" strokeWidth={1.5} />
          </div>
        </div>
      ))}
    </div>
  );
}
