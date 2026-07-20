import type { ThemeConfig } from '../types'

export const arcTheme: ThemeConfig = {
  id: 'arc',

  defaults: {
    nav: 'minimal',
    hero: 'editorial',
    productCard: 'drole',
    footer: 'minimal',
    cartDrawer: 'split',
    productPage: 'default',
    filter: 'drole',
    categoryPage: 'drole',
    productGrid: 'default',
    quickView: 'default',
  },

  tokens: {
    bgClass: 'bg-slate-100',
    textClass: 'text-slate-900',
    accentDefault: '#0ea5e9',
    surfaceClass: 'bg-white',
    fontFamily: 'Work Sans',
  },
}
