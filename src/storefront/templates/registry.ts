export interface StorefrontTemplateMeta {
  id: string
  name: string
  displayName: string
  bgClass: string
  description: string
}

export const storefrontTemplates: StorefrontTemplateMeta[] = [
  {
    id: 'nubia',
    name: 'Nubia',
    displayName: 'Nubia theme',
    bgClass: 'bg-stone-100',
    description: 'Elegant, premium, and minimal.',
  },
  {
    id: 'luna',
    name: 'Luna',
    displayName: 'Luna theme',
    bgClass: 'bg-slate-900',
    description: 'Bright, modern, and polished.',
  },
  {
    id: 'nova',
    name: 'Nova',
    displayName: 'Nova theme',
    bgClass: 'bg-zinc-800',
    description: 'Bold visuals with clean structure.',
  },
  {
    id: 'arc',
    name: 'Arc',
    displayName: 'Arc theme',
    bgClass: 'bg-slate-100',
    description: 'Structured and professional for modern brands.',
  },
]

export const getTemplateCount = () => storefrontTemplates.length
