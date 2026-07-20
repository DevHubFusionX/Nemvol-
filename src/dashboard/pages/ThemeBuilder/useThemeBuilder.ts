import { useState } from 'react'

export type Section =
  | 'navigation' | 'hero' | 'productCard' | 'cartDrawer'
  | 'productPage' | 'footer' | 'filter' | 'categoryPage'
  | 'productGrid' | 'quickView' | 'heroLook' | 'landingPage'
  | 'colors' | 'logos' | 'typography'

export interface Variant { id: string; label: string; sub: string; soon?: boolean }

export const NAV_VARIANTS: Variant[] = [
  { id: 'default', label: 'Classic Retail', sub: 'General ecommerce' },
  { id: 'drole', label: 'Mega Menu', sub: 'Large catalogs' },
  { id: 'classic', label: 'Minimal Luxury', sub: 'Premium brands' },
  { id: 'minimal', label: 'Sticky Category', sub: 'DTC brands' },
]

export const CART_VARIANTS: Variant[] = [
  { id: 'default', label: 'Default', sub: 'Fourth storefront drawer' },
  { id: 'drole', label: 'Drole', sub: 'Slide-over drawer' },
  { id: 'modern', label: 'Modern', sub: 'Fullscreen overlay' },
  { id: 'split', label: 'Split', sub: 'Split-panel checkout' },
]

export const PRODUCT_PAGE_VARIANTS: Variant[] = [
  { id: 'default', label: 'Default', sub: 'Fourth storefront product page' },
  { id: 'drole', label: 'Drole', sub: 'Editorial hero layout' },
  { id: 'modern', label: 'Modern', sub: 'Grid-first layout' },
  { id: 'split', label: 'Split', sub: 'Image / detail columns' },
]

export const PRODUCT_CARD_VARIANTS: Variant[] = [
  { id: 'default', label: 'Default', sub: 'Fourth storefront product card' },
  { id: 'drole', label: 'Drole', sub: 'Editorial product card' },
  { id: 'minimal', label: 'Minimal', sub: 'Text-forward card' },
  { id: 'modern', label: 'Modern', sub: 'Hover-zoom card' },
  { id: 'elevated', label: 'Elevated', sub: 'Shadowed card' },
]

export const FOOTER_VARIANTS: Variant[] = [
  { id: 'default', label: 'Default', sub: 'Classic storefront footer' },
  { id: 'drole', label: 'Drole', sub: 'Multi-column footer' },
  { id: 'minimal', label: 'Minimal', sub: 'Single-row links' },
  { id: 'corporate', label: 'Corporate', sub: 'Full-width corporate' },
  { id: 'social', label: 'Social Focus', sub: 'Social links first' },
]

export const FILTER_VARIANTS: Variant[] = [
  { id: 'drole', label: 'Drole', sub: 'Side + sort bar' },
  { id: 'default', label: 'Default', sub: 'Inline chip filters' },
]

export const CATEGORY_VARIANTS: Variant[] = [
  { id: 'drole', label: 'Drole', sub: 'Editorial grid layout' },
  { id: 'default', label: 'Default', sub: 'Standard grid' },
]

export const PRODUCT_GRID_VARIANTS: Variant[] = [
  { id: 'default', label: 'Default', sub: 'Responsive product grid' },
  { id: 'compact', label: 'Compact', sub: 'Dense 4-col grid' },
  { id: 'masonry', label: 'Masonry', sub: 'Pinterest-style' },
]

export const QUICK_VIEW_VARIANTS: Variant[] = [
  { id: 'drole', label: 'Drole', sub: 'Slide-up panel' },
  { id: 'default', label: 'Default', sub: 'Centered modal' },
]

export const HERO_LOOK_VARIANTS: Variant[] = [
  { id: 'default', label: 'Split Minimalist', sub: 'Spaced side-by-side layout' },
  { id: 'fullscreen', label: 'Fullscreen Showcase', sub: 'Cover image with clear action' },
  { id: 'editorial', label: 'Editorial Column', sub: 'Luxury editorial single-column' },
  { id: 'product-banner', label: 'Product Spotlight', sub: '3D floating focused product' },
]

export const LANDING_VARIANTS: Variant[] = [
  { id: 'none', label: 'None', sub: 'No custom landing' },
  { id: 'drole', label: 'Drole', sub: 'Full landing, needs 2 images', soon: true },
  { id: 'aime', label: 'Aime Editorial', sub: 'Full landing, needs 2 hero images', soon: true },
]

export const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald',
  'Source Sans Pro', 'Slabo 27px', 'Raleway', 'PT Sans', 'Merriweather',
  'Noto Sans', 'Nunito', 'Concert One', 'Playfair Display', 'Rubik',
  'Lora', 'Work Sans', 'Fira Sans', 'Quicksand', 'Karla', 'Josefin Sans',
  'Inconsolata', 'Anton', 'Cabin', 'Dancing Script', 'Dosis', 'Abel',
  'Oxygen', 'Teko', 'Abril Fatface', 'Ubuntu', 'Poppins', 'Bebas Neue',
  'Nunito Sans', 'Muli', 'Amatic SC', 'Zilla Slab',
]

export interface ThemeBuilderState {
  activeSection: Section
  nav: { variant: string; bg: string; textColor: string; position?: string; searchStyle?: string }
  cartDrawer: { variant: string }
  productPage: { variant: string }
  productCard: { variant: string }
  footer: { variant: string; footerText: string }
  filter: { variant: string }
  categoryPage: { variant: string }
  productGrid: { variant: string }
  quickView: { variant: string }
  heroLook: { variant: string; images: string[]; overlayOpacity: number; transitionSpeed: number }
  landingPage: { variant: string }
  colors: { primary: string; secondary: string }
  logos: { primary: string | null; secondary: string | null }
  typography: { font: string; fontSearch: string }
  viewport: 'responsive' | 'mobile' | 'tablet'
}

export const INITIAL: ThemeBuilderState = {
  activeSection: 'navigation',
  nav: { variant: 'default', bg: '#ffffff', textColor: '#000000', position: 'fixed-top', searchStyle: 'overlay' },
  cartDrawer: { variant: 'default' },
  productPage: { variant: 'default' },
  productCard: { variant: 'default' },
  footer: { variant: 'default', footerText: '' },
  filter: { variant: 'default' },
  categoryPage: { variant: 'default' },
  productGrid: { variant: 'default' },
  quickView: { variant: 'default' },
  heroLook: { variant: 'default', images: [], overlayOpacity: 40, transitionSpeed: 3500 },
  landingPage: { variant: 'none' },
  colors: { primary: '#000000', secondary: '#ffffff' },
  logos: { primary: null, secondary: null },
  typography: { font: 'Inter', fontSearch: '' },
  viewport: 'responsive',
}

export function useThemeBuilder() {
  const [state, setState] = useState<ThemeBuilderState>(INITIAL)

  function set<K extends keyof ThemeBuilderState>(key: K, value: ThemeBuilderState[K]) {
    setState(s => ({ ...s, [key]: value }))
  }

  function patch<K extends keyof ThemeBuilderState>(key: K, value: Partial<ThemeBuilderState[K]>) {
    setState(s => ({ ...s, [key]: { ...(s[key] as object), ...(value as object) } }))
  }

  return { state, set, patch, setState }
}
