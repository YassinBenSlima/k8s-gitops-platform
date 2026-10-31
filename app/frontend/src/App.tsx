import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import Appointments from './pages/Appointments';
import Diagnostics from './pages/Diagnostics';
import ExamenClinique from './pages/ExamenClinique';
import { NouvelExamenClinique } from './pages/NouvelExamenClinique';
import Communication from './pages/Communication';
import Administration from './pages/Administration';
import AITools from './pages/AITools';
import UserManagement from './pages/UserManagement';
import StockManagement from './pages/StockManagement';
import PatientEdit from './components/patients/PatientEdit';
import AppointmentDetails from './components/appointments/AppointmentDetails';
import AppointmentCreate from './components/appointments/AppointmentCreate';
import DocumentUpload from './components/documents/DocumentUpload';
import PhotoUpload from './components/photos/PhotoUpload';
import UserCreate from './components/users/UserCreate';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import HRManagement from './pages/HRManagement';
import { ImageEditor } from './pages/Imagerie/ImageEditor';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import './i18n';
import './styles/rtl.css';
import Notifications from './pages/Notifications';
import NouvelHonoraire from './pages/NouvelHonoraire';
import NouvelleFSE from './pages/NouvelleFSE';
import FSEDetails from './pages/FSEDetails';
import ReimbursementDetails from './pages/ReimbursementDetails';
import NouvelleCouverture from './pages/NouvelleCouverture';
import CouvertureDetails from './components/administration/mutuelles/CouvertureDetails';
import NouveauLienPaiement from './pages/NouveauLienPaiement';
import NouveauPlanPaiement from './pages/NouveauPlanPaiement';
import NouveauDevis from './pages/NouveauDevis';
import ComptabiliteTunisienne from './pages/ComptabiliteTunisienne';
import NouveauMouvementTresorerie from './pages/NouveauMouvementTresorerie';
import NouvelActif from './pages/NouvelActif';
import NouvelleDeclaration from './pages/NouvelleDeclaration';
import NouveauContrat from './pages/NouveauContrat';
import NouvelleDemandeConge from './pages/NouvelleDemandeConge';
import NouvelleEvaluation from './pages/NouvelleEvaluation';
import NouveauPersonnel from './pages/NouveauPersonnel';
import Fournisseurs from './pages/Fournisseurs';
import ConsolePraticien from './pages/ConsolePraticien';
import Articles from './pages/Articles';
// New Cardiology Pages
import ECGReports from './pages/ECGReports';
import RiskScoring from './pages/RiskScoring';
import { CarePathways } from './pages/CarePathways';
import CardiologyBilling from './pages/CardiologyBilling';
import HeartImaging from './pages/HeartImaging';
import { PatientProvider } from './contexts/PatientContext';
export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <PatientProvider>
            <div className="dark:bg-gray-900 min-h-screen">
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Image Editor - Full Screen Route */}
                <Route path="/imagerie" element={<ImageEditor />} />

                {/* Console Cardiologue - Standalone Layout */}
                <Route
                  path="/console"
                  element={
                    <div className="flex h-screen bg-slate-100">
                      <Sidebar />
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                          <ConsolePraticien />
                        </main>
                      </div>
                    </div>
                  } />


                <Route
                  path="/dashboard"
                  element={
                    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                      <Sidebar />
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-4 md:p-6">
                          <Dashboard />
                        </main>
                      </div>
                    </div>
                  } />


                <Route
                  path="/*"
                  element={
                    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                      <Sidebar />
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-4 md:p-6">
                          <Routes>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route
                              path="/patients"
                              element={<PatientManagement />} />

                            <Route
                              path="/patients/new"
                              element={<PatientManagement />} />

                            <Route
                              path="/patients/:id"
                              element={<PatientManagement />} />

                            <Route
                              path="/patients/:id/manage"
                              element={<PatientManagement />} />

                            <Route
                              path="/patients/edit/:id"
                              element={<PatientEdit />} />

                            <Route
                              path="/patients/:patientId/documents/upload"
                              element={<DocumentUpload />} />

                            <Route
                              path="/patients/:patientId/photos/upload"
                              element={<PhotoUpload />} />

                            <Route
                              path="/appointments"
                              element={<Appointments />} />

                            <Route
                              path="/appointments/create"
                              element={<AppointmentCreate />} />

                            <Route
                              path="/appointments/:id"
                              element={<AppointmentDetails />} />

                            <Route path="/diagnostics" element={<Diagnostics />} />
                            <Route
                              path="/examen-clinique"
                              element={<ExamenClinique />} />

                            <Route
                              path="/nouvel-examen-clinique"
                              element={<NouvelExamenClinique />} />

                            <Route
                              path="/communication"
                              element={<Communication />} />

                            <Route
                              path="/administration/*"
                              element={<Administration />} />

                            <Route path="/users" element={<UserManagement />} />
                            <Route path="/users/create" element={<UserCreate />} />
                            <Route path="/stock" element={<StockManagement />} />
                            <Route
                              path="/fournisseurs"
                              element={<Fournisseurs />} />

                            <Route path="/articles" element={<Articles />} />
                            <Route path="/hr/*" element={<HRManagement />} />
                            <Route
                              path="/notifications"
                              element={<Notifications />} />


                            {/* Cardiology Routes */}
                            <Route path="/ecg-reports" element={<ECGReports />} />
                            <Route path="/risk-scoring" element={<RiskScoring />} />
                            <Route
                              path="/care-pathways"
                              element={<CarePathways />} />

                            <Route
                              path="/cardiology-billing"
                              element={<CardiologyBilling />} />

                            <Route
                              path="/heart-imaging"
                              element={<HeartImaging />} />


                            {/* Administration Routes */}
                            <Route
                              path="/administration/honoraires/nouveau"
                              element={<NouvelHonoraire />} />

                            <Route
                              path="/administration/devis/nouveau"
                              element={<NouveauDevis />} />

                            <Route
                              path="/administration/mutuelles/nouvelle"
                              element={<NouvelleFSE />} />

                            <Route
                              path="/administration/mutuelles/couverture/nouvelle"
                              element={<NouvelleCouverture />} />

                            <Route
                              path="/administration/mutuelles/couverture/:id"
                              element={<CouvertureDetails />} />

                            <Route
                              path="/administration/mutuelles/fse/:id"
                              element={<FSEDetails />} />

                            <Route
                              path="/administration/mutuelles/reimbursement/:id"
                              element={<ReimbursementDetails />} />

                            <Route
                              path="/administration/paiements/lien/nouveau"
                              element={<NouveauLienPaiement />} />

                            <Route
                              path="/administration/paiements/plan/nouveau"
                              element={<NouveauPlanPaiement />} />

                            <Route
                              path="/administration/comptabilite"
                              element={<ComptabiliteTunisienne />} />

                            <Route
                              path="/administration/comptabilite/tresorerie/nouveau"
                              element={<NouveauMouvementTresorerie />} />

                            <Route
                              path="/administration/comptabilite/patrimoine/nouveau"
                              element={<NouvelActif />} />

                            <Route
                              path="/administration/comptabilite/declaration/nouvelle"
                              element={<NouvelleDeclaration />} />

                            <Route
                              path="/hr/contracts/nouveau"
                              element={<NouveauContrat />} />

                            <Route
                              path="/hr/vacations/nouvelle"
                              element={<NouvelleDemandeConge />} />

                            <Route
                              path="/hr/performance/nouvelle"
                              element={<NouvelleEvaluation />} />

                            <Route
                              path="/nouveau-personnel"
                              element={<NouveauPersonnel />} />

                          </Routes>
                        </main>
                      </div>
                    </div>
                  } />

              </Routes>
            </div>
          </PatientProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}