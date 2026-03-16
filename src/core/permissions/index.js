export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_USERS: 'manage_users',
  MANAGE_DIVISIONS: 'manage_divisions',
  VIEW_SURVEYS: 'view_surveys',
  CREATE_SURVEYS: 'create_surveys',
};

export function hasPermission(user, permission) {
  return user?.permissions?.includes(permission) || false;
}

export function hasRole(user, role) {
  return user?.role === role;
}
