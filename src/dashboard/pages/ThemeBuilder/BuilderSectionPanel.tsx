import { ImagePlus, Settings2, ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'
import type { Section, ThemeBuilderState } from './useThemeBuilder'

interface Props {
  section: Section
  state: ThemeBuilderState
  onPatch: <K extends keyof ThemeBuilderState>(key: K, value: Partial<ThemeBuilderState[K]>) => void
  onUploadImage: (file: File) => Promise<string>
}

function SliderRow({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-slate-700">{label}</span>
        <span className="text-[12px] text-slate-500 font-mono">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1 accent-slate-900 cursor-pointer"
      />
    </div>
  )
}

function SelectRow({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-[12px] text-slate-700">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full text-[12px] border border-slate-200 rounded-lg px-3 py-2 pr-8 appearance-none bg-white text-slate-800 focus:outline-none focus:border-slate-400"
        >
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  )
}

const LABELS: Record<Section, string> = {
  navigation: 'Navigation', hero: 'Hero', productCard: 'Product Card',
  cartDrawer: 'Cart Drawer', productPage: 'Product Page', footer: 'Footer',
  filter: 'Filter', categoryPage: 'Category Page', productGrid: 'Product Grid',
  quickView: 'Quick View', heroLook: 'Hero', landingPage: 'Landing Page',
  colors: 'Colors', logos: 'Logos', typography: 'Typography',
}

// Sections that show meaningful right-panel settings
const HAS_PANEL: Section[] = ['heroLook', 'navigation', 'productCard', 'cartDrawer', 'productPage', 'productGrid', 'footer']

export default function BuilderSectionPanel({ section, state, onPatch, onUploadImage }: Props) {
  const hasPanel = HAS_PANEL.includes(section)
  const [isUploadingHero, setIsUploadingHero] = useState(false)

  const overlayOpacity = state.heroLook.overlayOpacity
  const transitionSpeed = state.heroLook.transitionSpeed

  return (
    <aside className="w-44 shrink-0 h-full overflow-y-auto border-l border-slate-100 bg-white flex flex-col">
      {/* Header */}
      <div className="px-3 py-3 border-b border-slate-100 shrink-0">
        <p className="text-[12px] font-semibold text-slate-900">{LABELS[section]}</p>
        <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Section settings</p>
      </div>

      {!hasPanel ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-2 text-slate-300">
          <Settings2 size={24} strokeWidth={1} />
          <p className="text-[11px]">Settings in left panel</p>
        </div>
      ) : (
        <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">

          {/* ── Hero Look ── */}
          {section === 'heroLook' && (
            <>
              {/* Images block */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImagePlus size={13} className="text-slate-500" strokeWidth={1.8} />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Images</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3.5 space-y-2.5">
                  <p className="text-[12px] font-semibold text-slate-800">Default hero</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Upload custom hero images for this template. If none are uploaded, the storefront falls back to product or template images.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {state.heroLook.images.map((src, i) => (
                      <div key={i} className="relative w-18 h-18 rounded-lg overflow-hidden border border-slate-100 group">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <button
                          onClick={() => onPatch('heroLook', { images: state.heroLook.images.filter((_, j) => j !== i) })}
                          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 text-slate-600 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >×</button>
                        <span className="absolute bottom-1 left-1 text-[9px] text-white/80 font-medium">{i + 1}</span>
                      </div>
                    ))}
                    {isUploadingHero ? (
                      <div className="w-18 h-18 rounded-lg border border-slate-100 flex flex-col items-center justify-center bg-slate-50">
                        <span className="w-4.5 h-4.5 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                        <span className="text-[8px] text-slate-450 mt-1">Uploading...</span>
                      </div>
                    ) : (
                      <label className="w-18 h-18 rounded-lg border border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all">
                        <Plus size={14} className="text-slate-400" strokeWidth={1.5} />
                        <span className="text-[9px] text-slate-400 leading-none">Add image</span>
                        <input
                          type="file" accept="image/*" className="hidden"
                          onChange={async e => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            setIsUploadingHero(true)
                            try {
                              const url = await onUploadImage(file)
                              onPatch('heroLook', { images: [...state.heroLook.images, url] })
                            } catch {
                              // error toast handled in parent
                            } finally {
                              setIsUploadingHero(false)
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings block */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
                </div>
                <div className="space-y-5">
                  <SelectRow
                    label="Hero look"
                    value={
                      state.heroLook.variant === 'fullscreen' ? 'Fullscreen Showcase' :
                      state.heroLook.variant === 'editorial' ? 'Editorial Column' :
                      state.heroLook.variant === 'product-banner' ? 'Product Spotlight' :
                      'Split Minimalist'
                    }
                    options={['Split Minimalist', 'Fullscreen Showcase', 'Editorial Column', 'Product Spotlight']}
                    onChange={v => {
                      const mapping: Record<string, string> = {
                        'Split Minimalist': 'default',
                        'Fullscreen Showcase': 'fullscreen',
                        'Editorial Column': 'editorial',
                        'Product Spotlight': 'product-banner'
                      }
                      onPatch('heroLook', { variant: mapping[v] })
                    }}
                  />
                  <SliderRow
                    label="Overlay opacity"
                    value={overlayOpacity} min={0} max={100} unit="%"
                    onChange={v => onPatch('heroLook', { overlayOpacity: v })}
                  />
                  <SliderRow
                    label="Transition speed"
                    value={transitionSpeed} min={500} max={8000} unit="ms"
                    onChange={v => onPatch('heroLook', { transitionSpeed: v })}
                  />
                </div>
              </div>
            </>
          )}

          {/* ── Navigation ── */}
          {section === 'navigation' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
              </div>
              <div className="space-y-4">
                <SelectRow
                  label="Nav style"
                  value={
                    state.nav.variant === 'drole' ? 'Mega Menu' :
                    state.nav.variant === 'classic' ? 'Minimal Luxury' :
                    state.nav.variant === 'minimal' ? 'Sticky Category' :
                    'Classic Retail'
                  }
                  options={['Classic Retail', 'Mega Menu', 'Minimal Luxury', 'Sticky Category']}
                  onChange={v => {
                    const mapping: Record<string, string> = {
                      'Classic Retail': 'default',
                      'Mega Menu': 'drole',
                      'Minimal Luxury': 'classic',
                      'Sticky Category': 'minimal'
                    }
                    onPatch('nav', { variant: mapping[v] })
                  }}
                />
                <SelectRow
                  label="Position"
                  value={state.nav.position === 'fixed-top' ? 'Fixed top' : state.nav.position === 'sticky' ? 'Sticky' : 'Static'}
                  options={['Fixed top', 'Sticky', 'Static']}
                  onChange={v => onPatch('nav', { position: v === 'Fixed top' ? 'fixed-top' : v.toLowerCase() })}
                />
                <SelectRow
                  label="Search style"
                  value={state.nav.searchStyle ? state.nav.searchStyle.charAt(0).toUpperCase() + state.nav.searchStyle.slice(1) : 'Overlay'}
                  options={['Overlay', 'Inline', 'None']}
                  onChange={v => onPatch('nav', { searchStyle: v.toLowerCase() })}
                />
              </div>
            </div>
          )}

          {/* ── Product Card ── */}
          {section === 'productCard' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
              </div>
              <div className="space-y-4">
                <SelectRow
                  label="Card style"
                  value={
                    state.productCard.variant === 'drole' ? 'Drole Editorial' :
                    state.productCard.variant === 'minimal' ? 'Minimal Text-Forward' :
                    state.productCard.variant === 'modern' ? 'Modern Hover-Zoom' :
                    state.productCard.variant === 'elevated' ? 'Elevated Shadowed' :
                    'Default Card'
                  }
                  options={['Default Card', 'Drole Editorial', 'Minimal Text-Forward', 'Modern Hover-Zoom', 'Elevated Shadowed']}
                  onChange={v => {
                    const mapping: Record<string, string> = {
                      'Default Card': 'default',
                      'Drole Editorial': 'drole',
                      'Minimal Text-Forward': 'minimal',
                      'Modern Hover-Zoom': 'modern',
                      'Elevated Shadowed': 'elevated'
                    }
                    onPatch('productCard', { variant: mapping[v] })
                  }}
                />
                <SelectRow label="Image ratio" value="4:5 Portrait" options={['4:5 Portrait', '1:1 Square', '16:9 Wide']} onChange={() => { }} />
                <SelectRow label="Hover action" value="Show buttons" options={['Show buttons', 'Zoom image', 'None']} onChange={() => { }} />
                <SelectRow label="Badge style" value="Pill" options={['Pill', 'Square', 'None']} onChange={() => { }} />
              </div>
            </div>
          )}

          {/* ── Cart Drawer ── */}
          {section === 'cartDrawer' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
              </div>
              <div className="space-y-4">
                <SelectRow
                  label="Drawer style"
                  value={
                    state.cartDrawer.variant === 'drole' ? 'Drole Slide-over' :
                    state.cartDrawer.variant === 'modern' ? 'Modern Fullscreen' :
                    state.cartDrawer.variant === 'split' ? 'Split Panel' :
                    'Default Drawer'
                  }
                  options={['Default Drawer', 'Drole Slide-over', 'Modern Fullscreen', 'Split Panel']}
                  onChange={v => {
                    const mapping: Record<string, string> = {
                      'Default Drawer': 'default',
                      'Drole Slide-over': 'drole',
                      'Modern Fullscreen': 'modern',
                      'Split Panel': 'split'
                    }
                    onPatch('cartDrawer', { variant: mapping[v] })
                  }}
                />
                <SelectRow label="Open from" value="Right" options={['Right', 'Left', 'Bottom']} onChange={() => { }} />
                <SelectRow label="Checkout button" value="Full width" options={['Full width', 'Compact']} onChange={() => { }} />
              </div>
            </div>
          )}

          {/* ── Product Page ── */}
          {section === 'productPage' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
              </div>
              <div className="space-y-4">
                <SelectRow
                  label="Page style"
                  value={
                    state.productPage.variant === 'drole' ? 'Drole Editorial Hero' :
                    state.productPage.variant === 'modern' ? 'Modern Grid-First' :
                    state.productPage.variant === 'split' ? 'Split Detail Columns' :
                    'Default Page'
                  }
                  options={['Default Page', 'Drole Editorial Hero', 'Modern Grid-First', 'Split Detail Columns']}
                  onChange={v => {
                    const mapping: Record<string, string> = {
                      'Default Page': 'default',
                      'Drole Editorial Hero': 'drole',
                      'Modern Grid-First': 'modern',
                      'Split Detail Columns': 'split'
                    }
                    onPatch('productPage', { variant: mapping[v] })
                  }}
                />
                <SelectRow label="Gallery style" value="Stacked" options={['Stacked', 'Thumbnails', 'Carousel']} onChange={() => { }} />
                <SelectRow label="Add to cart" value="Sticky bar" options={['Sticky bar', 'Inline', 'Both']} onChange={() => { }} />
              </div>
            </div>
          )}

          {/* ── Product Grid ── */}
          {section === 'productGrid' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
              </div>
              <div className="space-y-4">
                <SelectRow label="Columns (desktop)" value="3" options={['2', '3', '4']} onChange={() => { }} />
                <SelectRow label="Columns (mobile)" value="2" options={['1', '2']} onChange={() => { }} />
                <SelectRow label="Pagination" value="Load more" options={['Load more', 'Infinite scroll', 'Pages']} onChange={() => { }} />
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          {section === 'footer' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={13} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Settings</p>
              </div>
              <div className="space-y-4">
                <SelectRow
                  label="Footer style"
                  value={
                    state.footer.variant === 'drole' ? 'Drole Multi-column' :
                    state.footer.variant === 'minimal' ? 'Minimal Single-row' :
                    state.footer.variant === 'corporate' ? 'Corporate Full-width' :
                    state.footer.variant === 'social' ? 'Social Focus' :
                    'Default Footer'
                  }
                  options={['Default Footer', 'Drole Multi-column', 'Minimal Single-row', 'Corporate Full-width', 'Social Focus']}
                  onChange={v => {
                    const mapping: Record<string, string> = {
                      'Default Footer': 'default',
                      'Drole Multi-column': 'drole',
                      'Minimal Single-row': 'minimal',
                      'Corporate Full-width': 'corporate',
                      'Social Focus': 'social'
                    }
                    onPatch('footer', { variant: mapping[v] })
                  }}
                />
                <SelectRow label="Columns" value="4" options={['2', '3', '4']} onChange={() => { }} />
                <SelectRow label="Newsletter" value="Show" options={['Show', 'Hide']} onChange={() => { }} />
              </div>
            </div>
          )}

        </div>
      )}
    </aside>
  )
}
