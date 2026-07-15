import { useState } from 'react';
import StaffsHeader from './StaffsHeader';
import StaffsStats from './StaffsStats';
import StaffsEmpty from './StaffsEmpty';
import StaffsList, { type StaffMember } from './StaffsList';
import AddStaffDrawer from './modals/AddStaffDrawer';
import EditStaffDrawer from './modals/EditStaffDrawer';

export default function Staffs() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editMember, setEditMember] = useState<StaffMember | null>(null);

  const handleAdd = (member: StaffMember) => setStaff(p => [...p, member]);

  const handleSave = (updated: StaffMember) =>
    setStaff(p => p.map(m => m.id === updated.id ? updated : m));

  const handleRemove = (id: string) =>
    setStaff(p => p.filter(m => m.id !== id));

  const total = staff.length;
  const admins = staff.filter(m => m.role === 'Owner' || m.role === 'Admin').length;
  const locations = [...new Set(staff.map(m => m.branch))].length;

  return (
    <div className="space-y-5">
      <StaffsHeader onAdd={() => setAddOpen(true)} />
      <StaffsStats total={total} admins={admins} locations={locations} />

      {staff.length === 0 ? (
        <StaffsEmpty onAdd={() => setAddOpen(true)} />
      ) : (
        <StaffsList staff={staff} onEdit={setEditMember} />
      )}

      <AddStaffDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditStaffDrawer
        open={editMember !== null}
        onClose={() => setEditMember(null)}
        staff={editMember}
        onSave={handleSave}
        onRemove={handleRemove}
      />
    </div>
  );
}
