import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const steps = ['Product Info', 'Media', 'Pricing', 'Specifications'];

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  step: number;
  children: React.ReactNode;
}

export default function ModalShell({ open, onClose, step, children }: ModalShellProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl shadow-slate-900/15 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <h2 className="text-[16px] font-bold text-slate-900">Add Product</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
              {steps.map((label, i) => {
                const idx = i + 1;
                const active = idx === step;
                const done = idx < step;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 ${active || done ? '' : 'opacity-40'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        active ? 'bg-slate-900 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {idx}
                      </div>
                      <span className={`text-[12px] font-semibold ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-6 h-px bg-slate-200 mx-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Body */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
