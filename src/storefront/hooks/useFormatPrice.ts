import { useCallback } from 'react'
import { formatPrice as format } from '../lib/formatPrice'
import { useStorefront } from '../components/useStorefront'

export function useFormatPrice() {
  const { settings } = useStorefront()
  const currency = settings?.currency ?? 'NGN'
  return useCallback((amount: number) => format(amount, currency), [currency])
}
