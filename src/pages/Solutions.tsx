import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, SectionNav } from '../components/Solutions/shared';
import FoundersSection from '../components/Solutions/FoundersSection';
import StartupsSection from '../components/Solutions/StartupsSection';
import SMEsSection from '../components/Solutions/SMEsSection';
import AgenciesSection from '../components/Solutions/AgenciesSection';
import EnterpriseSection from '../components/Solutions/EnterpriseSection';
import VCBackedSection from '../components/Solutions/VCBackedSection';
import { useModal } from '../components/ui/ModalContext';

export default function Solutions() {
  const { open } = useModal();
  return (
    <div className="bg-white">

      {/* ── Page hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 lg:pt-32 lg:pb-12">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Solutions</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-3xl">
            Built for every stage of the journey.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[16px] text-slate-400 leading-relaxed max-w-xl">
            Whether you're validating an idea or scaling an established product — Nemvol has an engagement designed for where you are right now.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <button
            onClick={() => open()}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
          >
            Start a project
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Reveal>
      </section>

      <SectionNav />

      <FoundersSection />
      <StartupsSection />
      <SMEsSection />
      <AgenciesSection />
      <EnterpriseSection />
      <VCBackedSection />

      {/* ── CTA ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Not sure which solution fits?</h2>
            <p className="mt-2 text-[14px] text-slate-400">Tell us where you are and we'll recommend the right engagement.</p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0 flex flex-wrap gap-3">
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
            >
              Start a project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link to="/pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-bold transition-all duration-200">
              See pricing
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
