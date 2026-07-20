import { Eye, RotateCcw, ImagePlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { Section, ThemeBuilderState, Variant } from './useThemeBuilder'
import {
  NAV_VARIANTS, CART_VARIANTS, PRODUCT_PAGE_VARIANTS, PRODUCT_CARD_VARIANTS,
  FOOTER_VARIANTS, FILTER_VARIANTS, CATEGORY_VARIANTS, PRODUCT_GRID_VARIANTS,
  QUICK_VIEW_VARIANTS, HERO_LOOK_VARIANTS, LANDING_VARIANTS, GOOGLE_FONTS,
} from './useThemeBuilder'

interface Props {
  state: ThemeBuilderState
  onSection: (s: Section) => void
  onVariant: (section: keyof ThemeBuilderState, id: string) => void
  onPatch: <K extends keyof ThemeBuilderState>(key: K, value: Partial<ThemeBuilderState[K]>) => void
  onSaveDraft: () => void
  onPublish: () => void
  onResetStorefront: () => void
  isSavingDraft: boolean
  isPublishing: boolean
  isResetting: boolean
  onUploadImage: (file: File) => Promise<string>
}

function SectionHeader({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-700">{label}</p>
      <button
        onClick={onClick}
        className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
      >
        <Eye size={10} /> Preview
      </button>
    </div>
  )
}

function VariantCard({ v, active, onClick }: { v: Variant; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={v.soon}
      className={`relative text-left rounded-lg border p-2 transition-all ${active ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-300'
        } ${v.soon ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="h-10 rounded bg-slate-100 mb-1.5 flex items-center justify-center gap-1">
        <div className="w-6 h-0.5 bg-slate-300 rounded" />
        <div className="w-3 h-0.5 bg-slate-200 rounded" />
      </div>
      <p className="text-[11px] font-semibold text-slate-800 leading-none">{v.label}</p>
      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{v.sub}</p>
      {active && (
        <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 flex items-center justify-center">
          <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      )}
      {v.soon && (
        <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1 py-0.5 rounded">Soon</span>
      )}
    </button>
  )
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-slate-400 font-mono">{value.toUpperCase()}</span>
        <label className="w-5 h-5 rounded border border-slate-200 overflow-hidden cursor-pointer shrink-0" style={{ backgroundColor: value }}>
          <input type="color" value={value} onChange={e => onChange(e.target.value)} className="opacity-0 w-full h-full cursor-pointer" />
        </label>
      </div>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="pt-1 pb-0.5">
      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">{label}</p>
    </div>
  )
}

function Grid({ variants, activeId, onPick }: { variants: Variant[]; activeId: string; onPick: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {variants.map(v => (
        <VariantCard key={v.id} v={v} active={activeId === v.id} onClick={() => !v.soon && onPick(v.id)} />
      ))}
    </div>
  )
}

export default function BuilderSidebar({
  state, onSection, onVariant, onPatch,
  onSaveDraft, onPublish, onResetStorefront,
  isSavingDraft, isPublishing, isResetting,
  onUploadImage
}: Props) {
  const [uploadingLogos, setUploadingLogos] = useState<Record<string, boolean>>({})
  const [fontTab, setFontTab] = useState<'Google' | 'Custom'>('Google')
  const [customFontInput, setCustomFontInput] = useState('')

  const filteredFonts = GOOGLE_FONTS.filter(f =>
    f.toLowerCase().includes(state.typography.fontSearch.toLowerCase())
  )

  return (
    <aside className="w-64 shrink-0 h-full overflow-y-auto border-r border-slate-100 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 shrink-0">
        <p className="text-[13px] font-semibold text-slate-900">Core Component Styles</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Click a card to switch. Eye icon to preview</p>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5 overflow-y-auto">

        {/* ── Navigation ── */}
        <div>
          <SectionHeader label="Navigation" active={state.activeSection === 'navigation'} onClick={() => onSection('navigation')} />
          <Grid variants={NAV_VARIANTS} activeId={state.nav.variant} onPick={id => onVariant('nav', id)} />
          <div className="mt-2.5 space-y-2 border border-slate-100 rounded-lg p-3">
            <Divider label="Navigation Appearance" />
            <ColorInput label="Background" value={state.nav.bg} onChange={v => onPatch('nav', { bg: v })} />
            <ColorInput label="Text Color" value={state.nav.textColor} onChange={v => onPatch('nav', { textColor: v })} />
          </div>
        </div>

        {/* ── Cart Drawer ── */}
        <div>
          <SectionHeader label="Cart Drawer" active={state.activeSection === 'cartDrawer'} onClick={() => onSection('cartDrawer')} />
          <Grid variants={CART_VARIANTS} activeId={state.cartDrawer.variant} onPick={id => onVariant('cartDrawer', id)} />
        </div>

        {/* ── Product Page ── */}
        <div>
          <SectionHeader label="Product Page" active={state.activeSection === 'productPage'} onClick={() => onSection('productPage')} />
          <Grid variants={PRODUCT_PAGE_VARIANTS} activeId={state.productPage.variant} onPick={id => onVariant('productPage', id)} />
        </div>

        {/* ── Product Card ── */}
        <div>
          <SectionHeader label="Product Card" active={state.activeSection === 'productCard'} onClick={() => onSection('productCard')} />
          <Grid variants={PRODUCT_CARD_VARIANTS} activeId={state.productCard.variant} onPick={id => onVariant('productCard', id)} />
        </div>

        {/* ── Footer ── */}
        <div>
          <SectionHeader label="Footer" active={state.activeSection === 'footer'} onClick={() => onSection('footer')} />
          <Grid variants={FOOTER_VARIANTS} activeId={state.footer.variant} onPick={id => onVariant('footer', id)} />
          <div className="mt-2.5 border border-slate-100 rounded-lg p-3 space-y-2">
            <Divider label="Footer Text" />
            <p className="text-[10px] text-slate-400 leading-relaxed">Shared by every footer style. Leave empty to hide this copy.</p>
            <textarea
              value={state.footer.footerText}
              onChange={e => onPatch('footer', { footerText: e.target.value })}
              placeholder="Add a short brand description for the footer"
              rows={3}
              className="w-full text-[11px] border border-slate-200 rounded-lg px-2.5 py-2 resize-none focus:outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* ── Advanced Components ── */}
        <div className="pt-1">
          <p className="text-[11px] font-semibold text-slate-900 mb-0.5">Advanced Components</p>
          <p className="text-[10px] text-slate-400 mb-4">Filters, grids, overlays and page shells</p>

          {/* Filter */}
          <div className="mb-4">
            <SectionHeader label="Filter" active={state.activeSection === 'filter'} onClick={() => onSection('filter')} />
            <Grid variants={FILTER_VARIANTS} activeId={state.filter.variant} onPick={id => onVariant('filter', id)} />
          </div>

          {/* Category Page */}
          <div className="mb-4">
            <SectionHeader label="Category Page" active={state.activeSection === 'categoryPage'} onClick={() => onSection('categoryPage')} />
            <Grid variants={CATEGORY_VARIANTS} activeId={state.categoryPage.variant} onPick={id => onVariant('categoryPage', id)} />
          </div>

          {/* Product Grid */}
          <div className="mb-4">
            <SectionHeader label="Product Grid" active={state.activeSection === 'productGrid'} onClick={() => onSection('productGrid')} />
            <Grid variants={PRODUCT_GRID_VARIANTS} activeId={state.productGrid.variant} onPick={id => onVariant('productGrid', id)} />
          </div>

          {/* Quick View */}
          <div className="mb-4">
            <SectionHeader label="Quick View" active={state.activeSection === 'quickView'} onClick={() => onSection('quickView')} />
            <Grid variants={QUICK_VIEW_VARIANTS} activeId={state.quickView.variant} onPick={id => onVariant('quickView', id)} />
          </div>

          {/* Hero Look */}
          <div className="mb-4">
            <SectionHeader label="Hero Look" active={state.activeSection === 'heroLook'} onClick={() => onSection('heroLook')} />
            <Grid variants={HERO_LOOK_VARIANTS} activeId={state.heroLook.variant} onPick={id => onVariant('heroLook', id)} />
          </div>

          {/* Landing Page */}
          <div className="mb-4">
            <SectionHeader label="Landing Page" active={state.activeSection === 'landingPage'} onClick={() => onSection('landingPage')} />
            <Grid variants={LANDING_VARIANTS} activeId={state.landingPage.variant} onPick={id => onVariant('landingPage', id)} />
          </div>
        </div>

        {/* ── Colors ── */}
        <div>
          <SectionHeader label="Colors" active={state.activeSection === 'colors'} onClick={() => onSection('colors')} />
          <div className="border border-slate-100 rounded-lg p-3 space-y-2.5">
            <ColorInput label="Primary color" value={state.colors.primary} onChange={v => onPatch('colors', { primary: v })} />
            <ColorInput label="Secondary color" value={state.colors.secondary} onChange={v => onPatch('colors', { secondary: v })} />
          </div>
        </div>

        {/* ── Logos ── */}
        <div>
          <SectionHeader label="Logos" active={state.activeSection === 'logos'} onClick={() => onSection('logos')} />
          <div className="border border-slate-100 rounded-lg p-3 space-y-3">
            {[
              { key: 'primary' as const, label: 'Primary logo', hint: 'Used in main header and light backgrounds.' },
              { key: 'secondary' as const, label: 'Secondary logo', hint: 'Used in footer or dark backgrounds.' },
            ].map(({ key, label, hint }) => (
              <div key={key}>
                <p className="text-[11px] font-medium text-slate-700 mb-0.5">{label}</p>
                <p className="text-[10px] text-slate-400 mb-2">{hint}</p>
                {state.logos[key] ? (
                  <div className="relative w-full h-14 rounded-lg border border-slate-100 overflow-hidden">
                    <img src={state.logos[key]!} alt="" className="w-full h-full object-contain" />
                    <button
                      onClick={() => onPatch('logos', { [key]: null })}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 text-[10px]"
                    >×</button>
                  </div>
                ) : (
                  <label className={`flex items-center gap-2 cursor-pointer border border-dashed border-slate-200 rounded-lg px-3 py-2 hover:border-slate-400 transition-colors ${uploadingLogos[key] ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}>
                    {uploadingLogos[key] ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-slate-450" />
                        <span className="text-[11px] text-slate-400">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={13} className="text-slate-400" />
                        <span className="text-[11px] text-slate-400">Select picture</span>
                      </>
                    )}
                    <input
                      type="file" accept="image/*" className="hidden"
                      disabled={uploadingLogos[key]}
                      onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setUploadingLogos(prev => ({ ...prev, [key]: true }))
                        try {
                          const url = await onUploadImage(file)
                          onPatch('logos', { [key]: url })
                        } catch {
                          // toast error handled in parent
                        } finally {
                          setUploadingLogos(prev => ({ ...prev, [key]: false }))
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Typography ── */}
        <div>
          <SectionHeader label="Typography" active={state.activeSection === 'typography'} onClick={() => onSection('typography')} />
          <div className="border border-slate-100 rounded-lg p-3 space-y-3">
            {/* Tab row */}
            <div className="flex gap-1">
              {['Google', 'Custom'].map(t => (
                <button
                  key={t}
                  onClick={() => setFontTab(t as 'Google' | 'Custom')}
                  className={`text-[11px] px-3 py-1 rounded-md font-medium cursor-pointer transition-colors ${fontTab === t ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {fontTab === 'Google' ? (
              <>
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search fonts..."
                  value={state.typography.fontSearch}
                  onChange={e => onPatch('typography', { fontSearch: e.target.value })}
                  className="w-full text-[11px] border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-350"
                />
                {/* Font list */}
                <div className="max-h-52 overflow-y-auto space-y-0.5 -mx-1 px-1">
                  {filteredFonts.map(font => (
                    <button
                      key={font}
                      onClick={() => onPatch('typography', { font })}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors ${state.typography.font === font ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <span className="text-[12px]">{font}</span>
                      <span className={`text-[9px] font-medium uppercase tracking-wider ${state.typography.font === font ? 'text-slate-300' : 'text-slate-400'}`}>
                        Google Font
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-2.5">
                <p className="text-[10px] text-slate-400 leading-normal">
                  Enter any system font or CSS font family (e.g. Georgia, Charter, system-ui).
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Georgia"
                    value={customFontInput}
                    onChange={e => setCustomFontInput(e.target.value)}
                    className="flex-1 text-[11px] border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:border-slate-400 text-slate-700 placeholder:text-slate-350"
                  />
                  <button
                    onClick={() => {
                      if (customFontInput.trim()) {
                        onPatch('typography', { font: customFontInput.trim() })
                      }
                    }}
                    className="bg-slate-900 text-white text-[10px] uppercase font-bold tracking-wider px-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {state.typography.font && (
                  <p className="text-[10px] text-slate-500">
                    Active Font: <span className="font-semibold text-slate-850 font-mono bg-slate-50 px-1 py-0.5 rounded">{state.typography.font}</span>
                  </p>
                )}
              </div>
            )}

            <button
              onClick={onSaveDraft}
              disabled={isSavingDraft}
              className="w-full text-[11px] font-medium bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSavingDraft && <Loader2 size={12} className="animate-spin" />}
              Save Typography Configuration
            </button>
          </div>
        </div>

      </div>

      {/* Footer actions */}
      <div className="px-4 py-3 border-t border-slate-100 space-y-2 shrink-0">
        <button
          onClick={onResetStorefront}
          disabled={isResetting || isSavingDraft || isPublishing}
          className="w-full flex items-center justify-center gap-2 text-[12px] text-red-500 border border-red-100 rounded-lg py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {isResetting ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <RotateCcw size={12} />
          )}
          Reset storefront
        </button>
        <div className="flex gap-2">
          <button
            onClick={onSaveDraft}
            disabled={isResetting || isSavingDraft || isPublishing}
            className="flex-1 text-[12px] font-medium border border-slate-200 rounded-lg py-2 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isSavingDraft && <Loader2 size={12} className="animate-spin" />}
            Save draft
          </button>
          <button
            onClick={onPublish}
            disabled={isResetting || isSavingDraft || isPublishing}
            className="flex-1 text-[12px] font-semibold bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isPublishing && <Loader2 size={12} className="animate-spin" />}
            Publish
          </button>
        </div>
      </div>
    </aside>
  )
}
