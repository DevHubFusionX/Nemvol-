import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Apple, Play, Monitor } from 'lucide-react';
import { useModal } from '../ui/ModalContext';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { open } = useModal();

  return (
    <section ref={ref} className="bg-white py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-slate-900 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0"
        >
          {/* Left: copy */}
          <div className="flex flex-col justify-between px-10 py-14 lg:px-14 lg:py-16">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
                Your idea deserves<br />to be built right.<br />Let's build it.
              </h2>
              <p className="mt-6 text-[15px] text-slate-400 leading-relaxed max-w-sm">
                From discovery to deployment — Nemvol partners with founders and teams to build products that last.
              </p>
              <button
                onClick={() => open()}
                className="inline-flex items-center mt-8 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Start a Project
              </button>
            </div>

            {/* App links */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mb-4">
                How we work
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Monitor, label: 'Discovery Sprint', to: '/pricing' },
                  { icon: Play, label: 'MVP Express', to: '/pricing' },
                  { icon: Apple, label: 'Growth Retainer', to: '/pricing' },
                ].map(({ icon: Icon, label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-[12px] font-bold transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative min-h-[320px] lg:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=700&fit=crop&q=80"
              alt="Nemvol team collaborating"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* subtle gradient blend into dark */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-transparent to-transparent lg:block hidden" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
