import { MessageSquareOff } from 'lucide-react';

const cols = ['Customer', 'Product', 'Rating', 'Review', 'Date', 'Status', 'Action'];

export default function ReviewsList() {
  const isEmpty = true;

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="hidden sm:grid grid-cols-7 px-5 py-3 border-b border-slate-100">
        {cols.map((col) => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {col}
          </span>
        ))}
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <MessageSquareOff size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No reviews available</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            Customer reviews will appear here once they start rating your products.
          </p>
        </div>
      )}
    </div>
  );
}
