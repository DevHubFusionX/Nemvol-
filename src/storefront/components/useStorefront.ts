/**
 * Shared useStorefront hook for all storefront components.
 *
 * This replaces the old per-template bridge context. All shared components
 * import from here instead of from a template-specific context.
 */
import { useStorefront as useRealStorefront } from '../context/StorefrontProvider'
import { useStorefrontPaths } from '../hooks/useStorefrontPaths'
import type { Product, PublicPaymentMethods } from '../types'

function parseInstagram(socialLinks: string | undefined): string | null {
  if (!socialLinks) return null
  try {
    const parsed = JSON.parse(socialLinks)
    return parsed.instagram ?? null
  } catch {
    return null
  }
}

function parseHeroData(heroData: string | undefined | null) {
  if (!heroData) return {}
  try {
    return JSON.parse(heroData)
  } catch {
    return {}
  }
}

export function useStorefront() {
  const ctx = useRealStorefront()
  const { path, go } = useStorefrontPaths()
  return {
    slug: ctx.slug,
    path,
    go,
    pages: ctx.pages,
    tools: ctx.tools,
    customer: ctx.customer,
    setCustomer: ctx.setCustomer,
    grantAccess: ctx.grantAccess,
    logout: ctx.logout,
    settings: ctx.store ? {
      storeId: ctx.store.id,
      storeName: ctx.store.name ?? '',
      tagline: ctx.store.tagline ?? '',
      template: (ctx.store.theme ?? 'nubia') as 'nubia' | 'luna' | 'nova' | 'arc',
      accentColor: ctx.store.accentColor ?? '#a8956a',
      logoUrl: ctx.store.logoUrl ?? null,
      currency: ctx.store.currency ?? 'NGN',
      whatsapp: ctx.store.whatsapp ?? null,
      instagram: parseInstagram(ctx.store.socialLinks),
      phone: ctx.store.phone ?? null,
      address: ctx.store.address ?? null,
      country: ctx.store.country ?? null,
      ...parseHeroData(ctx.store.heroData),
    } : null,
    products: ctx.products as Product[],
    paymentMethods: ctx.paymentMethods as PublicPaymentMethods,
    isLoading: ctx.isLoading,
    error: null,
    reload: async () => { },
  }
}
