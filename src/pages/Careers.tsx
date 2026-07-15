import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

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

const openRoles = [
  {
    dept: 'Engineering',
    title: 'Frontend Developer',
    type: 'Full-time · Contract',
    location: 'Remote — Nigeria',
    desc: 'Build fast, accessible web and mobile interfaces. You integrate design systems and ensure pixel-perfect responsiveness across all devices.',
  },
  {
    dept: 'Engineering',
    title: 'Backend Developer',
    type: 'Full-time · Contract',
    location: 'Remote — Nigeria',
    desc: 'Design and build APIs, databases, and server-side logic. You care deeply about performance, scalability, and security.',
  },
  {
    dept: 'Engineering',
    title: 'Mobile Developer',
    type: 'Contract',
    location: 'Remote',
    desc: 'Build native and cross-platform mobile applications for Android and iOS. Experience with React Native or Flutter preferred.',
  },
  {
    dept: 'Design',
    title: 'UI/UX Designer',
    type: 'Full-time · Contract',
    location: 'Remote — Nigeria',
    desc: 'Create wireframes, prototypes, and high-fidelity designs. You conduct usability testing and champion user-centered thinking on every project.',
  },
  {
    dept: 'Product',
    title: 'Product Manager',
    type: 'Full-time',
    location: 'Lagos, Nigeria',
    desc: 'Lead product discovery, validation, and planning. You coordinate between clients, designers, and developers — and own the roadmap.',
  },
  {
    dept: 'Growth',
    title: 'Business Development Lead',
    type: 'Full-time',
    location: 'Lagos, Nigeria',
    desc: 'Own lead generation, proposals, and client acquisition. You build relationships with founders, agencies, accelerators, and VC networks.',
  },
];

const perks = [
  { num: '01', title: 'Remote-first', desc: 'Work from anywhere. We care about outcomes, not office hours.' },
  { num: '02', title: 'Lean & fast', desc: 'No bureaucracy. Your work ships and you see the impact immediately.' },
  { num: '03', title: 'Ownership', desc: 'Every team member owns their domain. No hand-holding, no micromanagement.' },
  { num: '04', title: 'Real products', desc: 'You\'ll work on products that real founders and users depend on — not internal tools.' },
  { num: '05', title: 'Learning culture', desc: 'Continuous improvement is built into how we work, not just something we say.' },
  { num: '06', title: 'Africa-first', desc: 'We\'re building for African markets with global standards. That context matters here.' },
];

const depts = ['All', 'Engineering', 'Design', 'Product', 'Growth'];

export default function Careers() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? openRoles
    : openRoles.filter((r) => r.dept === activeFilter);

  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Careers at Nemvol</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-3xl">
            Build things that matter.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[16px] text-slate-400 leading-relaxed max-w-xl">
            We're a lean, ambitious team building digital products for founders and businesses across Africa and beyond. If you care about outcomes over output and want your work to ship — you'll fit right in.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="#roles"
            className="inline-flex items-center gap-1.5 mt-8 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group"
          >
            See open roles
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </Reveal>
      </section>

      {/* ── Perks ── */}
      <section className="bg-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Why Nemvol</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white leading-tight">
              What it's like<br />to work here.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 rounded-2xl overflow-hidden">
            {perks.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.07}>
                <div className="bg-slate-900 px-8 py-10 h-full flex flex-col gap-3">
                  <span className="text-[11px] font-bold text-slate-600 tabular-nums">{p.num}</span>
                  <h3 className="text-[15px] font-extrabold text-white tracking-tight">{p.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Open Roles</span>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {filtered.length} position{filtered.length !== 1 ? 's' : ''} open.
              </h2>
            </div>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveFilter(d)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                    d === activeFilter
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-100">
          {filtered.map((role, i) => (
            <Reveal key={`${role.title}-${i}`} delay={i * 0.06}>
              <div className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center px-8 py-7 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">{role.dept}</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-300">
                      <Clock className="w-3 h-3" />{role.type}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-300">
                      <MapPin className="w-3 h-3" />{role.location}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight">{role.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed max-w-2xl">{role.desc}</p>
                </div>
            <Link
              to="mailto:hello@nemvol.com"
              onClick={(e) => { e.preventDefault(); window.location.href = `mailto:hello@nemvol.com?subject=Application — ${role.title}`; }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-[var(--color-brand-blue)] text-slate-700 hover:text-[var(--color-brand-blue)] text-[12px] font-bold transition-all duration-200 whitespace-nowrap group-hover:border-[var(--color-brand-blue)] shrink-0"
            >
              Apply
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── General application ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Don't see your role?</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              We're always open to exceptional people.
            </h2>
            <p className="mt-3 text-[14px] text-slate-400 leading-relaxed">
              Send us a note about who you are, what you build, and why Nemvol. If there's a fit, we'll find a way.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="sm:text-right">
            <a
              href="mailto:hello@nemvol.com?subject=General Application"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group"
            >
              Send a general application
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
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
