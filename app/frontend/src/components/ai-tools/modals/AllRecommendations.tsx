import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  BrainIcon,
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  DownloadIcon,
  ListChecksIcon,
  ZapIcon,
  CalendarIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  ClockIcon,
  UserIcon } from
'lucide-react';
interface AllRecommendationsProps {
  onClose: () => void;
  onSelectRecommendation: (recommendation: any) => void;
}
const AllRecommendations: React.FC<AllRecommendationsProps> = ({
  onClose,
  onSelectRecommendation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  // Extended mock data
  const allRecommendations = [
  {
    id: 1,
    patientName: 'Emma Petit',
    age: 16,
    type: 'Plan de traitement',
    category: 'Optimisation',
    date: "Aujourd'hui",
    confidence: 92,
    priority: 'high',
    status: 'pending',
    description: 'Ajustement du plan de traitement pour optimiser la durée'
  },
  {
    id: 2,
    patientName: 'Nathan Robert',
    age: 13,
    type: "Ajustement d'appareil",
    category: 'Mécanique',
    date: 'Hier',
    confidence: 87,
    priority: 'high',
    status: 'pending',
    description: 'Augmentation de la force des élastiques recommandée'
  },
  {
    id: 3,
    patientName: 'Léa Moreau',
    age: 14,
    type: 'Suivi renforcé',
    category: 'Monitoring',
    date: 'Il y a 2 jours',
    confidence: 89,
    priority: 'medium',
    status: 'pending',
    description: "Réduction de l'intervalle entre rendez-vous suggérée"
  },
  {
    id: 4,
    patientName: 'Hugo Laurent',
    age: 15,
    type: 'Modification du protocole',
    category: 'Stratégie',
    date: 'Il y a 3 jours',
    confidence: 94,
    priority: 'high',
    status: 'reviewed',
    description: "Changement d'approche thérapeutique recommandé"
  },
  {
    id: 5,
    patientName: 'Chloé Dubois',
    age: 12,
    type: 'Examen complémentaire',
    category: 'Diagnostic',
    date: 'Il y a 4 jours',
    confidence: 85,
    priority: 'medium',
    status: 'pending',
    description: 'Téléradiographie de profil recommandée'
  },
  {
    id: 6,
    patientName: 'Maxime Bernard',
    age: 16,
    type: 'Anticipation de phase',
    category: 'Planning',
    date: 'Il y a 5 jours',
    confidence: 91,
    priority: 'low',
    status: 'approved',
    description: 'Anticipation de la phase de finition possible'
  },
  {
    id: 7,
    patientName: 'Sarah Martin',
    age: 14,
    type: 'Changement de matériel',
    category: 'Équipement',
    date: 'Il y a 1 semaine',
    confidence: 88,
    priority: 'medium',
    status: 'pending',
    description: 'Passage aux aligneurs transparents suggéré'
  }];

  const filteredRecommendations = allRecommendations.filter((rec) => {
    const matchesSearch = rec.patientName.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || rec.category === filterType;
    const matchesStatus = filterStatus === 'all' || rec.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });
  const getTypeIcon = (category: string) => {
    switch (category) {
      case 'Optimisation':
        return <TrendingUpIcon className="h-5 w-5" />;
      case 'Mécanique':
        return <ZapIcon className="h-5 w-5" />;
      case 'Monitoring':
        return <ClockIcon className="h-5 w-5" />;
      case 'Stratégie':
        return <ListChecksIcon className="h-5 w-5" />;
      case 'Diagnostic':
        return <AlertCircleIcon className="h-5 w-5" />;
      case 'Planning':
        return <CalendarIcon className="h-5 w-5" />;
      case 'Équipement':
        return <ZapIcon className="h-5 w-5" />;
      default:
        return <BrainIcon className="h-5 w-5" />;
    }
  };
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'En attente',
          color: 'bg-yellow-100 text-yellow-800'
        };
      case 'reviewed':
        return {
          text: 'Examinée',
          color: 'bg-blue-100 text-blue-800'
        };
      case 'approved':
        return {
          text: 'Approuvée',
          color: 'bg-green-100 text-green-800'
        };
      case 'rejected':
        return {
          text: 'Rejetée',
          color: 'bg-red-100 text-red-800'
        };
      default:
        return {
          text: 'Inconnue',
          color: 'bg-gray-100 text-gray-800'
        };
    }
  };
  const statusStats = {
    pending: allRecommendations.filter((r) => r.status === 'pending').length,
    reviewed: allRecommendations.filter((r) => r.status === 'reviewed').length,
    approved: allRecommendations.filter((r) => r.status === 'approved').length
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
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white">
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

                <BrainIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Toutes les recommandations
                </h3>
                <p className="text-purple-100 text-sm mt-1">
                  {filteredRecommendations.length} recommandations IA
                  disponibles
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
              <p className="text-xs text-purple-100">En attente</p>
              <p className="text-2xl font-bold">{statusStats.pending}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Examinées</p>
              <p className="text-2xl font-bold">{statusStats.reviewed}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Approuvées</p>
              <p className="text-2xl font-bold">{statusStats.approved}</p>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-gray-50 p-6 border-b-2 border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un patient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" />

              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all">

              <option value="all">Toutes les catégories</option>
              <option value="Optimisation">Optimisation</option>
              <option value="Mécanique">Mécanique</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Stratégie">Stratégie</option>
              <option value="Diagnostic">Diagnostic</option>
              <option value="Planning">Planning</option>
              <option value="Équipement">Équipement</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all">

              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="reviewed">Examinées</option>
              <option value="approved">Approuvées</option>
              <option value="rejected">Rejetées</option>
            </select>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md">

              <DownloadIcon className="h-4 w-4 mr-2" />
              Exporter
            </motion.button>
          </div>
        </div>
        {/* Recommendations List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredRecommendations.length > 0 ?
          <div className="space-y-4">
              {filteredRecommendations.map((rec, index) =>
            <motion.div
              key={rec.id}
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
              onClick={() => onSelectRecommendation(rec)}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer">

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-semibold mr-4">
                      {rec.patientName.
                  split(' ').
                  map((n) => n[0]).
                  join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            {rec.patientName}
                          </p>
                          <p className="text-sm text-gray-600">{rec.age} ans</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityBadge(rec.priority)}`}>

                            {rec.priority === 'high' ?
                        '🔴 Priorité haute' :
                        rec.priority === 'medium' ?
                        '🟡 Priorité moyenne' :
                        '🔵 Priorité basse'}
                          </span>
                          <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(rec.status).color}`}>

                            {getStatusBadge(rec.status).text}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            {getTypeIcon(rec.category)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              {rec.type}
                            </p>
                            <p className="text-xs text-gray-600">
                              {rec.category}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {rec.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {rec.date}
                          </div>
                          <div className="flex items-center">
                            <ShieldCheckIcon className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-green-600 font-bold">
                              {rec.confidence}% confiance
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-6 w-6 text-gray-400 ml-4 flex-shrink-0" />
                  </div>
                </motion.div>
            )}
            </div> :

          <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Aucune recommandation trouvée
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
              {filteredRecommendations.length} recommandations affichées sur{' '}
              {allRecommendations.length} total
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
export default AllRecommendations;