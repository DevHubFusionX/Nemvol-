import { Upload } from 'lucide-react';

export default function StoreIdentity() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6">
      <p className="text-[14px] font-bold text-slate-900 mb-0.5">Store Identity</p>
      <p className="text-[12px] text-slate-400 mb-5">
        Upload your store logo to build brand recognition across the platform.
      </p>

      <div className="flex items-center gap-5">
        {/* Logo preview */}
        <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
          <span className="text-[11px] text-slate-400">Logo</span>
        </div>

        <div>
          <p className="text-[12px] text-slate-500 mb-2">Product preview</p>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Upload size={12} strokeWidth={1.8} />
            Update Photo
          </button>
        </div>
      </div>
    </div>
  );
}
