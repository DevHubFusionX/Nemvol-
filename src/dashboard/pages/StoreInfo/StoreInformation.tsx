const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

export interface StoreInfoForm {
  name: string;
  url: string;
  phone: string;
  whatsapp: string;
  address: string;
  country: string;
  state: string;
}

interface Props {
  form: StoreInfoForm;
  onChange: (form: StoreInfoForm) => void;
}

export default function StoreInformation({ form, onChange }: Props) {
  const set = (k: keyof StoreInfoForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...form, [k]: e.target.value });

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6">
      <p className="text-[14px] font-bold text-slate-900 mb-0.5">Store Information</p>
      <p className="text-[12px] text-slate-400 mb-5">
        Provide essential details about your store to help customers find you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Store Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">Store Name</label>
          <input value={form.name} onChange={set('name')} className="input-field" />
        </div>

        {/* Store URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">Store URL</label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-[var(--color-brand-blue)] transition-colors">
            <span className="px-3 py-3 text-[12px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">
              nemvol.com/
            </span>
            <input
              value={form.url}
              onChange={set('url')}
              className="flex-1 px-3 py-3 text-[13px] text-slate-800 outline-none bg-white"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">Phone Number</label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-[var(--color-brand-blue)] transition-colors">
            <span className="px-3 py-3 text-[12px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">+234</span>
            <input value={form.phone} onChange={set('phone')} className="flex-1 px-3 py-3 text-[13px] text-slate-800 outline-none bg-white" />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">WhatsApp Number</label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-[var(--color-brand-blue)] transition-colors">
            <span className="px-3 py-3 text-[12px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">+234</span>
            <input value={form.whatsapp} onChange={set('whatsapp')} className="flex-1 px-3 py-3 text-[13px] text-slate-800 outline-none bg-white" />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">Address</label>
          <input value={form.address} onChange={set('address')} className="input-field" />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">Country</label>
          <select value={form.country} onChange={set('country')} className="input-field">
            <option value="">Select Country</option>
            <option value="NG">Nigeria</option>
            <option value="GH">Ghana</option>
            <option value="KE">Kenya</option>
            <option value="ZA">South Africa</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>

        {/* State */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[11px] font-semibold text-slate-500">State</label>
          {form.country === 'NG' ? (
            <select value={form.state} onChange={set('state')} className="input-field">
              <option value="">Select State</option>
              {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          ) : (
            <input value={form.state} onChange={set('state')} placeholder="Enter state / region" className="input-field" />
          )}
        </div>
      </div>
    </div>
  );
}
