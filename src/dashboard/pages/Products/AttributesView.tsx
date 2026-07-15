import { SlidersHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';
import AddAttributeModal from './modals/AddAttributeModal';

export default function AttributesView() {
  const [open, setOpen] = useState(false);

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
      </div>
      <AddAttributeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
