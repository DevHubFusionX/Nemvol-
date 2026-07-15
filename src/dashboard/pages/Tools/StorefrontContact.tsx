import { useState } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${on ? 'bg-slate-900' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export default function StorefrontContact() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3 pl-1 border-l-2 border-slate-200">
        Storefront Contact
      </p>
      <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
          <MessageCircle size={17} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[14px] font-bold text-slate-900">WhatsApp Floating Button</p>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              {enabled ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-[12px] text-slate-400 leading-relaxed">
            When turned on, shoppers will see a fixed WhatsApp icon across the storefront so they can message your store from any page.
          </p>
          {!enabled && (
            <p className="text-[12px] font-medium text-slate-500 mt-2">
              No WhatsApp number saved yet. Add it in Store Information, then turn this on.
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <Toggle on={enabled} onToggle={() => setEnabled(v => !v)} />
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wide">
            Edit Number <ExternalLink size={11} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
