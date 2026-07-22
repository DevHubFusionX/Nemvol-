import { useMemo } from 'react'
import { useStorefront } from '../context/StorefrontProvider'
import type { ThemeBuilderState } from '../../dashboard/pages/ThemeBuilder/useThemeBuilder'

export function useTemplateState(): Partial<ThemeBuilderState> {
  const { store } = useStorefront()
  return useMemo(() => {
    try {
      return store?.heroData ? JSON.parse(store.heroData as string) : {}
    } catch {
      return {}
    }
  }, [store?.heroData])
}
