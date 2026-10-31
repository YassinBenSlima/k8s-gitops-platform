import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  AlertCircleIcon,
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  TrendingDownIcon,
  CalendarIcon,
  UserIcon,
  ZapIcon,
  DownloadIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ClockIcon } from
'lucide-react';
interface AllAtRiskCasesProps {
  onClose: () => void;
  onSelectCase: (caseData: any) => void;
}
const AllAtRiskCases: React.FC<AllAtRiskCasesProps> = ({
  onClose,
  onSelectCase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  // Extended mock data
  const allAtRiskCases = [
  {
    id: 1,
    patientName: 'Sophie Martin',
    age: 14,
    issue: 'Retard de progression',
    type: 'progression',
    severity: 'high',
    timeElapsed: '2 semaines',
    recommendation: 'Ajustement des élastiques',
    lastVisit: '05/06/2023',
    nextVisit: '20/06/2023',
    progress: 40,
    expectedProgress: 55
  },
  {
    id: 2,
    patientName: 'Thomas Bernard',
    age: 12,
    issue: 'Rendez-vous manqués',
    type: 'appointment',
    severity: 'medium',
    timeElapsed: '1 mois',
    recommendation: 'Contacter le patient',
    lastVisit: '01/05/2023',
    nextVisit: 'Non programmé',
    progress: 30,
    expectedProgress: 45
  },
  {
    id: 3,
    patientName: 'Lucas Dubois',
    age: 15,
    issue: 'Coopération insuffisante',
    type: 'compliance',
    severity: 'medium',
    timeElapsed: '3 semaines',
    recommendation: 'Entretien de motivation',
    lastVisit: '10/06/2023',
    nextVisit: '25/06/2023',
    progress: 20,
    expectedProgress: 35
  },
  {
    id: 4,
    patientName: 'Emma Petit',
    age: 16,
    issue: 'Dépassement durée prévue',
    type: 'duration',
    severity: 'low',
    timeElapsed: '2 mois',
    recommendation: 'Réévaluation du plan',
    lastVisit: '15/06/2023',
    nextVisit: '30/06/2023',
    progress: 65,
    expectedProgress: 80
  },
  {
    id: 5,
    patientName: 'Nathan Robert',
    age: 13,
    issue: "Problème d'hygiène",
    type: 'hygiene',
    severity: 'high',
    timeElapsed: '1 semaine',
    recommendation: 'Nettoyage professionnel urgent',
    lastVisit: '12/06/2023',
    nextVisit: '19/06/2023',
    progress: 35,
    expectedProgress: 40
  },
  {
    id: 6,
    patientName: 'Léa Moreau',
    age: 14,
    issue: 'Douleur persistante',
    type: 'pain',
    severity: 'medium',
    timeElapsed: '10 jours',
    recommendation: 'Examen approfondi',
    lastVisit: '08/06/2023',
    nextVisit: '22/06/2023',
    progress: 50,
    expectedProgress: 60
  },
  {
    id: 7,
    patientName: 'Hugo Laurent',
    age: 15,
    issue: 'Décollement de brackets',
    type: 'equipment',
    severity: 'high',
    timeElapsed: '3 jours',
    recommendation: 'Réparation immédiate',
    lastVisit: '14/06/2023',
    nextVisit: '18/06/2023',
    progress: 45,
    expectedProgress: 50
  }];

  const filteredCases = allAtRiskCases.filter((caseItem) => {
    const matchesSearch = caseItem.patientName.
    toLowerCase().
    includes(searchTerm.toLowerCase());
    const matchesSeverity =
    filterSeverity === 'all' || caseItem.severity === filterSeverity;
    const matchesType = filterType === 'all' || caseItem.type === filterType;
    return matchesSearch && matchesSeverity && matchesType;
  });
  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return '🔴 Élevée';
      case 'medium':
        return '🟡 Moyenne';
      case 'low':
        return '🔵 Faible';
      default:
        return 'Inconnue';
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'progression':
        return <TrendingDownIcon className="h-5 w-5" />;
      case 'appointment':
        return <CalendarIcon className="h-5 w-5" />;
      case 'compliance':
        return <AlertTriangleIcon className="h-5 w-5" />;
      case 'duration':
        return <ClockIcon className="h-5 w-5" />;
      case 'hygiene':
        return <AlertCircleIcon className="h-5 w-5" />;
      case 'pain':
        return <AlertCircleIcon className="h-5 w-5" />;
      case 'equipment':
        return <AlertCircleIcon className="h-5 w-5" />;
      default:
        return <AlertCircleIcon className="h-5 w-5" />;
    }
  };
  const severityStats = {
    high: allAtRiskCases.filter((c) => c.severity === 'high').length,
    medium: allAtRiskCases.filter((c) => c.severity === 'medium').length,
    low: allAtRiskCases.filter((c) => c.severity === 'low').length
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
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-6 text-white">
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

                <AlertCircleIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">Tous les cas à risque</h3>
                <p className="text-orange-100 text-sm mt-1">
                  {filteredCases.length} cas nécessitent votre attention
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
              <p className="text-xs text-orange-100">Sévérité élevée</p>
              <p className="text-2xl font-bold">{severityStats.high}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-orange-100">Sévérité moyenne</p>
              <p className="text-2xl font-bold">{severityStats.medium}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-orange-100">Sévérité faible</p>
              <p className="text-2xl font-bold">{severityStats.low}</p>
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
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" />

              </div>
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white transition-all">

              <option value="all">Toutes les sévérités</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Faible</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white transition-all">

              <option value="all">Tous les types</option>
              <option value="progression">Progression</option>
              <option value="appointment">Rendez-vous</option>
              <option value="compliance">Coopération</option>
              <option value="duration">Durée</option>
              <option value="hygiene">Hygiène</option>
              <option value="pain">Douleur</option>
              <option value="equipment">Équipement</option>
            </select>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-medium hover:from-red-700 hover:to-orange-700 transition-all shadow-md">

              <DownloadIcon className="h-4 w-4 mr-2" />
              Exporter
            </motion.button>
          </div>
        </div>
        {/* Cases List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredCases.length > 0 ?
          <div className="space-y-4">
              {filteredCases.map((caseItem, index) =>
            <motion.div
              key={caseItem.id}
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
              onClick={() => onSelectCase(caseItem)}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer">

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white font-semibold mr-4">
                      {caseItem.patientName.
                  split(' ').
                  map((n) => n[0]).
                  join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            {caseItem.patientName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {caseItem.age} ans
                          </p>
                        </div>
                        <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${getSeverityColor(caseItem.severity)}`}>

                          {getSeverityBadge(caseItem.severity)}
                        </span>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            {getTypeIcon(caseItem.type)}
                          </div>
                          <p className="text-sm font-bold text-gray-900">
                            {caseItem.issue}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span className="mr-4">{caseItem.timeElapsed}</span>
                          <ZapIcon className="h-4 w-4 mr-1 text-blue-500" />
                          <span className="text-blue-600 font-medium">
                            {caseItem.recommendation}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Dernière visite
                          </p>
                          <p className="text-xs font-bold text-gray-900">
                            {caseItem.lastVisit}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Prochaine visite
                          </p>
                          <p className="text-xs font-bold text-gray-900">
                            {caseItem.nextVisit}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">
                            Progression
                          </p>
                          <p className="text-xs font-bold text-gray-900">
                            {caseItem.progress}% / {caseItem.expectedProgress}%
                          </p>
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
                Aucun cas trouvé
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
              {filteredCases.length} cas affichés sur {allAtRiskCases.length}{' '}
              total
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
export default AllAtRiskCases;