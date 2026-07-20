import type { ThemeConfig } from '../types'

export const nubiaTheme: ThemeConfig = {
  id: 'nubia',

  defaults: {
    nav: 'default',
    hero: 'default',
    productCard: 'default',
    footer: 'default',
    cartDrawer: 'default',
    productPage: 'default',
    filter: 'default',
    categoryPage: 'default',
    productGrid: 'default',
    quickView: 'default',
  },

  tokens: {
    bgClass: 'bg-stone-50',
    textClass: 'text-stone-900',
    accentDefault: '#a8956a',
    surfaceClass: 'bg-white',
    fontFamily: 'Inter',
  },
}
