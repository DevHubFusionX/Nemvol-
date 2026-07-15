import { RefreshCw, Plus } from 'lucide-react';

export default function PaymentsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Manage payment methods and track transactions
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <RefreshCw size={13} strokeWidth={1.8} />
          Refresh
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
          <Plus size={14} strokeWidth={2.5} />
          Set Payment Method
        </button>
      </div>
    </div>
  );
}
