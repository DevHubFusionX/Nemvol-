import { Eye, Monitor, Smartphone, Tablet, Maximize2, Minimize2 } from 'lucide-react'
import type { ThemeBuilderState } from './useThemeBuilder'
import { useStorefrontConfig } from '../../../hooks/useStorefront'

interface Props {
  viewport: ThemeBuilderState['viewport']
  onViewport: (v: ThemeBuilderState['viewport']) => void
  fullscreen: boolean
  onFullscreen: () => void
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  onIframeLoad: () => void
}

const VIEWPORTS: { id: ThemeBuilderState['viewport']; icon: typeof Monitor; label: string }[] = [
  { id: 'responsive', icon: Monitor, label: 'Responsive' },
  { id: 'tablet', icon: Tablet, label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
]

const WIDTH: Record<ThemeBuilderState['viewport'], string> = {
  responsive: 'w-full',
  tablet: 'w-[768px]',
  mobile: 'w-[390px]',
}

export default function BuilderPreview({ viewport, onViewport, fullscreen, onFullscreen, iframeRef, onIframeLoad }: Props) {
  const { data: config } = useStorefrontConfig()
  const slug = config?.slug ?? ''
  const previewUrl = slug ? `/store/${slug}` : null

  return (
    <div className={`flex flex-col bg-slate-100 ${fullscreen ? 'fixed inset-0 z-50' : 'h-full flex-1'}`}>
      {/* Toolbar */}
      <div className="h-10 flex items-center justify-between px-4 bg-white border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-1">
          {VIEWPORTS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onViewport(id)}
              title={label}
              className={`p-1.5 rounded transition-colors ${viewport === id ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'}`}
            >
              <Icon size={13} strokeWidth={1.8} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 uppercase tracking-widest">
            {viewport === 'responsive' ? 'Responsive viewport' : viewport === 'tablet' ? '768px' : '390px'}
          </span>
          <span className="text-[11px] bg-slate-900 text-white px-2 py-0.5 rounded-full">1 Layer</span>
          <button
            onClick={onFullscreen}
            className="flex items-center gap-1 text-[11px] font-medium bg-slate-900 text-white px-2.5 py-1 rounded-full hover:bg-slate-700 transition-colors"
          >
            {fullscreen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
            {fullscreen ? 'Exit' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        <div className={`${WIDTH[viewport]} h-full min-h-[600px] bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300`}>
          {previewUrl ? (
            <iframe
              ref={iframeRef}
              src={previewUrl}
              title="Storefront preview"
              className="w-full h-full border-0"
              style={{ minHeight: 600 }}
              onLoad={onIframeLoad}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
              <Eye size={32} strokeWidth={1} />
              <p className="text-sm">No storefront published yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
