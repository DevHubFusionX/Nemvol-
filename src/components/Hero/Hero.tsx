import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../ui/ModalContext';

const images = [
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=1000&fit=crop&q=80',
];

const trustPoints = [
  'MVP delivered in 8–12 weeks',
  'Discovery-first, outcome-driven',
  'Full IP ownership — always yours',
];

/* Stagger children on mount */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Hero() {
  const [activeImg, setActiveImg] = useState(0);
  const { open } = useModal();

  const next = useCallback(() => {
    setActiveImg((prev) => (prev + 1) % images.length);
  }, []);

  /* Auto-rotate every 5s */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ─── Left: Copy ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.75rem] sm:text-[3.25rem] lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent"
            >
              Your idea deserves to be built right.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base sm:text-[17px] text-slate-500 leading-relaxed max-w-md"
            >
              Nemvol is a product development agency that helps founders, startups,
              and SMEs turn ideas into validated digital products — fast, structured,
              and built to scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => open()}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-sm font-bold shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-bold transition-all duration-200"
              >
                <span>See Our Services</span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.ul
              variants={fadeUp}
              className="mt-10 space-y-2.5"
            >
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[13px] font-semibold text-slate-500">{point}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ─── Right: Image Carousel ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt="Commerce showcase"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeImg
                      ? 'w-6 h-2 bg-blue-600'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
