import PlanBanner from './PlanBanner';
import OverviewHeader from './OverviewHeader';
import StatCards from './StatCards';
import GrowthTable from './GrowthTable';
import SetupProgress from './SetupProgress';

export default function Overview() {
  return (
    <div className="space-y-5 overflow-x-hidden">
      <PlanBanner />
      <OverviewHeader />
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <GrowthTable />
        <SetupProgress />
      </div>
    </div>
  );
}
