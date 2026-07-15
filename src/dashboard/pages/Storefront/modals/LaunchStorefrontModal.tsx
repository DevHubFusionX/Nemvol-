import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onPublished: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

export default function LaunchStorefrontModal({ open, onClose, onPublished }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    storeName: '',
    headline: '',
    notice: '',
    whatsapp: '',
    instagram: '',
  });
  const [errors, setErrors] = useState<Partial<Record<'storeName', string>>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

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
    onClose();
  };

  const handlePublish = () => {
    if (!form.storeName.trim()) {
      setErrors({ storeName: 'Store name is required' });
      return;
    }
    setErrors({});
    setDone(true);
    onPublished();
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
          onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-md bg-white shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col h-full"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
            >
              <X size={15} strokeWidth={2} />
            </button>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-8 gap-3"
                  >
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Storefront published!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{form.storeName}</span> is now live. Share your store link to start receiving orders.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Hero card */}
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <h2 className="text-[17px] font-bold text-slate-900">Launch My Storefront</h2>
                      <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">
                        Complete essentials here, then continue in{' '}
                        <span className="text-slate-600 font-medium">Website Builder</span> or{' '}
                        <span className="text-slate-600 font-medium">Tools</span> for advanced styling.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                          Open Website Builder <ExternalLink size={11} strokeWidth={2} />
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                          Visit Tools <ExternalLink size={11} strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    {/* Store Name */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Store Name</label>
                      <input type="text" value={form.storeName} onChange={set('storeName')} placeholder="e.g. Devhub" className={inputCls} />
                      {errors.storeName && (
                        <p className="text-[11px] text-red-500 mt-1">• {errors.storeName}</p>
                      )}
                    </div>

                    {/* Headline */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Headline Message</label>
                      <textarea rows={3} value={form.headline} onChange={set('headline')} placeholder="Best Store here" className={`${inputCls} resize-none`} />
                    </div>

                    {/* Notice */}
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Store Notice{' '}
                        <span className="text-[11px] font-normal text-slate-400">(This will appear at the top of your website)</span>
                      </label>
                      <textarea rows={3} value={form.notice} onChange={set('notice')} placeholder="E.g: Inform your customers about any notice about your store" className={`${inputCls} resize-none`} />
                    </div>

                    {/* Social Links */}
                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Social Links</p>
                      <input type="text" value={form.whatsapp} onChange={set('whatsapp')} placeholder="WhatsApp" className={inputCls} />
                      <input type="text" value={form.instagram} onChange={set('instagram')} placeholder="Instagram" className={inputCls} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {done ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              ) : (
                <button onClick={handlePublish} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Publish
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
