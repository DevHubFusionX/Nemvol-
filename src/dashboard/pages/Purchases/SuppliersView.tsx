import { Building2, Plus, Trash2, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useSuppliers, useDeleteSupplier } from '../../../hooks/usePurchases';

interface Props { onAddSupplier: () => void }

export default function SuppliersView({ onAddSupplier }: Props) {
  const { data: suppliers = [], isLoading } = useSuppliers();
  const { mutate: deleteSupplier } = useDeleteSupplier();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Suppliers</p>
          <p className="text-[12px] text-slate-400 mt-0.5">Manage the suppliers you source inventory from</p>
        </div>
        <button
          onClick={onAddSupplier}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add Supplier
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        </div>
      ) : suppliers.length === 0 ? (
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
            <Plus size={14} strokeWidth={2.5} /> Add Supplier
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {suppliers.map(s => (
            <div key={s.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Building2 size={15} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{s.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {s.email && (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Mail size={10} strokeWidth={1.8} /> {s.email}
                      </span>
                    )}
                    {s.phone && (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Phone size={10} strokeWidth={1.8} /> {s.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (deletingId) return;
                  setDeletingId(s.id);
                  deleteSupplier(s.id, { onSettled: () => setDeletingId(null) });
                }}
                disabled={deletingId === s.id}
                className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {deletingId === s.id
                  ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                  : <Trash2 size={13} strokeWidth={1.8} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
