import { createContext, useContext, useState } from 'react';

interface ModalContextValue {
  open: (plan?: string) => void;
  close: () => void;
  isOpen: boolean;
  defaultPlan: string;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState('');

  const open = (plan = '') => { setDefaultPlan(plan); setIsOpen(true); };
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ open, close, isOpen, defaultPlan }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}
