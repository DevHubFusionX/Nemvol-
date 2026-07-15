import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    category: 'Product Development',
    date: 'Jul 14, 2026',
    title: 'How to Validate Your Startup Idea Before Writing a Single Line of Code',
    desc: 'A practical guide to running a discovery sprint — user interviews, competitor analysis, and building an MVP scope that investors and users actually respond to.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=600&fit=crop&q=80',
    href: '/blog/validate-startup-idea',
    featured: true,
  },
  {
    category: 'MVP',
    date: 'Jul 10, 2026',
    title: 'What to Include in Your MVP (And What to Leave Out)',
    desc: 'Most MVPs fail because they try to do too much. Here\'s how to scope a lean, testable product that gets you to traction faster.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=420&fit=crop&q=80',
    href: '/blog/mvp-scope',
    featured: false,
  },
  {
    category: 'Founders',
    date: 'Jul 5, 2026',
    title: 'Agency vs Freelancer vs In-house: What\'s Right for Your Startup?',
    desc: 'A no-fluff breakdown of the tradeoffs between hiring a product agency, freelancers, or building an in-house team at the early stage.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=420&fit=crop&q=80',
    href: '/blog/agency-vs-freelancer',
    featured: false,
  },
];

const featured = posts[0];
const secondary = posts.slice(1);

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-brand-blue)]">
              Nemvol Dispatch
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-slate-900 via-60% to-slate-300 bg-clip-text text-transparent leading-tight">
              Insights for<br />builders.
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group shrink-0 mb-1"
          >
            View all articles
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-8 lg:gap-12 items-start">

          {/* Featured — large left */}
          <motion.a
            href={featured.href}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="group flex flex-col gap-5"
          >
            <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[var(--color-brand-blue)]">{featured.category}</span>
                <span className="text-slate-200">·</span>
                <span className="text-[11px] text-slate-400">{featured.date}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors">
                {featured.title}
              </h3>
              <p className="text-[14px] text-slate-400 leading-relaxed">{featured.desc}</p>
            </div>
          </motion.a>

          {/* Secondary — two stacked right */}
          <div className="flex flex-col gap-8">
            {secondary.map((post, i) => (
              <motion.a
                key={post.href}
                href={post.href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 + i * 0.1 }}
                className="group flex flex-col gap-4"
              >
                <div className="overflow-hidden rounded-xl bg-slate-100 aspect-[16/9]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[var(--color-brand-blue)]">{post.category}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-[11px] text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[var(--color-brand-blue)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{post.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile view all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-10 sm:hidden"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-hover)] transition-colors group"
          >
            View all articles
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
