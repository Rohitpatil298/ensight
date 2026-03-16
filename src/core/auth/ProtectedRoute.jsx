import { Navigate } from 'react-router-dom';
import { authService } from './authService';

export function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
