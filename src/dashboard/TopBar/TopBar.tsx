import { HelpCircle, Menu } from 'lucide-react';

interface TopBarProps {
  planLabel?: string;
  renewalDate?: string;
  avatarInitials?: string;
  onMenuClick: () => void;
}

export default function TopBar({
  planLabel = 'Starter Plan',
  renewalDate = '19 Jul 2026',
  avatarInitials = 'FR',
  onMenuClick,
}: TopBarProps) {
  return (
    <header className="h-16 shrink-0 flex items-center px-4 lg:px-6 border-b border-slate-100 bg-white">

      {/* Left — hamburger (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Menu size={18} strokeWidth={1.8} />
      </button>

      {/* Center — Nemvol brand (mobile only, absolutely centered) */}
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

      {/* Right — support + avatar */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <HelpCircle size={13} strokeWidth={1.8} />
          Support
        </button>

        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold tracking-wide select-none">
          {avatarInitials}
        </div>
      </div>

    </header>
  );
}
