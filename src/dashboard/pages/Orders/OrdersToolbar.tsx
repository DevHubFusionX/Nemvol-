import { Search, CalendarDays } from 'lucide-react';

type Filter = 'all' | 'paid' | 'unpaid';

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
  search: string;
  onSearch: (v: string) => void;
}

const filters: { id: Filter; label: string }[] = [
  { id: 'all',    label: 'All Orders' },
  { id: 'paid',   label: 'Paid'       },
  { id: 'unpaid', label: 'Unpaid'     },
];

export default function OrdersToolbar({ filter, onFilter, search, onSearch }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Filter pills */}
      <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-xl overflow-x-auto shrink-0" style={{ scrollbarWidth: 'none' }}>
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

      {/* Search */}
      <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg bg-white border border-slate-100">
        <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search by order ID or customer..."
          className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
        />
      </div>

      {/* Date range — placeholder */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 text-[13px] text-slate-500 hover:bg-slate-50 transition-colors shrink-0">
        <CalendarDays size={13} strokeWidth={1.8} />
        Select range
      </button>
    </div>
  );
}
