import { useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { useUploadLogo } from '../../../hooks/useStore';

interface Props {
  logoUrl: string | null;
  onLogoChange: (url: string | null) => void;
}

export default function StoreIdentity({ logoUrl, onLogoChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadLogo();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    upload.mutate(file, {
      onSuccess: (data) => onLogoChange(data.logoUrl),
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6">
      <p className="text-[14px] font-bold text-slate-900 mb-0.5">Store Identity</p>
      <p className="text-[12px] text-slate-400 mb-5">
        Upload your store logo to build brand recognition across the platform.
      </p>

      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
          {upload.isPending ? (
            <Loader2 size={20} className="text-slate-400 animate-spin" />
          ) : logoUrl ? (
            <img src={logoUrl} alt="Store logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[11px] text-slate-400">Logo</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] text-slate-500">
            {upload.isPending ? 'Uploading…' : logoUrl ? 'Logo uploaded' : 'No logo uploaded yet'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={upload.isPending}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Upload size={12} strokeWidth={1.8} />
              {logoUrl ? 'Change Logo' : 'Upload Logo'}
            </button>
            {logoUrl && !upload.isPending && (
              <button
                onClick={() => { onLogoChange(null); if (inputRef.current) inputRef.current.value = ''; }}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={13} strokeWidth={2} />
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-400">PNG, JPG up to 2MB</p>
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
