import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Download, FileSpreadsheet, Upload, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white focus:outline-none focus:border-slate-400 transition-colors bg-white';

export default function ManageCsvDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState('');

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
    setFileName('');
    onClose();
  };

  const handleImport = () => {
    if (!fileName) return;
    setDone(true);
  };

  const handleDownloadTemplate = () => {
    const csv = 'name,email,phone,address,segment,note\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nemvol-customers-template.csv';
    link.click();
    URL.revokeObjectURL(url);
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
                    <p className="text-[15px] font-bold text-slate-900">CSV ready for import</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{fileName}</span> has been selected successfully.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Manage CSV</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Import customer records or export a customer template.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                          <Upload size={16} className="text-slate-400" strokeWidth={1.6} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">Import Customers</p>
                          <p className="text-[12px] text-slate-400">Upload a CSV file with name, email, phone, and address columns.</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".csv,text/csv"
                        onChange={e => setFileName(e.target.files?.[0]?.name ?? '')}
                        className={inputCls}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="w-full rounded-xl border border-slate-100 p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                          <Download size={16} className="text-slate-400" strokeWidth={1.6} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">Download CSV Template</p>
                          <p className="text-[12px] text-slate-400">Use the recommended customer import format.</p>
                        </div>
                      </div>
                    </button>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <FileSpreadsheet size={16} className="text-slate-400 shrink-0 mt-0.5" strokeWidth={1.6} />
                        <p className="text-[12px] leading-relaxed text-slate-500">
                          Keep each customer on one row. Existing customer records can be matched later by email or phone number.
                        </p>
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
                  <button
                    onClick={handleImport}
                    disabled={!fileName}
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    Import CSV
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
