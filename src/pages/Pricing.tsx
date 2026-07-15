import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';
import { useModal } from '../components/ui/ModalContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

const plans = [
  {
    name: 'Discovery Sprint',
    tag: 'Start here',
    price: '₦250,000',
    period: 'one-time',
    desc: 'Validate your idea before spending on development. Two weeks of research, wireframes, and a brief that gets you funded.',
    features: [
      'User research & interviews',
      'Competitor analysis',
      'Wireframes & user flows',
      'MVP scope document',
      'Investor-ready brief',
    ],
    cta: 'Start Discovery',
    href: '/contact?plan=discovery',
    highlight: false,
  },
  {
    name: 'MVP Express',
    tag: 'Most popular',
    price: '₦1,500,000',
    period: '8–12 weeks',
    desc: 'A fully functional, deployable product. Scoped during discovery, built with agile milestones, shipped with analytics and QA.',
    features: [
      'Full UI/UX design',
      'Web or mobile build',
      'Analytics integration',
      'QA & testing',
      'Deployment & handoff',
      'Post-launch support (30 days)',
    ],
    cta: 'Start Your MVP',
    href: '/contact?plan=mvp',
    highlight: true,
  },
  {
    name: 'Growth Retainer',
    tag: 'Post-launch',
    price: '₦400,000',
    period: 'per month',
    desc: 'Ongoing iteration, support, and optimisation. A dedicated team that keeps your product moving after launch.',
    features: [
      'Monthly sprint planning',
      'Feature prioritisation',
      'Performance monitoring',
      'Dedicated PM',
      'Bug fixes & maintenance',
    ],
    cta: 'Get a Retainer',
    href: '/contact?plan=retainer',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Do I have to start with a Discovery Sprint?',
    a: 'Not always — but we strongly recommend it. Discovery prevents wasted builds. If you already have validated research and a clear scope, we can move straight to MVP.',
  },
  {
    q: 'What happens after the MVP is delivered?',
    a: 'You own everything — code, design, IP. We offer a 30-day post-launch support window, and many clients move onto a Growth Retainer to keep iterating.',
  },
  {
    q: 'Are prices fixed or can they change?',
    a: 'All engagements are fixed-fee, scoped upfront. No hourly billing, no surprise invoices. If scope changes, we agree a new milestone before any work begins.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We work with clients across Africa and internationally. Pricing is in Naira but we can invoice in USD or GBP on request.',
  },
  {
    q: 'Can agencies or enterprises get custom pricing?',
    a: 'Absolutely. White-label partnerships, enterprise contracts, and multi-project retainers are all available. Reach out and we\'ll put together a tailored proposal.',
  },
];

export default function Pricing() {
  const { open } = useModal();
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Pricing</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-3xl">
            Simple, transparent pricing.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[16px] text-slate-400 leading-relaxed max-w-lg">
            Fixed-fee engagements. No hourly billing, no scope creep invoices — just clear outcomes at every stage.
          </p>
        </Reveal>
      </section>

      {/* ── Plans ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div className={`flex flex-col h-full rounded-2xl p-8 border ${
                plan.highlight
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-100'
              }`}>

                {/* Tag + name */}
                <div className="mb-6">
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${
                    plan.highlight ? 'text-[var(--color-brand-blue)]' : 'text-slate-400'
                  }`}>
                    {plan.tag}
                  </span>
                  <h2 className={`mt-2 text-[22px] font-extrabold tracking-tight ${
                    plan.highlight ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.name}
                  </h2>
                  <p className={`mt-2 text-[13px] leading-relaxed ${
                    plan.highlight ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    {plan.desc}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className={`text-4xl font-extrabold tabular-nums tracking-tight ${
                    plan.highlight ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-[12px] font-bold ${
                    plan.highlight ? 'text-slate-500' : 'text-slate-300'
                  }`}>
                    / {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        plan.highlight ? 'text-[var(--color-brand-blue)]' : 'text-slate-300'
                      }`} />
                      <span className={`text-[13px] font-semibold ${
                        plan.highlight ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={plan.href}
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-[13px] font-bold transition-all duration-200 group ${
                    plan.highlight
                      ? 'bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white'
                      : 'border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Enterprise nudge */}
        <Reveal delay={0.3}>
          <div className="mt-6 rounded-2xl border border-slate-100 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="block text-[13px] font-extrabold text-slate-900">Need something custom?</span>
              <p className="mt-0.5 text-[13px] text-slate-400">
                Agencies, enterprise, and VC-backed companies get tailored proposals.
              </p>
            </div>
            <Link
              to="/contact?plan=custom"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200 group"
            >
              Talk to us
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-slate-100 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <HelpCircle className="w-5 h-5 text-[var(--color-brand-blue)]" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-12">
              Common questions.
            </h2>
          </Reveal>

          <div className="flex flex-col divide-y divide-slate-100">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.06}>
                <div className="py-7">
                  <h3 className="text-[15px] font-extrabold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-[14px] text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-slate-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-slate-900 px-8 py-14 flex flex-col items-center text-center gap-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Ready?</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-lg leading-snug">
                Not sure where to start? Start with Discovery.
              </h2>
              <p className="text-[14px] text-slate-400 max-w-md leading-relaxed">
                Two weeks. A validated idea. A brief that gets you funded. It's the lowest-risk way to begin.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <Link
                  to="/contact?plan=discovery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group"
                >
                  Start a Discovery Sprint
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <button
                  onClick={() => open()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 text-[13px] font-bold transition-all duration-200 cursor-pointer"
                >
                  Talk to the team
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
