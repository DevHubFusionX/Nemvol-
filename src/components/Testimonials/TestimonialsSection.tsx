import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const row1 = [
  { quote: 'Nemvol delivered our MVP in 9 weeks. The discovery sprint alone saved us months of building the wrong thing.', name: 'Tunde Oke', location: 'Nigeria' },
  { quote: 'The team understood our market from day one. African-first thinking with global engineering quality.', name: 'Amara Diallo', location: 'Senegal' },
  { quote: 'We raised our pre-seed round using the investor brief Nemvol produced in the discovery sprint.', name: 'James Sterling', location: 'United Kingdom' },
  { quote: 'Clear milestones, no surprises. We always knew exactly where the project stood.', name: 'Sarah Lin', location: 'United States' },
  { quote: 'Transitioning from a freelancer mess to Nemvol was the best decision we made for our product.', name: 'Kofi Mensah', location: 'Ghana' },
];

const row2 = [
  { quote: 'The growth retainer means we never have to worry about who maintains and improves our product post-launch.', name: 'David Ochieng', location: 'Kenya' },
  { quote: 'Nemvol built our white-label product under NDA. Flawless execution, zero leaks, on time.', name: 'Michael Vance', location: 'United States' },
  { quote: 'Our mobile app went from wireframe to App Store in 11 weeks. The QA process was thorough.', name: 'Ama Serwaa', location: 'Ghana' },
  { quote: 'They challenged our assumptions during discovery and saved us from building features nobody wanted.', name: 'Emeka Eze', location: 'Nigeria' },
  { quote: 'Product-led thinking, not just dev-led execution. That difference is everything at the early stage.', name: 'Clara Bello', location: 'Nigeria' },
];

function MarqueeRow({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
        className="flex gap-4 w-max"
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[340px] bg-slate-50 rounded-xl px-6 py-5 flex flex-col gap-3"
          >
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
              <span className="text-[12px] font-bold text-slate-900">{t.name}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">{t.location}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center max-w-xl mx-auto px-4 mb-14"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
          Testimonials
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-tight">
          Trusted by founders worldwide.
        </h2>
        <p className="mt-4 text-[15px] text-slate-400 leading-relaxed">
          Startups and ambitious teams building with Nemvol.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </motion.div>
    </section>
  );
}
