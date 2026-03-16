import { Route } from 'react-router-dom';
import { AddDoctor } from './pages/AddDoctor';
import { Agreement } from './pages/Agreement';
import { DashboardLayout } from './layout/DashboardLayout';
import SurveyPage from './pages/SurveyPage';
import ChangeSignature from './pages/ChangeSignature';
import ParticipantsAccountDetails from './pages/ParticipantsAccountDetails';
import OtpValidationPage from './pages/OtpValidationPage';

export const surveyRoutes = (
  <Route path="/user" element={<DashboardLayout />}>
    <Route path="add-doctor" element={<AddDoctor />} />
    <Route path="survey" element={<SurveyPage />} />
    <Route path="agreement" element={<Agreement />} />
    <Route path="change-signature" element={<ChangeSignature />} />
    <Route path="participants-account-details" element={<ParticipantsAccountDetails />} />
    <Route path="otp-validation" element={<OtpValidationPage />} />
  </Route>
);
