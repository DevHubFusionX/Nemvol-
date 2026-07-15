import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../ui/ModalContext';

const features = [
  { num: '01', name: 'Product Discovery', desc: 'Validate ideas with user research and market analysis before writing code.' },
  { num: '02', name: 'UI/UX Design', desc: 'Wireframes, prototypes, and high-fidelity designs that users love.' },
  { num: '03', name: 'Web Development', desc: 'Fast, scalable websites and web applications built to perform.' },
  { num: '04', name: 'Mobile Apps', desc: 'Android & iOS — native or cross-platform, built for real users.' },
  { num: '05', name: 'MVP Express', desc: 'A validated, deployable product in 8–12 weeks. No feature bloat.' },
  { num: '06', name: 'Growth Retainer', desc: 'Post-launch iteration, analytics, and continuous improvement.' },
  { num: '07', name: 'White-label Dev', desc: 'Dedicated dev teams for agencies under NDA — your brand, our execution.' },
  { num: '08', name: 'Product Redesign', desc: 'Optimise and modernise existing products for better traction.' },
];

const marqueeItems = features.map((f) => f.name);

export default function HubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open } = useModal();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % features.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [paused, next]);

  const current = features[active];

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Asymmetric 2-col ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
              What We Build
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.08]">
              End-to-end.<br />From idea<br />to launch.
            </h2>
            <p className="mt-6 text-[15px] text-slate-400 leading-relaxed max-w-sm">
              Every service we offer is designed to reduce risk and accelerate the path from idea to a product people actually use.
            </p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-1.5 mt-8 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group cursor-pointer"
            >
              See all services
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Right: auto-cycling card + name buttons */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="flex flex-col gap-6"
          >
            {/* Feature card */}
            <div className="relative rounded-2xl bg-slate-50 border border-slate-100 px-8 py-10 min-h-[160px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
                    {current.num}
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                    {current.name}
                  </h3>
                  <p className="mt-2 text-[14px] text-slate-400 leading-relaxed">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>


            </div>

            {/* Feature name pills */}
            <div className="flex flex-wrap gap-2">
              {features.map((f, i) => (
                <button
                  key={f.num}
                  onClick={() => { setActive(i); setPaused(true); }}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                    i === active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="mt-20 border-t border-b border-slate-100 py-5 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          className="flex gap-12 whitespace-nowrap w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((name, i) => (
            <span key={i} className="text-[11px] font-bold tracking-widest uppercase text-slate-300">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
