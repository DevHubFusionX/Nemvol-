/**
 * ThemeConfig: Defines a template's default variant selections and design tokens.
 *
 * Each template (nubia, luna, nova, arc) exports a ThemeConfig. The shared layout
 * uses it to resolve which variant to render for each component section.
 *
 * Resolution order:  ThemeBuilder override (heroData) → ThemeConfig default → 'default'
 */

export interface ThemeConfig {
  id: string

  /** Default variant IDs for each swappable section */
  defaults: {
    nav: string
    hero: string
    productCard: string
    footer: string
    cartDrawer: string
    productPage: string
    filter: string
    categoryPage: string
    productGrid: string
    quickView: string
  }

  /** Visual design tokens applied at the layout level */
  tokens: {
    bgClass: string
    textClass: string
    accentDefault: string
    surfaceClass: string
    fontFamily: string
  }
}

/**
 * Resolves the active variant for a given section.
 *
 * Priority: builderOverride (from ThemeBuilder/heroData) → theme default → 'default'
 */
export function resolveVariant(
  section: keyof ThemeConfig['defaults'],
  theme: ThemeConfig,
  builderOverrides?: Record<string, any>,
): string {
  // Check if builder has overridden this section
  const override = builderOverrides?.[section]?.variant
  if (override) return override

  return theme.defaults[section] ?? 'default'
}
