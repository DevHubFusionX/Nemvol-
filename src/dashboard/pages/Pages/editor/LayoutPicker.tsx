import { LAYOUT_TEMPLATES, type LayoutTemplate } from './blocks'

interface Props {
  onSelect: (template: LayoutTemplate) => void
}

export default function LayoutPicker({ onSelect }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[15px] font-bold text-slate-900">Choose a layout</p>
        <p className="text-[13px] text-slate-400 mt-0.5">Pick a starting point — you can edit everything after.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LAYOUT_TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className="group text-left p-5 rounded-xl border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all"
          >
            <span className="text-3xl mb-3 block">{t.icon}</span>
            <p className="text-[14px] font-bold text-slate-800 group-hover:text-slate-900">{t.label}</p>
            <p className="text-[12px] text-slate-400 mt-0.5">{t.description}</p>
            <p className="text-[11px] text-slate-300 mt-2">{t.blocks.length} blocks</p>
          </button>
        ))}
      </div>
    </div>
  )
}
