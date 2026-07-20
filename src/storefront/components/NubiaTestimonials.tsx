import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useStorefront } from './useStorefront'
import { fetchPublicReviews } from '../lib/publicApi'

export default function NubiaTestimonials() {
  const { slug } = useStorefront()
  const { data: reviews = [] } = useQuery({
    queryKey: ['public-reviews', slug],
    queryFn: () => fetchPublicReviews(slug),
    enabled: !!slug,
  })

  if (reviews.length === 0) return null

  return (
    <section className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16">
          <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">What people say</span>
          <h2 className="text-3xl font-extralight text-stone-900 tracking-tight mt-3">
            Trusted by customers<br />around the world.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
          {reviews.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="bg-stone-50 px-10 py-12 flex flex-col justify-between gap-10"
            >
              <p className="text-stone-600 text-sm leading-loose">
                &ldquo;{t.comment ?? 'Great product and service.'}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-stone-900">{t.authorName ?? 'Customer'}</p>
                {t.rating && (
                  <p className="text-xs text-stone-400 tracking-wide mt-0.5">{t.rating}/5</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
