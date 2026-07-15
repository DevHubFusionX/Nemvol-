export const roles = ['Owner', 'Admin', 'Manager', 'Sales Rep', 'Support'] as const;
export type Role = typeof roles[number];

export const roleDescriptions: Record<Role, string> = {
  Owner: 'Full access to all settings and data',
  Admin: 'Manage staff, products, orders and settings',
  Manager: 'Manage products, orders and customers',
  'Sales Rep': 'Create orders and manage customers',
  Support: 'View orders and respond to customers',
};
