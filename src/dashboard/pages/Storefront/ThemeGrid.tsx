import { useState } from 'react';

const themes = [
  { id: 'nubia', name: 'Nubia theme', bg: 'bg-stone-100', active: true },
  { id: 'luna', name: 'Luna theme', bg: 'bg-slate-900', active: false },
  { id: 'nova', name: 'Nova theme', bg: 'bg-zinc-800', active: false },
  { id: 'arc', name: 'Arc theme', bg: 'bg-slate-100', active: false },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
        on ? 'bg-slate-900' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function ThemeGrid() {
  const [activeId, setActiveId] = useState('nubia');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {themes.map(({ id, name, bg }) => {
        const isActive = activeId === id;
        return (
          <div
            key={id}
            className={`rounded-xl border overflow-hidden transition-all ${
              isActive ? 'border-slate-900' : 'border-slate-100'
            }`}
          >
            {/* Preview */}
            <div className={`h-40 sm:h-52 ${bg} flex items-center justify-center`}>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                {name} preview
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <span className="text-[13px] font-semibold text-slate-800">{name}</span>
              <Toggle on={isActive} onToggle={() => setActiveId(id)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
