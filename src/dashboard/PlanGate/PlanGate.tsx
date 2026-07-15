import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Building2, Clock } from 'lucide-react';
import { usePlanGate } from './PlanGateContext';
import type { PlanId } from './PlanGateContext';
import PaymentDrawer from './PaymentDrawer';

const plans: {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  icon: React.ReactNode;
  badge?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '₦0',
    period: '5 days',
    icon: <Clock size={18} strokeWidth={1.5} />,
    badge: '5-day trial',
    features: ['All features unlocked', 'Up to 10 products', 'Basic analytics', 'Community support'],
    cta: 'Start Free Trial',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦9,900',
    period: 'per month',
    icon: <Zap size={18} strokeWidth={1.5} />,
    features: ['Everything in Free', 'Unlimited products', 'Custom domain', 'Priority support', 'Advanced analytics'],
    cta: 'Subscribe to Pro',
    highlight: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '₦24,900',
    period: 'per month',
    icon: <Building2 size={18} strokeWidth={1.5} />,
    features: ['Everything in Pro', 'Multiple staff accounts', 'Multi-location', 'API access', 'Dedicated support'],
    cta: 'Subscribe to Business',
  },
];

export default function PlanGate({ expired }: { expired?: boolean }) {
  const { choosePlan } = usePlanGate();
  const [paying, setPaying] = useState<{ id: PlanId; name: string; price: string } | null>(null);

  function handleSelect(plan: (typeof plans)[number]) {
    if (plan.id === 'free') {
      choosePlan('free');
    } else {
      setPaying({ id: plan.id, name: plan.name, price: plan.price });
    }
  }

  const filtered = plans.filter(p => !(expired && p.id === 'free'));

  return (
    <>
      <div className="absolute inset-0 z-40 bg-slate-50/95 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-full flex flex-col justify-center w-full max-w-4xl mx-auto px-4 py-8 sm:py-10"
        >
          {/* Header */}
          <div className="text-center mb-6">
            {expired ? (
              <>
                <p className="text-[10px] uppercase tracking-widest text-red-500 font-medium mb-1">Trial Expired</p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your free trial has ended</h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">Choose a plan to continue using Nemvol</p>
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-widest text-sky-600 font-medium mb-1">Get Started</p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Choose a plan to continue</h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">Pick what works for you — upgrade anytime</p>
              </>
            )}
          </div>

          {/* Mobile: snap-scroll carousel */}
          <div className="sm:hidden -mx-4 px-4">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none">
              {filtered.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`relative snap-start shrink-0 w-[78vw] rounded-xl border p-6 flex flex-col gap-4 bg-white ${
                    plan.highlight ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-200'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  {plan.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700">
                      {plan.icon}
                      <span className="font-semibold text-sm">{plan.name}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-400 text-[11px] ml-1">/ {plan.period}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check size={12} strokeWidth={2} className="text-slate-400 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelect(plan)}
                    className={`mt-auto w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                      plan.highlight
                        ? 'bg-slate-900 text-white hover:bg-slate-700'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-1">Swipe to see all plans</p>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4">
            {filtered.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`relative rounded-xl border p-8 flex flex-col gap-6 bg-white ${
                  plan.highlight ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-200'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="flex items-center gap-2 text-slate-700">
                  {plan.icon}
                  <span className="font-semibold text-sm">{plan.name}</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 text-xs ml-1">/ {plan.period}</span>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={13} strokeWidth={2} className="text-slate-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelect(plan)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    plan.highlight
                      ? 'bg-slate-900 text-white hover:bg-slate-700'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {paying && (
          <PaymentDrawer
            planId={paying.id}
            planName={paying.name}
            planPrice={paying.price}
            onClose={() => setPaying(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
