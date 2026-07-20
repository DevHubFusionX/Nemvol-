import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useDebounce } from '../../../hooks/useDebounce';
import { api } from '../../../lib/api';

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
  originalSlug?: string;
}

function sanitiseSlug(val: string) {
  return val.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-');
}

export default function StoreInformation({ form, onChange, originalSlug }: Props) {
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'error'>('idle');
  const debouncedSlug = useDebounce(form.url, 500);

  useEffect(() => {
    const slug = debouncedSlug.replace(/^-|-$/g, '');
    if (!slug || slug === originalSlug || slug.length < 3) { setSlugStatus('idle'); return; }
    setSlugStatus('checking');
    api.get('/store/slug-check', { params: { slug } })
      .then(r => setSlugStatus(r.data.available ? 'available' : 'taken'))
      .catch(() => setSlugStatus('error'));
  }, [debouncedSlug, originalSlug]);

  const set = (k: keyof StoreInfoForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = k === 'url' ? sanitiseSlug(e.target.value) : e.target.value;
      onChange({ ...form, [k]: val });
    };

  const slugIndicator = () => {
    if (form.url === originalSlug || form.url.length < 3) return null;
    if (slugStatus === 'checking') return <Loader2 size={13} className="text-slate-400 animate-spin" />;
    if (slugStatus === 'available') return <CheckCircle2 size={13} className="text-emerald-500" />;
    if (slugStatus === 'taken') return <XCircle size={13} className="text-red-400" />;
    return null;
  };

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
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-slate-400 transition-colors">
            <span className="px-3 py-3 text-[12px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">
              nemvol.com/
            </span>
            <input
              value={form.url}
              onChange={set('url')}
              placeholder="your-store"
              className="flex-1 px-3 py-3 text-[13px] text-slate-800 outline-none bg-white min-w-0"
            />
            <div className="px-3 shrink-0">{slugIndicator()}</div>
          </div>
          {slugStatus === 'taken' && (
            <p className="text-[11px] text-red-400">This URL is already taken</p>
          )}
          {slugStatus === 'available' && (
            <p className="text-[11px] text-emerald-500">This URL is available</p>
          )}
          <p className="text-[11px] text-slate-400">Only lowercase letters, numbers, and hyphens</p>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">Phone Number</label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-slate-400 transition-colors">
            <span className="px-3 py-3 text-[12px] text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0">+234</span>
            <input value={form.phone} onChange={set('phone')} className="flex-1 px-3 py-3 text-[13px] text-slate-800 outline-none bg-white" />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-slate-500">WhatsApp Number</label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-slate-400 transition-colors">
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
