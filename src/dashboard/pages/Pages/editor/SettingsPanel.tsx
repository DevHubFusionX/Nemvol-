import { Globe, FileText, Trash2 } from 'lucide-react'

interface Props {
  title: string
  slug: string
  published: string
  isEdit: boolean
  isSystem: boolean
  onTitleChange: (v: string) => void
  onSlugChange: (v: string) => void
  onPublishedChange: (v: string) => void
  onDelete?: () => void
}

export default function SettingsPanel({
  title, slug, published, isEdit, isSystem,
  onTitleChange, onSlugChange, onPublishedChange, onDelete,
}: Props) {
  return (
    <div className="space-y-5">

      {/* Page identity */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <FileText size={11} /> Page Details
        </p>
        <div>
          <label className="block text-[11px] text-slate-500 mb-1">Title</label>
          <input
            value={title}
            onChange={e => {
              onTitleChange(e.target.value)
              if (!isEdit) {
                onSlugChange(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
              }
            }}
            disabled={isSystem}
            placeholder="Page title"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-800 focus:outline-none focus:border-slate-400 transition-colors disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
        <div>
          <label className="block text-[11px] text-slate-500 mb-1">Slug</label>
          <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden focus-within:border-slate-400 transition-colors">
            <span className="px-2.5 py-2 text-[11px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">/pages/</span>
            <input
              value={slug}
              onChange={e => onSlugChange(e.target.value)}
              disabled={isSystem}
              placeholder="page-slug"
              className="flex-1 px-2.5 py-2 text-[12px] text-slate-700 bg-white outline-none disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Visibility */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Globe size={11} /> Visibility
        </p>
        <div className="flex gap-2">
          {[
            { val: 'false', label: 'Draft' },
            { val: 'true',  label: 'Published' },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => onPublishedChange(val)}
              className={`flex-1 py-2 rounded-lg text-[12px] font-semibold border-2 transition-colors ${
                published === val
                  ? val === 'true' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {published === 'true' && (
          <p className="text-[11px] text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Visible on your storefront navbar
          </p>
        )}
      </div>

      {/* Danger zone */}
      {isEdit && !isSystem && onDelete && (
        <div className="bg-white rounded-xl border border-red-100 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-red-400 mb-3">Danger Zone</p>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-[12px] font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={13} strokeWidth={1.8} />
            Delete this page permanently
          </button>
        </div>
      )}
    </div>
  )
}
