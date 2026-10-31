import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  AlertCircleIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  ActivityIcon,
  TrendingDownIcon,
  CheckCircleIcon,
  FileTextIcon,
  MessageSquareIcon,
  PhoneIcon,
  MailIcon,
  ZapIcon,
  AlertTriangleIcon,
  InfoIcon,
  ChevronRightIcon,
  PlusIcon } from
'lucide-react';
interface AtRiskCaseDetailsProps {
  caseData: {
    id: number;
    patientName: string;
    issue: string;
    severity: 'high' | 'medium' | 'low';
    timeElapsed: string;
    recommendation: string;
  };
  onClose: () => void;
}
const AtRiskCaseDetails: React.FC<AtRiskCaseDetailsProps> = ({
  caseData,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  // Mock detailed data
  const patientDetails = {
    age: 14,
    treatmentType: 'Appareil fixe',
    startDate: '15/03/2023',
    expectedEndDate: '15/03/2025',
    currentProgress: 40,
    lastVisit: '05/06/2023',
    nextVisit: '20/06/2023',
    phone: '+33 6 12 34 56 78',
    email: 'sophie.martin@email.com'
  };
  const progressHistory = [
  {
    date: '15/03/2023',
    progress: 0,
    notes: 'Début du traitement'
  },
  {
    date: '15/04/2023',
    progress: 15,
    notes: 'Progression normale'
  },
  {
    date: '15/05/2023',
    progress: 28,
    notes: 'Légère amélioration'
  },
  {
    date: '05/06/2023',
    progress: 40,
    notes: 'Retard détecté - compliance insuffisante'
  }];

  const riskFactors = [
  {
    factor: 'Rendez-vous manqués',
    level: 'medium',
    description: '1 rendez-vous manqué au cours des 2 derniers mois'
  },
  {
    factor: 'Compliance élastiques',
    level: 'high',
    description: 'Port estimé à 60% au lieu de 90% recommandé'
  },
  {
    factor: 'Progression lente',
    level: 'high',
    description: 'Vitesse de déplacement 30% inférieure aux prévisions'
  }];

  const recommendedActions = [
  {
    action: 'Appel téléphonique',
    priority: 'high',
    description: 'Discuter de la compliance et motiver le patient',
    completed: false
  },
  {
    action: 'Ajustement du traitement',
    priority: 'high',
    description: 'Augmenter la force des élastiques',
    completed: false
  },
  {
    action: 'Rendez-vous supplémentaire',
    priority: 'medium',
    description: 'Prévoir un contrôle dans 2 semaines',
    completed: false
  },
  {
    action: 'Éducation patient',
    priority: 'medium',
    description: 'Rappeler les instructions de port des élastiques',
    completed: false
  }];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  const tabs = [
  {
    id: 'overview',
    name: "Vue d'ensemble",
    icon: InfoIcon
  },
  {
    id: 'history',
    name: 'Historique',
    icon: ActivityIcon
  },
  {
    id: 'actions',
    name: 'Actions',
    icon: ZapIcon
  }];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                <AlertCircleIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">Détails du cas à risque</h3>
                <p className="text-orange-100 text-sm mt-1">
                  {caseData.patientName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Patient Info Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-orange-100">Sévérité</p>
              <p className="text-lg font-bold capitalize">
                {caseData.severity === 'high' ?
                '🔴 Élevée' :
                caseData.severity === 'medium' ?
                '🟡 Moyenne' :
                '🔵 Faible'}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-orange-100">Temps écoulé</p>
              <p className="text-lg font-bold">{caseData.timeElapsed}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-orange-100">Progression</p>
              <p className="text-lg font-bold">
                {patientDetails.currentProgress}%
              </p>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-gray-50 border-b-2 border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${activeTab === tab.id ? 'border-b-4 border-red-500 text-gray-900 font-bold' : 'border-b-4 border-transparent text-gray-600'} flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center transition-all hover:text-gray-900`}>

                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )}
          </nav>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' &&
            <motion.div
              key="overview"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-6">

                {/* Issue Description */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-100">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <AlertTriangleIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {caseData.issue}
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        Le patient présente des signes de non-compliance au
                        traitement, ce qui ralentit significativement la
                        progression. Une intervention rapide est nécessaire pour
                        éviter un retard important.
                      </p>
                      <div className="flex items-center">
                        <ZapIcon className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-blue-600">
                          Recommandation: {caseData.recommendation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Patient Details */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Informations patient
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">Âge</p>
                      <p className="text-sm font-bold text-gray-900">
                        {patientDetails.age} ans
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Type de traitement
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {patientDetails.treatmentType}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Début traitement
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {patientDetails.startDate}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">Fin prévue</p>
                      <p className="text-sm font-bold text-gray-900">
                        {patientDetails.expectedEndDate}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Dernière visite
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {patientDetails.lastVisit}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Prochaine visite
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {patientDetails.nextVisit}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Risk Factors */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                      <AlertCircleIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Facteurs de risque identifiés
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {riskFactors.map((risk, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="bg-white rounded-lg p-4 border-2 border-amber-200">

                        <div className="flex items-start">
                          <div
                        className={`h-2 w-2 rounded-full ${getPriorityColor(risk.level)} mt-2 mr-3 flex-shrink-0`} />

                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900 mb-1">
                              {risk.factor}
                            </p>
                            <p className="text-xs text-gray-600">
                              {risk.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                  )}
                  </div>
                </div>
                {/* Contact Actions */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                      <MessageSquareIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Actions de contact
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    className="flex items-center justify-center px-4 py-3 bg-white border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-all">

                      <PhoneIcon className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Appeler le patient
                      </span>
                    </motion.button>
                    <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    className="flex items-center justify-center px-4 py-3 bg-white border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-all">

                      <MailIcon className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Envoyer un email
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            }
            {activeTab === 'history' &&
            <motion.div
              key="history"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-6">

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <ActivityIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Historique de progression
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {progressHistory.map((entry, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="relative pl-8 pb-4 border-l-2 border-green-300 last:border-l-0 last:pb-0">

                        <div className="absolute left-0 top-0 -ml-2 h-4 w-4 rounded-full bg-green-500 border-2 border-white shadow-md" />
                        <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-bold text-gray-900">
                              {entry.date}
                            </p>
                            <span className="text-sm font-bold text-green-600">
                              {entry.progress}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{entry.notes}</p>
                        </div>
                      </motion.div>
                  )}
                  </div>
                </div>
              </motion.div>
            }
            {activeTab === 'actions' &&
            <motion.div
              key="actions"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-6">

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                        <ZapIcon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">
                        Actions recommandées
                      </h4>
                    </div>
                    <motion.button
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    className="inline-flex items-center px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">

                      <PlusIcon className="h-4 w-4 mr-1" />
                      Ajouter
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    {recommendedActions.map((action, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: index * 0.1
                    }}
                    className="bg-white rounded-lg p-4 border-2 border-indigo-200">

                        <div className="flex items-start">
                          <input
                        type="checkbox"
                        checked={action.completed}
                        className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-0.5 mr-3" />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-bold text-gray-900">
                                {action.action}
                              </p>
                              <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${action.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>

                                {action.priority === 'high' ?
                            'Priorité haute' :
                            'Priorité moyenne'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                  )}
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

              Fermer
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg transition-all">

              <FileTextIcon className="h-4 w-4 mr-2" />
              Générer un rapport
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default AtRiskCaseDetails;