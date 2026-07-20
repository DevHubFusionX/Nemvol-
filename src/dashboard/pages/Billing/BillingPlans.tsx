import { Check, X } from 'lucide-react';
import { useSubscription, useInitiatePayment } from '../../../hooks/useSubscription';
import { useProfile } from '../../../hooks/useProfile';

type Plan = {
  id: string;
  badge?: string;
  name: string;
  tagline: string;
  price: string;
  note?: string;
  features: { label: string; included: boolean }[];
  cta: string;
  highlight: boolean;
};

const plans: Plan[] = [
  {
    id: 'starter',
    badge: 'Best for getting started',
    name: 'Starter',
    tagline: 'New brands, Instagram sellers, WhatsApp vendors, food, fashion, and beauty sellers.',
    price: '₦10,000',
    features: [
      { label: 'Free Nemvol sub-domain', included: true },
      { label: 'Mobile-friendly storefront', included: true },
      { label: 'Product listings with images & prices', included: true },
      { label: 'Cart, checkout & order dashboard', included: true },
      { label: 'Payment & delivery setup', included: true },
      { label: 'WhatsApp order support', included: true },
      { label: 'Shareable store link', included: true },
      { label: 'Custom domain', included: false },
      { label: 'Unlimited products', included: false },
      { label: 'Abandoned cart reminders', included: false },
    ],
    cta: 'Start with Starter',
    highlight: false,
  },
  {
    id: 'growth',
    badge: 'Most Popular',
    name: 'Growth',
    tagline: 'Serious brands that want their own domain, more products, and buyer recovery tools.',
    price: '₦15,000',
    note: 'Custom domain free for the first year. Renewal paid separately.',
    features: [
      { label: 'Everything in Starter', included: true },
      { label: 'Custom domain (first year free)', included: true },
      { label: 'Unlimited products', included: true },
      { label: 'Unlimited orders', included: true },
      { label: 'Abandoned cart reminders', included: true },
      { label: 'Product variants (size, color, etc.)', included: true },
      { label: 'Pre-order product support', included: true },
      { label: 'Minimum order quantity', included: true },
      { label: 'Stronger customer follow-up tools', included: true },
      { label: 'Priority support', included: false },
    ],
    cta: 'Start with Growth',
    highlight: true,
  },
  {
    id: 'premium',
    badge: 'Best for growing brands',
    name: 'Premium',
    tagline: 'Brands that want the strongest support, better insights, and conversion guidance.',
    price: '₦25,000',
    note: 'Custom domain free for the first year. Renewal paid separately.',
    features: [
      { label: 'Everything in Growth', included: true },
      { label: 'Priority support', included: true },
      { label: 'Advanced sales analytics', included: true },
      { label: 'Customer analytics', included: true },
      { label: 'Custom design touches', included: true },
      { label: 'Dedicated account manager', included: true },
      { label: 'Homepage & product arrangement', included: true },
      { label: 'Conversion & launch guidance', included: true },
      { label: 'Strongest professional brand trust', included: true },
      { label: 'Fastest issue resolution', included: true },
    ],
    cta: 'Start with Premium',
    highlight: false,
  },
];

export default function BillingPlans() {
  const { data: sub } = useSubscription();
  const { data: profile } = useProfile();
  const initiate = useInitiatePayment();

  const handleSelect = (planId: string) => {
    if (!profile?.email) return;
    initiate.mutate({ planId, email: profile.email });
  };

  const currentPlan = sub?.status === 'active' ? sub.planId : null;
  return (
    <div>
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Choose your plan
        </p>
        <h2 className="text-[17px] font-bold text-slate-900">Simple 3-month packages</h2>
        <p className="text-[13px] text-slate-400 mt-0.5">
          Your Nemvol sub-domain is free on all plans. Custom domains are free for the first year on Growth and Premium only.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border p-6 flex flex-col gap-5 ${
              plan.highlight
                ? 'bg-slate-900 border-slate-900'
                : 'bg-white border-slate-100'
            }`}
          >
            {/* Badge + name */}
            <div>
              {plan.badge && (
                <span
                  className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${
                    plan.highlight
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              <h3
                className={`text-[18px] font-bold leading-none ${
                  plan.highlight ? 'text-white' : 'text-slate-900'
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-[12px] mt-2 leading-relaxed ${
                  plan.highlight ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                {plan.tagline}
              </p>
            </div>

            {/* Price */}
            <div className={`border-t pt-4 ${plan.highlight ? 'border-white/10' : 'border-slate-100'}`}>
              <span
                className={`text-[28px] font-bold leading-none ${
                  plan.highlight ? 'text-white' : 'text-slate-900'
                }`}
              >
                {plan.price}
              </span>
              <span
                className={`text-[12px] ml-1 ${
                  plan.highlight ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                / 3 months
              </span>
              {plan.note && (
                <p className={`text-[11px] mt-1.5 leading-relaxed ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {plan.note}
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-2.5 flex-1">
              {plan.features.map(({ label, included }) => (
                <li key={label} className="flex items-start gap-2.5">
                  {included ? (
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className={`mt-0.5 shrink-0 ${plan.highlight ? 'text-emerald-400' : 'text-emerald-500'}`}
                    />
                  ) : (
                    <X
                      size={13}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-slate-300"
                    />
                  )}
                  <span
                    className={`text-[12px] leading-snug ${
                      included
                        ? plan.highlight
                          ? 'text-slate-300'
                          : 'text-slate-700'
                        : 'text-slate-300'
                    }`}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleSelect(plan.id)}
              disabled={initiate.isPending || currentPlan === plan.id}
              className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors disabled:opacity-60 ${
                plan.highlight
                  ? 'bg-white text-slate-900 hover:bg-slate-100'
                  : 'bg-slate-900 text-white hover:bg-slate-700'
              }`}
            >
              {currentPlan === plan.id ? 'Current Plan' : initiate.isPending ? 'Redirecting…' : plan.cta}
            </button>

            <p className={`text-[11px] text-center leading-relaxed ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
              Your store account is already active.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
