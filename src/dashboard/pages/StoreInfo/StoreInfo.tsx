import { useState } from 'react';
import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import StoreIdentity from './StoreIdentity';
import StoreInformation, { type StoreInfoForm } from './StoreInformation';
import SocialConnections from './SocialConnections';
import StoreCurrency from './StoreCurrency';

export default function StoreInfo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [currency, setCurrency] = useState('NGN');
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<StoreInfoForm>({
    name: '',
    url: '',
    phone: '',
    whatsapp: '',
    address: '',
    country: 'NG',
    state: '',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Configuration
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Store Settings</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">Edit and manage your store information.</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"
              >
                <Check size={14} strokeWidth={2.5} />
                Saved
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <StoreIdentity logoUrl={logoUrl} onLogoChange={setLogoUrl} />
      <StoreInformation form={form} onChange={setForm} />
      <SocialConnections links={socialLinks} onLinksChange={setSocialLinks} />
      <StoreCurrency selected={currency} onSelect={setCurrency} />
    </div>
  );
}
