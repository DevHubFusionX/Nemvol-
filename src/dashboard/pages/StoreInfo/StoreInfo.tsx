import StoreIdentity from './StoreIdentity';
import StoreInformation from './StoreInformation';
import SocialConnections from './SocialConnections';
import StoreCurrency from './StoreCurrency';

export default function StoreInfo() {
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Configuration
          </p>
          <h1 className="text-2xl font-bold text-slate-900">Store Settings</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">Edit and manage your store information.</p>
        </div>
        <button className="px-5 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
          Save Changes
        </button>
      </div>

      <StoreIdentity />
      <StoreInformation />
      <SocialConnections />
      <StoreCurrency />
    </div>
  );
}
