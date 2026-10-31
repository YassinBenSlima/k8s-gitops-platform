import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  FileTextIcon,
  CheckCircleIcon,
  DownloadIcon,
  PrinterIcon,
  MailIcon,
  EyeIcon,
  SparklesIcon } from
'lucide-react';
interface GenerateReportModalProps {
  patientName: string;
  analysisData: any;
  onClose: () => void;
}
const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  patientName,
  analysisData,
  onClose
}) => {
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    clinicalDetails: true,
    treatmentRecommendations: true,
    expectedOutcomes: true,
    aiConfidence: true,
    similarCases: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const sections = [
  {
    id: 'summary',
    name: 'Synthèse du cas',
    description: 'Type de cas et complexité'
  },
  {
    id: 'clinicalDetails',
    name: 'Détails cliniques',
    description: 'Mesures et caractéristiques détectées'
  },
  {
    id: 'treatmentRecommendations',
    name: 'Recommandations de traitement',
    description: 'Plans suggérés et options'
  },
  {
    id: 'expectedOutcomes',
    name: 'Résultats attendus',
    description: 'Prévisions et objectifs'
  },
  {
    id: 'aiConfidence',
    name: 'Facteurs de confiance IA',
    description: "Fiabilité de l'analyse"
  },
  {
    id: 'similarCases',
    name: 'Cas similaires',
    description: 'Comparaison avec la base de données'
  }];

  const handleToggleSection = (sectionId: string) => {
    setSelectedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 2000);
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-start">
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

                <FileTextIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Générer un rapport complet
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Rapport détaillé avec analyse pour {patientName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!reportGenerated ?
          <div className="space-y-6">
              {/* Section Selection */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Sélectionner les sections à inclure
                </h4>
                <div className="space-y-3">
                  {sections.map((section) =>
                <motion.div
                  key={section.id}
                  whileHover={{
                    scale: 1.01
                  }}
                  onClick={() => handleToggleSection(section.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedSections[section.id] ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>

                      <div className="flex items-start">
                        <div
                      className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center mr-3 transition-all ${selectedSections[section.id] ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>

                          {selectedSections[section.id] &&
                      <CheckCircleIcon className="h-4 w-4 text-white" />
                      }
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {section.name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                )}
                </div>
              </div>
              {/* Format Options */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Format du rapport
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                  whileHover={{
                    scale: 1.02
                  }}
                  className="p-4 bg-white rounded-lg border-2 border-purple-200 cursor-pointer hover:border-purple-500 transition-all">

                    <FileTextIcon className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm font-bold text-gray-900">PDF</p>
                    <p className="text-xs text-gray-600">Document imprimable</p>
                  </motion.div>
                  <motion.div
                  whileHover={{
                    scale: 1.02
                  }}
                  className="p-4 bg-white rounded-lg border-2 border-purple-200 cursor-pointer hover:border-purple-500 transition-all">

                    <FileTextIcon className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm font-bold text-gray-900">Word</p>
                    <p className="text-xs text-gray-600">Document éditable</p>
                  </motion.div>
                  <motion.div
                  whileHover={{
                    scale: 1.02
                  }}
                  className="p-4 bg-white rounded-lg border-2 border-purple-200 cursor-pointer hover:border-purple-500 transition-all">

                    <FileTextIcon className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm font-bold text-gray-900">HTML</p>
                    <p className="text-xs text-gray-600">Format web</p>
                  </motion.div>
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
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all">

                {isGenerating ?
              <span className="flex items-center justify-center">
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
                  </span> :

              <span className="flex items-center justify-center">
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Générer le rapport
                  </span>
              }
              </motion.button>
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
            className="space-y-6">

              {/* Success Message */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200 text-center">
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
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Rapport généré avec succès!
                </h4>
                <p className="text-sm text-gray-600">
                  Votre rapport complet est prêt à être téléchargé ou partagé
                </p>
              </div>
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all">

                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Télécharger PDF
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all">

                  <EyeIcon className="h-5 w-5 mr-2" />
                  Aperçu
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all">

                  <PrinterIcon className="h-5 w-5 mr-2" />
                  Imprimer
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all">

                  <MailIcon className="h-5 w-5 mr-2" />
                  Envoyer par email
                </motion.button>
              </div>
            </motion.div>
          }
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-end">
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
          </div>
        </div>
      </motion.div>
    </div>);

};
export default GenerateReportModal;