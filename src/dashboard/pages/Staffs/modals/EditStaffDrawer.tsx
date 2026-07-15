import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Trash2 } from 'lucide-react';
import type { StaffMember } from '../StaffsList';
import { roles, roleDescriptions, type Role } from './staffRoles';

interface Props {
  open: boolean;
  onClose: () => void;
  staff: StaffMember | null;
  onSave: (updated: StaffMember) => void;
  onRemove: (id: string) => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

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

export default function EditStaffDrawer({ open, onClose, staff, onSave, onRemove }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [form, setForm] = useState({ role: 'Manager' as Role, branch: '', status: 'active' as StaffMember['status'] });

  useEffect(() => {
    if (staff) {
      setForm({ role: staff.role, branch: staff.branch, status: staff.status });
      setDone(false);
      setConfirmRemove(false);
    }
  }, [staff]);

  const handleClose = () => { setDone(false); setConfirmRemove(false); onClose(); };

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
    if (!staff) return;
    onSave({ ...staff, role: form.role, branch: form.branch, status: form.status });
    setDone(true);
  };

  const handleRemove = () => { onRemove(staff!.id); handleClose(); };

  if (!staff) return null;

  const initials = staff.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

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
                    <p className="text-[15px] font-bold text-slate-900">Staff updated!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{staff.name}</span>'s profile has been saved.
                    </p>
                  </motion.div>
                ) : confirmRemove ? (
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
                      <p className="text-[15px] font-bold text-slate-900">Remove this staff member?</p>
                      <p className="text-[13px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                        <span className="font-semibold text-slate-700">{staff.name}</span> will lose
                        all access to your store immediately.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Staff identity */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                        <span className="text-white text-[13px] font-bold">{initials}</span>
                      </div>
                      <div>
                        <h2 className="text-[17px] font-bold text-slate-900">{staff.name}</h2>
                        <p className="text-[12px] text-slate-400">{staff.email}</p>
                      </div>
                    </div>

                    {/* Branch */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Assignment</p>
                      <input
                        type="text"
                        placeholder="Branch name"
                        value={form.branch}
                        onChange={e => setForm(p => ({ ...p, branch: e.target.value }))}
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

                    {/* Suspend toggle */}
                    <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">Suspend Access</p>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                          Temporarily block this staff member from logging in.
                        </p>
                      </div>
                      <Toggle
                        on={form.status === 'suspended'}
                        onToggle={() => setForm(p => ({ ...p, status: p.status === 'suspended' ? 'active' : 'suspended' }))}
                      />
                    </div>

                    <button
                      onClick={() => setConfirmRemove(true)}
                      className="flex items-center gap-1.5 text-[12px] font-medium text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                      Remove staff member
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
              ) : confirmRemove ? (
                <div className="flex gap-2">
                  <button onClick={() => setConfirmRemove(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleRemove} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors">
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
