import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Data ─── */
const partners = ['Techstars', 'Y Combinator Alumni', 'Google for Startups', 'Ventures Platform'];

const stats: { value: number; suffix: string; prefix?: string; label: string }[] = [
  { value: 40, suffix: '+', label: 'Products launched' },
  { value: 8, suffix: ' wks', label: 'Avg. MVP delivery' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
];

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

/* ─── Format number with commas ─── */
function formatNumber(n: number): string {
  if (n % 1 !== 0) return n.toFixed(1);
  return n.toLocaleString('en-US');
}

/* ─── Stat Card ─── */
function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: index * 0.15 }}
      className="text-center"
    >
      <span className="block text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight tabular-nums">
        {stat.prefix ?? ''}{formatNumber(count)}{stat.suffix}
      </span>
      <span className="block mt-2 text-sm text-slate-400 font-semibold">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="bg-slate-50/60 border-t border-slate-100">
      {/* Logo Bar */}
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-6">
        <div className="flex items-center justify-center gap-10 sm:gap-14 flex-wrap">
          {partners.map((name) => (
            <span
              key={name}
              className="text-xs font-bold text-slate-300 tracking-widest uppercase select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-xs mx-auto border-t border-slate-200/60" />

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
