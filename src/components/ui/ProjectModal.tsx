import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useModal } from './ModalContext';

const services = [
  { id: 'discovery', label: 'Discovery Sprint', desc: '2-week idea validation' },
  { id: 'mvp',       label: 'MVP Express',      desc: '8–12 week full build'  },
  { id: 'design',    label: 'UI/UX Design',     desc: 'Wireframes to hi-fi'   },
  { id: 'web',       label: 'Web Development',  desc: 'Sites & web apps'      },
  { id: 'mobile',    label: 'Mobile App',       desc: 'Android & iOS'         },
  { id: 'retainer',  label: 'Growth Retainer',  desc: 'Post-launch support'   },
];

const PLAN_MAP: Record<string, string> = {
  discovery: 'discovery',
  mvp: 'mvp',
  retainer: 'retainer',
  design: 'design',
  web: 'web',
  mobile: 'mobile',
};

export default function ProjectModal() {
  const { isOpen, close, defaultPlan } = useModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Sync selected plan when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(PLAN_MAP[defaultPlan] ?? '');
      setStep(1);
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }
  }, [isOpen, defaultPlan]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === overlayRef.current) close(); }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
                  {step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900 tracking-tight">
                  {submitted ? 'You\'re all set 🎉' : step === 1 ? 'What are you building?' : 'Tell us about yourself'}
                </h2>
              </div>
              <button
                onClick={close}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-7 py-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-6 gap-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    <p className="text-[15px] text-slate-600 leading-relaxed max-w-xs">
                      Thanks <span className="font-bold text-slate-900">{form.name}</span>! We'll be in touch within 24 hours.
                    </p>
                    <button
                      onClick={close}
                      className="mt-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-[13px] text-slate-400 mb-5">Select the service that fits your needs.</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelected(s.id)}
                          className={`text-left px-4 py-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                            selected === s.id
                              ? 'border-[var(--color-brand-blue)] bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`block text-[13px] font-bold ${selected === s.id ? 'text-[var(--color-brand-blue)]' : 'text-slate-800'}`}>
                            {s.label}
                          </span>
                          <span className="block text-[11px] text-slate-400 mt-0.5">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!selected}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-bold transition-all duration-200 cursor-pointer"
                    >
                      Continue
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tell us about your project</label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What are you building and what stage are you at?"
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors resize-none"
                      />
                    </div>
                    <div className="flex gap-3 mt-1">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-[13px] font-bold hover:border-slate-300 transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 cursor-pointer"
                      >
                        Send
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
