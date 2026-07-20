import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStorefront } from '../useStorefront'
import { useThemeConfig } from '../../hooks/useThemeConfig'
import type { StoreSettings } from '../../types'

// Import footer style variants
import DroleFooter from './variants/DroleFooter'
import MinimalFooter from './variants/MinimalFooter'
import CorporateFooter from './variants/CorporateFooter'
import SocialFooter from './variants/SocialFooter'

interface Props {
  settings: StoreSettings
}

export default function FooterSwitcher({ settings }: Props) {
  const { products, path, pages } = useStorefront()
  const { getVariant } = useThemeConfig()
  const [email, setEmail] = useState('')

  const categories = Array.from(new Set(products.map(p => p.category))).slice(0, 5)

  const socials = [
    settings.instagram && {
      label: 'Instagram',
      href: settings.instagram.startsWith('http')
        ? settings.instagram
        : `https://instagram.com/${settings.instagram.replace('@', '')}`,
    },
    settings.whatsapp && {
      label: 'WhatsApp',
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
    },
  ].filter(Boolean) as { label: string; href: string }[]

  const variant = getVariant('footer')

  // Render variant layout
  if (variant === 'drole') {
    return (
      <DroleFooter
        settings={settings}
        pages={pages}
        path={path}
        socials={socials}
        email={email}
        setEmail={setEmail}
        categories={categories}
      />
    )
  }

  if (variant === 'minimal') {
    return (
      <MinimalFooter
        settings={settings}
        pages={pages}
        path={path}
        socials={socials}
      />
    )
  }

  if (variant === 'corporate') {
    return (
      <CorporateFooter
        settings={settings}
        pages={pages}
        path={path}
        socials={socials}
        categories={categories}
      />
    )
  }

  if (variant === 'social') {
    return (
      <SocialFooter
        settings={settings}
        pages={pages}
        path={path}
        socials={socials}
      />
    )
  }

  // default footer
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        <div className="flex flex-col gap-5">
          <span className="text-white text-2xl font-bold tracking-tight">
            {settings.storeName}<span className="text-violet-500">.</span>
          </span>
          {(settings as any).footer?.footerText ? (
            <p className="text-sm leading-relaxed text-stone-500">{(settings as any).footer.footerText}</p>
          ) : settings.tagline ? (
            <p className="text-sm leading-relaxed text-stone-500 italic">{settings.tagline}</p>
          ) : null}
          <div className="flex flex-col gap-3 text-sm mt-2">
            {settings.address && (
              <div className="flex items-start gap-2.5">
                <MapPin size={13} strokeWidth={1.5} className="mt-0.5 shrink-0 text-stone-600" />
                <span>{settings.address}{settings.country ? `, ${settings.country}` : ''}</span>
              </div>
            )}
            {settings.phone && (
              <div className="flex items-center gap-2.5">
                <Phone size={13} strokeWidth={1.5} className="shrink-0 text-stone-600" />
                <span>{settings.phone}</span>
              </div>
            )}
            {settings.whatsapp && (
              <div className="flex items-center gap-2.5">
                <Mail size={13} strokeWidth={1.5} className="shrink-0 text-stone-600" />
                <span>WhatsApp: {settings.whatsapp}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-white text-sm font-semibold mb-2">Shop</p>
          {categories.length > 0 ? categories.map(l => (
            <a key={l} href={path(`products?category=${encodeURIComponent(l)}`)} className="text-sm text-stone-500 hover:text-white transition-colors duration-200">{l}</a>
          )) : (
            <a href={path('products')} className="text-sm text-stone-500 hover:text-white transition-colors duration-200">All Products</a>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-white text-sm font-semibold mb-2">Information</p>
          {pages.length > 0 ? pages.map(p => (
            <Link key={p.id} to={path(`pages/${p.slug}`)} className="text-sm text-stone-500 hover:text-white transition-colors duration-200">{p.title}</Link>
          )) : (
            <span className="text-sm text-stone-500">No pages yet</span>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-white text-sm font-semibold">Join Our Newsletter</p>
          <p className="text-sm text-stone-500 leading-relaxed">
            Get email updates about our latest drops and special offers.
          </p>
          <form
            onSubmit={e => { e.preventDefault(); setEmail('') }}
            className="flex border border-stone-700"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your e-mail"
              className="flex-1 bg-transparent px-4 py-2.5 text-xs text-stone-300 placeholder-stone-600 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-800 text-white text-[10px] tracking-[0.15em] uppercase hover:bg-stone-700 transition-colors"
            >
              Subscribe
            </button>
          </form>

          {socials.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="px-3 py-1.5 rounded-full bg-stone-800 text-stone-400 text-[10px] hover:bg-violet-500 hover:text-white transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <span>&copy; {new Date().getFullYear()} {settings.storeName}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}
