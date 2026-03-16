import React, { lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../core/auth/ProtectedRoute";
import { FastSampleLayout } from "../modules/fastSample/layout/FastSampleLayout";
import FastSampleDashboard from "../modules/fastSample/pages/FastSampleDashboard";
import EnrollHCP from "../modules/userEnsight/pages/EnrollHCP";
import { AllLoader } from "../shared/components/SkeletonLoader";
import { DashboardLayout } from "../shared/layout/DashboardLayout";
import Login from "../shared/pages/Login";
import { NotFound } from "../shared/pages/NotFound";
import TestSurvey from "../modules/admin/pages/survey/TestSurvey";
import EditSurveyStatus from "../modules/admin/pages/survey/EditSurveyStatus";

const lazyNamed = (factory, exportName) =>
  lazy(() => factory().then((module) => ({ default: module[exportName] })));

const AdminDashboard = lazy(
  () => import("../modules/admin/pages/dashboard/AdminDashboard"),
);
const AdminLogin = lazy(
  () => import("../modules/admin/pages/dashboard/AdminLogin"),
);
const MSAAdminLogin = lazy(
  () => import("../modules/admin/pages/msa/login"),
);
const MSAAdminDashboardLayout = lazyNamed(
  () => import("../modules/admin/pages/msa/dashboardLayout"),
  "MSADashboardLayout",
);
const MSAAdminDashboard = lazy(
  () => import("../modules/admin/pages/msa/msaDashboard"),
);
const SurveyDashboard = lazyNamed(
  () => import("../modules/admin/pages/survey/SurveyDashboard"),
  "SurveyDashboard",
);
const NonSurveyDashboard = lazyNamed(
  () => import("../modules/admin/pages/non-survey/NonSurveyDashboard"),
  "NonSurveyDashboard",
);
const DivisionList = lazyNamed(
  () => import("../modules/admin/pages/sector/DivisionList"),
  "DivisionList",
);
const CreateDivision = lazyNamed(
  () => import("../modules/admin/pages/sector/CreateDivision"),
  "CreateDivision",
);
const CVDashboard = lazyNamed(
  () => import("../modules/admin/pages/cv/CVDashboard"),
  "CVDashboard",
);
const SalesTeamDashboard = lazyNamed(
  () => import("../modules/admin/pages/sales-team/SalesTeamDashboard"),
  "SalesTeamDashboard",
);
const ModuleAssign = lazyNamed(
  () => import("../modules/admin/pages/module-assign/ModuleAssign"),
  "ModuleAssign",
);
const AddNewSurvey = lazyNamed(
  () => import("../modules/admin/pages/survey/AddNewSurvey"),
  "AddNewSurvey",
);
const SurveyQuestionsPage = lazyNamed(
  () => import("../modules/admin/pages/survey/SurveyQuestionsPage"),
  "SurveyQuestionsPage",
);
const SurveyResponses = lazyNamed(
  () => import("../modules/admin/pages/survey/SurveyResponses"),
  "SurveyResponses",
);
const SurveyAutoAnalyse = lazyNamed(
  () => import("../modules/admin/pages/survey/SurveyAutoAnalyse"),
  "SurveyAutoAnalyse",
);
const SurveyAgreementDownload = lazyNamed(
  () => import("../modules/admin/pages/survey/SurveyAgreementDownload"),
  "SurveyAgreementDownload",
);
const DoctorDashboard = lazy(
  () => import("../modules/admin/pages/doctor/DoctorDashboard"),
);
const AddNewDoctorDashboard = lazy(
  () => import("../modules/admin/pages/doctor/AddNewDoctorDashboard"),
);
const AddNewDoctor = lazy(
  () => import("../modules/admin/pages/doctor/AddNewDoctor"),
);
const AgreementsDashboard = lazy(
  () => import("../modules/admin/pages/agreements/AgreementsDashboard"),
);
const AdminUserDashboard = lazy(
  () => import("../modules/admin/pages/admin-user/AdminUserDashboard"),
);
const AddAdminUser = lazy(
  () => import("../modules/admin/pages/admin-user/AddAdminUser"),
);
const AddAgreement = lazy(
  () => import("../modules/admin/pages/agreements/AddAgreement"),
);
const AgreementPreviewPage = lazy(
  () => import("../modules/admin/pages/agreements/AgreementPreviewPage"),
);
const DivisionDashboard = lazyNamed(
  () => import("../modules/admin/pages/sector/DivisionDashboard"),
  "DivisionDashboard",
);
const AddDivision = lazy(
  () => import("../modules/admin/pages/sector/AddDivision"),
);
const OtpPlatformDashboard = lazy(
  () => import("../modules/admin/pages/otp-platform/OtpPlatformDashboard"),
);
const DoctorRequest = lazy(
  () => import("../modules/fastSample/pages/DoctorRequest"),
);
const Users = lazy(() => import("../modules/fastSample/pages/Users"));
const EditUser = lazy(() => import("../modules/fastSample/pages/EditUser"));
const Products = lazy(() => import("../modules/fastSample/pages/Products"));
const AddProduct = lazy(() => import("../modules/fastSample/pages/AddProduct"));
const FastSampleUserDashboard = lazy(
  () => import("../modules/fastSample/pages/UserDashboard"),
);
const FastSampleUserLayout = lazyNamed(
  () => import("../modules/fastSample/layout/FastSampleUserLayout"),
  "FastSampleUserLayout",
);
const SurveyPage = lazy(() => import("../modules/userEnsight/pages/SurveyPage"));
const NonSurveyPage = lazy(
  () => import("../modules/userEnsight/pages/NonSurveyPage"),
);
const AddUserDoctor = lazy(
  () => import("../modules/userEnsight/pages/AddUserDoctor"),
);
const TakeSurveyPage = lazy(
  () => import("../modules/userEnsight/pages/TakeSurveyPage"),
);
const SelectPracticeTypePage = lazy(
  () => import("../modules/userEnsight/pages/SelectPracticeTypePage"),
);
const CertifiedSelfEmployedPage = lazy(
  () => import("../modules/userEnsight/pages/CertifiedSelfEmployedPage"),
);
const ParticipantsAccountDetails = lazy(
  () => import("../modules/userEnsight/pages/ParticipantsAccountDetails"),
);
const OtpValidationPage = lazy(
  () => import("../modules/userEnsight/pages/OtpValidationPage"),
);
const UploadDocumentsPage = lazy(
  () => import("../modules/userEnsight/pages/UploadDocumentsPage"),
);
const MSADashboardLayout = lazyNamed(
  () => import("../modules/MSA/layout/DashboardLayout"),
  "MSADashboardLayout",
);
const MSADashboard = lazy(() => import("../modules/MSA/pages/MSADashboard"));
const MSANonSurveyPage = lazy(
  () => import("../modules/MSA/pages/MSANonSurveyPage"),
);
const MsaChangePassword = lazy(
  () => import("../modules/MSA/pages/ChangePassword"),
);
const MSAChangeSignature = lazy(
  () => import("../modules/MSA/pages/MSAChangeSignature"),
);
const AddDoctor = lazy(() => import("../modules/MSA/pages/AddUserDoctor"));
const ChangeSignature = lazy(
  () => import("../modules/userEnsight/pages/ChangeSignature"),
);
const ThankYouPage = lazy(
  () => import("../modules/userEnsight/pages/ThankYouPage"),
);
const FMVSurveyPage = lazy(
  () => import("../modules/userEnsight/pages/FMVSurveyPage"),
);
const InviteDoctorForAggrement = lazy(
  () => import("../modules/userEnsight/pages/InviteDoctorForAggrement"),
);

const adminChildRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "survey", element: <SurveyDashboard /> },
  { path: "survey/test", element: <TestSurvey /> },
  { path: "survey/test/:surveyId", element: <TestSurvey /> },
  { path: "survey/edit/:id", element: <EditSurveyStatus /> },
  { path: "survey/:surveyId/questions", element: <SurveyQuestionsPage /> },
  { path: "survey/:surveyId/responses", element: <SurveyResponses /> },
  { path: "survey/:surveyId/auto-analyse", element: <SurveyAutoAnalyse /> },
  { path: "survey/:surveyId/agreement-download", element: <SurveyAgreementDownload /> },
  { path: "nonsurvey", element: <NonSurveyDashboard /> },
  { path: "division/view", element: <AdminUserDashboard /> },
  { path: "doctor/view", element: <DoctorDashboard /> },
  { path: "divisions", element: <DivisionList /> },
  { path: "divisions/create", element: <CreateDivision /> },
  { path: "cv/view", element: <CVDashboard /> },
  { path: "user/view", element: <SalesTeamDashboard /> },
  { path: "module-assign", element: <ModuleAssign /> },
  { path: "survey/new", element: <AddNewSurvey /> },
  { path: "dr/view", element: <AddNewDoctorDashboard /> },
  { path: "dr/new", element: <AddNewDoctor /> },
  { path: "cron/view", element: <AgreementsDashboard /> },
  { path: "division/new", element: <AddAdminUser /> },
  { path: "cron/new", element: <AddAgreement /> },
  { path: "cron/agreement-preview", element: <AgreementPreviewPage /> },
  { path: "sector/view", element: <DivisionDashboard /> },
  { path: "sector/new", element: <AddDivision /> },
  { path: "otp", element: <OtpPlatformDashboard /> },
];

const fastSampleAdminRoutes = [
  { path: "dashboard", element: <FastSampleDashboard />, lazy: false },
  { path: "products", element: <Products /> },
  { path: "products/create", element: <AddProduct /> },
  { path: "products/edit/:id", element: <AddProduct /> },
  { path: "requests", element: <DoctorRequest /> },
  { path: "user", element: <Users /> },
  { path: "user/edit/:id", element: <EditUser /> },
  { path: "user/sendlink/:id", element: <InviteDoctorForAggrement /> },
  { path: "doctors", element: <FastSampleDashboard />, lazy: false },
  { path: "reports", element: <FastSampleDashboard />, lazy: false },
];

const fastSampleUserRoutes = [
  { path: "dashboard", element: <FastSampleUserDashboard /> },
];

const userEnsightRoutes = [
  { path: "/users/survey", element: <SurveyPage /> },
  { path: "/users/sendlink", element: <InviteDoctorForAggrement /> },
  {
    path: "/users/survey/practice-type",
    element: <SelectPracticeTypePage />,
  },
  { path: "/users/survey/thank-you", element: <ThankYouPage /> },
  {
    path: "/users/survey/certified-self-employed",
    element: <CertifiedSelfEmployedPage />,
  },
  { path: "/users/survey/take", element: <TakeSurveyPage /> },
  { path: "/users/nonsurvey", element: <NonSurveyPage /> },
  { path: "/users/rsm_doctor_list", element: <EnrollHCP /> },
  { path: "/users/add_user_doctor", element: <AddUserDoctor /> },
  {
    path: "/users/survey/change-signature",
    element: <ChangeSignature />,
  },
  {
    path: "/users/survey/participants-account-details",
    element: <ParticipantsAccountDetails />,
  },
  { path: "/users/survey/otp-validation", element: <OtpValidationPage /> },
  {
    path: "/users/survey/upload-documents",
    element: <UploadDocumentsPage />,
  },
  { path: "/users/survey/fmv", element: <FMVSurveyPage /> },
];

const msaRoutes = [
  { path: "dashboard", element: <MSADashboard /> },
  { path: "nonsurveydashboard", element: <MSANonSurveyPage /> },
  { path: "add-doctor", element: <AddDoctor /> },
  { path: "change-password", element: <MsaChangePassword /> },
  { path: "change-signature", element: <MSAChangeSignature /> },
];

const msaAdminRoutes = [
  { path: "dashboard", element: <MSAAdminDashboard /> },
];

function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <AllLoader />
    </Box>
  );
}

function LazyPage({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function withLazyPage(element) {
  return <LazyPage>{element}</LazyPage>;
}

function renderRouteDefinitions(routeDefinitions) {
  return routeDefinitions.map(({ path, element, lazy: shouldLazy = true }) => (
    <Route
      key={path}
      path={path}
      element={shouldLazy ? withLazyPage(element) : element}
    />
  ));
}

export function AppRouter() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        <Route
          path="/admin/login"
          element={
            <LazyPage>
              <ProtectedRoute>
                <AdminLogin />
              </ProtectedRoute>
            </LazyPage>
          }
        />

        <Route
          path="/MSA/admin/login"
          element={
            <LazyPage>
              <ProtectedRoute>
                <MSAAdminLogin />
              </ProtectedRoute>
            </LazyPage>
          }
        />

        <Route
          path="/MSA/admin/welcome"
          element={<Navigate to="/MSA/admin/welcome/dashboard" replace />}
        />

        <Route
          path="/MSA/admin/welcome"
          element={
            <ProtectedRoute>
              <MSAAdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          {renderRouteDefinitions(msaAdminRoutes)}
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {renderRouteDefinitions(adminChildRoutes)}
        </Route>

        <Route
          path="/fast-sample/admin"
          element={
            <ProtectedRoute>
              <FastSampleLayout />
            </ProtectedRoute>
          }
        >
          {renderRouteDefinitions(fastSampleAdminRoutes)}
        </Route>

        <Route
          path="/fast-sample/user"
          element={
            <ProtectedRoute>
              <FastSampleUserLayout />
            </ProtectedRoute>
          }
        >
          {renderRouteDefinitions(fastSampleUserRoutes)}
        </Route>

        {renderRouteDefinitions(userEnsightRoutes)}

        <Route
          path="/MSA/user"
          element={
            <ProtectedRoute>
              <MSADashboardLayout />
            </ProtectedRoute>
          }
        >
          {renderRouteDefinitions(msaRoutes)}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(
              this.state.error &&
                (this.state.error.stack ||
                  this.state.error.message ||
                  this.state.error),
            )}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
