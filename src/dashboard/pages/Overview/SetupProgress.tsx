import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { label: 'Add your first product', done: false },
  { label: 'Setup payment methods', done: false },
  { label: 'Customise your store', done: true },
  { label: 'Launch your storefront', done: true },
  { label: 'Connect custom domain', done: false },
];

const completed = steps.filter((s) => s.done).length;
const total = steps.length;
const pct = Math.round((completed / total) * 100);

// SVG circle params
const r = 40;
const circ = 2 * Math.PI * r;
const dash = (pct / 100) * circ;

export default function SetupProgress() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col gap-6">
      {/* Circular progress */}
      <div className="flex justify-center">
        <div className="relative w-24 h-24">
          <svg width="96" height="96" viewBox="0 0 100 100" className="-rotate-90 w-full h-full">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="var(--color-brand-blue)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-900 leading-none">{pct}%</span>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
              Done
            </span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div>
        <p className="text-[14px] font-semibold text-slate-900">Setup Progress</p>
        <p className="text-[12px] text-slate-400 mt-0.5 mb-4">
          Complete these steps to go live
        </p>
        <ul className="space-y-2.5">
          {steps.map(({ label, done }) => (
            <li key={label} className="flex items-center gap-2.5">
              {done ? (
                <CheckCircle2 size={15} className="text-[var(--color-brand-blue)] shrink-0" strokeWidth={2} />
              ) : (
                <Circle size={15} className="text-slate-300 shrink-0" strokeWidth={1.8} />
              )}
              <span
                className={`text-[13px] ${
                  done ? 'line-through text-slate-300' : 'text-slate-700'
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
