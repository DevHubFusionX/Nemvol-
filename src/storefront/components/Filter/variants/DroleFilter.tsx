import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

type SortOption = 'featured' | 'price-asc' | 'price-desc'

interface Props {
  activeCategory?: string
  sortBy: SortOption
  onSort: (s: SortOption) => void
  total: number
}

export default function DroleFilter({ activeCategory, sortBy, onSort, total }: Props) {
  const { path } = useStorefrontPaths()
  const [open, setOpen] = useState(false)

  const categories = [
    { label: 'All', to: path('/products'), key: undefined },
    { label: 'Women', to: path('/category/women'), key: 'women' },
    { label: 'Men', to: path('/category/men'), key: 'men' },
    { label: 'Kids', to: path('/category/kids'), key: 'kids' },
  ]

  const sortLabel = { featured: 'Featured', 'price-asc': 'Price: Low → High', 'price-desc': 'Price: High → Low' }[sortBy]

  return (
    <div className="flex gap-8 mb-10">
      {/* Left sidebar */}
      <aside className="w-44 shrink-0 hidden md:block">
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-4">Category</p>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat.label}>
              <Link to={cat.to}
                className={`flex items-center gap-2.5 text-[12px] transition-colors ${activeCategory === cat.key ? 'text-stone-950 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
              >
                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${activeCategory === cat.key ? 'border-stone-950 bg-stone-950' : 'border-stone-300'}`}>
                  {activeCategory === cat.key && <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right: sort bar + count */}
      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
          <p className="text-[11px] text-stone-400">{total} {total === 1 ? 'product' : 'products'}</p>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-stone-700 hover:text-stone-500">
              {sortLabel} <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>
            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-100 rounded-xl shadow-lg py-2 z-20">
                  {(['featured', 'price-asc', 'price-desc'] as SortOption[]).map(opt => (
                    <button key={opt} onClick={() => { onSort(opt); setOpen(false) }}
                      className={`w-full text-left px-4 py-2 text-[11px] hover:bg-stone-50 transition-colors ${sortBy === opt ? 'font-bold text-stone-950' : 'text-stone-500'}`}
                    >{{ featured: 'Featured', 'price-asc': 'Price: Low → High', 'price-desc': 'Price: High → Low' }[opt]}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
