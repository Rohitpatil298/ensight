import { Route } from 'react-router-dom';
import { DashboardLayout } from '../../shared/layout/DashboardLayout';
import { DivisionList } from './pages/sector/DivisionList';
import { CreateDivision } from './pages/sector/CreateDivision';
import { ModuleAssign } from './pages/module-assign/ModuleAssign';
import AdminLogin from './pages/dashboard/AdminLogin';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import { CVDashboard } from './pages/cv/CVDashboard';
import { SalesTeamDashboard } from './pages/sales-team/SalesTeamDashboard';
import { NonSurveyDashboard } from './pages/non-survey/NonSurveyDashboard';
import { SurveyDashboard } from './pages/survey/SurveyDashboard';
import { AddNewSurvey } from './pages/survey/AddNewSurvey';
import { SurveyAgreementDownload } from './pages/survey/SurveyAgreementDownload';
import { SurveyAutoAnalyse } from './pages/survey/SurveyAutoAnalyse';
import { SurveyQuestionsPage } from './pages/survey/SurveyQuestionsPage';
import { SurveyResponses } from './pages/survey/SurveyResponses';
import TestSurvey from './pages/survey/TestSurvey';
import EditSurveyStatus from './pages/survey/EditSurveyStatus';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AddNewDoctorDashboard from './pages/doctor/AddNewDoctorDashboard';
import AddNewDoctor from './pages/doctor/AddNewDoctor';
import AgreementsDashboard from './pages/agreements/AgreementsDashboard';
import AdminUserDashboard from './pages/admin-user/AdminUserDashboard';
import AddAdminUser from './pages/admin-user/AddAdminUser';
import AddAgreement from './pages/agreements/AddAgreement';
import DivisionDashboard from './pages/sector/DivisionDashboard';
import AddDivision from './pages/sector/AddDivision';
import OtpPlatformDashboard from './pages/otp-platform/OtpPlatformDashboard';
import FastSampleDashboard from './pages/fast-sample/FastSampleDashboard';

export const adminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={
        <DashboardLayout>
            <AdminDashboard />
        </DashboardLayout>
    } />
    
    <Route path="/admin" element={<DashboardLayout />}>
      <Route index element={<NonSurveyDashboard />} />
      <Route path='survey' element={<SurveyDashboard />} />
      <Route path='survey/test' element={<TestSurvey />} />
      <Route path='survey/test/:surveyId' element={<TestSurvey />} />
      <Route path='survey/edit/:id' element={<EditSurveyStatus />} />
      <Route path='survey/:surveyId/questions' element={<SurveyQuestionsPage />} />
      <Route path='survey/:surveyId/responses' element={<SurveyResponses />} />
      <Route path='survey/:surveyId/auto-analyse' element={<SurveyAutoAnalyse />} />
      <Route path='survey/:surveyId/agreement-download' element={<SurveyAgreementDownload />} />
      <Route path='otp' element={<OtpPlatformDashboard />} />
      <Route path="survey/new" element={<AddNewSurvey />} />
      <Route path="division/view" element={<AdminUserDashboard />} />
      <Route path="division/new" element={<AddAdminUser />} />
      <Route path="divisions" element={<DivisionList />} />
      <Route path="doctor/view" element={<DoctorDashboard />} />
      <Route path="dr/view" element={<AddNewDoctorDashboard />} />
      <Route path="dr/new" element={<AddNewDoctor />} />
      <Route path="divisions/create" element={<CreateDivision />} />
      <Route path="sector/view" element={<DivisionDashboard />} />
      <Route path="sector/new" element={<AddDivision />} />
      <Route path="cron/view" element={<AgreementsDashboard />} />
      <Route path="fast-sample" element={<FastSampleDashboard />} />
      <Route path="cron/new" element={<AddAgreement />} />
      <Route path="module-assign" element={<ModuleAssign />} />
      <Route path="cv/view" element={<CVDashboard />} />
      <Route path="user/view" element={<SalesTeamDashboard />} /></Route>
  </>
);
