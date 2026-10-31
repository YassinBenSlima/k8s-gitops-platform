import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  UsersIcon,
  ClipboardCheckIcon,
  CalendarDaysIcon,
  FileTextIcon,
  LayoutDashboardIcon } from
'lucide-react';
import HRDashboard from '../components/hr/HRDashboard';
import StaffDirectory from '../components/hr/StaffDirectory';
import PerformanceEvaluations from '../components/hr/PerformanceEvaluations';
import VacationManagement from '../components/hr/VacationManagement';
import ContractManagement from '../components/hr/ContractManagement';
import StaffProfile from '../components/hr/StaffProfile';
const HRManagement = () => {
  const location = useLocation();
  const pathname = location.pathname;
  let activeTab = 'dashboard';
  if (pathname.includes('/staff')) activeTab = 'staff';else
  if (pathname.includes('/evaluations')) activeTab = 'evaluations';else
  if (pathname.includes('/vacations')) activeTab = 'vacations';else
  if (pathname.includes('/contracts')) activeTab = 'contracts';
  const tabs = [
  {
    id: 'dashboard',
    name: 'Tableau de bord',
    icon: <LayoutDashboardIcon size={13} />,
    path: '/hr'
  },
  {
    id: 'staff',
    name: 'Personnel',
    icon: <UsersIcon size={13} />,
    path: '/hr/staff'
  },
  {
    id: 'evaluations',
    name: 'Évaluations',
    icon: <ClipboardCheckIcon size={13} />,
    path: '/hr/evaluations'
  },
  {
    id: 'vacations',
    name: 'Congés',
    icon: <CalendarDaysIcon size={13} />,
    path: '/hr/vacations'
  },
  {
    id: 'contracts',
    name: 'Contrats',
    icon: <FileTextIcon size={13} />,
    path: '/hr/contracts'
  }];

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
            <UsersIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Ressources Humaines
            </h1>
            <p className="text-xs text-gray-500">
              Gérez votre équipe : évaluations, congés, contrats et performance
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 mb-3 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) =>
        <Link key={tab.id} to={tab.path}>
            <button
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>

              {tab.icon}
              {tab.name}
            </button>
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HRDashboard />} />
            <Route path="/staff" element={<StaffDirectory />} />
            <Route
              path="/staff/new"
              element={<Navigate to="/nouveau-personnel" replace />} />

            <Route path="/staff/:id" element={<StaffProfile />} />
            <Route path="/evaluations" element={<PerformanceEvaluations />} />
            <Route path="/vacations" element={<VacationManagement />} />
            <Route path="/contracts" element={<ContractManagement />} />
            <Route path="*" element={<Navigate to="/hr" replace />} />
          </Routes>
        </div>
      </div>
    </div>);

};
export default HRManagement;