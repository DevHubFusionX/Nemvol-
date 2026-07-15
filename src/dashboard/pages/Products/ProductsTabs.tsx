import { Package, LayoutGrid, SlidersHorizontal, Gift } from 'lucide-react';

export type ProductTab = 'products' | 'categories' | 'attributes' | 'giftcards';

const tabs: { id: ProductTab; label: string; icon: React.ElementType }[] = [
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: LayoutGrid },
  { id: 'attributes', label: 'Attributes', icon: SlidersHorizontal },
  { id: 'giftcards', label: 'Gift Cards', icon: Gift },
];

interface ProductsTabsProps {
  active: ProductTab;
  onChange: (tab: ProductTab) => void;
}

export default function ProductsTabs({ active, onChange }: ProductsTabsProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
      <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-xl w-fit min-w-max">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              active === id
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Icon size={14} strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
