import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  SearchIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
  EditIcon,
  EyeIcon,
  HeartIcon,
  StethoscopeIcon,
  BeakerIcon,
  PillIcon,
  LinkIcon,
  BarChart2Icon,
  PlayIcon,
  PauseIcon,
  XCircleIcon,
  XIcon,
  CheckIcon } from
'lucide-react';
import { usePatient } from '../contexts/PatientContext';
interface Protocol {
  id: string;
  name: string;
  category: string;
  description: string;
  steps: number;
  stepDetails: {
    id: string;
    label: string;
    description: string;
  }[];
  duration: string;
  activePatients: number;
  completedPatients: number;
  status: 'active' | 'draft' | 'archived';
  color: string;
  icon: React.ElementType;
}
interface PatientProtocol {
  id: string;
  patient: string;
  protocol: string;
  currentStep: number;
  totalSteps: number;
  startDate: string;
  nextAction: string;
  status: 'on_track' | 'delayed' | 'completed' | 'paused';
  progress: number;
}
const initialProtocols: Protocol[] = [
{
  id: 'p1',
  name: 'Suivi Post-Infarctus',
  category: 'Cardiologie',
  description: 'Protocole de réadaptation et suivi après infarctus du myocarde avec ECG et biologie',
  steps: 5,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation post-sortie hospitalière',
    description: 'Évaluation clinique et tolerance du traitement à J7'
  },
  {
    id: 's2',
    label: 'ECG et biomarqueurs',
    description: 'ECG de contrôle et troponine ultrasensible'
  },
  {
    id: 's3',
    label: 'Écocardiographie de fonction',
    description: 'Évaluation FEVG et cinétique segmentaire'
  },
  {
    id: 's4',
    label: 'Réadaptation cardiaque',
    description: 'Programme d\'exercices supervisés et éducation'
  },
  {
    id: 's5',
    label: 'Suivi à 3 mois',
    description: 'Contrôle clinique et biologique à M3'
  }],

  duration: '3 mois',
  activePatients: 18,
  completedPatients: 47,
  status: 'active',
  color: 'bg-red-50 border-red-200 text-red-700',
  icon: HeartIcon
},
{
  id: 'p2',
  name: 'Gestion Insuffisance Cardiaque',
  category: 'Cardiologie',
  description: 'Protocole de gestion de l\'insuffisance cardiaque avec optimisation thérapeutique',
  steps: 6,
  stepDetails: [
  {
    id: 's1',
    label: 'Évaluation initiale',
    description: 'Anamnèse complète, examen clinique et classification NYHA'
  },
  {
    id: 's2',
    label: 'Bilan d\'imagerie',
    description: 'Écocardiographie 2D-3D avec mesure FEVG'
  },
  {
    id: 's3',
    label: 'Bilan biologique',
    description: 'BNP, créatinine, ionogramme, troponine'
  },
  {
    id: 's4',
    label: 'Initiation traitement',
    description: 'IECA/ARA2, bêtabloquant, diurétiques selon FEVG'
  },
  {
    id: 's5',
    label: 'Suivi à 2 semaines',
    description: 'Contrôle de la tolérance et de l\'efficacité'
  },
  {
    id: 's6',
    label: 'Bilan à 6 semaines',
    description: 'ECG, BNP et ajustement thérapeutique'
  }],

  duration: '6 semaines',
  activePatients: 24,
  completedPatients: 58,
  status: 'active',
  color: 'bg-red-50 border-red-200 text-red-700',
  icon: HeartIcon
},
{
  id: 'p3',
  name: 'Fibrillation Auriculaire',
  category: 'Cardiologie',
  description: 'Suivi et anticoagulation de la fibrillation auriculaire avec score CHA2DS2-VASc',
  steps: 5,
  stepDetails: [
  {
    id: 's1',
    label: 'Diagnostic et stratification',
    description: 'Confirmation par ECG 12 dérivations et évaluation du risque'
  },
  {
    id: 's2',
    label: 'Holter-ECG',
    description: 'Enregistrement 24-48h pour documenter les arythmies'
  },
  {
    id: 's3',
    label: 'Initiation anticoagulation',
    description: 'AOD ou AVK selon CHA2DS2-VASc et HAS-BLED'
  },
  {
    id: 's4',
    label: 'Contrôle ECG et INR',
    description: 'Suivi des paramètres de coagulation'
  },
  {
    id: 's5',
    label: 'Suivi clinique trimestrial',
    description: 'Évaluation symptomatique et adaptation traitement'
  }],

  duration: '3 mois',
  activePatients: 31,
  completedPatients: 72,
  status: 'active',
  color: 'bg-red-50 border-red-200 text-red-700',
  icon: HeartIcon
},
{
  id: 'p4',
  name: 'Maladie Coronarienne Stable',
  category: 'Cardiologie',
  description: 'Suivi de la maladie coronarienne avec test fonctionnel et optimisation thérapeutique',
  steps: 4,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation initiale',
    description: 'Anamnèse, examen clinique et classification des symptômes'
  },
  {
    id: 's2',
    label: 'Test de stress / Scintigraphie',
    description: 'Épreuve d\'effort ou imagerie fonctionnelle myocardique'
  },
  {
    id: 's3',
    label: 'Angiographie coronarienne si +',
    description: 'Coronarographie et évaluation de la revascularisation'
  },
  {
    id: 's4',
    label: 'Suivi personnalisé',
    description: 'Plan de traitement et suivi ambulatoire à 1-3 mois'
  }],

  duration: '3 mois',
  activePatients: 16,
  completedPatients: 53,
  status: 'active',
  color: 'bg-red-50 border-red-200 text-red-700',
  icon: HeartIcon
},
{
  id: 'p5',
  name: 'Évaluation Pré-opératoire',
  category: 'Cardiologie',
  description: 'Bilan cardiologique pré-chirurgical pour évaluation du risque périopératoire',
  steps: 4,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation préopératoire',
    description: 'Anamnèse cardiaque et évaluation du risque SCORE'
  },
  {
    id: 's2',
    label: 'ECG et bilan biologique',
    description: 'ECG 12D, troponine, ionogramme, créatinine'
  },
  {
    id: 's3',
    label: 'Écocardiographie si indiquée',
    description: 'Imagerie selon facteurs de risque et type de chirurgie'
  },
  {
    id: 's4',
    label: 'Clearance cardiaque',
    description: 'Avis et recommandations pour l\'équipe chirurgicale'
  }],

  duration: '2 semaines',
  activePatients: 12,
  completedPatients: 89,
  status: 'active',
  color: 'bg-red-50 border-red-200 text-red-700',
  icon: HeartIcon
},
{
  id: 'p6',
  name: 'Suivi Implants Cardiaques',
  category: 'Cardiologie',
  description: 'Suivi régulier des pacemakers, défibrillateurs et resynchronisateurs',
  steps: 4,
  stepDetails: [
  {
    id: 's1',
    label: 'Consultation post-implantation',
    description: 'Vérification du pansement et absence de complications'
  },
  {
    id: 's2',
    label: 'Programmation initiale',
    description: 'Seuil de stimulation et sensibilité optimisés'
  },
  {
    id: 's3',
    label: 'Interrogation de l\'appareil',
    description: 'Vérification de l\'intégrité et programmation'
  },
  {
    id: 's4',
    label: 'Suivi ambulatoire annuel',
    description: 'Télésurveillance ou consultation annuelle'
  }],

  duration: '1 an',
  activePatients: 28,
  completedPatients: 156,
  status: 'active',
  color: 'bg-red-50 border-red-200 text-red-700',
  icon: HeartIcon
}];

const initialPatientProtocols: PatientProtocol[] = [
{
  id: 'pp1',
  patient: 'Jean-Pierre Leclerc',
  protocol: 'Suivi Post-Infarctus',
  currentStep: 3,
  totalSteps: 5,
  startDate: '08/01/2025',
  nextAction: 'Écocardiographie de contrôle',
  status: 'on_track',
  progress: 60
},
{
  id: 'pp2',
  patient: 'Marie Françoise Vincent',
  protocol: 'Gestion Insuffisance Cardiaque',
  currentStep: 4,
  totalSteps: 6,
  startDate: '02/01/2025',
  nextAction: 'Suivi à 2 semaines - Contrôle tolérance',
  status: 'on_track',
  progress: 65
},
{
  id: 'pp3',
  patient: 'Claude Bernard',
  protocol: 'Fibrillation Auriculaire',
  currentStep: 2,
  totalSteps: 5,
  startDate: '22/12/2024',
  nextAction: 'Holter-ECG 24h à réaliser',
  status: 'delayed',
  progress: 40
},
{
  id: 'pp4',
  patient: 'Stéphanie Moreau',
  protocol: 'Maladie Coronarienne Stable',
  currentStep: 4,
  totalSteps: 4,
  startDate: '05/01/2025',
  nextAction: 'Parcours terminé - Suivi annuel prévu',
  status: 'completed',
  progress: 100
},
{
  id: 'pp5',
  patient: 'Michel Antoine Dupuis',
  protocol: 'Suivi Implants Cardiaques',
  currentStep: 2,
  totalSteps: 4,
  startDate: '25/11/2024',
  nextAction: 'Interrogation de l\'appareil programmée',
  status: 'on_track',
  progress: 50
}];

const statusConfig = {
  on_track: {
    label: 'En cours',
    color: 'bg-emerald-100 text-emerald-700'
  },
  delayed: {
    label: 'En retard',
    color: 'bg-red-100 text-red-700'
  },
  completed: {
    label: 'Terminé',
    color: 'bg-rose-100 text-rose-700'
  },
  paused: {
    label: 'Pausé',
    color: 'bg-gray-100 text-gray-600'
  }
};
const protocolStatusConfig = {
  active: {
    label: 'Actif',
    pill: 'bg-red-100 text-red-700 border-red-200'
  },
  draft: {
    label: 'Brouillon',
    pill: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  archived: {
    label: 'Archivé',
    pill: 'bg-gray-100 text-gray-600 border-gray-200'
  }
};
const getProtocolColorByCategory = (category: string) => {
  const palette: Record<string, string> = {
    Cardiologie: 'bg-red-50 border-red-200 text-red-700'
  };
  return palette[category] ?? 'bg-red-50 border-red-200 text-red-700';
};
const categories = [
'Tous',
'Cardiologie'];

const protocolCategories = categories.filter((c) => c !== 'Tous');
function generateSteps(
count: number,
protocolName: string)
: {
  label: string;
  done: boolean;
}[] {
  const stepTemplates = [
  'Consultation initiale',
  'Bilan biologique',
  'Examen clinique complet',
  'Ajustement thérapeutique',
  'Suivi à 1 mois',
  'Contrôle de suivi',
  'Évaluation intermédiaire',
  "Bilan d'imagerie"];

  return Array.from(
    {
      length: count
    },
    (_, i) => ({
      label: `Étape ${i + 1}: ${stepTemplates[i % stepTemplates.length]}`,
      done: i < Math.floor(count / 2)
    })
  );
}
function buildNextAction(currentStep: number, totalSteps: number, protocol: string) {
  if (currentStep >= totalSteps) {
    return 'Parcours terminé';
  }
  return `Étape ${currentStep + 1}/${totalSteps} à préparer · ${protocol}`;
}
// Backdrop + modal wrapper
function ModalBackdrop({
  onClose,
  children



}: {onClose: () => void;children: React.ReactNode;}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full flex items-center justify-center px-4">

        {children}
      </div>
    </div>);

}
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 8
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8
  }
};
// ─── VIEW PROTOCOL MODAL ───────────────────────────────────────────────────────
function ViewProtocolModal({
  protocol,
  onClose,
  onEdit,
  onAssign,
  onToggleStatus



}: {
  protocol: Protocol;
  onClose: () => void;
  onEdit: (protocol: Protocol) => void;
  onAssign: (protocol: Protocol) => void;
  onToggleStatus: (protocol: Protocol) => void;
}) {
  const Icon = protocol.icon;
  const protocolStatus = protocolStatusConfig[protocol.status];
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-red-800">{protocol.name}</h2>
            <p className="text-xs text-red-600 mt-0.5">{protocol.category} • {protocolStatus.label}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
        <p className="text-sm text-gray-600 mb-4">{protocol.description}</p>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center bg-red-50 rounded-xl p-3 border border-red-100">
            <p className="text-sm font-bold text-gray-900">{protocol.steps}</p>
            <p className="text-[10px] text-gray-500">étapes</p>
          </div>
          <div className="text-center bg-rose-50 rounded-xl p-3 border border-rose-100">
            <p className="text-sm font-bold text-rose-600">
              {protocol.activePatients}
            </p>
            <p className="text-[10px] text-gray-500">actifs</p>
          </div>
          <div className="text-center bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="text-sm font-bold text-emerald-600">
              {protocol.completedPatients}
            </p>
            <p className="text-[10px] text-gray-500">terminés</p>
          </div>
          <div className="text-center bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="text-sm font-bold text-amber-600">
              {protocol.duration}
            </p>
            <p className="text-[10px] text-gray-500">durée</p>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Étapes du protocole
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {protocol.stepDetails.map((step, i) =>
            <div key={step.id} className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-2.5">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-[10px] font-bold text-red-600">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">
                    {step.label}
                  </p>
                  {step.description &&
                <p className="text-[10px] text-gray-500 mt-0.5">
                      {step.description}
                    </p>
                }
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(protocol)}
            className="flex-1 text-xs border border-red-200 bg-red-50 text-red-700 py-2.5 rounded-xl font-medium hover:bg-red-100 transition-colors">
            Modifier
          </button>
          <button
            onClick={() => onAssign(protocol)}
            className="flex-1 text-xs bg-red-600 text-white py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors">
            Assigner un patient
          </button>
          <button
            onClick={() => onToggleStatus(protocol)}
            className="flex-1 text-xs border border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            {protocol.status === 'archived' ? 'Réactiver' : 'Archiver'}
          </button>
        </div>
        </div>
      </motion.div>
    </ModalBackdrop>);

}
// ─── EDIT / CREATE PROTOCOL MODAL ─────────────────────────────────────────────
function EditProtocolModal({
  protocol,
  onClose,
  onSave




}: {protocol: Protocol | null;onClose: () => void;onSave: (data: Partial<Protocol>) => void;}) {
  const isCreate = protocol === null;
  const [form, setForm] = useState({
    name: protocol?.name ?? '',
    category: protocol?.category ?? protocolCategories[0],
    description: protocol?.description ?? '',
    duration: protocol?.duration ?? ''
  });
  const [stepDetails, setStepDetails] = useState<
    {
      id: string;
      label: string;
      description: string;
    }[]>(

    protocol?.stepDetails ?? [
    {
      id: `s${Date.now()}`,
      label: '',
      description: ''
    }]

  );
  const addStep = () => {
    setStepDetails((prev) => [
    ...prev,
    {
      id: `s${Date.now()}`,
      label: '',
      description: ''
    }]
    );
  };
  const removeStep = (id: string) => {
    if (stepDetails.length <= 1) return;
    setStepDetails((prev) => prev.filter((s) => s.id !== id));
  };
  const updateStep = (
  id: string,
  field: 'label' | 'description',
  value: string) =>
  {
    setStepDetails((prev) =>
    prev.map((s) =>
    s.id === id ?
    {
      ...s,
      [field]: value
    } :
    s
    )
    );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      steps: stepDetails.length,
      stepDetails
    });
    onClose();
  };
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-red-800">
              {isCreate ? 'Nouveau protocole' : `Modifier: ${protocol?.name}`}
            </h2>
            <p className="text-xs text-red-600 mt-0.5">Structurez un parcours clair, lisible et actionnable pour l'équipe soignante.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Basic info */}
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Nom du protocole
            </label>
            <input
              required
              value={form.name}
              onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
              }
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              placeholder="Ex: Suivi post-AVC" />

          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Catégorie
            </label>
            <select
              value={form.category}
              onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value
              })
              }
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white">

              {protocolCategories.map((c) =>
              <option key={c} value={c}>
                  {c}
                </option>
              )}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
              }
              rows={2}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
              placeholder="Description du protocole..." />

          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Durée
            </label>
            <input
              value={form.duration}
              onChange={(e) =>
              setForm({
                ...form,
                duration: e.target.value
              })
              }
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              placeholder="Ex: 3 mois" />

          </div>

          {/* Steps builder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-700">
                Étapes du protocole
                <span className="ml-1.5 text-[10px] font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                  {stepDetails.length} étape{stepDetails.length > 1 ? 's' : ''}
                </span>
              </label>
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-1 text-[10px] text-red-600 hover:text-red-700 font-medium">

                <PlusIcon className="w-3 h-3" /> Ajouter une étape
              </button>
            </div>

            <div className="space-y-2">
              {stepDetails.map((step, i) =>
              <div
                key={step.id}
                className="flex items-start gap-2 bg-gray-50 rounded-xl border border-gray-100 p-2.5">

                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-1">
                    <span className="text-[10px] font-bold text-red-600">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                    required
                    value={step.label}
                    onChange={(e) =>
                    updateStep(step.id, 'label', e.target.value)
                    }
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-400 bg-white"
                    placeholder={`Nom de l'étape ${i + 1}`} />

                    <input
                    value={step.description}
                    onChange={(e) =>
                    updateStep(step.id, 'description', e.target.value)
                    }
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-red-400 bg-white text-gray-500"
                    placeholder="Description (optionnelle)" />

                  </div>
                  <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  disabled={stepDetails.length <= 1}
                  className="p-1 hover:bg-red-50 rounded text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mt-0.5">

                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-xs border border-gray-200 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">

              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 text-xs bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">

              {isCreate ? 'Créer' : 'Enregistrer'}
            </button>
          </div>
        </form>
        </div>
      </motion.div>
    </ModalBackdrop>);

}
// ─── ASSIGN PATIENT MODAL ──────────────────────────────────────────────────────
function AssignPatientModal({
  protocol,
  patientNames,
  onClose,
  onAssign




}: {protocol: Protocol;patientNames: string[];onClose: () => void;onAssign: (patient: string) => void;}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = patientNames.filter((p) =>
  p.toLowerCase().includes(search.toLowerCase())
  );
  const handleConfirm = () => {
    if (selected) {
      onAssign(selected);
      onClose();
    }
  };
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-red-800">Assigner un patient</h2>
            <p className="text-xs text-red-600 mt-0.5">Associez ce protocole à un dossier patient actif.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
        <p className="text-xs text-red-600 font-medium mb-4">
          Protocole: {protocol.name}
        </p>

        {/* Search */}
        <div className="relative mb-3">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            className="w-full text-xs border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
            placeholder="Rechercher un patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />

        </div>

        {/* Patient list */}
        <div className="space-y-1 max-h-52 overflow-y-auto mb-4">
          {filtered.map((name) =>
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${selected === name ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-50 border border-transparent'}`}>

              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-xs font-medium text-gray-800">{name}</span>
              {selected === name &&
            <CheckIcon className="w-3.5 h-3.5 text-red-600 ml-auto" />
            }
            </button>
          )}
          {filtered.length === 0 &&
          <p className="text-xs text-gray-400 text-center py-4">
              Aucun patient trouvé
            </p>
          }
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 text-xs border border-gray-200 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">

            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="flex-1 text-xs bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">

            Assigner
          </button>
        </div>
        </div>
      </motion.div>
    </ModalBackdrop>);

}
// ─── VIEW PATIENT PROTOCOL MODAL ──────────────────────────────────────────────
function ViewPatientProtocolModal({
  pp,
  onClose,
  onOpenPatient,
  onEdit,
  onAdvance,
  onTogglePause



}: {
  pp: PatientProtocol;
  onClose: () => void;
  onOpenPatient: (patientName: string) => void;
  onEdit: (pp: PatientProtocol) => void;
  onAdvance: (pp: PatientProtocol) => void;
  onTogglePause: (pp: PatientProtocol) => void;
}) {
  const status = statusConfig[pp.status];
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-red-800">Suivi patient</h2>
            <p className="text-xs text-red-600 mt-0.5">Suivez le parcours, son avancement et les prochaines tâches.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
        {/* Patient */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{pp.patient}</p>
            <p className="text-xs text-gray-500">{pp.protocol}</p>
          </div>
          <span
            className={`ml-auto text-xs px-2 py-0.5 rounded-full ${status.color}`}>

            {status.label}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-700">
              Progression
            </span>
            <span className="text-xs font-bold text-red-600">
              {pp.progress}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: `${pp.progress}%`
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut'
              }}
              className={`h-full rounded-full ${pp.status === 'completed' ? 'bg-emerald-500' : pp.status === 'delayed' ? 'bg-red-500' : pp.status === 'paused' ? 'bg-gray-400' : 'bg-red-500'}`} />

          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Étape {pp.currentStep} sur {pp.totalSteps}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Date de début</span>
            <span className="text-xs font-medium text-gray-800">
              {pp.startDate}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
            <span className="text-xs text-gray-500">Prochaine action</span>
            <span className="text-xs font-medium text-gray-800">
              {pp.nextAction}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-gray-500">Statut</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>

              {status.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenPatient(pp.patient)}
            className="text-xs border border-red-200 bg-red-50 text-red-700 py-2 rounded-xl font-medium hover:bg-red-100 transition-colors">
            Ouvrir le dossier
          </button>
          <button
            onClick={() => onEdit(pp)}
            className="text-xs border border-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Modifier
          </button>
          <button
            onClick={() => onAdvance(pp)}
            disabled={pp.status === 'completed'}
            className="text-xs bg-red-600 text-white py-2 rounded-xl font-medium hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            Avancer d'une étape
          </button>
          <button
            onClick={() => onTogglePause(pp)}
            disabled={pp.status === 'completed'}
            className="text-xs border border-amber-200 bg-amber-50 text-amber-700 py-2 rounded-xl font-medium hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            {pp.status === 'paused' ? 'Reprendre' : 'Mettre en pause'}
          </button>
        </div>
        </div>
      </motion.div>
    </ModalBackdrop>);

}
// ─── EDIT PATIENT PROTOCOL MODAL ──────────────────────────────────────────────
function EditPatientProtocolModal({
  pp,
  onClose,
  onSave




}: {pp: PatientProtocol;onClose: () => void;onSave: (updated: PatientProtocol) => void;}) {
  const [form, setForm] = useState({
    currentStep: pp.currentStep,
    status: pp.status,
    nextAction: pp.nextAction
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const progress = Math.round(form.currentStep / pp.totalSteps * 100);
    onSave({
      ...pp,
      ...form,
      progress
    });
    onClose();
  };
  return (
    <ModalBackdrop onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-red-800">Modifier le suivi</h2>
            <p className="text-xs text-red-600 mt-0.5">Ajustez l'étape, le statut et l'action suivante.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
        {/* Read-only info */}
        <div className="flex items-center gap-2 mb-4 p-2.5 bg-red-50 rounded-xl border border-red-100">
          <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
            <UserIcon className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">{pp.patient}</p>
            <p className="text-[10px] text-gray-500">{pp.protocol}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Étape actuelle (max: {pp.totalSteps})
            </label>
            <input
              type="number"
              min={1}
              max={pp.totalSteps}
              value={form.currentStep}
              onChange={(e) =>
              setForm({
                ...form,
                currentStep: parseInt(e.target.value) || 1
              })
              }
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100" />

          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Statut
            </label>
            <select
              value={form.status}
              onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as PatientProtocol['status']
              })
              }
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white">

              <option value="on_track">En cours</option>
              <option value="delayed">En retard</option>
              <option value="completed">Terminé</option>
              <option value="paused">Pausé</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Prochaine action
            </label>
            <input
              value={form.nextAction}
              onChange={(e) =>
              setForm({
                ...form,
                nextAction: e.target.value
              })
              }
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              placeholder="Ex: Contrôle dans 2 semaines" />

          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-xs border border-gray-200 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">

              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 text-xs bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">

              Enregistrer
            </button>
          </div>
        </form>
        </div>
      </motion.div>
    </ModalBackdrop>);

}
// ─── CUSTOM ICON ──────────────────────────────────────────────────────────────
function ClipboardListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>

      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>);

}
// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function CarePathways() {
  const navigate = useNavigate();
  const { patients, setSelectedPatientId } = usePatient();
  const [activeTab, setActiveTab] = useState<'protocols' | 'patients'>(
    'protocols'
  );
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  // Data state
  const [protocols, setProtocols] = useState<Protocol[]>(initialProtocols);
  const [patientProtocols, setPatientProtocols] = useState<PatientProtocol[]>(
    initialPatientProtocols
  );
  // Modal state
  const [viewProtocol, setViewProtocol] = useState<Protocol | null>(null);
  const [editProtocol, setEditProtocol] = useState<Protocol | null | undefined>(
    undefined
  ); // undefined = closed, null = create
  const [assignProtocol, setAssignProtocol] = useState<Protocol | null>(null);
  const [viewPatientPP, setViewPatientPP] = useState<PatientProtocol | null>(
    null
  );
  const [editPatientPP, setEditPatientPP] = useState<PatientProtocol | null>(
    null
  );
  const assignablePatients = patients.map((patient) => patient.name);
  const filteredProtocols = protocols.filter(
    (p) =>
    (selectedCategory === 'Tous' || p.category === selectedCategory) && (
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredPatients = patientProtocols.filter(
    (pp) =>
    pp.patient.toLowerCase().includes(search.toLowerCase()) ||
    pp.protocol.toLowerCase().includes(search.toLowerCase())
  );
  const handleSaveProtocol = (data: Partial<Protocol>) => {
    if (editProtocol === null) {
      const newProtocol: Protocol = {
        id: `p${Date.now()}`,
        name: data.name ?? 'Nouveau protocole',
        category: data.category ?? protocolCategories[0],
        description: data.description ?? '',
        steps: data.stepDetails?.length ?? data.steps ?? 1,
        stepDetails: data.stepDetails ?? [],
        duration: data.duration ?? '-',
        activePatients: 0,
        completedPatients: 0,
        status: 'active',
        color: getProtocolColorByCategory(data.category ?? protocolCategories[0]),
        icon: ClipboardListIcon as React.ElementType
      };
      setProtocols((prev) => [...prev, newProtocol]);
      setActionMessage(`Protocole créé: ${newProtocol.name}.`);
    } else {
      setProtocols((prev) =>
      prev.map((p) =>
      p.id === editProtocol?.id ?
      {
        ...p,
        ...data,
        color: getProtocolColorByCategory(data.category ?? p.category),
        steps: data.stepDetails?.length ?? data.steps ?? p.steps
      } :
      p
      )
      );
      setActionMessage(`Protocole mis à jour: ${data.name ?? editProtocol?.name}.`);
    }
  };
  const handleSavePatientProtocol = (updated: PatientProtocol) => {
    const previous = patientProtocols.find((pp) => pp.id === updated.id);
    setPatientProtocols((prev) =>
    prev.map((pp) => pp.id === updated.id ? updated : pp)
    );
    if (previous && previous.status !== updated.status) {
      setProtocols((prev) => prev.map((protocol) => {
        if (protocol.name !== updated.protocol) {
          return protocol;
        }
        if (previous.status !== 'completed' && updated.status === 'completed') {
          return {
            ...protocol,
            activePatients: Math.max(0, protocol.activePatients - 1),
            completedPatients: protocol.completedPatients + 1
          };
        }
        if (previous.status === 'completed' && updated.status !== 'completed') {
          return {
            ...protocol,
            activePatients: protocol.activePatients + 1,
            completedPatients: Math.max(0, protocol.completedPatients - 1)
          };
        }
        return protocol;
      }));
    }
    setActionMessage(`Suivi mis à jour pour ${updated.patient}.`);
  };
  const handleAssign = (patientName: string) => {
    if (!assignProtocol) return;
    const newEntry: PatientProtocol = {
      id: `pp${Date.now()}`,
      patient: patientName,
      protocol: assignProtocol.name,
      currentStep: 1,
      totalSteps: assignProtocol.steps,
      startDate: new Date().toLocaleDateString('fr-FR'),
      nextAction: buildNextAction(1, assignProtocol.steps, assignProtocol.name),

      status: 'on_track',
      progress: Math.round(1 / assignProtocol.steps * 100)
    };
    setPatientProtocols((prev) => [...prev, newEntry]);
    setProtocols((prev) =>
    prev.map((p) =>
    p.id === assignProtocol.id ?
    {
      ...p,
      activePatients: p.activePatients + 1
    } :
    p
    )
    );
    setActionMessage(`Patient assigné au protocole ${assignProtocol.name}: ${patientName}.`);
  };
  const handleToggleProtocolStatus = (protocol: Protocol) => {
    const nextStatus = protocol.status === 'archived' ? 'active' : 'archived';
    setProtocols((prev) =>
      prev.map((current) =>
        current.id === protocol.id ? { ...current, status: nextStatus } : current
      )
    );
    setActionMessage(
      nextStatus === 'archived'
        ? `Protocole archivé: ${protocol.name}.`
        : `Protocole réactivé: ${protocol.name}.`
    );
  };
  const handleAdvancePatientProtocol = (pp: PatientProtocol) => {
    const nextStep = Math.min(pp.currentStep + 1, pp.totalSteps);
    const completed = nextStep >= pp.totalSteps;
    const updated: PatientProtocol = {
      ...pp,
      currentStep: nextStep,
      progress: Math.round(nextStep / pp.totalSteps * 100),
      status: completed ? 'completed' : 'on_track',
      nextAction: completed ? 'Parcours terminé' : buildNextAction(nextStep, pp.totalSteps, pp.protocol)
    };
    setPatientProtocols((prev) => prev.map((item) => item.id === pp.id ? updated : item));
    if (completed) {
      setProtocols((prev) => prev.map((protocol) => protocol.name === pp.protocol ? {
        ...protocol,
        activePatients: Math.max(0, protocol.activePatients - 1),
        completedPatients: protocol.completedPatients + 1
      } : protocol));
      setActionMessage(`Parcours terminé pour ${pp.patient}.`);
    } else {
      setActionMessage(`Le parcours de ${pp.patient} est passé à l'étape ${nextStep}.`);
    }
  };
  const handleTogglePausePatientProtocol = (pp: PatientProtocol) => {
    const nextStatus = pp.status === 'paused' ? 'on_track' : 'paused';
    const updated: PatientProtocol = {
      ...pp,
      status: nextStatus,
      nextAction: nextStatus === 'paused' ? 'Parcours en pause' : buildNextAction(pp.currentStep, pp.totalSteps, pp.protocol)
    };
    setPatientProtocols((prev) => prev.map((item) => item.id === pp.id ? updated : item));
    setActionMessage(
      nextStatus === 'paused'
        ? `Parcours mis en pause pour ${pp.patient}.`
        : `Parcours repris pour ${pp.patient}.`
    );
  };
  const handleOpenPatientRecord = (patientName: string) => {
    const directMatch = patients.find((patient) => patient.name.toLowerCase() === patientName.toLowerCase());
    if (directMatch) {
      setSelectedPatientId(directMatch.id);
      navigate(`/patients/${directMatch.id}`);
      return;
    }
    navigate('/patients');
    setActionMessage(`Ouverture de la liste patients pour retrouver le dossier de ${patientName}.`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 max-w-7xl mx-auto space-y-3">
        <div className="rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-rose-500 px-5 py-4 text-white shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold">Parcours et protocoles de soins</h1>
                <p className="text-xs text-red-100 mt-0.5">
                  Standardisez les parcours cardiologiques, pilotez les étapes actives et gardez une vue claire sur les retards.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/patients')}
                className="inline-flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white hover:bg-white/15">
                <ChevronRightIcon className="w-3.5 h-3.5" /> Patients
              </button>
              <button
                onClick={() => setEditProtocol(null)}
                className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">
                <PlusIcon className="w-3.5 h-3.5" /> Nouveau protocole
              </button>
            </div>
          </div>
        </div>

        {actionMessage &&
        <div className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-800">
            <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
            <span>{actionMessage}</span>
          </div>
        }

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="bg-white rounded-2xl border border-red-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-0.5">Protocoles actifs</p>
            <p className="text-xl font-bold text-gray-900">
              {protocols.filter((p) => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-0.5">Patients suivis</p>
            <p className="text-xl font-bold text-rose-600">
              {protocols.reduce((a, p) => a + p.activePatients, 0)}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-red-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-0.5">En retard</p>
            <p className="text-xl font-bold text-red-600">
              {patientProtocols.filter((p) => p.status === 'delayed').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-0.5">Terminés ce mois</p>
            <p className="text-xl font-bold text-emerald-600">
              {patientProtocols.filter((p) => p.status === 'completed').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-red-100 p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex rounded-xl bg-red-50 p-1">
              <button
                onClick={() => setActiveTab('protocols')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium ${activeTab === 'protocols' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-white'}`}>

                Protocoles ({protocols.length})
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium ${activeTab === 'patients' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-white'}`}>

                Patients ({patientProtocols.length})
              </button>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                className="w-full text-xs border border-gray-200 rounded-xl pl-8 pr-3 py-2 h-9 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                placeholder={activeTab === 'protocols' ? 'Rechercher un protocole ou une catégorie...' : 'Rechercher un patient ou un protocole...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)} />

            </div>
          </div>

          {activeTab === 'protocols' &&
          <div className="flex gap-2 mt-1 flex-wrap">
              {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${selectedCategory === cat ? 'bg-red-50 border-red-300 text-red-700' : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-600'}`}>

                  {cat}
                </button>
            )}
            </div>
          }
        </div>

        {activeTab === 'protocols' &&
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3 md:grid-cols-2">
            {filteredProtocols.map((protocol) => {
            const Icon = protocol.icon;
            const protocolState = protocolStatusConfig[protocol.status];
            return (
              <div
                key={protocol.id}
                className={`bg-white rounded-2xl border-2 ${protocol.color.split(' ')[1]} p-4 shadow-sm hover:shadow-md transition-shadow`}>

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                      className={`w-9 h-9 rounded-xl ${protocol.color.split(' ')[0]} flex items-center justify-center`}>

                        <Icon
                        className={`w-4 h-4 ${protocol.color.split(' ')[2]}`} />

                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {protocol.name}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <p className="text-xs text-gray-500">{protocol.category}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${protocolState.pill}`}>
                            {protocolState.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                      onClick={() => setEditProtocol(protocol)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                      title="Modifier">

                        <EditIcon className="w-3 h-3" />
                      </button>
                      <button
                      onClick={() => setViewProtocol(protocol)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                      title="Voir les détails">

                        <EyeIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {protocol.description}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center bg-red-50 rounded-xl p-2 border border-red-100">
                      <p className="text-xs font-bold text-gray-900">
                        {protocol.steps}
                      </p>
                      <p className="text-xs text-gray-500">étapes</p>
                    </div>
                    <div className="text-center bg-rose-50 rounded-xl p-2 border border-rose-100">
                      <p className="text-xs font-bold text-rose-600">
                        {protocol.activePatients}
                      </p>
                      <p className="text-xs text-gray-500">actifs</p>
                    </div>
                    <div className="text-center bg-emerald-50 rounded-xl p-2 border border-emerald-100">
                      <p className="text-xs font-bold text-emerald-600">
                        {protocol.completedPatients}
                      </p>
                      <p className="text-xs text-gray-500">terminés</p>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                    <span>Durée estimée</span>
                    <span className="font-medium text-gray-700">{protocol.duration}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setViewProtocol(protocol)}
                      className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100">
                      Voir détails <ChevronRightIcon className="w-3 h-3" />
                    </button>
                    <button
                    onClick={() => setAssignProtocol(protocol)}
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 transition-colors font-medium">

                      Assigner <ArrowRightIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>);

          })}
          </div>
        }

        {activeTab === 'patients' &&
        <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
          <tr className="bg-red-50 border-b border-red-100">
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">
                    Patient
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">
                    Protocole
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">
                    Progression
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">
                    Prochaine action
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">
                    Statut
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((pp, i) => {
                const status = statusConfig[pp.status];
                return (
                  <tr
                    key={pp.id}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>

                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                            <UserIcon className="w-3 h-3 text-red-600" />
                          </div>
                          <button
                            onClick={() => handleOpenPatientRecord(pp.patient)}
                            className="text-xs font-medium text-gray-800 hover:text-red-700 transition-colors">
                            {pp.patient}
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-xs text-gray-700">
                          {pp.protocol}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden w-20">
                            <div
                            className={`h-full rounded-full ${pp.status === 'completed' ? 'bg-emerald-500' : pp.status === 'delayed' ? 'bg-red-500' : pp.status === 'paused' ? 'bg-gray-400' : 'bg-red-500'}`}
                            style={{
                              width: `${pp.progress}%`
                            }} />

                          </div>
                          <span className="text-xs text-gray-500">
                            {pp.currentStep}/{pp.totalSteps}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-xs text-gray-600">
                          {pp.nextAction}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span
                        className={`text-xs px-1.5 py-0.5 rounded ${status.color}`}>

                          {status.label}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <button
                          onClick={() => setViewPatientPP(pp)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                          title="Voir le suivi">

                            <EyeIcon className="w-3 h-3" />
                          </button>
                          <button
                          onClick={() => setEditPatientPP(pp)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                          title="Modifier le suivi">

                            <EditIcon className="w-3 h-3" />
                          </button>
                          <button
                          onClick={() => handleAdvancePatientProtocol(pp)}
                          disabled={pp.status === 'completed'}
                          className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Avancer d'une étape">

                            <PlayIcon className="w-3 h-3" />
                          </button>
                          <button
                          onClick={() => handleTogglePausePatientProtocol(pp)}
                          disabled={pp.status === 'completed'}
                          className="p-1 hover:bg-amber-50 rounded text-gray-400 hover:text-amber-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={pp.status === 'paused' ? 'Reprendre' : 'Mettre en pause'}>

                            <PauseIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>);

              })}
              </tbody>
            </table>
          </div>
        }
      </div>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {viewProtocol &&
        <ViewProtocolModal
          protocol={viewProtocol}
          onClose={() => setViewProtocol(null)}
          onEdit={(protocol) => {
            setViewProtocol(null);
            setEditProtocol(protocol);
          }}
          onAssign={(protocol) => {
            setViewProtocol(null);
            setAssignProtocol(protocol);
          }}
          onToggleStatus={(protocol) => {
            handleToggleProtocolStatus(protocol);
            setViewProtocol(null);
          }} />

        }
      </AnimatePresence>

      <AnimatePresence>
        {editProtocol !== undefined &&
        <EditProtocolModal
          protocol={editProtocol}
          onClose={() => setEditProtocol(undefined)}
          onSave={handleSaveProtocol} />

        }
      </AnimatePresence>

      <AnimatePresence>
        {assignProtocol &&
        <AssignPatientModal
          protocol={assignProtocol}
          patientNames={assignablePatients}
          onClose={() => setAssignProtocol(null)}
          onAssign={handleAssign} />

        }
      </AnimatePresence>

      <AnimatePresence>
        {viewPatientPP &&
        <ViewPatientProtocolModal
          pp={viewPatientPP}
          onClose={() => setViewPatientPP(null)}
          onOpenPatient={handleOpenPatientRecord}
          onEdit={(pp) => {
            setViewPatientPP(null);
            setEditPatientPP(pp);
          }}
          onAdvance={(pp) => {
            handleAdvancePatientProtocol(pp);
            setViewPatientPP(null);
          }}
          onTogglePause={(pp) => {
            handleTogglePausePatientProtocol(pp);
            setViewPatientPP(null);
          }} />

        }
      </AnimatePresence>

      <AnimatePresence>
        {editPatientPP &&
        <EditPatientProtocolModal
          pp={editPatientPP}
          onClose={() => setEditPatientPP(null)}
          onSave={handleSavePatientProtocol} />

        }
      </AnimatePresence>
    </div>);

}