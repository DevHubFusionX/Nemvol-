import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
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

const cases = [
  {
    slug: 'tradeflow',
    tag: 'MVP Express · Fintech',
    client: 'TradeFlow',
    headline: 'From idea to funded MVP in 10 weeks.',
    summary: 'A Lagos-based pre-seed founder needed a working B2B payments and invoice management platform to demo at a VC pitch. We ran a 2-week discovery sprint, scoped the MVP, and delivered a fully functional web app in 10 weeks.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=600&fit=crop&q=80',
    metrics: [{ value: '10 wks', label: 'Discovery to launch' }, { value: '₦2.1M', label: 'Pre-seed raised post-MVP' }, { value: '3', label: 'KPIs hit at launch' }],
    industry: 'Fintech',
    featured: true,
  },
  {
    slug: 'farmlink',
    tag: 'Discovery Sprint · AgriTech',
    client: 'FarmLink',
    headline: 'Validated a market before a single line of code.',
    summary: 'An agritech startup wanted to build a marketplace connecting smallholder farmers to buyers. We ran a 2-week discovery sprint — user interviews, competitor mapping, and wireframes — that revealed a critical pivot before any development began.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&h=600&fit=crop&q=80',
    metrics: [{ value: '2 wks', label: 'Discovery sprint' }, { value: '1 pivot', label: 'Identified before build' }, { value: '40%', label: 'Scope reduction' }],
    industry: 'AgriTech',
    featured: false,
  },
  {
    slug: 'stylevault',
    tag: 'MVP Express · Fashion',
    client: 'StyleVault',
    headline: 'A fashion marketplace live in 11 weeks.',
    summary: 'A fashion entrepreneur needed a multi-vendor marketplace with local payment integration and order management. We designed and built the full platform — mobile-first, with Paystack integration and a vendor dashboard.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&h=600&fit=crop&q=80',
    metrics: [{ value: '11 wks', label: 'Design to launch' }, { value: '200+', label: 'Vendors onboarded at launch' }, { value: '4.8★', label: 'App store rating' }],
    industry: 'Fashion',
    featured: false,
  },
  {
    slug: 'healthdesk',
    tag: 'Growth Retainer · HealthTech',
    client: 'HealthDesk',
    headline: 'Post-launch iteration that doubled retention.',
    summary: 'A telemedicine startup launched their MVP with another agency but struggled with low retention. We took over on a 90-day growth retainer — analytics audit, UX improvements, and feature prioritisation — and doubled their 30-day retention rate.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop&q=80',
    metrics: [{ value: '2×', label: '30-day retention' }, { value: '90 days', label: 'Retainer duration' }, { value: '-34%', label: 'Drop-off at onboarding' }],
    industry: 'HealthTech',
    featured: false,
  },
  {
    slug: 'buildpro',
    tag: 'White-label · Construction',
    client: 'BuildPro (via Agency Partner)',
    headline: 'White-label delivery under NDA, on time.',
    summary: 'A digital agency needed a reliable development partner for a construction project management web app. We delivered the full build under NDA — their brand, our execution — in 9 weeks with zero scope creep.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop&q=80',
    metrics: [{ value: '9 wks', label: 'Full delivery' }, { value: '0', label: 'Scope changes' }, { value: '100%', label: 'Milestone SLAs met' }],
    industry: 'Construction',
    featured: false,
  },
  {
    slug: 'sendbox',
    tag: 'Product Redesign · Logistics',
    client: 'SendBox',
    headline: 'Redesigned for clarity, rebuilt for scale.',
    summary: 'A logistics startup had a working product but poor UX was hurting conversion. We ran a full product redesign — new information architecture, simplified onboarding, and a rebuilt dashboard — resulting in a 60% improvement in activation.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=600&fit=crop&q=80',
    metrics: [{ value: '+60%', label: 'Activation rate' }, { value: '6 wks', label: 'Redesign delivery' }, { value: '-45%', label: 'Support tickets' }],
    industry: 'Logistics',
    featured: false,
  },
];

const filters = ['All', 'Fintech', 'AgriTech', 'Fashion', 'HealthTech', 'Construction', 'Logistics'];
const featured = cases[0];
const rest = cases.slice(1);

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? rest : rest.filter((c) => c.industry === activeFilter);

  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Our Work</span>
        </Reveal>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <Reveal delay={0.05}>
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-2xl">
              Products we've built and launched.
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0 pb-2">
            <p className="text-[14px] text-slate-400 leading-relaxed max-w-xs">
              Real outcomes for real founders — from discovery sprints to full MVP builds and growth retainers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured case ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Reveal>
          <Link to={`/work/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-0 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer">
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.client}
                className="w-full h-full object-cover opacity-70 group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-slate-900 hidden lg:block" />
            </div>
            <div className="flex flex-col justify-center px-10 py-12 lg:px-12">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">{featured.tag}</span>
              <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight leading-snug">{featured.headline}</h2>
              <p className="mt-4 text-[14px] text-slate-400 leading-relaxed">{featured.summary}</p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-800 pt-8">
                {featured.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="block text-2xl font-extrabold text-white tabular-nums">{m.value}</span>
                    <span className="block mt-0.5 text-[11px] text-slate-500 font-semibold">{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] group-hover:text-blue-400 transition-colors">
                Read case study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── Rest of cases ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                  f === activeFilter
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.07}>
              <Link to={`/work/${c.slug}`} className="group flex flex-col gap-5 cursor-pointer">
                <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
                  <img
                    src={c.image}
                    alt={c.client}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">{c.tag}</span>
                  <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {c.headline}
                  </h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2">{c.summary}</p>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                  {c.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <span className="block text-[15px] font-extrabold text-slate-900 tabular-nums">{m.value}</span>
                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{m.label}</span>
                    </div>
                  ))}
                  <div className="ml-auto inline-flex items-center gap-1 text-[12px] font-bold text-slate-300 group-hover:text-[var(--color-brand-blue)] transition-colors">
                    Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Next up</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-md">
              Your product could be our next case study.
            </h2>
            <p className="mt-3 text-[14px] text-slate-400 leading-relaxed max-w-sm">
              Start with a Discovery Sprint — 2 weeks, fixed fee, and you'll know exactly what to build and why.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="sm:text-right">
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
            >
              Start a project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Wordmark ── */}
      <div ref={wordmarkRef} className="overflow-hidden border-t border-slate-100 select-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={wordmarkInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative">
            <p
              className="text-center font-extrabold tracking-tighter leading-none py-2 bg-linear-to-r from-[#0369a1] via-[#7dd3fc] to-[#0369a1] bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}
            >
              Nemvol
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-b from-transparent to-white pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
