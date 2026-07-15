import { MapPin, Pencil } from 'lucide-react';
import type { Role } from './modals/staffRoles';

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  branch: string;
  status: 'active' | 'suspended';
};

const roleColors: Record<Role, string> = {
  Owner: 'bg-purple-50 text-purple-600',
  Admin: 'bg-blue-50 text-blue-600',
  Manager: 'bg-amber-50 text-amber-600',
  'Sales Rep': 'bg-emerald-50 text-emerald-600',
  Support: 'bg-slate-100 text-slate-500',
};

interface Props {
  staff: StaffMember[];
  onEdit: (member: StaffMember) => void;
}

export default function StaffsList({ staff, onEdit }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {staff.map(member => {
        const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        return (
          <div key={member.id} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                  <span className="text-white text-[12px] font-bold">{initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-slate-900 truncate">{member.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{member.email}</p>
                </div>
              </div>
              {member.status === 'suspended' && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-500 shrink-0">
                  Suspended
                </span>
              )}
            </div>

            {/* Role + branch */}
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${roleColors[member.role]}`}>
                {member.role}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <MapPin size={11} strokeWidth={1.8} />
                {member.branch}
              </div>
            </div>

            {/* Edit */}
            <button
              onClick={() => onEdit(member)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors w-fit mt-auto"
            >
              <Pencil size={12} strokeWidth={1.8} />
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}
