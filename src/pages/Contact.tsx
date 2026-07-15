import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, MapPin, MessageSquare } from 'lucide-react';

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

const reasons = [
  { icon: MessageSquare, label: 'Start a project', desc: 'Discovery Sprint, MVP, or Retainer', href: '#form' },
  { icon: Mail, label: 'General enquiry', desc: 'Questions about our services', href: 'mailto:hello@nemvol.com' },
  { icon: MapPin, label: 'Partnership', desc: 'Agencies, accelerators, investors', href: '/partners' },
];

const offices = [
  { region: 'Nigeria', lines: ['Lagos, Nigeria'], email: 'hello@nemvol.com' },
];

const services = ['Discovery Sprint', 'MVP Express', 'UI/UX Design', 'Web Development', 'Mobile App', 'Growth Retainer', 'White-label', 'Other'];
const budgets = ['Under ₦500k', '₦500k – ₦1.5M', '₦1.5M – ₦5M', '₦5M+', 'Let\'s discuss'];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '-40px' });

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Contact</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-2xl">
            Let's build something.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[16px] text-slate-400 leading-relaxed max-w-lg">
            Tell us about your idea or project. We'll get back to you within 24 hours with a clear next step.
          </p>
        </Reveal>

        {/* Quick links */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-4">
            {reasons.map(({ icon: Icon, label, desc, href }) => (
              <a key={label} href={href} className="group flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-100 hover:border-[var(--color-brand-blue)] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">{label}</p>
                  <p className="text-[11px] text-slate-400">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Form + Info ── */}
      <section id="form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-start">

          {/* Form */}
          <Reveal>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 py-16"
              >
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Message received</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">We'll be in touch within 24 hours.</h2>
                <p className="text-[14px] text-slate-400 leading-relaxed max-w-sm">
                  In the meantime, feel free to explore our work or read about our process.
                </p>
                <div className="flex gap-4 mt-4">
                  <Link to="/work" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group">
                    See our work <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Your name" required>
                    <input
                      type="text" required placeholder="Winner Oyebanjo"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                    />
                  </Field>
                  <Field label="Email address" required>
                    <input
                      type="email" required placeholder="you@company.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                    />
                  </Field>
                </div>
                <Field label="Company / Project name">
                  <input
                    type="text" placeholder="Acme Inc."
                    value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="input-field"
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Service interested in">
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="input-field">
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Estimated budget">
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="input-field">
                      <option value="">Select a range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Tell us about your project" required>
                  <textarea
                    required rows={5} placeholder="Describe your idea, what you're trying to build, and where you are in the process..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                  />
                </Field>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 active:scale-[0.98] w-fit group"
                >
                  Send message
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </Reveal>

          {/* Right: info */}
          <div className="flex flex-col gap-10 lg:pt-1">
            {/* Offices */}
            <Reveal delay={0.1}>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Offices</span>
              <div className="mt-5 flex flex-col gap-7">
                {offices.map((o) => (
                  <div key={o.region}>
                    <p className="text-[12px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)] mb-1">{o.region}</p>
                    {o.lines.map((l) => <p key={l} className="text-[13px] text-slate-400">{l}</p>)}
                  <a href={`mailto:${o.email}`} className="text-[13px] font-bold text-slate-500 hover:text-[var(--color-brand-blue)] transition-colors mt-1 block">{o.email}</a>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Response time */}
            <Reveal delay={0.15}>
              <div className="rounded-xl bg-slate-50 px-6 py-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-500">Typically responds within 24 hours</span>
                </div>
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  We review every enquiry personally. No auto-replies, no sales scripts — just a real conversation about your project.
                </p>
              </div>
            </Reveal>
          </div>
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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-bold text-slate-700">
        {label}{required && <span className="text-[var(--color-brand-blue)] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
