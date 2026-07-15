import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import type { StaffMember } from '../StaffsList';
import { roles, roleDescriptions, type Role } from './staffRoles';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (staff: StaffMember) => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

export default function AddStaffDrawer({ open, onClose, onAdd }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', email: '', role: 'Manager' as Role, branch: '' });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const reset = () => {
    setDone(false);
    setErrors({});
    setForm({ name: '', email: '', role: 'Manager', branch: '' });
  };

  const handleClose = () => { reset(); onClose(); };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onAdd({
      id: Date.now().toString(),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      branch: form.branch.trim() || 'Main Branch',
      status: 'active',
    });
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
                    <p className="text-[15px] font-bold text-slate-900">Staff member added!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.name}</span> has been
                      added as <span className="font-semibold text-slate-700">{form.role}</span>.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Add New Staff</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Invite a team member to help manage your store.
                      </p>
                    </div>

                    {/* Personal info */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Personal Info</p>
                      <div>
                        <input
                          type="text"
                          placeholder="Full name *"
                          value={form.name}
                          onChange={set('name')}
                          className={inputCls}
                        />
                        {errors.name && <p className="text-[11px] text-red-500 mt-1">• {errors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email address *"
                          value={form.email}
                          onChange={set('email')}
                          className={inputCls}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 mt-1">• {errors.email}</p>}
                      </div>
                      <input
                        type="text"
                        placeholder="Branch (optional — defaults to Main Branch)"
                        value={form.branch}
                        onChange={set('branch')}
                        className={inputCls}
                      />
                    </div>

                    {/* Role */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Role & Permissions</p>
                      <div className="space-y-2">
                        {roles.map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, role: r }))}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors text-left ${
                              form.role === r
                                ? 'border-slate-900 bg-slate-900'
                                : 'border-slate-100 hover:border-slate-200 bg-white'
                            }`}
                          >
                            <div>
                              <p className={`text-[13px] font-semibold ${form.role === r ? 'text-white' : 'text-slate-800'}`}>{r}</p>
                              <p className={`text-[11px] mt-0.5 ${form.role === r ? 'text-slate-300' : 'text-slate-400'}`}>
                                {roleDescriptions[r]}
                              </p>
                            </div>
                            {form.role === r && (
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 ml-3">
                                <div className="w-2 h-2 rounded-full bg-slate-900" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
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
                    Add Staff
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
