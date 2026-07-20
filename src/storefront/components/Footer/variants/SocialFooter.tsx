import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import type { StoreSettings } from '../../../types'
import type { StorePage } from '../../../../hooks/useStorefront'

interface Props {
  settings: StoreSettings
  pages: StorePage[]
  path: (p?: string) => string
  socials: { label: string; href: string }[]
}

export default function SocialFooter({
  settings,
  pages,
  path,
  socials,
}: Props) {
  const instagramLink = socials.find(s => s.label === 'Instagram')?.href
  const whatsappLink = socials.find(s => s.label === 'WhatsApp')?.href

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        
        {/* Main call to social action */}
        <h3 className="text-xl md:text-3xl font-light text-white tracking-tight max-w-lg mb-4">
          Connect with us on our social channels for daily updates & drops.
        </h3>
        <p className="text-xs text-stone-500 mb-8 max-w-sm">
          We answer all inquiries, styling advice, and support tickets via direct messages.
        </p>

        {/* Social channels flex */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
          {instagramLink && (
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full py-4 rounded-xl border border-stone-800 hover:border-stone-750 bg-stone-950 flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider text-stone-350 hover:text-white transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
          )}
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full py-4 rounded-xl border border-stone-800 hover:border-stone-750 bg-stone-950 flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider text-stone-350 hover:text-white transition-all shadow-sm"
            >
              <Send size={13} />
              WhatsApp Chat
            </a>
          )}
        </div>

        {/* Footer directories */}
        <div className="w-full border-t border-stone-800/60 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to={path()} className="font-bold text-stone-400 hover:text-white transition-colors">{settings.storeName}</Link>
            <Link to={path('products')} className="hover:text-stone-300 transition-colors">Products</Link>
            {pages.map(p => (
              <Link key={p.id} to={path(`pages/${p.slug}`)} className="hover:text-stone-300 transition-colors">
                {p.title}
              </Link>
            ))}
          </div>

          <span>&copy; {new Date().getFullYear()} {settings.storeName}. Social media store.</span>
        </div>
      </div>
    </footer>
  )
}
