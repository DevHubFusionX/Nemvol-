import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'

const COLUMNS = [
  { heading: 'Shop', links: [{ label: 'Women', to: '/category/women' }, { label: 'Men', to: '/category/men' }, { label: 'Kids', to: '/category/kids' }, { label: 'Sale', to: '/category/sale' }] },
  { heading: 'Help', links: [{ label: 'Shipping', to: '/shipping' }, { label: 'Returns', to: '/returns' }, { label: 'FAQ', to: '/faq' }, { label: 'Contact', to: '/contact' }] },
  { heading: 'Company', links: [{ label: 'About', to: '/about' }, { label: 'Careers', to: '/careers' }, { label: 'Press', to: '/press' }, { label: 'Privacy', to: '/privacy' }] },
]

export default function CorporateFooter() {
  const { path } = useStorefrontPaths()
  const { footer, colors } = useTemplateState()
  const accent = colors?.primary ?? '#1c1917'

  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200">
          {/* Brand */}
          <div>
            <Link to={path('/')} className="font-serif text-2xl font-bold tracking-tighter text-stone-950 block mb-3">
              N<span className="font-sans text-lg font-light align-super -ml-0.5">S</span>
            </Link>
            {footer?.footerText && (
              <p className="text-[11px] text-stone-500 leading-relaxed max-w-[180px]">{footer.footerText}</p>
            )}
          </div>

          {COLUMNS.map(col => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={path(to)} className="text-[12px] text-stone-600 hover:text-stone-900 transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-stone-400">© {new Date().getFullYear()} NS Store. All rights reserved.</p>
          <div
            className="w-6 h-1 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
    </footer>
  )
}
