import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
  BrainIcon,
  ShieldCheckIcon,
  InfoIcon,
  ZapIcon,
  FileTextIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  ClockIcon,
  AwardIcon,
  ListChecksIcon,
  ChevronRightIcon,
  SparklesIcon,
  BarChart2Icon } from
'lucide-react';
interface RecommendationDetailsProps {
  recommendation: {
    id: number;
    patientName: string;
    type: string;
    date: string;
    confidence: number;
  };
  onClose: () => void;
}
const RecommendationDetails: React.FC<RecommendationDetailsProps> = ({
  recommendation,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [userFeedback, setUserFeedback] = useState<
    'approved' | 'rejected' | null>(
    null);
  // Mock detailed data
  const detailedRecommendation = {
    patientInfo: {
      age: 14,
      currentTreatment: 'Appareil fixe - Phase 1',
      startDate: '15/03/2023',
      progressPercentage: 45
    },
    recommendation: {
      title: 'Ajustement du plan de traitement',
      description:
      "Basé sur l'analyse de la progression actuelle, l'IA recommande d'ajuster la force des élastiques et de raccourcir les intervalles entre les rendez-vous.",
      category: 'Optimisation du traitement',
      priority: 'Moyenne',
      estimatedImpact: 'Réduction de 2-3 mois de la durée totale'
    },
    aiAnalysis: {
      confidenceScore: 92,
      dataPoints: 847,
      similarCases: 23,
      successRate: '89%',
      factors: [
      {
        name: 'Vitesse de déplacement dentaire',
        value: 'Supérieure aux prévisions (+15%)',
        impact: 'Positif'
      },
      {
        name: 'Compliance du patient',
        value: 'Excellente (95%)',
        impact: 'Positif'
      },
      {
        name: 'Réponse tissulaire',
        value: 'Optimale',
        impact: 'Positif'
      },
      {
        name: 'Croissance résiduelle',
        value: 'Favorable',
        impact: 'Positif'
      }]

    },
    suggestedActions: [
    {
      action: 'Augmenter la force des élastiques',
      details: 'Passer de 150g à 200g',
      timing: 'Prochain rendez-vous',
      priority: 'high'
    },
    {
      action: "Réduire l'intervalle entre rendez-vous",
      details: 'Passer de 6 semaines à 4 semaines',
      timing: 'À partir du prochain cycle',
      priority: 'high'
    },
    {
      action: 'Ajuster le plan de finition',
      details: 'Anticiper la phase de finition de 2 mois',
      timing: 'Dans 3 mois',
      priority: 'medium'
    }],

    expectedOutcomes: [
    'Réduction de la durée totale de traitement de 2-3 mois',
    "Amélioration de l'efficacité du déplacement dentaire",
    'Optimisation de la phase de finition',
    'Maintien de la compliance du patient'],

    risks: [
    {
      risk: 'Inconfort temporaire',
      severity: 'Faible',
      mitigation: 'Surveillance accrue et analgésiques si nécessaire'
    },
    {
      risk: 'Résorption radiculaire',
      severity: 'Très faible',
      mitigation: 'Contrôles radiographiques réguliers'
    }],

    evidence: {
      studies: 3,
      casesAnalyzed: 23,
      averageImprovement: '2.5 mois',
      confidenceInterval: '85-95%'
    }
  };
  const tabs = [
  {
    id: 'details',
    name: 'Détails',
    icon: InfoIcon
  },
  {
    id: 'analysis',
    name: 'Analyse IA',
    icon: BrainIcon
  },
  {
    id: 'evidence',
    name: 'Preuves',
    icon: BarChart2Icon
  }];

  const handleFeedback = (feedback: 'approved' | 'rejected') => {
    setUserFeedback(feedback);
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
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Positif':
        return 'text-green-600 bg-green-50';
      case 'Neutre':
        return 'text-gray-600 bg-gray-50';
      case 'Négatif':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
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
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                <BrainIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">Recommandation IA</h3>
                <p className="text-purple-100 text-sm mt-1">
                  {recommendation.patientName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Quick Info Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Type</p>
              <p className="text-sm font-bold">{recommendation.type}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Confiance IA</p>
              <p className="text-sm font-bold">{recommendation.confidence}%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Date</p>
              <p className="text-sm font-bold">{recommendation.date}</p>
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
              className={`${activeTab === tab.id ? 'border-b-4 border-purple-500 text-gray-900 font-bold' : 'border-b-4 border-transparent text-gray-600'} flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center transition-all hover:text-gray-900`}>

                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )}
          </nav>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'details' &&
            <motion.div
              key="details"
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

                {/* Recommendation Overview */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-100">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center mr-4 flex-shrink-0">
                      <SparklesIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {detailedRecommendation.recommendation.title}
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        {detailedRecommendation.recommendation.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-purple-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Catégorie
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {detailedRecommendation.recommendation.category}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-purple-200">
                          <p className="text-xs text-gray-600 mb-1">Priorité</p>
                          <p className="text-sm font-bold text-gray-900">
                            {detailedRecommendation.recommendation.priority}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Patient Info */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
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
                        {detailedRecommendation.patientInfo.age} ans
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Traitement actuel
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {detailedRecommendation.patientInfo.currentTreatment}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Date de début
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {detailedRecommendation.patientInfo.startDate}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">Progression</p>
                      <p className="text-sm font-bold text-gray-900">
                        {detailedRecommendation.patientInfo.progressPercentage}%
                      </p>
                    </div>
                  </div>
                </div>
                {/* Suggested Actions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <ListChecksIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Actions suggérées
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {detailedRecommendation.suggestedActions.map(
                    (action, index) =>
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
                      className="bg-white rounded-lg p-4 border-2 border-green-200">

                          <div className="flex items-start">
                            <div
                          className={`h-2 w-2 rounded-full ${getPriorityColor(action.priority)} mt-2 mr-3 flex-shrink-0`} />

                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900 mb-1">
                                {action.action}
                              </p>
                              <p className="text-xs text-gray-600 mb-2">
                                {action.details}
                              </p>
                              <div className="flex items-center text-xs text-gray-500">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                {action.timing}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                  )}
                  </div>
                </div>
                {/* Expected Outcomes */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                      <TrendingUpIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Résultats attendus
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {detailedRecommendation.expectedOutcomes.map(
                    (outcome, index) =>
                    <motion.li
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
                      className="flex items-start bg-white rounded-lg p-3 border border-amber-200">

                          <CheckCircleIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {outcome}
                          </span>
                        </motion.li>

                  )}
                  </ul>
                </div>
                {/* Risks */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center mr-3">
                      <AlertCircleIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Risques et mitigation
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {detailedRecommendation.risks.map((risk, index) =>
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
                    className="bg-white rounded-lg p-4 border border-red-200">

                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-bold text-gray-900">
                            {risk.risk}
                          </p>
                          <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${risk.severity === 'Faible' ? 'bg-green-100 text-green-800' : risk.severity === 'Moyen' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>

                            {risk.severity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Mitigation:</span>{' '}
                          {risk.mitigation}
                        </p>
                      </motion.div>
                  )}
                  </div>
                </div>
              </motion.div>
            }
            {activeTab === 'analysis' &&
            <motion.div
              key="analysis"
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

                {/* AI Confidence */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Analyse de confiance IA
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Score de confiance
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {detailedRecommendation.aiAnalysis.confidenceScore}%
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Points de données
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {detailedRecommendation.aiAnalysis.dataPoints}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Cas similaires
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {detailedRecommendation.aiAnalysis.similarCases}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Taux de succès
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {detailedRecommendation.aiAnalysis.successRate}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Analysis Factors */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <BarChart2Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Facteurs analysés
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {detailedRecommendation.aiAnalysis.factors.map(
                    (factor, index) =>
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
                      className="bg-white rounded-lg p-4 border-2 border-blue-200">

                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900 mb-1">
                                {factor.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {factor.value}
                              </p>
                            </div>
                            <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(factor.impact)}`}>

                              {factor.impact}
                            </span>
                          </div>
                        </motion.div>

                  )}
                  </div>
                </div>
              </motion.div>
            }
            {activeTab === 'evidence' &&
            <motion.div
              key="evidence"
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
                      <AwardIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Preuves scientifiques
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Études référencées
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {detailedRecommendation.evidence.studies}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <p className="text-xs text-gray-600 mb-1">Cas analysés</p>
                      <p className="text-2xl font-bold text-green-600">
                        {detailedRecommendation.evidence.casesAnalyzed}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Amélioration moyenne
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {detailedRecommendation.evidence.averageImprovement}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <p className="text-xs text-gray-600 mb-1">
                        Intervalle de confiance
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {detailedRecommendation.evidence.confidenceInterval}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-700">
                      Cette recommandation est basée sur l'analyse de cas
                      similaires et des études scientifiques validées. Les
                      résultats montrent une amélioration significative dans la
                      majorité des cas traités selon ces recommandations.
                    </p>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
        {/* Footer with Actions */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          {userFeedback ?
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            className="flex items-center justify-center">

              <div
              className={`flex items-center px-6 py-3 rounded-xl ${userFeedback === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                {userFeedback === 'approved' ?
              <>
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span className="font-bold">Recommandation approuvée</span>
                  </> :

              <>
                    <XIcon className="h-5 w-5 mr-2" />
                    <span className="font-bold">Recommandation rejetée</span>
                  </>
              }
              </div>
            </motion.div> :

          <div className="flex justify-between items-center">
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
              <div className="flex space-x-3">
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => handleFeedback('rejected')}
                className="inline-flex items-center px-6 py-3 border-2 border-red-300 rounded-xl text-sm font-bold text-red-700 bg-white hover:bg-red-50 transition-all">

                  <ThumbsDownIcon className="h-4 w-4 mr-2" />
                  Rejeter
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => handleFeedback('approved')}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all">

                  <ThumbsUpIcon className="h-4 w-4 mr-2" />
                  Approuver
                </motion.button>
              </div>
            </div>
          }
        </div>
      </motion.div>
    </div>);

};
export default RecommendationDetails;