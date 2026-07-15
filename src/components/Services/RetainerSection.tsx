import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './shared';

const points = [
  'Analytics review & data-driven iteration cycles',
  'UX improvements based on real user behaviour',
  'Feature prioritisation and backlog management',
  'Ongoing engineering support — no retainer lock-in',
];

const stats = [
  { value: '30–90d', label: 'Engagement'   },
  { value: 'Weekly', label: 'Sprints'      },
  { value: 'Data',   label: 'Driven'       },
  { value: 'No',     label: 'Lock-in'      },
];

function RetainerSVG() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 20} cy={r * 52 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      {/* Growth chart */}
      <polyline
        points="60,280 120,240 180,220 240,180 300,140 360,100 420,72"
        stroke="#0284c7"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="60,280 120,240 180,220 240,180 300,140 360,100 420,72 420,300 60,300"
        fill="#0284c7"
        fillOpacity="0.06"
      />
      {/* Data points */}
      {[[120,240],[180,220],[240,180],[300,140],[360,100],[420,72]].map(([x,y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="white" stroke="#0284c7" strokeWidth="2" />
      ))}
      {/* Launch marker */}
      <line x1="60" y1="60" x2="60" y2="300" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="68" y="76" fontSize="8" fontWeight="700" fill="#94a3b8">Launch</text>
      {/* Axis */}
      <line x1="60" y1="300" x2="440" y2="300" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="60" y2="300" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="240" y="320" textAnchor="middle" fontSize="8" fill="#94a3b8">Time (post-launch)</text>
      <text x="420" y="60" textAnchor="end" fontSize="8" fontWeight="700" fill="#0284c7">Growth</text>
    </svg>
  );
}

export default function RetainerSection() {
  return (
    <section id="retainer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <Reveal delay={0.1} className="w-full lg:order-first order-last">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
            <RetainerSVG />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Growth Retainer</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              We stay after launch.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              Launching is just the beginning. Our 30–90 day post-launch retainer keeps us in your corner — analysing data, improving UX, and shipping the features that actually move the needle.
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
              <Link to="/contact?service=Growth+Retainer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group">
                Talk about a retainer
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
                See pricing
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
