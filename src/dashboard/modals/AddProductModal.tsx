import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import ModalShell from './ModalShell';
import StepProductInfo from './StepProductInfo';
import StepMedia from './StepMedia';
import StepPricing from './StepPricing';
import StepSpecs from './StepSpecs';

interface Props {
  open: boolean;
  onClose: () => void;
}

const defaultInfo = { category: '', name: '', description: '' };
const defaultPricing = { price: '', compareAt: '', stock: '' };
const defaultSpecs = { sku: '', weight: '', variants: [] as string[] };

const slideVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function AddProductModal({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState(defaultInfo);
  const [images, setImages] = useState<File[]>([]);
  const [pricing, setPricing] = useState(defaultPricing);
  const [specs, setSpecs] = useState(defaultSpecs);
  const [infoErrors, setInfoErrors] = useState<Partial<Record<'category' | 'name', string>>>({});
  const [pricingErrors, setPricingErrors] = useState<Partial<Record<'price' | 'stock', string>>>({});
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(1); setInfo(defaultInfo); setImages([]); setPricing(defaultPricing);
    setSpecs(defaultSpecs); setInfoErrors({}); setPricingErrors({}); setDone(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const validateInfo = () => {
    const errs: typeof infoErrors = {};
    if (!info.category) errs.category = 'Product Category is required!';
    if (!info.name.trim()) errs.name = 'Product name is required!';
    setInfoErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePricing = () => {
    const errs: typeof pricingErrors = {};
    if (!pricing.price) errs.price = 'Selling price is required!';
    if (!pricing.stock) errs.stock = 'Stock quantity is required!';
    setPricingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return createPortal(
    <ModalShell open={open} onClose={handleClose} step={step}>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center py-6 gap-3">
            <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
            <p className="text-[15px] font-bold text-slate-900">Product saved!</p>
            <p className="text-[13px] text-slate-400 max-w-xs">
              <span className="font-semibold text-slate-700">{info.name}</span> has been added to your store.
            </p>
            <button onClick={handleClose} className="mt-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
              Done
            </button>
          </motion.div>
        ) : step === 1 ? (
          <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <StepProductInfo data={info} onChange={(d) => setInfo((p) => ({ ...p, ...d }))} errors={infoErrors} onNext={() => { if (validateInfo()) setStep(2); }} />
          </motion.div>
        ) : step === 2 ? (
          <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <StepMedia images={images} onChange={setImages} onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </motion.div>
        ) : step === 3 ? (
          <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <StepPricing data={pricing} onChange={(d) => setPricing((p) => ({ ...p, ...d }))} errors={pricingErrors} onBack={() => setStep(2)} onNext={() => { if (validatePricing()) setStep(4); }} />
          </motion.div>
        ) : (
          <motion.div key="s4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <StepSpecs data={specs} onChange={(d) => setSpecs((p) => ({ ...p, ...d }))} onBack={() => setStep(3)} onSubmit={() => setDone(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </ModalShell>,
    document.body
  );
}
