import { CreditCard } from 'lucide-react';
import { useSubscription } from '../../../hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

export default function PlanBanner() {
  const { data: sub } = useSubscription();
  const navigate = useNavigate();

  if (!sub || sub.status === 'active') return null;

  const isTrialing = sub.status === 'trialing';
  const daysLeft = sub.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(sub.trialEndsAt).getTime() - Date.now()) / 86_400_000))
    : 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 rounded-xl border border-orange-100 bg-orange-50">
      <div className="flex items-start gap-3">
        <CreditCard size={16} className="text-orange-400 shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-[13px] font-semibold text-slate-800">
            {isTrialing ? `Free trial — ${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining.` : 'Your subscription requires attention.'}
          </p>
          <p className="text-[11px] text-slate-400">
            {isTrialing ? 'Choose a plan to keep your store running after the trial.' : 'Renew your plan to restore full access.'}
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/dashboard/billing')}
        className="self-start sm:self-auto flex items-center gap-1.5 text-[11px] font-semibold text-orange-500 bg-orange-100 px-3 py-1.5 rounded-full shrink-0 hover:bg-orange-200 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
        {isTrialing ? 'Choose a Plan' : 'Renew Now'}
      </button>
    </div>
  );
}
