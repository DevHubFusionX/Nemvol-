import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../components/ui/ModalContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

const partnerTypes = [
  {
    num: '01',
    title: 'Accelerators & Incubators',
    desc: 'We partner with accelerators to become the preferred product development partner for portfolio companies. Founders get fast, structured MVP builds at preferential rates.',
    cta: 'Become an accelerator partner',
  },
  {
    num: '02',
    title: 'VC & Angel Networks',
    desc: 'We work with investors to support portfolio companies that need product development. We provide investor-grade discovery briefs, prototypes, and MVP builds.',
    cta: 'Partner with us',
  },
  {
    num: '03',
    title: 'Digital & Marketing Agencies',
    desc: 'We act as a white-label development partner for agencies that need reliable engineering execution. All work is delivered under NDA with your branding.',
    cta: 'Explore white-label',
  },
  {
    num: '04',
    title: 'Talent Communities',
    desc: 'We partner with developer communities, bootcamps, and universities to build our vetted contractor bench and create opportunities for emerging African tech talent.',
    cta: 'Join our network',
  },
];

const currentPartners = [
  { name: 'Techstars Lagos', type: 'Accelerator', logo: 'TS' },
  { name: 'Ventures Platform', type: 'VC Fund', logo: 'VP' },
  { name: 'Google for Startups', type: 'Accelerator', logo: 'GS' },
  { name: 'HNG Internship', type: 'Talent Community', logo: 'HNG' },
  { name: 'Fate Foundation', type: 'Incubator', logo: 'FF' },
  { name: 'Digitalife Ehub', type: 'Agency Partner', logo: 'DE' },
];

const benefits = [
  { title: 'Referral revenue', desc: 'Earn a referral fee for every client you send our way that converts to a paid project.' },
  { title: 'Co-marketing', desc: 'Joint case studies, blog posts, and social content that builds both our audiences.' },
  { title: 'Preferential rates', desc: 'Partner clients get priority access and discounted rates on Discovery Sprints.' },
  { title: 'Dedicated PM', desc: 'Every partner-referred project gets a dedicated product manager from day one.' },
];

export default function Partners() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });
  const { open } = useModal();

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Partnerships</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-3xl">
            Build more together.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[16px] text-slate-400 leading-relaxed max-w-xl">
            We partner with accelerators, investors, agencies, and talent communities to help more founders build better products. If you work with ambitious builders, we should talk.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <button onClick={() => open()} className="inline-flex items-center gap-1.5 mt-8 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group cursor-pointer">
            Explore a partnership
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Reveal>
      </section>

      {/* ── Current partners ── */}
      <section className="border-t border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-8 text-center">Trusted by</p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {currentPartners.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <span className="text-[10px] font-extrabold text-slate-500">{p.logo}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{p.name}</span>
                  <span className="text-[10px] text-slate-300 tracking-widest uppercase">{p.type}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner types ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Who we partner with</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-lg">
            Four types of partnerships, one goal.
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-col rounded-2xl overflow-hidden border border-slate-100">
          {partnerTypes.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-6 items-center px-8 py-8 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                <span className="text-[11px] font-bold text-slate-300 tabular-nums">{p.num}</span>
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] text-slate-400 leading-relaxed max-w-xl">{p.desc}</p>
                </div>
                <button onClick={() => open()} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors whitespace-nowrap shrink-0 group-hover:gap-2 cursor-pointer">
                  {p.cta} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">What you get</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white leading-tight max-w-lg">
              Partnership benefits.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-800 rounded-2xl overflow-hidden">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="bg-slate-900 px-8 py-10 h-full flex flex-col gap-3">
                  <h3 className="text-[15px] font-extrabold text-white tracking-tight">{b.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-md">
              Ready to build something together?
            </h2>
            <p className="mt-3 text-[14px] text-slate-400 leading-relaxed max-w-sm">
              Tell us about your organisation and what kind of partnership you have in mind. We'll respond within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="sm:text-right">
            <button onClick={() => open()} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer">
              Get in touch
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
          <p className="text-center font-extrabold tracking-tighter text-slate-100 leading-none py-4" style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}>
            Nemvol
          </p>
        </motion.div>
      </div>
    </div>
  );
}
