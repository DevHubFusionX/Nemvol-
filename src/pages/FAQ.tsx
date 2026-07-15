import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { useModal } from '../components/ui/ModalContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'What does Nemvol actually do?',
        a: 'Nemvol is a product development agency. We help founders, startups, and SMEs turn ideas into validated digital products — websites, web apps, and mobile apps — through structured discovery, design, and engineering.',
      },
      {
        q: 'Where do I start if I have an idea but no technical background?',
        a: 'Start with a Discovery Sprint. In 2 weeks, we validate your idea, map user flows, create wireframes, and produce an investor-ready brief. You\'ll know exactly what to build and why — before spending on development.',
      },
      {
        q: 'Do I need to have a detailed spec before reaching out?',
        a: 'No. Most of our best projects start with just an idea and a problem statement. Our discovery process is designed to turn that into a clear, scoped product brief.',
      },
    ],
  },
  {
    category: 'Process & Delivery',
    items: [
      {
        q: 'How long does it take to build an MVP?',
        a: 'Our MVP Express engagement delivers a fully functional, deployable product in 8–12 weeks. This includes UI/UX design, development, QA testing, and deployment. Timeline depends on scope defined during discovery.',
      },
      {
        q: 'What is a Discovery Sprint?',
        a: 'A 2-week fixed-fee engagement where we validate your idea through user research, competitor analysis, wireframing, and MVP scoping. The output is a validated product brief, wireframes, and an investor-ready deck.',
      },
      {
        q: 'How do you handle scope creep?',
        a: 'We define scope clearly during discovery and lock it before development begins. Any additions are scoped separately. Milestone-based billing means you only pay when agreed deliverables are met.',
      },
      {
        q: 'What happens after my product launches?',
        a: 'We offer a Growth Retainer — a 30–90 day post-launch engagement covering analytics, UX improvements, feature prioritisation, and iteration. We stay beyond deployment to help you grow.',
      },
    ],
  },
  {
    category: 'Pricing & Contracts',
    items: [
      {
        q: 'How is Nemvol priced?',
        a: 'We use fixed-fee, milestone-based pricing. Discovery Sprints, MVP builds, and Growth Retainers are all packaged with clear deliverables and payment tied to milestones — not time.',
      },
      {
        q: 'Who owns the IP after the project?',
        a: 'You do. Full intellectual property ownership transfers to you upon final payment. This is written into every contract — no exceptions.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes. MVP projects are split into milestone payments — typically 40% upfront, 30% at design sign-off, and 30% at final delivery. We can discuss structures that work for your situation.',
      },
    ],
  },
  {
    category: 'Working Together',
    items: [
      {
        q: 'Do you work with clients outside Nigeria?',
        a: 'Yes. We work with founders and businesses across Africa, the UK, and the US. Our team is remote-first and we\'ve delivered projects for diaspora founders and international clients.',
      },
      {
        q: 'Can you work as a white-label partner for our agency?',
        a: 'Yes. We have dedicated white-label development partnerships with digital and marketing agencies. All work is delivered under NDA with your branding. Reach out to discuss terms.',
      },
      {
        q: 'How do we communicate during a project?',
        a: 'We use milestone-based demos, weekly status updates, and a shared project workspace. You\'ll always know where the project stands — no chasing for updates.',
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer group"
      >
        <span className={`text-[15px] font-bold tracking-tight transition-colors ${open ? 'text-[var(--color-brand-blue)]' : 'text-slate-900 group-hover:text-[var(--color-brand-blue)]'}`}>
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-0.5">
          <Plus className={`w-4 h-4 transition-colors ${open ? 'text-[var(--color-brand-blue)]' : 'text-slate-400'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] text-slate-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });
  const { open } = useModal();

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">FAQ</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-5xl sm:text-6xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-2xl">
            Questions, answered.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[16px] text-slate-400 leading-relaxed max-w-lg">
            Everything you need to know about working with Nemvol. Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-[var(--color-brand-blue)] font-bold hover:underline">Reach out directly.</Link>
          </p>
        </Reveal>
      </section>

      {/* ── FAQ categories ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="flex flex-col gap-14">
          {faqs.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.06}>
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
                <div className="lg:pt-5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{cat.category}</span>
                </div>
                <div className="flex flex-col">
                  {cat.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Still have questions?</h2>
            <p className="mt-2 text-[14px] text-slate-400">We're happy to talk through your project before you commit to anything.</p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
            >
              Talk to us
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Wordmark ── */}
      <div ref={wordmarkRef} className="overflow-hidden border-t border-slate-100 select-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={wordmarkInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-center font-extrabold tracking-tighter text-slate-100 leading-none py-4" style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}>
            Nemvol
          </p>
        </motion.div>
      </div>
    </div>
  );
}
