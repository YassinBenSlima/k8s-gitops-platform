import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  BrainIcon,
  ListChecksIcon,
  CalendarIcon,
  UserIcon,
  ChevronRightIcon,
  SparklesIcon,
  ZapIcon,
  TrendingDownIcon,
  AwardIcon,
  ShieldCheckIcon } from
'lucide-react';
import AIInsightCard from './common/AIInsightCard';
import AtRiskCaseDetails from './modals/AtRiskCaseDetails';
import AllAtRiskCases from './modals/AllAtRiskCases';
import RecommendationDetails from './modals/RecommendationDetails';
import AllRecommendations from './modals/AllRecommendations';
import ActivityDetails from './modals/ActivityDetails';
import AIActivityHistory from './modals/AIActivityHistory';
const AIDashboard = () => {
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [showAllCases, setShowAllCases] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showRecommendationDetails, setShowRecommendationDetails] =
  useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  // Mock data for dashboard
  const atRiskCases = [
  {
    id: 1,
    patientName: 'Sophie Martin',
    issue: 'Retard de progression',
    severity: 'high',
    timeElapsed: '2 semaines',
    recommendation: 'Ajustement des élastiques'
  },
  {
    id: 2,
    patientName: 'Thomas Bernard',
    issue: 'Rendez-vous manqués',
    severity: 'medium',
    timeElapsed: '1 mois',
    recommendation: 'Contacter le patient'
  },
  {
    id: 3,
    patientName: 'Lucas Dubois',
    issue: 'Coopération insuffisante',
    severity: 'medium',
    timeElapsed: '3 semaines',
    recommendation: 'Entretien de motivation'
  }];

  const pendingRecommendations = [
  {
    id: 1,
    patientName: 'Emma Petit',
    type: 'Plan de traitement',
    date: "Aujourd'hui",
    confidence: 92
  },
  {
    id: 2,
    patientName: 'Nathan Robert',
    type: "Ajustement d'appareil",
    date: 'Hier',
    confidence: 87
  }];

  const aiInsights = [
  {
    title: 'Efficacité du planning',
    value: '87%',
    trend: '+4%',
    description: 'Optimisation du temps entre rendez-vous',
    icon: ClockIcon,
    color: 'blue'
  },
  {
    title: 'Précision des diagnostics IA',
    value: '93%',
    trend: '+2%',
    description: 'Basé sur la validation des orthodontistes',
    icon: BrainIcon,
    color: 'indigo'
  },
  {
    title: 'Taux de succès des recommandations',
    value: '89%',
    trend: '+5%',
    description: 'Traitements terminés avec succès',
    icon: CheckCircleIcon,
    color: 'green'
  },
  {
    title: 'Cas à risque identifiés',
    value: '7',
    trend: '-2',
    description: 'Sur 94 traitements actifs',
    icon: AlertCircleIcon,
    color: 'amber'
  }];

  const recentAIActivities = [
  {
    id: 1,
    type: 'analysis',
    patientName: 'Sophie Martin',
    action: 'Analyse IA complétée',
    time: 'Il y a 2 heures',
    result: 'Classe II division 1 détectée'
  },
  {
    id: 2,
    type: 'recommendation',
    patientName: 'Thomas Bernard',
    action: 'Recommandation générée',
    time: 'Il y a 4 heures',
    result: 'Aligneurs transparents suggérés'
  },
  {
    id: 3,
    type: 'alert',
    patientName: 'Lucas Dubois',
    action: 'Alerte de progression',
    time: 'Il y a 1 jour',
    result: 'Déplacement inférieur aux prévisions'
  },
  {
    id: 4,
    type: 'optimization',
    patientName: '',
    action: 'Planning optimisé',
    time: 'Il y a 2 jours',
    result: 'Gain de 45 minutes/jour estimé'
  }];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'analysis':
        return <BrainIcon className="h-4 w-4 text-blue-600" />;
      case 'recommendation':
        return <ListChecksIcon className="h-4 w-4 text-green-600" />;
      case 'alert':
        return <AlertCircleIcon className="h-4 w-4 text-amber-600" />;
      case 'optimization':
        return <CalendarIcon className="h-4 w-4 text-indigo-600" />;
      default:
        return <BrainIcon className="h-4 w-4 text-blue-600" />;
    }
  };
  const getActivityColor = (type) => {
    switch (type) {
      case 'analysis':
        return 'bg-blue-50 border-blue-100';
      case 'recommendation':
        return 'bg-green-50 border-green-100';
      case 'alert':
        return 'bg-amber-50 border-amber-100';
      case 'optimization':
        return 'bg-indigo-50 border-indigo-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseDetails(true);
  };
  const handleViewAllCases = () => {
    setShowAllCases(true);
  };
  const handleSelectCaseFromAll = (caseItem) => {
    setShowAllCases(false);
    setSelectedCase(caseItem);
    setShowCaseDetails(true);
  };
  const handleRecommendationClick = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setShowRecommendationDetails(true);
  };
  const handleViewAllRecommendations = () => {
    setShowAllRecommendations(true);
  };
  const handleSelectRecommendationFromAll = (recommendation) => {
    setShowAllRecommendations(false);
    setSelectedRecommendation(recommendation);
    setShowRecommendationDetails(true);
  };
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowActivityDetails(true);
  };
  const handleViewAllActivities = () => {
    setShowAllActivities(true);
  };
  const handleSelectActivityFromAll = (activity) => {
    setShowAllActivities(false);
    setSelectedActivity(activity);
    setShowActivityDetails(true);
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
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
            <BrainIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Tableau de bord IA</h3>
            <p className="text-indigo-100 text-sm mt-1">
              Insights intelligents et recommandations basées sur l'IA pour
              optimiser votre pratique
            </p>
          </div>
        </div>
      </motion.div>
      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {aiInsights.map((insight, index) =>
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1 + index * 0.1
          }}>

            <AIInsightCard
            title={insight.title}
            value={insight.value}
            trend={insight.trend}
            description={insight.description}
            icon={insight.icon}
            color={insight.color} />

          </motion.div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At Risk Cases */}
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
            delay: 0.5
          }}
          className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-red-100 dark:border-gray-600 shadow-lg">

          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center mr-4">
              <AlertCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Cas à risque détectés
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {atRiskCases.length} cas nécessitent votre attention
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {atRiskCases.length > 0 ?
            <>
                {atRiskCases.map((caseItem, index) =>
              <motion.div
                key={caseItem.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.6 + index * 0.1
                }}
                whileHover={{
                  scale: 1.02
                }}
                onClick={() => handleCaseClick(caseItem)}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 border-2 border-red-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-all cursor-pointer">

                    <div className="flex items-start">
                      <div
                    className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${caseItem.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>

                        <AlertCircleIcon
                      className={`h-5 w-5 ${caseItem.severity === 'high' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`} />

                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {caseItem.patientName}
                          </p>
                          <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${caseItem.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>

                            {caseItem.timeElapsed}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {caseItem.issue}
                        </p>
                        <div className="flex items-center text-sm">
                          <ZapIcon className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" />
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {caseItem.recommendation}
                          </span>
                        </div>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-2" />
                    </div>
                  </motion.div>
              )}
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                type="button"
                onClick={handleViewAllCases}
                className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 border-2 border-red-200 dark:border-gray-600 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">

                  Voir tous les cas à risque
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </motion.button>
              </> :

            <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Aucun cas à risque détecté
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tous les traitements progressent normalement
                </p>
              </div>
            }
          </div>
        </motion.div>
        {/* Pending Recommendations */}
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
            delay: 0.5
          }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-purple-100 dark:border-gray-600 shadow-lg">

          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center mr-4">
              <ListChecksIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recommandations en attente
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {pendingRecommendations.length} recommandations à valider
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {pendingRecommendations.length > 0 ?
            <>
                {pendingRecommendations.map((rec, index) =>
              <motion.div
                key={rec.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.6 + index * 0.1
                }}
                whileHover={{
                  scale: 1.02
                }}
                onClick={() => handleRecommendationClick(rec)}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 border-2 border-purple-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-all cursor-pointer">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                          {rec.patientName.
                      split(' ').
                      map((name) => name[0]).
                      join('')}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {rec.patientName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {rec.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-4">
                        <div className="flex items-center">
                          <ShieldCheckIcon className="h-4 w-4 text-green-500 dark:text-green-400 mr-1" />
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            {rec.confidence}%
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {rec.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
              )}
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                type="button"
                onClick={handleViewAllRecommendations}
                className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 border-2 border-purple-200 dark:border-gray-600 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-400 bg-white dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all">

                  Voir toutes les recommandations
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </motion.button>
              </> :

            <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Aucune recommandation en attente
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toutes les recommandations ont été traitées
                </p>
              </div>
            }
          </div>
        </motion.div>
      </div>
      {/* Recent AI Activities */}
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
          delay: 0.7
        }}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-blue-100 dark:border-gray-600 shadow-lg">

        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Activités récentes de l'IA
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Dernières analyses et optimisations effectuées
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {recentAIActivities.map((activity, index) =>
          <motion.div
            key={activity.id}
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.8 + index * 0.1
            }}
            whileHover={{
              scale: 1.01
            }}
            onClick={() => handleActivityClick(activity)}
            className={`rounded-xl p-4 border-2 ${getActivityColor(activity.type)} dark:bg-gray-700 dark:border-gray-600 hover:shadow-md transition-all cursor-pointer`}>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center border-2 border-gray-100 dark:border-gray-500">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {activity.action}
                      {activity.patientName && ` - ${activity.patientName}`}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {activity.result}
                  </p>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            type="button"
            onClick={handleViewAllActivities}
            className="inline-flex items-center px-6 py-3 border-2 border-blue-200 dark:border-gray-600 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

            Voir l'historique complet
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
      {/* Info Section */}
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
          delay: 0.9
        }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-indigo-100 dark:border-gray-600 shadow-lg">

        <div className="flex items-start">
          <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center mr-4 flex-shrink-0">
            <AwardIcon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">
              À propos des outils IA
            </h3>
            <p className="text-sm text-indigo-800 dark:text-indigo-400 mb-4">
              Les outils d'IA de OrthoBizz utilisent l'apprentissage automatique
              pour améliorer vos diagnostics et traitements. Les suggestions
              sont basées sur des cas similaires et l'expérience collective de
              nombreux praticiens.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                    <BrainIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    10,000+
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Cas analysés
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    85%
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Taux de succès
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <ShieldCheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    RGPD
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Conforme 100%
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Modals */}
      <AnimatePresence>
        {showCaseDetails && selectedCase &&
        <AtRiskCaseDetails
          caseData={selectedCase}
          onClose={() => {
            setShowCaseDetails(false);
            setSelectedCase(null);
          }} />

        }
      </AnimatePresence>
      <AnimatePresence>
        {showAllCases &&
        <AllAtRiskCases
          onClose={() => setShowAllCases(false)}
          onSelectCase={handleSelectCaseFromAll} />

        }
      </AnimatePresence>
      <AnimatePresence>
        {showRecommendationDetails && selectedRecommendation &&
        <RecommendationDetails
          recommendation={selectedRecommendation}
          onClose={() => {
            setShowRecommendationDetails(false);
            setSelectedRecommendation(null);
          }} />

        }
      </AnimatePresence>
      <AnimatePresence>
        {showAllRecommendations &&
        <AllRecommendations
          onClose={() => setShowAllRecommendations(false)}
          onSelectRecommendation={handleSelectRecommendationFromAll} />

        }
      </AnimatePresence>
      <AnimatePresence>
        {showActivityDetails && selectedActivity &&
        <ActivityDetails
          activity={selectedActivity}
          onClose={() => {
            setShowActivityDetails(false);
            setSelectedActivity(null);
          }} />

        }
      </AnimatePresence>
      <AnimatePresence>
        {showAllActivities &&
        <AIActivityHistory
          onClose={() => setShowAllActivities(false)}
          onSelectActivity={handleSelectActivityFromAll} />

        }
      </AnimatePresence>
    </div>);

};
export default AIDashboard;