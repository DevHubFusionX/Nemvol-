import { useState } from 'react';

type Method = {
  id: string;
  label: string;
  action: 'toggle' | 'setup';
  setupLabel?: string;
};

const methods: Method[] = [
  { id: 'cards', label: 'Bank Cards', action: 'toggle' },
  { id: 'transfer', label: 'Bank Transfer', action: 'setup', setupLabel: 'Set up account' },
  { id: 'pod', label: 'Pay on Delivery', action: 'toggle' },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
        on ? 'bg-slate-900' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function PaymentMethodsTable() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-3 px-6 py-3 border-b border-slate-100">
        {['Payment Method', 'Status', 'Action'].map((col) => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            {col}
          </span>
        ))}
      </div>

      {methods.map(({ id, label, action, setupLabel }, i) => (
        <div
          key={id}
          className={`grid grid-cols-[1fr_auto] sm:grid-cols-3 items-center gap-3 px-5 sm:px-6 py-4 ${
            i < methods.length - 1 ? 'border-b border-slate-100' : ''
          }`}
        >
          <span className="text-[13px] font-semibold text-slate-800">{label}</span>

          <span className={`inline-flex w-fit px-2.5 py-1 rounded-md text-[11px] font-semibold justify-self-end sm:justify-self-start ${
            enabled[id]
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-slate-100 text-slate-400'
          }`}>
            {enabled[id] ? 'Enabled' : 'Disabled'}
          </span>

          {action === 'toggle' ? (
            <div className="col-span-2 sm:col-span-1">
              <Toggle on={!!enabled[id]} onToggle={() => toggle(id)} />
            </div>
          ) : (
            <button
              onClick={() => toggle(id)}
              className="col-span-2 sm:col-span-1 text-[13px] font-semibold text-[var(--color-brand-blue)] hover:underline w-fit"
            >
              {enabled[id] ? 'Manage account' : setupLabel}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
