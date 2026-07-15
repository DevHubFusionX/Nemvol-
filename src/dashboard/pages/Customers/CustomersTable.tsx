import { Users } from 'lucide-react';

const cols = ['Customer', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined', 'Action'];

export default function CustomersTable() {
  const isEmpty = true;

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="grid grid-cols-7 px-5 py-3 border-b border-slate-100">
        {cols.map((col) => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {col}
          </span>
        ))}
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <Users size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No customers found yet</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            You'll see your customers here once they place an order or you manually add them.
          </p>
        </div>
      )}
    </div>
  );
}
