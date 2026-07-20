import { ChevronDown } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

interface StepProductInfoProps {
  data: { category: string; name: string; description: string };
  onChange: (data: Partial<StepProductInfoProps['data']>) => void;
  errors: Partial<Record<'category' | 'name', string>>;
  onNext: () => void;
}

export default function StepProductInfo({ data, onChange, errors, onNext }: StepProductInfoProps) {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
          Product Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={data.category}
            onChange={(e) => onChange({ category: e.target.value })}
            disabled={isLoading}
            className={`w-full appearance-none px-4 py-2.5 rounded-xl border text-[13px] bg-white text-slate-700 focus:outline-none transition-colors pr-9 disabled:opacity-50 ${
              errors.category ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-400'
            }`}
          >
            <option value="">
              {isLoading ? 'Loading categories...' : categories.length === 0 ? 'No categories yet — add one first' : 'Select a category...'}
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" strokeWidth={2} />
        </div>
        {errors.category && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
            <span>•</span> {errors.category}
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="E.g: Vintage Denim Jacket"
          className={`w-full px-4 py-2.5 rounded-xl border text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none transition-colors ${
            errors.name ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-slate-400'
          }`}
        />
        {errors.name && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
            <span>•</span> {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
          Product Description
        </label>
        <textarea
          rows={4}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Tell your customers about this product..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors resize-none"
        />
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          Next: Media →
        </button>
      </div>
    </div>
  );
}
