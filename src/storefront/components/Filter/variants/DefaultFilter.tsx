import { Link } from 'react-router-dom'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

type SortOption = 'featured' | 'price-asc' | 'price-desc'

interface Props {
  activeCategory?: string
  sortBy: SortOption
  onSort: (s: SortOption) => void
}

export default function DefaultFilter({ activeCategory, sortBy, onSort }: Props) {
  const { path } = useStorefrontPaths()
  const [open, setOpen] = useState(false)

  const sortLabel = { featured: 'Featured', 'price-asc': 'Price: Low to High', 'price-desc': 'Price: High to Low' }[sortBy]

  return (
    <div className="border-y border-stone-100 py-4 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center space-x-6 overflow-x-auto pb-2 sm:pb-0">
        {[{ label: 'All', to: path('/products'), key: undefined }, { label: 'Women', to: path('/category/women'), key: 'women' }, { label: 'Men', to: path('/category/men'), key: 'men' }, { label: 'Kids', to: path('/category/kids'), key: 'kids' }].map(cat => (
          <Link key={cat.label} to={cat.to}
            className={`text-[10px] font-bold tracking-widest uppercase transition-colors shrink-0 ${activeCategory === cat.key ? 'text-stone-950 border-b border-stone-950 pb-1' : 'text-stone-400 hover:text-stone-950'}`}
          >{cat.label}</Link>
        ))}
      </div>
      <div className="relative flex items-center justify-end">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-stone-900 hover:text-stone-500 uppercase">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Sort: {sortLabel}
          <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-100 rounded-xl shadow-lg py-2 z-20">
              {(['featured', 'price-asc', 'price-desc'] as SortOption[]).map(opt => (
                <button key={opt} onClick={() => { onSort(opt); setOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-[10px] font-bold tracking-wider uppercase hover:bg-stone-50 transition-colors ${sortBy === opt ? 'text-stone-950' : 'text-stone-400'}`}
                >{{ featured: 'Featured', 'price-asc': 'Price: Low to High', 'price-desc': 'Price: High to Low' }[opt]}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
