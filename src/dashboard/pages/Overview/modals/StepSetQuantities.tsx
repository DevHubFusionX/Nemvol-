const MOCK_PRODUCTS = [
  { id: '1', name: 'Vintage Denim Jacket', sku: 'VDJ-001', stock: 12 },
  { id: '2', name: 'Floral Summer Dress', sku: 'FSD-002', stock: 5 },
  { id: '3', name: 'Leather Crossbody Bag', sku: 'LCB-003', stock: 8 },
];

interface StepSetQuantitiesProps {
  selectedIds: string[];
  quantities: Record<string, number>;
  onChange: (quantities: Record<string, number>) => void;
}

export default function StepSetQuantities({ selectedIds, quantities, onChange }: StepSetQuantitiesProps) {
  const products = MOCK_PRODUCTS.filter((p) => selectedIds.includes(p.id));

  const set = (id: string, val: number) =>
    onChange({ ...quantities, [id]: val });

  return (
    <div className="space-y-3">
      <p className="text-[12px] text-slate-400">
        Set how many units to transfer for each product. Cannot exceed available stock.
      </p>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
        {products.map((p) => {
          const qty = quantities[p.id] ?? 1;
          return (
            <div key={p.id} className="flex items-center gap-4 px-4 py-3 bg-white">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-slate-800 truncate">{p.name}</p>
                <p className="text-[11px] text-slate-400">{p.sku} · {p.stock} available</p>
              </div>
              {/* Stepper */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => set(p.id, Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-[14px] font-semibold"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={p.stock}
                  value={qty}
                  onChange={(e) => {
                    const v = Math.min(p.stock, Math.max(1, Number(e.target.value)));
                    set(p.id, v);
                  }}
                  className="w-12 text-center text-[13px] font-semibold text-slate-800 border border-slate-200 rounded-lg py-1 focus:outline-none focus:border-slate-400"
                />
                <button
                  onClick={() => set(p.id, Math.min(p.stock, qty + 1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-[14px] font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
