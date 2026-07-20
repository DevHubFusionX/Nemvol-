import { useEffect, useState } from 'react';
import StoreIdentity from './StoreIdentity';
import StoreInformation, { type StoreInfoForm } from './StoreInformation';
import SocialConnections from './SocialConnections';
import StoreCurrency from './StoreCurrency';
import { useStore, useUpdateStore } from '../../../hooks/useStore';

export default function StoreInfo() {
  const { data: store, isLoading } = useStore();
  const { mutate: updateStore, isPending } = useUpdateStore();

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [currency, setCurrency] = useState('NGN');
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [form, setForm] = useState<StoreInfoForm>({
    name: '', url: '', phone: '', whatsapp: '', address: '', country: 'NG', state: '',
  });

  useEffect(() => {
    if (!store) return;
    setLogoUrl(store.logoUrl ?? null);
    setCurrency(store.currency ?? 'NGN');
    setSocialLinks(store.socialLinks ? JSON.parse(store.socialLinks) : {});
    setForm({
      name:     store.name ?? '',
      url:      store.slug ?? '',
      phone:    store.phone ?? '',
      whatsapp: store.whatsapp ?? '',
      address:  store.address ?? '',
      country:  store.country ?? 'NG',
      state:    store.state ?? '',
    });
  }, [store]);

  const handleSave = () => {
    updateStore({
      name:        form.name,
      slug:        form.url,
      phone:       form.phone,
      whatsapp:    form.whatsapp,
      address:     form.address,
      country:     form.country,
      state:       form.state,
      currency,
      socialLinks: JSON.stringify(socialLinks),
    });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Configuration</p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Store Settings</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">Edit and manage your store information.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-5 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <StoreIdentity logoUrl={logoUrl} onLogoChange={setLogoUrl} />
      <StoreInformation form={form} onChange={setForm} originalSlug={store?.slug} />
      <SocialConnections links={socialLinks} onLinksChange={setSocialLinks} />
      <StoreCurrency selected={currency} onSelect={setCurrency} />
    </div>
  );
}
