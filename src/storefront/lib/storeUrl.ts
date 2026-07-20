/** Build the customer-facing storefront URL for a store slug. */
export function getStorefrontUrl(slug: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/store/${slug}`
  }
  return `/store/${slug}`
}
