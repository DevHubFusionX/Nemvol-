import { ChevronDown, MapPin } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Vintage Denim Jacket', sku: 'VDJ-001' },
  { id: '2', name: 'Floral Summer Dress', sku: 'FSD-002' },
  { id: '3', name: 'Leather Crossbody Bag', sku: 'LCB-003' },
];

const LOCATIONS = ['Lagos — Main Warehouse', 'Abuja — Branch Store', 'Port Harcourt — Outlet'];

interface StepConfirmTransferProps {
  selectedIds: string[];
  quantities: Record<string, number>;
  destination: string;
  onDestinationChange: (d: string) => void;
  error?: string;
}

export default function StepConfirmTransfer({
  selectedIds,
  quantities,
  destination,
  onDestinationChange,
  error,
}: StepConfirmTransferProps) {
  const products = MOCK_PRODUCTS.filter((p) => selectedIds.includes(p.id));
  const totalUnits = selectedIds.reduce((sum, id) => sum + (quantities[id] ?? 1), 0);

  return (
    <div className="space-y-4">
      {/* Destination */}
      <div>
        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
          Destination Location <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" strokeWidth={1.8} />
          <select
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className={`w-full appearance-none pl-8 pr-9 py-2.5 rounded-xl border text-[13px] bg-white text-slate-700 focus:outline-none transition-colors ${
              error ? 'border-red-400' : 'border-slate-200 focus:border-slate-400'
            }`}
          >
            <option value="">Select destination...</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" strokeWidth={2} />
        </div>
        {error && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><span>•</span> {error}</p>
        )}
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Transfer Summary</p>
          <p className="text-[11px] font-semibold text-slate-500">{totalUnits} total units</p>
        </div>
        <div className="divide-y divide-slate-100">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{p.name}</p>
                <p className="text-[11px] text-slate-400">{p.sku}</p>
              </div>
              <span className="text-[13px] font-bold text-slate-900">
                × {quantities[p.id] ?? 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {destination && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
          <MapPin size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
          <p className="text-[12px] text-slate-600">
            Transferring to <span className="font-semibold text-slate-800">{destination}</span>
          </p>
        </div>
      )}
    </div>
  );
}
