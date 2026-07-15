import { useRef, useState } from 'react';
import { Search, CalendarDays } from 'lucide-react';

export type ReviewFilter = 'all' | 'recents' | 'low' | 'high';

interface ReviewsToolbarProps {
  filter: ReviewFilter;
  onFilter: (f: ReviewFilter) => void;
}

const filters: { id: ReviewFilter; label: string }[] = [
  { id: 'all', label: 'All Reviews' },
  { id: 'recents', label: 'Recents' },
  { id: 'low', label: 'Low Ratings' },
  { id: 'high', label: '4–5 Star Ratings' },
];

export default function ReviewsToolbar({ filter, onFilter }: ReviewsToolbarProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('');

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
          placeholder="Search by customer or product..."
          className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
        />
      </div>

      <button
        type="button"
        onClick={() => dateInputRef.current?.showPicker?.() ?? dateInputRef.current?.focus()}
        className="relative flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 text-[13px] text-slate-500 hover:bg-slate-50 transition-colors shrink-0"
      >
        <CalendarDays size={13} strokeWidth={1.8} />
        {date ? new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}
        <input
          ref={dateInputRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        />
      </button>
    </div>
  );
}
