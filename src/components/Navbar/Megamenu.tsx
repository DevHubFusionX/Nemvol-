import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Layers,
  Code2,
  Smartphone,
  RefreshCw,
  Rocket,
  Building2,
  TrendingUp,
  Users,
  BookOpen,
  HelpCircle,
  Mail,
  Briefcase,
} from 'lucide-react';

interface MegamenuProps {
  activeMenu: 'platform' | 'solutions' | 'resources' | null;
  leftOffset: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const panelVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
};

export default function Megamenu({ activeMenu, leftOffset, onMouseEnter, onMouseLeave }: MegamenuProps) {
  if (!activeMenu) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full z-50 pt-2"
      style={{ left: `${leftOffset}px` }}
    >
      <motion.div
        key={activeMenu}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className="bg-white border border-slate-200/80 rounded-xl shadow-lg shadow-slate-200/40 overflow-hidden"
        style={{ width: activeMenu === 'solutions' ? '360px' : '520px' }}
      >
        {activeMenu === 'platform' && <ServicesPanel />}
        {activeMenu === 'solutions' && <ClientsPanel />}
        {activeMenu === 'resources' && <ResourcesPanel />}
      </motion.div>
    </div>
  );
}

/* ─── Services (Platform) ─── */
function ServicesPanel() {
  return (
    <div className="grid grid-cols-5 divide-x divide-slate-100">
      <div className="col-span-3 p-6">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">WHAT WE BUILD</h4>
        <div className="space-y-0.5">
          <MegaItem icon={Search} title="Product Discovery" desc="Validate ideas before writing code" to="/services#discovery" />
          <MegaItem icon={Layers} title="UI/UX Design" desc="Wireframes, prototypes & high-fidelity" to="/services#design" />
          <MegaItem icon={Code2} title="Web Development" desc="Websites and web applications" to="/services#web" />
          <MegaItem icon={Smartphone} title="Mobile Apps" desc="Android & iOS, native or cross-platform" to="/services#mobile" />
        </div>
      </div>
      <div className="col-span-2 p-6 bg-slate-50/60">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">ENGAGEMENTS</h4>
        <div className="space-y-0.5">
          <MegaItem icon={Rocket} title="MVP Express" desc="8–12 week validated MVP build" to="/services#mvp" />
          <MegaItem icon={RefreshCw} title="Growth Retainer" desc="Post-launch iteration & support" to="/services#retainer" />
        </div>
      </div>
    </div>
  );
}

/* ─── Clients (Solutions) ─── */
function ClientsPanel() {
  const segments = [
    { label: 'Early-stage Founders', href: '/solutions#founders' },
    { label: 'Startups & MVPs', href: '/solutions#startups' },
    { label: 'SMEs', href: '/solutions#smes' },
    { label: 'Agencies (White-label)', href: '/solutions#agencies' },
    { label: 'Corporate Innovation', href: '/solutions#enterprise' },
    { label: 'VC-backed Teams', href: '/solutions#vc-backed' },
  ];
  return (
    <div className="p-6">
      <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">WHO WE WORK WITH</h4>
      <div className="grid grid-cols-1 gap-0.5">
        {segments.map((s) => (
          <Link
            key={s.href}
            to={s.href}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-slate-700 hover:text-[var(--color-brand-blue)] hover:bg-slate-50 transition-colors duration-150"
          >
            <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Resources ─── */
function ResourcesPanel() {
  return (
    <div className="grid grid-cols-5 divide-x divide-slate-100">
      <div className="col-span-3 p-6">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">COMPANY</h4>
        <div className="space-y-0.5">
          <MegaItem icon={BookOpen} title="About Nemvol" desc="Our mission, values & approach" to="/about" />
          <MegaItem icon={Users} title="Our Team" desc="Meet the people behind the work" to="/team" />
          <MegaItem icon={Briefcase} title="Careers" desc="Join a lean, ambitious team" to="/careers" />
          <MegaItem icon={TrendingUp} title="Case Studies" desc="Products we've built and launched" to="/work" />
        </div>
      </div>
      <div className="col-span-2 p-6 bg-slate-50/60">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-widest mb-4">HELP</h4>
        <div className="space-y-0.5">
          <MegaItem icon={HelpCircle} title="FAQ" desc="Common questions answered" to="/faq" />
          <MegaItem icon={Building2} title="Partnerships" desc="Accelerators, VCs & agencies" to="/partners" />
          <MegaItem icon={Mail} title="Contact Us" desc="Start a conversation" to="/contact" />
        </div>
      </div>
    </div>
  );
}

/* ─── Shared item ─── */
function MegaItem({ icon: Icon, title, desc, to }: { icon: React.ElementType; title: string; desc: string; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors duration-150 group"
    >
      <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-[var(--color-brand-blue)] transition-colors">
        <Icon className="w-4 h-4 stroke-[2]" />
      </div>
      <div className="min-w-0">
        <span className="block text-[13px] font-bold text-slate-800 group-hover:text-[var(--color-brand-blue)] transition-colors leading-tight">
          {title}
        </span>
        <span className="block text-[11px] text-slate-400 mt-0.5 leading-snug">
          {desc}
        </span>
      </div>
    </Link>
  );
}
