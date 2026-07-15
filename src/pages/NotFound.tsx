import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useModal } from '../components/ui/ModalContext';

function NotFoundSVG() {
  return (
    <svg viewBox="0 0 480 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto">
      {/* Dot grid */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 52 + 14} cy={r * 52 + 14} r="1.5" fill="#e2e8f0" />
        ))
      )}

      {/* 4 */}
      <text x="52" y="196" fontSize="160" fontWeight="900" fill="#f1f5f9" fontFamily="system-ui" letterSpacing="-8">4</text>

      {/* 0 — replaced with a broken circle */}
      <circle cx="240" cy="130" r="72" stroke="#e2e8f0" strokeWidth="18" strokeLinecap="round"
        strokeDasharray="180 80" />
      <circle cx="240" cy="130" r="72" stroke="#0284c7" strokeWidth="18" strokeLinecap="round"
        strokeDasharray="60 200" strokeDashoffset="-20" opacity="0.35" />

      {/* 4 */}
      <text x="296" y="196" fontSize="160" fontWeight="900" fill="#f1f5f9" fontFamily="system-ui" letterSpacing="-8">4</text>

      {/* Small label inside the broken circle */}
      <text x="240" y="124" textAnchor="middle" fontSize="11" fontWeight="800" fill="#94a3b8" letterSpacing="2">LOST</text>
      <text x="240" y="142" textAnchor="middle" fontSize="9" fill="#cbd5e1">page not found</text>

      {/* Dashed line going nowhere */}
      <line x1="240" y1="210" x2="240" y2="248" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="240" cy="252" r="3" fill="#e2e8f0" />
    </svg>
  );
}

export default function NotFound() {
  const { open } = useModal();

  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-xl text-center">

        <NotFoundSVG />

        <h1 className="mt-8 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          This page doesn't exist.
        </h1>
        <p className="mt-4 text-[15px] text-slate-400 leading-relaxed max-w-sm mx-auto">
          It may have been moved, deleted, or you followed a broken link. Let's get you back on track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>
          <button
            onClick={() => open()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 cursor-pointer"
          >
            Start a project
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
