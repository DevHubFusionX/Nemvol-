import { SlidersHorizontal, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddAttributeModal from './modals/AddAttributeModal';
import { useAttributes, useDeleteAttribute } from '../../../hooks/useAttributes';

export default function AttributesView() {
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: attributes = [], isLoading } = useAttributes();
  const deleteAttribute = useDeleteAttribute();

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Product Attributes</p>
            <p className="text-[12px] text-slate-400 mt-0.5">Define size, colour, material and other product variants</p>
          </div>
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors">
            <Plus size={13} strokeWidth={2.5} /> Add Attribute
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-[13px] text-slate-400">Loading...</p>
          </div>
        ) : attributes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <SlidersHorizontal size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-slate-800">No attributes yet</p>
            <p className="text-[12px] text-slate-400 text-center max-w-xs">
              Add attributes to let customers filter and select product variants.
            </p>
            <button onClick={() => setOpen(true)} className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <Plus size={13} strokeWidth={2.5} /> Add your first attribute
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {attributes.map(attr => {
              const vals: string[] = (() => { try { return JSON.parse(attr.values) } catch { return [] } })();
              return (
                <li key={attr.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">
                      {attr.name}
                      <span className="ml-2 text-[11px] font-medium text-slate-400 capitalize">{attr.type}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vals.map(v => (
                        <span key={v} className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-600">{v}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (deletingId) return;
                      setDeletingId(attr.id);
                      deleteAttribute.mutate(attr.id, { onSettled: () => setDeletingId(null) });
                    }}
                    disabled={deletingId === attr.id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deletingId === attr.id
                      ? <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                      : <Trash2 size={14} strokeWidth={2} />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <AddAttributeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
