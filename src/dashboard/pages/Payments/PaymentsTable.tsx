import { Wallet } from 'lucide-react'
import type { Transaction } from '../../../hooks/usePayments'

const statusStyle: Record<string, string> = {
  pending:    'bg-amber-50 text-amber-600',
  confirmed:  'bg-blue-50 text-blue-600',
  processing: 'bg-blue-50 text-blue-600',
  shipped:    'bg-indigo-50 text-indigo-600',
  delivered:  'bg-emerald-50 text-emerald-600',
  cancelled:  'bg-red-50 text-red-500',
  refunded:   'bg-slate-100 text-slate-500',
}

const fmt = (n: string) =>
  '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 0 })

interface Props {
  transactions: Transaction[]
  isLoading: boolean
}

export default function PaymentsTable({ transactions, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 p-10 flex justify-center">
        <span className="text-[13px] text-slate-400">Loading transactions…</span>
      </div>
    )
  }

  if (!transactions.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="hidden sm:grid grid-cols-6 px-5 py-3 border-b border-slate-100">
          {['Reference', 'Customer', 'Amount', 'Date', 'Status', 'Method'].map(col => (
            <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <Wallet size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No transactions yet</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            Payments from your customers will appear here once orders start coming in.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      {/* Desktop header */}
      <div className="hidden sm:grid grid-cols-6 px-5 py-3 border-b border-slate-100">
        {['Reference', 'Customer', 'Amount', 'Date', 'Status', 'Method'].map(col => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
        ))}
      </div>

      {/* Desktop rows */}
      <div className="hidden sm:block divide-y divide-slate-50">
        {transactions.map(tx => {
          const name = [tx.customer?.firstName, tx.customer?.lastName].filter(Boolean).join(' ') || tx.customer?.email || '—'
          return (
            <div key={tx.id} className="grid grid-cols-6 items-center px-5 py-3.5">
              <span className="text-[12px] font-mono text-slate-600">{tx.orderNumber}</span>
              <span className="text-[13px] text-slate-700 truncate pr-2">{name}</span>
              <span className="text-[13px] font-semibold text-slate-900">{fmt(tx.total)}</span>
              <span className="text-[12px] text-slate-400">
                {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className={`inline-flex w-fit px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize ${statusStyle[tx.status] ?? 'bg-slate-100 text-slate-500'}`}>
                {tx.status}
              </span>
              <span className="text-[12px] text-slate-400">—</span>
            </div>
          )
        })}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-slate-50">
        {transactions.map(tx => {
          const name = [tx.customer?.firstName, tx.customer?.lastName].filter(Boolean).join(' ') || tx.customer?.email || '—'
          return (
            <div key={tx.id} className="px-4 py-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono text-slate-500">{tx.orderNumber}</span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize ${statusStyle[tx.status] ?? 'bg-slate-100 text-slate-500'}`}>
                  {tx.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-700">{name}</span>
                <span className="text-[13px] font-bold text-slate-900">{fmt(tx.total)}</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
