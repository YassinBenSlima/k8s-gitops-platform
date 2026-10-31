import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  SearchIcon,
  XIcon,
  ClockIcon,
  CalendarIcon,
  ChevronRightIcon,
  UserIcon,
  ArrowRightIcon,
  InfoIcon,
  BarChart2Icon,
  TrendingDownIcon,
  SparklesIcon,
  ZapIcon,
  FileTextIcon,
  ShieldCheckIcon,
  AwardIcon,
  ActivityIcon,
  AlertTriangleIcon } from
'lucide-react';
import AdjustTreatmentPlanModal from './modals/AdjustTreatmentPlanModal';
interface ProblemDetectionProps {
  selectedPatient?: string | null;
}
const ProblemDetection: React.FC<ProblemDetectionProps> = ({
  selectedPatient
}) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showAdjustPlanModal, setShowAdjustPlanModal] = useState(false);
  // Mock patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    treatment: 'Appareil fixe',
    progress: 40,
    startDate: '01/03/2023'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    treatment: 'Aligneurs',
    progress: 30,
    startDate: '15/04/2023'
  },
  {
    id: 3,
    name: 'Emma Petit',
    treatment: 'Appareil fixe + élastiques',
    progress: 65,
    startDate: '10/01/2023'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    treatment: 'Appareil fixe',
    progress: 20,
    startDate: '05/05/2023'
  }];

  // Mock issues detected
  const issuesDetected = [
  {
    id: 1,
    type: 'progression',
    title: 'Progression insuffisante des incisives',
    description:
    'Le mouvement des incisives centrales supérieures est inférieur de 30% à la progression prévue.',
    severity: 'high',
    detectedDate: '15/06/2023',
    impactedArea: 'Incisives centrales supérieures',
    expectedProgress: '2mm de déplacement',
    actualProgress: '0.8mm de déplacement',
    recommendations: [
    'Vérifier la compliance du patient au port des élastiques',
    'Augmenter la force appliquée sur les incisives',
    'Prévoir un rendez-vous supplémentaire dans 2 semaines']

  },
  {
    id: 2,
    type: 'appointment',
    title: 'Rendez-vous manqués',
    description:
    'Le patient a manqué 2 rendez-vous consécutifs sans les reporter.',
    severity: 'medium',
    detectedDate: '10/06/2023',
    missedDates: ['02/06/2023', '30/05/2023'],
    recommendations: [
    'Contacter le patient par téléphone',
    'Proposer un rendez-vous prioritaire',
    'Évaluer les raisons des absences']

  },
  {
    id: 3,
    type: 'duration',
    title: 'Dépassement de la durée prévue',
    description:
    'Le traitement dépasse de 15% la durée initialement prévue sans atteinte des objectifs.',
    severity: 'low',
    detectedDate: '08/06/2023',
    initialEstimate: '18 mois',
    currentEstimate: '21 mois',
    recommendations: [
    'Réévaluer le plan de traitement',
    "Discuter des options d'accélération avec le patient",
    'Ajuster les attentes concernant la date de fin']

  }];

  // Mock treatment timeline
  const treatmentTimeline = [
  {
    date: '01/03/2023',
    event: 'Début du traitement',
    status: 'completed'
  },
  {
    date: '15/03/2023',
    event: 'Premier contrôle',
    status: 'completed'
  },
  {
    date: '15/04/2023',
    event: 'Contrôle mensuel',
    status: 'completed'
  },
  {
    date: '15/05/2023',
    event: 'Contrôle mensuel',
    status: 'completed'
  },
  {
    date: '30/05/2023',
    event: 'Ajustement prévu',
    status: 'missed'
  },
  {
    date: '02/06/2023',
    event: 'Rendez-vous de rattrapage',
    status: 'missed'
  },
  {
    date: '15/06/2023',
    event: 'Contrôle mensuel',
    status: 'upcoming'
  },
  {
    date: '15/07/2023',
    event: 'Contrôle mensuel',
    status: 'upcoming'
  },
  {
    date: '15/08/2023',
    event: 'Évaluation intermédiaire',
    status: 'upcoming'
  }];

  // Mock progress comparison
  const progressComparison = {
    expected: [
    {
      month: 1,
      value: 10
    },
    {
      month: 2,
      value: 20
    },
    {
      month: 3,
      value: 35
    },
    {
      month: 4,
      value: 50
    }],

    actual: [
    {
      month: 1,
      value: 12
    },
    {
      month: 2,
      value: 18
    },
    {
      month: 3,
      value: 25
    },
    {
      month: 4,
      value: 30
    }]

  };
  const handlePatientSelect = () => {
    setShowAnalysis(true);
  };
  const handleIssueSelect = (issueId) => {
    setSelectedIssue(issueId === selectedIssue ? null : issueId);
  };
  const handleApplyRecommendation = () => {
    alert('Recommandation appliquée au plan de traitement');
  };
  const handleAdjustTreatmentPlan = () => {
    setShowAdjustPlanModal(true);
  };
  const handlePlanAdjustmentComplete = () => {
    setShowAdjustPlanModal(false);
    alert('Plan de traitement ajusté avec succès');
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  const getIssueIcon = (type) => {
    switch (type) {
      case 'progression':
        return <TrendingDownIcon className="h-6 w-6 text-white" />;
      case 'appointment':
        return <CalendarIcon className="h-6 w-6 text-white" />;
      case 'duration':
        return <ClockIcon className="h-6 w-6 text-white" />;
      default:
        return <AlertCircleIcon className="h-6 w-6 text-white" />;
    }
  };
  const getIssueGradient = (type) => {
    switch (type) {
      case 'progression':
        return 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-100 dark:border-red-800';
      case 'appointment':
        return 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-100 dark:border-yellow-800';
      case 'duration':
        return 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-100 dark:border-blue-800';
      default:
        return 'from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-100 dark:border-gray-700';
    }
  };
  const getIssueBgColor = (type) => {
    switch (type) {
      case 'progression':
        return 'bg-red-500 dark:bg-red-600';
      case 'appointment':
        return 'bg-yellow-500 dark:bg-yellow-600';
      case 'duration':
        return 'bg-blue-500 dark:bg-blue-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
            <AlertCircleIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Détection de problèmes</h3>
            <p className="text-red-100 text-sm mt-1">
              Identification automatique des problèmes potentiels et suggestions
              de corrections
            </p>
          </div>
        </div>
      </motion.div>

      {/* Patient Required Message - Show when no patient selected */}
      {!selectedPatient ?
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">

          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Sélectionnez un patient
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Veuillez sélectionner un patient dans le menu déroulant
                ci-dessus pour analyser le traitement
              </p>
            </div>
          </div>
        </motion.div> :

      <>
          {/* Analyze Button - Only show when patient selected and no analysis yet */}
          {!showAnalysis &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="flex justify-center">

              <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handlePatientSelect}
            className="inline-flex items-center px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

                <SparklesIcon className="h-6 w-6 mr-3" />
                Analyser le traitement
              </motion.button>
            </motion.div>
        }

          {showAnalysis &&
        <div className="space-y-6">
              {/* Issues Detected */}
              <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-100 dark:border-amber-800 shadow-lg">

                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center mr-4">
                    <AlertTriangleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      Problèmes détectés
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {issuesDetected.length} problèmes nécessitent votre
                      attention
                    </p>
                  </div>
                </div>
                {issuesDetected.length > 0 ?
            <div className="space-y-4">
                    {issuesDetected.map((issue, index) =>
              <motion.div
                key={issue.id}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.3 + index * 0.1
                }}>

                        <div
                  className={`bg-gradient-to-br ${getIssueGradient(issue.type)} rounded-2xl border-2 overflow-hidden shadow-md ${selectedIssue === issue.id ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400' : ''}`}>

                          <motion.div
                    whileHover={{
                      scale: 1.01
                    }}
                    className="p-5 cursor-pointer"
                    onClick={() => handleIssueSelect(issue.id)}>

                            <div className="flex items-start">
                              <div
                        className={`flex-shrink-0 h-12 w-12 rounded-full ${getIssueBgColor(issue.type)} flex items-center justify-center`}>

                                {getIssueIcon(issue.type)}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-base font-bold text-gray-900 dark:text-white">
                                    {issue.title}
                                  </h5>
                                  <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(issue.severity)}`}>

                                    {issue.severity === 'high' ?
                            'Haute' :
                            issue.severity === 'medium' ?
                            'Moyenne' :
                            'Basse'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                  {issue.description}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  Détecté le {issue.detectedDate}
                                </div>
                              </div>
                              <motion.div
                        animate={{
                          rotate: selectedIssue === issue.id ? 90 : 0
                        }}
                        transition={{
                          duration: 0.2
                        }}
                        className="ml-3">

                                <ChevronRightIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                              </motion.div>
                            </div>
                          </motion.div>
                          <AnimatePresence>
                            {selectedIssue === issue.id &&
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        duration: 0.3
                      }}
                      className="border-t-2 border-gray-200 dark:border-gray-700 overflow-hidden">

                                <div className="p-5 bg-white dark:bg-gray-800 space-y-4">
                                  {/* Details */}
                                  <div>
                                    <h6 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center">
                                      <InfoIcon className="h-4 w-4 mr-2" />
                                      Détails
                                    </h6>
                                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                                      {issue.type === 'progression' &&
                            <div className="space-y-3">
                                          <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Zone concernée
                                              </p>
                                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                {issue.impactedArea}
                                              </p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Progression attendue
                                              </p>
                                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                {issue.expectedProgress}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-700">
                                            <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">
                                              Progression réelle
                                            </p>
                                            <p className="text-sm font-bold text-red-900 dark:text-red-300">
                                              {issue.actualProgress}
                                            </p>
                                          </div>
                                        </div>
                            }
                                      {issue.type === 'appointment' &&
                            <div>
                                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                                            Rendez-vous manqués
                                          </p>
                                          <div className="space-y-2">
                                            {issue.missedDates.map(
                                  (date, idx) =>
                                  <div
                                    key={idx}
                                    className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">

                                                  <XIcon className="h-4 w-4 text-red-500 dark:text-red-400 mr-2" />
                                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {date}
                                                  </span>
                                                </div>

                                )}
                                          </div>
                                        </div>
                            }
                                      {issue.type === 'duration' &&
                            <div className="grid grid-cols-2 gap-3">
                                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                              Durée initialement prévue
                                            </p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                              {issue.initialEstimate}
                                            </p>
                                          </div>
                                          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-700">
                                            <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">
                                              Nouvelle estimation
                                            </p>
                                            <p className="text-sm font-bold text-red-900 dark:text-red-300">
                                              {issue.currentEstimate}
                                            </p>
                                          </div>
                                        </div>
                            }
                                    </div>
                                  </div>
                                  {/* Recommendations */}
                                  <div>
                                    <h6 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center">
                                      <ZapIcon className="h-4 w-4 mr-2" />
                                      Recommandations
                                    </h6>
                                    <div className="space-y-2">
                                      {issue.recommendations.map((rec, idx) =>
                            <motion.div
                              key={idx}
                              initial={{
                                opacity: 0,
                                x: -20
                              }}
                              animate={{
                                opacity: 1,
                                x: 0
                              }}
                              transition={{
                                delay: 0.1 * idx
                              }}
                              className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border-2 border-blue-200 dark:border-blue-700 flex items-start">

                                          <ArrowRightIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                                          <span className="text-sm text-gray-900 dark:text-white font-medium">
                                            {rec}
                                          </span>
                                        </motion.div>
                            )}
                                    </div>
                                  </div>
                                  {/* Action Button */}
                                  <div className="flex justify-end pt-2">
                                    <motion.button
                            whileHover={{
                              scale: 1.02
                            }}
                            whileTap={{
                              scale: 0.98
                            }}
                            onClick={handleApplyRecommendation}
                            className="inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

                                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                                      Appliquer les recommandations
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                    }
                          </AnimatePresence>
                        </div>
                      </motion.div>
              )}
                  </div> :

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="text-center py-12">

                    <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircleIcon className="h-10 w-10 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Aucun problème détecté
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Le traitement progresse normalement selon le plan établi.
                    </p>
                  </motion.div>
            }
              </motion.div>

              {/* Timeline and Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Treatment Timeline */}
                <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 0.4
              }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-purple-100 dark:border-purple-800 shadow-lg">

                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-3">
                      <ActivityIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      Chronologie du traitement
                    </h4>
                  </div>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {treatmentTimeline.map((event, eventIdx) =>
                  <motion.li
                    key={eventIdx}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: 0.5 + eventIdx * 0.05
                    }}>

                          <div className="relative pb-8">
                            {eventIdx !== treatmentTimeline.length - 1 ?
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-300 dark:bg-gray-600"
                        aria-hidden="true" /> :

                      null}
                            <div className="relative flex items-start space-x-3">
                              <div>
                                <motion.span
                            whileHover={{
                              scale: 1.1
                            }}
                            className={`h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800 shadow-md ${event.status === 'completed' ? 'bg-green-500 dark:bg-green-600' : event.status === 'missed' ? 'bg-red-500 dark:bg-red-600' : 'bg-blue-500 dark:bg-blue-600'}`}>

                                  {event.status === 'completed' ?
                            <CheckCircleIcon className="h-5 w-5 text-white" /> :
                            event.status === 'missed' ?
                            <XIcon className="h-5 w-5 text-white" /> :

                            <CalendarIcon className="h-5 w-5 text-white" />
                            }
                                </motion.span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        {event.event}
                                      </p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {event.date}
                                      </p>
                                    </div>
                                    <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${event.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : event.status === 'missed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'}`}>

                                      {event.status === 'completed' ?
                                'Complété' :
                                event.status === 'missed' ?
                                'Manqué' :
                                'À venir'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                  )}
                    </ul>
                  </div>
                </motion.div>

                {/* Progress Comparison */}
                <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 0.4
              }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-100 dark:border-green-800 shadow-lg">

                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mr-3">
                      <BarChart2Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      Progression vs Prévision
                    </h4>
                  </div>
                  <div className="h-64 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
                    <div className="relative h-40">
                      {/* Expected progress line */}
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <linearGradient
                        id="expectedGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%">

                            <stop
                          offset="0%"
                          stopColor="#3B82F6"
                          stopOpacity="0.2" />

                            <stop
                          offset="100%"
                          stopColor="#3B82F6"
                          stopOpacity="0.1" />

                          </linearGradient>
                          <linearGradient
                        id="actualGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%">

                            <stop
                          offset="0%"
                          stopColor="#10B981"
                          stopOpacity="0.3" />

                            <stop
                          offset="100%"
                          stopColor="#10B981"
                          stopOpacity="0.1" />

                          </linearGradient>
                        </defs>
                        {/* Expected line */}
                        <motion.polyline
                      initial={{
                        pathLength: 0
                      }}
                      animate={{
                        pathLength: 1
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5
                      }}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      points={progressComparison.expected.
                      map(
                        (point) =>
                        `${point.month / 4 * 100},${100 - point.value}`
                      ).
                      join(' ')} />

                        {/* Actual line */}
                        <motion.polyline
                      initial={{
                        pathLength: 0
                      }}
                      animate={{
                        pathLength: 1
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.7
                      }}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      points={progressComparison.actual.
                      map(
                        (point) =>
                        `${point.month / 4 * 100},${100 - point.value}`
                      ).
                      join(' ')} />

                      </svg>
                      {/* Expected progress points */}
                      {progressComparison.expected.map((point, index) =>
                  <motion.div
                    key={`expected-${index}`}
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}
                    transition={{
                      delay: 0.5 + index * 0.1
                    }}
                    className="absolute h-3 w-3 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-white dark:border-gray-800 shadow-md"
                    style={{
                      left: `${point.month / 4 * 100}%`,
                      bottom: `${point.value}%`,
                      transform: 'translate(-50%, 50%)'
                    }} />

                  )}
                      {/* Actual progress points */}
                      {progressComparison.actual.map((point, index) =>
                  <motion.div
                    key={`actual-${index}`}
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}
                    transition={{
                      delay: 0.7 + index * 0.1
                    }}
                    className="absolute h-4 w-4 rounded-full bg-green-500 dark:bg-green-600 border-2 border-white dark:border-gray-800 shadow-md"
                    style={{
                      left: `${point.month / 4 * 100}%`,
                      bottom: `${point.value}%`,
                      transform: 'translate(-50%, 50%)'
                    }} />

                  )}
                    </div>
                    {/* Legend */}
                    <div className="flex justify-center mt-6 space-x-6">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-blue-500 dark:bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Progression prévue
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 dark:bg-green-600 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Progression réelle
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-red-100 dark:bg-red-900/30 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Écart
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.6
            }}
            className="flex justify-end space-x-3">

                <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

                  <FileTextIcon className="h-4 w-4 mr-2" />
                  Générer un rapport complet
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={handleAdjustTreatmentPlan}
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

                  <ZapIcon className="h-4 w-4 mr-2" />
                  Ajuster le plan de traitement
                </motion.button>
              </motion.div>
            </div>
        }
        </>
      }

      {/* Info Section - Show when no patient selected */}
      {!selectedPatient &&
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.2
        }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-800 shadow-lg">

          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mr-4 flex-shrink-0">
              <InfoIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                À propos de la détection de problèmes
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-400 mb-4">
                Notre système de détection automatique surveille en permanence
                l'évolution des traitements. Il compare la progression actuelle
                avec le plan initial et identifie les écarts significatifs. Des
                alertes sont générées en cas de retard de progression, de
                rendez-vous manqués ou de dépassement de la durée prévue.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                      <AlertCircleIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      500+
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Problèmes détectés
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      89%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Taux de résolution
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      100%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Conforme RGPD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }

      {/* Adjust Treatment Plan Modal */}
      <AnimatePresence>
        {showAdjustPlanModal && selectedPatient &&
        <AdjustTreatmentPlanModal
          patient={patients[parseInt(selectedPatient) - 1]}
          detectedIssues={issuesDetected}
          onClose={() => setShowAdjustPlanModal(false)}
          onComplete={handlePlanAdjustmentComplete} />

        }
      </AnimatePresence>
    </div>);

};
export default ProblemDetection;