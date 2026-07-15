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
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const approach = [
  { num: '01', name: 'Discover', desc: 'Understand the problem, users, and market before writing a single line of code.' },
  { num: '02', name: 'Design', desc: 'Translate insights into intuitive, scalable product experiences.' },
  { num: '03', name: 'Build', desc: 'Develop using agile, milestone-based delivery with clear accountability.' },
  { num: '04', name: 'Validate', desc: 'Measure usage, performance, and traction against real outcomes.' },
  { num: '05', name: 'Grow', desc: 'Iterate and optimise post-launch — we stay beyond deployment.' },
];

const beliefs = [
  { title: 'Build the right thing first.', desc: 'Most digital products fail not because of poor technology, but because they are built without validation. We discover before we build.' },
  { title: 'Speed with structure.', desc: 'Fast delivery without compromising quality. Clear scope, milestones, SLAs, and IP ownership on every engagement.' },
  { title: 'Local expertise, global standards.', desc: 'Deep understanding of African users and systems, combined with engineering practices that scale globally.' },
  { title: 'We build for the long term.', desc: 'We aren\'t building software for today. We\'re building infrastructure for the next generation of businesses.' },
];

export default function About() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });
  const { open } = useModal();

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
            About Nemvol
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-4xl">
            Building the platform behind the next generation of businesses.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-[16px] text-slate-400 leading-relaxed max-w-2xl">
            NEMVOL is a product development agency that partners with founders, startups, SMEs, and innovation teams to transform ideas into validated, scalable digital products. We combine structured product thinking, strong engineering execution, and market-focused design to deliver solutions that work — not just software that exists.
          </p>
        </Reveal>
      </section>

      {/* ── Divider stat row ── */}
      <section className="border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { value: '8–12 wks', label: 'MVP delivery' },
            { value: '5-step', label: 'Proven process' },
            { value: '100%', label: 'IP ownership to you' },
            { value: 'Africa-first', label: 'Market expertise' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <span className="block text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</span>
              <span className="block mt-1 text-[12px] font-semibold text-slate-400 uppercase tracking-widest">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Our approach ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">How we work</span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Outcome-driven.<br />Every time.
              </h2>
              <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-sm">
                Our process is designed to reduce risk and accelerate value creation — from the first conversation to post-launch growth.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col">
            {approach.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.07}>
                <div className="flex items-start gap-6 py-7 border-b border-slate-100 last:border-0">
                  <span className="text-[11px] font-bold text-slate-300 tabular-nums pt-0.5 w-6 shrink-0">{step.num}</span>
                  <div>
                    <span className="block text-[15px] font-extrabold text-slate-900 tracking-tight">{step.name}</span>
                    <p className="mt-1 text-[13px] text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we believe ── */}
      <section className="bg-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">What we believe</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white leading-tight max-w-lg">
              Principles that guide every decision.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-800 rounded-2xl overflow-hidden">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="bg-slate-900 px-8 py-10 h-full">
                  <h3 className="text-[15px] font-extrabold text-white tracking-tight">{b.title}</h3>
                  <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder note ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&q=80"
                alt="Winner Oyebanjo — Founder & CEO"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">A note from our founder</span>
            <blockquote className="mt-6 text-[17px] text-slate-700 leading-relaxed font-medium">
              "When we started Nemvol, our goal wasn't simply to create another development agency. We wanted to build something that genuinely helps people create better businesses.
              <br /><br />
              We've seen incredible entrepreneurs held back by complicated software, disconnected tools, and unnecessary barriers. We believed there had to be a simpler way.
              <br /><br />
              Every feature we create, every improvement we make, and every decision we take is guided by one question: <span className="text-slate-900 font-extrabold">Does this help our customers build a better business?</span>"
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="text-[14px] font-extrabold text-slate-900">Winner Oyebanjo</p>
                <p className="text-[12px] text-slate-400">Founder & CEO, Nemvol</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid grid-cols-1 sm:grid-cols-2 gap-16">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Our Mission</span>
            <p className="mt-4 text-[17px] text-slate-700 leading-relaxed font-medium">
              To design, build, and launch reliable digital products through structured discovery, disciplined execution, and continuous improvement — enabling our clients to validate ideas, grow revenue, and scale sustainably.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Our Vision</span>
            <p className="mt-4 text-[17px] text-slate-700 leading-relaxed font-medium">
              To become a trusted product development partner for ambitious businesses building impactful digital solutions across Africa and emerging markets.
            </p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-1.5 mt-8 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group cursor-pointer"
            >
              Start a project with us
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Animated wordmark ── */}
      <div ref={wordmarkRef} className="overflow-hidden border-t border-slate-100 select-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={wordmarkInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-center font-extrabold tracking-tighter text-slate-100 leading-none py-4"
            style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}
          >
            Nemvol
          </p>
        </motion.div>
      </div>
    </div>
  );
}
