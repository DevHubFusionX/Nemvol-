const currencySymbols: Record<string, string> = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  EUR: '€',
}

export function formatPrice(amount: number, currency = 'NGN'): string {
  const symbol = currencySymbols[currency] ?? currency
  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return `${symbol}${formatted}`
}

export function hasSalePrice(price: number, compareAt?: number): compareAt is number {
  return compareAt != null && compareAt > price
}
