import { useModal } from '../ui/ModalContext';

export default function RightActions() {
  const { open } = useModal();
  return (
    <div className="flex items-center space-x-4">
      <a
        href="/login"
        className="text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors duration-150"
      >
        Log In
      </a>
      <button
        onClick={() => open()}
        className="px-4 py-2 rounded-lg bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-[13px] font-bold text-white active:scale-[0.98] transition-all duration-150 cursor-pointer"
      >
        Start a Project
      </button>
    </div>
  );
}
