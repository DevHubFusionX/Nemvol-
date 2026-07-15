import LocationsHeader from './LocationsHeader';
import LocationsStats from './LocationsStats';
import LocationsEmpty from './LocationsEmpty';

export default function Locations() {
  const hasLocations = false;

  return (
    <div className="space-y-5">
      <LocationsHeader />
      <LocationsStats />
      {!hasLocations && <LocationsEmpty />}
    </div>
  );
}
