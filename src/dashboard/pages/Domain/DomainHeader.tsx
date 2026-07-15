import { Plus } from 'lucide-react';

interface Props {
  onConnect: () => void;
  onGetNew: () => void;
}

export default function DomainHeader({ onConnect, onGetNew }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Infrastructure
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Domain Settings</h1>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm">
          Manage your store web address. Use your free domain, connect an existing domain, or get a new branded domain.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
        <button
          onClick={onConnect}
          className="px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Connect Existing
        </button>
        <button
          onClick={onGetNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span className="hidden sm:inline">Get New Domain</span>
          <span className="sm:hidden">Get Domain</span>
        </button>
      </div>
    </div>
  );
}
