import BillingHeader from './BillingHeader';
import BillingPerks from './BillingPerks';
import BillingPlans from './BillingPlans';
import BillingRecommended from './BillingRecommended';
import BillingTable from './BillingTable';
import BillingFAQ from './BillingFAQ';

export default function Billing() {
  return (
    <div className="space-y-8">
      <BillingHeader />
      <BillingPerks />
      <BillingPlans />
      <BillingRecommended />
      <BillingTable />
      <BillingFAQ />
    </div>
  );
}
