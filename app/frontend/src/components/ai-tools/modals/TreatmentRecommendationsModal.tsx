import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  ListChecksIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  BarChart2Icon,
  TrendingUpIcon,
  AlertCircleIcon,
  InfoIcon,
  ChevronRightIcon,
  AwardIcon,
  ZapIcon,
  ShieldCheckIcon,
  EyeIcon } from
'lucide-react';
interface TreatmentRecommendationsModalProps {
  patientName: string;
  analysisData: any;
  onClose: () => void;
}
const TreatmentRecommendationsModal: React.FC<
  TreatmentRecommendationsModalProps> =
({ patientName, analysisData, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('plans');
  const treatmentPlans = [
  {
    id: 1,
    name: 'Appareil fixe + élastiques classe II',
    successRate: 87,
    duration: '24 mois',
    complexity: 'Moyenne',
    cost: '€€',
    description:
    'Traitement conventionnel avec brackets métalliques et élastiques intermaxillaires pour correction de la classe II.',
    advantages: [
    'Efficacité prouvée pour la correction de classe II',
    'Contrôle précis des mouvements dentaires',
    "Coût modéré par rapport à d'autres options"],

    disadvantages: [
    "Visibilité de l'appareil",
    'Nécessite une bonne coopération du patient',
    'Hygiène plus difficile'],

    timeline: [
    {
      phase: 'Alignement initial',
      duration: '6-8 mois'
    },
    {
      phase: 'Correction classe II',
      duration: '10-12 mois'
    },
    {
      phase: 'Finition',
      duration: '4-6 mois'
    }]

  },
  {
    id: 2,
    name: 'Aligneurs transparents série complète',
    successRate: 82,
    duration: '20 mois',
    complexity: 'Faible',
    cost: '€€€',
    description:
    'Traitement par aligneurs transparents avec séquence complète et auxiliaires de classe II intégrés.',
    advantages: [
    'Esthétique supérieure (quasi invisible)',
    'Hygiène facilitée (amovible)',
    'Confort amélioré'],

    disadvantages: [
    'Coût plus élevé',
    'Nécessite une discipline rigoureuse',
    'Efficacité légèrement réduite pour certains mouvements'],

    timeline: [
    {
      phase: 'Alignement',
      duration: '8-10 mois'
    },
    {
      phase: 'Correction classe II',
      duration: '8-10 mois'
    },
    {
      phase: 'Finition',
      duration: '2-4 mois'
    }]

  },
  {
    id: 3,
    name: 'Appareil fonctionnel + Phase fixe',
    successRate: 91,
    duration: '28 mois',
    complexity: 'Élevée',
    cost: '€€',
    description:
    'Traitement en deux phases avec appareil fonctionnel pour stimuler la croissance mandibulaire.',
    advantages: [
    'Correction squelettique et dentaire combinée',
    'Résultats plus stables à long terme',
    'Amélioration significative du profil facial'],

    disadvantages: [
    'Durée totale de traitement plus longue',
    'Nécessite une coopération importante',
    'Deux phases distinctes de traitement'],

    timeline: [
    {
      phase: 'Phase 1: Appareil fonctionnel',
      duration: '10-12 mois'
    },
    {
      phase: 'Transition',
      duration: '2-3 mois'
    },
    {
      phase: 'Phase 2: Appareil fixe',
      duration: '12-14 mois'
    }]

  }];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Faible':
        return 'bg-green-100 text-green-800';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'Élevée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const tabs = [
  {
    id: 'plans',
    name: 'Plans de traitement',
    icon: ListChecksIcon
  },
  {
    id: 'comparison',
    name: 'Comparaison',
    icon: BarChart2Icon
  }];

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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
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

                <AwardIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Recommandations de traitement
                </h3>
                <p className="text-indigo-100 text-sm mt-1">
                  Pour {patientName} - 3 plans suggérés
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-indigo-100">Plans disponibles</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-indigo-100">Taux de succès moyen</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-indigo-100">Durée moyenne</p>
              <p className="text-2xl font-bold">24 mois</p>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-gray-50 border-b-2 border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${activeTab === tab.id ? 'border-b-4 border-indigo-500 text-gray-900 font-bold' : 'border-b-4 border-transparent text-gray-600'} flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center transition-all hover:text-gray-900`}>

                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )}
          </nav>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'plans' &&
            <motion.div
              key="plans"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-4">

                {treatmentPlans.map((plan, index) =>
              <motion.div
                key={plan.id}
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
                onClick={() =>
                setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
                }
                className={`rounded-2xl p-6 border-2 cursor-pointer transition-all ${selectedPlan === plan.id ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-500 shadow-lg' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'}`}>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div
                        className={`h-12 w-12 rounded-full ${selectedPlan === plan.id ? 'bg-indigo-500' : 'bg-purple-500'} flex items-center justify-center mr-4`}>

                            <AwardIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900 text-lg">
                              {plan.name}
                            </h5>
                            <p className="text-sm text-gray-600 mt-1">
                              {plan.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            <StarIcon className="h-3 w-3 mr-1" />
                            {plan.successRate}% de réussite
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {plan.duration}
                          </span>
                          <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getComplexityColor(plan.complexity)}`}>

                            <BarChart2Icon className="h-3 w-3 mr-1" />
                            {plan.complexity}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                            Coût: {plan.cost}
                          </span>
                        </div>
                        <AnimatePresence>
                          {selectedPlan === plan.id &&
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0
                        }}
                        animate={{
                          opacity: 1,
                          height: 'auto'
                        }}
                        exit={{
                          opacity: 0,
                          height: 0
                        }}
                        className="space-y-4 mt-4">

                              {/* Timeline */}
                              <div className="bg-white rounded-xl p-4 border-2 border-indigo-200">
                                <h6 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-2 text-indigo-600" />
                                  Chronologie du traitement
                                </h6>
                                <div className="space-y-2">
                                  {plan.timeline.map((phase, idx) =>
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">

                                      <span className="text-sm text-gray-700">
                                        {phase.phase}
                                      </span>
                                      <span className="text-sm font-bold text-indigo-600">
                                        {phase.duration}
                                      </span>
                                    </div>
                            )}
                                </div>
                              </div>
                              {/* Advantages & Disadvantages */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                                  <h6 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                                    <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
                                    Avantages
                                  </h6>
                                  <ul className="space-y-2">
                                    {plan.advantages.map((adv, idx) =>
                              <li
                                key={idx}
                                className="text-xs text-gray-700 flex items-start">

                                        <span className="text-green-500 mr-2">
                                          ✓
                                        </span>
                                        {adv}
                                      </li>
                              )}
                                  </ul>
                                </div>
                                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                                  <h6 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                                    <AlertCircleIcon className="h-4 w-4 mr-2 text-red-600" />
                                    Inconvénients
                                  </h6>
                                  <ul className="space-y-2">
                                    {plan.disadvantages.map((dis, idx) =>
                              <li
                                key={idx}
                                className="text-xs text-gray-700 flex items-start">

                                        <span className="text-red-500 mr-2">
                                          ✗
                                        </span>
                                        {dis}
                                      </li>
                              )}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                      }
                        </AnimatePresence>
                      </div>
                      <div className="ml-4">
                        <motion.div
                      animate={{
                        rotate: selectedPlan === plan.id ? 90 : 0
                      }}
                      transition={{
                        duration: 0.2
                      }}>

                          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
              )}
              </motion.div>
            }
            {activeTab === 'comparison' &&
            <motion.div
              key="comparison"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-6">

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden border-2 border-blue-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                          Critère
                        </th>
                        {treatmentPlans.map((plan) =>
                      <th
                        key={plan.id}
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">

                            {plan.name.split(' ')[0]}
                          </th>
                      )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Taux de succès
                        </td>
                        {treatmentPlans.map((plan) =>
                      <td
                        key={plan.id}
                        className="px-6 py-4 text-sm text-gray-600">

                            {plan.successRate}%
                          </td>
                      )}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Durée
                        </td>
                        {treatmentPlans.map((plan) =>
                      <td
                        key={plan.id}
                        className="px-6 py-4 text-sm text-gray-600">

                            {plan.duration}
                          </td>
                      )}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Complexité
                        </td>
                        {treatmentPlans.map((plan) =>
                      <td key={plan.id} className="px-6 py-4 text-sm">
                            <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${getComplexityColor(plan.complexity)}`}>

                              {plan.complexity}
                            </span>
                          </td>
                      )}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Coût
                        </td>
                        {treatmentPlans.map((plan) =>
                      <td
                        key={plan.id}
                        className="px-6 py-4 text-sm text-gray-600">

                            {plan.cost}
                          </td>
                      )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
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
              className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all">

              Valider le plan sélectionné
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default TreatmentRecommendationsModal;