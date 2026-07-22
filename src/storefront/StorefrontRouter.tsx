import { useParams, useNavigate, Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/react'
import { useEffect } from 'react'
import { api } from '../lib/api'
import { useStore } from '../hooks/useStore'
import { StorefrontProvider, useStorefront } from './context/StorefrontProvider'
import { fetchPublicStore, type PublicStoreData } from './lib/publicApi'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import SummerCarousel from './components/Carousel/SummerCarousel'
import CategoryGrid from './components/Category/CategoryGrid'
import MembershipClub from './components/Membership/MembershipClub'
import Footer from './components/Footer/Footer'
import ProductDetails from './components/Product/ProductDetails'
import ProductsPage from './components/Product/ProductsPage'
import CheckoutPage from './components/Checkout/CheckoutPage'

function AccessGateGuard({ children }: { children: React.ReactNode }) {
  const { tools, accessGranted, slug } = useStorefront()
  const navigate = useNavigate()
  const gate = tools?.toolsConfig?.accessGate

  useEffect(() => {
    if (gate?.enabled && !accessGranted) {
      navigate(`/store/${slug}/login?gate=1`, { replace: true })
    }
  }, [gate?.enabled, accessGranted, slug, navigate])

  if (gate?.enabled && !accessGranted) return null
  return <>{children}</>
}

function WhatsAppButton() {
  const { tools } = useStorefront()
  const enabled = tools?.toolsConfig?.whatsappEnabled
  const number = tools?.whatsapp

  if (!enabled || !number) return null

  const href = `https://wa.me/${number.replace(/\D/g, '')}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

function StorefrontPlaceholder() {
  const { store } = useStorefront()
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-stone-900 tracking-tight">{store?.name}</h1>
        <p className="text-xs text-stone-500 leading-relaxed">
          Our storefront is currently under construction. We are building a brand new shopping experience for you. Please check back soon!
        </p>
      </div>
    </div>
  )
}

async function resolveStore(slug: string, isSignedIn: boolean): Promise<PublicStoreData> {
  try {
    return await fetchPublicStore(slug)
  } catch (err) {
    if (!isSignedIn) throw err
    const res = await api.get('/store')
    if (res.data.slug !== slug) throw new Error('Store not found')
    return {
      ...res.data,
      toolsConfig: res.data.toolsConfig ? JSON.parse(res.data.toolsConfig) : {},
      trackers: res.data.trackers ? JSON.parse(res.data.trackers) : {},
    }
  }
}

export default function StorefrontRouter() {
  const { slug } = useParams<{ slug: string }>()
  const { isSignedIn } = useAuth()
  const { data: ownerStore } = useStore()

  const { data: store, isLoading, isError } = useQuery<PublicStoreData>({
    queryKey: ['public-store', slug, isSignedIn],
    queryFn: () => resolveStore(slug!, isSignedIn ?? false),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
      </div>
    )
  }

  if (isError || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-[14px]">
        Store not found.
      </div>
    )
  }

  const isOwnerPreview = ownerStore?.slug === slug && store.published !== 'true'

  if (store.published !== 'true' && !isOwnerPreview) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-[14px]">
        This store is not yet live.
      </div>
    )
  }

  return (
    <StorefrontProvider slug={slug!} store={store}>
      {isOwnerPreview && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-amber-500 text-white text-center text-[12px] font-medium py-2">
          Preview mode — toggle &quot;Make it Live&quot; in your dashboard to publish this store.
        </div>
      )}
      <AccessGateGuard>
        <div className="min-h-screen bg-stone-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <SummerCarousel />
                    <CategoryGrid />
                    <MembershipClub />
                  </>
                }
              />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/category/:categoryId" element={<ProductsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<StorefrontPlaceholder />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </AccessGateGuard>
    </StorefrontProvider>
  )
}
