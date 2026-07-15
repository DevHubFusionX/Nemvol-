import { Users, ShieldCheck, MapPin } from 'lucide-react';

const stats = [
  { label: 'Total Workforce', value: '0', icon: Users },
  { label: 'Administrative Access', value: '0', icon: ShieldCheck },
  { label: 'Active Locations', value: '0', icon: MapPin },
];

export default function StaffsStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
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
  );
}
