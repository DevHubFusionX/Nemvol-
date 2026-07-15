import { Eye, Copy, Settings2, Pencil, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import MiniEditor from './MiniEditor';

const STORE_URL = 'https://yourstore.nemvol.com';

interface TemplateToolbarProps {
  onMoreConfig: () => void;
}

export default function TemplateToolbar({ onMoreConfig }: TemplateToolbarProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 rounded-xl bg-white border border-slate-100">
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Storefront Template</p>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Select a premium storefront template for your brand
          </p>
        </div>

        {/* Action buttons — scroll horizontally on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
          <a
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            <Eye size={13} strokeWidth={1.8} />
            View Store
            <ExternalLink size={11} strokeWidth={1.8} className="text-slate-400" />
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            {copied ? <Check size={13} strokeWidth={2.5} className="text-emerald-500" /> : <Copy size={13} strokeWidth={1.8} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <button
            onClick={onMoreConfig}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            <Settings2 size={13} strokeWidth={1.8} />
            <span className="hidden sm:inline">More Config</span>
            <span className="sm:hidden">Config</span>
          </button>

          <button
            onClick={() => setEditorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-700 transition-colors shrink-0"
          >
            <Pencil size={13} strokeWidth={1.8} />
            <span className="hidden sm:inline">Mini Editor</span>
            <span className="sm:hidden">Editor</span>
          </button>
        </div>
      </div>

      <MiniEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={() => {}}
      />
    </>
  );
}
