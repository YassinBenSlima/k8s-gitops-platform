import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  BrainIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ListChecksIcon,
  FileTextIcon,
  SparklesIcon,
  TrendingUpIcon,
  BarChart2Icon,
  ZapIcon,
  ShieldCheckIcon,
  InfoIcon,
  AwardIcon,
  ChevronRightIcon,
  DownloadIcon } from
'lucide-react';
interface ActivityDetailsProps {
  activity: {
    id: number;
    type: string;
    patientName: string;
    action: string;
    time: string;
    result: string;
  };
  onClose: () => void;
}
const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  activity,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  // Mock detailed data based on activity type
  const getDetailedActivity = () => {
    switch (activity.type) {
      case 'analysis':
        return {
          title: 'Analyse diagnostique IA',
          category: 'Diagnostic',
          duration: '2 minutes 34 secondes',
          confidence: 94,
          dataProcessed: '847 points de données',
          modelVersion: 'v2.3.1',
          details: {
            inputData: [
            'Radiographie panoramique',
            'Téléradiographie de profil',
            'Photos intra-orales (5)',
            'Scan 3D maxillaire et mandibulaire'],

            analysisSteps: [
            {
              step: 'Prétraitement des images',
              status: 'completed',
              duration: '23s'
            },
            {
              step: 'Détection des points de repère',
              status: 'completed',
              duration: '45s'
            },
            {
              step: 'Analyse céphalométrique',
              status: 'completed',
              duration: '38s'
            },
            {
              step: 'Classification du cas',
              status: 'completed',
              duration: '48s'
            },
            {
              step: 'Génération du rapport',
              status: 'completed',
              duration: '40s'
            }],

            findings: [
            {
              category: 'Classification',
              value: 'Classe II division 1',
              confidence: 96
            },
            {
              category: 'Surplomb horizontal',
              value: '6mm',
              confidence: 94
            },
            {
              category: 'Complexité',
              value: 'Modérée',
              confidence: 92
            },
            {
              category: 'Croissance résiduelle',
              value: 'Favorable',
              confidence: 89
            }]

          },
          recommendations: [
          'Traitement par appareil fixe recommandé',
          'Durée estimée: 18-24 mois',
          'Extraction non nécessaire',
          'Suivi tous les 4-6 semaines']

        };
      case 'recommendation':
        return {
          title: 'Recommandation de traitement',
          category: 'Plan de traitement',
          duration: '1 minute 12 secondes',
          confidence: 91,
          dataProcessed: '523 cas similaires analysés',
          modelVersion: 'v2.3.1',
          details: {
            inputData: [
            'Données du diagnostic IA',
            'Historique de traitement',
            'Profil de coopération du patient',
            'Préférences du praticien'],

            analysisSteps: [
            {
              step: 'Analyse du cas',
              status: 'completed',
              duration: '18s'
            },
            {
              step: 'Recherche de cas similaires',
              status: 'completed',
              duration: '25s'
            },
            {
              step: 'Évaluation des options',
              status: 'completed',
              duration: '20s'
            },
            {
              step: 'Génération de recommandations',
              status: 'completed',
              duration: '9s'
            }],

            findings: [
            {
              category: 'Option recommandée',
              value: 'Aligneurs transparents',
              confidence: 91
            },
            {
              category: 'Durée estimée',
              value: '14-18 mois',
              confidence: 88
            },
            {
              category: 'Taux de succès prévu',
              value: '92%',
              confidence: 89
            },
            {
              category: 'Compliance requise',
              value: 'Élevée (22h/jour)',
              confidence: 95
            }]

          },
          recommendations: [
          '34 aligneurs supérieurs prévus',
          '32 aligneurs inférieurs prévus',
          'Attachements sur 6 dents',
          'IPR de 0.3mm entre incisives']

        };
      case 'alert':
        return {
          title: 'Alerte de progression',
          category: 'Monitoring',
          duration: '45 secondes',
          confidence: 87,
          dataProcessed: '156 mesures comparées',
          modelVersion: 'v2.3.1',
          details: {
            inputData: [
            'Mesures actuelles',
            'Mesures précédentes',
            'Plan de traitement',
            'Timeline prévue'],

            analysisSteps: [
            {
              step: 'Comparaison des mesures',
              status: 'completed',
              duration: '12s'
            },
            {
              step: 'Calcul de la progression',
              status: 'completed',
              duration: '15s'
            },
            {
              step: "Détection d'anomalies",
              status: 'completed',
              duration: '10s'
            },
            {
              step: "Génération d'alerte",
              status: 'completed',
              duration: '8s'
            }],

            findings: [
            {
              category: 'Déplacement mesuré',
              value: '0.8mm',
              confidence: 93
            },
            {
              category: 'Déplacement attendu',
              value: '1.2mm',
              confidence: 91
            },
            {
              category: 'Écart',
              value: '-33%',
              confidence: 95
            },
            {
              category: "Niveau d'alerte",
              value: 'Modéré',
              confidence: 87
            }]

          },
          recommendations: [
          'Vérifier la compliance du patient',
          'Ajuster la force des élastiques',
          "Réduire l'intervalle entre RDV",
          'Surveillance accrue recommandée']

        };
      case 'optimization':
        return {
          title: 'Optimisation du planning',
          category: 'Gestion',
          duration: '3 minutes 18 secondes',
          confidence: 89,
          dataProcessed: '94 rendez-vous analysés',
          modelVersion: 'v2.3.1',
          details: {
            inputData: [
            'Planning actuel',
            'Historique des rendez-vous',
            'Temps moyens par type',
            'Contraintes du cabinet'],

            analysisSteps: [
            {
              step: 'Analyse du planning',
              status: 'completed',
              duration: '45s'
            },
            {
              step: 'Identification des inefficacités',
              status: 'completed',
              duration: '52s'
            },
            {
              step: "Génération d'optimisations",
              status: 'completed',
              duration: '48s'
            },
            {
              step: 'Validation des contraintes',
              status: 'completed',
              duration: '53s'
            }],

            findings: [
            {
              category: 'Temps perdu détecté',
              value: '45 min/jour',
              confidence: 92
            },
            {
              category: "Taux d'occupation",
              value: '78%',
              confidence: 95
            },
            {
              category: 'Gain potentiel',
              value: '45 min/jour',
              confidence: 89
            },
            {
              category: 'Optimisation possible',
              value: 'Élevée',
              confidence: 87
            }]

          },
          recommendations: [
          'Regrouper les consultations courtes',
          'Optimiser les créneaux de 30 minutes',
          'Réduire les temps de transition',
          'Ajuster les durées par type de RDV']

        };
      default:
        return null;
    }
  };
  const detailedActivity = getDetailedActivity();
  const tabs = [
  {
    id: 'overview',
    name: "Vue d'ensemble",
    icon: SparklesIcon
  },
  {
    id: 'process',
    name: 'Processus',
    icon: ZapIcon
  },
  {
    id: 'results',
    name: 'Résultats',
    icon: BarChart2Icon
  }];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return BrainIcon;
      case 'recommendation':
        return ListChecksIcon;
      case 'alert':
        return AlertCircleIcon;
      case 'optimization':
        return CalendarIcon;
      default:
        return BrainIcon;
    }
  };
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'analysis':
        return {
          gradient: 'from-blue-500 to-cyan-500',
          bg: 'from-blue-50 to-cyan-50',
          border: 'border-blue-200'
        };
      case 'recommendation':
        return {
          gradient: 'from-green-500 to-emerald-500',
          bg: 'from-green-50 to-emerald-50',
          border: 'border-green-200'
        };
      case 'alert':
        return {
          gradient: 'from-amber-500 to-orange-500',
          bg: 'from-amber-50 to-orange-50',
          border: 'border-amber-200'
        };
      case 'optimization':
        return {
          gradient: 'from-indigo-500 to-purple-500',
          bg: 'from-indigo-50 to-purple-50',
          border: 'border-indigo-200'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-200'
        };
    }
  };
  const ActivityIcon = getActivityIcon(activity.type);
  const colors = getActivityColor(activity.type);
  const getStatusIcon = (status: string) => {
    return status === 'completed' ?
    <CheckCircleIcon className="h-4 w-4 text-green-500" /> :

    <ClockIcon className="h-4 w-4 text-gray-400" />;

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
        <div className="border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-red-800">{detailedActivity?.title}</h3>
              <p className="text-xs text-red-600 mt-0.5">{activity.patientName && `Patient: ${activity.patientName}`}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-red-600 hover:bg-red-100"
              aria-label="Fermer">
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          {/* Quick Info Cards */}
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded-lg border border-red-100 bg-white p-2">
              <p className="text-[10px] text-red-500">Catégorie</p>
              <p className="text-xs font-semibold text-red-800">{detailedActivity?.category}</p>
            </div>
            <div className="rounded-lg border border-red-100 bg-white p-2">
              <p className="text-[10px] text-red-500">Durée</p>
              <p className="text-xs font-semibold text-red-800">{detailedActivity?.duration}</p>
            </div>
            <div className="rounded-lg border border-red-100 bg-white p-2">
              <p className="text-[10px] text-red-500">Confiance IA</p>
              <p className="text-xs font-semibold text-red-800">{detailedActivity?.confidence}%</p>
            </div>
            <div className="rounded-lg border border-red-100 bg-white p-2">
              <p className="text-[10px] text-red-500">Modèle</p>
              <p className="text-xs font-semibold text-red-800">{detailedActivity?.modelVersion}</p>
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
              className={`${activeTab === tab.id ? 'border-b-4 border-blue-500 text-gray-900 font-bold' : 'border-b-4 border-transparent text-gray-600'} flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center transition-all hover:text-gray-900`}>

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

                {/* Activity Summary */}
                <div
                className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border-2 ${colors.border}`}>

                  <div className="flex items-start">
                    <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center mr-4 flex-shrink-0`}>

                      <ActivityIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        Résumé de l'activité
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        {activity.result}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Input Data */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                      <FileTextIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Données d'entrée
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {detailedActivity?.details.inputData.map((data, index) =>
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
                    className="flex items-center bg-white rounded-lg p-3 border border-purple-200">

                        <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{data}</span>
                      </motion.li>
                  )}
                  </ul>
                </div>
                {/* Data Processed */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <BarChart2Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        Volume de données
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {detailedActivity?.dataProcessed}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            }
            {activeTab === 'process' &&
            <motion.div
              key="process"
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
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                      <ZapIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Étapes du processus IA
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {detailedActivity?.details.analysisSteps.map(
                    (step, index) =>
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

                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-indigo-600">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  {step.step}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Durée: {step.duration}
                                </p>
                              </div>
                            </div>
                            {getStatusIcon(step.status)}
                          </div>
                        </motion.div>

                  )}
                  </div>
                </div>
                {/* Timeline visualization */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <ClockIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Durée totale: {detailedActivity?.duration}
                    </h4>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: '100%'
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5
                      }}
                      className={`h-3 rounded-full bg-gradient-to-r ${colors.gradient}`} />

                    </div>
                  </div>
                </div>
              </motion.div>
            }
            {activeTab === 'results' &&
            <motion.div
              key="results"
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

                {/* Findings */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                      <BarChart2Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Résultats détectés
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {detailedActivity?.details.findings.map(
                    (finding, index) =>
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

                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-gray-900">
                              {finding.category}
                            </p>
                            <div className="flex items-center">
                              <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm font-bold text-green-600">
                                {finding.confidence}%
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
                            {finding.value}
                          </p>
                        </motion.div>

                  )}
                  </div>
                </div>
                {/* Recommendations */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <ListChecksIcon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Recommandations
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {detailedActivity?.recommendations.map((rec, index) =>
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
                    className="flex items-start bg-white rounded-lg p-3 border border-green-200">

                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </motion.li>
                  )}
                  </ul>
                </div>
                {/* Confidence Score */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <AwardIcon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">
                        Score de confiance global
                      </h4>
                    </div>
                    <span className="text-3xl font-bold text-blue-600">
                      {detailedActivity?.confidence}%
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-700">
                      Ce score reflète la confiance de l'IA dans ses résultats,
                      basée sur la qualité des données d'entrée et la
                      correspondance avec des cas similaires.
                    </p>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

              <DownloadIcon className="h-4 w-4 mr-2" />
              Exporter le rapport
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all">

              Fermer
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default ActivityDetails;