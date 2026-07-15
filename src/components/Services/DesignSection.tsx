import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './shared';

const points = [
  'User-centred wireframes grounded in research',
  'High-fidelity UI with your brand identity baked in',
  'Interactive prototypes for stakeholder sign-off',
  'Design system & component library handed over',
];

const stats = [
  { value: 'UX',      label: 'Research-led'   },
  { value: 'Hi-fi',   label: 'Fidelity'       },
  { value: '100%',    label: 'Handover ready' },
  { value: 'Yours',   label: 'IP ownership'   },
];

function DesignSVG() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 20} cy={r * 52 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      {/* Phone wireframe */}
      <rect x="160" y="40" width="160" height="280" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="172" y="60" width="136" height="240" rx="8" fill="#f8fafc" />
      {/* Nav bar */}
      <rect x="172" y="60" width="136" height="28" rx="8" fill="#0284c7" />
      <circle cx="192" cy="74" r="6" fill="white" fillOpacity="0.3" />
      <rect x="204" y="70" width="60" height="8" rx="4" fill="white" fillOpacity="0.5" />
      {/* Content blocks */}
      <rect x="180" y="100" width="120" height="48" rx="6" fill="#e2e8f0" />
      <rect x="180" y="158" width="56" height="8" rx="4" fill="#cbd5e1" />
      <rect x="180" y="172" width="120" height="6" rx="3" fill="#e2e8f0" />
      <rect x="180" y="184" width="96" height="6" rx="3" fill="#e2e8f0" />
      <rect x="180" y="204" width="120" height="36" rx="6" fill="#0284c7" opacity="0.15" />
      <rect x="188" y="216" width="80" height="12" rx="6" fill="#0284c7" />
      {/* Cursor */}
      <path d="M 310 130 L 322 150 L 316 148 L 314 158 L 308 140 Z" fill="#0284c7" />
    </svg>
  );
}

export default function DesignSection() {
  return (
    <section id="design" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <Reveal delay={0.1} className="w-full lg:order-first order-last">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
            <DesignSVG />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">UI/UX Design</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Interfaces people actually want to use.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              From wireframes to pixel-perfect high-fidelity screens — we design products that are intuitive, on-brand, and built to convert. Every design decision is grounded in user research, not guesswork.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-col gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-slate-600 leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact?service=Design" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group">
                Start a design project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/work" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
                View design work
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.2}>
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-8 py-6 flex flex-col gap-1">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{s.value}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
