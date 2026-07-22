import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, ChevronDown } from 'lucide-react';
import { useAddShippingZone, useUpdateShippingZone, type ShippingZone } from '../../../../hooks/useShipping';

interface Props {
  open: boolean;
  onClose: () => void;
  editZone?: ShippingZone | null;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

const rateTypes = [
  { id: 'flat', label: 'Flat Rate', desc: 'Fixed fee for all orders in this zone.' },
  { id: 'free', label: 'Free Shipping', desc: 'No shipping fee for this zone.' },
  { id: 'weight', label: 'Weight-Based', desc: 'Fee calculated by item weight.' },
];

const blank = { zoneName: '', rateType: 'flat', flatRate: '', minWeight: '', maxWeight: '', weightRate: '', minOrderFree: '' };

export default function AddShippingZoneDrawer({ open, onClose, editZone }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const addZone = useAddShippingZone();
  const updateZone = useUpdateShippingZone();
  const isEditing = !!editZone;
  const isPending = addZone.isPending || updateZone.isPending;

  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statesOpen, setStatesOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Hydrate when editing
  useEffect(() => {
    if (editZone && open) {
      const regions: string[] = editZone.regions ? JSON.parse(editZone.regions) : [];
      setForm({
        zoneName: editZone.name,
        rateType: editZone.rateType,
        flatRate: editZone.rate ?? '',
        minOrderFree: editZone.minOrderFree ?? '',
        minWeight: editZone.minWeight ?? '',
        maxWeight: editZone.maxWeight ?? '',
        weightRate: editZone.weightRate ?? '',
      });
      setSelectedStates(regions);
      setDone(false);
      setErrors({});
    } else if (!editZone && open) {
      setForm(blank);
      setSelectedStates([]);
      setDone(false);
      setErrors({});
    }
  }, [editZone, open]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const toggleState = (s: string) =>
    setSelectedStates(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

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
    setDone(false); setErrors({}); setStatesOpen(false); onClose();
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.zoneName.trim()) errs.zoneName = 'Zone name is required';
    if (selectedStates.length === 0) errs.states = 'Select at least one state';
    if (form.rateType === 'flat' && !form.flatRate) errs.flatRate = 'Flat rate amount is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const payload = {
      name: form.zoneName,
      rateType: form.rateType,
      rate: form.rateType === 'flat' ? form.flatRate : '0',
      minOrderFree: form.minOrderFree || undefined,
      minWeight: form.minWeight || undefined,
      maxWeight: form.maxWeight || undefined,
      weightRate: form.weightRate || undefined,
    };

    if (isEditing) {
      if (submitting.current) return;
      submitting.current = true;
      updateZone.mutate({ id: editZone!.id, ...payload, regions: selectedStates }, { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false; } });
    } else {
      if (submitting.current) return;
      submitting.current = true;
      addZone.mutate({ ...payload, regions: selectedStates }, { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false; } });
    }
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
            <button onClick={handleClose} className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10">
              <X size={15} strokeWidth={2} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-16 gap-3">
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Zone {isEditing ? 'updated' : 'added'}!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.zoneName}</span> covers {selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''}.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">{isEditing ? 'Edit' : 'Add'} Shipping Zone</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Define coverage areas and delivery rates for this zone.</p>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Zone Name *</label>
                      <input type="text" placeholder="e.g. Lagos Express" value={form.zoneName} onChange={set('zoneName')} className={inputCls} />
                      {errors.zoneName && <p className="text-[11px] text-red-500 mt-1">• {errors.zoneName}</p>}
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Coverage States *</label>
                      <button
                        type="button"
                        onClick={() => setStatesOpen(v => !v)}
                        className={`${inputCls} flex items-center justify-between text-left`}
                      >
                        <span className={selectedStates.length ? 'text-slate-800' : 'text-slate-300'}>
                          {selectedStates.length ? `${selectedStates.length} state${selectedStates.length !== 1 ? 's' : ''} selected` : 'Select states…'}
                        </span>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${statesOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
                      </button>
                      {errors.states && <p className="text-[11px] text-red-500 mt-1">• {errors.states}</p>}
                      <AnimatePresence>
                        {statesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            className="mt-1 rounded-xl border border-slate-200 bg-white shadow-lg max-h-48 overflow-y-auto"
                          >
                            <div className="flex flex-wrap gap-1.5 p-3">
                              {STATES.map(s => (
                                <button key={s} type="button" onClick={() => toggleState(s)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${selectedStates.includes(s) ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-2">Rate Type</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {rateTypes.map(({ id, label, desc }) => (
                          <button key={id} type="button" onClick={() => setForm(p => ({ ...p, rateType: id }))}
                            className={`text-left p-3 rounded-xl border-2 transition-all ${form.rateType === id ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                          >
                            <p className="text-[12px] font-bold text-slate-900">{label}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.rateType === 'flat' && (
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Flat Rate (₦) *</label>
                        <input type="number" placeholder="e.g. 1500" value={form.flatRate} onChange={set('flatRate')} className={inputCls} min="0" />
                        {errors.flatRate && <p className="text-[11px] text-red-500 mt-1">• {errors.flatRate}</p>}
                      </div>
                    )}
                    {form.rateType === 'free' && (
                      <div>
                        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                          Minimum Order for Free Shipping (₦) <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                        </label>
                        <input type="number" placeholder="e.g. 10000 — leave blank for always free" value={form.minOrderFree} onChange={set('minOrderFree')} className={inputCls} min="0" />
                      </div>
                    )}
                    {form.rateType === 'weight' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Min Weight (kg)</label>
                            <input type="number" placeholder="0" value={form.minWeight} onChange={set('minWeight')} className={inputCls} min="0" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Max Weight (kg)</label>
                            <input type="number" placeholder="50" value={form.maxWeight} onChange={set('maxWeight')} className={inputCls} min="0" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Rate per kg (₦)</label>
                          <input type="number" placeholder="e.g. 200" value={form.weightRate} onChange={set('weightRate')} className={inputCls} min="0" />
                        </div>
                      </div>
                    )}
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
                  <button onClick={handleSubmit} disabled={isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {isPending ? 'Saving…' : isEditing ? 'Save Changes' : 'Save Zone'}
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
