import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  AwardIcon,
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  StarIcon,
  ClockIcon,
  BarChart2Icon,
  ShieldCheckIcon,
  TrendingUpIcon,
  ZapIcon,
  InfoIcon,
  DownloadIcon } from
'lucide-react';
interface AllTreatmentRecommendationsModalProps {
  recommendations: any[];
  onClose: () => void;
  onSelectRecommendation: (recId: number) => void;
}
const AllTreatmentRecommendationsModal: React.FC<
  AllTreatmentRecommendationsModalProps> =
({ recommendations, onClose, onSelectRecommendation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterComplexity, setFilterComplexity] = useState('all');
  const [sortBy, setSortBy] = useState('successRate');
  // Extended recommendations with additional data
  const extendedRecommendations = [
  ...recommendations,
  {
    id: 4,
    name: 'Appareil lingual + élastiques',
    successRate: 84,
    duration: '26 mois',
    complexity: 'Élevée',
    cost: '€€€€',
    similarCases: 18,
    description:
    'Traitement avec brackets linguaux (invisibles) et correction de classe II par élastiques.',
    category: 'Esthétique',
    ageRange: '14-18 ans'
  },
  {
    id: 5,
    name: 'Mini-vis + appareil fixe',
    successRate: 90,
    duration: '22 mois',
    complexity: 'Élevée',
    cost: '€€€',
    similarCases: 25,
    description:
    "Utilisation de mini-vis d'ancrage pour optimiser les mouvements dentaires.",
    category: 'Avancé',
    ageRange: '15+ ans'
  },
  {
    id: 6,
    name: 'Aligneurs + auxiliaires',
    successRate: 85,
    duration: '18 mois',
    complexity: 'Moyenne',
    cost: '€€€',
    similarCases: 31,
    description:
    'Aligneurs transparents avec élastiques et boutons pour cas modérés.',
    category: 'Esthétique',
    ageRange: '13-17 ans'
  },
  {
    id: 7,
    name: 'Appareil amovible + fixe',
    successRate: 88,
    duration: '30 mois',
    complexity: 'Moyenne',
    cost: '€€',
    similarCases: 22,
    description:
    "Phase initiale avec appareil amovible suivie d'un traitement fixe.",
    category: 'Deux phases',
    ageRange: '11-14 ans'
  }];

  const filteredRecommendations = extendedRecommendations.
  filter((rec) => {
    const matchesSearch = rec.name.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesComplexity =
    filterComplexity === 'all' || rec.complexity === filterComplexity;
    return matchesSearch && matchesComplexity;
  }).
  sort((a, b) => {
    switch (sortBy) {
      case 'successRate':
        return b.successRate - a.successRate;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'cost':
        return a.cost.length - b.cost.length;
      case 'similarCases':
        return b.similarCases - a.similarCases;
      default:
        return 0;
    }
  });
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Faible':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Élevée':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Esthétique':
        return 'bg-purple-100 text-purple-800';
      case 'Avancé':
        return 'bg-blue-100 text-blue-800';
      case 'Deux phases':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const stats = {
    total: extendedRecommendations.length,
    avgSuccessRate: Math.round(
      extendedRecommendations.reduce((sum, rec) => sum + rec.successRate, 0) /
      extendedRecommendations.length
    ),
    totalCases: extendedRecommendations.reduce(
      (sum, rec) => sum + rec.similarCases,
      0
    )
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
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
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

                <AwardIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Toutes les recommandations de traitement
                </h3>
                <p className="text-purple-100 text-sm mt-1">
                  {filteredRecommendations.length} options de traitement
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
              <p className="text-xs text-purple-100">Plans disponibles</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Taux de succès moyen</p>
              <p className="text-2xl font-bold">{stats.avgSuccessRate}%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-purple-100">Cas similaires totaux</p>
              <p className="text-2xl font-bold">{stats.totalCases}</p>
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
                  placeholder="Rechercher un traitement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" />

              </div>
            </div>
            <select
              value={filterComplexity}
              onChange={(e) => setFilterComplexity(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all">

              <option value="all">Toutes les complexités</option>
              <option value="Faible">Faible</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Élevée">Élevée</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all">

              <option value="successRate">Taux de succès</option>
              <option value="duration">Durée</option>
              <option value="cost">Coût</option>
              <option value="similarCases">Cas similaires</option>
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
        {/* Recommendations Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredRecommendations.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                scale: 1.02,
                y: -4
              }}
              onClick={() => onSelectRecommendation(rec.id)}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all cursor-pointer">

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                        <AwardIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 text-base">
                          {rec.name}
                        </h5>
                        {rec.category &&
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${getCategoryColor(rec.category)}`}>

                            {rec.category}
                          </span>
                    }
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {rec.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-center mb-1">
                        <StarIcon className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-xs font-medium text-gray-600">
                          Succès
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-700">
                        {rec.successRate}%
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center mb-1">
                        <ClockIcon className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-xs font-medium text-gray-600">
                          Durée
                        </span>
                      </div>
                      <p className="text-lg font-bold text-blue-700">
                        {rec.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border-2 ${getComplexityColor(rec.complexity)}`}>

                      <BarChart2Icon className="h-3 w-3 mr-1" />
                      {rec.complexity}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border-2 border-purple-200">
                      Coût: {rec.cost}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border-2 border-indigo-200">
                      <ShieldCheckIcon className="h-3 w-3 mr-1" />
                      {rec.similarCases} cas
                    </span>
                  </div>
                  {rec.ageRange &&
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <p className="text-xs text-gray-600">
                        <span className="font-bold">
                          Tranche d'âge recommandée:
                        </span>{' '}
                        {rec.ageRange}
                      </p>
                    </div>
              }
                </motion.div>
            )}
            </div> :

          <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <AwardIcon className="h-10 w-10 text-gray-400" />
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
            <div className="flex items-center">
              <InfoIcon className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-sm text-gray-600">
                {filteredRecommendations.length} plans affichés sur{' '}
                {extendedRecommendations.length} total
              </p>
            </div>
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
export default AllTreatmentRecommendationsModal;