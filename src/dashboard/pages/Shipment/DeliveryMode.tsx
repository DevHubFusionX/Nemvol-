import { useState } from 'react';
import { Zap } from 'lucide-react';

const modes = [
  { id: 'manual', label: 'Manual Rates', desc: 'Set your own flat fees per zone or state.' },
  { id: 'logistics', label: 'Nemvol Logistics', desc: 'Live courier rates powered by our logistics network.' },
];

export default function DeliveryMode() {
  const [selected, setSelected] = useState('manual');

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={15} className="text-slate-500" strokeWidth={1.8} />
        <p className="text-[14px] font-bold text-slate-900">Delivery Mode</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {modes.map(({ id, label, desc }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`text-left p-4 rounded-xl border-2 transition-all ${
              selected === id
                ? 'border-slate-900 bg-slate-50'
                : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <p className="text-[13px] font-bold text-slate-900">{label}</p>
            <p className="text-[12px] text-slate-400 mt-0.5">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
