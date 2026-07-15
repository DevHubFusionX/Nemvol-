import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const fieldOptions = ['Full Name', 'Email Address', 'Phone Number', 'Company Name'];

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

export default function AccessGateDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [gateEnabled, setGateEnabled] = useState(false);
  const [fields, setFields] = useState<string[]>(['Full Name', 'Email Address']);
  const [message, setMessage] = useState('');

  const reset = () => { setDone(false); };
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

  const toggleField = (f: string) =>
    setFields(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  const handleSave = () => setDone(true);

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
                    <p className="text-[15px] font-bold text-slate-900">Gate configured!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      Your access gate settings have been saved.{' '}
                      {gateEnabled ? 'Visitors must now submit their details to browse.' : 'The gate is currently disabled.'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Configure Access Gate</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Require visitors to submit contact details before browsing your storefront.
                      </p>
                    </div>

                    {/* Enable toggle */}
                    <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">Enable Access Gate</p>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                          Visitors must fill the form before they can browse.
                        </p>
                      </div>
                      <Toggle on={gateEnabled} onToggle={() => setGateEnabled(v => !v)} />
                    </div>

                    {/* Fields to collect */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Fields to Collect</p>
                      <p className="text-[12px] text-slate-400">Select which details visitors must provide.</p>
                      <div className="flex flex-wrap gap-2">
                        {fieldOptions.map(f => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => toggleField(f)}
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors border ${
                              fields.includes(f)
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Welcome message */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Welcome Message{' '}
                        <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Welcome! Please share your details to access our exclusive catalogue."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
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
                  <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                    Save Settings
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
