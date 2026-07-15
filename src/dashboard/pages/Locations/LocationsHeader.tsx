import { Plus } from 'lucide-react';

export default function LocationsHeader() {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Operational Network
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Business Branches</h1>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm">
          Manage your points of presence and pickup locations. Orchestrate inventory across your physical footprint.
        </p>
      </div>
      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
        <Plus size={14} strokeWidth={2.5} />
        Add New Location
      </button>
    </div>
  );
}
