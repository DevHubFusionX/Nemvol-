import { ArrowLeft, Settings } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeBuilder, INITIAL } from './useThemeBuilder'
import type { Section, ThemeBuilderState } from './useThemeBuilder'
import BuilderSidebar from './BuilderSidebar'
import BuilderPreview from './BuilderPreview'
import BuilderSectionPanel from './BuilderSectionPanel'
import { useStorefrontConfig, useUpdateStorefrontConfig } from '../../../hooks/useStorefront'
import { toast } from 'sonner'
import { api } from '../../../lib/api'

export default function ThemeBuilder() {
  const { state, set, patch, setState } = useThemeBuilder()
  const [fullscreen, setFullscreen] = useState(false)
  const navigate = useNavigate()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const { data: config, isLoading } = useStorefrontConfig()
  const update = useUpdateStorefrontConfig()

  // For button spinner/loading indicators
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  // Initialize builder state from database
  useEffect(() => {
    if (!config) return
    let parsed: any = {}
    if (config.heroData) {
      try {
        parsed = JSON.parse(config.heroData)
      } catch (e) {
        console.error('Failed to parse heroData', e)
      }
    }
    setState(s => ({
      ...s,
      ...parsed,
      colors: {
        primary: config.accentColor || s.colors.primary,
        secondary: parsed.colors?.secondary || s.colors.secondary,
      },
      // Keep UI variables intact
      activeSection: s.activeSection,
      viewport: s.viewport,
    }))
  }, [config, setState])

  // Send current state to iframe
  const postToIframe = useCallback((s: ThemeBuilderState) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'THEME_BUILDER_UPDATE', state: s }, '*')
  }, [])

  // Sync state to preview iframe via postMessage
  useEffect(() => {
    postToIframe(state)
  }, [state, postToIframe])

  // Re-send state after iframe finishes loading (catches initial load race)
  const handleIframeLoad = useCallback(() => {
    postToIframe(state)
  }, [state, postToIframe])

  function handleVariant(section: keyof ThemeBuilderState, id: string) {
    patch(section, { variant: id } as never)
  }

  // File Upload Helper
  async function handleUploadImage(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const dataUrl = ev.target?.result as string
        const base64 = dataUrl.split(',')[1]
        try {
          const res = await api.post('/upload', { base64, mimeType: file.type, folder: 'theme' })
          resolve(res.data.url)
        } catch (e) {
          reject(e)
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Action: Save Draft
  async function handleSaveDraft() {
    setIsSaving(true)
    try {
      await update.mutateAsync({
        heroData: JSON.stringify(state),
        accentColor: state.colors.primary,
      })
      toast.success('Draft settings saved successfully')
    } catch (e) {
      toast.error('Failed to save draft settings')
    } finally {
      setIsSaving(false)
    }
  }

  // Action: Publish
  async function handlePublish() {
    setIsPublishing(true)
    try {
      await update.mutateAsync({
        heroData: JSON.stringify(state),
        accentColor: state.colors.primary,
        published: 'true',
      })
      toast.success('Theme published and storefront is live!')
    } catch (e) {
      toast.error('Failed to publish theme')
    } finally {
      setIsPublishing(false)
    }
  }

  // Action: Reset Storefront
  async function handleResetStorefront() {
    if (!window.confirm('Are you sure you want to reset all theme customizations back to default values?')) {
      return
    }
    setIsResetting(true)
    try {
      await update.mutateAsync({
        heroData: '',
        accentColor: '#a8956a',
        theme: 'nubia',
      })
      setState({
        ...INITIAL,
        viewport: state.viewport,
        activeSection: state.activeSection,
      })
      toast.success('Storefront theme configuration reset successfully')
    } catch (e) {
      toast.error('Failed to reset storefront configuration')
    } finally {
      setIsResetting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <span className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading theme settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top bar — hidden in fullscreen */}
      {!fullscreen && (
        <header className="h-12 shrink-0 flex items-center gap-3 px-4 border-b border-slate-100 bg-white z-10">
          <button
            onClick={() => navigate('/dashboard/storefront')}
            className="flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.8} />
            Back
          </button>
          <div className="w-px h-4 bg-slate-200" />
          <Settings size={13} className="text-slate-400" strokeWidth={1.8} />
          <span className="text-[13px] font-semibold text-slate-900">Theme settings</span>
          <span className="text-[11px] text-slate-400">Customize your store appearance</span>
        </header>
      )}

      {/* 3-panel body */}
      <div className="flex flex-1 overflow-hidden">
        {!fullscreen && (
          <BuilderSidebar
            state={state}
            onSection={(s: Section) => set('activeSection', s)}
            onVariant={handleVariant}
            onPatch={patch}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            onResetStorefront={handleResetStorefront}
            isSavingDraft={isSaving}
            isPublishing={isPublishing}
            isResetting={isResetting}
            onUploadImage={handleUploadImage}
          />
        )}

        <BuilderPreview
          viewport={state.viewport}
          onViewport={v => set('viewport', v)}
          fullscreen={fullscreen}
          onFullscreen={() => setFullscreen(f => !f)}
          iframeRef={iframeRef}
          onIframeLoad={handleIframeLoad}
        />

        {!fullscreen && (
          <BuilderSectionPanel
            section={state.activeSection}
            state={state}
            onPatch={patch}
            onUploadImage={handleUploadImage}
          />
        )}
      </div>
    </div>
  )
}
