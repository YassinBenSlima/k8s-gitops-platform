import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadIcon,
  SearchIcon,
  CheckCircleIcon,
  XCircleIcon,
  BrainIcon,
  FileTextIcon,
  BarChart2Icon,
  AlertCircleIcon,
  InfoIcon,
  SparklesIcon,
  ZapIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  AwardIcon,
  ChevronRightIcon,
  UserIcon } from
'lucide-react';
import CaseAnalysisCard from './common/CaseAnalysisCard';
import TreatmentRecommendationsModal from './modals/TreatmentRecommendationsModal';
import GenerateReportModal from './modals/GenerateReportModal';
import AdditionalExamsModal from './modals/AdditionalExamsModal';
interface MLAnalysisEngineProps {
  selectedPatient?: string | null;
}
const MLAnalysisEngine: React.FC<MLAnalysisEngineProps> = ({
  selectedPatient
}) => {
  const [analysisStage, setAnalysisStage] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showExamsModal, setShowExamsModal] = useState(false);
  // Mock patients
  const patients = [
  {
    id: '1',
    name: 'Sophie Martin',
    age: 14,
    condition: 'Nouvelle patiente'
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    age: 12,
    condition: 'Nouveau patient'
  },
  {
    id: '3',
    name: 'Emma Petit',
    age: 16,
    condition: 'Nouvelle patiente'
  },
  {
    id: '4',
    name: 'Lucas Dubois',
    age: 15,
    condition: 'Nouveau patient'
  }];

  // Mock analysis results
  const analysisResults = {
    caseType: 'Classe II division 1',
    complexity: 'Modérée',
    confidence: 92,
    details: [
    {
      name: 'Surplomb horizontal',
      value: '6mm',
      severity: 'Modéré'
    },
    {
      name: 'Chevauchement incisives inférieures',
      value: '4mm',
      severity: 'Modéré'
    },
    {
      name: 'Profil facial',
      value: 'Convexe',
      severity: 'Léger'
    },
    {
      name: 'Croissance mandibulaire',
      value: 'Insuffisante',
      severity: 'Modéré'
    }],

    expectedOutcomes: [
    'Amélioration du profil facial',
    'Correction du surplomb horizontal',
    'Alignement dentaire complet',
    "Établissement d'une relation molaire de classe I"],

    similarCases: 3,
    estimatedDuration: '18-24 mois',
    aiConfidenceFactors: [
    {
      factor: 'Modèle de croissance',
      confidence: 'Élevé'
    },
    {
      factor: 'Profil de coopération prévu',
      confidence: 'Moyen'
    },
    {
      factor: 'Précision du diagnostic',
      confidence: 'Très élevé'
    }]

  };
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };
  const handleAnalyze = () => {
    setAnalysisStage('analyzing');
    setTimeout(() => {
      setAnalysisStage('results');
    }, 2000);
  };
  const handleNewAnalysis = () => {
    setAnalysisStage('upload');
    setUploadedFiles([]);
  };
  const renderUploadStage = () =>
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
      className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
            <BrainIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              Analyse par apprentissage automatique
            </h3>
            <p className="text-purple-100 text-sm mt-1">
              Soumettez un nouveau cas pour obtenir une analyse complète basée
              sur notre modèle d'IA
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
                ci-dessus pour commencer l'analyse
              </p>
            </div>
          </div>
        </motion.div> :

    <>
          {/* File Upload */}
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
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-100 dark:border-purple-800 shadow-lg">

            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-3">
                <UploadIcon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Téléverser les documents
              </h4>
            </div>
            <div className="space-y-4">
              <motion.div
            whileHover={{
              scale: 1.02
            }}
            className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl p-8 flex flex-col items-center justify-center bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all cursor-pointer">

                <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <UploadIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Déposez vos fichiers ici ou
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Radiographies, photos, scans 3D (PNG, JPG, DICOM, STL)
                </p>
                <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer transition-all">

                  <SparklesIcon className="h-4 w-4 mr-2" />
                  <span>Sélectionner des fichiers</span>
                  <input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="sr-only"
                onChange={handleFileUpload} />

                </label>
              </motion.div>
              <AnimatePresence>
                {uploadedFiles.length > 0 &&
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
              }}>

                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                        Fichiers téléversés ({uploadedFiles.length})
                      </h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Prêt
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) =>
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
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-100 dark:border-purple-700 shadow-sm">

                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                                <FileTextIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {file.name}
                              </span>
                            </div>
                            <button
                      type="button"
                      className="ml-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      onClick={() => {
                        setUploadedFiles(
                          uploadedFiles.filter((_, i) => i !== index)
                        );
                      }}>

                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </motion.li>
                )}
                    </ul>
                  </motion.div>
            }
              </AnimatePresence>
              <motion.div
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}>

                <button
              type="button"
              disabled={!selectedPatient || uploadedFiles.length === 0}
              onClick={handleAnalyze}
              className="w-full inline-flex items-center justify-center px-6 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 disabled:cursor-not-allowed transition-all">

                  <ZapIcon className="h-5 w-5 mr-2" />
                  Lancer l'analyse IA
                </button>
              </motion.div>
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
          delay: 0.2
        }}
        className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-800 shadow-lg">

            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mr-4 flex-shrink-0">
                <InfoIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                  À propos de l'analyse IA
                </h3>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-4">
                  Notre moteur d'analyse utilise un modèle d'apprentissage
                  profond entraîné sur plus de 10 000 cas orthodontiques. L'IA
                  identifie automatiquement le type de cas, estime sa complexité
                  et suggère les résultats attendus.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                        <BrainIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        10,000+
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Cas analysés
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-indigo-700">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        93%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Précision moyenne
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
        </>
    }
    </div>;

  const renderAnalyzingStage = () =>
  <motion.div
    initial={{
      opacity: 0
    }}
    animate={{
      opacity: 1
    }}
    className="flex flex-col items-center justify-center py-16">

      <motion.div
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }}
      className="relative">

        <div className="w-24 h-24 border-8 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full"></div>
        <motion.div
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
        className="absolute inset-0 flex items-center justify-center">

          <BrainIcon className="h-10 w-10 text-purple-600 dark:text-purple-400" />
        </motion.div>
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
      transition={{
        delay: 0.3
      }}
      className="mt-8 text-center">

        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analyse en cours...
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          L'IA analyse votre image, veuillez patienter
        </p>
        <div className="w-80 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
          className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-full"
          initial={{
            width: '0%'
          }}
          animate={{
            width: '100%'
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut'
          }} />

        </div>
        <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 0.5
        }}
        className="mt-6 flex items-center justify-center space-x-2">

          <SparklesIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-pulse" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Traitement des données avec l'IA...
          </span>
        </motion.div>
      </motion.div>
    </motion.div>;

  const renderResultsStage = () =>
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
      className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                Analyse complétée pour{' '}
                {patients[parseInt(selectedPatient) - 1]?.name}
              </h3>
              <p className="text-green-100 text-sm mt-1">
                Analyse terminée avec {analysisResults.confidence}% de confiance
              </p>
            </div>
          </div>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleNewAnalysis}
          className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg text-white hover:bg-white hover:text-green-600 dark:hover:text-green-700 transition-all">

            Nouvelle analyse
          </motion.button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Card */}
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
        className="lg:col-span-1 space-y-6">

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-100 dark:border-blue-800 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center mr-3">
                <AwardIcon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Synthèse du cas
              </h4>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Type de cas
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {analysisResults.caseType}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Complexité
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {analysisResults.complexity}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Durée estimée
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {analysisResults.estimatedDuration}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Cas similaires
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {analysisResults.similarCases} trouvés
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <p className="text-xs text-blue-900 dark:text-blue-300">
                Analyse basée sur des modèles d'IA entraînés sur des milliers de
                cas similaires
              </p>
            </div>
          </div>
          {/* AI Confidence Factors */}
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
            delay: 0.2
          }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-100 dark:border-purple-800 shadow-lg">

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center mr-3">
                  <ShieldCheckIcon className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Facteurs de confiance IA
                </h4>
              </div>
              <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">

                {showExplanation ? 'Masquer' : 'Expliquer'}
              </button>
            </div>
            <div className="space-y-3">
              {analysisResults.aiConfidenceFactors.map((factor, index) =>
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
                delay: 0.3 + index * 0.1
              }}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700">

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {factor.factor}
                    </span>
                    <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${factor.confidence === 'Très élevé' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : factor.confidence === 'Élevé' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'}`}>

                      {factor.confidence}
                    </span>
                  </div>
                </motion.div>
            )}
            </div>
            <AnimatePresence>
              {showExplanation &&
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
              className="mt-4 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">

                  <p className="text-xs font-bold text-purple-900 dark:text-purple-300 mb-2">
                    Comment l'IA a-t-elle pris sa décision ?
                  </p>
                  <p className="text-xs text-purple-800 dark:text-purple-400">
                    L'analyse est basée sur la comparaison avec des cas
                    similaires et des modèles de prédiction. Les facteurs de
                    confiance indiquent la fiabilité de chaque aspect de
                    l'analyse.
                  </p>
                </motion.div>
            }
            </AnimatePresence>
          </motion.div>
        </motion.div>
        {/* Details Section */}
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
        className="lg:col-span-2 space-y-6">

          {/* Clinical Details */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-100 dark:border-amber-800 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center mr-3">
                <BarChart2Icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Détails cliniques détectés
              </h4>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-amber-200 dark:border-amber-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-amber-50 dark:bg-amber-900/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Caractéristique
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Valeur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Sévérité
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {analysisResults.details.map((detail, index) =>
                <motion.tr
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
                    delay: 0.3 + index * 0.1
                  }}
                  className="hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors">

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {detail.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {detail.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${detail.severity === 'Sévère' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' : detail.severity === 'Modéré' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'}`}>

                          {detail.severity}
                        </span>
                      </td>
                    </motion.tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Expected Outcomes and Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expected Outcomes */}
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
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-100 dark:border-green-800 shadow-lg">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mr-3">
                  <TrendingUpIcon className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Résultats attendus
                </h4>
              </div>
              <ul className="space-y-3">
                {analysisResults.expectedOutcomes.map((outcome, index) =>
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
                className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-200 dark:border-green-700">

                    <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {outcome}
                    </span>
                  </motion.li>
              )}
              </ul>
            </motion.div>
            {/* Recommended Actions */}
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
            className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-800 shadow-lg">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mr-3">
                  <ZapIcon className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Actions recommandées
                </h4>
              </div>
              <ul className="space-y-3">
                <motion.li
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
                whileHover={{
                  scale: 1.02
                }}
                onClick={() => setShowTreatmentModal(true)}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-indigo-200 dark:border-indigo-700 cursor-pointer hover:shadow-md transition-all">

                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <BarChart2Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Voir les recommandations de traitement
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        3 plans suggérés
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </motion.li>
                <motion.li
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.7
                }}
                whileHover={{
                  scale: 1.02
                }}
                onClick={() => setShowReportModal(true)}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-indigo-200 dark:border-indigo-700 cursor-pointer hover:shadow-md transition-all">

                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <FileTextIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Générer un rapport complet
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Rapport détaillé avec analyse
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </motion.li>
                <motion.li
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.8
                }}
                whileHover={{
                  scale: 1.02
                }}
                onClick={() => setShowExamsModal(true)}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-indigo-200 dark:border-indigo-700 cursor-pointer hover:shadow-md transition-all">

                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                      <AlertCircleIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Examens complémentaires suggérés
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Téléradiographie recommandée
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </motion.li>
              </ul>
            </motion.div>
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
        delay: 0.9
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

          Enregistrer l'analyse
        </motion.button>
        <motion.button
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        type="button"
        className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

          Voir les recommandations de traitement
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </motion.button>
      </motion.div>
      {/* Modals */}
      <AnimatePresence>
        {showTreatmentModal &&
      <TreatmentRecommendationsModal
        patientName={patients[parseInt(selectedPatient) - 1]?.name}
        analysisData={analysisResults}
        onClose={() => setShowTreatmentModal(false)} />

      }
      </AnimatePresence>
      <AnimatePresence>
        {showReportModal &&
      <GenerateReportModal
        patientName={patients[parseInt(selectedPatient) - 1]?.name}
        analysisData={analysisResults}
        onClose={() => setShowReportModal(false)} />

      }
      </AnimatePresence>
      <AnimatePresence>
        {showExamsModal &&
      <AdditionalExamsModal
        patientName={patients[parseInt(selectedPatient) - 1]?.name}
        analysisData={analysisResults}
        onClose={() => setShowExamsModal(false)} />

      }
      </AnimatePresence>
    </div>;

  return (
    <div>
      {analysisStage === 'upload' && renderUploadStage()}
      {analysisStage === 'analyzing' && renderAnalyzingStage()}
      {analysisStage === 'results' && renderResultsStage()}
    </div>);

};
export default MLAnalysisEngine;