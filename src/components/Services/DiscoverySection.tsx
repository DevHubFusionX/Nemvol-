import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './shared';

const points = [
  'User research & competitor analysis in week one',
  'Wireframes and clickable prototype by end of week two',
  'Investor-ready product brief with scoped MVP',
  'Fixed fee — no surprises, no scope creep',
];

const stats = [
  { value: '2 wks',  label: 'Duration'      },
  { value: '100%',   label: 'Fixed fee'     },
  { value: '1 brief',label: 'Deliverable'   },
  { value: '0 code', label: 'Required first' },
];

function DiscoverySVG() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 20} cy={r * 52 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      {/* Week 1 */}
      <rect x="40" y="80" width="140" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="110" y="116" textAnchor="middle" fontSize="9" fontWeight="800" fill="#64748b">WEEK 1</text>
      <text x="110" y="130" textAnchor="middle" fontSize="8" fill="#94a3b8">Research & Analysis</text>
      {/* Arrow */}
      <path d="M 180 120 L 220 120" stroke="#0284c7" strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* Week 2 */}
      <rect x="220" y="80" width="140" height="80" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="290" y="116" textAnchor="middle" fontSize="9" fontWeight="800" fill="#64748b">WEEK 2</text>
      <text x="290" y="130" textAnchor="middle" fontSize="8" fill="#94a3b8">Wireframes & Brief</text>
      {/* Output */}
      <rect x="130" y="220" width="220" height="72" rx="12" fill="#0284c7" />
      <text x="240" y="252" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">PRODUCT BRIEF</text>
      <text x="240" y="268" textAnchor="middle" fontSize="8" fill="#bae6fd">Investor-ready · Scoped · Validated</text>
      <path d="M 110 160 Q 110 196 240 220" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 290 160 Q 290 196 240 220" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
        </marker>
      </defs>
    </svg>
  );
}

export default function DiscoverySection() {
  return (
    <section id="discovery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Product Discovery</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Validate before you build.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              A 2-week sprint that turns your idea into a validated, investor-ready product brief — with wireframes, user flows, and a scoped MVP plan. No code written until you know exactly what to build.
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
              <Link to="/contact?service=Discovery+Sprint" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group">
                Book a Discovery Sprint
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
            <DiscoverySVG />
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
