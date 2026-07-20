import { motion } from 'framer-motion'
import { useStorefront } from './useStorefront'

const bgPalette = ['bg-stone-200', 'bg-stone-300', 'bg-stone-100', 'bg-stone-200']

export default function CategoryBanner() {
  const { go, products } = useStorefront()

  const categoryMap = products.reduce<Record<string, number>>((acc, p) => {
    const cat = p.category || 'General'
    acc[cat] = (acc[cat] ?? 0) + 1
    return acc
  }, {})

  const categories = Object.entries(categoryMap).map(([label, count], i) => ({
    label,
    sub: `${count} item${count === 1 ? '' : 's'}`,
    bg: bgPalette[i % bgPalette.length],
  }))

  if (categories.length === 0) return null

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-2">Shop by Category</p>
          <h2 className="text-2xl font-light text-stone-900 tracking-tight">Find what you're looking for</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => go(`products?category=${encodeURIComponent(cat.label)}`)}
              className={`${cat.bg} aspect-[4/3] flex flex-col items-start justify-end p-5 text-left group transition-all`}
            >
              <p className="text-sm font-medium text-stone-900 tracking-wide">{cat.label}</p>
              <p className="text-xs text-stone-500 mt-0.5">{cat.sub}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
