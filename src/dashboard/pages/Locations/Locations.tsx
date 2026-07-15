import { useState } from 'react';
import LocationsHeader from './LocationsHeader';
import LocationsStats from './LocationsStats';
import LocationsEmpty from './LocationsEmpty';
import LocationsList, { type Location } from './LocationsList';
import AddLocationDrawer from './modals/AddLocationDrawer';
import EditLocationDrawer from './modals/EditLocationDrawer';

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editLocation, setEditLocation] = useState<Location | null>(null);

  const handleAdd = (loc: Location) => setLocations(p => [...p, loc]);

  const handleSave = (updated: Location) =>
    setLocations(p => p.map(l => l.id === updated.id ? updated : l));

  const handleDelete = (id: string) =>
    setLocations(p => p.filter(l => l.id !== id));

  const branches = locations.filter(l => l.type === 'Branch').length;
  const hubs = locations.filter(l => l.type === 'Logistics Hub').length;
  const pickups = locations.filter(l => l.type === 'Pickup Point').length;

  return (
    <div className="space-y-5">
      <LocationsHeader onAdd={() => setAddOpen(true)} />
      <LocationsStats branches={branches} hubs={hubs} pickups={pickups} />

      {locations.length === 0 ? (
        <LocationsEmpty onAdd={() => setAddOpen(true)} />
      ) : (
        <LocationsList locations={locations} onEdit={setEditLocation} />
      )}

      <AddLocationDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditLocationDrawer
        open={editLocation !== null}
        onClose={() => setEditLocation(null)}
        location={editLocation}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
