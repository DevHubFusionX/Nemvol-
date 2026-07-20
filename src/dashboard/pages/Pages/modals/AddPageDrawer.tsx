import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { useCreatePage } from '../../../../hooks/useStorefront'

interface Props {
  open: boolean
  onClose: () => void
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white'

export default function AddPageDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ title: '', slug: '', status: 'draft' as 'draft' | 'published' })
  const createPage = useCreatePage()

  const reset = () => {
    setDone(false)
    setErrors({})
    setForm({ title: '', slug: '', status: 'draft' })
  }

  const handleClose = () => { reset(); onClose() }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setForm(p => ({ ...p, title, slug }))
  }

  const handleSubmit = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = 'Page title is required'
    if (!form.slug.trim()) errs.slug = 'Slug is required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    if (submitting.current) return
    submitting.current = true
    createPage.mutate(
      { title: form.title, slug: form.slug, published: form.status === 'published' ? 'true' : 'false' },
      { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false } }
    )
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) handleClose() }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            <button onClick={handleClose} className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10">
              <X size={15} strokeWidth={2} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-16 gap-3">
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Page created!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.title}</span> has been added to your storefront pages.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Add New Page</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Create a custom page for your storefront.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Page Details</p>
                      <div>
                        <input type="text" placeholder="Page title *" value={form.title} onChange={handleTitleChange} className={inputCls} />
                        {errors.title && <p className="text-[11px] text-red-500 mt-1">• {errors.title}</p>}
                      </div>
                      <div>
                        <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden focus-within:border-slate-400 transition-colors">
                          <span className="px-3 py-2.5 text-[13px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">/pages/</span>
                          <input
                            type="text"
                            placeholder="page-slug"
                            value={form.slug}
                            onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                            className="flex-1 px-3 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-300 bg-white outline-none"
                          />
                        </div>
                        {errors.slug && <p className="text-[11px] text-red-500 mt-1">• {errors.slug}</p>}
                      </div>
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-slate-800 mb-2">Initial Status</p>
                      <div className="flex gap-2">
                        {(['draft', 'published'] as const).map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, status: s }))}
                            className={`flex-1 py-2.5 rounded-xl text-[12px] font-semibold transition-colors border ${
                              form.status === s
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {s === 'draft' ? 'Save as Draft' : 'Publish Now'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {done ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} disabled={createPage.isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {createPage.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {createPage.isPending ? 'Creating…' : 'Create Page'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
