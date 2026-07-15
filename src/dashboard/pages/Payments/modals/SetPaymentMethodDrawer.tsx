import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Banknote, CheckCircle2, CreditCard, Truck, X } from 'lucide-react';

interface Props {
  open: boolean;
  initialMethod?: PaymentMethodId;
  onSave?: (method: PaymentMethodId) => void;
  onClose: () => void;
}

type PaymentMethodId = 'cards' | 'transfer' | 'pod';

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const methods: {
  id: PaymentMethodId;
  label: string;
  desc: string;
  icon: typeof CreditCard;
}[] = [
  { id: 'cards', label: 'Bank Cards', desc: 'Accept debit and credit card payments.', icon: CreditCard },
  { id: 'transfer', label: 'Bank Transfer', desc: 'Collect payments into a settlement account.', icon: Banknote },
  { id: 'pod', label: 'Pay on Delivery', desc: 'Let customers pay when orders arrive.', icon: Truck },
];

export default function SetPaymentMethodDrawer({ open, initialMethod = 'transfer', onSave, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<PaymentMethodId>(initialMethod);
  const [form, setForm] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    settlementNote: '',
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (open) setMethod(initialMethod);
  }, [initialMethod, open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const reset = () => {
    setDone(false);
    setErrors({});
    setForm({ bankName: '', accountName: '', accountNumber: '', settlementNote: '' });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (method === 'transfer') {
      if (!form.bankName.trim()) errs.bankName = 'Bank name is required';
      if (!form.accountName.trim()) errs.accountName = 'Account name is required';
      if (!form.accountNumber.trim()) errs.accountNumber = 'Account number is required';
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSave?.(method);
    setDone(true);
  };

  const selected = methods.find(item => item.id === method);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) handleClose(); }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
            >
              <X size={15} strokeWidth={2} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-16 gap-3"
                  >
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Payment method saved!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{selected?.label}</span> has been configured successfully.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Set Payment Method</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Choose how customers can pay and configure settlement details.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {methods.map(({ id, label, desc, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setMethod(id)}
                          className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                            method === id ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
                            <Icon size={16} className="text-slate-500" strokeWidth={1.6} />
                          </span>
                          <span>
                            <span className="block text-[13px] font-bold text-slate-900">{label}</span>
                            <span className="block text-[12px] text-slate-400 mt-0.5">{desc}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    {method === 'transfer' && (
                      <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                        <p className="text-[13px] font-semibold text-slate-800">Settlement Account</p>
                        <div>
                          <input type="text" placeholder="Bank name *" value={form.bankName} onChange={set('bankName')} className={inputCls} />
                          {errors.bankName && <p className="text-[11px] text-red-500 mt-1">• {errors.bankName}</p>}
                        </div>
                        <div>
                          <input type="text" placeholder="Account name *" value={form.accountName} onChange={set('accountName')} className={inputCls} />
                          {errors.accountName && <p className="text-[11px] text-red-500 mt-1">• {errors.accountName}</p>}
                        </div>
                        <div>
                          <input type="text" inputMode="numeric" placeholder="Account number *" value={form.accountNumber} onChange={set('accountNumber')} className={inputCls} />
                          {errors.accountNumber && <p className="text-[11px] text-red-500 mt-1">• {errors.accountNumber}</p>}
                        </div>
                      </div>
                    )}

                    {method !== 'transfer' && (
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-[13px] font-semibold text-slate-800">{selected?.label}</p>
                        <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                          This method will be enabled for checkout. You can return here later to manage provider details.
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Internal Note <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea rows={3} placeholder="Add any settlement or checkout note..." value={form.settlementNote} onChange={set('settlementNote')} className={`${inputCls} resize-none`} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {done ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                    Save Method
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
