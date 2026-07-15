import { Layers } from 'lucide-react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddCategoryModal from './modals/AddCategoryModal';

export default function CategoriesView() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Stock Levels by Category', sub: 'January – Present' },
          { title: 'Inventory Distribution', sub: 'January – Present' },
        ].map(({ title, sub }) => (
          <div key={title} className="bg-white rounded-xl border border-slate-100 p-5">
            <p className="text-[13px] font-semibold text-slate-800">{title}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
            <div className="mt-6 flex items-center justify-center h-28 border border-dashed border-slate-200 rounded-lg">
              <p className="text-[11px] text-slate-400">No stock data available.</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Product Categories</p>
            <p className="text-[12px] text-slate-400 mt-0.5">Organise products by category for better discovery</p>
          </div>
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors">
            <Plus size={13} strokeWidth={2.5} /> Add Category
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <Layers size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No categories yet</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            Add categories to organise your products and make your store easier to browse.
          </p>
          <button onClick={() => setOpen(true)} className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <Plus size={13} strokeWidth={2.5} /> Add your first category
          </button>
        </div>
      </div>

      <AddCategoryModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
