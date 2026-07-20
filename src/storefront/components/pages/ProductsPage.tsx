import { useState, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../ProductCard/CardSwitcher'
import MobileFilterDrawer from '../ProductGrid/MobileFilterDrawer'
import EmptyState from '../ui/EmptyState'
import PageTransition from '../ui/PageTransition'
import { useStorefront } from '../useStorefront'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import type { Product } from '../../types'

interface Props {
  products: Product[]
}

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low']
const PAGE_SIZE = 8

export default function ProductsPage({ products }: Props) {
  const { path, settings } = useStorefront()
  const formatPrice = useFormatPrice()
  const [searchParams] = useSearchParams()
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const maxPrice = products.length ? Math.max(...products.map(p => p.price)) : 0
  const categoryFromUrl = searchParams.get('category') ?? 'All'
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [priceMax, setPriceMax] = useState(maxPrice)
  const [sort, setSort] = useState('Newest')
  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filterVariant = (settings as any).filter?.variant || 'default'
  const gridVariant = (settings as any).productGrid?.variant || 'default'
  const categoryVariant = (settings as any).categoryPage?.variant || 'default'

  useEffect(() => {
    setActiveCategory(searchParams.get('category') ?? 'All')
    setPage(1)
  }, [searchParams])

  useEffect(() => {
    setPriceMax(maxPrice)
  }, [maxPrice])

  const filtered = products
    .filter(p => (activeCategory === 'All' || p.category === activeCategory) && p.price <= priceMax)
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price
      if (sort === 'Price: High to Low') return b.price - a.price
      return 0
    })

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24">

        {/* ── CATEGORY BANNER LAYOUT ── */}
        {categoryVariant === 'drole' ? (
          <div className="text-center py-16 mb-12 border-b border-stone-100 max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] text-stone-450 uppercase font-mono mb-3 block">Collection</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-stone-900 tracking-tight mb-4 capitalize">
              {activeCategory === 'All' ? 'All Creations' : activeCategory}
            </h1>
            <p className="text-xs text-stone-400 leading-relaxed font-serif italic max-w-md mx-auto">
              Curated selection crafted with intentional design, premium materials, and unparalleled attention to detail.
            </p>
          </div>
        ) : (
          /* Header */
          <div className="flex items-end justify-between mb-8 border-b border-stone-100 pb-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-stone-450 uppercase mb-1 font-mono">Browse</p>
              <h1 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight capitalize">
                {activeCategory === 'All' ? 'All Products' : activeCategory}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {filterVariant === 'drole' && (
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-stone-200 text-stone-600 text-xs px-3 py-2 hover:border-stone-400 transition-colors"
                >
                  <SlidersHorizontal size={13} strokeWidth={1.5} />
                  Filter
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 hidden sm:block">Sort by</span>
                <select
                  value={sort} onChange={e => setSort(e.target.value)}
                  className="text-xs border border-stone-200 px-3 py-2 text-stone-700 bg-white outline-none"
                >
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── INLINE CHIP FILTERS (DEFAULT FILTER VARIANT) ── */}
        {filterVariant === 'default' && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-stone-100/60 justify-center">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setPage(1) }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 whitespace-nowrap border ${
                  activeCategory === c
                    ? 'bg-stone-900 text-white border-transparent'
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-900 border-stone-200/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {activeCategory !== 'All' && filterVariant === 'drole' && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-stone-500">Filtered by:</span>
            <button
              onClick={() => setActiveCategory('All')}
              className="flex items-center gap-1.5 bg-stone-900 text-white text-xs px-3 py-1.5 hover:bg-stone-700 transition-colors"
            >
              {activeCategory} ×
            </button>
          </div>
        )}

        <div className="flex gap-10">
          {/* ── SIDE + SORT BAR FILTERS (DROLE FILTER VARIANT) ── */}
          {filterVariant === 'drole' && (
            <aside className="hidden lg:flex flex-col gap-6 w-44 shrink-0">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-stone-400 uppercase mb-3 font-mono">Category</p>
                <div className="flex flex-col gap-2">
                  {categories.map(c => (
                    <button
                      key={c} onClick={() => { setActiveCategory(c); setPage(1) }}
                      className={`text-left text-sm transition-colors uppercase tracking-wider text-[11px] font-medium ${
                        activeCategory === c ? 'text-stone-900 font-semibold' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.25em] text-stone-400 uppercase mb-3 font-mono">Price</p>
                <input
                  type="range" min={0} max={maxPrice || 1} value={priceMax}
                  onChange={e => { setPriceMax(Number(e.target.value)); setPage(1) }}
                  className="w-full accent-stone-900"
                />
                <div className="flex justify-between text-xs text-stone-455 mt-1">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(priceMax)}</span>
                </div>
              </div>
            </aside>
          )}

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs text-stone-455">{filtered.length} products</p>
              {categoryVariant === 'drole' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 hidden sm:block">Sort by</span>
                  <select
                    value={sort} onChange={e => setSort(e.target.value)}
                    className="text-xs border border-stone-200 px-3 py-2 text-stone-700 bg-white outline-none"
                  >
                    {sortOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              )}
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No products found"
                message="Try selecting a different category."
                action={{ label: 'Clear filters', href: path('products') }}
              />
            ) : (
              <>
                {/* ── PRODUCT GRID VARIANT LAYOUT ── */}
                {gridVariant === 'masonry' ? (
                  <div className="columns-2 sm:columns-3 xl:columns-4 gap-6 space-y-6">
                    {visible.map((p) => (
                      <div key={p.id} className="break-inside-avoid">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={
                    gridVariant === 'compact'
                      ? "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"
                      : "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                  }>
                    {visible.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                      >
                        <ProductCard product={p} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {hasMore && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="border border-stone-300 text-stone-600 text-xs tracking-[0.2em] uppercase px-8 py-3 hover:border-stone-900 hover:text-stone-900 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onCategory={c => { setActiveCategory(c); setPage(1) }}
        maxPrice={maxPrice}
        priceMax={priceMax}
        onPrice={v => { setPriceMax(v); setPage(1) }}
      />
    </PageTransition>
  )
}
