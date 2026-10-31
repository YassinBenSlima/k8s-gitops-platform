import React, { useState } from 'react';
import {
  BrainIcon,
  ListChecksIcon,
  AlertCircleIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  BookOpenIcon,
  UserIcon,
  SearchIcon,
  ChevronDownIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIDashboard from '../components/ai-tools/AIDashboard';
import MLAnalysisEngine from '../components/ai-tools/MLAnalysisEngine';
import TreatmentRecommendations from '../components/ai-tools/TreatmentRecommendations';
import ProblemDetection from '../components/ai-tools/ProblemDetection';
import ScheduleOptimization from '../components/ai-tools/ScheduleOptimization';
import { usePatient } from '../contexts/PatientContext';
const AITools = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { selectedPatient } = usePatient();
  const tabs = [
  {
    id: 'dashboard',
    name: 'Tableau de bord IA',
    icon: LayoutDashboardIcon,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'analysis',
    name: 'Analyse par IA',
    icon: BrainIcon,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'recommendations',
    name: 'Recommandations',
    icon: ListChecksIcon,
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'detection',
    name: 'Détection de problèmes',
    icon: AlertCircleIcon,
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 'scheduling',
    name: 'Optimisation planning',
    icon: CalendarIcon,
    gradient: 'from-amber-500 to-yellow-600'
  }];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AIDashboard selectedPatient={selectedPatient.id} />;
      case 'analysis':
        return <MLAnalysisEngine selectedPatient={selectedPatient.id} />;
      case 'recommendations':
        return <TreatmentRecommendations selectedPatient={selectedPatient.id} />;
      case 'detection':
        return <ProblemDetection selectedPatient={selectedPatient.id} />;
      case 'scheduling':
        return <ScheduleOptimization selectedPatient={selectedPatient.id} />;
      default:
        return <AIDashboard selectedPatient={selectedPatient.id} />;
    }
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Outils d'Aide à la Décision & IA
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Outils intelligents pour optimiser votre pratique et améliorer les
          résultats des traitements
        </p>
      </div>

      {/* Active Patient */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">

        <div className="flex items-center gap-3 rounded-xl border-2 border-blue-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">
              Patient actif
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {selectedPatient.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {selectedPatient.age} ans • Dossier #{selectedPatient.dossier} • Dernière visite: {selectedPatient.lastVisit}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border-2 border-gray-100 dark:border-gray-700">

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab, index) =>
            <motion.button
              key={tab.id}
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
              onClick={() => setActiveTab(tab.id)}
              className={`${activeTab === tab.id ? 'border-b-4 border-blue-500 dark:border-blue-400' : 'border-b-4 border-transparent'} whitespace-nowrap py-4 px-6 font-medium text-sm flex items-center transition-all relative group`}>

                <div
                className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 transition-all ${activeTab === tab.id ? `bg-gradient-to-br ${tab.gradient}` : 'bg-gray-200 dark:bg-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'}`}>

                  <tab.icon
                  className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />

                </div>
                <span
                className={`${activeTab === tab.id ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300'}`}>

                  {tab.name}
                </span>
                {activeTab === tab.id &&
              <motion.div
                layoutId="activeAITab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

              }
              </motion.button>
            )}
          </nav>
        </div>
        <div className="p-6">{renderContent()}</div>
      </motion.div>
    </div>);

};
export default AITools;