import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useStorefront } from '../../../context/StorefrontProvider'
import { useTemplateState } from '../../../hooks/useTemplateState'
import { createPublicLead } from '../../../lib/publicApi'
import { toast } from 'sonner'

export default function DroleFooter() {
  const { path } = useStorefrontPaths()
  const { slug } = useStorefront()
  const { footer, colors } = useTemplateState()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const accent = colors?.primary ?? '#1c1917'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !slug) return
    setSubmitting(true)
    try {
      await createPublicLead(slug, { email, source: 'newsletter' })
      toast.success('Subscribed!')
      setEmail('')
    } catch { toast.error('Failed. Try again.') }
    finally { setSubmitting(false) }
  }

  return (
    <footer className="bg-white border-t border-stone-100 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Brand statement */}
        <div className="pb-16 border-b border-stone-100">
          <p className="font-serif text-4xl sm:text-6xl font-light text-stone-950 leading-tight max-w-3xl">
            {footer?.footerText || 'Crafted for those who appreciate the details.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-stone-100">
          <div>
            <Link to={path('/')} className="font-serif text-2xl font-bold tracking-tighter text-stone-950 block mb-4">
              N<span className="font-sans text-lg font-light align-super -ml-0.5">S</span>
            </Link>
          </div>
          {[
            { heading: 'Shop', links: [{ l: 'Women', t: '/category/women' }, { l: 'Men', t: '/category/men' }, { l: 'Kids', t: '/category/kids' }] },
            { heading: 'Help', links: [{ l: 'Shipping', t: '/shipping' }, { l: 'Returns', t: '/returns' }, { l: 'FAQ', t: '/faq' }] },
            { heading: 'Company', links: [{ l: 'About', t: '/about' }, { l: 'Contact', t: '/contact' }, { l: 'Privacy', t: '/privacy' }] },
          ].map(col => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map(({ l, t }) => (
                  <li key={t}><Link to={path(t)} className="text-[12px] text-stone-600 hover:text-stone-900 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <form onSubmit={handleSubscribe} className="flex items-center gap-3 border-b border-stone-300 pb-2 w-full max-w-sm focus-within:border-stone-900 transition-colors">
            <input type="email" placeholder="Subscribe to our newsletter" value={email} onChange={e => setEmail(e.target.value)} disabled={submitting}
              className="flex-1 bg-transparent text-xs text-stone-700 placeholder-stone-400 outline-none" required />
            <button type="submit" disabled={submitting} style={{ color: accent }}><ArrowRight className="w-4 h-4" /></button>
          </form>
          <p className="text-[10px] text-stone-400 shrink-0">© {new Date().getFullYear()} NS Store</p>
        </div>
      </div>
    </footer>
  )
}
