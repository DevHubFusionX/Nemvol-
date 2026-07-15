import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './shared';

const points = [
  'Marketing sites, SaaS platforms & internal tools',
  'Modern stack: React, Next.js, Node, Postgres',
  'Performance-first — fast, accessible, SEO-ready',
  'Full source code & deployment handed over',
];

const stats = [
  { value: 'React',   label: 'Frontend'    },
  { value: 'Node',    label: 'Backend'     },
  { value: '99%',     label: 'Uptime SLA'  },
  { value: 'Yours',   label: 'Source code' },
];

function WebSVG() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 20} cy={r * 52 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      {/* Browser chrome */}
      <rect x="60" y="50" width="360" height="260" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="60" y="50" width="360" height="36" rx="12" fill="#f8fafc" />
      <rect x="60" y="74" width="360" height="12" fill="#f8fafc" />
      <circle cx="84" cy="68" r="5" fill="#fca5a5" />
      <circle cx="100" cy="68" r="5" fill="#fde68a" />
      <circle cx="116" cy="68" r="5" fill="#86efac" />
      <rect x="136" y="62" width="200" height="12" rx="6" fill="#e2e8f0" />
      {/* Hero block */}
      <rect x="76" y="100" width="328" height="100" rx="8" fill="#0284c7" opacity="0.08" />
      <rect x="92" y="116" width="140" height="16" rx="4" fill="#0284c7" opacity="0.4" />
      <rect x="92" y="140" width="200" height="8" rx="4" fill="#e2e8f0" />
      <rect x="92" y="154" width="160" height="8" rx="4" fill="#e2e8f0" />
      <rect x="92" y="172" width="80" height="20" rx="6" fill="#0284c7" />
      {/* Cards row */}
      <rect x="76" y="216" width="96" height="72" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="184" y="216" width="96" height="72" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="292" y="216" width="96" height="72" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {[76, 184, 292].map((x) => (
        <g key={x}>
          <rect x={x + 10} y={226} width={76} height={28} rx="4" fill="#f1f5f9" />
          <rect x={x + 10} y={262} width={50} height={6} rx="3" fill="#e2e8f0" />
          <rect x={x + 10} y={274} width={36} height={6} rx="3" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  );
}

export default function WebSection() {
  return (
    <section id="web" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Web Development</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Fast, scalable web products.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              From marketing sites to full-stack SaaS platforms — we build web products that are fast, accessible, and built to scale. Clean code, modern stack, full handover.
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
              <Link to="/contact?service=Web+Development" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group">
                Start a web project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/work" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="w-full">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
            <WebSVG />
          </div>
        </Reveal>
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
