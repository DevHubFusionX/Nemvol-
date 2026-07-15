import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './shared';

const points = [
  'Full product — design, build, QA, and deployment',
  'Milestone-based billing: 40 / 30 / 30 split',
  'Weekly demos so you always know where things stand',
  'Full IP transfer on final payment',
];

const stats = [
  { value: '8–12 wks', label: 'Delivery'     },
  { value: '3',        label: 'Milestones'   },
  { value: '100%',     label: 'IP ownership' },
  { value: 'Fixed',    label: 'Fee'          },
];

function MvpSVG() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 20} cy={r * 52 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      {/* Timeline */}
      <line x1="60" y1="180" x2="420" y2="180" stroke="#e2e8f0" strokeWidth="2" />
      {/* Milestone 1 */}
      <circle cx="120" cy="180" r="16" fill="#0284c7" />
      <text x="120" y="185" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">1</text>
      <rect x="72" y="210" width="96" height="52" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="120" y="232" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b">Design</text>
      <text x="120" y="246" textAnchor="middle" fontSize="7" fill="#94a3b8">Sign-off</text>
      <text x="120" y="256" textAnchor="middle" fontSize="7" fill="#0284c7">40% paid</text>
      {/* Milestone 2 */}
      <circle cx="240" cy="180" r="16" fill="#0284c7" />
      <text x="240" y="185" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">2</text>
      <rect x="192" y="100" width="96" height="52" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="240" y="122" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b">Build</text>
      <text x="240" y="136" textAnchor="middle" fontSize="7" fill="#94a3b8">Beta ready</text>
      <text x="240" y="146" textAnchor="middle" fontSize="7" fill="#0284c7">30% paid</text>
      {/* Milestone 3 */}
      <circle cx="360" cy="180" r="20" fill="#0f172a" />
      <text x="360" y="185" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">🚀</text>
      <rect x="308" y="210" width="104" height="52" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="360" y="232" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b">Launch</text>
      <text x="360" y="246" textAnchor="middle" fontSize="7" fill="#94a3b8">Deployed</text>
      <text x="360" y="256" textAnchor="middle" fontSize="7" fill="#0284c7">30% paid</text>
      {/* Connector lines */}
      <line x1="120" y1="196" x2="120" y2="210" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="240" y1="164" x2="240" y2="152" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="360" y1="200" x2="360" y2="210" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

export default function MvpSection() {
  return (
    <section id="mvp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">MVP Express</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              From zero to launched in 8–12 weeks.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              Our flagship engagement. A fully functional, deployable product — design, development, QA, and deployment — delivered in 8 to 12 weeks. Milestone-based billing so you only pay when deliverables are met.
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
              <Link to="/contact?service=MVP+Express" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group">
                Start your MVP
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="w-full">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
            <MvpSVG />
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
