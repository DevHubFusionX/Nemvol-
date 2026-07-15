import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useModal } from '../ui/ModalContext';

/* ── Inline perspective grid ── */
function PerspectiveGrid() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const COLS = 32;
  const tiles = useMemo(() => Array.from({ length: COLS * COLS }), []);
  useEffect(() => { setMounted(true); }, []);

  const getNeighbours = useCallback((i: number) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const result = new Set<number>();
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = row + dr, c = col + dc;
        if (r >= 0 && r < COLS && c >= 0 && c < COLS) result.add(r * COLS + c);
      }
    }
    return result;
  }, []);

  const neighbours = useMemo(
    () => hoveredIndex !== null ? getNeighbours(hoveredIndex) : new Set<number>(),
    [hoveredIndex, getNeighbours]
  );

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      <div
        className="absolute w-[100rem] aspect-square grid origin-center"
        style={{
          left: '50%', top: '75%',
          transform: 'translate(-50%, -50%) rotateX(65deg) scale(2)',
          transformStyle: 'preserve-3d',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${COLS}, 1fr)`,
        }}
      >
        {mounted && tiles.map((_, i) => {
          const isHovered = hoveredIndex === i;
          const isNeighbour = neighbours.has(i);
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="min-h-[1px] min-w-[1px] border transition-colors duration-500"
              style={{
                backgroundColor: isHovered ? '#dbeafe' : isNeighbour ? '#eff6ff' : 'transparent',
                borderColor: isHovered ? '#93c5fd' : isNeighbour ? '#bfdbfe' : '#e2e8f0',
                transitionDuration: isHovered || isNeighbour ? '0ms' : '700ms',
              }}
            />
          );
        })}
      </div>
      {/* fade overlays — pointer-events-none */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse 100% 55% at 50% 0%, white 25%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse 50% 100% at 0% 50%, white 15%, transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse 50% 100% at 100% 50%, white 15%, transparent 65%)' }} />
    </div>
  );
}

const nav = [
  {
    heading: 'Services',
    links: [
      { label: 'Discovery Sprint', plan: 'discovery' },
      { label: 'MVP Express', plan: 'mvp' },
      { label: 'Growth Retainer', plan: 'retainer' },
      { label: 'White-label', href: '/solutions#agencies' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Founders', href: '/solutions#founders' },
      { label: 'Startups', href: '/solutions#startups' },
      { label: 'SMEs', href: '/solutions#smes' },
      { label: 'Agencies', href: '/solutions#agencies' },
      { label: 'Enterprise', href: '/solutions#enterprise' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Work', href: '/work' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { open } = useModal();

  return (
    <footer ref={ref} className="relative bg-white border-t border-slate-100 overflow-hidden">
      <PerspectiveGrid />

      {/* ── Main grid ── */}
      <div className="relative z-20 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-12 lg:gap-16">

          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-5 pointer-events-auto"
          >
            <div>
              <span className="text-[17px] font-extrabold text-slate-900 tracking-tight">Nemvol</span>
              <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
                Product development agency helping founders, startups, and SMEs build validated digital products — fast, structured, and built to scale.
              </p>
              <p className="mt-3 text-[12px] text-slate-400">
                Lagos, Nigeria
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="text-slate-400 hover:text-[var(--color-brand-blue)] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.75-.88a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25Z" />
                </svg>
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="text-slate-400 hover:text-[var(--color-brand-blue)] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              </a>
            </div>
            {/* Newsletter */}
            <div className="mt-2">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-3">Nemvol Dispatch</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 min-w-0 px-3 py-2 text-[12px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:border-[var(--color-brand-blue)] text-slate-700 placeholder:text-slate-300 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[12px] font-bold transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </motion.div>

          {/* Nav cols */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 pointer-events-auto"
          >
            {nav.map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">{col.heading}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {'plan' in link
                        ? <button onClick={() => open(link.plan)} className="text-[13px] text-slate-500 hover:text-[var(--color-brand-blue)] transition-colors cursor-pointer">{link.label}</button>
                        : <Link to={link.href!} className="text-[13px] text-slate-500 hover:text-[var(--color-brand-blue)] transition-colors">{link.label}</Link>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Contact col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="flex flex-col gap-4 pointer-events-auto"
          >
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">Get in touch</p>
              <a href="mailto:hello@nemvol.com" className="text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors block">
                hello@nemvol.com
              </a>
              <p className="mt-1 text-[13px] text-slate-500">Lagos, Nigeria</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">Start a project</p>
              <button
                onClick={() => open()}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-700 hover:text-[var(--color-brand-blue)] transition-colors group cursor-pointer"
              >
                Book a Discovery Sprint
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-200">
              Building People,<br />Brands and Purpose.
            </p>
          </motion.div>
        </div>


      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 border-t border-slate-200 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-slate-400">
            © 2026 Nemvol Limited. All rights reserved. Building People, Brands and Purpose.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] text-slate-400 font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
