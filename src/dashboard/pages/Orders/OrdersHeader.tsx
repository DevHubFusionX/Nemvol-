import { Download, Plus } from 'lucide-react';

interface Props {
  onCreateOrder: () => void;
}

export default function OrdersHeader({ onCreateOrder }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Manage and track all your customer orders
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={13} strokeWidth={1.8} />
          Export
        </button>
        <button
          onClick={onCreateOrder}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          Create Order
        </button>
      </div>
    </div>
  );
}
