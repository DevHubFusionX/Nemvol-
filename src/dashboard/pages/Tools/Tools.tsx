import ToolsHeader from './ToolsHeader';
import StorefrontContact from './StorefrontContact';
import LeadCapture from './LeadCapture';
import MarketingTracking from './MarketingTracking';

export default function Tools() {
  return (
    <div className="space-y-8">
      <ToolsHeader />
      <StorefrontContact />
      <LeadCapture />
      <MarketingTracking />
    </div>
  );
}
