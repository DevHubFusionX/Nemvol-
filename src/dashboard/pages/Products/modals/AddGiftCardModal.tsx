import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SimpleModal from './SimpleModal';

interface Props { open: boolean; onClose: () => void; }

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const PRESET_VALUES = ['500', '1000', '2000', '5000', '10000'];

export default function AddGiftCardModal({ open, onClose }: Props) {
  const [value, setValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [expiry, setExpiry] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'value' | 'quantity', string>>>({});
  const [done, setDone] = useState(false);

  const finalValue = value === 'custom' ? customValue : value;

  const handleSave = () => {
    const errs: typeof errors = {};
    if (!finalValue) errs.value = 'Gift card value is required';
    if (!quantity || Number(quantity) < 1) errs.quantity = 'Quantity must be at least 1';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  };

  const handleClose = () => {
    setValue(''); setCustomValue(''); setQuantity('1');
    setExpiry(''); setMessage(''); setErrors({}); setDone(false);
    onClose();
  };

  return (
    <SimpleModal open={open} onClose={handleClose} title="Add Gift Card" subtitle="Create gift cards customers can purchase and share">
      {done ? (
        <div className="flex flex-col items-center text-center py-6 gap-3">
          <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={1.5} />
          <p className="text-[14px] font-bold text-slate-900">Gift card created!</p>
          <p className="text-[13px] text-slate-400">
            <span className="font-semibold text-slate-700">₦{Number(finalValue).toLocaleString()}</span> × {quantity} gift card{Number(quantity) > 1 ? 's' : ''} added to your store.
          </p>
          <button onClick={handleClose} className="mt-1 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Value presets */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-2">
              Gift Card Value <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {PRESET_VALUES.map(v => (
                <button
                  key={v}
                  onClick={() => { setValue(v); setCustomValue(''); }}
                  className={`py-2 rounded-xl border text-[13px] font-semibold transition-colors ${
                    value === v ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  ₦{Number(v).toLocaleString()}
                </button>
              ))}
              <button
                onClick={() => setValue('custom')}
                className={`py-2 rounded-xl border text-[13px] font-semibold transition-colors ${
                  value === 'custom' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                Custom
              </button>
            </div>
            {value === 'custom' && (
              <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden focus-within:border-slate-400 transition-colors">
                <span className="px-3 py-2.5 text-[13px] font-semibold text-slate-400 bg-slate-50 border-r border-slate-200">₦</span>
                <input
                  type="number"
                  min="1"
                  value={customValue}
                  onChange={e => setCustomValue(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none bg-white"
                />
              </div>
            )}
            {errors.value && <p className="text-[11px] text-red-500 mt-1">• {errors.value}</p>}
          </div>

          {/* Quantity + Expiry */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="1" className={inputCls} />
              {errors.quantity && <p className="text-[11px] text-red-500 mt-1">• {errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                Expiry Date <span className="text-[11px] font-normal text-slate-400">(optional)</span>
              </label>
              <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
              Custom Message <span className="text-[11px] font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="e.g. Happy Birthday! Enjoy shopping with us."
              className={`${inputCls} resize-none`}
            />
          </div>

          <button onClick={handleSave} className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
            Create Gift Card
          </button>
        </div>
      )}
    </SimpleModal>
  );
}
