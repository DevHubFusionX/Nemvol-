import { MapPin, Phone, Pencil } from 'lucide-react';

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  type: 'Branch' | 'Logistics Hub' | 'Pickup Point';
};

const typeStyles: Record<Location['type'], string> = {
  'Branch': 'bg-blue-50 text-blue-500',
  'Logistics Hub': 'bg-purple-50 text-purple-500',
  'Pickup Point': 'bg-emerald-50 text-emerald-600',
};

interface Props {
  locations: Location[];
  onEdit: (location: Location) => void;
}

export default function LocationsList({ locations, onEdit }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {locations.map(loc => (
        <div key={loc.id} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-3">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <MapPin size={15} className="text-slate-400" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-bold text-slate-900 truncate">{loc.name}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${typeStyles[loc.type]}`}>
              {loc.type}
            </span>
          </div>

          {/* Address */}
          <div className="space-y-0.5">
            <p className="text-[12px] text-slate-600 leading-relaxed">{loc.address}</p>
            <p className="text-[12px] text-slate-400">{loc.city}, {loc.state}</p>
          </div>

          {/* Phone */}
          {loc.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={11} className="text-slate-400" strokeWidth={1.8} />
              <span className="text-[12px] text-slate-400">{loc.phone}</span>
            </div>
          )}

          {/* Edit */}
          <button
            onClick={() => onEdit(loc)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors w-fit mt-auto"
          >
            <Pencil size={12} strokeWidth={1.8} />
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
