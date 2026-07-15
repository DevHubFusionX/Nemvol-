import { Receipt } from 'lucide-react';

export default function ExpensesView() {
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[14px] font-semibold text-slate-900">Expenses</p>
        <p className="text-[12px] text-slate-400 mt-0.5">
          Track outgoing costs and business expenses
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
          <Receipt size={20} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-[14px] font-semibold text-slate-800">No expenses recorded</p>
        <p className="text-[12px] text-slate-400 text-center max-w-xs">
          Log your business expenses here to keep your finances in order.
        </p>
      </div>
    </div>
  );
}
