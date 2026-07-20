import type { Product } from '../types'
import type { StoreData } from '../../hooks/useStore'
import { hasSalePrice } from './formatPrice'

export interface PublicStoreData extends StoreData {
  toolsConfig?: Record<string, unknown>
  trackers?: Record<string, string>
}
import type { Product as DashboardProduct } from '../../hooks/useProducts'
import type { ShippingZone } from '../../hooks/useShipping'
import type { StorePage } from '../../hooks/useStorefront'
import type { ToolsConfig } from '../../hooks/useTools'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export async function fetchPublicStore(slug: string): Promise<PublicStoreData> {
  const res = await fetch(`${API_BASE}/public/store/${slug}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? 'Store not found')
  }
  const raw = await res.json()
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    tagline: raw.tagline,
    logoUrl: raw.logoUrl,
    phone: raw.phone,
    whatsapp: raw.whatsapp,
    address: raw.address,
    country: raw.country,
    state: raw.state,
    currency: raw.currency,
    theme: raw.theme,
    published: raw.published,
    accentColor: raw.accentColor,
    heroData: raw.heroData,
    socialLinks: raw.socialLinks,
    toolsConfig: raw.toolsConfig ?? {},
    trackers: raw.trackers ?? {},
  }
}

export function normalizePublicProduct(p: DashboardProduct & { category?: string }): Product {
  const firstVariant = p.variants?.[0]
  const price = firstVariant ? parseFloat(firstVariant.price) : 0
  const rawCompareAt = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice) : undefined
  const compareAt = hasSalePrice(price, rawCompareAt) ? rawCompareAt : undefined
  const images = (p.media ?? [])
    .sort((a, b) => Number(a.position) - Number(b.position))
    .map((m) => m.url)

  let tagList: string[] = []
  try { tagList = JSON.parse(p.tags ?? '[]') } catch {}

  return {
    ...p,
    sku: firstVariant?.sku ?? null,
    category: typeof p.category === 'string' ? p.category : 'General',
    price,
    compareAt,
    images,
    tagList,
    stock: p.variants?.length ? 99 : 0,
    rating: p.rating ? parseFloat(p.rating) : undefined,
    reviewCount: p.reviewCount ? parseInt(p.reviewCount, 10) : undefined,
  }
}

export async function fetchPublicProducts(
  slug: string,
  filters?: { category?: string; q?: string },
): Promise<{ data: Product[]; total: number }> {
  const params = new URLSearchParams()
  if (filters?.category) params.set('category', filters.category)
  if (filters?.q) params.set('q', filters.q)
  const qs = params.toString()
  const res = await fetch(`${API_BASE}/public/store/${slug}/products${qs ? `?${qs}` : ''}`)
  if (!res.ok) throw new Error('Failed to load products')
  const json = await res.json()
  const rows: (DashboardProduct & { category?: string })[] = json.data ?? []
  const data = rows.map(normalizePublicProduct)
  return { data, total: json.total ?? data.length }
}

export async function fetchPublicShipping(slug: string): Promise<{ zones: ShippingZone[]; shippingEnabled: boolean }> {
  const res = await fetch(`${API_BASE}/public/store/${slug}/shipping`)
  if (!res.ok) return { zones: [], shippingEnabled: false }
  const json = await res.json()
  return { zones: json.zones ?? [], shippingEnabled: json.shippingEnabled ?? false }
}

export async function fetchPublicPages(slug: string): Promise<StorePage[]> {
  const res = await fetch(`${API_BASE}/public/store/${slug}/pages`)
  if (!res.ok) return []
  return res.json()
}

export function buildToolsConfig(store: PublicStoreData): ToolsConfig {
  return {
    whatsapp: store.whatsapp ?? '',
    toolsConfig: (store.toolsConfig ?? {}) as ToolsConfig['toolsConfig'],
    trackers: store.trackers ?? {},
  }
}

export interface PublicPaymentMethods {
  cards?:    { enabled: boolean }
  transfer?: { enabled: boolean; bankName?: string; accountName?: string; accountNumber?: string }
  pod?:      { enabled: boolean }
}

export async function fetchPublicPaymentMethods(slug: string): Promise<PublicPaymentMethods> {
  const res = await fetch(`${API_BASE}/public/store/${slug}/payment-methods`)
  if (!res.ok) return {}
  const json = await res.json()
  return json.methods ?? {}
}

export async function createPublicOrder(
  slug: string,
  body: Record<string, unknown>,
): Promise<{ id: string; orderNumber: string }> {
  const res = await fetch(`${API_BASE}/public/store/${slug}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Order placement failed')
  return res.json()
}

export async function createPublicLead(
  slug: string,
  body: { name?: string; email?: string; phone?: string; source?: string },
): Promise<void> {
  await fetch(`${API_BASE}/public/store/${slug}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export interface PublicReview {
  id: string
  authorName?: string | null
  rating?: string | null
  comment?: string | null
  createdAt?: string | null
}

export async function fetchPublicReviews(slug: string): Promise<PublicReview[]> {
  const res = await fetch(`${API_BASE}/public/store/${slug}/reviews`)
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}
