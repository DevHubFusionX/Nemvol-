import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/react'
import { lazy, Suspense, useEffect } from 'react'
import { api } from '../lib/api'
import { useStore } from '../hooks/useStore'
import { StorefrontProvider, useStorefront } from './context/StorefrontProvider'
import { fetchPublicStore, type PublicStoreData } from './lib/publicApi'

const THEME_MAP: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  nubia: lazy(() => import('./templates/nubia/NubiaTemplate')),
  luna:  lazy(() => import('./templates/luna/LunaTemplate')),
  nova:  lazy(() => import('./templates/nova/NovaTemplate')),
  arc:   lazy(() => import('./templates/arc/ArcTemplate')),
}

const DEFAULT_THEME = 'nubia'

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
  const number  = tools?.whatsapp

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

function ThemeRenderer({ theme }: { theme: string }) {
  const Template = THEME_MAP[theme] ?? THEME_MAP[DEFAULT_THEME]

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" />
        </div>
      }
    >
      <AccessGateGuard>
        <Template />
        <WhatsAppButton />
      </AccessGateGuard>
    </Suspense>
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
    queryFn: () => resolveStore(slug!, isSignedIn),
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

  const theme = store.theme ?? DEFAULT_THEME

  return (
    <StorefrontProvider slug={slug!} store={store}>
      {isOwnerPreview && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-amber-500 text-white text-center text-[12px] font-medium py-2">
          Preview mode — toggle &quot;Make it Live&quot; in your dashboard to publish this store.
        </div>
      )}
      <ThemeRenderer theme={theme} />
    </StorefrontProvider>
  )
}
