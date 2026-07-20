import { useState } from 'react';
import ShipmentHeader from './ShipmentHeader';
import ShipmentStats from './ShipmentStats';
import MasterControl from './MasterControl';
import DeliveryMode from './DeliveryMode';
import ShippingZonesEmpty from './ShippingZonesEmpty';
import AddShippingZoneDrawer from './modals/AddShippingZoneDrawer';
import { useShippingZones, useDeleteShippingZone, type ShippingZone } from '../../../hooks/useShipping';
import { MapPin, Trash2, Pencil } from 'lucide-react';

const rateLabel = (zone: ShippingZone) => {
  if (zone.rateType === 'free') return zone.minOrderFree ? `Free over ₦${zone.minOrderFree}` : 'Free';
  if (zone.rateType === 'weight') return `₦${zone.weightRate ?? 0}/kg`;
  return `₦${zone.rate}`;
};

export default function Shipment() {
  const { data: zones = [], isLoading } = useShippingZones();
  const deleteZone = useDeleteShippingZone();
  const [addOpen, setAddOpen] = useState(false);
  const [editZone, setEditZone] = useState<ShippingZone | null>(null);

  return (
    <div className="space-y-5">
      <ShipmentHeader onAddZone={() => setAddOpen(true)} />
      <ShipmentStats />
      <MasterControl />
      <DeliveryMode />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        </div>
      ) : zones.length === 0 ? (
        <ShippingZonesEmpty onAddZone={() => setAddOpen(true)} />
      ) : (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3 pl-1 border-l-2 border-slate-200">
            Shipping Zones
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map(zone => {
              const regions: string[] = zone.regions ? JSON.parse(zone.regions) : [];
              return (
                <div key={zone.id} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <MapPin size={15} className="text-slate-400" strokeWidth={1.5} />
                      </div>
                      <p className="text-[14px] font-bold text-slate-900 truncate">{zone.name}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 shrink-0 capitalize">
                      {zone.rateType}
                    </span>
                  </div>

                  <p className="text-[12px] text-slate-400 leading-relaxed">
                    {regions.length > 0 ? regions.slice(0, 4).join(', ') + (regions.length > 4 ? ` +${regions.length - 4} more` : '') : 'No states selected'}
                  </p>

                  <p className="text-[13px] font-bold text-slate-900">{rateLabel(zone)}</p>

                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      onClick={() => setEditZone(zone)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Pencil size={12} strokeWidth={1.8} /> Edit
                    </button>
                    <button
                      onClick={() => deleteZone.mutate(zone.id)}
                      disabled={deleteZone.isPending}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <AddShippingZoneDrawer open={addOpen} onClose={() => setAddOpen(false)} />
      <AddShippingZoneDrawer open={editZone !== null} onClose={() => setEditZone(null)} editZone={editZone} />
    </div>
  );
}
