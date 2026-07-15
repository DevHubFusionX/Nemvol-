import { ArrowRight, ShieldCheck, GitBranch, HeadphonesIcon, BarChart3 } from 'lucide-react';
import { Reveal } from './shared';
import { useModal } from '../ui/ModalContext';

const pillars = [
  {
    Icon: ShieldCheck,
    title: 'Security & compliance',
    desc: 'SOC-2 aligned practices, role-based access, audit logs, and data residency options for regulated industries.',
  },
  {
    Icon: GitBranch,
    title: 'Integration-first builds',
    desc: 'We connect to your existing ERP, CRM, or legacy systems — no rip-and-replace required.',
  },
  {
    Icon: HeadphonesIcon,
    title: 'Dedicated account team',
    desc: 'A named PM, lead engineer, and account director. One escalation path, always.',
  },
  {
    Icon: BarChart3,
    title: 'Reporting & SLAs',
    desc: 'Monthly delivery reports, uptime SLAs, and quarterly business reviews built into every enterprise contract.',
  },
];

export default function EnterpriseSection() {
  const { open } = useModal();
  return (
    <section id="enterprise" className="border-t border-slate-100 py-24 lg:py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: visual */}
          <Reveal className="order-2 lg:order-1 w-full">
            <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900">Enterprise engagement model</span>
                <span className="text-[10px] font-bold text-[var(--color-brand-blue)] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest">Tailored</span>
              </div>

              {/* Phases */}
              {[
                { phase: 'Discovery & audit',   weeks: '2–3 wks',  note: 'Stakeholder interviews, tech audit, scope definition' },
                { phase: 'Architecture design', weeks: '1–2 wks',  note: 'System design, integration mapping, security review' },
                { phase: 'Phased build',        weeks: 'Ongoing',  note: 'Milestone-based delivery with weekly demos' },
                { phase: 'Handover & support',  weeks: 'Retainer', note: 'Documentation, training, SLA-backed maintenance' },
              ].map((row, i) => (
                <div key={row.phase} className={`px-6 py-4 flex items-start justify-between gap-4 ${i < 3 ? 'border-b border-slate-100' : ''}`}>
                  <div>
                    <span className="block text-[13px] font-bold text-slate-900">{row.phase}</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">{row.note}</span>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-slate-500 tabular-nums">{row.weeks}</span>
                </div>
              ))}

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">Pricing on request · NDA available · Custom SLAs</span>
              </div>
            </div>
          </Reveal>

          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">For Enterprise</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Enterprise-grade delivery. No enterprise bureaucracy.
              </h2>
              <p className="mt-5 text-[15px] text-slate-400 leading-relaxed max-w-md">
                Large organisations need reliability, security, and accountability — not just code. Nemvol brings structured delivery, senior talent, and the governance your stakeholders expect.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <item.Icon className="w-4 h-4 text-[var(--color-brand-blue)]" />
                    </div>
                    <div>
                      <span className="block text-[13px] font-extrabold text-slate-900">{item.title}</span>
                      <p className="mt-1 text-[12px] text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <button
                onClick={() => open()}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
              >
                Request an enterprise brief
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
