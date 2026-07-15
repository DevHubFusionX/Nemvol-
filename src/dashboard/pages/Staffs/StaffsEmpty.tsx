import { Users } from 'lucide-react';

export default function StaffsEmpty() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 py-16 flex flex-col items-center text-center">
      <div className="relative w-24 h-24 mb-6">
        {/* Avatar cluster illustration using colored circles */}
        <div className="absolute top-0 left-2 w-11 h-11 rounded-full bg-sky-100 flex items-center justify-center border-2 border-white">
          <Users size={18} className="text-sky-400" strokeWidth={1.6} />
        </div>
        <div className="absolute top-0 right-2 w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center border-2 border-white">
          <Users size={18} className="text-amber-400" strokeWidth={1.6} />
        </div>
        <div className="absolute bottom-0 left-2 w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white">
          <Users size={18} className="text-emerald-400" strokeWidth={1.6} />
        </div>
        <div className="absolute bottom-0 right-2 w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white">
          <Users size={18} className="text-slate-400" strokeWidth={1.6} />
        </div>
      </div>
      <p className="text-[14px] font-bold text-slate-900 mb-1">No Staff Members Yet</p>
      <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
        You haven't added any staff to your store. Invite team members to help you manage orders, products, and customers more efficiently.
      </p>
    </div>
  );
}
