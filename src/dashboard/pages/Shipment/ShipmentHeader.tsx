import { Plus } from 'lucide-react';

interface Props {
  onAddZone: () => void;
}

export default function ShipmentHeader({ onAddZone }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Shipping Logistics</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Orchestrate your product deliveries and regional fees.
        </p>
      </div>
      <button
        onClick={onAddZone}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors shrink-0 self-start sm:self-auto"
      >
        <Plus size={14} strokeWidth={2.5} />
        Add New Zone
      </button>
    </div>
  );
}
