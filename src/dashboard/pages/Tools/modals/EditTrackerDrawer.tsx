import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, Trash2 } from 'lucide-react'
import { useToolsConfig, useSaveTrackers } from '../../../../hooks/useTools'

export interface TrackerConfig {
  id: string
  name: string
  sub: string
  placeholder: string
  color: string
  description: string
}

interface Props {
  open: boolean
  onClose: () => void
  tracker: TrackerConfig | null
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white font-mono'

export default function EditTrackerDrawer({ open, onClose, tracker }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)
  const { data: config } = useToolsConfig()
  const saveTrackers = useSaveTrackers()

  const [value, setValue] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [confirmDisconnect, setConfirmDisconnect] = useState(false)

  const currentValue = tracker ? (config?.trackers?.[tracker.id] ?? '') : ''
  const isConnected = currentValue.trim().length > 0

  useEffect(() => {
    if (tracker) {
      setValue(currentValue)
      setDone(false)
      setError('')
      setConfirmDisconnect(false)
    }
  }, [tracker, currentValue])

  const handleClose = () => {
    setDone(false)
    setError('')
    setConfirmDisconnect(false)
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
    if (!value.trim()) { setError(`Please enter your ${tracker?.sub}`); return }
    setError('')
    if (submitting.current) return
    submitting.current = true
    saveTrackers.mutate(
      { [tracker!.id]: value.trim() },
      { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false } }
    )
  }

  const handleDisconnect = () => {
    if (submitting.current) return
    submitting.current = true
    saveTrackers.mutate(
      { [tracker!.id]: '' },
      { onSuccess: () => handleClose(), onSettled: () => { submitting.current = false } }
    )
  }

  if (!tracker) return null

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
                    <p className="text-[15px] font-bold text-slate-900">{tracker.name} connected!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      Your {tracker.sub} has been saved. Tracking is now active on your storefront.
                    </p>
                  </motion.div>
                ) : confirmDisconnect ? (
                  <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-16 gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">Disconnect {tracker.name}?</p>
                      <p className="text-[13px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                        Tracking will stop immediately and your {tracker.sub} will be removed.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${tracker.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-[13px] font-bold">{tracker.name[0]}</span>
                      </div>
                      <div>
                        <h2 className="text-[17px] font-bold text-slate-900">{tracker.name}</h2>
                        <p className="text-[12px] text-slate-400">{tracker.description}</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">{tracker.sub}</p>
                      <div>
                        <input
                          type="text"
                          placeholder={tracker.placeholder}
                          value={value}
                          onChange={e => { setValue(e.target.value); setError('') }}
                          className={inputCls}
                          autoFocus
                        />
                        {error && <p className="text-[11px] text-red-500 mt-1">• {error}</p>}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Find your {tracker.sub} in your {tracker.name} dashboard under Settings.
                      </p>
                    </div>

                    {isConnected && (
                      <button
                        onClick={() => setConfirmDisconnect(true)}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={13} strokeWidth={1.8} />
                        Disconnect {tracker.name}
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
              ) : confirmDisconnect ? (
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDisconnect(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDisconnect} disabled={saveTrackers.isPending} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {saveTrackers.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {saveTrackers.isPending ? 'Removing…' : 'Yes, Disconnect'}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saveTrackers.isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {saveTrackers.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {saveTrackers.isPending ? 'Saving…' : isConnected ? 'Update' : 'Connect'}
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
