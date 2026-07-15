import { FileStack, Pencil } from 'lucide-react';

export type PageStatus = 'empty' | 'published' | 'draft';

export type StorePage = {
  label: string;
  slug?: string;
  type: 'System Page' | 'Custom Page';
  status: PageStatus;
  content?: string;
};

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

interface Props {
  pages: StorePage[];
  onEdit: (page: StorePage) => void;
}

export default function PagesList({ pages, onEdit }: Props) {
  if (pages.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
          <FileStack size={20} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-[14px] font-semibold text-slate-800">No pages yet</p>
        <p className="text-[12px] text-slate-400 text-center max-w-xs">
          Add a custom page to start building your storefront content.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      {/* Column headers — desktop only */}
      <div className="hidden sm:grid grid-cols-3 px-6 py-3 border-b border-slate-100">
        {['Page Identity', 'Visibility Status', 'Management'].map(col => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {col}
          </span>
        ))}
      </div>

      {pages.map(({ label, type, status, ...rest }, i) => (
        <div key={label}>
          {/* Desktop row */}
          <div
            className={`hidden sm:grid grid-cols-3 items-center px-6 py-4 ${
              i < pages.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                <FileStack size={14} className="text-slate-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{label}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
                  {type}
                </p>
              </div>
            </div>

            <div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[status]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusLabel[status]}
              </span>
            </div>

            <div>
              <button
                onClick={() => onEdit({ label, type, status, ...rest })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors w-fit"
              >
                <Pencil size={12} strokeWidth={1.8} />
                Edit Content
              </button>
            </div>
          </div>

          {/* Mobile card */}
          <div
            className={`sm:hidden px-4 py-4 ${
              i < pages.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <FileStack size={14} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{label}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
                    {type}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[status]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusLabel[status]}
              </span>
            </div>
            <button
              onClick={() => onEdit({ label, type, status, ...rest })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Pencil size={12} strokeWidth={1.8} />
              Edit Content
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
