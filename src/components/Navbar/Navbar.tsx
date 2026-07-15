import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import Megamenu from './Megamenu';
import RightActions from './RightActions';

type MenuKey = 'platform' | 'solutions' | 'resources';

const dropdownItems: { label: string; key: MenuKey; path: string }[] = [
  { label: 'Platform', key: 'platform', path: '/services' },
  { label: 'Solutions', key: 'solutions', path: '/solutions' },
  { label: 'Resources', key: 'resources', path: '/about' },
];

const plainLinks = [
  { label: 'About', path: '/about' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [menuLeft, setMenuLeft] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openMenu = useCallback((key: MenuKey, buttonEl: HTMLButtonElement) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    // Calculate position relative to the header
    if (headerRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect();
      const btnRect = buttonEl.getBoundingClientRect();
      setMenuLeft(btnRect.left - headerRect.left);
    }
    setActiveMenu(key);
  }, [hoverTimeout]);

  const scheduleClose = useCallback(() => {
    const timeout = setTimeout(() => setActiveMenu(null), 150);
    setHoverTimeout(timeout);
  }, []);

  const keepOpen = useCallback(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  }, [hoverTimeout]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {dropdownItems.map((item) => (
              <button
                key={item.key}
                onMouseEnter={(e) => openMenu(item.key, e.currentTarget)}
                onMouseLeave={scheduleClose}
                onClick={(e) => {
                  if (activeMenu === item.key) {
                    setActiveMenu(null);
                  } else {
                    openMenu(item.key, e.currentTarget);
                  }
                }}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-150 cursor-pointer select-none ${
                  activeMenu === item.key
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === item.key ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ))}

            {plainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setActiveMenu(null)}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <RightActions />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Megamenu — positioned below trigger */}
      <AnimatePresence>
        {activeMenu && (
          <Megamenu
            activeMenu={activeMenu}
            leftOffset={menuLeft}
            onMouseEnter={keepOpen}
            onMouseLeave={scheduleClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 py-5 space-y-1">
              {dropdownItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {plainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 mt-3">
                <RightActions />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
