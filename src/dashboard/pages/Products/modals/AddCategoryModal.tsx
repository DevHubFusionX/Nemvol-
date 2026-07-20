import { useRef, useState } from 'react';
import { ImagePlus, CheckCircle2 } from 'lucide-react';
import SimpleModal from './SimpleModal';
import { useCreateCategory } from '../../../../hooks/useCategories';

interface Props { open: boolean; onClose: () => void; }

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

const PARENT_CATEGORIES = ['Fashion', 'Food & Beverages', 'Beauty', 'Electronics', 'Home & Living', 'Health', 'Accessories'];

export default function AddCategoryModal({ open, onClose }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: '', parent: '', description: '' });
  const [cover, setCover] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<'name', string>>>({});
  const [done, setDone] = useState(false);
  const createCategory = useCreateCategory();
  const submitting = useRef(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCover(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!form.name.trim()) { setErrors({ name: 'Category name is required' }); return; }
    setErrors({});
    const slug = form.name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (submitting.current) return;
    submitting.current = true;
    createCategory.mutate({ name: form.name.trim(), slug }, {
      onSuccess: () => setDone(true),
      onSettled: () => { submitting.current = false; },
    });
  };

  const handleClose = () => {
    setForm({ name: '', parent: '', description: '' });
    setCover(null); setErrors({}); setDone(false);
    onClose();
  };

  return (
    <SimpleModal open={open} onClose={handleClose} title="Add Category" subtitle="Organise your products into browsable groups">
      {done ? (
        <div className="flex flex-col items-center text-center py-6 gap-3">
          <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={1.5} />
          <p className="text-[14px] font-bold text-slate-900">Category created!</p>
          <p className="text-[13px] text-slate-400">
            <span className="font-semibold text-slate-700">{form.name}</span> has been added.
          </p>
          <button onClick={handleClose} className="mt-1 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cover image */}
          <div
            onClick={() => fileRef.current?.click()}
            className="w-full h-28 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-colors overflow-hidden"
          >
            {cover ? (
              <img src={cover} alt="" className="w-full h-full object-cover" />
            ) : (
              <>
                <ImagePlus size={20} className="text-slate-300" strokeWidth={1.5} />
                <p className="text-[12px] text-slate-400">Upload category cover image</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />

          {/* Name */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input type="text" value={form.name} onChange={set('name')} placeholder="e.g. Summer Collection" className={inputCls} />
            {errors.name && <p className="text-[11px] text-red-500 mt-1">• {errors.name}</p>}
          </div>

          {/* Parent */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Parent Category <span className="text-[11px] font-normal text-slate-400">(optional)</span></label>
            <select value={form.parent} onChange={set('parent')} className={`${inputCls} appearance-none`}>
              <option value="">None — top-level category</option>
              {PARENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Description <span className="text-[11px] font-normal text-slate-400">(optional)</span></label>
            <textarea rows={3} value={form.description} onChange={set('description')} placeholder="Describe this category..." className={`${inputCls} resize-none`} />
          </div>

          <button onClick={handleSave} disabled={createCategory.isPending} className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {createCategory.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {createCategory.isPending ? 'Saving…' : 'Save Category'}
          </button>
        </div>
      )}
    </SimpleModal>
  );
}
