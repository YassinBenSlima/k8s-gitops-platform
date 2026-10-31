import React, { useState } from 'react';
import {
  FileTextIcon,
  CreditCardIcon,
  PieChartIcon,
  ClipboardListIcon,
  HeartPulseIcon,
  LayoutDashboardIcon } from
'lucide-react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FinancialDashboard from '../components/administration/FinancialDashboard';
import Facturation from '../components/administration/Facturation';
import Mutuelles from '../components/administration/Mutuelles';
import Paiements from '../components/administration/Paiements';
import Rapports from '../components/administration/Rapports';
import VerificationDroits from '../components/administration/mutuelles/VerificationDroits';
import DocumentUpload from '../components/administration/mutuelles/DocumentUpload';
import CouvertureDetails from '../components/administration/mutuelles/CouvertureDetails';
const Administration = () => {
  const location = useLocation();
  const pathname = location.pathname;
  // Determine active tab based on URL path
  let activeTab = 'dashboard';
  if (pathname.includes('/honoraires')) {
    activeTab = 'honoraires';
  } else if (pathname.includes('/mutuelles')) {
    activeTab = 'mutuelles';
  } else if (pathname.includes('/paiements')) {
    activeTab = 'paiements';
  } else if (pathname.includes('/rapports')) {
    activeTab = 'rapports';
  }
  const tabs = [
  {
    id: 'dashboard',
    name: 'Tableau de bord',
    icon: LayoutDashboardIcon,
    path: '/administration',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'honoraires',
    name: 'Honoraires',
    icon: FileTextIcon,
    path: '/administration/honoraires',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'mutuelles',
    name: 'Mutuelles & Assurances',
    icon: HeartPulseIcon,
    path: '/administration/mutuelles',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'paiements',
    name: 'Paiements en ligne',
    icon: CreditCardIcon,
    path: '/administration/paiements',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'rapports',
    name: 'Devis & Rapports',
    icon: ClipboardListIcon,
    path: '/administration/rapports',
    gradient: 'from-amber-500 to-yellow-600'
  }];

  return (
    <div className="space-y-4">
      {/* Header - Compact */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-lg p-3 text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <LayoutDashboardIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-none">
              Gestion Administrative
            </h1>
            <p className="text-emerald-100 text-xs mt-0.5">
              Gérez les aspects financiers de votre cabinet : honoraires,
              paiements, assurances et rapports
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b-2 border-gray-200 dark:border-gray-600">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab, index) =>
            <Link key={tab.id} to={tab.path}>
                <motion.button
                initial={{
                  opacity: 0,
                  y: -10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.05
                }}
                className={`${activeTab === tab.id ? 'border-b-4 border-blue-500' : 'border-b-4 border-transparent'} whitespace-nowrap py-4 px-6 font-medium text-sm flex items-center transition-all relative group`}>

                  <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 transition-all ${activeTab === tab.id ? `bg-gradient-to-br ${tab.gradient}` : 'bg-gray-200 dark:bg-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'}`}>

                    <tab.icon
                    className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />

                  </div>
                  <span
                  className={`${activeTab === tab.id ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'}`}>

                    {tab.name}
                  </span>
                  {activeTab === tab.id &&
                <motion.div
                  layoutId="activeAdminTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

                }
                </motion.button>
              </Link>
            )}
          </nav>
        </div>
        <div className="p-6 dark:bg-gray-800">
          <Routes>
            <Route path="/" element={<FinancialDashboard />} />
            <Route path="/honoraires/*" element={<Facturation />} />
            <Route path="/mutuelles" element={<Mutuelles />} />
            <Route
              path="/mutuelles/verification"
              element={<VerificationDroits />} />

            <Route
              path="/mutuelles/documents/upload"
              element={<DocumentUpload />} />

            <Route
              path="/mutuelles/couverture/:id"
              element={<CouvertureDetails />} />

            <Route path="/paiements/*" element={<Paiements />} />
            <Route path="/rapports/*" element={<Rapports />} />
            <Route
              path="*"
              element={<Navigate to="/administration" replace />} />

          </Routes>
        </div>
      </motion.div>
    </div>);

};
export default Administration;