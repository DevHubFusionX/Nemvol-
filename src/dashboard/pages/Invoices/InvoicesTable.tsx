import { useState } from 'react'
import { FileStack, Eye, Trash2 } from 'lucide-react'
import { useInvoices, useUpdateInvoice, useDeleteInvoice, type Invoice, type InvoiceLineItem } from '../../../hooks/useInvoices'
import InvoiceDetailDrawer from './modals/InvoiceDetailDrawer'
import type { InvoiceFilter } from './InvoicesToolbar'

const statusStyles: Record<string, string> = {
  paid:    'bg-emerald-50 text-emerald-600',
  unpaid:  'bg-amber-50 text-amber-500',
  overdue: 'bg-red-50 text-red-500',
  draft:   'bg-slate-100 text-slate-400',
  sent:    'bg-blue-50 text-blue-500',
}

const fmt = (n: string) => '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 0 })

function parseItems(raw?: string): InvoiceLineItem[] {
  try { return raw ? JSON.parse(raw) : [] } catch { return [] }
}

interface Props {
  filter: InvoiceFilter
  q: string
}

export default function InvoicesTable({ filter, q }: Props) {
  const { data, isLoading } = useInvoices(filter === 'all' ? undefined : filter, q || undefined)
  const { mutate: updateInvoice } = useUpdateInvoice()
  const deleteInvoice = useDeleteInvoice()
  const [selected, setSelected] = useState<Invoice | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const invoices = data?.data ?? []

  if (isLoading) return (
    <div className="bg-white rounded-xl border border-slate-100 flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
    </div>
  )

  if (invoices.length === 0) return (
    <div className="bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
        <FileStack size={20} className="text-slate-400" strokeWidth={1.5} />
      </div>
      <p className="text-[14px] font-semibold text-slate-800">No invoices yet</p>
      <p className="text-[12px] text-slate-400 text-center max-w-xs">
        {q ? `No results for "${q}"` : 'Create your first invoice and send it directly to your customer.'}
      </p>
    </div>
  )

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-7 px-5 py-3 border-b border-slate-100">
          {['Invoice #', 'Customer', 'Issued', 'Due Date', 'Amount', 'Status', 'Action'].map(col => (
            <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
          ))}
        </div>

        {/* Desktop rows */}
        <div className="hidden sm:block divide-y divide-slate-50">
          {invoices.map(inv => (
            <div key={inv.id} className="grid grid-cols-7 items-center px-5 py-4">
              <span className="text-[13px] font-semibold text-slate-800">{inv.invoiceNumber}</span>
              <span className="text-[13px] text-slate-600 truncate pr-2">{inv.customerName ?? inv.customerId ?? '—'}</span>
              <span className="text-[12px] text-slate-400">{new Date(inv.createdAt).toLocaleDateString()}</span>
              <span className="text-[12px] text-slate-400">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</span>
              <span className="text-[13px] font-semibold text-slate-800">{fmt(inv.total)}</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit capitalize ${statusStyles[inv.status] ?? 'bg-slate-100 text-slate-400'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {inv.status}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelected(inv)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Eye size={12} strokeWidth={1.8} /> View
                </button>
                {inv.status !== 'paid' && (
                  <button
                    onClick={() => updateInvoice({ id: inv.id, status: 'paid' })}
                    className="text-[12px] font-medium text-emerald-600 hover:underline"
                  >
                    Mark paid
                  </button>
                )}
                <button
                  onClick={() => {
                    if (deletingId) return;
                    setDeletingId(inv.id);
                    deleteInvoice.mutate(inv.id, { onSettled: () => setDeletingId(null) });
                  }}
                  disabled={deletingId === inv.id}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deletingId === inv.id
                    ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                    : <Trash2 size={13} strokeWidth={1.8} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-slate-50">
          {invoices.map(inv => (
            <div key={inv.id} className="px-4 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-slate-800">{inv.invoiceNumber}</span>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusStyles[inv.status] ?? 'bg-slate-100 text-slate-400'}`}>
                  {inv.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-600">{inv.customerName ?? '—'}</span>
                <span className="text-[13px] font-bold text-slate-900">{fmt(inv.total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Due: {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelected(inv)} className="text-[12px] font-medium text-slate-600 hover:underline">View</button>
                  {inv.status !== 'paid' && (
                    <button onClick={() => updateInvoice({ id: inv.id, status: 'paid' })} className="text-[12px] font-medium text-emerald-600 hover:underline">
                      Mark paid
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (deletingId) return;
                      setDeletingId(inv.id);
                      deleteInvoice.mutate(inv.id, { onSettled: () => setDeletingId(null) });
                    }}
                    disabled={deletingId === inv.id}
                    className="p-1 text-slate-300 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    {deletingId === inv.id
                      ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                      : <Trash2 size={13} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InvoiceDetailDrawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        invoiceDbId={selected?.id}
        invoice={selected ? {
          id: selected.invoiceNumber,
          customerName: selected.customerName ?? '',
          customerEmail: selected.customerEmail ?? '',
          issued: new Date(selected.createdAt).toLocaleDateString(),
          dueDate: selected.dueDate ? new Date(selected.dueDate).toLocaleDateString() : '',
          status: selected.status as 'paid' | 'unpaid' | 'overdue' | 'draft' | 'sent',
          items: parseItems(selected.lineItems),
          note: selected.note,
          total: selected.total,
        } : null}
      />
    </>
  )
}
