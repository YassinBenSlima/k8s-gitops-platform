import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UserIcon,
  CalendarIcon,
  ActivityIcon,
  TrendingUpIcon,
  ClockIcon,
  FileTextIcon,
  ImageIcon,
  EditIcon,
  DownloadIcon,
  PrinterIcon,
  ShareIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
  MessageSquareIcon,
  TagIcon,
  ShieldCheckIcon,
  SmileIcon,
  ZapIcon,
  LockIcon,
  XIcon,
  SaveIcon,
  TrendingDownIcon } from
'lucide-react';
const TreatmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  // Edit modal states
  const [editingEvaluation, setEditingEvaluation] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  // Stateful evaluations & notes so edits persist
  const [evaluationsState, setEvaluationsState] = useState([
  {
    id: 1,
    date: '15/01/2024',
    progress: 65,
    notes:
    'Excellente progression, patient coopératif. Alignement satisfaisant.',
    nextSteps: 'Continuer le traitement actuel, RDV dans 4 semaines',
    nextAppointmentDate: '15/02/2024',
    alignmentQuality: 'Bon',
    oralHygiene: 'Excellente',
    patientCooperation: 'Excellent',
    complications: 'Aucune complication observée',
    treatmentAdjustments: "Ajustement mineur de l'arc supérieur",
    images: 3,
    photoColors: [
    'from-blue-400 to-cyan-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-emerald-500']

  },
  {
    id: 2,
    date: '15/12/2023',
    progress: 55,
    notes: 'Bonne évolution, léger retard sur le planning initial',
    nextSteps: 'Ajustement des élastiques, surveillance accrue',
    nextAppointmentDate: '15/01/2024',
    alignmentQuality: 'Satisfaisant',
    oralHygiene: 'Bonne',
    patientCooperation: 'Bon',
    complications: 'Légère irritation gingivale',
    treatmentAdjustments: 'Changement des élastiques intermaxillaires',
    images: 2,
    photoColors: [
    'from-amber-400 to-orange-500',
    'from-indigo-400 to-blue-500']

  },
  {
    id: 3,
    date: '15/11/2023',
    progress: 45,
    notes: 'Progression conforme aux attentes',
    nextSteps: 'Poursuite du traitement, hygiène à améliorer',
    nextAppointmentDate: '15/12/2023',
    alignmentQuality: 'Satisfaisant',
    oralHygiene: 'Moyenne',
    patientCooperation: 'Moyen',
    complications: '',
    treatmentAdjustments: 'Activation des ressorts de rappel',
    images: 2,
    photoColors: ['from-pink-400 to-rose-500', 'from-teal-400 to-cyan-500']
  }]
  );
  const [notesState, setNotesState] = useState([
  {
    id: 1,
    date: '15/01/2024',
    title: 'Observation canine incluse',
    content:
    'Patient très coopératif, excellente hygiène bucco-dentaire. Attention particulière à surveiller la canine incluse lors des prochaines séances.',
    noteType: 'important',
    priority: 'high',
    tags: ['Suivi', 'Complication'],
    isPrivate: false
  },
  {
    id: 2,
    date: '10/01/2024',
    title: 'Rappel hygiène bucco-dentaire',
    content:
    'Instructions données au patient concernant le brossage interdentaire. Prévoir vérification lors du prochain RDV.',
    noteType: 'reminder',
    priority: 'normal',
    tags: ['Hygiène', 'Rendez-vous'],
    isPrivate: false
  },
  {
    id: 3,
    date: '05/01/2024',
    title: 'Note clinique - ajustement',
    content:
    "Ajustement de l'arc supérieur effectué. Patient signale légère sensibilité post-ajustement, normale et temporaire.",
    noteType: 'clinical',
    priority: 'low',
    tags: ['Amélioration', 'Suivi'],
    isPrivate: true
  }]
  );
  // Use stateful versions
  const evaluations = evaluationsState;
  const notes = notesState;
  // ── Evaluation edit form state ──────────────────────────────────────────────
  const [evalForm, setEvalForm] = useState<any>(null);
  const openEditEvaluation = (evaluation) => {
    setEvalForm({
      ...evaluation
    });
    setEditingEvaluation(evaluation);
  };
  const handleSaveEvaluation = () => {
    setEvaluationsState((prev) =>
    prev.map((e) =>
    e.id === evalForm.id ?
    {
      ...e,
      ...evalForm
    } :
    e
    )
    );
    setEditingEvaluation(null);
    setEvalForm(null);
  };
  // ── Note edit form state ────────────────────────────────────────────────────
  const [noteForm, setNoteForm] = useState<any>(null);
  const commonTags = [
  'Hygiène',
  'Coopération',
  'Douleur',
  'Rendez-vous',
  'Urgence',
  'Suivi',
  'Complication',
  'Amélioration'];

  const openEditNote = (note) => {
    setNoteForm({
      ...note
    });
    setEditingNote(note);
  };
  const handleSaveNote = () => {
    setNotesState((prev) =>
    prev.map((n) =>
    n.id === noteForm.id ?
    {
      ...n,
      ...noteForm
    } :
    n
    )
    );
    setEditingNote(null);
    setNoteForm(null);
  };
  const toggleNoteTag = (tag: string) => {
    setNoteForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ?
      prev.tags.filter((t) => t !== tag) :
      [...prev.tags, tag]
    }));
  };
  // Mock patient data - in real app, fetch based on id
  const patient = {
    id: id,
    name: 'Sophie Martin',
    avatar: 'SM',
    color: 'blue',
    dateOfBirth: '15/03/1995',
    age: 29,
    treatment: 'Appareil fixe',
    progress: 65,
    status: 'En cours',
    priority: 'Haute',
    lastEvaluation: '15/01/2024',
    nextEvaluation: '15/02/2024',
    startDate: '01/06/2023',
    estimatedEnd: '01/06/2025',
    duration: '24 mois',
    orthodontist: 'Dr. Jean Dupont'
  };
  // evaluations and notes are defined above via useState (evaluationsState / notesState)
  const timeline = [
  {
    id: 1,
    date: '01/06/2023',
    title: 'Début du traitement',
    description: "Pose de l'appareil orthodontique fixe",
    type: 'start'
  },
  {
    id: 2,
    date: '15/08/2023',
    title: 'Premier ajustement',
    description: 'Changement des ligatures, ajustement des arcs',
    type: 'adjustment'
  },
  {
    id: 3,
    date: '15/11/2023',
    title: 'Évaluation trimestrielle',
    description: 'Progression de 45%, photos et radiographies',
    type: 'evaluation'
  },
  {
    id: 4,
    date: '15/01/2024',
    title: 'Évaluation actuelle',
    description: 'Progression de 65%, excellents résultats',
    type: 'evaluation'
  },
  {
    id: 5,
    date: '15/02/2024',
    title: 'Prochain rendez-vous',
    description: 'Évaluation et ajustement prévu',
    type: 'upcoming'
  }];

  const colorGradients = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
    pink: 'from-pink-500 to-rose-500',
    cyan: 'from-cyan-500 to-blue-500'
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'En pause':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'Terminé':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'À risque':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'start':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'adjustment':
        return <ActivityIcon className="h-5 w-5 text-blue-500" />;
      case 'evaluation':
        return <FileTextIcon className="h-5 w-5 text-purple-500" />;
      case 'upcoming':
        return <ClockIcon className="h-5 w-5 text-amber-500" />;
      default:
        return <CalendarIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const tabs = [
  {
    id: 'overview',
    name: "Vue d'ensemble",
    icon: ActivityIcon
  },
  {
    id: 'evaluations',
    name: 'Évaluations',
    icon: FileTextIcon
  },
  {
    id: 'timeline',
    name: 'Chronologie',
    icon: ClockIcon
  },
  {
    id: 'photos',
    name: 'Photos',
    icon: ImageIcon
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: MessageSquareIcon
  }];

  const getAlignmentColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Bon':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Satisfaisant':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      case 'À améliorer':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };
  const getHygieneColor = (hygiene: string) => {
    switch (hygiene) {
      case 'Excellente':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Bonne':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Moyenne':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      case 'Insuffisante':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };
  const getCooperationColor = (coop: string) => {
    switch (coop) {
      case 'Excellent':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Bon':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Moyen':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      case 'Faible':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };
  const getNoteTypeConfig = (type: string) => {
    switch (type) {
      case 'important':
        return {
          label: 'Important',
          bg: 'bg-amber-500',
          icon: AlertTriangleIcon
        };
      case 'reminder':
        return {
          label: 'Rappel',
          bg: 'bg-purple-500',
          icon: ClockIcon
        };
      case 'clinical':
        return {
          label: 'Clinique',
          bg: 'bg-green-500',
          icon: FileTextIcon
        };
      default:
        return {
          label: 'Générale',
          bg: 'bg-blue-500',
          icon: MessageSquareIcon
        };
    }
  };
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return {
          label: 'Urgente',
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30'
        };
      case 'high':
        return {
          label: 'Haute',
          color: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-100 dark:bg-amber-900/30'
        };
      case 'low':
        return {
          label: 'Faible',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30'
        };
      default:
        return {
          label: 'Normale',
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-100 dark:bg-blue-900/30'
        };
    }
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
        className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-600 dark:to-pink-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{
              scale: 1.05,
              x: -5
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => navigate('/treatments')}
            className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl font-semibold hover:bg-opacity-30 transition-all">

            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Retour
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">

              <PrinterIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">

              <DownloadIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">

              <ShareIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div
              className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${colorGradients[patient.color]} flex items-center justify-center shadow-xl mr-6`}>

              <span className="text-2xl font-bold text-white">
                {patient.avatar}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1 text-indigo-200" />
                  <span className="text-indigo-100">{patient.age} ans</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1 text-indigo-200" />
                  <span className="text-indigo-100">
                    Né(e) le {patient.dateOfBirth}
                  </span>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="h-4 w-4 mr-1 text-indigo-200" />
                  <span className="text-indigo-100">{patient.treatment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-indigo-100 dark:text-purple-100">
              Progression
            </p>
            <div className="flex items-center mt-2">
              <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2 mr-3">
                <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${patient.progress}%`
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2
                  }}
                  className="bg-white h-2 rounded-full" />

              </div>
              <span className="text-xl font-bold">{patient.progress}%</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-indigo-100 dark:text-purple-100">
              Statut
            </p>
            <p className="text-xl font-bold mt-2">{patient.status}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-indigo-100 dark:text-purple-100">
              Durée
            </p>
            <p className="text-xl font-bold mt-2">{patient.duration}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-indigo-100 dark:text-purple-100">
              Prochain RDV
            </p>
            <p className="text-xl font-bold mt-2">{patient.nextEvaluation}</p>
          </div>
        </div>
      </motion.div>
      {/* Tabs */}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 p-2 overflow-x-auto">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>

                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' &&
          <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Treatment Info */}
                <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-blue-100 dark:border-gray-600">

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <ActivityIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Informations du traitement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Type de traitement:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {patient.treatment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Date de début:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {patient.startDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Fin estimée:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {patient.estimatedEnd}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Orthodontiste:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {patient.orthodontist}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Priorité:
                      </span>
                      <span
                      className={`text-sm font-semibold ${patient.priority === 'Haute' ? 'text-red-600 dark:text-red-400' : patient.priority === 'Moyenne' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>

                        {patient.priority}
                      </span>
                    </div>
                  </div>
                </motion.div>
                {/* Progress Chart */}
                <motion.div
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-purple-100 dark:border-gray-600">

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <TrendingUpIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Évolution de la progression
                  </h3>
                  <div className="space-y-4">
                    {[
                  {
                    month: 'Mois 1-3',
                    progress: 15
                  },
                  {
                    month: 'Mois 4-6',
                    progress: 30
                  },
                  {
                    month: 'Mois 7-9',
                    progress: 45
                  },
                  {
                    month: 'Mois 10-12',
                    progress: 65
                  }].
                  map((item, index) =>
                  <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.month}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                        initial={{
                          width: 0
                        }}
                        animate={{
                          width: `${item.progress}%`
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.3 + index * 0.1
                        }}
                        className={`bg-gradient-to-r ${colorGradients[patient.color]} h-2 rounded-full`} />

                        </div>
                      </div>
                  )}
                  </div>
                </motion.div>
              </div>
              {/* Latest Evaluation */}
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-green-100 dark:border-gray-600">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileTextIcon className="h-5 w-5 mr-2 text-green-500" />
                  Dernière évaluation
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Date:
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {evaluations[0].date}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                      Notes:
                    </span>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {evaluations[0].notes}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                      Prochaines étapes:
                    </span>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {evaluations[0].nextSteps}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          }
          {/* Evaluations Tab */}
          {activeTab === 'evaluations' &&
          <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Historique des évaluations
                </h3>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() =>
                navigate(`/treatments/${id}/evaluation/nouvelle`)
                }
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">

                  <PlusIcon className="h-5 w-5 mr-2" />
                  Nouvelle évaluation
                </motion.button>
              </div>
              {evaluations.map((evaluation, index) =>
            <motion.div
              key={evaluation.id}
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
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all overflow-hidden">

                  {/* Card Header */}
                  <div className="flex justify-between items-start p-6 pb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        Évaluation du {evaluation.date}
                      </h4>
                      {evaluation.nextAppointmentDate &&
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          Prochain RDV: {evaluation.nextAppointmentDate}
                        </div>
                  }
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-white">
                          {evaluation.progress}%
                        </span>
                      </div>
                      {/* Pencil edit button */}
                      <motion.button
                    whileHover={{
                      scale: 1.1,
                      rotate: -10
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() => openEditEvaluation(evaluation)}
                    className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all shadow-sm"
                    title="Modifier l'évaluation">

                        <EditIcon className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Clinical Badges */}
                  <div className="px-6 pb-4 flex flex-wrap gap-2">
                    {evaluation.alignmentQuality &&
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getAlignmentColor(evaluation.alignmentQuality)}`}>

                        <ZapIcon className="h-3 w-3" />
                        Alignement: {evaluation.alignmentQuality}
                      </span>
                }
                    {evaluation.oralHygiene &&
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getHygieneColor(evaluation.oralHygiene)}`}>

                        <ShieldCheckIcon className="h-3 w-3" />
                        Hygiène: {evaluation.oralHygiene}
                      </span>
                }
                    {evaluation.patientCooperation &&
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getCooperationColor(evaluation.patientCooperation)}`}>

                        <SmileIcon className="h-3 w-3" />
                        Coopération: {evaluation.patientCooperation}
                      </span>
                }
                  </div>

                  {/* Notes & Steps */}
                  <div className="px-6 pb-4 space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                        Observations cliniques:
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {evaluation.notes}
                      </p>
                    </div>
                    {evaluation.complications &&
                <div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                          Complications:
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {evaluation.complications}
                        </p>
                      </div>
                }
                    {evaluation.treatmentAdjustments &&
                <div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                          Ajustements:
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {evaluation.treatmentAdjustments}
                        </p>
                      </div>
                }
                    <div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                        Prochaines étapes:
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {evaluation.nextSteps}
                      </p>
                    </div>
                  </div>

                  {/* Photo Thumbnails */}
                  {evaluation.images > 0 &&
              <div className="px-6 pb-5">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-2">
                        Photos ({evaluation.images})
                      </span>
                      <div className="flex gap-3">
                        {evaluation.photoColors.map((gradient, photoIndex) =>
                  <motion.div
                    key={photoIndex}
                    whileHover={{
                      scale: 2.2,
                      zIndex: 50,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }}
                    className={`relative h-16 w-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center cursor-pointer shadow-md origin-bottom-left`}
                    style={{
                      zIndex: 1
                    }}>

                            <ImageIcon className="h-7 w-7 text-white opacity-80" />
                          </motion.div>
                  )}
                      </div>
                    </div>
              }
                </motion.div>
            )}
            </div>
          }
          {/* Timeline Tab */}
          {activeTab === 'timeline' &&
          <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Chronologie du traitement
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500" />
                {timeline.map((event, index) =>
              <motion.div
                key={event.id}
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
                className="relative flex gap-6 mb-8">

                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white dark:bg-gray-700 border-4 border-indigo-500 flex items-center justify-center shadow-lg z-10">
                      {getTimelineIcon(event.type)}
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-600 shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {event.title}
                        </h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
              )}
              </div>
            </div>
          }
          {/* Photos Tab */}
          {activeTab === 'photos' &&
          <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Galerie photos
                </h3>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">

                  <PlusIcon className="h-5 w-5 mr-2" />
                  Ajouter des photos
                </motion.button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) =>
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  delay: index * 0.05
                }}
                className="aspect-square rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md">

                    <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  </motion.div>
              )}
              </div>
            </div>
          }
          {/* Notes Tab */}
          {activeTab === 'notes' &&
          <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Notes et observations
                </h3>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => navigate(`/treatments/${id}/note/nouvelle`)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">

                  <PlusIcon className="h-5 w-5 mr-2" />
                  Nouvelle note
                </motion.button>
              </div>
              {notes.map((note, index) => {
              const typeConfig = getNoteTypeConfig(note.noteType);
              const priorityConfig = getPriorityConfig(note.priority);
              const NoteIcon = typeConfig.icon;
              return (
                <motion.div
                  key={note.id}
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
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-amber-100 dark:border-gray-600 shadow-md hover:shadow-lg transition-all overflow-hidden">

                    {/* Note Header */}
                    <div className="flex items-start gap-4 p-5 pb-3">
                      <div
                      className={`h-10 w-10 rounded-full ${typeConfig.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>

                        <NoteIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                            {note.title}
                          </h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {note.isPrivate &&
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                <LockIcon className="h-3 w-3" />
                                Privée
                              </span>
                          }
                            <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityConfig.bg} ${priorityConfig.color}`}>

                              {priorityConfig.label}
                            </span>
                            {/* Pencil edit button */}
                            <motion.button
                            whileHover={{
                              scale: 1.1,
                              rotate: -10
                            }}
                            whileTap={{
                              scale: 0.9
                            }}
                            onClick={() => openEditNote(note)}
                            className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all shadow-sm"
                            title="Modifier la note">

                              <EditIcon className="h-3.5 w-3.5" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {note.date}
                          </span>
                          <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${note.noteType === 'important' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : note.noteType === 'reminder' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : note.noteType === 'clinical' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>

                            {typeConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div className="px-5 pb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {note.content}
                      </p>
                    </div>

                    {/* Tags */}
                    {note.tags.length > 0 &&
                  <div className="px-5 pb-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <TagIcon className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                          {note.tags.map((tag) =>
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-amber-500 bg-opacity-15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-800">

                              {tag}
                            </span>
                      )}
                        </div>
                      </div>
                  }
                  </motion.div>);

            })}
            </div>
          }
        </div>
      </motion.div>

      {/* ── Edit Evaluation Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {editingEvaluation && evalForm &&
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
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setEditingEvaluation(null);
            setEvalForm(null);
          }}>

            <motion.div
            initial={{
              scale: 0.92,
              opacity: 0,
              y: 20
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.92,
              opacity: 0,
              y: 20
            }}
            transition={{
              type: 'spring',
              duration: 0.4
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Modifier l'évaluation
                    </h2>
                    <p className="text-indigo-100 text-xs mt-0.5">
                      Évaluation du {editingEvaluation.date}
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
                onClick={() => {
                  setEditingEvaluation(null);
                  setEvalForm(null);
                }}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">

                  <XIcon className="h-5 w-5 text-white" />
                </motion.button>
              </div>
              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
                {/* Date & Progress */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Date d'évaluation
                    </label>
                    <input
                    type="date"
                    value={
                    evalForm.date?.split('/').reverse().join('-') || ''
                    }
                    onChange={(e) =>
                    setEvalForm((p) => ({
                      ...p,
                      date: e.target.value.split('-').reverse().join('/')
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" />

                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Progression (%)
                    </label>
                    <input
                    type="number"
                    min={0}
                    max={100}
                    value={evalForm.progress}
                    onChange={(e) =>
                    setEvalForm((p) => ({
                      ...p,
                      progress: Number(e.target.value)
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" />

                  </div>
                </div>
                {/* Clinical selects */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Qualité d'alignement
                    </label>
                    <select
                    value={evalForm.alignmentQuality}
                    onChange={(e) =>
                    setEvalForm((p) => ({
                      ...p,
                      alignmentQuality: e.target.value
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">

                      {[
                    'Excellent',
                    'Bon',
                    'Satisfaisant',
                    'À améliorer',
                    'Insuffisant'].
                    map((o) =>
                    <option key={o}>{o}</option>
                    )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Hygiène bucco-dentaire
                    </label>
                    <select
                    value={evalForm.oralHygiene}
                    onChange={(e) =>
                    setEvalForm((p) => ({
                      ...p,
                      oralHygiene: e.target.value
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">

                      {[
                    'Excellente',
                    'Bonne',
                    'Moyenne',
                    'Insuffisante',
                    'Préoccupante'].
                    map((o) =>
                    <option key={o}>{o}</option>
                    )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Coopération patient
                    </label>
                    <select
                    value={evalForm.patientCooperation}
                    onChange={(e) =>
                    setEvalForm((p) => ({
                      ...p,
                      patientCooperation: e.target.value
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">

                      {[
                    'Excellent',
                    'Bon',
                    'Moyen',
                    'Faible',
                    'Très faible'].
                    map((o) =>
                    <option key={o}>{o}</option>
                    )}
                    </select>
                  </div>
                </div>
                {/* Observations */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Observations cliniques *
                  </label>
                  <textarea
                  rows={3}
                  value={evalForm.notes}
                  onChange={(e) =>
                  setEvalForm((p) => ({
                    ...p,
                    notes: e.target.value
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                {/* Complications */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Complications
                  </label>
                  <textarea
                  rows={2}
                  value={evalForm.complications}
                  onChange={(e) =>
                  setEvalForm((p) => ({
                    ...p,
                    complications: e.target.value
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                {/* Adjustments */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Ajustements du traitement
                  </label>
                  <textarea
                  rows={2}
                  value={evalForm.treatmentAdjustments}
                  onChange={(e) =>
                  setEvalForm((p) => ({
                    ...p,
                    treatmentAdjustments: e.target.value
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                {/* Next steps */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Prochaines étapes
                  </label>
                  <textarea
                  rows={2}
                  value={evalForm.nextSteps}
                  onChange={(e) =>
                  setEvalForm((p) => ({
                    ...p,
                    nextSteps: e.target.value
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                {/* Next appointment */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Prochain rendez-vous
                  </label>
                  <input
                  type="date"
                  value={
                  evalForm.nextAppointmentDate?.
                  split('/').
                  reverse().
                  join('-') || ''
                  }
                  onChange={(e) =>
                  setEvalForm((p) => ({
                    ...p,
                    nextAppointmentDate: e.target.value.
                    split('-').
                    reverse().
                    join('/')
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />

                </div>
              </div>
              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3 flex-shrink-0">
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => {
                  setEditingEvaluation(null);
                  setEvalForm(null);
                }}
                className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 transition-all">

                  Annuler
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={handleSaveEvaluation}
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all">

                  <SaveIcon className="h-4 w-4 mr-2" />
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* ── Edit Note Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {editingNote && noteForm &&
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
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setEditingNote(null);
            setNoteForm(null);
          }}>

            <motion.div
            initial={{
              scale: 0.92,
              opacity: 0,
              y: 20
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.92,
              opacity: 0,
              y: 20
            }}
            transition={{
              type: 'spring',
              duration: 0.4
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">

              {/* Modal Header */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                    <MessageSquareIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Modifier la note
                    </h2>
                    <p className="text-amber-100 text-xs mt-0.5 truncate max-w-xs">
                      {editingNote.title}
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
                onClick={() => {
                  setEditingNote(null);
                  setNoteForm(null);
                }}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">

                  <XIcon className="h-5 w-5 text-white" />
                </motion.button>
              </div>
              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
                {/* Date, Type, Priority */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Date
                    </label>
                    <input
                    type="date"
                    value={
                    noteForm.date?.split('/').reverse().join('-') || ''
                    }
                    onChange={(e) =>
                    setNoteForm((p) => ({
                      ...p,
                      date: e.target.value.split('-').reverse().join('/')
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white" />

                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Type de note
                    </label>
                    <select
                    value={noteForm.noteType}
                    onChange={(e) =>
                    setNoteForm((p) => ({
                      ...p,
                      noteType: e.target.value
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white">

                      <option value="general">Générale</option>
                      <option value="important">Important</option>
                      <option value="reminder">Rappel</option>
                      <option value="clinical">Clinique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Priorité
                    </label>
                    <select
                    value={noteForm.priority}
                    onChange={(e) =>
                    setNoteForm((p) => ({
                      ...p,
                      priority: e.target.value
                    }))
                    }
                    className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white">

                      <option value="low">Faible</option>
                      <option value="normal">Normale</option>
                      <option value="high">Haute</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Titre *
                  </label>
                  <input
                  type="text"
                  value={noteForm.title}
                  onChange={(e) =>
                  setNoteForm((p) => ({
                    ...p,
                    title: e.target.value
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white" />

                </div>
                {/* Content */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Contenu *
                  </label>
                  <textarea
                  rows={5}
                  value={noteForm.content}
                  onChange={(e) =>
                  setNoteForm((p) => ({
                    ...p,
                    content: e.target.value
                  }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white resize-none" />

                </div>
                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Étiquettes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map((tag) =>
                  <motion.button
                    key={tag}
                    type="button"
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={() => toggleNoteTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${noteForm.tags.includes(tag) ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>

                        {tag}
                      </motion.button>
                  )}
                  </div>
                </div>
                {/* Private */}
                <div className="flex items-center gap-2">
                  <input
                  type="checkbox"
                  id="editIsPrivate"
                  checked={noteForm.isPrivate}
                  onChange={(e) =>
                  setNoteForm((p) => ({
                    ...p,
                    isPrivate: e.target.checked
                  }))
                  }
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded" />

                  <label
                  htmlFor="editIsPrivate"
                  className="text-sm text-gray-700 dark:text-gray-300">

                    Note privée (visible uniquement par vous)
                  </label>
                </div>
              </div>
              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3 flex-shrink-0">
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => {
                  setEditingNote(null);
                  setNoteForm(null);
                }}
                className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 transition-all">

                  Annuler
                </motion.button>
                <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={handleSaveNote}
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all">

                  <SaveIcon className="h-4 w-4 mr-2" />
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};
export default TreatmentDetails;