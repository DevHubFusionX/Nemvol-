import { useState } from 'react';
import { MessageCircle, Check, Pencil } from 'lucide-react';

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
  const [editing, setEditing] = useState(false);
  const [number, setNumber] = useState('');
  const [draft, setDraft] = useState('');

  const handleEdit = () => { setDraft(number); setEditing(true); };
  const handleSave = () => { setNumber(draft.trim()); setEditing(false); };
  const handleCancel = () => setEditing(false);

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3 pl-1 border-l-2 border-slate-200">
        Storefront Contact
      </p>
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <MessageCircle size={17} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[14px] font-bold text-slate-900">WhatsApp Floating Button</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  {enabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <Toggle on={enabled} onToggle={() => setEnabled(v => !v)} />
            </div>

            <p className="text-[12px] text-slate-400 mt-1.5 leading-relaxed">
              When turned on, shoppers will see a fixed WhatsApp icon across the storefront so they can message your store from any page.
            </p>

            {/* Number section */}
            <div className="mt-4">
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    placeholder="e.g. +2348012345678"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    autoFocus
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition-colors"
                  >
                    <Check size={14} strokeWidth={2} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {number ? (
                    <span className="text-[13px] font-semibold text-slate-700">{number}</span>
                  ) : (
                    <span className="text-[12px] text-slate-400">No WhatsApp number saved yet.</span>
                  )}
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 text-[12px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Pencil size={12} strokeWidth={1.8} />
                    {number ? 'Edit' : 'Add number'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
