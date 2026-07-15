import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const categories = ['Inventory', 'Shipping', 'Marketing', 'Utilities', 'Salaries', 'Software', 'Other'];

export default function LogExpenseDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Inventory',
    date: '',
    note: '',
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleClose = () => {
    setDone(false);
    setErrors({});
    setForm({ title: '', amount: '', category: 'Inventory', date: '', note: '' });
    onClose();
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Expense title is required';
    if (!form.amount.trim()) errs.amount = 'Amount is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setDone(true);
  };

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
                    <p className="text-[15px] font-bold text-slate-900">Expense logged!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.title}</span> has been recorded successfully.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Log Expense</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Record outgoing business costs for tracking.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Expense Details</p>
                      <div>
                        <input type="text" placeholder="Expense title *" value={form.title} onChange={set('title')} className={inputCls} />
                        {errors.title && <p className="text-[11px] text-red-500 mt-1">• {errors.title}</p>}
                      </div>
                      <div>
                        <input type="number" placeholder="Amount (₦) *" value={form.amount} onChange={set('amount')} className={inputCls} min="0" />
                        {errors.amount && <p className="text-[11px] text-red-500 mt-1">• {errors.amount}</p>}
                      </div>
                      <select value={form.category} onChange={set('category')} className={inputCls}>
                        {categories.map(category => <option key={category}>{category}</option>)}
                      </select>
                      <input type="date" value={form.date} onChange={set('date')} className={inputCls} />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Note <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea rows={3} placeholder="Add a receipt note or vendor reference..." value={form.note} onChange={set('note')} className={`${inputCls} resize-none`} />
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
                    Save Expense
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
