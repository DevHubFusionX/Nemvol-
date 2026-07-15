import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './shared';
import { useModal } from '../ui/ModalContext';

function FounderSVG() {
  return (
    <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 52 + 20} cy={row * 48 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      <path d="M 72 116 Q 150 80 228 140" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 228 140 Q 310 200 384 164" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 124 212 Q 200 260 280 236" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 280 236 Q 350 210 408 260" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />

      <circle cx="72" cy="116" r="28" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="72" y="112" textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">IDEA</text>
      <text x="72" y="123" textAnchor="middle" fontSize="7" fill="#cbd5e1">Validated</text>

      <circle cx="228" cy="140" r="36" fill="#0284c7" />
      <text x="228" y="136" textAnchor="middle" fontSize="9" fontWeight="800" fill="white">NEMVOL</text>
      <text x="228" y="149" textAnchor="middle" fontSize="7" fill="#bae6fd">Discovery</text>

      <circle cx="384" cy="164" r="28" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="384" y="160" textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">MVP</text>
      <text x="384" y="171" textAnchor="middle" fontSize="7" fill="#cbd5e1">8–12 wks</text>

      <circle cx="124" cy="212" r="24" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="124" y="208" textAnchor="middle" fontSize="7" fontWeight="700" fill="#94a3b8">DESIGN</text>
      <text x="124" y="219" textAnchor="middle" fontSize="7" fill="#cbd5e1">UX/UI</text>

      <circle cx="280" cy="236" r="24" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="280" y="232" textAnchor="middle" fontSize="7" fontWeight="700" fill="#94a3b8">BUILD</text>
      <text x="280" y="243" textAnchor="middle" fontSize="7" fill="#cbd5e1">Agile</text>

      <circle cx="408" cy="260" r="28" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="408" y="256" textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">LAUNCH</text>
      <text x="408" y="267" textAnchor="middle" fontSize="7" fill="#cbd5e1">& Grow</text>

      <circle cx="228" cy="140" r="44" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.2">
        <animate attributeName="r" values="36;50;36" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

const points = [
  'Validate your idea in 2 weeks before spending on development',
  'Get wireframes and an investor-ready brief from day one',
  'MVP delivered in 8–12 weeks with full IP ownership',
  'We stay post-launch to help you grow and iterate',
];

const stats = [
  { value: '2 wks',    label: 'Discovery Sprint' },
  { value: '8–12 wks', label: 'MVP delivery'     },
  { value: '100%',     label: 'IP ownership'     },
  { value: '₦250k',   label: 'Starting price'   },
];

export default function FoundersSection() {
  const { open } = useModal();
  return (
    <section id="founders" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">For Early-stage Founders</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Turn your idea into a product investors believe in.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              Most founders waste months building the wrong thing. We start with a 2-week Discovery Sprint that validates your idea, maps your users, and produces a brief that gets you funded — before a single line of code is written.
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
              <button onClick={() => open('discovery')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer">
                Start a Discovery Sprint
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <Link to="/work" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
                See founder case studies
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="w-full">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
            <FounderSVG />
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
