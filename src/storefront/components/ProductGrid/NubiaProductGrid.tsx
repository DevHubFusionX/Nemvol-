import type { Product } from '../../types'
import PerksBar from './PerksBar'
import CardSwitcher from '../ProductCard/CardSwitcher'

interface Props {
  products: Product[]
}

export default function NubiaProductGrid({ products }: Props) {
  return (
    <section id="products" className="bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <PerksBar />

        {/* Section heading */}
        <div className="text-center py-14">
          <h2 className="text-3xl font-semibold text-stone-900 tracking-tight">New Arrival</h2>
          <span className="block w-10 h-px bg-stone-900 mx-auto mt-3 mb-4" />
          <p className="text-sm text-stone-400 tracking-wide">Minimal. Intentional. Yours.</p>
        </div>

        {/* 5-column grid, wraps to 2 rows for 12 products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-14">
          {products.map((p) => (
            <CardSwitcher key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
