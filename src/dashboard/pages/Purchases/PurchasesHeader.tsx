import { Plus } from 'lucide-react';

interface Props {
  onAddPurchase: () => void;
}

export default function PurchasesHeader({ onAddPurchase }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Purchase Management</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Track purchase orders and manage suppliers in one place
        </p>
      </div>
      <button
        onClick={onAddPurchase}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors self-start sm:self-auto shrink-0"
      >
        <Plus size={14} strokeWidth={2.5} />
        Add Purchase
      </button>
    </div>
  );
}
