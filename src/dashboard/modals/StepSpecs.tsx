import { X } from 'lucide-react';
import { useState } from 'react';

interface StepSpecsProps {
  data: { sku: string; weight: string; variants: string[] };
  onChange: (data: Partial<StepSpecsProps['data']>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isPending?: boolean;
  uploadingImages?: boolean;
}

export default function StepSpecs({ data, onChange, onBack, onSubmit, isPending, uploadingImages }: StepSpecsProps) {
  const [variantInput, setVariantInput] = useState('');

  const addVariant = () => {
    const val = variantInput.trim();
    if (!val || data.variants.includes(val)) return;
    onChange({ variants: [...data.variants, val] });
    setVariantInput('');
  };

  const removeVariant = (v: string) =>
    onChange({ variants: data.variants.filter((x) => x !== v) });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {/* SKU */}
        <div>
          <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">SKU</label>
          <input
            type="text"
            value={data.sku}
            onChange={(e) => onChange({ sku: e.target.value })}
            placeholder="e.g. VDJ-001"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors"
          />
        </div>
        {/* Weight */}
        <div>
          <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Weight (kg)</label>
          <input
            type="number"
            min="0"
            value={data.weight}
            onChange={(e) => onChange({ weight: e.target.value })}
            placeholder="e.g. 0.5"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors"
          />
        </div>
      </div>

      {/* Variants */}
      <div>
        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
          Variants <span className="text-[11px] font-normal text-slate-400">(size, color, etc.)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={variantInput}
            onChange={(e) => setVariantInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addVariant(); } }}
            placeholder="e.g. Red, XL, 500ml..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors"
          />
          <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-[13px] font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Add
          </button>
        </div>
        {data.variants.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.variants.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[12px] font-medium text-slate-700"
              >
                {v}
                <button onClick={() => removeVariant(v)} className="text-slate-400 hover:text-slate-700">
                  <X size={11} strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {uploadingImages ? 'Uploading images...' : isPending ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </div>
  );
}
