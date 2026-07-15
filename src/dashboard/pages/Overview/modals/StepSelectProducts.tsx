import { Search, Package, Check } from 'lucide-react';
import { useState } from 'react';

// Mock products — replace with real data later
const MOCK_PRODUCTS = [
  { id: '1', name: 'Vintage Denim Jacket', sku: 'VDJ-001', stock: 12 },
  { id: '2', name: 'Floral Summer Dress', sku: 'FSD-002', stock: 5 },
  { id: '3', name: 'Leather Crossbody Bag', sku: 'LCB-003', stock: 8 },
];

interface StepSelectProductsProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export default function StepSelectProducts({ selected, onChange }: StepSelectProductsProps) {
  const [query, setQuery] = useState('');

  const filtered = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-white">
        <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-[13px] text-slate-700 placeholder:text-slate-300 outline-none bg-transparent"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="py-10 flex flex-col items-center gap-2 text-center">
          <Package size={28} className="text-slate-200" strokeWidth={1.4} />
          <p className="text-[13px] font-semibold text-slate-700">
            You don't have any products yet.
          </p>
          <p className="text-[12px] text-slate-400">
            You need to Add products before you transfer
          </p>
          <p className="text-[11px] text-slate-300 mt-1">No more products</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
          {filtered.map((p) => {
            const active = selected.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  active ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'bg-slate-900 border-slate-900' : 'border-slate-300'
                }`}>
                  {active && <Check size={11} strokeWidth={2.5} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 truncate">{p.name}</p>
                  <p className="text-[11px] text-slate-400">{p.sku} · {p.stock} in stock</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
