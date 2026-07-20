import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, Trash2 } from 'lucide-react'
import { useUpdatePage, useDeletePage, type StorePage } from '../../../../hooks/useStorefront'

interface Props {
  open: boolean
  onClose: () => void
  page: StorePage | null
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white'

export default function EditPageDrawer({ open, onClose, page }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)
  const [done, setDone] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', published: 'false' })
  const updatePage = useUpdatePage()
  const deletePage = useDeletePage()

  useEffect(() => {
    if (page) {
      setForm({ title: page.title, content: page.content ?? '', published: page.published })
      setDone(false)
      setConfirmDelete(false)
    }
  }, [page])

  const handleClose = () => {
    setDone(false)
    setConfirmDelete(false)
    onClose()
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const handleSave = () => {
    if (!page) return
    if (page.isSystem) { setDone(true); return }
    if (submitting.current) return
    submitting.current = true
    updatePage.mutate(
      { id: page.id, title: form.title, content: form.content, published: form.published },
      { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false } }
    )
  }

  const handleDelete = () => {
    if (!page || page.isSystem) return
    if (submitting.current) return
    submitting.current = true
    deletePage.mutate(page.id, { onSuccess: () => handleClose(), onSettled: () => { submitting.current = false } })
  }

  if (!page) return null

  const isCustom = !page.isSystem

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
                    <p className="text-[15px] font-bold text-slate-900">Page updated!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.title}</span> has been saved as{' '}
                      <span className="font-semibold text-slate-700">{form.published === 'true' ? 'Published' : 'Draft'}</span>.
                    </p>
                  </motion.div>
                ) : confirmDelete ? (
                  <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-16 gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">Delete this page?</p>
                      <p className="text-[13px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                        <span className="font-semibold text-slate-700">{page.title}</span> will be permanently removed from your storefront.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                        {page.isSystem ? 'System Page' : 'Custom Page'}
                      </p>
                      <h2 className="text-[17px] font-bold text-slate-900">Edit Page</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Update the content and visibility of this page.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Page Details</p>
                      <input
                        type="text"
                        placeholder="Page title"
                        value={form.title}
                        onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                        className={inputCls}
                        disabled={!isCustom}
                      />
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Content</label>
                        <textarea
                          rows={8}
                          placeholder="Write your page content here…"
                          value={form.content}
                          onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-slate-800 mb-2">Visibility</p>
                      <div className="flex gap-2">
                        {(['false', 'true'] as const).map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, published: val }))}
                            className={`flex-1 py-2.5 rounded-xl text-[12px] font-semibold transition-colors border ${
                              form.published === val
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {val === 'false' ? 'Draft' : 'Published'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {isCustom && (
                      <button
                        onClick={() => setConfirmDelete(true)}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={13} strokeWidth={1.8} />
                        Delete this page
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {done ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              ) : confirmDelete ? (
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDelete(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDelete} disabled={deletePage.isPending} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {deletePage.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {deletePage.isPending ? 'Deleting…' : 'Yes, Delete'}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={updatePage.isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {updatePage.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {updatePage.isPending ? 'Saving…' : 'Save Changes'}
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
