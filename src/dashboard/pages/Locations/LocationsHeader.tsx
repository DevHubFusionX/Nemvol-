import { Plus } from 'lucide-react';

interface Props {
  onAdd: () => void;
}

export default function LocationsHeader({ onAdd }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Operational Network
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Business Branches</h1>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm">
          Manage your points of presence and pickup locations. Orchestrate inventory across your physical footprint.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors self-start sm:self-auto shrink-0"
      >
        <Plus size={14} strokeWidth={2.5} />
        Add New Location
      </button>
    </div>
  );
}
