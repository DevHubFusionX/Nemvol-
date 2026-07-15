import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Search } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const tlds = ['.com', '.store', '.shop', '.co', '.ng', '.io'];

const prices: Record<string, string> = {
  '.com': '₦15,000/yr',
  '.store': '₦8,000/yr',
  '.shop': '₦9,500/yr',
  '.co': '₦18,000/yr',
  '.ng': '₦12,000/yr',
  '.io': '₦35,000/yr',
};

export default function GetDomainDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setQuery('');
    setSelected(null);
    setDone(false);
    setError('');
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

  const slug = query.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const showResults = slug.length > 0;

  const handleRequest = () => {
    if (!selected) { setError('Select a domain option to continue'); return; }
    setError('');
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
                    <p className="text-[15px] font-bold text-slate-900">Request submitted!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      Your request for{' '}
                      <span className="font-semibold text-slate-700">
                        {slug}{selected}
                      </span>{' '}
                      has been received. Our team will reach out within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Get a New Domain</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Search for a domain name and we'll help you register it.
                      </p>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 focus-within:border-slate-400 transition-colors bg-white">
                      <Search size={14} className="text-slate-400 shrink-0" strokeWidth={1.8} />
                      <input
                        type="text"
                        placeholder="Search domain name..."
                        value={query}
                        onChange={e => { setQuery(e.target.value); setSelected(null); setError(''); }}
                        className="flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-300 outline-none"
                        autoFocus
                      />
                    </div>

                    {/* Results */}
                    <AnimatePresence>
                      {showResults && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="rounded-xl border border-slate-100 overflow-hidden"
                        >
                          {tlds.map((tld, i) => (
                            <button
                              key={tld}
                              type="button"
                              onClick={() => { setSelected(tld); setError(''); }}
                              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                                i < tlds.length - 1 ? 'border-b border-slate-100' : ''
                              } ${
                                selected === tld
                                  ? 'bg-slate-900'
                                  : 'bg-white hover:bg-slate-50'
                              }`}
                            >
                              <span className={`text-[13px] font-semibold ${selected === tld ? 'text-white' : 'text-slate-800'}`}>
                                {slug}{tld}
                              </span>
                              <span className={`text-[12px] font-medium ${selected === tld ? 'text-slate-300' : 'text-slate-400'}`}>
                                {prices[tld]}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {error && <p className="text-[11px] text-red-500">• {error}</p>}

                    {!showResults && (
                      <div className="rounded-xl border border-slate-100 p-4">
                        <p className="text-[13px] font-semibold text-slate-800 mb-2">Why get a custom domain?</p>
                        <ul className="space-y-1.5">
                          {[
                            'Builds trust with customers',
                            'Improves brand recognition',
                            'Better SEO performance',
                            'Professional email addresses',
                          ].map(item => (
                            <li key={item} className="flex items-center gap-2 text-[12px] text-slate-500">
                              <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
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
                  <button
                    onClick={handleRequest}
                    disabled={!selected}
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Request Domain
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
