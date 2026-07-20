import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, Store, Package, ShoppingCart, ClipboardList,
  Star, Users, Banknote, FileText, FileStack, Globe, MapPin,
  Truck, Info, UserCog, CreditCard, Wrench, ArrowUpRight, X, Paintbrush,
} from 'lucide-react';

const groups = [
  {
    label: 'Main Menu',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
      { label: 'Storefront', icon: Store, to: '/dashboard/storefront' },
      { label: 'Theme Builder', icon: Paintbrush, to: '/dashboard/theme-builder' },
    ],
  },
  {
    label: 'Sales & Inventory',
    items: [
      { label: 'Products', icon: Package, to: '/dashboard/products' },
      { label: 'Orders & Shipping', icon: ShoppingCart, to: '/dashboard/orders' },
      { label: 'Purchases Management', icon: ClipboardList, to: '/dashboard/purchases' },
      { label: 'Reviews & Ratings', icon: Star, to: '/dashboard/reviews' },
    ],
  },
  {
    label: 'Customers',
    items: [
      { label: 'Customers Management', icon: Users, to: '/dashboard/customers' },
    ],
  },
  {
    label: 'Transactions',
    items: [
      { label: 'Payments', icon: Banknote, to: '/dashboard/payments' },
      { label: 'Invoices', icon: FileText, to: '/dashboard/invoices' },
    ],
  },
  {
    label: 'Store Settings',
    items: [
      { label: 'Pages', icon: FileStack, to: '/dashboard/pages' },
      { label: 'Domain Management', icon: Globe, to: '/dashboard/domain' },
      { label: 'Tools', icon: Wrench, to: '/dashboard/tools' },
      { label: 'Locations', icon: MapPin, to: '/dashboard/locations' },
      { label: 'Shipment Settings', icon: Truck, to: '/dashboard/shipment' },
      { label: 'Store Information', icon: Info, to: '/dashboard/store-info' },
      { label: 'Staffs Management', icon: UserCog, to: '/dashboard/staffs' },
      { label: 'Plans & Billings', icon: CreditCard, to: '/dashboard/billing' },
    ],
  },
];

const linkBase =
  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors';
const linkActive = 'bg-slate-900 text-white hover:bg-slate-900 hover:text-white';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-60 shrink-0 h-full flex flex-col border-r border-slate-100 bg-white">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
        <div className="flex items-center">
          <span className="text-[15px] font-bold tracking-tight text-slate-900">Nemvol</span>
          <span className="ml-1.5 text-[10px] font-semibold text-white bg-[var(--color-brand-blue)] px-1.5 py-0.5 rounded-md leading-none">
            CLIENT
          </span>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={15} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ label, icon: Icon, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/dashboard'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? linkActive : ''}`
                    }
                  >
                    <Icon size={15} strokeWidth={1.8} />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="p-3 border-t border-slate-100">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-[12px] font-semibold text-slate-800 leading-snug">Ready to scale?</p>
          <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Upgrade your plan for more capacity.</p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-brand-blue)] hover:underline"
          >
            View plans <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Desktop — always visible */}
      <div className="hidden lg:flex h-screen">
        <SidebarContent />
      </div>

      {/* Mobile — portal drawer */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm lg:hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="h-full"
              >
                <SidebarContent onClose={onMobileClose} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
