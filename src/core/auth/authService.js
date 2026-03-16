import { showErrorToast, showSuccessToast } from '../../shared/utils/notifications';
import apiClient from '../api/client';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

const setTokenCookie = (token, days = 7) => {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    token,
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const getTokenFromCookie = () => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${TOKEN_KEY.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
};

export const authService = {
  login: async (credentials) => {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      // API expects `username` and `password`
      const response = await apiClient.post('/login', {
        username: email,
        password,
      });

      const { data } = response;
      showSuccessToast('Login successful');
      if (!data?.status) {
        showErrorToast(data?.message || 'Login failed');
        throw new Error(data?.message || 'Login failed');
      }

      const token = data.token;
      const user = data.user || { email };

      if (!token) {
        throw new Error('No token returned from server');
      }
      
      setTokenCookie(token);

      return { token, user };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  },

  logout: () => {
    if (typeof document !== 'undefined') {
      document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    }
  },

  getToken: () => {
    return getTokenFromCookie();
  },

  isAuthenticated: () => {
    return !!getTokenFromCookie();
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
};
