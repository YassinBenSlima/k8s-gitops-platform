import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  SearchIcon,
  UserIcon,
  EyeIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  InfoIcon,
  SparklesIcon,
  ZapIcon,
  FileTextIcon,
  ShieldCheckIcon,
  AwardIcon,
  TrendingUpIcon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckIcon,
  XIcon } from
'lucide-react';
import Anomaly3DViewModal from './modals/Anomaly3DViewModal';
interface AnomalyDetectionProps {
  selectedPatient?: string | null;
}
const AnomalyDetection: React.FC<AnomalyDetectionProps> = ({
  selectedPatient
}) => {
  const [showResults, setShowResults] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  // Mock patients for demonstration
  const patients = [
  {
    id: '1',
    name: 'Sophie Martin',
    age: 14,
    condition: 'Classe II division 1'
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    age: 12,
    condition: 'Chevauchement sévère'
  },
  {
    id: '3',
    name: 'Emma Petit',
    age: 16,
    condition: 'Classe III'
  },
  {
    id: '4',
    name: 'Lucas Dubois',
    age: 15,
    condition: 'Béance antérieure'
  }];

  // Mock anomalies
  const anomalies = [
  {
    id: 1,
    type: 'Malocclusion',
    subtype: 'Classe II division 1',
    description:
    'Surplomb horizontal important avec les incisives supérieures en avant',
    severity: 'Élevée',
    urgency: 'Moyenne',
    position: {
      x: 0,
      y: 0.1,
      z: 0.5
    },
    teethNumbers: [11, 12, 21, 22],
    recommendations: [
    'Appareil fixe',
    'Élastiques de classe II',
    'Possible phase fonctionnelle']

  },
  {
    id: 2,
    type: 'Chevauchement',
    subtype: 'Arcade inférieure',
    description: 'Chevauchement modéré des incisives inférieures',
    severity: 'Moyenne',
    urgency: 'Faible',
    position: {
      x: 0,
      y: -0.2,
      z: 0.3
    },
    teethNumbers: [31, 32, 41, 42],
    recommendations: ['Alignement avec appareil fixe', 'Stripping possible']
  },
  {
    id: 3,
    type: 'Dent incluse',
    subtype: 'Canine supérieure droite',
    description: 'Canine supérieure droite incluse en position palatine',
    severity: 'Élevée',
    urgency: 'Élevée',
    position: {
      x: 0.3,
      y: 0.2,
      z: 0.1
    },
    teethNumbers: [13],
    recommendations: [
    'Exposition chirurgicale',
    'Traction orthodontique',
    'Suivi radiologique']

  },
  {
    id: 4,
    type: 'Diastème',
    subtype: 'Incisives centrales supérieures',
    description: 'Espace de 2mm entre les incisives centrales supérieures',
    severity: 'Faible',
    urgency: 'Faible',
    position: {
      x: 0,
      y: 0.2,
      z: 0.4
    },
    teethNumbers: [11, 21],
    recommendations: [
    "Fermeture d'espace avec appareil fixe",
    'Évaluation du frein labial']

  }];

  const handleDetectAnomalies = () => {
    setShowResults(true);
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Élevée':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Faible':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Élevée':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Faible':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  const getAnomalyGradient = (severity) => {
    switch (severity) {
      case 'Élevée':
        return 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-100 dark:border-red-800';
      case 'Moyenne':
        return 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-100 dark:border-yellow-800';
      case 'Faible':
        return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100 dark:border-green-800';
      default:
        return 'from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 border-gray-100 dark:border-gray-700';
    }
  };
  const getAnomalyIconBg = (severity) => {
    switch (severity) {
      case 'Élevée':
        return 'bg-red-500';
      case 'Moyenne':
        return 'bg-yellow-500';
      case 'Faible':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  const handleClose3DView = () => {
    setShow3DModal(false);
  };
  const handleAnomalySelect = (anomalyId) => {
    setSelectedAnomaly(anomalyId === selectedAnomaly ? null : anomalyId);
  };
  return (
    <div className="space-y-6">
      {/* Detection Button - Only show when patient is selected and no results yet */}
      {!showResults &&
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
            scale: selectedPatient ? 1.02 : 1
          }}
          whileTap={{
            scale: selectedPatient ? 0.98 : 1
          }}
          onClick={handleDetectAnomalies}
          disabled={!selectedPatient}
          className="inline-flex items-center px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all">

            <SparklesIcon className="h-6 w-6 mr-3" />
            Détecter les anomalies
          </motion.button>
        </motion.div>
      }

      {/* Patient Required Message - Show when no patient selected */}
      {!selectedPatient && !showResults &&
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
                ci-dessus pour commencer la détection d'anomalies
              </p>
            </div>
          </div>
        </motion.div>
      }

      {showResults &&
      <div className="space-y-6">
          {/* Anomalies Detected Header */}
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
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-purple-100 dark:border-gray-600 shadow-lg">

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                  <AlertTriangleIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    Anomalies détectées
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {anomalies.length} anomalies identifiées nécessitant votre
                    attention
                  </p>
                </div>
              </div>
            </div>

            {/* Anomalies List */}
            <div className="space-y-4">
              {anomalies.map((anomaly, index) =>
            <motion.div
              key={anomaly.id}
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
                className={`bg-gradient-to-br ${getAnomalyGradient(anomaly.severity)} rounded-2xl border-2 overflow-hidden shadow-md ${selectedAnomaly === anomaly.id ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}>

                    <motion.div
                  whileHover={{
                    scale: 1.01
                  }}
                  className="p-5 cursor-pointer"
                  onClick={() => handleAnomalySelect(anomaly.id)}>

                      <div className="flex items-start">
                        <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full ${getAnomalyIconBg(anomaly.severity)} flex items-center justify-center`}>

                          <AlertCircleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-base font-bold text-gray-900 dark:text-white">
                              {anomaly.type}
                            </h5>
                            <div className="flex space-x-2">
                              <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(anomaly.severity)}`}>

                                Sévérité: {anomaly.severity}
                              </span>
                              <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(anomaly.urgency)}`}>

                                Urgence: {anomaly.urgency}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {anomaly.subtype}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {anomaly.description}
                          </p>
                        </div>
                        <motion.div
                      animate={{
                        rotate: selectedAnomaly === anomaly.id ? 90 : 0
                      }}
                      transition={{
                        duration: 0.2
                      }}
                      className="ml-3">

                          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {selectedAnomaly === anomaly.id &&
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
                    className="border-t-2 border-gray-200 dark:border-gray-600 overflow-hidden">

                          <div className="p-5 bg-white dark:bg-gray-800 space-y-4">
                            {/* Teeth Numbers */}
                            <div>
                              <h6 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center">
                                <InfoIcon className="h-4 w-4 mr-2" />
                                Dents concernées
                              </h6>
                              <div className="flex flex-wrap gap-2">
                                {anomaly.teethNumbers.map((tooth) =>
                          <span
                            key={tooth}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-700">

                                    #{tooth}
                                  </span>
                          )}
                              </div>
                            </div>

                            {/* Recommendations */}
                            <div>
                              <h6 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center">
                                <ZapIcon className="h-4 w-4 mr-2" />
                                Recommandations
                              </h6>
                              <div className="space-y-2">
                                {anomaly.recommendations.map((rec, idx) =>
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
                            className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border-2 border-green-200 dark:border-green-700 flex items-start">

                                    <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                                      {rec}
                                    </span>
                                  </motion.div>
                          )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                  }
                    </AnimatePresence>
                  </div>
                </motion.div>
            )}
            </div>
          </motion.div>

          {/* Summary Section */}
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
            delay: 0.5
          }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-blue-100 dark:border-gray-600 shadow-lg">

            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                <ActivityIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                  Résumé de l'analyse
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                  L'analyse a identifié 4 anomalies, dont une canine incluse
                  nécessitant une attention prioritaire. La malocclusion de
                  classe II présente est la principale anomalie à traiter. Le
                  chevauchement et le diastème sont des anomalies secondaires
                  qui pourront être traitées dans le cadre du plan global.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                        <AlertCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        2
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sévérité élevée
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                        <AlertTriangleIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        1
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sévérité moyenne
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        1
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sévérité faible
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

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
            onClick={() =>
            alert('Rapport généré et ajouté au dossier patient')
            }
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all">

              <FileTextIcon className="h-4 w-4 mr-2" />
              Générer un rapport
            </motion.button>
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() =>
            alert('Anomalies enregistrées dans le dossier patient')
            }
            className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

              <CheckIcon className="h-4 w-4 mr-2" />
              Enregistrer dans le dossier
            </motion.button>
          </motion.div>
        </div>
      }

      {/* Info Section - only show when no results */}
      {!showResults && selectedPatient &&
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
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-indigo-100 dark:border-gray-600 shadow-lg">

          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center mr-4 flex-shrink-0">
              <InfoIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                À propos de la détection d'anomalies
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-4">
                Notre système de détection automatique utilise l'intelligence
                artificielle pour analyser les images diagnostiques et
                identifier les anomalies orthodontiques. L'IA évalue la
                sévérité, l'urgence et propose des recommandations de traitement
                personnalisées.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                      <AwardIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      95%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Précision
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <TrendingUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      1000+
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Analyses effectuées
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      100%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Sécurisé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }

      {/* 3D View Modal */}
      {show3DModal &&
      <Anomaly3DViewModal
        anomalies={anomalies}
        onClose={handleClose3DView}
        patientName={patients.find((p) => p.id === selectedPatient)?.name} />

      }
    </div>);

};
export default AnomalyDetection;