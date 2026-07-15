import { useState } from 'react';

export default function StoreInformation() {
  const [form, setForm] = useState({
    name: 'Devhub',
    url: 'yourstore',
    phone: '8030531624',
    whatsapp: '811 245678',
    address: 'Nigeria',
    country: '',
    state: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }));

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6">
      <p className="text-[14px] font-bold text-slate-900 mb-0.5">Store Information</p>
      <p className="text-[12px] text-slate-400 mb-5">
        Provide essential details about your store to help customers find you.
      </p>

      <div className="grid grid-cols-2 gap-4">
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
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-[11px] font-semibold text-slate-500">State</label>
          <input value={form.state} onChange={set('state')} placeholder="Enter state" className="input-field" />
        </div>
      </div>
    </div>
  );
}
