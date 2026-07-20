# Subdomain Storefront Migration Plan
# `yourstore.nemvol.com` instead of `nemvol.com/store/yourstore`
#
# Status: PENDING — do not apply until DNS + Vercel are configured
# Created: 2025
# Reference: https://liweux.nile.ng (Nile's implementation)
#
# ─────────────────────────────────────────────────────────────────────────────
# STEP 1 — DNS (do this in your domain registrar, e.g. Namecheap / Cloudflare)
# ─────────────────────────────────────────────────────────────────────────────
#
#   Add a wildcard CNAME record:
#
#   Type   : CNAME
#   Host   : *
#   Value  : cname.vercel-dns.com
#   TTL    : Auto
#
#   This makes *.nemvol.com route to your Vercel deployment.
#   The root nemvol.com record stays unchanged.
#
# ─────────────────────────────────────────────────────────────────────────────
# STEP 2 — Vercel (requires Vercel Pro plan for wildcard domains)
# ─────────────────────────────────────────────────────────────────────────────
#
#   1. Go to your Vercel project → Settings → Domains
#   2. Add domain: *.nemvol.com
#   3. Vercel will verify the wildcard DNS record you added above
#   4. SSL is handled automatically by Vercel for all subdomains
#
# ─────────────────────────────────────────────────────────────────────────────
# STEP 3 — Code changes (apply all 3 files below when DNS + Vercel are ready)
# ─────────────────────────────────────────────────────────────────────────────

# ── FILE 1 ──────────────────────────────────────────────────────────────────
# src/storefront/lib/storeUrl.ts
# REPLACES the current file entirely
# ────────────────────────────────────────────────────────────────────────────

/*
const NEMVOL_DOMAIN = 'nemvol.com'

/**
 * In production (*.nemvol.com), reads the slug from the subdomain.
 * On localhost, returns null so the URL-param fallback is used.
 */
export function getSlugFromHost(): string | null {
  if (typeof window === 'undefined') return null
  const host = window.location.hostname  // e.g. "jamhero.nemvol.com"
  const parts = host.split('.')
  // *.nemvol.com has 3 parts: ["jamhero", "nemvol", "com"]
  if (
    parts.length >= 3 &&
    parts[parts.length - 2] === 'nemvol' &&
    parts[parts.length - 1] === 'com' &&
    parts[0] !== 'www'
  ) {
    return parts[0]
  }
  return null
}

/**
 * Builds the public storefront URL for a given slug.
 * Uses subdomain format in production, path format on localhost.
 */
export function getStorefrontUrl(slug: string): string {
  if (typeof window !== 'undefined' && window.location.hostname.endsWith(NEMVOL_DOMAIN)) {
    return `https://${slug}.${NEMVOL_DOMAIN}`
  }
  // localhost dev fallback
  return `${window.location.origin}/store/${slug}`
}
*/


# ── FILE 2 ──────────────────────────────────────────────────────────────────
# src/storefront/StorefrontRouter.tsx
# CHANGE: add subdomain slug detection at the top of StorefrontRouter()
# Only the StorefrontRouter function body changes — everything else stays
# ────────────────────────────────────────────────────────────────────────────

/*
// ADD this import at the top with the other imports:
import { getSlugFromHost } from './lib/storeUrl'

// REPLACE the existing StorefrontRouter function with this:
export default function StorefrontRouter() {
  const { slug: paramSlug } = useParams<{ slug: string }>()
  const { isSignedIn } = useAuth()
  const { data: ownerStore } = useStore()

  // In production: read slug from subdomain (jamhero.nemvol.com → "jamhero")
  // On localhost:  read slug from URL param (/store/jamhero → "jamhero")
  const slug = getSlugFromHost() ?? paramSlug

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
*/


# ── FILE 3 ──────────────────────────────────────────────────────────────────
# src/router/index.tsx
# CHANGE: the /store/:slug/* route stays for localhost dev
# ADD a root catch-all route that handles subdomain traffic
# ────────────────────────────────────────────────────────────────────────────

/*
// The existing route stays exactly as-is for localhost:
{ path: '/store/:slug/*', element: <StorefrontRouter /> }

// ADD this new route to handle subdomain requests where there is no /store/ prefix.
// When running on jamhero.nemvol.com, the path is just "/" so we need StorefrontRouter
// at the root level too. getSlugFromHost() inside StorefrontRouter handles the slug.
{ path: '/store-root', element: <StorefrontRouter /> }

// ALSO update the vercel.json to route subdomain traffic correctly — see STEP 4 below.
*/


# ─────────────────────────────────────────────────────────────────────────────
# STEP 4 — vercel.json update
# ─────────────────────────────────────────────────────────────────────────────
#
# Current vercel.json just rewrites everything to index.html.
# No change needed — Vercel's wildcard domain handles routing at the CDN level.
# Each subdomain request hits the same deployment, React Router takes over,
# and getSlugFromHost() reads the subdomain from window.location.hostname.
#
# The current vercel.json is already correct:
# { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }


# ─────────────────────────────────────────────────────────────────────────────
# STEP 5 — Update getStorefrontUrl() call sites
# ─────────────────────────────────────────────────────────────────────────────
#
# Search the codebase for all uses of getStorefrontUrl() and confirm they
# will produce the correct subdomain URL in production.
#
# Known call sites to verify:
#   - src/dashboard/pages/Storefront/Storefront.tsx  (share/preview link)
#   - src/dashboard/pages/Overview/OverviewHeader.tsx (if used)
#   - Any "Visit Store" buttons in the dashboard
#
# All of these call getStorefrontUrl(store.slug) which will automatically
# return https://slug.nemvol.com once the hostname check passes.
# No changes needed at call sites.


# ─────────────────────────────────────────────────────────────────────────────
# STEP 6 — API CORS update (nemvol-api)
# ─────────────────────────────────────────────────────────────────────────────
#
# Current CORS in nemvol-api/src/index.ts only allows:
#   - http://localhost:5173
#   - http://localhost:5174
#   - https://nemvol.com
#
# ADD wildcard subdomain support:
#
# REPLACE the cors() config with:
#
# app.use('*', cors({
#   origin: (origin) => {
#     if (!origin) return true  // non-browser requests
#     if (
#       origin === 'http://localhost:5173' ||
#       origin === 'http://localhost:5174' ||
#       origin === 'https://nemvol.com' ||
#       /^https:\/\/[a-z0-9-]+\.nemvol\.com$/.test(origin)
#     ) return true
#     return false
#   },
#   credentials: true,
# }))


# ─────────────────────────────────────────────────────────────────────────────
# CHECKLIST — apply in this order
# ─────────────────────────────────────────────────────────────────────────────
#
# [ ] 1. DNS wildcard CNAME record added (*.nemvol.com → cname.vercel-dns.com)
# [ ] 2. Vercel Pro plan active
# [ ] 3. *.nemvol.com added in Vercel project domains and verified
# [ ] 4. Apply FILE 1 — storeUrl.ts
# [ ] 5. Apply FILE 2 — StorefrontRouter.tsx (slug detection change)
# [ ] 6. Apply FILE 3 — router/index.tsx (root route for subdomains)
# [ ] 7. Apply STEP 6 — CORS update in nemvol-api/src/index.ts
# [ ] 8. Deploy to Vercel
# [ ] 9. Test: visit jamhero.nemvol.com — should load the store
# [ ] 10. Test: visit nemvol.com/store/jamhero — should still work (localhost dev)
# [ ] 11. Test: dashboard "Visit Store" link shows https://jamhero.nemvol.com
#
# ─────────────────────────────────────────────────────────────────────────────
# NOTES
# ─────────────────────────────────────────────────────────────────────────────
#
# - localhost dev is UNAFFECTED. /store/:slug continues to work as normal.
# - SSL certificates for *.nemvol.com are auto-provisioned by Vercel.
# - Custom domains (e.g. jamhero.com → jamhero.nemvol.com) are a separate
#   feature handled by the Domain Management page — not part of this plan.
# - Vercel Pro is ~$20/month. Wildcard domains are not available on the free tier.
