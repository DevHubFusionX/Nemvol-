import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../components/ui/ModalContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

const posts = [
  {
    category: 'Product Development',
    date: 'Jul 14, 2026',
    title: 'How to Validate Your Startup Idea Before Writing a Single Line of Code',
    desc: 'A practical guide to running a discovery sprint — user interviews, competitor analysis, and building an MVP scope that investors and users actually respond to.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&q=80',
    href: '/blog/validate-startup-idea',
    featured: true,
    readTime: '6 min read',
  },
  {
    category: 'MVP',
    date: 'Jul 10, 2026',
    title: 'What to Include in Your MVP (And What to Leave Out)',
    desc: 'Most MVPs fail because they try to do too much. Here\'s how to scope a lean, testable product that gets you to traction faster.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=420&fit=crop&q=80',
    href: '/blog/mvp-scope',
    featured: false,
    readTime: '5 min read',
  },
  {
    category: 'Founders',
    date: 'Jul 5, 2026',
    title: 'Agency vs Freelancer vs In-house: What\'s Right for Your Startup?',
    desc: 'A no-fluff breakdown of the tradeoffs between hiring a product agency, freelancers, or building an in-house team at the early stage.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=420&fit=crop&q=80',
    href: '/blog/agency-vs-freelancer',
    featured: false,
    readTime: '7 min read',
  },
  {
    category: 'Design',
    date: 'Jun 28, 2026',
    title: 'Why "Less is More" is the Most Misunderstood Design Principle',
    desc: 'Minimalism isn\'t about removing things — it\'s about removing the wrong things. How we apply this at Nemvol across every product we build.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&h=420&fit=crop&q=80',
    href: '/blog/less-is-more-design',
    featured: false,
    readTime: '4 min read',
  },
  {
    category: 'Product Development',
    date: 'Jun 20, 2026',
    title: 'The Real Cost of Building the Wrong Product First',
    desc: 'Skipping discovery doesn\'t save time — it multiplies it. A breakdown of what happens when founders build before validating.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=420&fit=crop&q=80',
    href: '/blog/cost-of-wrong-product',
    featured: false,
    readTime: '5 min read',
  },
  {
    category: 'Africa',
    date: 'Jun 12, 2026',
    title: 'Building for African Users: What Most Product Teams Get Wrong',
    desc: 'Low bandwidth, local payment rails, and trust patterns that differ from Western markets. What we\'ve learned building products across Nigeria and beyond.',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=700&h=420&fit=crop&q=80',
    href: '/blog/building-for-africa',
    featured: false,
    readTime: '8 min read',
  },
  {
    category: 'Founders',
    date: 'Jun 3, 2026',
    title: 'How to Write a Product Brief That Engineers Actually Respect',
    desc: 'Vague briefs produce vague products. Here\'s the exact structure we use in every Discovery Sprint to align founders and engineers from day one.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=420&fit=crop&q=80',
    href: '/blog/product-brief',
    featured: false,
    readTime: '6 min read',
  },
];

const categories = ['All', 'Product Development', 'MVP', 'Founders', 'Design', 'Africa'];
const featured = posts[0];
const rest = posts.slice(1);

export default function Blog() {
  const [active, setActive] = useState('All');
  const [email, setEmail] = useState('');
  const { open } = useModal();
  const filtered = active === 'All' ? rest : rest.filter((p) => p.category === active);

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <Reveal>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
            Nemvol Dispatch
          </span>
        </Reveal>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <Reveal delay={0.05}>
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-[1.06] max-w-2xl">
              Insights for<br />builders.
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0 pb-2">
            <p className="text-[14px] text-slate-400 leading-relaxed max-w-xs">
              Product thinking, founder lessons, and practical guides from the Nemvol team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured post ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Reveal>
          <Link
            to={featured.href}
            className="group grid grid-cols-1 lg:grid-cols-[55fr_45fr] rounded-2xl overflow-hidden bg-slate-900 cursor-pointer"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-slate-900 hidden lg:block" />
            </div>
            <div className="flex flex-col justify-center px-10 py-12 lg:px-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
                  {featured.category}
                </span>
                <span className="text-slate-700">·</span>
                <span className="text-[11px] text-slate-500">{featured.date}</span>
                <span className="text-slate-700">·</span>
                <span className="text-[11px] text-slate-500">{featured.readTime}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
                {featured.title}
              </h2>
              <p className="mt-4 text-[14px] text-slate-400 leading-relaxed">{featured.desc}</p>
              <div className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] group-hover:text-blue-400 transition-colors">
                Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── All posts ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">

        {/* Category filter */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                  cat === active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((post, i) => (
            <Reveal key={post.href} delay={i * 0.07}>
              <Link to={post.href} className="group flex flex-col gap-4 cursor-pointer">
                <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[var(--color-brand-blue)]">{post.category}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-[11px] text-slate-400">{post.date}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-[11px] text-slate-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2">{post.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 inline-flex items-center gap-1 text-[12px] font-bold text-slate-300 group-hover:text-[var(--color-brand-blue)] transition-colors">
                  Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="border-t border-slate-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-slate-900 px-8 py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="max-w-md">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
                  Stay sharp
                </span>
                <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight leading-snug">
                  The Dispatch. No noise, just signal.
                </h2>
                <p className="mt-3 text-[14px] text-slate-400 leading-relaxed">
                  Product insights, founder lessons, and Nemvol updates — once a month, straight to your inbox.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[380px]"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group shrink-0 cursor-pointer"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Start a project CTA ── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Ready to build your product?</h2>
            <p className="mt-2 text-[14px] text-slate-400">Start with a Discovery Sprint — 2 weeks, fixed fee, investor-ready brief.</p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white text-[13px] font-bold transition-all duration-200 group cursor-pointer"
            >
              Start a project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
