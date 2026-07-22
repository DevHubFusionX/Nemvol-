import type { ThemeBuilderState } from '../../dashboard/pages/ThemeBuilder/useThemeBuilder'

export interface TemplateMetadata {
  id: string
  displayName: string
  bgClass: string
  description: string
}

export const storefrontTemplates: TemplateMetadata[] = [
  {
    id: 'nubia',
    displayName: 'Nubia',
    bgClass: 'bg-stone-900',
    description: 'Minimalist luxury. Dark tones, serif typography, editorial spacing.',
  },
  {
    id: 'luna',
    displayName: 'Luna',
    bgClass: 'bg-slate-100',
    description: 'Clean and airy. Minimal nav, light backgrounds, text-forward cards.',
  },
  {
    id: 'nova',
    displayName: 'Nova',
    bgClass: 'bg-zinc-800',
    description: 'Bold and modern. Sticky category nav, hover-zoom cards, corporate footer.',
  },
  {
    id: 'arc',
    displayName: 'Arc',
    bgClass: 'bg-amber-50',
    description: 'Warm editorial. Split hero, mega menu, multi-column footer.',
  },
]

// Default ThemeBuilderState preset applied when a template is selected
export const TEMPLATE_PRESETS: Record<string, Partial<ThemeBuilderState>> = {
  nubia: {
    nav: { variant: 'default', bg: '#ffffff', textColor: '#1c1917' },
    heroLook: { variant: 'default', images: [], overlayOpacity: 20, transitionSpeed: 3500 },
    productCard: { variant: 'default' },
    cartDrawer: { variant: 'default' },
    footer: { variant: 'default', footerText: '' },
    colors: { primary: '#1c1917', secondary: '#ffffff' },
  },
  luna: {
    nav: { variant: 'classic', bg: 'transparent', textColor: '#ffffff' },
    heroLook: { variant: 'fullscreen', images: [], overlayOpacity: 35, transitionSpeed: 4000 },
    productCard: { variant: 'minimal' },
    cartDrawer: { variant: 'drole' },
    footer: { variant: 'minimal', footerText: '' },
    colors: { primary: '#334155', secondary: '#ffffff' },
  },
  nova: {
    nav: { variant: 'minimal', bg: '#18181b', textColor: '#ffffff' },
    heroLook: { variant: 'product-banner', images: [], overlayOpacity: 50, transitionSpeed: 3500 },
    productCard: { variant: 'modern' },
    cartDrawer: { variant: 'modern' },
    footer: { variant: 'corporate', footerText: '' },
    colors: { primary: '#18181b', secondary: '#ffffff' },
  },
  arc: {
    nav: { variant: 'drole', bg: '#fffbeb', textColor: '#1c1917' },
    heroLook: { variant: 'editorial', images: [], overlayOpacity: 30, transitionSpeed: 3500 },
    productCard: { variant: 'drole' },
    cartDrawer: { variant: 'split' },
    footer: { variant: 'default', footerText: '' },
    colors: { primary: '#92400e', secondary: '#ffffff' },
  },
}

export function getTemplateCount(): number {
  return storefrontTemplates.length
}
