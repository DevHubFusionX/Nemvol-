import { Search, Package } from 'lucide-react';

export default function ProductsView() {
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-1 sm:max-w-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
          <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
          <Package size={20} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-[14px] font-semibold text-slate-800">No products yet</p>
        <p className="text-[12px] text-slate-400 text-center max-w-xs">
          Add your first product to start selling on your storefront.
        </p>
      </div>
    </div>
  );
}
