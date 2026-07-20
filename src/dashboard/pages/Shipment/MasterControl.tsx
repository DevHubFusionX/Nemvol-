import { Truck } from 'lucide-react';
import { useShippingSettings, useSaveShippingSettings } from '../../../hooks/useShipping';

export default function MasterControl() {
  const { data: settings } = useShippingSettings();
  const save = useSaveShippingSettings();
  const enabled = settings?.shippingEnabled ?? false;

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
        <Truck size={17} className="text-slate-400" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-bold text-slate-900">Master Distribution Control</p>
        <p className="text-[12px] text-slate-400 mt-0.5">
          Toggle checkout-level shipping fee calculations.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
        <button
          onClick={() => save.mutate({ shippingEnabled: !enabled })}
          disabled={save.isPending}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 disabled:opacity-50 ${enabled ? 'bg-slate-900' : 'bg-slate-200'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    </div>
  );
}
