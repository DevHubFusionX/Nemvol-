import { useState } from 'react';
import { Search, Package, Trash2, Edit2, X, AlertTriangle, Eye, Tag, ImageIcon, Layers } from 'lucide-react';
import { useProducts, useDeleteProduct, useUpdateProduct, type Product } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';

// ── Delete confirmation dialog ────────────────────────────────────────────────
function DeleteDialog({ product, onConfirm, onCancel, isPending }: {
  product: Product; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-red-500" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-[14px] font-bold text-slate-900">Delete product?</p>
            <p className="text-[12px] text-slate-400 mt-0.5">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-[13px] text-slate-600">
          You're about to delete <span className="font-semibold text-slate-800">"{product.name}"</span>. All variants and media will be removed.
        </p>
        <div className="flex gap-2 pt-1">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Product detail drawer ─────────────────────────────────────────────────────
function ProductDetailDrawer({ product, categoryName, onClose, onEdit }: {
  product: Product; categoryName: string; onClose: () => void; onEdit: () => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const images = product.media.sort((a, b) => Number(a.position) - Number(b.position));

  let tags: string[] = [];
  try { tags = JSON.parse(product.tags ?? '[]') } catch {}

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md flex flex-col shadow-2xl h-full overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div>
            <p className="text-[14px] font-bold text-slate-900">{product.name}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Product details</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors"
            >
              Edit
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
              <X size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6">

          {/* Images */}
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
              <ImageIcon size={11} /> Images
            </p>
            {images.length > 0 ? (
              <div className="space-y-2">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                  <img src={images[activeImg]?.url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((m, i) => (
                      <button
                        key={m.id}
                        onClick={() => setActiveImg(i)}
                        className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                          activeImg === i ? 'border-slate-900' : 'border-transparent'
                        }`}
                      >
                        <img src={m.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-xl bg-slate-50 flex items-center justify-center">
                <Package size={28} className="text-slate-300" strokeWidth={1.2} />
              </div>
            )}
          </div>

          {/* Core info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Status</p>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                product.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                product.status === 'archived' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {product.status}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Category</p>
              <p className="text-[13px] font-semibold text-slate-800 truncate">{categoryName}</p>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Description</p>
              <p className="text-[13px] text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Variants */}
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
              <Layers size={11} /> Variants ({product.variants.length})
            </p>
            <div className="space-y-2">
              {product.variants.map((v, i) => {
                let attrs: Record<string, string> = {};
                try { attrs = JSON.parse(v.attributes ?? '{}') } catch {}
                const attrLabel = Object.entries(attrs).map(([k, val]) => `${k}: ${val}`).join(' · ');
                return (
                  <div key={v.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800">
                        {attrLabel || `Variant ${i + 1}`}
                      </p>
                      {v.sku && <p className="text-[11px] text-slate-400 mt-0.5">SKU: {v.sku}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-slate-900">₦{parseFloat(v.price).toLocaleString()}</p>
                      {v.compareAtPrice && (
                        <p className="text-[11px] text-slate-400 line-through">₦{parseFloat(v.compareAtPrice).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                <Tag size={11} /> Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="border-t border-slate-100 pt-4 space-y-1.5">
            <div className="flex justify-between text-[12px]">
              <span className="text-slate-400">Product ID</span>
              <span className="text-slate-600 font-mono text-[11px]">{product.id.slice(0, 8)}…</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-slate-400">Slug</span>
              <span className="text-slate-600 font-mono text-[11px]">{product.slug}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-slate-400">Created</span>
              <span className="text-slate-600">{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
            {product.rating && (
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-400">Rating</span>
                <span className="text-slate-600">⭐ {product.rating} ({product.reviewCount ?? 0} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Edit modal ────────────────────────────────────────────────────────────────
function EditModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { data: categories = [] } = useCategories();
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description ?? '');
  const [categoryId, setCategoryId] = useState(product.categoryId ?? '');
  const [status, setStatus] = useState<'draft' | 'active' | 'archived'>(product.status);
  const [price, setPrice] = useState(product.variants[0]?.price ?? '');

  const handleSave = () => {
    updateProduct({
      id: product.id,
      name,
      description,
      categoryId: categoryId || undefined,
      status,
      variants: [{ ...product.variants[0], price }],
    }, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p className="text-[14px] font-bold text-slate-900">Edit Product</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Product Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Category</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
            >
              <option value="">No category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Price (₦)</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Status</label>
            <div className="flex gap-2">
              {(['draft', 'active', 'archived'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-[12px] font-semibold capitalize transition-colors border ${
                    status === s
                      ? s === 'active' ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : s === 'archived' ? 'bg-slate-100 border-slate-200 text-slate-600'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 focus:outline-none focus:border-slate-400 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main view ─────────────────────────────────────────────────────────────────
export default function ProductsView() {
  const [q, setQ] = useState('');
  const { data, isLoading } = useProducts({ q: q || undefined });
  const { data: categories = [] } = useCategories();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [viewTarget, setViewTarget] = useState<Product | null>(null);

  const products = data?.data ?? [];
  const categoryMap = new Map(categories.map(category => [category.id, category.name]));

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-1 sm:max-w-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
            <Search size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Search products..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>
          <span className="text-[12px] text-slate-400 shrink-0">{data?.total ?? 0} products</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <Package size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-slate-800">No products yet</p>
            <p className="text-[12px] text-slate-400 text-center max-w-xs">
              Add your first product to start selling on your storefront.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-5 py-3">
              {['Product', 'Category', 'Price', 'Status', 'Actions'].map(col => (
                <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
              ))}
            </div>
            {products.map(p => {
              const price = p.variants[0]?.price ?? '—';
              const categoryName = p.categoryId ? categoryMap.get(p.categoryId) ?? 'Unknown category' : 'No category';
              return (
                <div key={p.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] items-center px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 shrink-0 flex items-center justify-center overflow-hidden">
                      {p.media[0]
                        ? <img src={p.media[0].url} alt={p.name} className="w-full h-full object-cover" />
                        : <Package size={14} className="text-slate-300" />
                      }
                    </div>
                    <p className="text-[13px] font-semibold text-slate-800 truncate">{p.name}</p>
                  </div>
                  <span className="text-[12px] text-slate-500 hidden sm:block truncate">
                    {categoryName}
                  </span>
                  <span className="text-[13px] font-semibold text-slate-800 hidden sm:block">
                    ₦{parseFloat(price).toLocaleString()}
                  </span>
                  <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit ${
                    p.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                    p.status === 'archived' ? 'bg-slate-100 text-slate-400' : 'bg-amber-50 text-amber-500'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {p.status}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setViewTarget(p)}
                      title="View details"
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <Eye size={13} strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => setEditTarget(p)}
                      title="Edit product"
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <Edit2 size={13} strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      title="Delete product"
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product detail drawer */}
      {viewTarget && (
        <ProductDetailDrawer
          product={viewTarget}
          categoryName={viewTarget.categoryId ? categoryMap.get(viewTarget.categoryId) ?? 'Unknown category' : 'No category'}
          onClose={() => setViewTarget(null)}
          onEdit={() => { setEditTarget(viewTarget); setViewTarget(null); }}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteDialog
          product={deleteTarget}
          isPending={isDeleting}
          onConfirm={() => deleteProduct(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Edit modal */}
      {editTarget && (
        <EditModal product={editTarget} onClose={() => setEditTarget(null)} />
      )}
    </>
  );
}
