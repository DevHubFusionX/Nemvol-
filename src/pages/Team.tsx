import { useRef } from 'react';
import { Link } from 'react-router-dom';
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

const leadership = [
  {
    name: 'Winner Oyebanjo',
    role: 'Founder & CEO',
    desc: 'Drives overall vision, strategy, and growth. Oversees client acquisition, partnerships, and high-level product decisions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  },
];

const departments = [
  {
    name: 'Product & Operations',
    tag: 'PM',
    members: [
      { role: 'Head of Product', desc: 'Leads discovery, validation, and planning. Coordinates clients, designers, and developers.' },
      { role: 'Product Analyst', desc: 'Market research, competitor analysis, and user research to support product definition.' },
    ],
  },
  {
    name: 'Design & UX',
    tag: 'Design',
    members: [
      { role: 'UX Lead', desc: 'Oversees all design outputs, UX research, and visual direction. Ensures brand consistency.' },
      { role: 'UI/UX Designer', desc: 'Creates wireframes, prototypes, and high-fidelity designs. Conducts usability testing.' },
    ],
  },
  {
    name: 'Engineering',
    tag: 'CTO',
    members: [
      { role: 'Technical Lead', desc: 'Oversees architecture, code standards, and assigns tasks across all development projects.' },
      { role: 'Frontend Developer', desc: 'Builds web and mobile interfaces. Integrates UI designs and ensures responsiveness.' },
      { role: 'Backend Developer', desc: 'Builds APIs, databases, and server-side logic. Ensures performance and security.' },
      { role: 'Mobile Developer', desc: 'Develops native and cross-platform mobile applications for Android and iOS.' },
      { role: 'QA Engineer', desc: 'Manual and automated testing. Ensures delivery quality and bug-free releases.' },
    ],
  },
  {
    name: 'Sales & Marketing',
    tag: 'Growth',
    members: [
      { role: 'Business Development Lead', desc: 'Manages lead generation, proposals, and client acquisition. Maintains agency and accelerator relationships.' },
      { role: 'Marketing & Content', desc: 'Website content, case studies, social media, and thought leadership campaigns.' },
    ],
  },
  {
    name: 'Client Success',
    tag: 'Support',
    members: [
      { role: 'Client Success Manager', desc: 'Ensures smooth onboarding and project communication. Monitors satisfaction and retention.' },
      { role: 'Support Engineer', desc: 'Post-launch maintenance, updates, and technical support tickets.' },
    ],
  },
];

const values = [
  { num: '01', text: 'Product-thinking first — we validate before we build.' },
  { num: '02', text: 'Lean and accountable — every role has clear ownership.' },
  { num: '03', text: 'Long-term partners — we stay beyond deployment.' },
  { num: '04', text: 'Africa-first mindset with global execution standards.' },
];

export default function Team() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });
  const { open } = useModal();

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Our Team</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-3xl">
            The people building Nemvol.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[16px] text-slate-400 leading-relaxed max-w-xl">
            A lean, founder-led team of product managers, designers, engineers, and growth specialists — united by one goal: helping ambitious businesses build better digital products.
          </p>
        </Reveal>
      </section>

      {/* ── Leadership ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Leadership</span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.08}>
              <div className="group flex flex-col gap-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-extrabold text-slate-900 tracking-tight">{person.name}</p>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)] mt-0.5">{person.role}</p>
                  <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">{person.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Open role card */}
          <Reveal delay={0.08}>
            <Link to="/careers" className="group flex flex-col gap-4 cursor-pointer">
              <div className="aspect-[4/5] rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center group-hover:border-[var(--color-brand-blue)] transition-colors">
                <span className="text-[11px] font-bold tracking-widest uppercase text-slate-300 group-hover:text-[var(--color-brand-blue)] transition-colors">
                  Your seat
                </span>
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-slate-900 tracking-tight">We're hiring</p>
                <p className="text-[11px] font-bold tracking-widest uppercase text-slate-300 mt-0.5">Open Roles</p>
                <p className="mt-2 text-[13px] text-slate-400 leading-relaxed flex items-center gap-1.5 group-hover:text-[var(--color-brand-blue)] transition-colors">
                  View open positions <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Departments ── */}
      <section className="bg-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">How we're structured</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white leading-tight max-w-lg">
              Lean teams.<br />Clear ownership.
            </h2>
            <p className="mt-4 text-[15px] text-slate-400 leading-relaxed max-w-sm">
              Every department has defined scope, milestones, and accountability — so nothing falls through the cracks.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 rounded-2xl overflow-hidden">
            {departments.map((dept, i) => (
              <Reveal key={dept.name} delay={i * 0.07}>
                <div className="bg-slate-900 px-8 py-10 h-full flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">{dept.tag}</span>
                    <h3 className="mt-1 text-[15px] font-extrabold text-white tracking-tight">{dept.name}</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {dept.members.map((m) => (
                      <div key={m.role} className="flex flex-col gap-1">
                        <span className="text-[13px] font-bold text-slate-300">{m.role}</span>
                        <span className="text-[12px] text-slate-500 leading-relaxed">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work together ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">How we work</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Built to stay lean<br />as we scale.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-sm">
              Some roles are multi-hatted at the early stage. Contractor and freelance specialists fill gaps until full-time hires are justified. SOPs ensure accountability even in a lean setup.
            </p>
          </Reveal>
          <div className="flex flex-col">
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.07}>
                <div className="flex items-start gap-5 py-6 border-b border-slate-100 last:border-0">
                  <span className="text-[11px] font-bold text-slate-300 tabular-nums pt-0.5 w-6 shrink-0">{v.num}</span>
                  <p className="text-[15px] font-semibold text-slate-700 leading-snug">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join us CTA ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Careers</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-md">
              We're always looking for exceptional people.
            </h2>
            <p className="mt-3 text-[14px] text-slate-400 leading-relaxed max-w-sm">
              If you're a builder, designer, or strategist who cares about outcomes over output — we'd love to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0 flex flex-col sm:items-end gap-3">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold transition-all duration-200 group"
            >
              View open roles
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200 group cursor-pointer"
            >
              Start a project
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
