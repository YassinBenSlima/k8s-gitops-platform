import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  SaveIcon,
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  PlusIcon,
  TrashIcon,
  ClipboardIcon,
  SparklesIcon,
  HeartPulseIcon,
  AwardIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouveauDevis = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).
    toISOString().
    split('T')[0],
    treatment: '',
    items: [
    {
      description: '',
      amount: ''
    }],

    notes: 'Devis valable 30 jours. Possibilité de paiement en plusieurs fois.',
    mutuelle: 'CNAM',
    tauxCouverture: '60'
  });
  // Mock data for patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '06 12 34 56 78',
    address: "123 Rue de l'Orthodontie, 75000 Paris"
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com',
    phone: '06 23 45 67 89',
    address: '456 Avenue des Aligneurs, 75001 Paris'
  },
  {
    id: 3,
    name: 'Emma Petit',
    email: 'emma.petit@email.com',
    phone: '06 34 56 78 90',
    address: '789 Boulevard du Sourire, 75002 Paris'
  }];

  // Mock data for treatments
  const treatments = [
  {
    id: 1,
    name: 'Orthodontie complète - Appareil fixe'
  },
  {
    id: 2,
    name: 'Orthodontie complète - Aligneurs'
  },
  {
    id: 3,
    name: 'Traitement partiel - Appareil fixe'
  },
  {
    id: 4,
    name: 'Traitement partiel - Aligneurs'
  },
  {
    id: 5,
    name: 'Contention'
  }];

  // Mock data for mutuelles
  const mutuelles = [
  {
    id: 1,
    name: 'CNAM'
  },
  {
    id: 2,
    name: 'CNRPS'
  },
  {
    id: 3,
    name: 'Assurance Carte'
  },
  {
    id: 4,
    name: 'MGPTT'
  },
  {
    id: 5,
    name: 'MDS'
  }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({
      ...formData,
      items: newItems
    });
  };
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
      ...formData.items,
      {
        description: '',
        amount: ''
      }]

    });
  };
  const handleRemoveItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      items: newItems
    });
  };
  const calculateTotal = () => {
    return formData.items.
    reduce((total, item) => {
      const amount = parseFloat(item.amount) || 0;
      return total + amount;
    }, 0).
    toFixed(2);
  };
  const calculateCoverage = () => {
    const total = parseFloat(calculateTotal());
    const coverage = (
    total * (
    parseFloat(formData.tauxCouverture) / 100)).
    toFixed(2);
    return coverage;
  };
  const calculatePatientShare = () => {
    const total = parseFloat(calculateTotal());
    const coverage = parseFloat(calculateCoverage());
    return (total - coverage).toFixed(2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };
  const handleSuccessComplete = () => {
    setShowSuccess(false);
    navigate('/administration');
  };
  const handleBack = () => {
    navigate('/administration');
  };
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                onClick={handleBack}
                className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

                <ArrowLeftIcon className="h-5 w-5 text-white" />
              </motion.button>
              <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <FileTextIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Nouveau Devis</h3>
                <p className="text-orange-100 text-sm mt-1">
                  Créer un nouveau devis pour un patient
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <AwardIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <div className="text-xs text-orange-100">Statut</div>
                <div className="text-sm font-bold">Brouillon</div>
              </div>
            </div>
          </div>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
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
              delay: 0.1
            }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Informations Patient
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sélectionner le patient concerné
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="patient"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Patient
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      id="patient"
                      name="patient"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.patient}
                      onChange={handleChange}
                      required>

                      <option value="">Sélectionner un patient</option>
                      {patients.map((patient) =>
                      <option key={patient.id} value={patient.id}>
                          {patient.name}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="treatment"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Traitement
                  </label>
                  <div className="relative">
                    <ClipboardIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      id="treatment"
                      name="treatment"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.treatment}
                      onChange={handleChange}
                      required>

                      <option value="">Sélectionner un traitement</option>
                      {treatments.map((treatment) =>
                      <option key={treatment.id} value={treatment.id}>
                          {treatment.name}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.date}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="validUntil"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Valable jusqu'au
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="validUntil"
                      name="validUntil"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.validUntil}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Devis Items */}
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
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <FileTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Éléments du devis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Détailler les prestations proposées
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-40">
                        Montant (DT)
                      </th>
                      <th className="px-4 py-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {formData.items.map((item, index) =>
                    <tr key={index}>
                        <td className="px-4 py-3">
                          <input
                          type="text"
                          className="block w-full text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 py-2 px-3"
                          placeholder="Description de la prestation"
                          value={item.description}
                          onChange={(e) =>
                          handleItemChange(
                            index,
                            'description',
                            e.target.value
                          )
                          }
                          required />

                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="block w-full text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-right py-2 px-3"
                            placeholder="0.00"
                            value={item.amount}
                            onChange={(e) =>
                            handleItemChange(
                              index,
                              'amount',
                              e.target.value
                            )
                            }
                            required />

                            <span className="ml-2 text-sm text-gray-500">
                              DT
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                          onClick={() => handleRemoveItem(index)}
                          disabled={formData.items.length === 1}>

                            <TrashIcon className="h-4 w-4" />
                          </motion.button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border-2 border-amber-300 shadow-sm text-sm font-medium rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all"
                onClick={handleAddItem}>

                <PlusIcon className="h-4 w-4 mr-2" />
                Ajouter un élément
              </motion.button>
            </div>
          </motion.div>
          {/* Summary and Mutuelle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notes */}
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
                delay: 0.3
              }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

              <h3 className="text-lg font-bold text-gray-900 mb-4">Notes</h3>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes additionnelles..." />

            </motion.div>
            {/* Summary */}
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
                delay: 0.4
              }}
              className="space-y-4">

              {/* Total */}
              <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl shadow-lg border-2 border-amber-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Récapitulatif
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sous-total:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {calculateTotal()} DT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Remise:</span>
                    <span className="text-sm font-medium text-gray-900">
                      0.00 DT
                    </span>
                  </div>
                  <div className="pt-3 border-t-2 border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-amber-600">
                        {calculateTotal()} DT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mutuelle Coverage */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-100 p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <HeartPulseIcon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 ml-3">
                    Estimation de prise en charge
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="mutuelle"
                      className="block text-sm font-medium text-gray-700 mb-2">

                      Mutuelle
                    </label>
                    <select
                      id="mutuelle"
                      name="mutuelle"
                      className="block w-full px-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg"
                      value={formData.mutuelle}
                      onChange={handleChange}>

                      <option value="">Aucune</option>
                      {mutuelles.map((mutuelle) =>
                      <option key={mutuelle.id} value={mutuelle.name}>
                          {mutuelle.name}
                        </option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="tauxCouverture"
                      className="block text-sm font-medium text-gray-700 mb-2">

                      Taux de couverture (%)
                    </label>
                    <input
                      type="number"
                      id="tauxCouverture"
                      name="tauxCouverture"
                      className="block w-full px-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg"
                      value={formData.tauxCouverture}
                      onChange={handleChange}
                      min="0"
                      max="100" />

                  </div>
                  <div className="pt-3 border-t-2 border-green-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Montant estimé remboursé:
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {calculateCoverage()} DT
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">
                        Reste à charge patient:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {calculatePatientShare()} DT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Action Buttons */}
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
              delay: 0.5
            }}
            className="flex justify-end space-x-3 pb-6">

            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">

              Annuler
            </button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all">

              <SaveIcon className="h-4 w-4 mr-2" />
              Enregistrer
            </motion.button>
          </motion.div>
        </form>
      </div>
      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess &&
        <SuccessAnimation
          message="Le devis a été créé avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouveauDevis;