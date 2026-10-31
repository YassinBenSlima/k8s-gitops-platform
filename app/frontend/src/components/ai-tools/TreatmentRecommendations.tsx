import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SearchIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  SaveIcon,
  ArrowRightIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
  FileTextIcon,
  InfoIcon,
  EyeIcon,
  ChevronRightIcon,
  SparklesIcon,
  AwardIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  ZapIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BarChart2Icon } from
'lucide-react';
import AllTreatmentRecommendationsModal from './modals/AllTreatmentRecommendationsModal';
interface TreatmentRecommendationsProps {
  selectedPatient?: string | null;
}
const TreatmentRecommendations: React.FC<TreatmentRecommendationsProps> = ({
  selectedPatient
}) => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCaseComparison, setShowCaseComparison] = useState(false);
  const [showAllRecommendationsModal, setShowAllRecommendationsModal] =
  useState(false);
  // Mock patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    age: 14,
    condition: 'Classe II division 1'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    age: 12,
    condition: 'Chevauchement sévère'
  },
  {
    id: 3,
    name: 'Emma Petit',
    age: 16,
    condition: 'Classe III'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    age: 15,
    condition: 'Béance antérieure'
  }];

  // Mock treatment recommendations
  const treatmentRecommendations = [
  {
    id: 1,
    name: 'Appareil fixe + élastiques classe II',
    successRate: 87,
    duration: '24 mois',
    complexity: 'Moyenne',
    cost: '€€',
    similarCases: 42,
    description:
    'Traitement conventionnel avec brackets métalliques et élastiques intermaxillaires pour correction de la classe II.',
    steps: [
    "Pose de l'appareil fixe complet",
    "Phase d'alignement initial (6-8 mois)",
    'Phase de correction de classe II avec élastiques (10-12 mois)',
    'Phase de finition et détails (4-6 mois)',
    'Dépose et mise en place de contentions'],

    advantages: [
    'Efficacité prouvée pour la correction de classe II',
    'Contrôle précis des mouvements dentaires',
    "Coût modéré par rapport à d'autres options"],

    disadvantages: [
    "Visibilité de l'appareil",
    'Nécessite une bonne coopération du patient (élastiques)',
    'Hygiène plus difficile']

  },
  {
    id: 2,
    name: 'Aligneurs transparents série complète',
    successRate: 82,
    duration: '20 mois',
    complexity: 'Faible',
    cost: '€€€',
    similarCases: 28,
    description:
    'Traitement par aligneurs transparents avec séquence complète et auxiliaires de classe II intégrés.',
    steps: [
    'Scan 3D et planification numérique',
    "Phase d'alignement (8-10 mois)",
    'Phase de correction de classe II avec auxiliaires (8-10 mois)',
    'Aligneurs de finition (2-4 mois)',
    'Mise en place de contentions'],

    advantages: [
    'Esthétique supérieure (appareil quasi invisible)',
    'Hygiène facilitée (appareil amovible)',
    'Confort amélioré par rapport aux appareils fixes'],

    disadvantages: [
    'Coût plus élevé',
    'Nécessite une discipline rigoureuse du patient',
    'Efficacité légèrement réduite pour certains mouvements complexes']

  },
  {
    id: 3,
    name: 'Appareil fonctionnel + Phase fixe',
    successRate: 91,
    duration: '28 mois',
    complexity: 'Élevée',
    cost: '€€',
    similarCases: 35,
    description:
    "Traitement en deux phases avec appareil fonctionnel pour stimuler la croissance mandibulaire, suivi d'une phase avec appareil fixe.",
    steps: [
    "Phase 1: Pose de l'appareil fonctionnel (10-12 mois)",
    'Période de transition/observation (2-3 mois)',
    "Phase 2: Pose de l'appareil fixe (12-14 mois)",
    'Dépose et mise en place de contentions'],

    advantages: [
    'Correction squelettique et dentaire combinée',
    'Résultats plus stables à long terme',
    'Amélioration significative du profil facial'],

    disadvantages: [
    'Durée totale de traitement plus longue',
    'Nécessite une coopération importante du patient',
    'Deux phases distinctes de traitement']

  }];

  // Mock similar cases
  const similarCases = [
  {
    id: 1,
    patientCode: 'PT-3842',
    age: '13 ans',
    gender: 'F',
    initialCondition: 'Classe II division 1 (6mm)',
    treatment: 'Appareil fixe + élastiques classe II',
    duration: '22 mois',
    outcome: 'Excellent',
    beforeImage:
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    afterImage:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    patientCode: 'PT-2967',
    age: '15 ans',
    gender: 'F',
    initialCondition: 'Classe II division 1 (5mm)',
    treatment: 'Appareil fixe + élastiques classe II',
    duration: '24 mois',
    outcome: 'Bon',
    beforeImage:
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    afterImage:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    patientCode: 'PT-4103',
    age: '14 ans',
    gender: 'M',
    initialCondition: 'Classe II division 1 (7mm)',
    treatment: 'Appareil fixe + élastiques classe II',
    duration: '26 mois',
    outcome: 'Excellent',
    beforeImage:
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    afterImage:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }];

  const handlePatientSelect = () => {
    setShowRecommendations(true);
  };
  const handleRecommendationSelect = (recId) => {
    setSelectedRecommendation(recId);
  };
  const handleSaveCustomization = () => {
    setIsEditing(false);
    alert('Plan de traitement personnalisé sauvegardé');
  };
  const handleValidatePlan = () => {
    alert('Plan de traitement validé et ajouté au dossier patient');
  };
  const handleViewAllRecommendations = () => {
    setShowAllRecommendationsModal(true);
  };
  const handleSelectRecommendationFromModal = (recId) => {
    setShowAllRecommendationsModal(false);
    setSelectedRecommendation(recId);
  };
  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Faible':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Moyenne':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'Élevée':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
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
        className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
            <AwardIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              Recommandations de traitement
            </h3>
            <p className="text-indigo-100 text-sm mt-1">
              Suggestions personnalisées basées sur des cas similaires traités
              avec succès
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
                ci-dessus pour voir les recommandations
              </p>
            </div>
          </div>
        </motion.div> :

      <>
          {/* Find Recommendations Button - Only show when patient selected and no results yet */}
          {!showRecommendations &&
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
                Trouver des recommandations
              </motion.button>
            </motion.div>
        }

          {showRecommendations &&
        <div className="space-y-6">
              {/* Recommendations List */}
              <div>
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
              className="mb-4">

                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Traitements recommandés
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {treatmentRecommendations.length} options basées sur{' '}
                    {treatmentRecommendations.reduce(
                  (sum, rec) => sum + rec.similarCases,
                  0
                )}{' '}
                    cas similaires
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 gap-4">
                  {treatmentRecommendations.map((rec, index) =>
              <motion.div
                key={rec.id}
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
                }}
                whileHover={{
                  scale: 1.01
                }}
                onClick={() => handleRecommendationSelect(rec.id)}
                className={`bg-gradient-to-br ${selectedRecommendation === rec.id ? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-500 dark:border-blue-400' : 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600'} rounded-2xl p-6 border-2 shadow-lg cursor-pointer transition-all`}>

                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <div
                        className={`h-12 w-12 rounded-full ${selectedRecommendation === rec.id ? 'bg-blue-500 dark:bg-blue-600' : 'bg-indigo-500 dark:bg-indigo-600'} flex items-center justify-center mr-4`}>

                              <AwardIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-900 dark:text-white text-lg">
                                {rec.name}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {rec.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              <StarIcon className="h-3 w-3 mr-1" />
                              {rec.successRate}% de réussite
                            </span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              {rec.duration}
                            </span>
                            <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getComplexityColor(rec.complexity)}`}>

                              <BarChart2Icon className="h-3 w-3 mr-1" />
                              {rec.complexity}
                            </span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400">
                              <ShieldCheckIcon className="h-3 w-3 mr-1" />
                              {rec.similarCases} cas similaires
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Coût estimé: </span>
                            <span className="ml-2 font-bold text-gray-900 dark:text-white">
                              {rec.cost}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          {selectedRecommendation === rec.id ?
                    <motion.div
                      initial={{
                        scale: 0
                      }}
                      animate={{
                        scale: 1
                      }}
                      className="h-8 w-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">

                              <CheckIcon className="h-5 w-5 text-white" />
                            </motion.div> :

                    <ChevronRightIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    }
                        </div>
                      </div>
                    </motion.div>
              )}
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
              transition={{
                delay: 0.5
              }}
              className="mt-6 flex justify-center">

                  <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={handleViewAllRecommendations}
                className="inline-flex items-center px-6 py-3 border-2 border-purple-200 dark:border-purple-700 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-400 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all">

                    Voir toutes les recommandations
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.div>
              </div>
              {/* Detailed View */}
              <AnimatePresence>
                {selectedRecommendation &&
            <motion.div
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

                    {/* Header with Actions */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                            <CheckCircleIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">
                              {
                        treatmentRecommendations.find(
                          (r) => r.id === selectedRecommendation
                        )?.name
                        }
                            </h4>
                            <p className="text-green-100 text-sm mt-1">
                              Plan détaillé et personnalisable
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!isEditing ?
                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg text-white hover:bg-white hover:text-green-600 dark:hover:text-green-700 transition-all">

                              <EditIcon className="h-4 w-4 mr-2" />
                              Personnaliser
                            </motion.button> :

                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={handleSaveCustomization}
                      className="inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-green-600 dark:text-green-700 bg-white hover:bg-green-50 transition-all">

                              <SaveIcon className="h-4 w-4 mr-2" />
                              Enregistrer
                            </motion.button>
                    }
                          <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={() =>
                      setShowCaseComparison(!showCaseComparison)
                      }
                      className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg text-white hover:bg-white hover:text-green-600 dark:hover:text-green-700 transition-all">

                            <EyeIcon className="h-4 w-4 mr-2" />
                            {showCaseComparison ? 'Masquer' : 'Voir'} cas
                            similaires
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Treatment Steps */}
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
                    delay: 0.1
                  }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-100 dark:border-blue-800 shadow-lg">

                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center mr-3">
                            <ZapIcon className="h-5 w-5 text-white" />
                          </div>
                          <h5 className="font-bold text-gray-900 dark:text-white">
                            Étapes du traitement
                          </h5>
                        </div>
                        <div className="space-y-3">
                          {treatmentRecommendations.
                    find((r) => r.id === selectedRecommendation)?.
                    steps.map((step, index) =>
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
                        delay: 0.2 + index * 0.1
                      }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700 shadow-sm">

                                <div className="flex items-start">
                                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p
                            className={`text-sm font-medium text-gray-900 dark:text-white ${isEditing ? 'border-b border-gray-300 dark:border-gray-600 pb-1' : ''}`}>

                                      {step}
                                    </p>
                                  </div>
                                  {isEditing &&
                        <button className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                                      <EditIcon className="h-4 w-4" />
                                    </button>
                        }
                                </div>
                              </motion.div>
                    )}
                          {isEditing &&
                    <motion.button
                      whileHover={{
                        scale: 1.02
                      }}
                      className="w-full mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center justify-center py-2 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-all">

                              + Ajouter une étape
                            </motion.button>
                    }
                        </div>
                      </motion.div>
                      {/* Expected Results & Estimation */}
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
                    delay: 0.2
                  }}
                  className="space-y-6">

                        {/* Expected Results */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-100 dark:border-green-800 shadow-lg">
                          <div className="flex items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mr-3">
                              <TrendingUpIcon className="h-5 w-5 text-white" />
                            </div>
                            <h5 className="font-bold text-gray-900 dark:text-white">
                              Résultats attendus
                            </h5>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Correction du surplomb horizontal
                                </span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                  Très bonne
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                            initial={{
                              width: 0
                            }}
                            animate={{
                              width: '85%'
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.3
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 h-2 rounded-full" />

                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Alignement dentaire
                                </span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                  Excellent
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                            initial={{
                              width: 0
                            }}
                            animate={{
                              width: '95%'
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.4
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 h-2 rounded-full" />

                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Amélioration du profil
                                </span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                  Bonne
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                            initial={{
                              width: 0
                            }}
                            animate={{
                              width: '75%'
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.5
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 h-2 rounded-full" />

                              </div>
                            </div>
                            {isEditing &&
                      <motion.button
                        whileHover={{
                          scale: 1.02
                        }}
                        className="w-full text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">

                                Modifier les résultats attendus
                              </motion.button>
                      }
                          </div>
                        </div>
                        {/* Treatment Estimation */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-100 dark:border-purple-800 shadow-lg">
                          <div className="flex items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-3">
                              <BarChart2Icon className="h-5 w-5 text-white" />
                            </div>
                            <h5 className="font-bold text-gray-900 dark:text-white">
                              Estimation du traitement
                            </h5>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700 flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Durée estimée
                              </span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {
                          treatmentRecommendations.find(
                            (r) => r.id === selectedRecommendation
                          )?.duration
                          }
                              </span>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700 flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Visites estimées
                              </span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                15-18
                              </span>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700 flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Complexité
                              </span>
                              <span
                          className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${getComplexityColor(treatmentRecommendations.find((r) => r.id === selectedRecommendation)?.complexity)}`}>

                                {
                          treatmentRecommendations.find(
                            (r) => r.id === selectedRecommendation
                          )?.complexity
                          }
                              </span>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700 flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Gamme de prix
                              </span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {
                          treatmentRecommendations.find(
                            (r) => r.id === selectedRecommendation
                          )?.cost
                          }
                              </span>
                            </div>
                            {isEditing &&
                      <motion.button
                        whileHover={{
                          scale: 1.02
                        }}
                        className="w-full text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">

                                Ajuster les estimations
                              </motion.button>
                      }
                          </div>
                          <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-start">
                            <InfoIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-purple-900 dark:text-purple-300">
                              Basé sur{' '}
                              {
                        treatmentRecommendations.find(
                          (r) => r.id === selectedRecommendation
                        )?.similarCases
                        }{' '}
                              cas similaires traités avec succès
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    {/* Advantages & Disadvantages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Advantages */}
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
                    delay: 0.3
                  }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-100 dark:border-green-800 shadow-lg">

                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mr-3">
                            <CheckCircleIcon className="h-5 w-5 text-white" />
                          </div>
                          <h5 className="font-bold text-gray-900 dark:text-white">
                            Avantages
                          </h5>
                        </div>
                        <ul className="space-y-3">
                          {treatmentRecommendations.
                    find((r) => r.id === selectedRecommendation)?.
                    advantages.map((advantage, index) =>
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
                        delay: 0.4 + index * 0.1
                      }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-200 dark:border-green-700 flex items-start">

                                <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                                <span
                        className={`text-sm text-gray-700 dark:text-gray-300 ${isEditing ? 'border-b border-gray-300 dark:border-gray-600 pb-1 flex-1' : 'flex-1'}`}>

                                  {advantage}
                                </span>
                                {isEditing &&
                      <button className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                                    <EditIcon className="h-3 w-3" />
                                  </button>
                      }
                              </motion.li>
                    )}
                          {isEditing &&
                    <motion.button
                      whileHover={{
                        scale: 1.02
                      }}
                      className="w-full text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center justify-center py-2 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg hover:border-green-400 dark:hover:border-green-600 transition-all">

                              + Ajouter un avantage
                            </motion.button>
                    }
                        </ul>
                      </motion.div>
                      {/* Disadvantages */}
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
                    delay: 0.4
                  }}
                  className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-red-100 dark:border-red-800 shadow-lg">

                        <div className="flex items-center mb-4">
                          <div className="h-10 w-10 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center mr-3">
                            <AlertCircleIcon className="h-5 w-5 text-white" />
                          </div>
                          <h5 className="font-bold text-gray-900 dark:text-white">
                            Inconvénients
                          </h5>
                        </div>
                        <ul className="space-y-3">
                          {treatmentRecommendations.
                    find((r) => r.id === selectedRecommendation)?.
                    disadvantages.map((disadvantage, index) =>
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
                        delay: 0.5 + index * 0.1
                      }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-700 flex items-start">

                                <XIcon className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                                <span
                        className={`text-sm text-gray-700 dark:text-gray-300 ${isEditing ? 'border-b border-gray-300 dark:border-gray-600 pb-1 flex-1' : 'flex-1'}`}>

                                  {disadvantage}
                                </span>
                                {isEditing &&
                      <button className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                                    <EditIcon className="h-3 w-3" />
                                  </button>
                      }
                              </motion.li>
                    )}
                          {isEditing &&
                    <motion.button
                      whileHover={{
                        scale: 1.02
                      }}
                      className="w-full text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center justify-center py-2 border-2 border-dashed border-red-300 dark:border-red-700 rounded-lg hover:border-red-400 dark:hover:border-red-600 transition-all">

                              + Ajouter un inconvénient
                            </motion.button>
                    }
                        </ul>
                      </motion.div>
                    </div>
                    {/* Similar Cases */}
                    <AnimatePresence>
                      {showCaseComparison &&
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto'
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-100 dark:border-amber-800 shadow-lg">

                          <div className="flex items-center mb-6">
                            <div className="h-10 w-10 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center mr-3">
                              <EyeIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">
                                Cas similaires traités
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {similarCases.length} cas avec cette approche
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {similarCases.map((caseItem, index) =>
                    <motion.div
                      key={caseItem.id}
                      initial={{
                        opacity: 0,
                        scale: 0.9
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      transition={{
                        delay: 0.1 * index
                      }}
                      whileHover={{
                        scale: 1.02
                      }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700 shadow-md cursor-pointer">

                                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 border-b-2 border-amber-200 dark:border-amber-700">
                                  <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                                    Patient {caseItem.patientCode}
                                  </h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {caseItem.age}, {caseItem.gender}
                                  </p>
                                </div>
                                <div className="p-4">
                                  <div className="mb-3">
                                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                      Condition initiale
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {caseItem.initialCondition}
                                    </p>
                                  </div>
                                  <div className="mb-3">
                                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                      Traitement
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {caseItem.treatment}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div>
                                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        Avant
                                      </p>
                                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        <img
                                src={caseItem.beforeImage}
                                alt="Avant traitement"
                                className="w-full h-full object-cover" />

                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                        Après
                                      </p>
                                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        <img
                                src={caseItem.afterImage}
                                alt="Après traitement"
                                className="w-full h-full object-cover" />

                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center pt-3 border-t border-amber-200 dark:border-amber-700">
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                      Durée: {caseItem.duration}
                                    </span>
                                    <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${caseItem.outcome === 'Excellent' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'}`}>

                                      {caseItem.outcome}
                                    </span>
                                  </div>
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
                      className="inline-flex items-center px-6 py-3 border-2 border-amber-300 dark:border-amber-700 rounded-lg text-sm font-medium text-amber-700 dark:text-amber-400 bg-white dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all">

                              Voir plus de cas similaires
                              <ChevronRightIcon className="ml-2 h-4 w-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                }
                    </AnimatePresence>
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
                  onClick={() => {
                    setSelectedRecommendation(null);
                    setShowCaseComparison(false);
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

                        Comparer d'autres plans
                      </motion.button>
                      <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={handleValidatePlan}
                  className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

                        <FileTextIcon className="h-4 w-4 mr-2" />
                        Valider ce plan
                      </motion.button>
                    </motion.div>
                  </motion.div>
            }
              </AnimatePresence>
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
                À propos des recommandations
              </h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-400 mb-4">
                Notre système de recommandation utilise l'IA pour rechercher
                dans notre base de données des cas similaires au vôtre. Les
                suggestions sont basées sur les traitements qui ont donné les
                meilleurs résultats pour des patients présentant des
                caractéristiques similaires.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                      <AwardIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      500+
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Plans de traitement
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
                    Taux de succès
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

      {/* Add Modal */}
      <AnimatePresence>
        {showAllRecommendationsModal &&
        <AllTreatmentRecommendationsModal
          recommendations={treatmentRecommendations}
          onClose={() => setShowAllRecommendationsModal(false)}
          onSelectRecommendation={handleSelectRecommendationFromModal} />

        }
      </AnimatePresence>
    </div>);

};
export default TreatmentRecommendations;