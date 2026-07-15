import { Building2, Plus } from 'lucide-react';

interface Props {
  onAddSupplier: () => void;
}

export default function SuppliersView({ onAddSupplier }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[14px] font-semibold text-slate-900">Suppliers</p>
        <p className="text-[12px] text-slate-400 mt-0.5">
          Manage the suppliers you source inventory from
        </p>
      </div>
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
          <Building2 size={20} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-[14px] font-semibold text-slate-800">No suppliers added yet</p>
        <p className="text-[12px] text-slate-400 text-center max-w-xs">
          Add your suppliers to link them to purchase orders and track deliveries.
        </p>
        <button
          onClick={onAddSupplier}
          className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Supplier
        </button>
      </div>
    </div>
  );
}
