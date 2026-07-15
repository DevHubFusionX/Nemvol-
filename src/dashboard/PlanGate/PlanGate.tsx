import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Building2, Clock, ArrowRight, Sparkles } from 'lucide-react';
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
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '₦0',
    period: '5 days',
    icon: <Clock size={14} strokeWidth={1.5} />,
    badge: '5-day trial',
    description: 'Try everything, no card needed',
    features: ['10 products', 'Basic analytics', 'Community support'],
    cta: 'Start Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦9,900',
    period: '/mo',
    icon: <Zap size={14} strokeWidth={1.5} />,
    description: 'For growing stores',
    features: ['Unlimited products', 'Custom domain', 'Priority support', 'Advanced analytics'],
    cta: 'Get Pro',
    highlight: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '₦24,900',
    period: '/mo',
    icon: <Building2 size={14} strokeWidth={1.5} />,
    description: 'Full power for serious businesses',
    features: ['Multi-staff', 'Multi-location', 'API access', 'Dedicated support'],
    cta: 'Get Business',
  },
];

export default function PlanGate({ expired }: { expired?: boolean }) {
  const { choosePlan } = usePlanGate();
  const [paying, setPaying] = useState<{ id: PlanId; name: string; price: string } | null>(null);

  function handleSelect(plan: (typeof plans)[number]) {
    if (plan.id === 'free') choosePlan('free');
    else setPaying({ id: plan.id, name: plan.name, price: plan.price });
  }

  const filtered = plans.filter(p => !(expired && p.id === 'free'));

  return (
    <>
      <div className="absolute inset-0 z-40 bg-white/95 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-full flex flex-col justify-center w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        >
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            {expired ? (
              <>
                <span className="inline-block text-[10px] uppercase tracking-widest text-red-500 font-semibold bg-red-50 px-3 py-1 rounded-full mb-3">Trial Expired</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Your free trial has ended</h2>
                <p className="text-slate-400 text-[13px] sm:text-sm mt-1 leading-relaxed">Choose a plan to keep your store running</p>
              </>
            ) : (
              <>
                <span className="inline-block text-[10px] uppercase tracking-widest text-sky-600 font-semibold bg-sky-50 px-3 py-1 rounded-full mb-3">Get Started</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Choose your plan</h2>
                <p className="text-slate-400 text-[13px] sm:text-sm mt-1 leading-relaxed">Start free, upgrade when you're ready</p>
              </>
            )}
          </div>

          {/* Plan rows */}
          <div className="flex flex-col gap-3">
            {filtered.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.highlight
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/10 text-white text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full">
                    <Sparkles size={8} />
                    Popular
                  </div>
                )}

                <div className="flex flex-col gap-4 p-4 sm:p-5">
                  {/* Top row: name + price + CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0 pr-16 sm:pr-0">
                      {/* Name + icon */}
                      <div className={`flex items-center gap-1.5 min-w-0 ${plan.highlight ? 'text-slate-400' : 'text-slate-400'}`}>
                        <span className="shrink-0">{plan.icon}</span>
                        <span className="text-[10px] uppercase tracking-widest font-semibold truncate">{plan.name}</span>
                      </div>
                      {/* Divider */}
                      <div className={`hidden sm:block w-px h-4 shrink-0 ${plan.highlight ? 'bg-white/10' : 'bg-slate-300'}`} />
                      {/* Price */}
                      <div className="flex items-end gap-0.5 leading-none min-w-0">
                        <span className={`text-xl sm:text-2xl font-bold truncate ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                          {plan.price}
                        </span>
                        <span className={`text-[11px] mb-0.5 ${plan.highlight ? 'text-slate-400' : 'text-slate-400'}`}>
                          {plan.period}
                        </span>
                      </div>
                    </div>
                    {/* CTA */}
                    <button
                      onClick={() => handleSelect(plan)}
                      className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold transition-colors ${
                        plan.highlight
                          ? 'bg-white text-slate-900 hover:bg-slate-100'
                          : 'bg-slate-900 text-white hover:bg-slate-700'
                      }`}
                    >
                      <span className="truncate">{plan.cta}</span>
                      <ArrowRight size={12} className="shrink-0" strokeWidth={2} />
                    </button>
                  </div>

                  {/* Bottom row: feature pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {plan.features.map(f => (
                      <span
                        key={f}
                        className={`max-w-full text-[10px] px-2 py-1 rounded-full font-medium leading-snug ${
                          plan.highlight
                            ? 'bg-white/10 text-slate-300'
                            : 'bg-white border border-slate-200 text-slate-500'
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
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
