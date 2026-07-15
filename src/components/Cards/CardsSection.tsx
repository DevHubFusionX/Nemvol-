import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    num: '01',
    title: 'Product Discovery',
    description:
      'We validate your idea before writing a line of code — user research, market analysis, wireframes, and an investor-ready brief in 2 weeks.',
    cta: 'Explore Discovery',
    href: '/pricing',
  },
  {
    num: '02',
    title: 'MVP Express',
    description:
      'A fully functional web or mobile product in 8–12 weeks. Focused on validation, not feature bloat — with analytics, testing, and deployment included.',
    cta: 'Explore MVP Build',
    href: '/pricing',
  },
  {
    num: '03',
    title: 'Growth Retainer',
    description:
      'Post-launch iteration, analytics, and support. We stay beyond deployment to help you grow, optimise, and scale with confidence.',
    cta: 'Explore Retainers',
    href: '/pricing',
  },
];

export default function CardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-slate-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
              className="relative px-8 py-12 flex flex-col gap-5 overflow-hidden"
            >
              {/* Background number */}
              <span className="absolute -top-3 right-6 text-[7rem] font-extrabold text-slate-800 leading-none select-none pointer-events-none tabular-nums">
                {card.num}
              </span>

              <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug relative">
                {card.title}
              </h3>
              <p className="text-[14px] text-slate-400 leading-relaxed flex-1 relative">
                {card.description}
              </p>
              <Link
                to={card.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group w-fit relative"
              >
                {card.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
