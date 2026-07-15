import { ArrowRight, TrendingUp, FileText, Repeat2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './shared';
import { useModal } from '../ui/ModalContext';

const metrics = [
  { value: '48 hrs', label: 'To first prototype' },
  { value: '8 wks',  label: 'Seed-ready MVP'     },
  { value: '3×',     label: 'Faster than in-house' },
  { value: '0',      label: 'Equity taken'        },
];

const services = [
  {
    Icon: FileText,
    title: 'Investor-ready documentation',
    desc: 'Technical architecture docs, product roadmaps, and data room assets that give investors confidence.',
  },
  {
    Icon: TrendingUp,
    title: 'Growth-stage scaling',
    desc: 'Post-seed, we help you scale infrastructure, hire the right engineers, and build the processes that survive Series A.',
  },
  {
    Icon: Repeat2,
    title: 'Rapid iteration cycles',
    desc: 'Weekly sprints, continuous deployment, and real-time analytics so you can pivot fast when the market speaks.',
  },
  {
    Icon: Globe,
    title: 'Built for African markets',
    desc: 'Offline-first features, local payment integrations (Paystack, Flutterwave), and low-bandwidth optimisation baked in.',
  },
];

export default function VCBackedSection() {
  const { open } = useModal();
  return (
    <section id="vc-backed" className="border-t border-slate-100 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">For VC-backed Companies</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08] max-w-lg">
                Move at the speed your investors expect.
              </h2>
            </div>
            <p className="text-[14px] text-slate-400 leading-relaxed max-w-xs pb-1">
              You've raised. Now you need to ship. Nemvol gives funded startups the engineering velocity to hit milestones before the next board meeting.
            </p>
          </div>
        </Reveal>

        {/* Metrics strip */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden mb-12">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white px-8 py-6 flex flex-col gap-1">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{m.value}</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 h-full">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                  <item.Icon className="w-4 h-4 text-[var(--color-brand-blue)]" />
                </div>
                <div>
                  <span className="block text-[14px] font-extrabold text-slate-900 tracking-tight">{item.title}</span>
                  <p className="mt-1.5 text-[13px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-2xl bg-slate-900 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ready to ship?</span>
              <h3 className="text-[22px] font-extrabold text-white leading-snug max-w-sm">
                From term sheet to live product in 8 weeks.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => open('mvp')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
              >
                Start building
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 text-[13px] font-bold transition-all duration-200"
              >
                See our work
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
