import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  SearchIcon,
  SparklesIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  AwardIcon,
  ActivityIcon,
  ZapIcon,
  BarChart2Icon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  FileTextIcon,
  CheckIcon } from
'lucide-react';
interface TreatmentDurationProps {
  selectedPatient?: string | null;
}
const TreatmentDuration: React.FC<TreatmentDurationProps> = ({
  selectedPatient
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [patientCompliance, setPatientCompliance] = useState(3);
  const [manualAdjustment, setManualAdjustment] = useState(0);
  // Mock patients
  const patients = [
  {
    id: '1',
    name: 'Sophie Martin',
    age: 14
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    age: 12
  },
  {
    id: '3',
    name: 'Emma Petit',
    age: 16
  },
  {
    id: '4',
    name: 'Lucas Dubois',
    age: 15
  }];

  // Mock treatments
  const treatments = [
  {
    id: 1,
    name: 'Appareil fixe métallique'
  },
  {
    id: 2,
    name: 'Appareil fixe céramique'
  },
  {
    id: 3,
    name: 'Aligneurs transparents'
  },
  {
    id: 4,
    name: 'Appareil fonctionnel'
  }];

  // Mock factors affecting duration
  const factors = [
  {
    name: 'Âge du patient',
    impact: 'Modéré',
    description:
    'Les patients plus jeunes répondent généralement mieux au traitement',
    impactValue: 0,
    color: 'yellow'
  },
  {
    name: 'Type de malocclusion',
    impact: 'Élevé',
    description:
    'Les cas de classe II et III nécessitent souvent plus de temps',
    impactValue: 2,
    color: 'orange'
  },
  {
    name: 'Coopération du patient',
    impact: 'Élevé',
    description:
    "Le port d'élastiques et le suivi des instructions affectent significativement la durée",
    impactValue: (3 - patientCompliance) * 2,
    color: 'orange'
  },
  {
    name: 'Complexité du cas',
    impact: 'Très élevé',
    description:
    'Les cas avec extractions ou dents incluses nécessitent plus de temps',
    impactValue: 3,
    color: 'red'
  }];

  const handlePredictDuration = () => {
    setShowPrediction(true);
  };
  // Calculate estimated duration based on mock data
  const getBaseDuration = () => {
    const treatmentId = parseInt(selectedTreatment || '0');
    const baseMonths = treatmentId === 3 ? 18 : 24;
    const complexityFactor = treatmentId === 4 ? 6 : 0;
    return baseMonths + complexityFactor;
  };
  const getAdjustedDuration = () => {
    let duration = getBaseDuration();
    const complianceFactor = (3 - patientCompliance) * 2;
    duration += complianceFactor;
    duration += manualAdjustment;
    return Math.max(duration, 6);
  };
  const getDurationRange = () => {
    const adjusted = getAdjustedDuration();
    return {
      min: adjusted - 2,
      max: adjusted + 2,
      average: adjusted
    };
  };
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Très élevé':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Élevé':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Modéré':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Faible':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  const getImpactIcon = (impactValue) => {
    if (impactValue > 0)
    return <ArrowUpIcon className="h-4 w-4 text-red-500 dark:text-red-400" />;
    if (impactValue < 0)
    return (
      <ArrowDownIcon className="h-4 w-4 text-green-500 dark:text-green-400" />);

    return <MinusIcon className="h-4 w-4 text-gray-500" />;
  };
  const getComplianceLabel = (value) => {
    switch (value) {
      case 1:
        return 'Très faible';
      case 2:
        return 'Faible';
      case 3:
        return 'Moyenne';
      case 4:
        return 'Bonne';
      case 5:
        return 'Excellente';
      default:
        return 'Moyenne';
    }
  };
  const getComplianceColor = (value) => {
    if (value <= 2) return 'from-red-500 to-orange-500';
    if (value === 3) return 'from-yellow-500 to-amber-500';
    return 'from-green-500 to-emerald-500';
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

            <ClockIcon className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">
              Prédiction de la durée de traitement
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              L'IA estime la durée de traitement en fonction des
              caractéristiques du patient
            </p>
          </div>
        </div>
      </motion.div>

      {/* Patient Required Message - Show when no patient selected */}
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
                ci-dessus pour commencer la prédiction de durée
              </p>
            </div>
          </div>
        </motion.div>
      }

      {/* Parameters Section - Only show when patient is selected */}
      {selectedPatient &&
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
          delay: 0.1
        }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-blue-100 dark:border-gray-600 shadow-lg">

          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <SearchIcon className="h-5 w-5 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              Paramètres de prédiction
            </h4>
          </div>

          <div className="space-y-6">
            {/* Type de traitement and Niveau de coopération on same row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label
                htmlFor="treatment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                  Type de traitement
                </label>
                <select
                id="treatment"
                className="block w-full pl-3 pr-10 py-3 text-base border-2 border-blue-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transition-all"
                value={selectedTreatment || ''}
                onChange={(e) => setSelectedTreatment(e.target.value)}>

                  <option value="">Sélectionner un traitement</option>
                  {treatments.map((treatment) =>
                <option key={treatment.id} value={treatment.id}>
                      {treatment.name}
                    </option>
                )}
                </select>
              </div>

              <div>
                <label
                htmlFor="compliance"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                  Niveau de coopération attendu du patient
                </label>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border-2 border-blue-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Très faible
                    </span>
                    <span
                    className={`text-sm font-bold bg-gradient-to-r ${getComplianceColor(patientCompliance)} bg-clip-text text-transparent`}>

                      {getComplianceLabel(patientCompliance)}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Excellente
                    </span>
                  </div>
                  <input
                  type="range"
                  id="compliance"
                  min="1"
                  max="5"
                  step="1"
                  value={patientCompliance}
                  onChange={(e) =>
                  setPatientCompliance(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`
                  }} />

                  <div className="flex justify-between mt-2">
                    {[1, 2, 3, 4, 5].map((value) =>
                  <div
                    key={value}
                    className={`h-2 w-2 rounded-full ${patientCompliance >= value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />

                  )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={handlePredictDuration}
              disabled={!selectedTreatment}
              className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all">

                <SparklesIcon className="h-5 w-5 mr-2" />
                Calculer la durée
              </motion.button>
            </div>
          </div>
        </motion.div>
      }

      {showPrediction && selectedPatient &&
      <div className="space-y-6">
          {/* Prediction Result */}
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

            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Prédiction de durée pour{' '}
                  {patients[parseInt(selectedPatient) - 1]?.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Estimation basée sur l'analyse IA
                </p>
              </div>
            </div>
            {/* Duration Display */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 mb-6 border-2 border-purple-200 dark:border-gray-600 shadow-md">
              <div className="text-center">
                <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                transition={{
                  delay: 0.3,
                  type: 'spring'
                }}
                className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 shadow-xl">

                  <div>
                    <div className="text-4xl font-bold">
                      {getDurationRange().average}
                    </div>
                    <div className="text-sm font-medium">mois</div>
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {getDurationRange().min}-{getDurationRange().max} mois
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Durée estimée du traitement
                </p>
              </div>
            </div>
            {/* Timeline Visualization */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-purple-200 dark:border-gray-600 mb-6">
              <h5 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <ActivityIcon className="h-5 w-5 text-purple-500 mr-2" />
                Chronologie du traitement
              </h5>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-full" />
                <div className="space-y-4 ml-6">
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
                  className="relative">

                    <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-purple-500 border-4 border-white dark:border-gray-700 shadow-md" />
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Début du traitement
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Mois 0
                        </span>
                      </div>
                    </div>
                  </motion.div>
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
                  className="relative">

                    <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-pink-500 border-4 border-white dark:border-gray-700 shadow-md" />
                    <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-3 border border-pink-200 dark:border-pink-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Phase intermédiaire
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Mois {Math.floor(getDurationRange().average / 2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
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
                    delay: 0.6
                  }}
                  className="relative">

                    <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-green-500 border-4 border-white dark:border-gray-700 shadow-md" />
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 border border-green-200 dark:border-green-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Fin du traitement
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Mois {getDurationRange().average}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Factors Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Influencing Factors */}
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
              delay: 0.3
            }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-orange-100 dark:border-gray-600 shadow-lg">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                  <BarChart2Icon className="h-5 w-5 text-white" />
                </div>
                <h5 className="font-bold text-gray-900 dark:text-white">
                  Facteurs influençant la durée
                </h5>
              </div>
              <div className="space-y-3">
                {factors.map((factor, index) =>
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.4 + index * 0.1
                }}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 border-2 border-orange-200 dark:border-gray-600 shadow-sm">

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start flex-1">
                        <div className="mr-3 mt-0.5">
                          {getImpactIcon(factor.impactValue)}
                        </div>
                        <div className="flex-1">
                          <h6 className="text-sm font-bold text-gray-900 dark:text-white">
                            {factor.name}
                          </h6>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {factor.description}
                          </p>
                        </div>
                      </div>
                      <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ml-2 ${getImpactColor(factor.impact)}`}>

                        {factor.impact}
                      </span>
                    </div>
                    {factor.impactValue !== 0 &&
                <div className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                        Impact: {factor.impactValue > 0 ? '+' : ''}
                        {factor.impactValue} mois
                      </div>
                }
                  </motion.div>
              )}
              </div>
            </motion.div>
            {/* Manual Adjustment */}
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
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-2 border-blue-100 dark:border-gray-600 shadow-lg">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <ZapIcon className="h-5 w-5 text-white" />
                </div>
                <h5 className="font-bold text-gray-900 dark:text-white">
                  Ajustement manuel
                </h5>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border-2 border-blue-200 dark:border-gray-600 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Ajustez la durée estimée en fonction de votre expertise
                  clinique et de votre connaissance du patient
                </p>
                <div className="mb-4">
                  <label
                  htmlFor="manual-adjustment"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                    Modifier l'estimation (en mois)
                  </label>
                  <div className="flex items-center justify-center">
                    <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() =>
                    setManualAdjustment(Math.max(manualAdjustment - 1, -6))
                    }
                    className="h-12 w-12 flex items-center justify-center border-2 border-blue-300 dark:border-blue-600 rounded-l-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-bold text-xl transition-all">

                      -
                    </motion.button>
                    <div className="h-12 px-8 flex items-center justify-center border-t-2 border-b-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-700 text-center min-w-[80px]">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {manualAdjustment > 0 ?
                      `+${manualAdjustment}` :
                      manualAdjustment}
                      </span>
                    </div>
                    <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() =>
                    setManualAdjustment(Math.min(manualAdjustment + 1, 6))
                    }
                    className="h-12 w-12 flex items-center justify-center border-2 border-blue-300 dark:border-blue-600 rounded-r-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-bold text-xl transition-all">

                      +
                    </motion.button>
                  </div>
                </div>
              </div>
              {/* Calculation Breakdown */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border-2 border-blue-200 dark:border-gray-600">
                <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Calcul détaillé
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Durée de base:
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {getBaseDuration()} mois
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Ajustement coopération:
                    </span>
                    <span
                    className={`text-sm font-bold ${(3 - patientCompliance) * 2 > 0 ? 'text-red-600 dark:text-red-400' : (3 - patientCompliance) * 2 < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>

                      {(3 - patientCompliance) * 2 > 0 ? '+' : ''}
                      {(3 - patientCompliance) * 2} mois
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Ajustement manuel:
                    </span>
                    <span
                    className={`text-sm font-bold ${manualAdjustment > 0 ? 'text-red-600 dark:text-red-400' : manualAdjustment < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>

                      {manualAdjustment > 0 ? '+' : ''}
                      {manualAdjustment} mois
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t-2 border-blue-200 dark:border-gray-600">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      Durée totale estimée:
                    </span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {getAdjustedDuration()} mois
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Important Note */}
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
          className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-600 rounded-lg p-4 shadow-md">

            <div className="flex">
              <div className="flex-shrink-0">
                <InfoIcon className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h5 className="text-sm font-medium text-amber-800">
                  Note importante
                </h5>
                <div className="mt-2 text-sm text-amber-700">
                  <p>
                    Cette estimation est basée sur des moyennes et peut varier
                    en fonction de la réponse individuelle du patient au
                    traitement. Des ajustements peuvent être nécessaires au
                    cours du traitement.
                  </p>
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
            alert('Estimation enregistrée dans le dossier patient')
            }
            className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

              <CheckIcon className="h-4 w-4 mr-2" />
              Enregistrer l'estimation
            </motion.button>
          </motion.div>
        </div>
      }

      {/* Info Section */}
      {!showPrediction && selectedPatient &&
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
                À propos de la prédiction de durée
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-4">
                Notre système utilise l'intelligence artificielle pour prédire
                la durée du traitement en fonction de multiples facteurs. Cette
                estimation vous aide à planifier le traitement et à informer le
                patient de manière précise.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                      <AwardIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      92%
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
                      500+
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Prédictions réalisées
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-100 dark:border-gray-600">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <ActivityIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      8
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Facteurs analysés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }
    </div>);

};
export default TreatmentDuration;