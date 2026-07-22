import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useStorefront } from '../../context/StorefrontProvider'
import Filter from '../Filter/Filter'
import ProductGrid from '../ProductGrid/ProductGrid'

type SortOption = 'featured' | 'price-asc' | 'price-desc'

export default function ProductsPage() {
  const { categoryId } = useParams<{ categoryId?: string }>()
  const { products } = useStorefront()
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const activeCategory = categoryId?.toLowerCase()

  const sortedProducts = useMemo(() => {
    const filtered = activeCategory
      ? products.filter(p => p.category?.toLowerCase() === activeCategory || p.categoryId?.toLowerCase() === activeCategory)
      : products

    const items = [...filtered]
    if (sortBy === 'price-asc') return items.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return items.sort((a, b) => b.price - a.price)
    return items
  }, [products, activeCategory, sortBy])

  const title = activeCategory
    ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
    : 'All Products'

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-stone-950 uppercase font-light">{title}</h1>
        <p className="text-stone-400 text-[10px] tracking-widest uppercase mt-2">
          {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
        </p>
      </div>

      <Filter activeCategory={activeCategory} sortBy={sortBy} onSort={setSortBy} total={sortedProducts.length} />

      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-stone-400 text-xs uppercase tracking-widest">No products found in this category.</p>
        </div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </div>
  )
}
