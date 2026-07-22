import { Link } from 'react-router-dom'
import { useStorefrontPaths } from '../../../hooks/useStorefrontPaths'
import { useTemplateState } from '../../../hooks/useTemplateState'

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
      className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors"
    >
      {children}
    </a>
  )
}

export default function SocialFooter() {
  const { path } = useStorefrontPaths()
  const { colors } = useTemplateState()
  const accent = colors?.primary ?? '#1c1917'

  return (
    <footer className="bg-white border-t border-stone-100 py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto space-y-10">
        <Link to={path('/')} className="font-serif text-3xl font-bold tracking-tighter text-stone-950 inline-block">
          N<span className="font-sans text-xl font-light align-super -ml-0.5">S</span>
        </Link>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4">
          <SocialIcon href="https://instagram.com" label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.75-.88a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25Z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://tiktok.com" label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72V14c0 3.62-2.5 6.96-6.08 7.75-2.9.64-6.08-.43-7.85-2.82-1.92-2.59-1.73-6.52.49-8.9 1.73-1.86 4.39-2.55 6.75-1.85v4.1c-1.42-.48-3.09-.12-4.13.95-1.16 1.19-1.17 3.19-.02 4.41 1.09 1.16 2.93 1.41 4.29.57.94-.58 1.49-1.63 1.48-2.76V.02z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://whatsapp.com" label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.16 5.335 5.495 0 12.05 0c3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L0 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </SocialIcon>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[{ l: 'Shop', t: '/products' }, { l: 'About', t: '/about' }, { l: 'Contact', t: '/contact' }, { l: 'FAQ', t: '/faq' }, { l: 'Privacy', t: '/privacy' }].map(({ l, t }) => (
            <Link key={t} to={path(t)} className="text-[11px] text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest font-bold">{l}</Link>
          ))}
        </div>

        <div className="w-8 h-0.5 mx-auto rounded-full" style={{ backgroundColor: accent }} />
        <p className="text-[10px] text-stone-400">© {new Date().getFullYear()} NS Store. All rights reserved.</p>
      </div>
    </footer>
  )
}
