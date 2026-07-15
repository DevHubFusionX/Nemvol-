import { Plus, Download } from 'lucide-react';

interface Props {
  onCreate: () => void;
  onExport: () => void;
}

export default function InvoicesHeader({ onCreate, onExport }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Invoices</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Create, send and track invoices for your customers
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Download size={13} strokeWidth={1.8} />
          Export
        </button>
        <button
          onClick={onCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span className="hidden sm:inline">Create Invoice</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>
    </div>
  );
}
