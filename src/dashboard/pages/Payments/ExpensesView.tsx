import { Plus, Receipt } from 'lucide-react';

interface Props {
  onLogExpense: () => void;
}

export default function ExpensesView({ onLogExpense }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Expenses</p>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Track outgoing costs and business expenses
          </p>
        </div>
        <button
          onClick={onLogExpense}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors self-start sm:self-auto"
        >
          <Plus size={14} strokeWidth={2.5} />
          Log Expense
        </button>
      </div>
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
    </div>
  );
}
