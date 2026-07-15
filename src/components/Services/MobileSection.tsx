import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './shared';

const points = [
  'Android & iOS — native or React Native cross-platform',
  'App Store & Play Store submission handled',
  'Offline-first architecture where needed',
  'Push notifications, payments & third-party integrations',
];

const stats = [
  { value: 'iOS',      label: 'Platform'     },
  { value: 'Android',  label: 'Platform'     },
  { value: 'RN',       label: 'Cross-platform' },
  { value: 'Yours',    label: 'Source code'  },
];

function MobileSVG() {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 20} cy={r * 52 + 20} r="1.5" fill="#e2e8f0" />
        ))
      )}
      {/* Phone 1 (Android) */}
      <rect x="80" y="40" width="130" height="260" rx="18" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="92" y="58" width="106" height="224" rx="8" fill="#f8fafc" />
      <rect x="92" y="58" width="106" height="32" rx="8" fill="#0284c7" />
      <text x="145" y="79" textAnchor="middle" fontSize="8" fontWeight="800" fill="white">Android</text>
      <rect x="100" y="102" width="90" height="52" rx="6" fill="#e2e8f0" />
      <rect x="100" y="164" width="60" height="8" rx="4" fill="#cbd5e1" />
      <rect x="100" y="178" width="90" height="6" rx="3" fill="#e2e8f0" />
      <rect x="100" y="190" width="72" height="6" rx="3" fill="#e2e8f0" />
      <rect x="100" y="210" width="90" height="28" rx="6" fill="#0284c7" opacity="0.15" />
      <rect x="110" y="218" width="60" height="12" rx="6" fill="#0284c7" />
      {/* Phone 2 (iOS) */}
      <rect x="270" y="40" width="130" height="260" rx="18" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="282" y="58" width="106" height="224" rx="8" fill="#f8fafc" />
      <rect x="282" y="58" width="106" height="32" rx="8" fill="#0f172a" />
      <text x="335" y="79" textAnchor="middle" fontSize="8" fontWeight="800" fill="white">iOS</text>
      <rect x="290" y="102" width="90" height="52" rx="6" fill="#e2e8f0" />
      <rect x="290" y="164" width="60" height="8" rx="4" fill="#cbd5e1" />
      <rect x="290" y="178" width="90" height="6" rx="3" fill="#e2e8f0" />
      <rect x="290" y="190" width="72" height="6" rx="3" fill="#e2e8f0" />
      <rect x="290" y="210" width="90" height="28" rx="6" fill="#0f172a" opacity="0.1" />
      <rect x="300" y="218" width="60" height="12" rx="6" fill="#0f172a" />
      {/* Bridge */}
      <path d="M 210 170 Q 240 150 270 170" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="240" y="148" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0284c7">React Native</text>
    </svg>
  );
}

export default function MobileSection() {
  return (
    <section id="mobile" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 border-t border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <Reveal delay={0.1} className="w-full lg:order-first order-last">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 aspect-[4/3] flex items-center justify-center">
            <MobileSVG />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Mobile Apps</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Android & iOS, built right.
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
              Native-quality mobile apps for Android and iOS. We use React Native for cross-platform efficiency without sacrificing performance — and handle everything from design to App Store submission.
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
              <Link to="/contact?service=Mobile+App" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group">
                Start a mobile project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/work" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
                See our work
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
