import PagesHeader from './PagesHeader';
import PagesStats from './PagesStats';
import PagesList from './PagesList';

export default function Pages() {
  return (
    <div className="space-y-5">
      <PagesHeader />
      <PagesStats />
      <PagesList />
    </div>
  );
}
