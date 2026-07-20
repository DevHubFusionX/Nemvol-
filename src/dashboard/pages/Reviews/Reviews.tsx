import { useState } from 'react';
import ReviewsHeader from './ReviewsHeader';
import ReviewsStats from './ReviewsStats';
import ReviewsToolbar, { type ReviewFilter } from './ReviewsToolbar';
import ReviewsList from './ReviewsList';

export default function Reviews() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [q, setQ] = useState('');

  return (
    <div className="space-y-5">
      <ReviewsHeader />
      <ReviewsStats />
      <ReviewsToolbar filter={filter} onFilter={setFilter} q={q} onSearch={setQ} />
      <ReviewsList filter={filter} q={q} />
    </div>
  );
}
