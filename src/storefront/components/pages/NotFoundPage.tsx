import { Link } from 'react-router-dom'
import { useStorefront } from '../useStorefront'

export default function NotFoundPage() {
  const { path } = useStorefront()
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 gap-6">
      <p className="text-8xl font-extralight text-stone-200 tracking-tight">404</p>
      <div>
        <h1 className="text-2xl font-light text-stone-900 tracking-tight mb-2">Page not found</h1>
        <p className="text-sm text-stone-400">The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <div className="flex gap-3">
        <Link to={path()} className="bg-stone-900 text-white text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-stone-700 transition-colors">
          Back to Home
        </Link>
        <Link to={path('products')} className="border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase px-8 py-3.5 hover:border-stone-400 transition-colors">
          Browse Products
        </Link>
      </div>
    </div>
  )
}
