import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_KEY = 'authToken';

const getTokenFromCookie = () => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${TOKEN_KEY.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const originalUrl = error.config?.url || '';

      // For login failures, let the caller handle the error (no redirect)
      if (originalUrl.includes('/login')) {
        return Promise.reject(error);
      }

      // Handle unauthorized for other API calls
      if (typeof document !== 'undefined') {
        document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      }
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
