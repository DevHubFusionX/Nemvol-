import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useModal } from '../ui/ModalContext';

const plans = [
  {
    id: 'discovery',
    name: 'Discovery Sprint',
    desc: 'Validate your idea before committing to a full build.',
    price: '₦250,000',
    features: ['User research', 'Market analysis', 'Wireframes', 'MVP scope doc', 'Investor-ready brief'],
    cta: 'Start Discovery',
    href: '/contact?plan=discovery',
    popular: false,
  },
  {
    id: 'mvp',
    name: 'MVP Express',
    desc: 'A fully functional, deployable product in 8–12 weeks.',
    price: '₦1,500,000',
    features: ['Full UI/UX design', 'Web or mobile build', 'Analytics integration', 'QA & testing', 'Deployment & handoff'],
    cta: 'Start Your MVP',
    href: '/contact?plan=mvp',
    popular: true,
  },
  {
    id: 'retainer',
    name: 'Growth Retainer',
    desc: 'Ongoing iteration, support, and optimisation post-launch.',
    price: '₦400,000',
    features: ['Monthly sprints', 'Feature prioritisation', 'Performance monitoring', 'Dedicated PM'],
    cta: 'Get a Retainer',
    href: '/contact?plan=retainer',
    popular: false,
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { open } = useModal();

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
            Pricing
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-tight">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-[15px] text-slate-400 leading-relaxed max-w-sm">
            Fixed-fee engagements. No surprises, no scope creep — just clear outcomes.
          </p>
        </motion.div>

        {/* Rows */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-100">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
              className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 md:gap-10 items-center px-8 py-8 border-b border-slate-100 last:border-0 ${
                plan.popular ? 'bg-slate-900' : 'bg-white'
              }`}
            >
              {/* Left: name + desc + features */}
              <div className="flex flex-col gap-3">
                <div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${plan.popular ? 'text-[var(--color-brand-blue)]' : 'text-slate-300'}`}>
                    {plan.popular ? 'Most Popular' : plan.name}
                  </span>
                  <h3 className={`mt-1 text-xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-1 text-[13px] leading-relaxed ${plan.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                    {plan.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1">
                  {plan.features.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
                      <Check className={`w-3 h-3 shrink-0 ${plan.popular ? 'text-[var(--color-brand-blue)]' : 'text-slate-300'}`} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center: price */}
              <div>
                <span className={`text-4xl font-extrabold tracking-tight tabular-nums ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className={`ml-1.5 text-[12px] font-bold ${plan.popular ? 'text-slate-500' : 'text-slate-300'}`}>
                  / 3 months
                </span>
              </div>

              {/* Right: CTA */}
              <button
                onClick={() => open(plan.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 whitespace-nowrap group cursor-pointer ${
                  plan.popular
                    ? 'bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white'
                    : 'border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group"
          >
            Compare all plans
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
