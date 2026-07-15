import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import StepSelectProducts from './StepSelectProducts';
import StepSetQuantities from './StepSetQuantities';
import StepConfirmTransfer from './StepConfirmTransfer';

interface Props {
  open: boolean;
  onClose: () => void;
}

const STEP_LABELS = ['Select products', 'Set quantities', 'Confirm transfer'];

const slideVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function InventoryTransferModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [destination, setDestination] = useState('');
  const [destError, setDestError] = useState('');
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(1); setSelected([]); setQuantities({});
    setDestination(''); setDestError(''); setDone(false);
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

  const handleNext = () => {
    if (step === 3) {
      if (!destination) { setDestError('Please select a destination location'); return; }
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const nextDisabled = step === 1 && selected.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-slate-900/15 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 shrink-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-[18px] font-bold text-slate-900">Transfer Inventory</h2>
                  <p className="text-[12px] text-slate-400 mt-1 leading-relaxed max-w-xs">
                    Move stock from your current branch to another location without editing product details. Choose products, set quantities, and confirm the destination before final submission.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 ml-3"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>

              {/* Step bar */}
              {!done && (
                <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-2.5 flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-slate-500">Step {step} of 3</p>
                  <p className="text-[12px] font-semibold text-slate-700">{STEP_LABELS[step - 1]}</p>
                </div>
              )}

              {/* Meta row */}
              {!done && (
                <div className="flex items-center justify-between mt-2 px-1">
                  <p className="text-[11px] text-slate-400">
                    Selected products: <span className="font-semibold text-slate-600">{selected.length}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Destination: <span className="font-semibold text-slate-600">{destination || 'Not selected'}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    variants={slideVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center py-10 gap-3"
                  >
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Transfer submitted!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      {selected.length} product{selected.length > 1 ? 's' : ''} will be transferred to{' '}
                      <span className="font-semibold text-slate-700">{destination}</span>.
                    </p>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <StepSelectProducts selected={selected} onChange={setSelected} />
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <StepSetQuantities selectedIds={selected} quantities={quantities} onChange={setQuantities} />
                  </motion.div>
                ) : (
                  <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    <StepConfirmTransfer
                      selectedIds={selected}
                      quantities={quantities}
                      destination={destination}
                      onDestinationChange={(d) => { setDestination(d); setDestError(''); }}
                      error={destError}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer CTA */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 shrink-0">
              {done ? (
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
                >
                  Done
                </button>
              ) : (
                <div className="flex gap-2">
                  {step > 1 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="px-5 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={nextDisabled}
                    className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {step === 3 ? 'Submit Transfer' : 'Next'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
