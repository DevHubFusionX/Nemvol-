import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

const sections = [
  { id: 'discovery',  label: 'Discovery'   },
  { id: 'design',     label: 'Design'      },
  { id: 'web',        label: 'Web Dev'     },
  { id: 'mobile',     label: 'Mobile'      },
  { id: 'mvp',        label: 'MVP Express' },
  { id: 'retainer',   label: 'Retainer'    },
];

export function SectionNav() {
  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-4 py-1.5 rounded-full text-[12px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
