import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  BrainIcon,
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  DownloadIcon,
  ListChecksIcon,
  AlertCircleIcon,
  BarChart2Icon,
  TrendingUpIcon,
  SparklesIcon,
  ZapIcon,
  CheckCircleIcon } from
'lucide-react';
interface AIActivityHistoryProps {
  onClose: () => void;
  onSelectActivity: (activity: any) => void;
}
const AIActivityHistory: React.FC<AIActivityHistoryProps> = ({
  onClose,
  onSelectActivity
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  // Extended mock data
  const allActivities = [
  {
    id: 1,
    type: 'analysis',
    patientName: 'Sophie Martin',
    action: 'Analyse IA complétée',
    time: 'Il y a 2 heures',
    result: 'Classe II division 1 détectée',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    confidence: 94
  },
  {
    id: 2,
    type: 'recommendation',
    patientName: 'Thomas Bernard',
    action: 'Recommandation générée',
    time: 'Il y a 4 heures',
    result: 'Aligneurs transparents suggérés',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    confidence: 91
  },
  {
    id: 3,
    type: 'alert',
    patientName: 'Lucas Dubois',
    action: 'Alerte de progression',
    time: 'Il y a 1 jour',
    result: 'Déplacement inférieur aux prévisions',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    confidence: 87
  },
  {
    id: 4,
    type: 'optimization',
    patientName: '',
    action: 'Planning optimisé',
    time: 'Il y a 2 jours',
    result: 'Gain de 45 minutes/jour estimé',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    confidence: 89
  },
  {
    id: 5,
    type: 'analysis',
    patientName: 'Emma Petit',
    action: 'Analyse IA complétée',
    time: 'Il y a 3 jours',
    result: 'Classe I avec encombrement détectée',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    confidence: 96
  },
  {
    id: 6,
    type: 'recommendation',
    patientName: 'Nathan Robert',
    action: 'Recommandation générée',
    time: 'Il y a 4 jours',
    result: 'Appareil fixe recommandé',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    confidence: 92
  },
  {
    id: 7,
    type: 'alert',
    patientName: 'Léa Richard',
    action: 'Alerte de compliance',
    time: 'Il y a 5 jours',
    result: 'Port des élastiques insuffisant',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    confidence: 88
  },
  {
    id: 8,
    type: 'analysis',
    patientName: 'Hugo Laurent',
    action: 'Analyse IA complétée',
    time: 'Il y a 6 jours',
    result: 'Classe III squelettique détectée',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    confidence: 93
  },
  {
    id: 9,
    type: 'optimization',
    patientName: '',
    action: 'Optimisation des stocks',
    time: 'Il y a 1 semaine',
    result: 'Commande de matériel suggérée',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    confidence: 85
  },
  {
    id: 10,
    type: 'recommendation',
    patientName: 'Chloé Dubois',
    action: 'Recommandation générée',
    time: 'Il y a 1 semaine',
    result: 'Extraction de prémolaires suggérée',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    confidence: 90
  }];

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
    activity.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.result.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    let matchesDate = true;
    if (filterDate === 'today') {
      matchesDate = activity.date > new Date(Date.now() - 24 * 60 * 60 * 1000);
    } else if (filterDate === 'week') {
      matchesDate =
      activity.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (filterDate === 'month') {
      matchesDate =
      activity.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    return matchesSearch && matchesType && matchesDate;
  });
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <BrainIcon className="h-5 w-5 text-blue-600" />;
      case 'recommendation':
        return <ListChecksIcon className="h-5 w-5 text-green-600" />;
      case 'alert':
        return <AlertCircleIcon className="h-5 w-5 text-amber-600" />;
      case 'optimization':
        return <CalendarIcon className="h-5 w-5 text-indigo-600" />;
      default:
        return <BrainIcon className="h-5 w-5 text-blue-600" />;
    }
  };
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'analysis':
        return 'bg-blue-50 border-blue-100';
      case 'recommendation':
        return 'bg-green-50 border-green-100';
      case 'alert':
        return 'bg-amber-50 border-amber-100';
      case 'optimization':
        return 'bg-indigo-50 border-indigo-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'analysis':
        return 'Analyse';
      case 'recommendation':
        return 'Recommandation';
      case 'alert':
        return 'Alerte';
      case 'optimization':
        return 'Optimisation';
      default:
        return 'Activité';
    }
  };
  const stats = {
    total: allActivities.length,
    analysis: allActivities.filter((a) => a.type === 'analysis').length,
    recommendations: allActivities.filter((a) => a.type === 'recommendation').
    length,
    alerts: allActivities.filter((a) => a.type === 'alert').length,
    optimizations: allActivities.filter((a) => a.type === 'optimization').
    length
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

                <SparklesIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Historique complet des activités IA
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  {filteredActivities.length} activités sur{' '}
                  {allActivities.length} total
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
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Analyses</p>
              <p className="text-2xl font-bold">{stats.analysis}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Recommandations</p>
              <p className="text-2xl font-bold">{stats.recommendations}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Alertes</p>
              <p className="text-2xl font-bold">{stats.alerts}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-blue-100">Optimisations</p>
              <p className="text-2xl font-bold">{stats.optimizations}</p>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-gray-50 p-6 border-b-2 border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une activité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />

            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all">

              <option value="all">Tous les types</option>
              <option value="analysis">Analyses</option>
              <option value="recommendation">Recommandations</option>
              <option value="alert">Alertes</option>
              <option value="optimization">Optimisations</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all">

              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">

              <DownloadIcon className="h-4 w-4 mr-2" />
              Exporter
            </motion.button>
          </div>
        </div>
        {/* Activities List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredActivities.length > 0 ?
          <div className="space-y-4">
              {filteredActivities.map((activity, index) =>
            <motion.div
              key={activity.id}
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
              whileHover={{
                scale: 1.01,
                y: -2
              }}
              onClick={() => onSelectActivity(activity)}
              className={`rounded-xl p-5 border-2 ${getActivityColor(activity.type)} hover:shadow-lg transition-all cursor-pointer`}>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white flex items-center justify-center border-2 border-gray-100 mr-4">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${activity.type === 'analysis' ? 'bg-blue-100 text-blue-800' : activity.type === 'recommendation' ? 'bg-green-100 text-green-800' : activity.type === 'alert' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>

                            {getActivityLabel(activity.type)}
                          </span>
                          {activity.patientName &&
                      <span className="text-sm font-bold text-gray-900">
                              {activity.patientName}
                            </span>
                      }
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {activity.time}
                          </div>
                          <div className="flex items-center text-xs">
                            <CheckCircleIcon className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-green-600 font-bold">
                              {activity.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-700">{activity.result}</p>
                    </div>
                    <ChevronRightIcon className="h-6 w-6 text-gray-400 ml-4 flex-shrink-0" />
                  </div>
                </motion.div>
            )}
            </div> :

          <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Aucune activité trouvée
              </h3>
              <p className="text-sm text-gray-600">
                Essayez de modifier vos filtres de recherche
              </p>
            </div>
          }
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredActivities.length} activités affichées sur{' '}
              {allActivities.length} total
            </p>
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
export default AIActivityHistory;