import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CalendarIcon,
  InfoIcon,
  FileTextIcon,
  ImageIcon,
  ScanIcon,
  ClipboardListIcon } from
'lucide-react';
import ScheduleExamsModal from './ScheduleExamsModal';
interface AdditionalExamsModalProps {
  patientName: string;
  analysisData: any;
  onClose: () => void;
}
const AdditionalExamsModal: React.FC<AdditionalExamsModalProps> = ({
  patientName,
  analysisData,
  onClose
}) => {
  const [selectedExams, setSelectedExams] = useState<number[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const recommendedExams = [
  {
    id: 1,
    name: 'Téléradiographie de profil',
    priority: 'high',
    reason:
    'Nécessaire pour évaluer précisément la relation squelettique et planifier le traitement de classe II',
    description:
    'Radiographie latérale du crâne permettant une analyse céphalométrique complète',
    estimatedCost: '€€',
    duration: '15 min',
    icon: ScanIcon
  },
  {
    id: 2,
    name: 'Radiographie panoramique',
    priority: 'medium',
    reason:
    "Permet de vérifier l'état des dents de sagesse et détecter d'éventuelles anomalies",
    description: "Vue d'ensemble des structures dentaires et osseuses",
    estimatedCost: '€',
    duration: '10 min',
    icon: ImageIcon
  },
  {
    id: 3,
    name: 'Scan 3D intra-oral',
    priority: 'high',
    reason:
    "Indispensable pour la planification précise du traitement et la fabrication d'appareils",
    description: 'Empreinte numérique 3D des arcades dentaires',
    estimatedCost: '€€',
    duration: '20 min',
    icon: ScanIcon
  },
  {
    id: 4,
    name: 'Photos intra-orales et faciales',
    priority: 'medium',
    reason: "Documentation du cas et suivi de l'évolution du traitement",
    description: "Série de photos standardisées pour l'analyse et le suivi",
    estimatedCost: '€',
    duration: '15 min',
    icon: ImageIcon
  },
  {
    id: 5,
    name: 'Analyse fonctionnelle',
    priority: 'low',
    reason: 'Évaluation des dysfonctions et parafonctions éventuelles',
    description: 'Examen de la fonction masticatoire et des articulations',
    estimatedCost: '€',
    duration: '30 min',
    icon: ClipboardListIcon
  }];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'from-red-50 to-orange-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800',
          icon: 'bg-red-500'
        };
      case 'medium':
        return {
          bg: 'from-yellow-50 to-amber-50',
          border: 'border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-800',
          icon: 'bg-yellow-500'
        };
      case 'low':
        return {
          bg: 'from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-800',
          icon: 'bg-blue-500'
        };
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          badge: 'bg-gray-100 text-gray-800',
          icon: 'bg-gray-500'
        };
    }
  };
  const handleToggleExam = (examId: number) => {
    setSelectedExams((prev) =>
    prev.includes(examId) ?
    prev.filter((id) => id !== examId) :
    [...prev, examId]
    );
  };
  const handleScheduleExams = () => {
    if (selectedExams.length > 0) {
      setShowScheduleModal(true);
    }
  };
  const handleScheduleComplete = () => {
    setShowScheduleModal(false);
    onClose();
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
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
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

                <AlertCircleIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Examens complémentaires suggérés
                </h3>
                <p className="text-purple-100 text-sm mt-1">
                  Recommandations pour {patientName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Examens suggérés</p>
              <p className="text-2xl font-bold">{recommendedExams.length}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Priorité haute</p>
              <p className="text-2xl font-bold">
                {recommendedExams.filter((e) => e.priority === 'high').length}
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Sélectionnés</p>
              <p className="text-2xl font-bold">{selectedExams.length}</p>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Info Banner */}
          <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
            <div className="flex items-start">
              <InfoIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  Pourquoi ces examens sont recommandés?
                </p>
                <p className="text-xs text-gray-700">
                  L'IA a identifié que ces examens complémentaires permettraient
                  d'affiner le diagnostic et d'optimiser le plan de traitement
                  pour ce cas de classe II division 1.
                </p>
              </div>
            </div>
          </div>
          {/* Exams List */}
          <div className="space-y-4">
            {recommendedExams.map((exam, index) => {
              const colors = getPriorityColor(exam.priority);
              const ExamIcon = exam.icon;
              const isSelected = selectedExams.includes(exam.id);
              return (
                <motion.div
                  key={exam.id}
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
                  whileHover={{
                    scale: 1.01
                  }}
                  onClick={() => handleToggleExam(exam.id)}
                  className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border-2 ${isSelected ? 'border-purple-500 shadow-lg' : colors.border} cursor-pointer transition-all`}>

                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full ${colors.icon} flex items-center justify-center mr-4`}>

                      <ExamIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="text-lg font-bold text-gray-900">
                            {exam.name}
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            {exam.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>

                            {exam.priority === 'high' ?
                            'Priorité haute' :
                            exam.priority === 'medium' ?
                            'Priorité moyenne' :
                            'Priorité basse'}
                          </span>
                          {isSelected &&
                          <motion.div
                            initial={{
                              scale: 0
                            }}
                            animate={{
                              scale: 1
                            }}
                            className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">

                              <CheckCircleIcon className="h-4 w-4 text-white" />
                            </motion.div>
                          }
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          Raison de la recommandation:
                        </p>
                        <p className="text-xs text-gray-600">{exam.reason}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {exam.duration}
                        </span>
                        <span className="flex items-center">
                          <FileTextIcon className="h-4 w-4 mr-1" />
                          Coût: {exam.estimatedCost}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>);

            })}
          </div>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {selectedExams.length} examen(s) sélectionné(s)
            </p>
            <div className="flex space-x-3">
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
              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handleScheduleExams}
                disabled={selectedExams.length === 0}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg disabled:from-gray-400 disabled:to-gray-500 transition-all">

                <CalendarIcon className="h-4 w-4 mr-2" />
                Planifier les examens
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal &&
        <ScheduleExamsModal
          patientName={patientName}
          selectedExams={recommendedExams.filter((exam) =>
          selectedExams.includes(exam.id)
          )}
          onClose={() => setShowScheduleModal(false)}
          onScheduleComplete={handleScheduleComplete} />

        }
      </AnimatePresence>
    </div>);

};
export default AdditionalExamsModal;