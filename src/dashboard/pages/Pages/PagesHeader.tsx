import { Plus } from 'lucide-react';

export default function PagesHeader() {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Store Management
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Storefront Pages</h1>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm">
          Design and manage your store's digital layout. Customise content and landing pages to drive engagement.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
          <Plus size={14} strokeWidth={2.5} />
          Add New Page
        </button>
      </div>
    </div>
  );
}
