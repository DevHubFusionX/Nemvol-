import { useParams } from 'react-router-dom'
import { useStorefront } from '../useStorefront'

export default function StorePage() {
  const { slug } = useParams<{ slug: string }>()
  const { pages, go } = useStorefront()
  const page = pages.find(p => p.slug === slug)

  if (!page) return (
    <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
      <p className="text-stone-400 text-sm">Page not found.</p>
      <button onClick={() => go('')} className="mt-4 text-xs underline text-stone-500">
        Back to home
      </button>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">{page.title}</h1>
      {page.content ? (
        <div
          className="prose prose-stone max-w-none text-stone-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <p className="text-stone-400 text-sm">No content yet.</p>
      )}
    </div>
  )
}
