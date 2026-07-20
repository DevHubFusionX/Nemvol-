import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useCreatePurchase } from '../../../../hooks/usePurchases';
import { useSuppliers } from '../../../../hooks/usePurchases';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const statusOptions = ['Pending Delivery', 'Partially Received', 'Completed', 'Cancelled'];

interface LineItem {
  id: number;
  name: string;
  qty: string;
  cost: string;
}

export default function AddPurchaseDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    supplierId: '',
    expectedDate: '',
    status: 'Pending Delivery',
    notes: '',
  });
  const [items, setItems] = useState<LineItem[]>([{ id: 1, name: '', qty: '1', cost: '' }]);
  const { mutate: createPurchase, isPending } = useCreatePurchase();
  const { data: suppliers = [] } = useSuppliers();

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const setItem = (id: number, k: keyof LineItem, v: string) =>
    setItems(p => p.map(i => (i.id === id ? { ...i, [k]: v } : i)));

  const addItem = () =>
    setItems(p => [...p, { id: Date.now(), name: '', qty: '1', cost: '' }]);

  const removeItem = (id: number) =>
    setItems(p => p.filter(i => i.id !== id));

  const total = items.reduce((sum, i) => {
    return sum + (parseFloat(i.qty) || 0) * (parseFloat(i.cost) || 0);
  }, 0);

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
    setForm({ supplierId: '', expectedDate: '', status: 'Pending Delivery', notes: '' });
    setItems([{ id: 1, name: '', qty: '1', cost: '' }]);
    onClose();
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.supplierId) errs.supplier = 'Supplier is required';
    if (items.some(i => !i.name.trim())) errs.items = 'All items need a name';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    if (submitting.current) return;
    submitting.current = true;
    createPurchase({
      supplierId: form.supplierId || undefined,
      status: 'pending',
      total: String(total),
      items: JSON.stringify(items),
      notes: form.notes,
      expectedDate: form.expectedDate,
    }, { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false; } });
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
                    <p className="text-[15px] font-bold text-slate-900">Purchase order created!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      Purchase from <span className="font-semibold text-slate-700">{suppliers.find(s => s.id === form.supplierId)?.name ?? 'supplier'}</span> has been logged successfully.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Add Purchase Order</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Log incoming inventory from a supplier.</p>
                    </div>

                    {/* Supplier */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Supplier *</label>
                      <select
                        value={form.supplierId}
                        onChange={e => setForm(p => ({ ...p, supplierId: e.target.value }))}
                        className={inputCls}
                      >
                        <option value="">Select a supplier…</option>
                        {suppliers.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      {errors.supplier && <p className="text-[11px] text-red-500 mt-1">• {errors.supplier}</p>}
                    </div>

                    {/* Line items */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Items Ordered</p>
                      {errors.items && <p className="text-[11px] text-red-500">• {errors.items}</p>}
                      {items.map((item, idx) => (
                        <div key={item.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_64px_96px_auto] gap-2 items-center">
                          <input
                            type="text"
                            placeholder={`Item ${idx + 1}`}
                            value={item.name}
                            onChange={e => setItem(item.id, 'name', e.target.value)}
                            className={`${inputCls} col-span-2 sm:col-span-1`}
                          />
                          <input
                            type="number"
                            placeholder="Qty"
                            value={item.qty}
                            onChange={e => setItem(item.id, 'qty', e.target.value)}
                            className={`${inputCls} text-center`}
                            min="1"
                          />
                          <input
                            type="number"
                            placeholder="₦ Cost"
                            value={item.cost}
                            onChange={e => setItem(item.id, 'cost', e.target.value)}
                            className={inputCls}
                            min="0"
                          />
                          {items.length > 1 && (
                            <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors justify-self-end">
                              <Trash2 size={14} strokeWidth={1.8} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addItem}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <Plus size={13} strokeWidth={2} /> Add item
                      </button>
                      {total > 0 && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[12px] text-slate-400">Order Total</span>
                          <span className="text-[14px] font-bold text-slate-900">₦{total.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Expected delivery + status */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Expected Delivery</label>
                        <input type="date" value={form.expectedDate} onChange={set('expectedDate')} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Status</label>
                        <select value={form.status} onChange={set('status')} className={inputCls}>
                          {statusOptions.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Notes <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any notes about this purchase order..."
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
                    {isPending ? 'Saving…' : 'Save Purchase'}
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
