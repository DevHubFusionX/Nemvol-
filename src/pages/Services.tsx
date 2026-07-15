import { Reveal, SectionNav } from '../components/Services/shared';
import DiscoverySection from '../components/Services/DiscoverySection';
import DesignSection from '../components/Services/DesignSection';
import WebSection from '../components/Services/WebSection';
import MobileSection from '../components/Services/MobileSection';
import MvpSection from '../components/Services/MvpSection';
import RetainerSection from '../components/Services/RetainerSection';

export default function Services() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 lg:pt-32 lg:pb-12">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">Services</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-3xl">
            Everything you need to build a great product.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-[16px] text-slate-400 leading-relaxed max-w-xl">
            From validating your idea to launching and growing — we cover every stage of product development under one roof.
          </p>
        </Reveal>
      </section>

      <SectionNav />

      <DiscoverySection />
      <DesignSection />
      <WebSection />
      <MobileSection />
      <MvpSection />
      <RetainerSection />

    </div>
  );
}
