import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../ui/ModalContext';

/* ─── Tab Data ─── */
const tabs = [
  {
    id: 'websites',
    label: 'Websites',
    tag: 'WEBSITE BUILDER',
    title: 'Websites that convert.',
    description:
      'Create a professional online presence with beautiful, responsive websites. Optimized for mobile, standard custom domains, and sitemaps generated automatically.',
    cta: 'Explore Store builder',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&h=480&fit=crop&q=80',
  },
  {
    id: 'payments',
    label: 'Payments',
    tag: 'PAYMENT PROCESSING',
    title: 'Accept money everywhere.',
    description:
      'Localized payment methods, instant settlements, and automatic reconciliation. Support cards, bank transfers, and mobile money across Africa.',
    cta: 'Explore Payments',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=720&h=480&fit=crop&q=80',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    tag: 'FULFILLMENT',
    title: 'Ship without the stress.',
    description:
      'Generate shipping labels, track parcels in real-time, and manage returns from a single dashboard. Integrated with local and international carriers.',
    cta: 'Explore Logistics',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=720&h=480&fit=crop&q=80',
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    tag: 'INTELLIGENCE',
    title: 'Your AI co‑pilot.',
    description:
      'Automatically write product listings, respond to customer queries, and generate marketing copy. Trained on commerce data so it understands your business.',
    cta: 'Explore AI Assistant',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=720&h=480&fit=crop&q=80',
  },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const current = tabs[activeTab];
  const { open } = useModal();

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[11px] font-bold text-blue-600 tracking-widest uppercase">
            Unified Commerce Engine
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-70% to-slate-300 bg-clip-text text-transparent leading-tight">
            Everything. Finally. Works together.
          </h2>
          <p className="mt-4 text-[15px] text-slate-400 leading-relaxed">
            All your website elements built into a single, high-performance workspace.
          </p>
        </motion.div>

        {/* ─── Tabs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="flex items-center justify-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-slate-200 p-1 bg-white">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`relative px-5 py-2 rounded-full text-[13px] font-bold transition-colors duration-200 cursor-pointer select-none ${
                  i === activeTab
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {i === activeTab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-900 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── Content ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
          >
            {/* Left: Copy */}
            <div className="max-w-md">
              <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">
                {current.tag}
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {current.title}
              </h3>
              <p className="mt-4 text-[15px] text-slate-500 leading-relaxed">
                {current.description}
              </p>
              <button
                onClick={() => open()}
                className="inline-flex items-center space-x-1.5 mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
              >
                <span className="underline underline-offset-4 decoration-blue-200 group-hover:decoration-blue-400 transition-colors">
                  {current.cta}
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-slate-100 shadow-lg shadow-slate-200/40">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full aspect-3/2 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
