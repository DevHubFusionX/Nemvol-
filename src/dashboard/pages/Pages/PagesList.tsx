import { Eye, Pencil } from 'lucide-react';

type PageStatus = 'empty' | 'published' | 'draft';

type StorePage = {
  label: string;
  type: 'System Page' | 'Custom Page';
  status: PageStatus;
};

const systemPages: StorePage[] = [
  { label: 'About Us', type: 'System Page', status: 'empty' },
  { label: 'Refund Policy', type: 'System Page', status: 'empty' },
  { label: 'Terms & Conditions', type: 'System Page', status: 'empty' },
  { label: 'Privacy Policy', type: 'System Page', status: 'empty' },
  { label: 'Contact Us', type: 'System Page', status: 'empty' },
  { label: 'FAQ', type: 'System Page', status: 'empty' },
];

const statusStyles: Record<PageStatus, string> = {
  empty: 'bg-amber-50 text-amber-500',
  published: 'bg-emerald-50 text-emerald-600',
  draft: 'bg-slate-100 text-slate-400',
};

const statusLabel: Record<PageStatus, string> = {
  empty: 'Empty',
  published: 'Published',
  draft: 'Draft',
};

export default function PagesList() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      {/* Column headers */}
      <div className="grid grid-cols-3 px-6 py-3 border-b border-slate-100">
        {['Page Identity', 'Visibility Status', 'Management'].map((col) => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {col}
          </span>
        ))}
      </div>

      {systemPages.map(({ label, type, status }, i) => (
        <div
          key={label}
          className={`grid grid-cols-3 items-center px-6 py-4 ${
            i < systemPages.length - 1 ? 'border-b border-slate-100' : ''
          }`}
        >
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              <Eye size={14} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-800">{label}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
                {type}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[status]}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {statusLabel[status]}
            </span>
          </div>

          {/* Action */}
          <div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors w-fit">
              <Pencil size={12} strokeWidth={1.8} />
              Edit Content
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
