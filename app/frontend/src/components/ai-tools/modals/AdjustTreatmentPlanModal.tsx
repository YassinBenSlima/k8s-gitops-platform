import React, { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  ZapIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  CalendarIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  SaveIcon,
  InfoIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BarChart2Icon,
  TargetIcon,
  ActivityIcon,
  FileTextIcon } from
'lucide-react';
interface AdjustTreatmentPlanModalProps {
  patient: any;
  detectedIssues: any[];
  onClose: () => void;
  onComplete: () => void;
}
const AdjustTreatmentPlanModal: React.FC<AdjustTreatmentPlanModalProps> = ({
  patient,
  detectedIssues,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [treatmentSteps, setTreatmentSteps] = useState([
  {
    id: 1,
    name: "Pose de l'appareil",
    duration: '1 séance',
    status: 'completed',
    notes: ''
  },
  {
    id: 2,
    name: 'Alignement initial',
    duration: '6 mois',
    status: 'in-progress',
    notes: 'Progression plus lente que prévu'
  },
  {
    id: 3,
    name: 'Correction de classe II',
    duration: '12 mois',
    status: 'pending',
    notes: ''
  },
  {
    id: 4,
    name: 'Finition et détails',
    duration: '6 mois',
    status: 'pending',
    notes: ''
  },
  {
    id: 5,
    name: 'Retrait et contention',
    duration: '1 séance',
    status: 'pending',
    notes: ''
  }]
  );
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [newStepName, setNewStepName] = useState('');
  const [newStepDuration, setNewStepDuration] = useState('');
  const [adjustments, setAdjustments] = useState({
    totalDuration: '24 mois',
    newEstimate: '26 mois',
    visits: '18',
    newVisits: '20',
    goals: [
    'Correction complète du surplomb horizontal',
    'Alignement optimal des arcades',
    'Amélioration du profil facial'],

    notes: ''
  });
  const [showAddStep, setShowAddStep] = useState(false);
  const handleStepEdit = (stepId: number) => {
    setEditingStepId(stepId);
  };
  const handleStepSave = (stepId: number, updates: any) => {
    setTreatmentSteps(
      treatmentSteps.map((step) =>
      step.id === stepId ?
      {
        ...step,
        ...updates
      } :
      step
      )
    );
    setEditingStepId(null);
  };
  const handleStepDelete = (stepId: number) => {
    setTreatmentSteps(treatmentSteps.filter((step) => step.id !== stepId));
  };
  const handleStepMove = (stepId: number, direction: 'up' | 'down') => {
    const index = treatmentSteps.findIndex((step) => step.id === stepId);
    if (
    direction === 'up' && index === 0 ||
    direction === 'down' && index === treatmentSteps.length - 1)
    {
      return;
    }
    const newSteps = [...treatmentSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [
    newSteps[targetIndex],
    newSteps[index]];

    setTreatmentSteps(newSteps);
  };
  const handleAddStep = () => {
    if (newStepName && newStepDuration) {
      const newStep = {
        id: Math.max(...treatmentSteps.map((s) => s.id)) + 1,
        name: newStepName,
        duration: newStepDuration,
        status: 'pending' as const,
        notes: ''
      };
      setTreatmentSteps([...treatmentSteps, newStep]);
      setNewStepName('');
      setNewStepDuration('');
      setShowAddStep(false);
    }
  };
  const handleGoalAdd = () => {
    const newGoal = prompt('Ajouter un nouvel objectif:');
    if (newGoal) {
      setAdjustments({
        ...adjustments,
        goals: [...adjustments.goals, newGoal]
      });
    }
  };
  const handleGoalDelete = (index: number) => {
    setAdjustments({
      ...adjustments,
      goals: adjustments.goals.filter((_, i) => i !== index)
    });
  };
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleConfirmAdjustments = () => {
    onComplete();
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'in-progress':
        return 'En cours';
      case 'pending':
        return 'À venir';
      default:
        return 'À venir';
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
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
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
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

                <ZapIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Ajuster le plan de traitement
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  Pour {patient.name} - {detectedIssues.length} problème(s)
                  détecté(s)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Progress Steps */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) =>
            <Fragment key={step}>
                <div className="flex items-center flex-1">
                  <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${step === currentStep ? 'bg-white text-blue-600' : step < currentStep ? 'bg-white bg-opacity-30 text-white' : 'bg-white bg-opacity-10 text-white'}`}>

                    {step < currentStep ?
                  <CheckCircleIcon className="h-5 w-5" /> :

                  step
                  }
                  </div>
                  <div className="ml-2 flex-1">
                    <p className="text-xs text-white font-medium">
                      {step === 1 ?
                    'Problèmes' :
                    step === 2 ?
                    'Ajustements' :
                    'Validation'}
                    </p>
                  </div>
                </div>
                {step < 3 &&
              <ArrowRightIcon className="h-4 w-4 text-white flex-shrink-0" />
              }
              </Fragment>
            )}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Review Issues */}
            {currentStep === 1 &&
            <motion.div
              key="step1"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-6">

                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Problèmes identifiés nécessitant des ajustements
                      </p>
                      <p className="text-xs text-gray-700">
                        Examinez les problèmes détectés avant de procéder aux
                        ajustements
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {detectedIssues.map((issue, index) =>
                <motion.div
                  key={issue.id}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.1
                  }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200">

                      <div className="flex items-start mb-4">
                        <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center mr-4">
                          <AlertCircleIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 mb-2">
                            {issue.title}
                          </h5>
                          <p className="text-sm text-gray-700 mb-3">
                            {issue.description}
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-xs font-bold text-gray-700 mb-2">
                          Recommandations:
                        </p>
                        <ul className="space-y-2">
                          {issue.recommendations.map(
                        (rec: string, idx: number) =>
                        <li
                          key={idx}
                          className="flex items-start text-sm text-gray-700">

                                <ArrowRightIcon className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{rec}</span>
                              </li>

                      )}
                        </ul>
                      </div>
                    </motion.div>
                )}
                </div>
              </motion.div>
            }
            {/* Step 2: Adjust Treatment Steps */}
            {currentStep === 2 &&
            <motion.div
              key="step2"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-6">

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-start">
                    <EditIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Modifier les étapes du traitement
                      </p>
                      <p className="text-xs text-gray-700">
                        Ajustez, ajoutez ou supprimez des étapes selon les
                        besoins
                      </p>
                    </div>
                  </div>
                </div>
                {/* Treatment Steps */}
                <div className="space-y-3">
                  {treatmentSteps.map((step, index) =>
                <motion.div
                  key={step.id}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.05
                  }}
                  className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm">

                      {editingStepId === step.id ?
                  <div className="space-y-3">
                          <input
                      type="text"
                      defaultValue={step.name}
                      className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom de l'étape"
                      onBlur={(e) =>
                      handleStepSave(step.id, {
                        name: e.target.value
                      })
                      } />

                          <input
                      type="text"
                      defaultValue={step.duration}
                      className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Durée"
                      onBlur={(e) =>
                      handleStepSave(step.id, {
                        duration: e.target.value
                      })
                      } />

                          <textarea
                      defaultValue={step.notes}
                      className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Notes (optionnel)"
                      rows={2}
                      onBlur={(e) =>
                      handleStepSave(step.id, {
                        notes: e.target.value
                      })
                      } />

                          <button
                      onClick={() => setEditingStepId(null)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium">

                            Terminer l'édition
                          </button>
                        </div> :

                  <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mr-4">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h6 className="font-bold text-gray-900">
                                {step.name}
                              </h6>
                              <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusColor(step.status)}`}>

                                {getStatusLabel(step.status)}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {step.duration}
                            </div>
                            {step.notes &&
                      <p className="text-sm text-gray-600 bg-gray-50 rounded p-2 border border-gray-200">
                                {step.notes}
                              </p>
                      }
                          </div>
                          <div className="flex flex-col space-y-1 ml-3">
                            <button
                        onClick={() => handleStepMove(step.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">

                              <ChevronUpIcon className="h-4 w-4" />
                            </button>
                            <button
                        onClick={() => handleStepMove(step.id, 'down')}
                        disabled={index === treatmentSteps.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">

                              <ChevronDownIcon className="h-4 w-4" />
                            </button>
                            <button
                        onClick={() => handleStepEdit(step.id)}
                        className="p-1 text-blue-400 hover:text-blue-600 transition-colors">

                              <EditIcon className="h-4 w-4" />
                            </button>
                            <button
                        onClick={() => handleStepDelete(step.id)}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors">

                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                  }
                    </motion.div>
                )}
                  {/* Add New Step */}
                  {showAddStep ?
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto'
                  }}
                  className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">

                      <div className="space-y-3">
                        <input
                      type="text"
                      value={newStepName}
                      onChange={(e) => setNewStepName(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom de la nouvelle étape" />

                        <input
                      type="text"
                      value={newStepDuration}
                      onChange={(e) => setNewStepDuration(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Durée (ex: 3 mois)" />

                        <div className="flex space-x-2">
                          <button
                        onClick={handleAddStep}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">

                            <SaveIcon className="h-4 w-4 mr-2" />
                            Ajouter
                          </button>
                          <button
                        onClick={() => {
                          setShowAddStep(false);
                          setNewStepName('');
                          setNewStepDuration('');
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">

                            Annuler
                          </button>
                        </div>
                      </div>
                    </motion.div> :

                <button
                  onClick={() => setShowAddStep(true)}
                  className="w-full py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center">

                      <PlusIcon className="h-5 w-5 mr-2" />
                      Ajouter une étape
                    </button>
                }
                </div>
                {/* Adjustments Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                    <h6 className="font-bold text-gray-900 mb-3 flex items-center">
                      <BarChart2Icon className="h-5 w-5 mr-2 text-purple-600" />
                      Estimations
                    </h6>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-purple-200">
                        <label className="text-xs font-medium text-gray-600 block mb-1">
                          Durée totale
                        </label>
                        <input
                        type="text"
                        value={adjustments.newEstimate}
                        onChange={(e) =>
                        setAdjustments({
                          ...adjustments,
                          newEstimate: e.target.value
                        })
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />

                      </div>
                      <div className="bg-white rounded-lg p-3 border border-purple-200">
                        <label className="text-xs font-medium text-gray-600 block mb-1">
                          Nombre de visites
                        </label>
                        <input
                        type="text"
                        value={adjustments.newVisits}
                        onChange={(e) =>
                        setAdjustments({
                          ...adjustments,
                          newVisits: e.target.value
                        })
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />

                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                    <h6 className="font-bold text-gray-900 mb-3 flex items-center">
                      <TargetIcon className="h-5 w-5 mr-2 text-green-600" />
                      Objectifs
                    </h6>
                    <div className="space-y-2">
                      {adjustments.goals.map((goal, index) =>
                    <div
                      key={index}
                      className="bg-white rounded-lg p-2 border border-green-200 flex items-start justify-between">

                          <span className="text-sm text-gray-700 flex-1">
                            {goal}
                          </span>
                          <button
                        onClick={() => handleGoalDelete(index)}
                        className="ml-2 text-red-400 hover:text-red-600">

                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                    )}
                      <button
                      onClick={handleGoalAdd}
                      className="w-full py-2 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:border-green-400 hover:bg-green-50 transition-all text-sm flex items-center justify-center">

                        <PlusIcon className="h-4 w-4 mr-1" />
                        Ajouter un objectif
                      </button>
                    </div>
                  </div>
                </div>
                {/* Notes */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                  <h6 className="font-bold text-gray-900 mb-3 flex items-center">
                    <FileTextIcon className="h-5 w-5 mr-2 text-amber-600" />
                    Notes sur les ajustements
                  </h6>
                  <textarea
                  value={adjustments.notes}
                  onChange={(e) =>
                  setAdjustments({
                    ...adjustments,
                    notes: e.target.value
                  })
                  }
                  className="w-full px-3 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder="Ajoutez des notes sur les raisons de ces ajustements..."
                  rows={3} />

                </div>
              </motion.div>
            }
            {/* Step 3: Review & Confirm */}
            {currentStep === 3 &&
            <motion.div
              key="step3"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-6">

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Récapitulatif des ajustements
                      </p>
                      <p className="text-xs text-gray-700">
                        Vérifiez tous les changements avant de confirmer
                      </p>
                    </div>
                  </div>
                </div>
                {/* Changes Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                    <h6 className="font-bold text-gray-900 mb-3">Avant</h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">
                          {adjustments.totalDuration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visites:</span>
                        <span className="font-medium">
                          {adjustments.visits}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Étapes:</span>
                        <span className="font-medium">5</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                    <h6 className="font-bold text-gray-900 mb-3">Après</h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-bold text-blue-600">
                          {adjustments.newEstimate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Visites:</span>
                        <span className="font-bold text-blue-600">
                          {adjustments.newVisits}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Étapes:</span>
                        <span className="font-bold text-blue-600">
                          {treatmentSteps.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Updated Steps */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                  <h6 className="font-bold text-gray-900 mb-3">
                    Nouveau plan de traitement
                  </h6>
                  <div className="space-y-2">
                    {treatmentSteps.map((step, index) =>
                  <div
                    key={step.id}
                    className="bg-white rounded-lg p-3 border border-purple-200 flex items-center">

                        <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {step.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {step.duration}
                          </p>
                        </div>
                        <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(step.status)}`}>

                          {getStatusLabel(step.status)}
                        </span>
                      </div>
                  )}
                  </div>
                </div>
                {/* Updated Goals */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                  <h6 className="font-bold text-gray-900 mb-3">
                    Objectifs mis à jour
                  </h6>
                  <ul className="space-y-2">
                    {adjustments.goals.map((goal, index) =>
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-700 bg-white rounded-lg p-2 border border-green-200">

                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{goal}</span>
                      </li>
                  )}
                  </ul>
                </div>
                {/* Notes */}
                {adjustments.notes &&
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                    <h6 className="font-bold text-gray-900 mb-2">Notes</h6>
                    <p className="text-sm text-gray-700">{adjustments.notes}</p>
                  </div>
              }
                {/* Warning */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-start">
                    <InfoIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-1">Important:</p>
                      <p>
                        Ces ajustements seront enregistrés dans le dossier
                        patient et un email de notification sera envoyé au
                        patient pour l'informer des changements.
                      </p>
                    </div>
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
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

              <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" />
              Précédent
            </motion.button>
            {currentStep < 3 ?
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleNextStep}
              className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all">

                Suivant
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </motion.button> :

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleConfirmAdjustments}
              className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all">

                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Confirmer les ajustements
              </motion.button>
            }
          </div>
        </div>
      </motion.div>
    </div>);

};
export default AdjustTreatmentPlanModal;