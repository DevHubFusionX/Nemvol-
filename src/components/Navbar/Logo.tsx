import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2 group select-none">
      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
        <Layers className="w-4 h-4 stroke-[2.5]" />
      </div>
      <span className="text-lg font-extrabold text-slate-900 tracking-tight">
        Nemvol
      </span>
    </Link>
  );
}
