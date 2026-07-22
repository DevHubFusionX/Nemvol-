import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Check, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { useCreatePage, useUpdatePage, useDeletePage, type StorePage } from '../../../../hooks/useStorefront'
import { type Block, type LayoutTemplate, blocksToHtml, htmlToBlocks } from './blocks'
import LayoutPicker from './LayoutPicker'
import BlockCanvas from './BlockCanvas'
import SettingsPanel from './SettingsPanel'

interface Props {
  mode: 'add' | 'edit'
  page: StorePage | null
  onClose: () => void
}

export default function PageEditor({ mode, page, onClose }: Props) {
  const submitting = useRef(false)
  const createPage = useCreatePage()
  const updatePage = useUpdatePage()
  const deletePage = useDeletePage()

  // Step: 'pick' (layout picker, add only) | 'edit' (canvas)
  const [step, setStep]           = useState<'pick' | 'edit'>(mode === 'edit' ? 'edit' : 'pick')
  const [blocks, setBlocks]       = useState<Block[]>([])
  const [title, setTitle]         = useState('')
  const [slug, setSlug]           = useState('')
  const [published, setPublished] = useState('false')
  const [showSettings, setShowSettings] = useState(true)
  const [showPreview, setShowPreview]   = useState(false)
  const [saved, setSaved]         = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [errors, setErrors]       = useState<Record<string, string>>({})

  const isSystem = page?.isSystem ?? false

  // Hydrate when editing
  useEffect(() => {
    if (mode === 'edit' && page) {
      setTitle(page.title)
      setSlug(page.slug)
      setPublished(page.published)
      setBlocks(htmlToBlocks(page.content ?? ''))
    }
  }, [mode, page])

  const handleLayoutSelect = (template: LayoutTemplate) => {
    setBlocks(template.blocks.map(b => ({ ...b, id: Math.random().toString(36).slice(2, 9) })))
    setStep('edit')
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = 'Title is required'
    if (!slug.trim())  errs.slug  = 'Slug is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    if (submitting.current) return
    submitting.current = true
    const content = blocksToHtml(blocks)

    if (mode === 'add') {
      createPage.mutate(
        { title, slug, content, published },
        {
          onSuccess: () => { setSaved(true); setTimeout(onClose, 1200) },
          onSettled: () => { submitting.current = false },
        }
      )
    } else if (page) {
      updatePage.mutate(
        { id: page.id, title, slug, content, published },
        {
          onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000) },
          onSettled: () => { submitting.current = false },
        }
      )
    }
  }

  const handleDelete = () => {
    if (!page || isSystem) return
    if (submitting.current) return
    submitting.current = true
    deletePage.mutate(page.id, {
      onSuccess: onClose,
      onSettled: () => { submitting.current = false },
    })
  }

  const isPending = createPage.isPending || updatePage.isPending

  // ── Preview ────────────────────────────────────────────────────────────────
  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowPreview(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <p className="text-[14px] font-bold text-slate-900">Preview — {title || 'Untitled'}</p>
          </div>
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <EyeOff size={13} strokeWidth={1.8} /> Close Preview
          </button>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-8 max-w-3xl mx-auto">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: blocksToHtml(blocks) }}
          />
        </div>
      </div>
    )
  }

  // ── Delete confirm ─────────────────────────────────────────────────────────
  if (confirmDelete) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-white rounded-xl border border-slate-100">
          <button onClick={() => setConfirmDelete(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <p className="text-[14px] font-bold text-slate-900">Delete Page</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-8 flex flex-col items-center text-center gap-4 max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <AlertTriangle size={22} className="text-red-500" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-slate-900">Delete "{title}"?</p>
            <p className="text-[13px] text-slate-400 mt-1">This page will be permanently removed from your storefront. This cannot be undone.</p>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deletePage.isPending}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {deletePage.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {deletePage.isPending ? 'Deleting…' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Layout picker (add mode only) ──────────────────────────────────────────
  if (step === 'pick') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div>
              <p className="text-[15px] font-bold text-slate-900">New Page</p>
              <p className="text-[12px] text-slate-400">Choose a starting layout</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <LayoutPicker onSelect={handleLayoutSelect} />
        </div>
      </div>
    )
  }

  // ── Main editor ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white rounded-xl border border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <div>
            <p className="text-[14px] font-bold text-slate-900">{title || 'Untitled Page'}</p>
            <p className="text-[11px] text-slate-400">/pages/{slug || '…'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Validation errors */}
          {(errors.title || errors.slug) && (
            <p className="text-[11px] text-red-500 hidden sm:block">
              {errors.title || errors.slug}
            </p>
          )}
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Eye size={13} strokeWidth={1.8} />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            onClick={() => setShowSettings(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${showSettings ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Settings
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all disabled:opacity-60 text-white"
            style={{ backgroundColor: saved ? '#16a34a' : '#0f172a' }}
          >
            {isPending
              ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
              : saved
              ? <><Check size={14} strokeWidth={2.5} /> Saved!</>
              : mode === 'add' ? 'Publish Page' : 'Save Changes'
            }
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={`grid gap-4 ${showSettings ? 'grid-cols-1 lg:grid-cols-[1fr_280px]' : 'grid-cols-1'}`}>
        {/* Canvas */}
        <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 sm:p-6 min-h-[60vh]">
          <BlockCanvas blocks={blocks} onChange={setBlocks} />
        </div>

        {/* Settings sidebar */}
        {showSettings && (
          <div>
            <SettingsPanel
              title={title}
              slug={slug}
              published={published}
              isEdit={mode === 'edit'}
              isSystem={isSystem}
              onTitleChange={setTitle}
              onSlugChange={setSlug}
              onPublishedChange={setPublished}
              onDelete={() => setConfirmDelete(true)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
