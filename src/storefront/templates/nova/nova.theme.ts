import type { ThemeConfig } from '../types'

export const novaTheme: ThemeConfig = {
  id: 'nova',

  defaults: {
    nav: 'drole',
    hero: 'product-banner',
    productCard: 'modern',
    footer: 'drole',
    cartDrawer: 'drole',
    productPage: 'default',
    filter: 'default',
    categoryPage: 'default',
    productGrid: 'default',
    quickView: 'drole',
  },

  tokens: {
    bgClass: 'bg-zinc-800',
    textClass: 'text-white',
    accentDefault: '#f59e0b',
    surfaceClass: 'bg-zinc-700',
    fontFamily: 'Montserrat',
  },
}
