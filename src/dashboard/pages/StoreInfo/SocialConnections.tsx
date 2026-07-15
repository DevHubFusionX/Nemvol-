import { Link2, AtSign, Camera, Music2 } from 'lucide-react';

const socials = [
  { key: 'facebook', label: 'Facebook', Icon: Link2, placeholder: 'https://facebook.com/yourbrand' },
  { key: 'twitter', label: 'Twitter / X', Icon: AtSign, placeholder: 'https://x.com/yourbrand' },
  { key: 'instagram', label: 'Instagram', Icon: Camera, placeholder: 'https://instagram.com/yourbrand' },
  { key: 'tiktok', label: 'TikTok', Icon: Music2, placeholder: 'https://tiktok.com/@yourbrand' },
];

interface Props {
  links: Record<string, string>;
  onLinksChange: (links: Record<string, string>) => void;
}

export default function SocialConnections({ links, onLinksChange }: Props) {
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onLinksChange({ ...links, [key]: e.target.value });

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6">
      <p className="text-[14px] font-bold text-slate-900 mb-0.5">Social Connections</p>
      <p className="text-[12px] text-slate-400 mb-5">
        Link your social media profiles to grow your online community.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socials.map(({ key, label, Icon, placeholder }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-slate-500">{label}</label>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-[var(--color-brand-blue)] transition-colors">
              <span className="px-3 py-3 bg-slate-50 border-r border-slate-200 shrink-0">
                <Icon size={13} className="text-slate-400" strokeWidth={1.8} />
              </span>
              <input
                value={links[key] ?? ''}
                onChange={set(key)}
                placeholder={placeholder}
                className="flex-1 px-3 py-3 text-[13px] text-slate-800 placeholder:text-slate-300 outline-none bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
