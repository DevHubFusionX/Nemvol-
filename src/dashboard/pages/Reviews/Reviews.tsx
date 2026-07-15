import { useState } from 'react';
import ReviewsHeader from './ReviewsHeader';
import ReviewsStats from './ReviewsStats';
import ReviewsToolbar, { type ReviewFilter } from './ReviewsToolbar';
import ReviewsList from './ReviewsList';

export default function Reviews() {
  const [filter, setFilter] = useState<ReviewFilter>('all');

  return (
    <div className="space-y-5">
      <ReviewsHeader />
      <ReviewsStats />
      <ReviewsToolbar filter={filter} onFilter={setFilter} />
      <ReviewsList />
    </div>
  );
}
