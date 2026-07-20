import { useState } from 'react'
import LocationsHeader from './LocationsHeader'
import LocationsStats from './LocationsStats'
import LocationsEmpty from './LocationsEmpty'
import LocationsList, { type Location } from './LocationsList'
import AddLocationDrawer from './modals/AddLocationDrawer'
import EditLocationDrawer from './modals/EditLocationDrawer'
import { useLocations } from '../../../hooks/useLocations'

export default function Locations() {
  const { data: locations = [], isLoading } = useLocations()
  const [addOpen, setAddOpen] = useState(false)
  const [editLocation, setEditLocation] = useState<Location | null>(null)

  const branches = locations.filter(l => l.type === 'Branch').length
  const hubs = locations.filter(l => l.type === 'Logistics Hub').length
  const pickups = locations.filter(l => l.type === 'Pickup Point').length

  return (
    <div className="space-y-5">
      <LocationsHeader onAdd={() => setAddOpen(true)} />
      <LocationsStats branches={branches} hubs={hubs} pickups={pickups} />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        </div>
      ) : locations.length === 0 ? (
        <LocationsEmpty onAdd={() => setAddOpen(true)} />
      ) : (
        <LocationsList locations={locations} onEdit={setEditLocation} />
      )}

      <AddLocationDrawer open={addOpen} onClose={() => setAddOpen(false)} />
      <EditLocationDrawer
        open={editLocation !== null}
        onClose={() => setEditLocation(null)}
        location={editLocation}
      />
    </div>
  )
}
