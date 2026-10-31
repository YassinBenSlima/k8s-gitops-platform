import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-lg">
            <p className="text-sm font-bold text-red-700 mb-2">Erreur de rendu</p>
            <pre className="text-xs text-red-600 text-left bg-red-100 rounded p-3 overflow-auto max-h-40">
              {this.state.error.message}
            </pre>
            <button
              onClick={() => { this.setState({ error: null }); window.location.href = '/patients'; }}
              className="mt-4 px-4 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy load pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PatientsList = lazy(() => import('./pages/PatientsList'));
const PatientDetail = lazy(() => import('./pages/PatientDetail'));
const PatientManagement = lazy(() => import('./pages/PatientManagement'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Consultations = lazy(() => import('./pages/Consultations'));
const ConsultationDetail = lazy(() => import('./pages/ConsultationDetail'));
const CardiologyReports = lazy(() => import('./pages/CardiologyReports'));
const CardiologyReportDetail = lazy(() => import('./pages/CardiologyReportDetail'));

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { PatientProvider } from './contexts/PatientContext';
import Register from './pages/Register';

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.some(r => r.toLowerCase() === user.role?.toLowerCase())) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <PatientProvider>
            <BrowserRouter>
              <ErrorBoundary>
              <Suspense fallback={<Loading />}>

                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/patients" element={<ProtectedRoute roles={['Cardiologue', 'Secretaire', 'Cardiologist', 'Secretary']}><PatientsList /></ProtectedRoute>} />
                  <Route path="/patients/:id" element={<ProtectedRoute><PatientDetail /></ProtectedRoute>} />
                  <Route path="/patients/:id/manage" element={<ProtectedRoute roles={['Cardiologue', 'Secretaire', 'Cardiologist', 'Secretary']}><PatientManagement /></ProtectedRoute>} />
                  <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                  <Route path="/consultations" element={<ProtectedRoute roles={['Cardiologue', 'Secretaire', 'Cardiologist', 'Secretary']}><Consultations /></ProtectedRoute>} />
                  <Route path="/consultations/:id" element={<ProtectedRoute><ConsultationDetail /></ProtectedRoute>} />
                  <Route path="/cardiology/reports" element={<ProtectedRoute roles={['Cardiologue', 'Cardiologist']}><CardiologyReports /></ProtectedRoute>} />
                  <Route path="/cardiology/reports/:id" element={<ProtectedRoute roles={['Cardiologue', 'Cardiologist']}><CardiologyReportDetail /></ProtectedRoute>} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
              </ErrorBoundary>
            </BrowserRouter>
          </PatientProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRouter;