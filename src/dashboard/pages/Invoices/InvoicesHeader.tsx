import { Plus, Download } from 'lucide-react';

export default function InvoicesHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Create, send and track invoices for your customers
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={13} strokeWidth={1.8} />
          Export
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
          <Plus size={14} strokeWidth={2.5} />
          Create Invoice
        </button>
      </div>
    </div>
  );
}
