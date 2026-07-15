import { ArrowRight, Rocket, Search, Code2, RefreshCw } from 'lucide-react';
import { Reveal } from './shared';
import { useModal } from '../ui/ModalContext';

function SprintSVG() {
  const steps = ['Discover', 'Design', 'Build', 'Test', 'Launch'];
  return (
    <svg viewBox="0 0 340 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {steps.map((label, i) => {
        const x = i * 76 + 20;
        const active = i === 2;
        return (
          <g key={label}>
            {i < 4 && <line x1={x + 14} y1="22" x2={x + 62} y2="22" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />}
            <circle cx={x} cy="22" r="13" fill={active ? '#0284c7' : 'white'} stroke={active ? '#0284c7' : '#e2e8f0'} strokeWidth="1.5" />
            <text x={x} y="26" textAnchor="middle" fontSize="7" fontWeight="800" fill={active ? 'white' : '#94a3b8'}>{i + 1}</text>
            <text x={x} y="48" textAnchor="middle" fontSize="7" fontWeight="700" fill="#94a3b8">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

const cards = [
  { id: 'big',      Icon: Rocket,    title: 'MVP Express',          desc: 'A fully functional, deployable product in 8–12 weeks. Scoped during discovery, built with agile milestones, shipped with analytics and QA included.', span: 'lg:col-span-2 lg:row-span-2', bg: 'bg-slate-900',                 titleColor: 'text-white',     descColor: 'text-slate-400', iconBg: 'bg-slate-800', iconColor: 'text-[var(--color-brand-blue)]', watermark: true  },
  { id: 'scope',    Icon: Search,    title: 'Scoped, not guessed',  desc: 'Every build starts with a validated scope. No feature bloat, no wasted sprints.',                                                                          span: 'lg:col-span-1',           bg: 'bg-slate-50',              titleColor: 'text-slate-900', descColor: 'text-slate-400', iconBg: 'bg-white',     iconColor: 'text-[var(--color-brand-blue)]', watermark: false },
  { id: 'stack',    Icon: Code2,     title: 'Modern stack',         desc: 'React, Next.js, Node, mobile-first. Built to scale from day one.',                                                                                          span: 'lg:col-span-1',           bg: 'bg-slate-50',              titleColor: 'text-slate-900', descColor: 'text-slate-400', iconBg: 'bg-white',     iconColor: 'text-[var(--color-brand-blue)]', watermark: false },
  { id: 'retainer', Icon: RefreshCw, title: 'Post-launch retainer', desc: "We don't disappear after launch. Iteration, analytics, and growth support built in.",                                                                    span: 'lg:col-span-1',           bg: 'bg-[var(--color-brand-blue)]', titleColor: 'text-white',     descColor: 'text-blue-100',  iconBg: 'bg-blue-500',  iconColor: 'text-white',                     watermark: false },
];

export default function StartupsSection() {
  const { open } = useModal();
  return (
    <section id="startups" className="border-t border-slate-100 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">For Startups & MVPs</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08] max-w-lg">
                Ship fast. Validate faster.
              </h2>
            </div>
            <p className="text-[14px] text-slate-400 leading-relaxed max-w-xs pb-1">
              Built for startups that need a working product — not a feature list. We scope, design, build, and ship in one continuous engagement.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.08} className={`${card.span} h-full`}>
              <div className={`${card.bg} rounded-2xl p-7 h-full flex flex-col justify-between overflow-hidden relative`}>
                <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <card.Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className={`text-[16px] font-extrabold tracking-tight ${card.titleColor}`}>{card.title}</h3>
                  <p className={`mt-1.5 text-[13px] leading-relaxed ${card.descColor}`}>{card.desc}</p>
                </div>
                {card.watermark && (
                  <span className="absolute -bottom-4 -right-2 text-[120px] font-extrabold text-slate-800 leading-none select-none pointer-events-none tabular-nums">8</span>
                )}
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.36} className="sm:col-span-2 lg:col-span-3 h-full">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-7 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">How it works</span>
                  <h3 className="mt-1 text-[15px] font-extrabold text-slate-900">From brief to launch in 5 phases</h3>
                </div>
                <button onClick={() => open('mvp')} className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group cursor-pointer">
                  Start your MVP <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <SprintSVG />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 sm:hidden">
            <button onClick={() => open('mvp')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer">
              Start your MVP <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
