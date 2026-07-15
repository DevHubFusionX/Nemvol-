import { Plus, FileSpreadsheet } from 'lucide-react';

export default function CustomersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Manage your customer base and view analytics
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <FileSpreadsheet size={13} strokeWidth={1.8} />
          Manage CSV
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
          <Plus size={14} strokeWidth={2.5} />
          Add Customer
        </button>
      </div>
    </div>
  );
}
