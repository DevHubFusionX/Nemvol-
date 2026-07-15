import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Upload, Info, X, Eye, EyeOff } from 'lucide-react';

const LAYOUTS = ['Minimal', 'Modern', 'Playful', 'Poster'] as const;
type Layout = typeof LAYOUTS[number];

const ACCENT_COLORS = ['#6366f1', '#16a34a', '#f59e0b', '#ef4444', '#0ea5e9', '#ec4899'];

const NAV_ITEMS = [
  { label: 'Store Notice', sub: 'Unavailable page' },
  { label: 'Links', sub: 'Navbar and footer links' },
];

interface MiniEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function MiniEditor({ open, onClose, onSave }: MiniEditorProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeNav, setActiveNav] = useState('Store Notice');
  const [layout, setLayout] = useState<Layout>('Minimal');
  const [headline, setHeadline] = useState("We'll Be Right Back!");
  const [description, setDescription] = useState('Our storefront is currently unavailable. Please check back soon.');
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSave();
  };

  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-[240px] flex flex-col items-center text-center gap-4">
      {coverImage ? (
        <img src={coverImage} alt="" className="w-14 h-14 rounded-full object-cover" />
      ) : (
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
          <Info size={22} style={{ color: accent }} strokeWidth={1.6} />
        </div>
      )}
      <div>
        <p className="text-[15px] font-bold text-slate-900 leading-snug">{headline || 'Headline'}</p>
        <p className="text-[12px] text-slate-400 mt-1.5 leading-relaxed">{description || 'Description text'}</p>
      </div>
      <button className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white" style={{ backgroundColor: accent }}>
        Notify Me When Open
      </button>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-3xl bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
              <div>
                <p className="text-[14px] font-semibold text-slate-900">Storefront Mini Editor</p>
                <p className="text-[12px] text-slate-400 mt-0.5 hidden sm:block">
                  Quick edits for storefront components without opening the full builder.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Preview toggle — mobile only */}
                <button
                  onClick={() => setShowPreview((v) => !v)}
                  className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {showPreview ? <EyeOff size={13} strokeWidth={1.8} /> : <Eye size={13} strokeWidth={1.8} />}
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

              {/* Left nav — hidden on mobile */}
              <div className="hidden sm:block w-48 border-r border-slate-100 p-3 space-y-1 shrink-0">
                {NAV_ITEMS.map(({ label, sub }) => (
                  <button
                    key={label}
                    onClick={() => setActiveNav(label)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                      activeNav === label ? 'bg-slate-100' : 'hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-[13px] font-semibold text-slate-800">{label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
                  </button>
                ))}
              </div>

              {/* Mobile: nav tabs strip */}
              <div className="sm:hidden absolute top-[61px] left-0 right-0 flex border-b border-slate-100 bg-white z-10">
                {NAV_ITEMS.map(({ label }) => (
                  <button
                    key={label}
                    onClick={() => { setActiveNav(label); setShowPreview(false); }}
                    className={`flex-1 py-2.5 text-[12px] font-semibold transition-colors ${
                      activeNav === label ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Mobile preview overlay */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="sm:hidden absolute inset-0 top-[61px] bg-slate-100 flex items-center justify-center p-6 z-20"
                  >
                    <Preview />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Editor panel */}
              <div className="flex-1 bg-slate-900 p-4 sm:p-5 space-y-5 overflow-y-auto mt-[41px] sm:mt-0">
                {/* Layout picker */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Select Layout Template
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {LAYOUTS.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLayout(l)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                          layout === l ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Headline Title</p>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Description Text</p>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">{description.length}/400 characters</p>
                </div>

                {/* Cover image */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Cover / Illustration Image</p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full py-2.5 rounded-lg border border-dashed border-slate-600 text-[12px] text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload size={13} strokeWidth={1.8} />
                    {coverImage ? 'Replace image' : 'Upload replacement image'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                </div>

                {/* Accent color */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Brand Accent Color</p>
                  <div className="flex items-center gap-2">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setAccent(c)}
                        style={{ backgroundColor: c }}
                        className={`w-7 h-7 rounded-full transition-all ${
                          accent === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="w-full py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
                  style={{ backgroundColor: saved ? '#16a34a' : accent, color: '#fff' }}
                >
                  {saved ? '✓ Saved!' : 'Save notice JSON'}
                </button>
              </div>

              {/* Live preview — desktop only */}
              <div className="hidden sm:flex w-64 bg-slate-100 items-center justify-center p-5 shrink-0">
                <Preview />
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
