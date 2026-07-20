import { useState } from 'react'
import type { Product } from '../../types'

interface Props {
  product: Product
}

const tabs = ['Description', 'Additional Info', 'Reviews (12)', 'Directions']

export default function ProductTabs({ product }: Props) {
  const [active, setActive] = useState('Description')

  return (
    <div className="border-t border-stone-100 pt-10">
      {/* Tab headers */}
      <div className="flex gap-8 border-b border-stone-100 mb-8">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`pb-3 text-sm transition-colors ${
              active === t
                ? 'text-stone-900 border-b-2 border-stone-900 -mb-px'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="text-sm text-stone-500 leading-loose max-w-2xl">
        {active === 'Description' && (
          <p>{product.description || 'No description available for this product.'}</p>
        )}
        {active === 'Additional Info' && (
          <p className="text-stone-400 italic">No additional information available.</p>
        )}
        {active === 'Reviews (12)' && (
          <p className="text-stone-400 italic">Reviews coming soon.</p>
        )}
        {active === 'Directions' && (
          <p>Machine wash cold. Tumble dry low. Do not bleach. Iron on low heat.</p>
        )}
      </div>
    </div>
  )
}
