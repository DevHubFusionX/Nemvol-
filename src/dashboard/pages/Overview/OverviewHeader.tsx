import { useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { useAddProduct } from '../../modals/AddProductContext';
import InventoryTransferModal from './modals/InventoryTransferModal';
import { useProfile } from '../../../hooks/useProfile';

export default function OverviewHeader() {
  const { openAddProduct } = useAddProduct();
  const [transferOpen, setTransferOpen] = useState(false);
  const { data: profile } = useProfile();
  const userName = profile?.firstName || 'there';

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Welcome back, {userName}</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openAddProduct}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Product
          </button>
          <button
            onClick={() => setTransferOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-colors"
          >
            <ArrowUpRight size={14} strokeWidth={2} />
            <span className="hidden sm:inline">Inventory Transfer</span>
            <span className="sm:hidden">Transfer</span>
          </button>
        </div>
      </div>
      <InventoryTransferModal open={transferOpen} onClose={() => setTransferOpen(false)} />
    </>
  );
}
