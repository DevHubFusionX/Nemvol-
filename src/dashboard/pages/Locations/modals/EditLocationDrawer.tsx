import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Trash2 } from 'lucide-react';
import type { Location } from '../LocationsList';

interface Props {
  open: boolean;
  onClose: () => void;
  location: Location | null;
  onSave: (updated: Location) => void;
  onDelete: (id: string) => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const locationTypes = ['Branch', 'Logistics Hub', 'Pickup Point'] as const;

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

export default function EditLocationDrawer({ open, onClose, location, onSave, onDelete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Omit<Location, 'id'>>({
    name: '', address: '', city: '', state: '', phone: '', type: 'Branch',
  });

  useEffect(() => {
    if (location) {
      setForm({ name: location.name, address: location.address, city: location.city, state: location.state, phone: location.phone ?? '', type: location.type });
      setDone(false);
      setConfirmDelete(false);
      setErrors({});
    }
  }, [location]);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const handleClose = () => { setDone(false); setConfirmDelete(false); onClose(); };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Location name is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state) errs.state = 'State is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSave({ ...form, id: location!.id });
    setDone(true);
  };

  const handleDelete = () => { onDelete(location!.id); handleClose(); };

  if (!location) return null;

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
                    <p className="text-[15px] font-bold text-slate-900">Location updated!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.name}</span> has been saved.
                    </p>
                  </motion.div>
                ) : confirmDelete ? (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-16 gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">Remove this location?</p>
                      <p className="text-[13px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                        <span className="font-semibold text-slate-700">{location.name}</span> will be
                        permanently removed from your network.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Edit Location</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Update the details for this location.</p>
                    </div>

                    {/* Type selector */}
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800 mb-2">Location Type</p>
                      <div className="flex gap-2">
                        {locationTypes.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, type: t }))}
                            className={`flex-1 py-2 rounded-xl text-[12px] font-semibold transition-colors border ${
                              form.type === t
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Location Details</p>
                      <div>
                        <input type="text" placeholder="Location name *" value={form.name} onChange={set('name')} className={inputCls} />
                        {errors.name && <p className="text-[11px] text-red-500 mt-1">• {errors.name}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="Street address *" value={form.address} onChange={set('address')} className={inputCls} />
                        {errors.address && <p className="text-[11px] text-red-500 mt-1">• {errors.address}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <input type="text" placeholder="City *" value={form.city} onChange={set('city')} className={inputCls} />
                          {errors.city && <p className="text-[11px] text-red-500 mt-1">• {errors.city}</p>}
                        </div>
                        <div>
                          <select value={form.state} onChange={set('state')} className={inputCls}>
                            <option value="">State *</option>
                            {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {errors.state && <p className="text-[11px] text-red-500 mt-1">• {errors.state}</p>}
                        </div>
                      </div>
                      <input type="tel" placeholder="Phone number (optional)" value={form.phone} onChange={set('phone')} className={inputCls} />
                    </div>

                    <button
                      onClick={() => setConfirmDelete(true)}
                      className="flex items-center gap-1.5 text-[12px] font-medium text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                      Remove this location
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {done ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              ) : confirmDelete ? (
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDelete(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors">
                    Yes, Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                    Save Changes
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
