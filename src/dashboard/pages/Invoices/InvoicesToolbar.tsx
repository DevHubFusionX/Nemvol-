import { Search, CalendarDays } from 'lucide-react';

export type InvoiceFilter = 'all' | 'paid' | 'unpaid' | 'overdue' | 'draft';

interface InvoicesToolbarProps {
  filter: InvoiceFilter;
  onFilter: (f: InvoiceFilter) => void;
}

const filters: { id: InvoiceFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'draft', label: 'Draft' },
  { id: 'unpaid', label: 'Unpaid' },
  { id: 'paid', label: 'Paid' },
  { id: 'overdue', label: 'Overdue' },
];

export default function InvoicesToolbar({ filter, onFilter }: InvoicesToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-xl">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onFilter(id)}
            className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              filter === id
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-1 max-w-xs px-3 py-2 rounded-lg bg-white border border-slate-100">
        <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
        <input
          type="text"
          placeholder="Search by invoice # or customer..."
          className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>

      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 text-[13px] text-slate-500 hover:bg-slate-50 transition-colors ml-auto">
        <CalendarDays size={13} strokeWidth={1.8} />
        Select range
      </button>
    </div>
  );
}
