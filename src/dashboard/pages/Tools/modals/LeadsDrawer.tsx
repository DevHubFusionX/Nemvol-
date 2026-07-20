import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Search, Download, Users, Trash2 } from 'lucide-react'
import { useToolLeads, useDeleteToolLead } from '../../../../hooks/useTools'

interface Props {
  open: boolean
  onClose: () => void
}

export default function LeadsDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const { data, isLoading } = useToolLeads(query || undefined)
  const deleteLead = useDeleteToolLead()
  const [deletingId, setDeletingId] = useState('')

  const leads = data?.data ?? []
  const total = data?.total ?? 0

  const handleClose = () => { setQuery(''); onClose() }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const handleExport = () => {
    if (!leads.length) return
    const rows = [
      ['Name', 'Email', 'Phone', 'Captured At'],
      ...leads.map(l => [l.name ?? '', l.email ?? '', l.phone ?? '', new Date(l.createdAt).toLocaleDateString()]),
    ]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'leads.csv'; a.click()
    URL.revokeObjectURL(url)
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

            <div className="px-6 pt-12 pb-4 border-b border-slate-100 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[17px] font-bold text-slate-900">Access Gate Leads</h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    {total} contact{total !== 1 ? 's' : ''} captured
                  </p>
                </div>
                <button
                  onClick={handleExport}
                  disabled={!leads.length}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40"
                >
                  <Download size={13} strokeWidth={1.8} />
                  Export
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 focus-within:border-slate-400 transition-colors">
                <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
                <input
                  type="text"
                  placeholder="Search by name or email…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-16">
                  <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
                </div>
              ) : leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Users size={20} className="text-slate-400" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] font-semibold text-slate-800">No leads found</p>
                  <p className="text-[12px] text-slate-400 text-center max-w-xs">
                    {query ? 'Try a different search term.' : 'Enable the access gate to start capturing leads.'}
                  </p>
                </div>
              ) : (
                leads.map((lead, i) => (
                  <div key={lead.id} className={`px-6 py-4 flex items-center gap-3 ${i < leads.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-slate-500">
                        {(lead.name ?? lead.email ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      {lead.name && <p className="text-[13px] font-semibold text-slate-800 truncate">{lead.name}</p>}
                      {lead.email && <p className="text-[12px] text-slate-400 truncate">{lead.email}</p>}
                      {lead.phone && <p className="text-[12px] text-slate-400">{lead.phone}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <button
                        onClick={() => deleteLead.mutate(lead.id)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={13} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              <button onClick={handleClose} className="w-full py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
