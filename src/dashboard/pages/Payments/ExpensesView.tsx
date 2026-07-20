import { Plus, Receipt, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useExpenses, useDeleteExpense } from '../../../hooks/usePayments'

const fmt = (n: string) =>
  '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 0 })

interface Props {
  onLogExpense: () => void
}

export default function ExpensesView({ onLogExpense }: Props) {
  const { data, isLoading } = useExpenses()
  const deleteExpense = useDeleteExpense()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const expenses = data?.data ?? []

  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Expenses</p>
          <p className="text-[12px] text-slate-400 mt-0.5">Track outgoing costs and business expenses</p>
        </div>
        <button
          onClick={onLogExpense}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors self-start sm:self-auto"
        >
          <Plus size={14} strokeWidth={2.5} />
          Log Expense
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <span className="text-[13px] text-slate-400">Loading…</span>
        </div>
      ) : expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <Receipt size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No expenses recorded</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            Log your business expenses here to keep your finances in order.
          </p>
          <button
            onClick={onLogExpense}
            className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            Log Expense
          </button>
        </div>
      ) : (
        <>
          {/* Desktop header */}
          <div className="hidden sm:grid grid-cols-5 px-5 py-3 border-b border-slate-100">
            {['Title', 'Category', 'Amount', 'Date', ''].map(col => (
              <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
            ))}
          </div>

          <div className="divide-y divide-slate-50">
            {expenses.map(exp => (
              <div key={exp.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-5 items-center gap-3 px-5 py-3.5">
                <div className="sm:contents">
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{exp.title}</p>
                    {exp.note && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{exp.note}</p>}
                  </div>
                  <span className="hidden sm:inline-flex w-fit px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-500">
                    {exp.category}
                  </span>
                  <span className="hidden sm:block text-[13px] font-semibold text-slate-900">{fmt(exp.amount)}</span>
                  <span className="hidden sm:block text-[12px] text-slate-400">
                    {exp.date ? new Date(`${exp.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </span>
                </div>

                {/* Mobile: amount + delete */}
                <div className="sm:hidden flex flex-col items-end gap-1">
                  <span className="text-[13px] font-bold text-slate-900">{fmt(exp.amount)}</span>
                  <span className="text-[11px] text-slate-400">{exp.category}</span>
                </div>

                <button
                  onClick={() => {
                    if (deletingId) return;
                    setDeletingId(exp.id);
                    deleteExpense.mutate(exp.id, { onSettled: () => setDeletingId(null) });
                  }}
                  disabled={deletingId === exp.id}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deletingId === exp.id
                    ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                    : <Trash2 size={13} strokeWidth={1.8} />}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
