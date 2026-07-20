import { Link } from 'react-router-dom'
import type { StoreSettings } from '../../../types'
import type { StorePage } from '../../../../hooks/useStorefront'

interface Props {
  settings: StoreSettings
  pages: StorePage[]
  path: (p?: string) => string
  socials: { label: string; href: string }[]
  email: string
  setEmail: (e: string) => void
  categories: string[]
}

export default function DroleFooter({
  settings,
  pages,
  path,
  socials,
  email,
  setEmail,
  categories,
}: Props) {
  const footerText = (settings as any).footer?.footerText || settings.tagline

  return (
    <footer className="bg-stone-900 text-stone-300 font-serif border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-16 border-b border-stone-800/80">
          {/* Brand block */}
          <div className="lg:col-span-4 flex flex-col gap-6 font-sans">
            <span className="text-white text-3xl font-light tracking-tight font-serif">
              {settings.storeName}<span className="text-stone-400">.</span>
            </span>
            {footerText && (
              <p className="text-xs leading-relaxed text-stone-400 font-sans tracking-wide max-w-sm">
                {footerText}
              </p>
            )}
            <div className="flex flex-col gap-2.5 text-xs text-stone-400 tracking-wide font-sans mt-2">
              {settings.address && <span>{settings.address}</span>}
              {settings.phone && <span>Phone: {settings.phone}</span>}
              {settings.whatsapp && <span>WhatsApp: {settings.whatsapp}</span>}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 flex flex-col gap-4 font-sans">
            <p className="text-white text-[11px] font-bold uppercase tracking-widest">Shop Collection</p>
            <div className="flex flex-col gap-3">
              {categories.length > 0 ? categories.map(l => (
                <a key={l} href={path(`products?category=${encodeURIComponent(l)}`)} className="text-xs text-stone-400 hover:text-white transition-colors duration-200">{l}</a>
              )) : (
                <a href={path('products')} className="text-xs text-stone-400 hover:text-white transition-colors duration-200">All Products</a>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-4 font-sans">
            <p className="text-white text-[11px] font-bold uppercase tracking-widest">Information</p>
            <div className="flex flex-col gap-3">
              {pages.length > 0 ? pages.map(p => (
                <Link key={p.id} to={path(`pages/${p.slug}`)} className="text-xs text-stone-400 hover:text-white transition-colors duration-200">{p.title}</Link>
              )) : (
                <span className="text-xs text-stone-500">No pages yet</span>
              )}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-6 font-sans">
            <p className="text-white text-[11px] font-bold uppercase tracking-widest">Newsletter</p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form
              onSubmit={e => { e.preventDefault(); setEmail('') }}
              className="flex border-b border-stone-700 pb-2"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent py-1 text-xs text-stone-200 placeholder-stone-600 outline-none"
              />
              <button
                type="submit"
                className="px-2 py-1 text-white text-[10px] tracking-[0.2em] uppercase hover:text-stone-400 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 font-sans text-[11px] text-stone-500">
          <span>&copy; {new Date().getFullYear()} {settings.storeName}. Editorial theme.</span>
          {socials.length > 0 && (
            <div className="flex items-center gap-6">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
