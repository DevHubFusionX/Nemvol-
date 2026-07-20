import { Search } from 'lucide-react'

export type InvoiceFilter = 'all' | 'paid' | 'unpaid' | 'overdue' | 'draft'

interface InvoicesToolbarProps {
  filter: InvoiceFilter
  onFilter: (f: InvoiceFilter) => void
  q: string
  onSearch: (v: string) => void
}

const filters: { id: InvoiceFilter; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'draft',   label: 'Draft' },
  { id: 'unpaid',  label: 'Unpaid' },
  { id: 'paid',    label: 'Paid' },
  { id: 'overdue', label: 'Overdue' },
]

export default function InvoicesToolbar({ filter, onFilter, q, onSearch }: InvoicesToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div
        className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-xl overflow-x-auto shrink-0"
        style={{ scrollbarWidth: 'none' }}
      >
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onFilter(id)}
            className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-colors whitespace-nowrap ${
              filter === id
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg bg-white border border-slate-100">
        <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
        <input
          type="text"
          value={q}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search by invoice # or customer…"
          className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
        />
      </div>
    </div>
  )
}
