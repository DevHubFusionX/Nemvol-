import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, HelpCircle, User, Settings, LogOut } from 'lucide-react';

interface TopBarProps {
  planLabel?: string;
  renewalDate?: string;
  avatarInitials?: string;
  onMenuClick: () => void;
}

const menuItems = [
  { label: 'Your Profile', icon: User, to: '/dashboard/profile' },
  { label: 'Store Settings', icon: Settings, to: '/dashboard/store-info' },
];

export default function TopBar({
  planLabel = 'Starter Plan',
  renewalDate = '19 Jul 2026',
  avatarInitials = 'FR',
  onMenuClick,
}: TopBarProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="h-16 shrink-0 flex items-center px-4 lg:px-6 border-b border-slate-100 bg-white">

      {/* Left — hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Menu size={18} strokeWidth={1.8} />
      </button>

      {/* Center — brand (mobile only) */}
      <div className="flex-1 flex justify-center lg:hidden">
        <span className="text-[15px] font-bold tracking-tight text-slate-900">
          Nemvol
          <span className="ml-1.5 text-[10px] font-semibold text-white bg-[var(--color-brand-blue)] px-1.5 py-0.5 rounded-md leading-none align-middle">
            CLIENT
          </span>
        </span>
      </div>

      {/* Desktop left — plan info */}
      <div className="hidden lg:flex flex-col leading-none">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {planLabel}
        </span>
        <span className="text-[12px] font-medium text-slate-700 mt-0.5">
          Renews {renewalDate}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 ml-auto">
        <a
          href="mailto:support@nemvol.com"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <HelpCircle size={13} strokeWidth={1.8} />
          Support
        </a>

        {/* Avatar + dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen(v => !v)}
            className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold tracking-wide select-none hover:bg-slate-700 transition-colors"
          >
            {avatarInitials}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute right-0 top-11 w-52 bg-white rounded-xl border border-slate-100 shadow-lg shadow-slate-900/10 overflow-hidden z-50"
              >
                {/* Identity */}
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-[13px] font-bold text-slate-900 truncate">Franklin Reyes</p>
                  <p className="text-[11px] text-slate-400 truncate">franklin@nemvol.com</p>
                </div>

                {/* Nav links */}
                <div className="py-1">
                  {menuItems.map(({ label, icon: Icon, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Icon size={14} strokeWidth={1.8} className="text-slate-400" />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Sign out */}
                <div className="border-t border-slate-100 py-1">
                  <button
                    onClick={() => { setOpen(false); navigate('/login'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} strokeWidth={1.8} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
