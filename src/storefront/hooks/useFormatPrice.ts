import { useCallback } from 'react'
import { formatPrice as format } from '../lib/formatPrice'
import { useStorefront } from '../context/StorefrontProvider'

export function useFormatPrice() {
  const { store } = useStorefront()
  const currency = store?.currency ?? 'NGN'
  return useCallback((amount: number) => format(amount, currency), [currency])
}
