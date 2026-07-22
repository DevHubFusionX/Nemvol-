import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useStorefrontPaths } from '../../hooks/useStorefrontPaths'
import { useStorefront } from '../../context/StorefrontProvider'
import { createPublicLead } from '../../lib/publicApi'
import { toast } from 'sonner'

// Custom Instagram SVG Icon
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.75-.88a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25Z" />
        </svg>
    )
}

// Custom WhatsApp SVG Icon
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83.002-2.623-1.01-5.092-2.855-6.941C16.637 1.986 14.191.975 11.58.975c-5.445 0-9.87 4.414-9.874 9.832-.001 1.977.518 3.911 1.5 5.625L2.164 21.9l5.625-1.473c-1.63.882-3.186 1.32-4.73 1.32-.007 0-.013 0-.02-.001zM17.13 14.3c-.298-.149-1.761-.867-2.03-.966-.271-.099-.467-.149-.662.149-.197.297-.76.966-.931 1.163-.173.199-.344.223-.642.074-1.877-.94-3.101-2.084-3.886-3.433-.207-.356-.02-.549.158-.727.16-.16.344-.4.516-.6.173-.2.23-.33.344-.55.115-.22.057-.412-.028-.561-.086-.15-.76-1.832-1.04-2.516-.279-.672-.56-.58-.76-.59l-.648-.01c-.224 0-.589.084-.897.422-.308.337-1.18 1.153-1.18 2.812 0 1.66 1.208 3.262 1.377 3.487.168.224 2.378 3.63 5.76 5.087.805.347 1.433.554 1.922.71.808.256 1.544.22 2.125.134.648-.096 1.761-.719 2.01-1.414.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
        </svg>
    )
}

// Custom TikTok SVG Icon
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.24-.24V14c0 3.62-2.5 6.96-6.08 7.75-2.9.64-6.08-.43-7.85-2.82-1.92-2.59-1.73-6.52.49-8.9 1.73-1.86 4.39-2.55 6.75-1.85v4.1c-1.42-.48-3.09-.12-4.13.95-1.16 1.19-1.17 3.19-.02 4.41 1.09 1.16 2.93 1.41 4.29.57.94-.58 1.49-1.63 1.48-2.76V.02z" />
        </svg>
    )
}

export default function DefaultFooter() {
    const { path } = useStorefrontPaths()
    const { slug } = useStorefront()
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !slug) return
        setSubmitting(true)
        try {
            await createPublicLead(slug, {
                email,
                source: 'newsletter',
            })
            toast.success('Thank you for subscribing!')
            setEmail('')
        } catch (err) {
            console.error('Failed to subscribe:', err)
            toast.error('Failed to subscribe. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <footer className="bg-[#0f0e0c] text-stone-400 text-xs py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-800/60">
                {/* Left: Monogram Logo */}
                <div className="md:col-span-3 flex flex-col items-start">
                    <Link to={path('/')} className="flex flex-col items-center group">
                        <span className="text-3xl font-serif font-bold tracking-tighter text-white leading-none group-hover:scale-105 transition-transform duration-200">
                            N<span className="font-sans text-xl font-light align-super -ml-0.5">S</span>
                        </span>
                        <span className="text-[8px] tracking-[0.25em] text-stone-500 uppercase font-semibold mt-1">
                            Store
                        </span>
                    </Link>
                </div>

                {/* Second: For Customers */}
                <div className="md:col-span-3">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-stone-200 uppercase mb-4">
                        FOR CUSTOMERS
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to={path('/shipping')} className="hover:text-white transition-colors duration-150">
                                Shipping
                            </Link>
                        </li>
                        <li>
                            <Link to={path('/returns')} className="hover:text-white transition-colors duration-150">
                                Returns
                            </Link>
                        </li>
                        <li>
                            <Link to={path('/faq')} className="hover:text-white transition-colors duration-150">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Third: About Company & Socials */}
                <div className="md:col-span-3">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-stone-200 uppercase mb-4">
                        ABOUT COMPANY
                    </h3>
                    <ul className="space-y-3 mb-6">
                        <li>
                            <Link to={path('/about')} className="hover:text-white transition-colors duration-150">
                                About NS Store
                            </Link>
                        </li>
                        <li>
                            <Link to={path('/contact')} className="hover:text-white transition-colors duration-150">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors duration-150"
                            aria-label="Instagram"
                        >
                            <InstagramIcon className="w-4 h-4" />
                        </a>
                        <a
                            href="https://whatsapp.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors duration-150"
                            aria-label="WhatsApp"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors duration-150"
                            aria-label="TikTok"
                        >
                            <TikTokIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Fourth: Newsletter */}
                <div className="md:col-span-3">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-stone-200 uppercase mb-4">
                        NEWS & STYLE TIPS
                    </h3>
                    <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-stone-700 focus-within:border-white transition-colors duration-150 pb-2 mb-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={submitting}
                            className="bg-transparent border-none outline-none text-white placeholder-stone-600 w-full pr-8 text-xs disabled:opacity-50"
                            required
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="absolute right-0 text-stone-500 hover:text-white transition-colors duration-150 disabled:opacity-50"
                            aria-label="Subscribe"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                    <p className="text-[10px] text-stone-600 leading-relaxed">
                        By subscribing to the newsletter, you agree to the terms of the{' '}
                        <Link to={path('/privacy')} className="underline hover:text-stone-400 transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Language Selector */}
                <button className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-stone-400 hover:text-white transition-colors duration-150">
                    <span>EN</span>
                    <ChevronDown className="w-3 h-3 text-stone-600" />
                </button>

                {/* Copyright */}
                <p className="text-[10px] text-stone-600">
                    NS Store, 2025. All rights reserved
                </p>
            </div>
        </footer>
    )
}
