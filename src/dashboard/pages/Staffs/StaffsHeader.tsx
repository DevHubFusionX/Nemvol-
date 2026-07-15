import { Plus } from 'lucide-react';

interface Props {
  onAdd: () => void;
}

export default function StaffsHeader({ onAdd }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 flex items-center gap-1.5 mb-1">
          <span className="w-4 h-px bg-emerald-600 inline-block" />
          Workforce Management
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Staff Management</h1>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm">
          Oversee your team across all branches. Manage permissions, track activities, and maintain a high-performing workforce.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors shrink-0 self-start"
      >
        <Plus size={14} strokeWidth={2.5} />
        Add New Staff
      </button>
    </div>
  );
}
