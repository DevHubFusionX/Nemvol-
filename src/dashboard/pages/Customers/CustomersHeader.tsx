import { Plus, FileSpreadsheet } from 'lucide-react';

interface Props {
  onAddCustomer: () => void;
  onManageCsv: () => void;
}

export default function CustomersHeader({ onAddCustomer, onManageCsv }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Manage your customer base and view analytics
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <button
          onClick={onManageCsv}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <FileSpreadsheet size={13} strokeWidth={1.8} />
          Manage CSV
        </button>
        <button
          onClick={onAddCustomer}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Customer
        </button>
      </div>
    </div>
  );
}
