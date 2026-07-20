import { useStorefront } from '../components/useStorefront'
import { type ThemeConfig, resolveVariant } from '../templates/types'
import { nubiaTheme } from '../templates/nubia/nubia.theme'
import { lunaTheme } from '../templates/luna/luna.theme'
import { novaTheme } from '../templates/nova/nova.theme'
import { arcTheme } from '../templates/arc/arc.theme'

const THEME_MAP: Record<string, ThemeConfig> = {
  nubia: nubiaTheme,
  luna: lunaTheme,
  nova: novaTheme,
  arc: arcTheme,
}

export function useThemeConfig() {
  const { settings } = useStorefront()
  const templateId = settings?.template ?? 'nubia'
  const theme = THEME_MAP[templateId] ?? nubiaTheme

  const getVariant = (section: keyof ThemeConfig['defaults']): string => {
    return resolveVariant(section, theme, settings ?? undefined)
  }

  return {
    theme,
    getVariant,
  }
}
