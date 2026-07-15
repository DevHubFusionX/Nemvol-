import { CreditCard } from 'lucide-react';

export default function PlanBanner() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 rounded-xl border border-orange-100 bg-orange-50">
      <div className="flex items-start gap-3">
        <CreditCard size={16} className="text-orange-400 shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-[13px] font-semibold text-slate-800">
            Free Trial plan selected. Payment is pending.
          </p>
          <p className="text-[11px] text-slate-400">
            Complete payment to activate your subscription.
          </p>
        </div>
      </div>
      <span className="self-start sm:self-auto flex items-center gap-1.5 text-[11px] font-semibold text-orange-500 bg-orange-100 px-3 py-1.5 rounded-full shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
        Payment Pending
      </span>
    </div>
  );
}
