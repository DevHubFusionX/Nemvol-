interface StepPricingProps {
  data: { price: string; compareAt: string; stock: string };
  onChange: (data: Partial<StepPricingProps['data']>) => void;
  errors: Partial<Record<'price' | 'stock', string>>;
  onBack: () => void;
  onNext: () => void;
}

function Field({
  label, required, prefix, value, placeholder, onChange, error,
}: {
  label: string; required?: boolean; prefix?: string;
  value: string; placeholder: string;
  onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`flex items-center rounded-xl border overflow-hidden transition-colors ${
        error ? 'border-red-400' : 'border-slate-200 focus-within:border-slate-400'
      }`}>
        {prefix && (
          <span className="px-3 py-2.5 text-[13px] font-semibold text-slate-400 bg-slate-50 border-r border-slate-200">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none bg-white"
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><span>•</span> {error}</p>
      )}
    </div>
  );
}

export default function StepPricing({ data, onChange, errors, onBack, onNext }: StepPricingProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Selling Price" required prefix="₦"
          value={data.price} placeholder="0.00"
          onChange={(v) => onChange({ price: v })} error={errors.price}
        />
        <Field
          label="Compare-at Price" prefix="₦"
          value={data.compareAt} placeholder="0.00"
          onChange={(v) => onChange({ compareAt: v })}
        />
      </div>
      <Field
        label="Stock Quantity" required
        value={data.stock} placeholder="e.g. 50"
        onChange={(v) => onChange({ stock: v })} error={errors.stock}
      />
      <p className="text-[11px] text-slate-400 leading-relaxed">
        Compare-at price is shown as the original price when running a sale. Leave blank if no discount.
      </p>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
        >
          Next: Specifications →
        </button>
      </div>
    </div>
  );
}
