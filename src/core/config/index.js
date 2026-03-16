export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'EnSight',
  environment: import.meta.env.MODE || 'development',
};
