import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useCreateSupplier } from '../../../../hooks/usePurchases';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const paymentTerms = ['Prepaid', 'Net 7', 'Net 14', 'Net 30', 'On Delivery', 'Credit'];
const categories = ['Electronics', 'Fashion & Apparel', 'Food & Beverages', 'Beauty & Health', 'Home & Furniture', 'Raw Materials', 'Packaging', 'Other'];

export default function AddSupplierDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    paymentTerm: 'Prepaid',
    notes: '',
  });
  const { mutate: createSupplier, isPending } = useCreateSupplier();

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
    setForm({ name: '', contactPerson: '', email: '', phone: '', address: '', category: '', paymentTerm: 'Prepaid', notes: '' });
    onClose();
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Supplier name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    if (submitting.current) return;
    submitting.current = true;
    createSupplier(
      { name: form.name, email: form.email || undefined, phone: form.phone || undefined },
      { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false; } }
    );
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) handleClose(); }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
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
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-16 gap-3"
                  >
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Supplier added!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.name}</span> has been added to your supplier list.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Add Supplier</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Add a supplier to link to your purchase orders.</p>
                    </div>

                    {/* Business info */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Business Info</p>
                      <div>
                        <input type="text" placeholder="Supplier / business name *" value={form.name} onChange={set('name')} className={inputCls} />
                        {errors.name && <p className="text-[11px] text-red-500 mt-1">• {errors.name}</p>}
                      </div>
                      <input type="text" placeholder="Contact person" value={form.contactPerson} onChange={set('contactPerson')} className={inputCls} />
                      <select value={form.category} onChange={set('category')} className={inputCls}>
                        <option value="">Category (optional)</option>
                        {categories.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* Contact */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Contact Details</p>
                      <div>
                        <input type="tel" placeholder="Phone number *" value={form.phone} onChange={set('phone')} className={inputCls} />
                        {errors.phone && <p className="text-[11px] text-red-500 mt-1">• {errors.phone}</p>}
                      </div>
                      <input type="email" placeholder="Email address" value={form.email} onChange={set('email')} className={inputCls} />
                      <input type="text" placeholder="Address" value={form.address} onChange={set('address')} className={inputCls} />
                    </div>

                    {/* Payment terms */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-2">Payment Terms</label>
                      <div className="flex flex-wrap gap-2">
                        {paymentTerms.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, paymentTerm: t }))}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                              form.paymentTerm === t
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Notes <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any notes about this supplier..."
                        value={form.notes}
                        onChange={set('notes')}
                        className={`${inputCls} resize-none`}
                      />
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
                  <button onClick={handleSubmit} disabled={isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {isPending ? 'Saving…' : 'Save Supplier'}
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
