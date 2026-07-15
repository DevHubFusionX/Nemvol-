import { createContext, useContext, useState } from 'react';
import AddProductModal from './AddProductModal';

interface AddProductContextValue {
  openAddProduct: () => void;
}

const AddProductContext = createContext<AddProductContextValue | null>(null);

export function AddProductProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AddProductContext.Provider value={{ openAddProduct: () => setOpen(true) }}>
      {children}
      <AddProductModal open={open} onClose={() => setOpen(false)} />
    </AddProductContext.Provider>
  );
}

export function useAddProduct() {
  const ctx = useContext(AddProductContext);
  if (!ctx) throw new Error('useAddProduct must be used inside AddProductProvider');
  return ctx;
}
