import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Download, Send } from 'lucide-react'
import { useUpdateInvoice } from '../../../../hooks/useInvoices'

export interface Invoice {
  id: string
  customerName: string
  customerEmail: string
  issued: string
  dueDate: string
  items: { description: string; qty: number; price: number }[]
  status: 'paid' | 'unpaid' | 'overdue' | 'draft' | 'sent'
  note?: string
  total?: string
}

interface Props {
  open: boolean
  onClose: () => void
  invoice: Invoice | null
  invoiceDbId?: string
}

const statusStyles: Record<string, string> = {
  paid:    'bg-emerald-50 text-emerald-600',
  unpaid:  'bg-amber-50 text-amber-500',
  overdue: 'bg-red-50 text-red-500',
  draft:   'bg-slate-100 text-slate-400',
  sent:    'bg-blue-50 text-blue-500',
}

export default function InvoiceDetailDrawer({ open, onClose, invoice, invoiceDbId }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const printRef = useRef<HTMLDivElement>(null)
  const { mutate: updateInvoice, isPending } = useUpdateInvoice()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const itemsTotal = invoice?.items.reduce((s, i) => s + i.qty * i.price, 0) ?? 0
  const displayTotal = invoice?.total
    ? '₦' + Number(invoice.total).toLocaleString('en-NG')
    : '₦' + itemsTotal.toLocaleString('en-NG')

  const handleDownload = () => {
    if (!printRef.current || !invoice) return
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`
      <html><head><title>${invoice.id}</title>
      <style>
        body { font-family: sans-serif; padding: 40px; color: #1e293b; }
        h1 { font-size: 22px; margin-bottom: 4px; }
        .meta { color: #94a3b8; font-size: 13px; margin-bottom: 24px; }
        .section { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; font-size: 11px; text-transform: uppercase; color: #94a3b8; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        td { padding: 10px 0; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
        .total-row { font-weight: bold; font-size: 15px; }
        .note { font-size: 13px; color: #475569; }
      </style></head><body>
      <h1>${invoice.id}</h1>
      <div class="meta">Issued ${invoice.issued}${invoice.dueDate ? ` · Due ${invoice.dueDate}` : ''} · Status: ${invoice.status}</div>
      <div class="section"><div class="label">Bill To</div>
        <strong>${invoice.customerName}</strong><br/>${invoice.customerEmail}
      </div>
      ${invoice.items.length > 0 ? `
      <div class="section">
        <table>
          <tr><th>Description</th><th>Qty</th><th>Amount</th></tr>
          ${invoice.items.map(i => `<tr><td>${i.description}</td><td>${i.qty}</td><td>₦${(i.qty * i.price).toLocaleString()}</td></tr>`).join('')}
          <tr class="total-row"><td colspan="2">Total</td><td>${displayTotal}</td></tr>
        </table>
      </div>` : `<div class="section"><strong>Total: ${displayTotal}</strong></div>`}
      ${invoice.note ? `<div class="section"><div class="label">Note</div><div class="note">${invoice.note}</div></div>` : ''}
      </body></html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  const handleSend = () => {
    if (!invoiceDbId || invoice?.status === 'paid') return
    updateInvoice({ id: invoiceDbId, status: 'sent' }, { onSuccess: onClose })
  }

  return createPortal(
    <AnimatePresence>
      {open && invoice && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) onClose() }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            <button onClick={onClose} className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10">
              <X size={15} strokeWidth={2} />
            </button>

            <div ref={printRef} className="flex-1 overflow-y-auto px-6 pt-12 pb-4 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[17px] font-bold text-slate-900">{invoice.id}</h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Issued {invoice.issued}{invoice.dueDate ? ` · Due ${invoice.dueDate}` : ''}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusStyles[invoice.status] ?? 'bg-slate-100 text-slate-400'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {invoice.status}
                </span>
              </div>

              <div className="rounded-xl border border-slate-100 p-4 space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Bill To</p>
                <p className="text-[13px] font-semibold text-slate-800">{invoice.customerName || '—'}</p>
                {invoice.customerEmail && <p className="text-[12px] text-slate-400">{invoice.customerEmail}</p>}
              </div>

              {invoice.items.length > 0 ? (
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-slate-100">
                    {['Description', 'Qty', 'Amount'].map(h => (
                      <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{h}</span>
                    ))}
                  </div>
                  {invoice.items.map((item, i) => (
                    <div key={i} className={`grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 items-center ${i < invoice.items.length - 1 ? 'border-b border-slate-100' : ''}`}>
                      <span className="text-[13px] text-slate-700">{item.description}</span>
                      <span className="text-[13px] text-slate-500 text-center">{item.qty}</span>
                      <span className="text-[13px] font-semibold text-slate-800">₦{(item.qty * item.price).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
                    <span className="text-[12px] font-semibold text-slate-500">Total</span>
                    <span className="text-[15px] font-bold text-slate-900">{displayTotal}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-100 p-4 flex items-center justify-between">
                  <span className="text-[13px] text-slate-500">Total</span>
                  <span className="text-[15px] font-bold text-slate-900">{displayTotal}</span>
                </div>
              )}

              {invoice.note && (
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Note</p>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{invoice.note}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-1.5 flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Download size={14} strokeWidth={1.8} />
                Download
              </button>
              {invoice.status !== 'paid' && invoice.status !== 'sent' && (
                <button
                  onClick={handleSend}
                  disabled={isPending}
                  className="flex items-center justify-center gap-1.5 flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60"
                >
                  {isPending
                    ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Send size={14} strokeWidth={1.8} />}
                  {isPending ? 'Sending…' : 'Mark as Sent'}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
