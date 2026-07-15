import { useState } from 'react';
import ShipmentHeader from './ShipmentHeader';
import ShipmentStats from './ShipmentStats';
import MasterControl from './MasterControl';
import DeliveryMode from './DeliveryMode';
import ShippingZonesEmpty from './ShippingZonesEmpty';
import AddShippingZoneDrawer from './modals/AddShippingZoneDrawer';

export default function Shipment() {
  const hasZones = false;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-5">
      <ShipmentHeader onAddZone={() => setDrawerOpen(true)} />
      <ShipmentStats />
      <MasterControl />
      <DeliveryMode />
      {!hasZones && <ShippingZonesEmpty onAddZone={() => setDrawerOpen(true)} />}
      <AddShippingZoneDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
