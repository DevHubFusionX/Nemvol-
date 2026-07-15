import { ArrowRight, Layers, Zap, Users, Lock } from 'lucide-react';
import { Reveal } from './shared';
import { useModal } from '../ui/ModalContext';

const offerings = [
  {
    Icon: Layers,
    title: 'White-label delivery',
    desc: 'We build under your brand. Your clients never know we exist — unless you want them to.',
  },
  {
    Icon: Zap,
    title: 'Overflow capacity',
    desc: 'Spike in client work? We plug in as a silent extension of your team — no hiring, no onboarding lag.',
  },
  {
    Icon: Users,
    title: 'Dedicated pod model',
    desc: 'A scoped team (PM + designer + engineers) assigned to your account. Consistent, accountable, embedded.',
  },
  {
    Icon: Lock,
    title: 'NDA-first engagement',
    desc: 'Every partnership starts with a mutual NDA. Your client relationships and IP stay yours.',
  },
];

export default function AgenciesSection() {
  const { open } = useModal();
  return (
    <section id="agencies" className="border-t border-slate-100 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <Reveal>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">For Agencies</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Your silent tech partner.
              </h2>
              <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
                Win bigger clients. Deliver more complex work. Nemvol operates as your white-label engineering arm — invisible to your clients, indispensable to your business.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col divide-y divide-slate-100">
                {offerings.map((item) => (
                  <div key={item.title} className="flex items-start gap-5 py-5 first:pt-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <item.Icon className="w-4 h-4 text-[var(--color-brand-blue)]" />
                    </div>
                    <div>
                      <span className="block text-[14px] font-extrabold text-slate-900 tracking-tight">{item.title}</span>
                      <p className="mt-1 text-[13px] text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <button
                onClick={() => open()}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
              >
                Explore a partnership
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Reveal>
          </div>

          {/* Right: visual */}
          <Reveal delay={0.1} className="w-full">
            <div className="rounded-2xl bg-slate-900 p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active partnerships</span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">Live</span>
              </div>

              {[
                { agency: 'Studio Kola', project: 'E-commerce platform', status: 'In build', progress: 72 },
                { agency: 'Brandcraft NG', project: 'SaaS dashboard', status: 'QA phase', progress: 90 },
                { agency: 'Pixel & Co.', project: 'Mobile app MVP', status: 'Discovery', progress: 20 },
              ].map((row) => (
                <div key={row.agency} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[13px] font-bold text-white">{row.agency}</span>
                      <span className="block text-[11px] text-slate-500">{row.project}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{row.status}</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-brand-blue)] rounded-full"
                      style={{ width: `${row.progress}%` }}
                    />
                  </div>
                </div>
              ))}

              <p className="text-[11px] text-slate-600 mt-2">
                All client-facing work delivered under your agency brand.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
