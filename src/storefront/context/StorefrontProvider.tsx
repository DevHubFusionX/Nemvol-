import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { StoreData } from '../../hooks/useStore'
import type { Product } from '../types'
import type { StorePage } from '../../hooks/useStorefront'
import type { ShippingZone } from '../../hooks/useShipping'
import type { ToolsConfig } from '../../hooks/useTools'
import type { CreateOrderInput } from '../../hooks/useOrders'
import { useCartStore, type CartItem } from '../stores/cartStore'
import { useCheckoutStore, type ShippingAddress, type SelectedShipping, type CheckoutStep } from '../stores/checkoutStore'
import { useSessionStore, type StorefrontCustomer } from '../stores/sessionStore'
import {
  fetchPublicProducts,
  fetchPublicShipping,
  fetchPublicPages,
  fetchPublicPaymentMethods,
  buildToolsConfig,
  createPublicOrder,
  type PublicStoreData,
  type PublicPaymentMethods,
} from '../lib/publicApi'

// ── Context shape — everything a template needs ──────────────────────────────

interface StorefrontContextValue {
  slug: string
  store: StoreData | undefined
  isLoading: boolean

  products: Product[]
  totalProducts: number
  searchProducts: (q: string) => void

  pages: StorePage[]
  getPage: (slug: string) => StorePage | undefined

  shippingZones: ShippingZone[]
  shippingEnabled: boolean

  tools: ToolsConfig | undefined
  paymentMethods: PublicPaymentMethods

  cartItems: CartItem[]
  cartCount: number
  cartSubtotal: number
  addToCart: (item: CartItem) => void
  removeFromCart: (variantId: string) => void
  updateCartItem: (variantId: string, qty: number) => void
  clearCart: () => void

  checkoutStep: CheckoutStep
  checkoutAddress: ShippingAddress | null
  checkoutShipping: SelectedShipping | null
  couponCode: string
  couponDiscount: number
  placedOrderId: string | null
  setCheckoutStep: (step: CheckoutStep) => void
  setCheckoutAddress: (a: ShippingAddress) => void
  setCheckoutShipping: (s: SelectedShipping) => void
  applyCoupon: (code: string, discount: number) => void
  placeOrder: (input: CreateOrderInput) => Promise<void>
  resetCheckout: () => void

  customer: StorefrontCustomer | null
  accessGranted: boolean
  setCustomer: (c: StorefrontCustomer | null) => void
  grantAccess: () => void
  logout: () => void
  registerOrFetchCustomer: (data: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
  }) => Promise<StorefrontCustomer>
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null)

// ── Provider ─────────────────────────────────────────────────────────────────

interface Props {
  children: ReactNode
  slug: string
  store: PublicStoreData
  productFilters?: { category?: string; q?: string }
}

export function StorefrontProvider({ children, slug, store, productFilters }: Props) {
  const [liveStore, setLiveStore] = useState<PublicStoreData>(store)

  useEffect(() => {
    setLiveStore(store)
  }, [store])

  // Listen for Live Preview state updates from parent dashboard Theme Builder window
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'THEME_BUILDER_UPDATE') {
        const themeState = e.data.state
        setLiveStore(prev => ({
          ...prev,
          accentColor: themeState.colors?.primary || prev.accentColor,
          heroData: JSON.stringify(themeState),
        }))
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Dynamic Google Font loading based on selected typography settings
  useEffect(() => {
    if (!liveStore) return
    let parsedHero: any = {}
    try {
      if (liveStore.heroData) parsedHero = JSON.parse(liveStore.heroData)
    } catch {}

    const font = parsedHero.typography?.font || 'Inter'
    const linkId = 'storefront-dynamic-font'
    let link = document.getElementById(linkId) as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`
    document.body.style.fontFamily = `"${font}", sans-serif`
  }, [liveStore])

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['public-products', slug, productFilters],
    queryFn: () => fetchPublicProducts(slug, productFilters),
    enabled: !!slug,
  })

  const { data: shippingData } = useQuery({
    queryKey: ['public-shipping', slug],
    queryFn: () => fetchPublicShipping(slug),
    enabled: !!slug,
  })

  const { data: pages = [] } = useQuery({
    queryKey: ['public-pages', slug],
    queryFn: () => fetchPublicPages(slug),
    enabled: !!slug,
  })

  const { data: paymentMethodsData } = useQuery({
    queryKey: ['public-payment-methods', slug],
    queryFn: () => fetchPublicPaymentMethods(slug),
    enabled: !!slug,
  })

  const tools = useMemo(() => buildToolsConfig(liveStore), [liveStore])

  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const sessionStore = useSessionStore()

  useEffect(() => {
    if (liveStore?.id) cartStore.setStoreId(liveStore.id)
  }, [liveStore?.id])

  useEffect(() => {
    if (!tools?.trackers) return
    const { meta, tiktok, google } = tools.trackers

    if (meta && !document.getElementById('meta-pixel')) {
      const s = document.createElement('script')
      s.id = 'meta-pixel'
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`
      document.head.appendChild(s)
    }

    if (google && !document.getElementById('ga-script')) {
      const s = document.createElement('script')
      s.id = 'ga-script'
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${google}`
      document.head.appendChild(s)
      const s2 = document.createElement('script')
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${google}');`
      document.head.appendChild(s2)
    }

    if (tiktok && !document.getElementById('tiktok-pixel')) {
      const s = document.createElement('script')
      s.id = 'tiktok-pixel'
      s.innerHTML = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktok}');ttq.page();}(window,document,'ttq');`
      document.head.appendChild(s)
    }
  }, [tools?.trackers])

  const placeOrder = async (input: CreateOrderInput) => {
    const data = await createPublicOrder(slug, input as unknown as Record<string, unknown>)
    checkoutStore.setPlacedOrderId(data.id)
    cartStore.clear()
    checkoutStore.setStep('confirmation')
  }

  const registerOrFetchCustomer = async (data: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
  }): Promise<StorefrontCustomer> => {
    const c: StorefrontCustomer = {
      id: data.email ?? data.phone ?? 'guest',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    }
    sessionStore.setCustomer(c)
    return c
  }

  const value: StorefrontContextValue = {
    slug,
    store: liveStore,
    isLoading: productsLoading,

    products: productsData?.data ?? [],
    totalProducts: productsData?.total ?? 0,
    searchProducts: () => { },

    pages,
    getPage: (pageSlug) => pages.find((p) => p.slug === pageSlug),

    shippingZones: shippingData?.zones ?? [],
    shippingEnabled: shippingData?.shippingEnabled ?? false,

    tools,
    paymentMethods: paymentMethodsData ?? {},

    cartItems: cartStore.items,
    cartCount: cartStore.count(),
    cartSubtotal: cartStore.subtotal(),
    addToCart: cartStore.add,
    removeFromCart: cartStore.remove,
    updateCartItem: cartStore.update,
    clearCart: cartStore.clear,

    checkoutStep: checkoutStore.step,
    checkoutAddress: checkoutStore.address,
    checkoutShipping: checkoutStore.shipping,
    couponCode: checkoutStore.couponCode,
    couponDiscount: checkoutStore.couponDiscount,
    placedOrderId: checkoutStore.placedOrderId,
    setCheckoutStep: checkoutStore.setStep,
    setCheckoutAddress: checkoutStore.setAddress,
    setCheckoutShipping: checkoutStore.setShipping,
    applyCoupon: checkoutStore.setCoupon,
    placeOrder,
    resetCheckout: checkoutStore.reset,

    customer: sessionStore.customer,
    accessGranted: sessionStore.accessGranted,
    setCustomer: sessionStore.setCustomer,
    grantAccess: sessionStore.grantAccess,
    logout: sessionStore.logout,
    registerOrFetchCustomer,
  }

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  )
}

export function useStorefront() {
  const ctx = useContext(StorefrontContext)
  if (!ctx) throw new Error('useStorefront must be used inside StorefrontProvider')
  return ctx
}
