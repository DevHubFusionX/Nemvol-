import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X, Check, Eye, EyeOff, LogOut, User, Lock, ImageIcon } from 'lucide-react';

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white';

type Section = 'photo' | 'info' | 'password';

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'photo', label: 'Profile Photo', icon: ImageIcon },
  { id: 'info', label: 'Personal Info', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
];

function SaveRow({ saved, label, onSave }: { saved: boolean; label: string; onSave: () => void }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <AnimatePresence>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600"
          >
            <Check size={13} strokeWidth={2.5} /> Saved
          </motion.span>
        )}
      </AnimatePresence>
      <button
        onClick={onSave}
        className="px-5 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
      >
        {label}
      </button>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<Section>('photo');

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [infoSaved, setInfoSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState('');

  const [info, setInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });

  const setInfoField = (k: keyof typeof info) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setInfo(p => ({ ...p, [k]: e.target.value }));

  const setPwField = (k: keyof typeof pw) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setPw(p => ({ ...p, [k]: e.target.value }));

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveInfo = () => {
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 3000);
  };

  const handleSavePw = () => {
    if (!pw.current) { setPwError('Enter your current password'); return; }
    if (pw.next.length < 8) { setPwError('New password must be at least 8 characters'); return; }
    if (pw.next !== pw.confirm) { setPwError('Passwords do not match'); return; }
    setPwError('');
    setPw({ current: '', next: '', confirm: '' });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  const initials = [info.firstName, info.lastName]
    .filter(Boolean).map(n => n[0].toUpperCase()).join('') || 'ME';

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Account</p>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Your Profile</h1>
        <p className="text-[13px] text-slate-400 mt-0.5">Manage your personal details and account security.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* ── Left nav ── */}
        {/* Mobile: horizontal pill row */}
        <div className="lg:hidden flex gap-1 p-1 bg-white border border-slate-100 rounded-xl overflow-x-auto w-full" style={{ scrollbarWidth: 'none' }}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-colors ${
                active === id ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon size={13} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </div>

        {/* Desktop: sticky vertical nav */}
        <div className="hidden lg:flex flex-col gap-1 w-52 shrink-0 sticky top-6">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors text-left ${
                active === id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white'
              }`}
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </button>
          ))}

          {/* Sign out in nav on desktop */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
            >
              <LogOut size={15} strokeWidth={1.8} />
              Sign Out
            </button>
          </div>
        </div>

        {/* ── Right content ── */}
        <div className="flex-1 min-w-0 space-y-5">
          <AnimatePresence mode="wait">

            {/* Photo */}
            {active === 'photo' && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl border border-slate-100 p-6 space-y-5"
              >
                <div>
                  <p className="text-[14px] font-bold text-slate-900">Profile Photo</p>
                  <p className="text-[12px] text-slate-400 mt-0.5">This appears on your account and in staff management.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center shrink-0 overflow-hidden">
                    {avatarUrl
                      ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                      : <span className="text-white text-[22px] font-bold">{initials}</span>
                    }
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <Upload size={12} strokeWidth={1.8} />
                        {avatarUrl ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      {avatarUrl && (
                        <button
                          onClick={() => { setAvatarUrl(null); if (fileRef.current) fileRef.current.value = ''; }}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <X size={13} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </motion.div>
            )}

            {/* Personal info */}
            {active === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl border border-slate-100 p-6 space-y-5"
              >
                <div>
                  <p className="text-[14px] font-bold text-slate-900">Personal Information</p>
                  <p className="text-[12px] text-slate-400 mt-0.5">Update your name, email and contact details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500">First Name</label>
                    <input value={info.firstName} onChange={setInfoField('firstName')} placeholder="Franklin" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500">Last Name</label>
                    <input value={info.lastName} onChange={setInfoField('lastName')} placeholder="Reyes" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-500">Email Address</label>
                    <input type="email" value={info.email} onChange={setInfoField('email')} placeholder="you@example.com" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-500">Phone Number</label>
                    <input type="tel" value={info.phone} onChange={setInfoField('phone')} placeholder="+234 800 000 0000" className={inputCls} />
                  </div>
                </div>

                <SaveRow saved={infoSaved} label="Save Changes" onSave={handleSaveInfo} />
              </motion.div>
            )}

            {/* Password */}
            {active === 'password' && (
              <motion.div
                key="password"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl border border-slate-100 p-6 space-y-5"
              >
                <div>
                  <p className="text-[14px] font-bold text-slate-900">Change Password</p>
                  <p className="text-[12px] text-slate-400 mt-0.5">Use a strong password you don't use elsewhere.</p>
                </div>

                <div className="space-y-3">
                  {([
                    { key: 'current', label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent(v => !v), placeholder: '••••••••' },
                    { key: 'next', label: 'New Password', show: showNew, toggle: () => setShowNew(v => !v), placeholder: 'Min. 8 characters' },
                    { key: 'confirm', label: 'Confirm New Password', show: showConfirm, toggle: () => setShowConfirm(v => !v), placeholder: 'Repeat new password' },
                  ] as const).map(({ key, label, show, toggle, placeholder }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-slate-500">{label}</label>
                      <div className="relative">
                        <input
                          type={show ? 'text' : 'password'}
                          value={pw[key]}
                          onChange={setPwField(key)}
                          placeholder={placeholder}
                          className={`${inputCls} pr-10`}
                        />
                        <button
                          onClick={toggle}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {show ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  {pwError && <p className="text-[11px] text-red-500">• {pwError}</p>}
                </div>

                <SaveRow saved={pwSaved} label="Update Password" onSave={handleSavePw} />
              </motion.div>
            )}

          </AnimatePresence>

          {/* Sign out — mobile only (desktop is in left nav) */}
          <div className="lg:hidden bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold text-slate-900">Sign Out</p>
              <p className="text-[12px] text-slate-400 mt-0.5">Log out of your account on this device.</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shrink-0"
            >
              <LogOut size={14} strokeWidth={1.8} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
