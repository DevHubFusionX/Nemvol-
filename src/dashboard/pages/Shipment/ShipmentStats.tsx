import { Truck, Activity } from 'lucide-react';

export default function ShipmentStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Coverage areas */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
          <Truck size={17} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Coverage Areas
          </p>
          <p className="text-[15px] font-bold text-slate-900">0 Active Zones</p>
        </div>
      </div>

      {/* Network status */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <Activity size={17} className="text-red-400" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Network Status
          </p>
          <p className="text-[15px] font-bold text-slate-900">System Offline</p>
        </div>
      </div>

      {/* Strategy quote */}
      <div className="bg-slate-900 rounded-xl p-5 flex flex-col justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Strategy
        </p>
        <p className="text-[13px] font-medium text-white leading-relaxed mt-2 italic">
          "Free shipping can increase conversion rates by up to 30%."
        </p>
      </div>
    </div>
  );
}
