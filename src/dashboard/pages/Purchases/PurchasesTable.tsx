import { ClipboardX, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { usePurchases, useUpdatePurchaseStatus, useDeletePurchase } from '../../../hooks/usePurchases';

const cols = ['Purchase ID', 'Supplier', 'Date', 'Total', 'Status', 'Action'];

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-50 text-amber-500',
  completed: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-red-50 text-red-500',
};

const NEXT_STATUS: Record<string, string> = {
  pending: 'completed',
};

interface Props { filter: string; search: string }

export default function PurchasesTable({ filter, search }: Props) {
  const { data, isLoading } = usePurchases(filter, search);
  const { mutate: updateStatus } = useUpdatePurchaseStatus();
  const { mutate: deletePurchase } = useDeletePurchase();
  const purchases = data?.data ?? [];
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) return (
    <div className="bg-white rounded-xl border border-slate-100 flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="hidden sm:grid grid-cols-6 px-5 py-3 border-b border-slate-100">
        {cols.map(col => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
        ))}
      </div>

      {purchases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <ClipboardX size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No purchases recorded yet</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            Keep track of inventory coming into your store by logging your first purchase.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {purchases.map(p => (
            <div key={p.id} className="hidden sm:grid grid-cols-6 items-center px-5 py-4">
              <span className="text-[12px] font-mono text-slate-500">{p.id.slice(0, 8)}…</span>
              <span className="text-[13px] text-slate-700">{p.supplier?.name ?? '—'}</span>
              <span className="text-[12px] text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</span>
              <span className="text-[13px] font-semibold text-slate-800">₦{parseFloat(p.total).toLocaleString()}</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit ${STATUS_STYLES[p.status] ?? 'bg-slate-100 text-slate-400'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {p.status}
              </span>
              <div className="flex items-center gap-2">
                {NEXT_STATUS[p.status] && (
                  <button
                    onClick={() => updateStatus({ id: p.id, status: NEXT_STATUS[p.status] })}
                    className="text-[12px] font-medium text-emerald-600 hover:underline"
                  >
                    Mark {NEXT_STATUS[p.status]}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (deletingId) return;
                    setDeletingId(p.id);
                    deletePurchase(p.id, { onSettled: () => setDeletingId(null) });
                  }}
                  disabled={deletingId === p.id}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {deletingId === p.id
                    ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                    : <Trash2 size={13} strokeWidth={1.8} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
