import { useState } from 'react';
import ToolsHeader from './ToolsHeader';
import StorefrontContact from './StorefrontContact';
import LeadCapture from './LeadCapture';
import MarketingTracking, { trackers } from './MarketingTracking';
import AccessGateDrawer from './modals/AccessGateDrawer';
import LeadsDrawer from './modals/LeadsDrawer';
import EditTrackerDrawer, { type TrackerConfig } from './modals/EditTrackerDrawer';

export default function Tools() {
  const [gateOpen, setGateOpen] = useState(false);
  const [leadsOpen, setLeadsOpen] = useState(false);
  const [activeTracker, setActiveTracker] = useState<TrackerConfig | null>(null);
  const [trackerValues, setTrackerValues] = useState<Record<string, string>>({});

  const handleSaveTracker = (id: string, value: string) => {
    setTrackerValues(p => ({ ...p, [id]: value }));
  };

  const handleDisconnectTracker = (id: string) => {
    setTrackerValues(p => { const next = { ...p }; delete next[id]; return next; });
  };

  return (
    <div className="space-y-8">
      <ToolsHeader />
      <StorefrontContact />
      <LeadCapture
        onConfigureGate={() => setGateOpen(true)}
        onViewLeads={() => setLeadsOpen(true)}
      />
      <MarketingTracking
        trackerValues={trackerValues}
        onEdit={setActiveTracker}
      />

      <AccessGateDrawer open={gateOpen} onClose={() => setGateOpen(false)} />
      <LeadsDrawer open={leadsOpen} onClose={() => setLeadsOpen(false)} />
      <EditTrackerDrawer
        open={activeTracker !== null}
        onClose={() => setActiveTracker(null)}
        tracker={activeTracker}
        currentValue={activeTracker ? (trackerValues[activeTracker.id] ?? '') : ''}
        onSave={handleSaveTracker}
        onDisconnect={handleDisconnectTracker}
      />
    </div>
  );
}
