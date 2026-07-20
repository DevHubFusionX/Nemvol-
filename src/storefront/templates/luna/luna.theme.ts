import type { ThemeConfig } from '../types'

export const lunaTheme: ThemeConfig = {
  id: 'luna',

  defaults: {
    nav: 'classic',
    hero: 'fullscreen',
    productCard: 'elevated',
    footer: 'corporate',
    cartDrawer: 'modern',
    productPage: 'default',
    filter: 'drole',
    categoryPage: 'drole',
    productGrid: 'default',
    quickView: 'default',
  },

  tokens: {
    bgClass: 'bg-slate-900',
    textClass: 'text-white',
    accentDefault: '#818cf8',
    surfaceClass: 'bg-slate-800',
    fontFamily: 'Playfair Display',
  },
}
