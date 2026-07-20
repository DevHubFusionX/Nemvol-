import { useRef, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import SimpleModal from './SimpleModal';
import { useCreateAttribute } from '../../../../hooks/useAttributes';

interface Props { open: boolean; onClose: () => void; }

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const TYPES = [
  { id: 'text', label: 'Text', sub: 'e.g. Small, Medium, Large' },
  { id: 'color', label: 'Color', sub: 'e.g. Red, Blue, Green' },
  { id: 'number', label: 'Number', sub: 'e.g. 250ml, 500g' },
];

export default function AddAttributeModal({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [values, setValues] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'values', string>>>({});
  const [done, setDone] = useState(false);
  const createAttribute = useCreateAttribute();
  const submitting = useRef(false);

  const addValue = () => {
    const v = valueInput.trim();
    if (!v || values.includes(v)) return;
    setValues(p => [...p, v]);
    setValueInput('');
  };

  const handleSave = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Attribute name is required';
    if (values.length === 0) errs.values = 'Add at least one value';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (submitting.current) return;
    submitting.current = true;
    createAttribute.mutate({ name: name.trim(), type, values }, {
      onSuccess: () => setDone(true),
      onSettled: () => { submitting.current = false; },
    });
  };

  const handleClose = () => {
    setName(''); setType('text'); setValues([]); setValueInput('');
    setErrors({}); setDone(false); onClose();
  };

  return (
    <SimpleModal open={open} onClose={handleClose} title="Add Attribute" subtitle="Define options customers can choose from">
      {done ? (
        <div className="flex flex-col items-center text-center py-6 gap-3">
          <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={1.5} />
          <p className="text-[14px] font-bold text-slate-900">Attribute created!</p>
          <p className="text-[13px] text-slate-400">
            <span className="font-semibold text-slate-700">{name}</span> with {values.length} value{values.length > 1 ? 's' : ''} added.
          </p>
          <button onClick={handleClose} className="mt-1 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
              Attribute Name <span className="text-red-500">*</span>
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Size, Color, Material" className={inputCls} />
            {errors.name && <p className="text-[11px] text-red-500 mt-1">• {errors.name}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-2">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border transition-colors ${
                    type === t.id ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className={`text-[12px] font-semibold ${type === t.id ? 'text-slate-900' : 'text-slate-700'}`}>{t.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{t.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
              Values <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={valueInput}
                onChange={e => setValueInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addValue(); } }}
                placeholder="Type a value and press Enter"
                className={`${inputCls} flex-1`}
              />
              <button onClick={addValue} className="px-4 py-2.5 rounded-xl bg-slate-100 text-[13px] font-semibold text-slate-700 hover:bg-slate-200 transition-colors shrink-0">
                Add
              </button>
            </div>
            {errors.values && <p className="text-[11px] text-red-500 mt-1">• {errors.values}</p>}
            {values.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {values.map(v => (
                  <span key={v} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[12px] font-medium text-slate-700">
                    {v}
                    <button onClick={() => setValues(p => p.filter(x => x !== v))} className="text-slate-400 hover:text-slate-700">
                      <X size={11} strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleSave} disabled={createAttribute.isPending} className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {createAttribute.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {createAttribute.isPending ? 'Saving…' : 'Save Attribute'}
          </button>
        </div>
      )}
    </SimpleModal>
  );
}
