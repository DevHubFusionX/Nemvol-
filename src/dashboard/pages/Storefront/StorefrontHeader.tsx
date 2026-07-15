import { useState } from 'react';
import { Plus } from 'lucide-react';
import LaunchStorefrontModal from './modals/LaunchStorefrontModal';

export default function StorefrontHeader() {
  const [live, setLive] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-5 rounded-xl bg-slate-50 border border-slate-100">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Storefront</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">
            Launch and style your storefront with a polished customer-facing experience.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-slate-500">Make it Live</span>
            <button
              onClick={() => setLive((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                live ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  live ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            {live && (
              <span className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Live
              </span>
            )}
          </div>

          <button
            onClick={() => setLaunchOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">Launch Storefront</span>
            <span className="sm:hidden">Launch</span>
          </button>
        </div>
      </div>

      <LaunchStorefrontModal
        open={launchOpen}
        onClose={() => setLaunchOpen(false)}
        onPublished={() => setLive(true)}
      />
    </>
  );
}
