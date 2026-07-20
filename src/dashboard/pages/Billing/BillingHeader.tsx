import { Clock, CheckCircle2 } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';

export default function BillingHeader() {
  const { data: sub } = useSubscription();

  const isActive = sub?.status === 'active';
  const daysLeft = sub?.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(sub.trialEndsAt).getTime() - Date.now()) / 86_400_000))
    : null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Nemvol Pricing
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Plans & Billing</h1>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm">
          Launch your online store. Choose a plan built for Nigerian brands.
        </p>
      </div>

      {isActive ? (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 self-start shrink-0">
          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" strokeWidth={1.8} />
          <div>
            <p className="text-[12px] font-semibold text-slate-800 leading-none">Plan active</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {sub?.currentPeriodEnd
                ? `Renews ${new Date(sub.currentPeriodEnd).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
                : 'Subscription active'}
            </p>
          </div>
        </div>
      ) : daysLeft !== null ? (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 border border-orange-100 self-start shrink-0">
          <Clock size={14} className="text-orange-400 shrink-0" strokeWidth={1.8} />
          <div>
            <p className="text-[12px] font-semibold text-slate-800 leading-none">
              {daysLeft} day{daysLeft !== 1 ? 's' : ''} trial left
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Choose a plan to continue</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
