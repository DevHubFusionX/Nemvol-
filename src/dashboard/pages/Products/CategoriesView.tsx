import { Layers, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddCategoryModal from './modals/AddCategoryModal';
import { useCategories, useDeleteCategory } from '../../../hooks/useCategories';
import { useProducts } from '../../../hooks/useProducts';

export default function CategoriesView() {
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: categories = [], isLoading } = useCategories();
  const { data: productsResponse } = useProducts();
  const deleteCategory = useDeleteCategory();

  const products = productsResponse?.data ?? [];
  const totalProducts = products.length;
  const categoryCount = categories.length;
  const activeProducts = products.filter(product => product.status === 'active').length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <p className="text-[13px] font-semibold text-slate-800">Stock Levels by Category</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Live summary</p>
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400">Categories</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{categoryCount}</p>
            <p className="mt-2 text-[12px] text-slate-500">{activeProducts} active products across your categories.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <p className="text-[13px] font-semibold text-slate-800">Inventory Distribution</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Live summary</p>
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400">Products</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{totalProducts}</p>
            <p className="mt-2 text-[12px] text-slate-500">{categoryCount > 0 ? `${categoryCount} categories available for organisation.` : 'Create categories to organise products.'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Product Categories</p>
            <p className="text-[12px] text-slate-400 mt-0.5">Organise products by category for better discovery</p>
          </div>
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors">
            <Plus size={13} strokeWidth={2.5} /> Add Category
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-[13px] text-slate-400">Loading...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <Layers size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-slate-800">No categories yet</p>
            <p className="text-[12px] text-slate-400 text-center max-w-xs">
              Add categories to organise your products and make your store easier to browse.
            </p>
            <button onClick={() => setOpen(true)} className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <Plus size={13} strokeWidth={2.5} /> Add your first category
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {categories.map(cat => (
              <li key={cat.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{cat.name}</p>
                  <p className="text-[11px] text-slate-400">{cat.slug}</p>
                </div>
                <button
                  onClick={() => {
                    if (deletingId) return;
                    setDeletingId(cat.id);
                    deleteCategory.mutate(cat.id, { onSettled: () => setDeletingId(null) });
                  }}
                  disabled={deletingId === cat.id}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deletingId === cat.id
                    ? <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                    : <Trash2 size={14} strokeWidth={2} />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddCategoryModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
