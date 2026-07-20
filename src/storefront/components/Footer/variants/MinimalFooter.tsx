import { Link } from 'react-router-dom'
import type { StoreSettings } from '../../../types'
import type { StorePage } from '../../../../hooks/useStorefront'

interface Props {
  settings: StoreSettings
  pages: StorePage[]
  path: (p?: string) => string
  socials: { label: string; href: string }[]
}

export default function MinimalFooter({
  settings,
  pages,
  path,
  socials,
}: Props) {
  return (
    <footer className="bg-stone-50 text-stone-500 border-t border-stone-200/50 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand name */}
        <Link to={path()} className="text-stone-900 font-bold tracking-tight text-sm">
          {settings.storeName}<span className="text-stone-400">.</span>
        </Link>

        {/* Center: Simple inline links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <Link to={path('products')} className="hover:text-stone-900 transition-colors">Products</Link>
          {pages.map(p => (
            <Link key={p.id} to={path(`pages/${p.slug}`)} className="hover:text-stone-900 transition-colors">
              {p.title}
            </Link>
          ))}
        </div>

        {/* Right: Copyright and simple social text links */}
        <div className="flex items-center gap-6 text-[11px] text-stone-450">
          <span>&copy; {new Date().getFullYear()}</span>
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
