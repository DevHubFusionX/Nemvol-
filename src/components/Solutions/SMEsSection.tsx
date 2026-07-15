import { ArrowRight } from 'lucide-react';
import { Reveal } from './shared';
import { useModal } from '../ui/ModalContext';

const features = [
  { num: '01', title: 'Digital transformation',    desc: 'Move your operations online with custom web apps, dashboards, and automation tools built for how your business actually works.' },
  { num: '02', title: 'No long-term commitment',   desc: 'Start with a Discovery Sprint. Engage for an MVP. Add a retainer only when you need it. No lock-in, no retainer traps.' },
  { num: '03', title: 'Local market expertise',    desc: 'We understand Nigerian payment flows, low-bandwidth users, and the operational realities of running a business in Africa.' },
  { num: '04', title: 'Predictable costs',         desc: "Fixed-fee milestones mean you always know what you're spending. No hourly billing surprises, no scope creep invoices." },
];

export default function SMEsSection() {
  const { open } = useModal();
  return (
    <section id="smes" className="border-t border-slate-100 py-24 lg:py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: image with floating cards */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&h=1000&fit=crop&q=80"
                  alt="SME business owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-lg shadow-slate-200/60 px-6 py-4 border border-slate-100">
                <span className="block text-2xl font-extrabold text-slate-900 tabular-nums">3×</span>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Faster than hiring</span>
              </div>
              <div className="absolute -top-4 -left-4 bg-[var(--color-brand-blue)] rounded-xl px-4 py-2">
                <span className="text-[11px] font-bold text-white tracking-widest uppercase">SME Ready</span>
              </div>
            </div>
          </Reveal>

          {/* Right: numbered features */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">For SMEs</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Grow your business without growing your tech team.
              </h2>
              <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
                You don't need a full-time CTO or an in-house dev team. Nemvol gives SMEs access to senior product thinking and engineering execution — on demand, at a fraction of the cost.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col">
              {features.map((item, i) => (
                <Reveal key={item.num} delay={i * 0.07}>
                  <div className="flex items-start gap-5 py-5 border-b border-slate-200 last:border-0">
                    <span className="text-[11px] font-bold text-slate-300 tabular-nums pt-0.5 w-6 shrink-0">{item.num}</span>
                    <div>
                      <span className="block text-[14px] font-extrabold text-slate-900 tracking-tight">{item.title}</span>
                      <p className="mt-1 text-[13px] text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <button onClick={() => open('discovery')} className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer">
                Talk to us about your business
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
