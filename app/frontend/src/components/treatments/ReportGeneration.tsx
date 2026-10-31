import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileTextIcon,
  DownloadIcon,
  CalendarIcon,
  UserIcon,
  TrendingUpIcon,
  ImageIcon,
  CheckCircleIcon,
  EyeIcon,
  XIcon,
  ActivityIcon,
  SparklesIcon,
  PlusIcon,
  SearchIcon } from
'lucide-react';
const ReportGeneration = () => {
  const [reports, setReports] = useState([
  {
    id: 1,
    patientName: 'Sophie Martin',
    type: 'Rapport complet',
    date: '2024-01-15',
    progress: 75,
    photos: 12,
    status: 'ready'
  },
  {
    id: 2,
    patientName: 'Lucas Dubois',
    type: 'Rapport mensuel',
    date: '2024-01-10',
    progress: 100,
    photos: 24,
    status: 'ready'
  },
  {
    id: 3,
    patientName: 'Emma Petit',
    type: 'Rapport initial',
    date: '2024-01-12',
    progress: 45,
    photos: 8,
    status: 'ready'
  }]
  );
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  // Form state for new report
  const [newReportForm, setNewReportForm] = useState({
    patientId: '',
    reportType: 'complete',
    startDate: '',
    endDate: '',
    includeSections: {
      patientInfo: true,
      progress: true,
      photos: true,
      notes: true,
      recommendations: true,
      nextSteps: true
    }
  });
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin'
  },
  {
    id: 2,
    name: 'Lucas Dubois'
  },
  {
    id: 3,
    name: 'Emma Petit'
  },
  {
    id: 4,
    name: 'Marie Lefebvre'
  }];

  const reportTypes = [
  {
    value: 'complete',
    label: 'Rapport complet'
  },
  {
    value: 'monthly',
    label: 'Rapport mensuel'
  },
  {
    value: 'initial',
    label: 'Rapport initial'
  },
  {
    value: 'progress',
    label: 'Rapport de progression'
  },
  {
    value: 'final',
    label: 'Rapport final'
  }];

  const sections = [
  {
    id: 'patientInfo',
    label: 'Informations du patient'
  },
  {
    id: 'progress',
    label: 'Progression du traitement'
  },
  {
    id: 'photos',
    label: 'Galerie de photos'
  },
  {
    id: 'notes',
    label: 'Notes et observations'
  },
  {
    id: 'recommendations',
    label: 'Recommandations'
  },
  {
    id: 'nextSteps',
    label: 'Prochaines étapes'
  }];

  const handlePreviewReport = (report: any) => {
    setSelectedReport(report);
    setShowPreviewModal(true);
  };
  const handleOpenGenerateModal = () => {
    setShowGenerateModal(true);
    setGenerationComplete(false);
    setNewReportForm({
      patientId: '',
      reportType: 'complete',
      startDate: '',
      endDate: '',
      includeSections: {
        patientInfo: true,
        progress: true,
        photos: true,
        notes: true,
        recommendations: true,
        nextSteps: true
      }
    });
  };
  const handleToggleSection = (sectionId: string) => {
    setNewReportForm((prev) => ({
      ...prev,
      includeSections: {
        ...prev.includeSections,
        [sectionId]: !prev.includeSections[sectionId]
      }
    }));
  };
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 2500);
  };
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-emerald-600';
    if (progress >= 50) return 'from-blue-500 to-indigo-600';
    return 'from-amber-500 to-orange-600';
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
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

            <FileTextIcon className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">Génération de rapports</h3>
            <p className="text-emerald-100 text-sm mt-1">
              Créez des rapports détaillés avec photos et analyses d'évolution
            </p>
          </div>
        </div>
      </motion.div>
      {/* Reports List */}
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
            delay: 0.1
          }}
          className="mb-4">

          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <FileTextIcon className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
            Rapports disponibles
          </h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, index) =>
          <motion.div
            key={report.id}
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
            }}
            whileHover={{
              scale: 1.02,
              y: -4
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-lg cursor-pointer transition-all">

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                  className={`h-14 w-14 rounded-full bg-gradient-to-br ${getProgressColor(report.progress)} flex items-center justify-center shadow-lg`}>

                    <span className="font-bold text-xl text-white">
                      {report.patientName.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {report.patientName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {report.type}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-200 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                      Date
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {report.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-200 flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
                      Photos
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {report.photos}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-200 flex items-center">
                      <TrendingUpIcon className="h-4 w-4 mr-2 text-purple-500" />
                      Progression
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {report.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden mt-2">
                    <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${report.progress}%`
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.1
                    }}
                    className={`bg-gradient-to-r ${getProgressColor(report.progress)} h-3 rounded-full shadow-lg`} />

                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() => handlePreviewReport(report)}
                  className="flex-1 bg-transparent border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:border-blue-700 dark:hover:border-blue-300 hover:text-blue-700 dark:hover:text-blue-300 font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center">

                    <EyeIcon className="h-4 w-4 mr-2" />
                    Prévisualiser
                  </motion.button>
                  <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  className="flex-1 bg-transparent border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:border-emerald-600 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center">

                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Télécharger
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Generate New Report Button */}
      <motion.button
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
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        onClick={handleOpenGenerateModal}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center">

        <PlusIcon className="h-5 w-5 mr-2" />
        Générer un nouveau rapport
      </motion.button>
      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && selectedReport &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowPreviewModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40" />

            <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                        <FileTextIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Prévisualisation du rapport
                        </h3>
                        <p className="text-emerald-100 text-sm">
                          {selectedReport.patientName} - {selectedReport.type}
                        </p>
                      </div>
                    </div>
                    <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() => setShowPreviewModal(false)}
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

                      <XIcon className="h-5 w-5 text-white" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Patient Info Section */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <UserIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      Informations du patient
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Nom du patient
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {selectedReport.patientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Type de rapport
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {selectedReport.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Date du rapport
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {selectedReport.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Statut
                        </p>
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                          <p className="font-bold text-green-600 dark:text-green-400">
                            Complété
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Progress Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <TrendingUpIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      Progression du traitement
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Progression globale
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {selectedReport.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                          <motion.div
                          initial={{
                            width: 0
                          }}
                          animate={{
                            width: `${selectedReport.progress}%`
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.2
                          }}
                          className={`bg-gradient-to-r ${getProgressColor(selectedReport.progress)} h-4 rounded-full`} />

                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                          <ActivityIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Séances
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            12/16
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                          <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Durée
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            3 mois
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                          <TrendingUpIcon className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Amélioration
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            +45%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Photos Section */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                      Galerie de photos ({selectedReport.photos} photos)
                    </h4>
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({
                      length: 8
                    }).map((_, i) =>
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">

                          <ImageIcon className="h-8 w-8 text-purple-400" />
                        </div>
                    )}
                    </div>
                  </div>
                  {/* Notes Section */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-700">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FileTextIcon className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                      Notes et observations
                    </h4>
                    <div className="space-y-3">
                      <p className="text-gray-700 dark:text-gray-200">
                        Le patient montre une excellente progression dans son
                        traitement. Les résultats sont conformes aux attentes
                        initiales.
                      </p>
                      <p className="text-gray-700 dark:text-gray-200">
                        Recommandation: Continuer le traitement actuel et
                        prévoir un suivi dans 2 semaines.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Modal Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-2xl border-t-2 border-gray-100 dark:border-gray-600 flex justify-end space-x-3 sticky bottom-0">
                  <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() => setShowPreviewModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">

                    Fermer
                  </motion.button>
                  <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center">

                    <DownloadIcon className="h-5 w-5 mr-2" />
                    Télécharger le rapport
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
      {/* Generate New Report Modal */}
      <AnimatePresence>
        {showGenerateModal &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowGenerateModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40" />

            <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl sticky top-0 z-10">
                  <div className="flex items-center justify-between">
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
                      className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                        <FileTextIcon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Générer un nouveau rapport
                        </h3>
                        <p className="text-emerald-100 text-sm">
                          Configurez et créez un rapport détaillé
                        </p>
                      </div>
                    </div>
                    <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() => setShowGenerateModal(false)}
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

                      <XIcon className="h-5 w-5 text-white" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {!generationComplete ?
                <>
                      {/* Patient Selection */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-100 dark:border-blue-700">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <SearchIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                          Sélectionner un patient
                        </h4>
                        <select
                      value={newReportForm.patientId}
                      onChange={(e) =>
                      setNewReportForm({
                        ...newReportForm,
                        patientId: e.target.value
                      })
                      }
                      className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium">

                          <option value="">Choisir un patient...</option>
                          {patients.map((patient) =>
                      <option key={patient.id} value={patient.id}>
                              {patient.name}
                            </option>
                      )}
                        </select>
                      </div>
                      {/* Report Type */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-100 dark:border-purple-700">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <FileTextIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                          Type de rapport
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {reportTypes.map((type) =>
                      <motion.div
                        key={type.value}
                        whileHover={{
                          scale: 1.02
                        }}
                        onClick={() =>
                        setNewReportForm({
                          ...newReportForm,
                          reportType: type.value
                        })
                        }
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${newReportForm.reportType === type.value ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 dark:border-purple-400' : 'bg-white dark:bg-gray-700 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600'}`}>

                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {type.label}
                              </p>
                            </motion.div>
                      )}
                        </div>
                      </div>
                      {/* Date Range */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-100 dark:border-amber-700">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <CalendarIcon className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                          Période du rapport
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                              Date de début
                            </label>
                            <input
                          type="date"
                          value={newReportForm.startDate}
                          onChange={(e) =>
                          setNewReportForm({
                            ...newReportForm,
                            startDate: e.target.value
                          })
                          }
                          className="w-full px-4 py-3 border-2 border-amber-200 dark:border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-700 dark:text-white" />

                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                              Date de fin
                            </label>
                            <input
                          type="date"
                          value={newReportForm.endDate}
                          onChange={(e) =>
                          setNewReportForm({
                            ...newReportForm,
                            endDate: e.target.value
                          })
                          }
                          className="w-full px-4 py-3 border-2 border-amber-200 dark:border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-700 dark:text-white" />

                          </div>
                        </div>
                      </div>
                      {/* Sections to Include */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-100 dark:border-green-700">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <SparklesIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                          Sections à inclure
                        </h4>
                        <div className="space-y-3">
                          {sections.map((section) =>
                      <motion.div
                        key={section.id}
                        whileHover={{
                          scale: 1.01
                        }}
                        onClick={() => handleToggleSection(section.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${newReportForm.includeSections[section.id] ? 'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-400' : 'bg-white dark:bg-gray-700 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600'}`}>

                              <div className="flex items-center">
                                <div
                            className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center mr-3 transition-all ${newReportForm.includeSections[section.id] ? 'bg-green-500 dark:bg-green-400 border-green-500 dark:border-green-400' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>

                                  {newReportForm.includeSections[
                            section.id] &&

                            <CheckCircleIcon className="h-4 w-4 text-white" />
                            }
                                </div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                  {section.label}
                                </p>
                              </div>
                            </motion.div>
                      )}
                        </div>
                      </div>
                      {/* Generate Button */}
                      <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={handleGenerateReport}
                    disabled={!newReportForm.patientId || isGenerating}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center">

                        {isGenerating ?
                    <>
                            <motion.div
                        animate={{
                          rotate: 360
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />

                            Génération en cours...
                          </> :

                    <>
                            <SparklesIcon className="h-5 w-5 mr-2" />
                            Générer le rapport
                          </>
                    }
                      </motion.button>
                    </> :

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="space-y-6">

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 border-2 border-green-200 dark:border-green-700 text-center">
                        <motion.div
                      initial={{
                        scale: 0
                      }}
                      animate={{
                        scale: 1
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15
                      }}
                      className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">

                          <CheckCircleIcon className="h-12 w-12 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          Rapport généré avec succès!
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Votre rapport est prêt à être téléchargé ou consulté
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.button
                      whileHover={{
                        scale: 1.02
                      }}
                      whileTap={{
                        scale: 0.98
                      }}
                      className="flex items-center justify-center px-6 py-4 bg-white dark:bg-gray-700 border-2 border-green-200 dark:border-green-600 rounded-xl text-green-700 dark:text-green-400 font-bold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">

                          <EyeIcon className="h-5 w-5 mr-2" />
                          Prévisualiser
                        </motion.button>
                        <motion.button
                      whileHover={{
                        scale: 1.02
                      }}
                      whileTap={{
                        scale: 0.98
                      }}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">

                          <DownloadIcon className="h-5 w-5 mr-2" />
                          Télécharger
                        </motion.button>
                      </div>
                    </motion.div>
                }
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-2xl border-t-2 border-gray-100 dark:border-gray-600 flex justify-end sticky bottom-0">
                  <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() => setShowGenerateModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">

                    Fermer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

};
export default ReportGeneration;