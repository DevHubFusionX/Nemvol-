import { useState } from 'react';
import StaffsHeader from './StaffsHeader';
import StaffsStats from './StaffsStats';
import StaffsEmpty from './StaffsEmpty';
import StaffsList, { type StaffMember } from './StaffsList';
import AddStaffDrawer from './modals/AddStaffDrawer';
import EditStaffDrawer from './modals/EditStaffDrawer';
import { useStaff } from '../../../hooks/useStaff';

export default function Staffs() {
  const { data: staff = [], isLoading } = useStaff();
  const [addOpen, setAddOpen] = useState(false);
  const [editMember, setEditMember] = useState<StaffMember | null>(null);

  const total = staff.length;
  const admins = staff.filter(m => m.role === 'Owner' || m.role === 'Admin').length;
  const locations = [...new Set(staff.map(m => m.branch))].length;

  return (
    <div className="space-y-5">
      <StaffsHeader onAdd={() => setAddOpen(true)} />
      <StaffsStats total={total} admins={admins} locations={locations} />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        </div>
      ) : staff.length === 0 ? (
        <StaffsEmpty onAdd={() => setAddOpen(true)} />
      ) : (
        <StaffsList staff={staff} onEdit={setEditMember} />
      )}

      <AddStaffDrawer open={addOpen} onClose={() => setAddOpen(false)} />
      <EditStaffDrawer
        open={editMember !== null}
        onClose={() => setEditMember(null)}
        staff={editMember}
      />
    </div>
  );
}
