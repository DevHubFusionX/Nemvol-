import { MapPin } from 'lucide-react';

export default function LocationsEmpty() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center py-20 gap-3">
      {/* SVG globe */}
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="28" stroke="#e2e8f0" strokeWidth="2" fill="none" />
        <ellipse cx="36" cy="36" rx="12" ry="28" stroke="#e2e8f0" strokeWidth="2" fill="none" />
        <line x1="8" y1="36" x2="64" y2="36" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="12" y1="22" x2="60" y2="22" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="12" y1="50" x2="60" y2="50" stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Pin markers */}
        <circle cx="28" cy="26" r="3" fill="#94a3b8" />
        <circle cx="44" cy="32" r="3" fill="#94a3b8" />
        <circle cx="34" cy="46" r="3" fill="#94a3b8" />
      </svg>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[14px] font-semibold text-slate-800">No branches added yet</p>
        <p className="text-[12px] text-slate-400 max-w-xs leading-relaxed">
          Manage your business better by creating branches or pickup locations. This helps with organised shipping, inventory tracking, and reporting.
        </p>
      </div>

      <button className="flex items-center gap-1.5 mt-2 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
        <MapPin size={13} strokeWidth={1.8} />
        Add your first location
      </button>
    </div>
  );
}
