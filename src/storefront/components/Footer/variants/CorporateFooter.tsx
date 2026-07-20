import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'
import type { StoreSettings } from '../../../types'
import type { StorePage } from '../../../../hooks/useStorefront'

interface Props {
  settings: StoreSettings
  pages: StorePage[]
  path: (p?: string) => string
  socials: { label: string; href: string }[]
  categories: string[]
}

export default function CorporateFooter({
  settings,
  pages,
  path,
  socials,
  categories,
}: Props) {
  const footerText = (settings as any).footer?.footerText || settings.tagline

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-900">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <span className="text-white text-lg font-bold tracking-tight uppercase">
              {settings.storeName}
            </span>
            {footerText && <p className="text-xs leading-relaxed text-stone-500">{footerText}</p>}
            <div className="flex flex-col gap-2.5 text-xs text-stone-500 mt-2">
              {settings.address && (
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-stone-600" />
                  <span>{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} className="shrink-0 text-stone-600" />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings.whatsapp && (
                <div className="flex items-center gap-2">
                  <Mail size={13} className="shrink-0 text-stone-600" />
                  <span>WhatsApp: {settings.whatsapp}</span>
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">Categories</p>
            <div className="flex flex-col gap-2.5 text-xs">
              {categories.slice(0, 5).map(c => (
                <a key={c} href={path(`products?category=${encodeURIComponent(c)}`)} className="hover:text-white transition-colors">
                  {c}
                </a>
              ))}
              <a href={path('products')} className="hover:text-white transition-colors font-medium">Shop All</a>
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">Company</p>
            <div className="flex flex-col gap-2.5 text-xs">
              {pages.map(p => (
                <Link key={p.id} to={path(`pages/${p.slug}`)} className="hover:text-white transition-colors">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Secure & Socials */}
          <div className="flex flex-col gap-5">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">Connect With Us</p>
            {socials.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-stone-900 border border-stone-800 rounded text-[11px] text-stone-300 hover:bg-stone-850 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-600">No social profiles configured.</p>
            )}

            <div className="flex items-center gap-2 border border-stone-900 rounded p-3 bg-stone-950/40">
              <ShieldCheck size={18} className="text-green-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-250 font-bold uppercase tracking-wider leading-none">Secure Storefront</span>
                <span className="text-[9px] text-stone-550 mt-1 leading-none">SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower footer with checkout payment badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-xs text-stone-500">
          <span>&copy; {new Date().getFullYear()} {settings.storeName}. Secure Checkout.</span>
          <div className="flex items-center gap-2 opacity-65">
            {/* Visa */}
            <svg className="w-8 h-5 text-white" fill="currentColor" viewBox="0 0 24 15">
              <rect width="24" height="15" fill="#1A1F71" rx="2" />
              <path fill="#FFF" d="M9 10l-1-5H6l2 5zm6-5h-2l-1 3-1-3H9l2 5h2zm5 5l1-5h-2l-1 3-1-3h-2l2 5z" />
            </svg>
            {/* Mastercard */}
            <svg className="w-8 h-5" viewBox="0 0 24 15">
              <rect width="24" height="15" fill="#3A3A3A" rx="2" />
              <circle cx="10" cy="7.5" r="4.5" fill="#EB001B" />
              <circle cx="14" cy="7.5" r="4.5" fill="#F79E1B" opacity="0.85" />
            </svg>
            {/* Stripe */}
            <svg className="w-8 h-5 text-white" fill="currentColor" viewBox="0 0 24 15">
              <rect width="24" height="15" fill="#6772E5" rx="2" />
              <path d="M10 6.5c0-.6.5-1 1.2-1 .7 0 1.2.3 1.2.7h.8c0-.9-.7-1.4-2-1.4-1.3 0-2 .7-2 1.6 0 1.4 2 1.3 2 1.8 0 .6-.5.9-1.2.9-.8 0-1.4-.3-1.4-.8H7c0 1 .8 1.5 2.2 1.5 1.3 0 2-.7 2-1.6 0-1.4-1.2-1.3-1.2-1.7" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}
