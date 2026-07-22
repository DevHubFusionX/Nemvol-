import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'

export default function MinimalFooter() {
  const { path } = useStorefrontPaths()

  return (
    <footer className="bg-white border-t border-stone-100 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-stone-400">© {new Date().getFullYear()} NS Store. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {[
            { label: 'Shipping', to: '/shipping' },
            { label: 'Returns', to: '/returns' },
            { label: 'FAQ', to: '/faq' },
            { label: 'Contact', to: '/contact' },
            { label: 'Privacy', to: '/privacy' },
          ].map(({ label, to }) => (
            <Link key={to} to={path(to)} className="text-[10px] text-stone-400 hover:text-stone-900 transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
