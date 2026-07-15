import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAddProduct } from '../../modals/AddProductContext';
import AddCategoryModal from './modals/AddCategoryModal';
import AddAttributeModal from './modals/AddAttributeModal';
import AddGiftCardModal from './modals/AddGiftCardModal';

interface ProductsHeaderProps {
  activeTab: string;
}

const tabLabels: Record<string, string> = {
  products: 'Add Product',
  categories: 'Add Category',
  attributes: 'Add Attribute',
  giftcards: 'Add Gift Card',
};

export default function ProductsHeader({ activeTab }: ProductsHeaderProps) {
  const { openAddProduct } = useAddProduct();
  const [locked, setLocked] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [attributeOpen, setAttributeOpen] = useState(false);
  const [giftCardOpen, setGiftCardOpen] = useState(false);

  const handleAdd = () => {
    if (activeTab === 'products') openAddProduct();
    else if (activeTab === 'categories') setCategoryOpen(true);
    else if (activeTab === 'attributes') setAttributeOpen(true);
    else if (activeTab === 'giftcards') setGiftCardOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">
            Manage your inventory, categories, attributes and gift cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-100 bg-white">
            <span className="text-[12px] font-medium text-slate-600 hidden sm:inline">Lock Inventory</span>
            <span className="text-[12px] font-medium text-slate-600 sm:hidden">Lock</span>
            <button
              onClick={() => setLocked(v => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${locked ? 'bg-slate-900' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${locked ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">{tabLabels[activeTab] ?? 'Add'}</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <AddCategoryModal open={categoryOpen} onClose={() => setCategoryOpen(false)} />
      <AddAttributeModal open={attributeOpen} onClose={() => setAttributeOpen(false)} />
      <AddGiftCardModal open={giftCardOpen} onClose={() => setGiftCardOpen(false)} />
    </>
  );
}
