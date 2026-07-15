import StaffsHeader from './StaffsHeader';
import StaffsStats from './StaffsStats';
import StaffsEmpty from './StaffsEmpty';

export default function Staffs() {
  return (
    <div className="space-y-5">
      <StaffsHeader />
      <StaffsStats />
      <StaffsEmpty />
    </div>
  );
}
