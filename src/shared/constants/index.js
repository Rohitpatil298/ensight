export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: '/users',
  DIVISIONS: '/divisions',
  SURVEYS: '/surveys',
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  ADMIN: {
    DIVISIONS: '/admin/divisions',
    CREATE_DIVISION: '/admin/divisions/create',
    MODULE_ASSIGN: '/admin/module-assign',
  },
  SURVEY: {
    DASHBOARD: '/survey',
    ADD_DOCTOR: '/survey/add-doctor',
    AGREEMENT: '/survey/agreement',
  },
};
