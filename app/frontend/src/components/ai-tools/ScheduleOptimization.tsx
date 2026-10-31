import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UserIcon,
  RefreshCwIcon,
  ArrowRightIcon,
  SaveIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  InfoIcon,
  SparklesIcon,
  ZapIcon,
  TrendingUpIcon,
  AwardIcon,
  ShieldCheckIcon,
  ActivityIcon,
  BarChart2Icon } from
'lucide-react';
const ScheduleOptimization = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [optimizationScore, setOptimizationScore] = useState(72);
  const [showOptimizedSchedule, setShowOptimizedSchedule] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  // Mock schedule data
  const currentSchedule = [
  {
    id: 1,
    time: '09:00',
    duration: 30,
    patient: 'Sophie Martin',
    type: 'Contrôle',
    status: 'confirmed'
  },
  {
    id: 2,
    time: '09:45',
    duration: 45,
    patient: 'Thomas Bernard',
    type: 'Pose appareil',
    status: 'confirmed'
  },
  {
    id: 3,
    time: '11:00',
    duration: 30,
    patient: 'Emma Petit',
    type: 'Contrôle',
    status: 'confirmed'
  },
  {
    id: 4,
    time: '13:00',
    duration: 30,
    patient: 'Lucas Dubois',
    type: 'Contrôle',
    status: 'pending'
  },
  {
    id: 5,
    time: '14:00',
    duration: 45,
    patient: 'Nathan Robert',
    type: 'Ajustement',
    status: 'confirmed'
  },
  {
    id: 6,
    time: '15:00',
    duration: 30,
    patient: 'Léa Richard',
    type: 'Contrôle',
    status: 'confirmed'
  },
  {
    id: 7,
    time: '16:00',
    duration: 45,
    patient: 'Hugo Martin',
    type: 'Consultation',
    status: 'pending'
  }];

  const optimizedSchedule = [
  {
    id: 1,
    time: '09:00',
    duration: 30,
    patient: 'Sophie Martin',
    type: 'Contrôle',
    status: 'confirmed',
    unchanged: true
  },
  {
    id: 3,
    time: '09:45',
    duration: 30,
    patient: 'Emma Petit',
    type: 'Contrôle',
    status: 'confirmed',
    unchanged: false
  },
  {
    id: 2,
    time: '10:30',
    duration: 45,
    patient: 'Thomas Bernard',
    type: 'Pose appareil',
    status: 'confirmed',
    unchanged: false
  },
  {
    id: 4,
    time: '11:30',
    duration: 30,
    patient: 'Lucas Dubois',
    type: 'Contrôle',
    status: 'pending',
    unchanged: false
  },
  {
    id: 5,
    time: '13:30',
    duration: 45,
    patient: 'Nathan Robert',
    type: 'Ajustement',
    status: 'confirmed',
    unchanged: false
  },
  {
    id: 6,
    time: '14:30',
    duration: 30,
    patient: 'Léa Richard',
    type: 'Contrôle',
    status: 'confirmed',
    unchanged: false
  },
  {
    id: 7,
    time: '15:15',
    duration: 45,
    patient: 'Hugo Martin',
    type: 'Consultation',
    status: 'pending',
    unchanged: false
  }];

  // Mock optimization insights
  const optimizationInsights = [
  {
    id: 1,
    title: 'Réduction du temps mort',
    description:
    'Réduction de 45 minutes de temps mort entre les rendez-vous',
    impact: 'high',
    changes: [
    'Emma Petit avancée de 11:00 à 09:45',
    'Thomas Bernard déplacé de 09:45 à 10:30',
    'Lucas Dubois avancé de 13:00 à 11:30']

  },
  {
    id: 2,
    title: 'Meilleure répartition des types de traitement',
    description:
    'Alternance entre rendez-vous longs et courts pour réduire la fatigue',
    impact: 'medium',
    changes: [
    'Ajustement de Nathan Robert déplacé à 13:30',
    'Contrôle de Léa Richard déplacé à 14:30']

  },
  {
    id: 3,
    title: 'Optimisation de la fin de journée',
    description: 'Consultation de Hugo Martin avancée pour terminer plus tôt',
    impact: 'low',
    changes: [
    'Consultation avancée de 16:00 à 15:15',
    'Gain de 45 minutes en fin de journée']

  }];

  // Mock patient preferences
  const patientPreferences = [
  {
    id: 1,
    patient: 'Sophie Martin',
    preferences: ['Matinée', 'Lundi/Mercredi']
  },
  {
    id: 2,
    patient: 'Thomas Bernard',
    preferences: ['Après 10h', 'Mardi/Jeudi']
  },
  {
    id: 3,
    patient: 'Emma Petit',
    preferences: ['Matinée', 'Pas le vendredi']
  },
  {
    id: 4,
    patient: 'Lucas Dubois',
    preferences: ['Flexible']
  },
  {
    id: 5,
    patient: 'Nathan Robert',
    preferences: ['Après-midi', 'Pas le lundi']
  },
  {
    id: 6,
    patient: 'Léa Richard',
    preferences: ['Après-midi', 'Mercredi/Vendredi']
  },
  {
    id: 7,
    patient: 'Hugo Martin',
    preferences: ['Après 15h', 'Lundi/Mardi']
  }];

  const handleOptimizeSchedule = () => {
    setShowOptimizedSchedule(true);
    setOptimizationScore(93);
  };
  const handleApplyOptimization = () => {
    alert('Planning optimisé appliqué avec succès');
  };
  const handleToggleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100 dark:border-green-800';
      case 'medium':
        return 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-100 dark:border-blue-800';
      case 'low':
        return 'from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-100 dark:border-gray-700';
      default:
        return 'from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-100 dark:border-gray-700';
    }
  };
  const getImpactBadgeColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'medium':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'low':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  const getImpactIconBg = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-green-500 dark:bg-green-600';
      case 'medium':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'low':
        return 'bg-gray-500 dark:bg-gray-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };
  return (
    <div className="space-y-3">
      {/* Current Schedule */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <ActivityIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Planning actuel
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentSchedule.length} rendez-vous prévus
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-blue-200 dark:border-blue-700 gap-2">
              <BarChart2Icon className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-500">Score</span>
              <motion.span
                key={optimizationScore}
                initial={{
                  scale: 1.5,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                className={`text-base font-bold ${optimizationScore < 80 ? 'text-yellow-600' : 'text-green-600'}`}>

                {optimizationScore}
              </motion.span>
              <span className="text-xs text-gray-400">/ 100</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-blue-200 dark:border-blue-700">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs border-0 focus:ring-0 p-0 font-medium text-gray-900 dark:text-white dark:bg-gray-800" />

            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-blue-200 dark:border-blue-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-50 dark:bg-blue-900/30">
              <tr>
                {['Heure', 'Patient', 'Type', 'Durée', 'Statut'].map((h) =>
                <th
                  key={h}
                  className="px-3 py-2 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">

                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentSchedule.map((appointment, index) =>
              <tr
                key={appointment.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700">

                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {appointment.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {appointment.patient.
                        split(' ').
                        map((n) => n[0]).
                        join('')}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {appointment.patient}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                    {appointment.type}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                    {appointment.duration} min
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>

                      {appointment.status === 'confirmed' ?
                    'Confirmé' :
                    'En attente'}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleOptimizeSchedule}
            className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm">

            <SparklesIcon className="h-4 w-4 mr-1.5" />
            Optimiser le planning avec l'IA
            <ArrowRightIcon className="h-4 w-4 ml-1.5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showOptimizedSchedule &&
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -10
          }}
          className="space-y-3">

            {/* Optimized Schedule */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 border border-green-100 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-green-500 flex items-center justify-center">
                    <CheckCircleIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Planning optimisé
                    </h4>
                    <p className="text-xs text-gray-500">
                      Amélioration de {optimizationScore - 72} points
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-green-200 gap-1.5">
                  <AwardIcon className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-500">Nouveau score</span>
                  <span className="text-base font-bold text-green-600">
                    {optimizationScore}
                  </span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-green-200 dark:border-green-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-green-50 dark:bg-green-900/30">
                    <tr>
                      {[
                    'Heure',
                    'Patient',
                    'Type',
                    'Durée',
                    'Statut',
                    'Changement'].
                    map((h) =>
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">

                          {h}
                        </th>
                    )}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {optimizedSchedule.map((appointment) =>
                  <tr
                    key={appointment.id}
                    className={
                    appointment.unchanged ?
                    '' :
                    'bg-green-50 dark:bg-green-900/20'
                    }>

                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <ClockIcon className="h-3 w-3 text-green-500" />
                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                              {appointment.time}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {appointment.patient.
                            split(' ').
                            map((n) => n[0]).
                            join('')}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {appointment.patient}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                          {appointment.type}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                          {appointment.duration} min
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>

                            {appointment.status === 'confirmed' ?
                        'Confirmé' :
                        'En attente'}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {appointment.unchanged ?
                      <span className="inline-flex items-center text-xs text-gray-500">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Inchangé
                            </span> :

                      <span className="inline-flex items-center text-xs text-green-600 font-bold">
                              <ZapIcon className="h-3 w-3 mr-1" />
                              Déplacé
                            </span>
                      }
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                onClick={() => setShowOptimizedSchedule(false)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50">

                  Annuler
                </button>
                <button
                onClick={handleApplyOptimization}
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">

                  <SaveIcon className="h-3 w-3 mr-1.5" />
                  Appliquer l'optimisation
                </button>
              </div>
            </div>

            {/* Optimization Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-purple-500 flex items-center justify-center">
                  <ZapIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Explications de l'optimisation
                  </h4>
                  <p className="text-xs text-gray-500">
                    {optimizationInsights.length} améliorations détectées
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {optimizationInsights.map((insight) =>
              <div
                key={insight.id}
                className={`bg-gradient-to-br ${getImpactColor(insight.impact)} rounded-lg border overflow-hidden`}>

                    <div
                  className="p-3 cursor-pointer"
                  onClick={() => handleToggleDetails(insight.id)}>

                      <div className="flex items-start gap-2">
                        <div
                      className={`flex-shrink-0 h-7 w-7 rounded-lg ${getImpactIconBg(insight.impact)} flex items-center justify-center`}>

                          {insight.impact === 'high' ?
                      <TrendingUpIcon className="h-4 w-4 text-white" /> :
                      insight.impact === 'medium' ?
                      <RefreshCwIcon className="h-4 w-4 text-white" /> :

                      <ClockIcon className="h-4 w-4 text-white" />
                      }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                              {insight.title}
                            </h5>
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${getImpactBadgeColor(insight.impact)}`}>

                              Impact{' '}
                              {insight.impact === 'high' ?
                          'élevé' :
                          insight.impact === 'medium' ?
                          'moyen' :
                          'faible'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {insight.description}
                          </p>
                          <button className="flex items-center text-xs font-medium text-blue-600 mt-1">
                            {showDetails === insight.id ?
                        <>
                                <ChevronDownIcon className="h-3 w-3 mr-1" />
                                Masquer
                              </> :

                        <>
                                <ChevronRightIcon className="h-3 w-3 mr-1" />
                                Voir détails
                              </>
                        }
                          </button>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {showDetails === insight.id &&
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
                    className="border-t border-gray-200 overflow-hidden">

                          <div className="p-3 bg-white dark:bg-gray-800 space-y-1.5">
                            {insight.changes.map((change, idx) =>
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg border border-blue-100">

                                <ArrowRightIcon className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-900 dark:text-white">
                                  {change}
                                </span>
                              </div>
                      )}
                          </div>
                        </motion.div>
                  }
                    </AnimatePresence>
                  </div>
              )}
              </div>
            </div>

            {/* Patient Preferences */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-amber-500 flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    Préférences des patients
                  </h4>
                  <p className="text-xs text-gray-500">
                    Toutes les préférences ont été respectées
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-amber-200 dark:border-amber-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-amber-50 dark:bg-amber-900/30">
                    <tr>
                      {['Patient', 'Préférences', 'Respectées'].map((h) =>
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">

                          {h}
                        </th>
                    )}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {patientPreferences.map((patient) =>
                  <tr key={patient.id} className="hover:bg-amber-50/50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {patient.patient.
                            split(' ').
                            map((n) => n[0]).
                            join('')}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {patient.patient}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-1">
                            {patient.preferences.map((pref, idx) =>
                        <span
                          key={idx}
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">

                                {pref}
                              </span>
                        )}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          </div>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Info Section */}
      {!showOptimizedSchedule &&
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-start gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <InfoIcon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                À propos de l'optimisation des plannings
              </h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-400 mb-3">
                Notre système analyse votre planning et propose des ajustements
                pour maximiser l'efficacité en tenant compte des préférences
                patients et des contraintes du cabinet.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
              {
                icon: ClockIcon,
                value: '45 min',
                label: 'Gain de temps moyen',
                color: 'indigo'
              },
              {
                icon: CheckCircleIcon,
                value: '98%',
                label: 'Préférences respectées',
                color: 'green'
              },
              {
                icon: ShieldCheckIcon,
                value: '100%',
                label: 'Conforme RGPD',
                color: 'blue'
              }].
              map((item, i) =>
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-indigo-100 dark:border-indigo-700">

                    <div className="flex items-center gap-1.5 mb-1">
                      <item.icon
                    className={`h-3.5 w-3.5 text-${item.color}-600`} />

                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.value}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
              )}
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};
export default ScheduleOptimization;