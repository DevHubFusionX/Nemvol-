import { FileStack, Pencil } from 'lucide-react'
import type { StorePage } from '../../../hooks/useStorefront'

const statusStyle = (published: string) =>
  published === 'true'
    ? 'bg-emerald-50 text-emerald-600'
    : 'bg-slate-100 text-slate-400'

const statusLabel = (published: string) =>
  published === 'true' ? 'Published' : 'Draft'

interface Props {
  pages: StorePage[]
  onEdit: (page: StorePage) => void
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
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="hidden sm:grid grid-cols-3 px-6 py-3 border-b border-slate-100">
        {['Page Identity', 'Visibility Status', 'Management'].map(col => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
        ))}
      </div>

      {pages.map((page, i) => {
        const type = page.isSystem ? 'System Page' : 'Custom Page'
        const borderClass = i < pages.length - 1 ? 'border-b border-slate-100' : ''

        return (
          <div key={page.id}>
            {/* Desktop row */}
            <div className={`hidden sm:grid grid-cols-3 items-center px-6 py-4 ${borderClass}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <FileStack size={14} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{page.title}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">{type}</p>
                </div>
              </div>

              <div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyle(page.published)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {statusLabel(page.published)}
                </span>
              </div>

              <div>
                <button
                  onClick={() => onEdit(page)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors w-fit"
                >
                  <Pencil size={12} strokeWidth={1.8} />
                  Edit Content
                </button>
              </div>
            </div>

            {/* Mobile card */}
            <div className={`sm:hidden px-4 py-4 ${borderClass}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <FileStack size={14} className="text-slate-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{page.title}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">{type}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyle(page.published)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {statusLabel(page.published)}
                </span>
              </div>
              <button
                onClick={() => onEdit(page)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Pencil size={12} strokeWidth={1.8} />
                Edit Content
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
