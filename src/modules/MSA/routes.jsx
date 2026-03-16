import { Route } from 'react-router-dom';
import { DashboardLayout } from './layout/DashboardLayout';
import MSADashboard from './pages/MSADashboard';
import MSANonSurveyPage from './pages/MSANonSurveyPage';
import AddUserDoctor from './pages/AddUserDoctor';
import ChangePassword from './pages/ChangePassword';
import MSAChangeSignature from './pages/MSAChangeSignature';

export const surveyRoutes = (
  <Route path="MSA/user" element={<DashboardLayout />}>
    <Route path="dashboard" element={<MSADashboard />} />
    <Route path="nonsurveydashboard" element={<MSANonSurveyPage />} />
    <Route path="add-doctor" element={<AddUserDoctor />} />
    <Route path="change-password" element={<ChangePassword />} />
    <Route path="change-signature" element={<MSAChangeSignature />} />
  </Route>
);
