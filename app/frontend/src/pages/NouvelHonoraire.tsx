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
  SparklesIcon,
  HeartPulseIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
export function NouvelHonoraire() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).
    toISOString().
    split('T')[0],
    items: [
    {
      description: '',
      quantity: '1',
      unitPrice: '',
      total: ''
    }],

    notes: 'Paiement exigible sous 15 jours.',
    practitioner: 'Dr. Dupont',
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
    address: '456 Avenue des Soins, 75000 Paris'
  },
  {
    id: 3,
    name: 'Emma Petit',
    email: 'emma.petit@email.com',
    phone: '06 34 56 78 90',
    address: '789 Boulevard Médical, 75000 Paris'
  }];

  // Mock data for services
  const services = [
  {
    id: 1,
    code: 'CONS-01',
    description: 'Consultation initiale',
    price: '150'
  },
  {
    id: 2,
    code: 'ORTHO-01',
    description: 'Pose appareil orthodontique',
    price: '800'
  },
  {
    id: 3,
    code: 'ORTHO-02',
    description: 'Ajustement mensuel',
    price: '100'
  },
  {
    id: 4,
    code: 'ORTHO-03',
    description: 'Dépose appareil orthodontique',
    price: '250'
  },
  {
    id: 5,
    code: 'RADIO-01',
    description: 'Radiographie panoramique',
    price: '120'
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
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const unitPrice = parseFloat(newItems[index].unitPrice) || 0;
      newItems[index].total = (quantity * unitPrice).toFixed(2);
    }
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
        quantity: '1',
        unitPrice: '',
        total: ''
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
  const handleSelectService = (index, serviceId) => {
    const service = services.find((s) => s.id === parseInt(serviceId));
    if (service) {
      const newItems = [...formData.items];
      newItems[index].description = service.description;
      newItems[index].unitPrice = service.price;
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const unitPrice = parseFloat(service.price) || 0;
      newItems[index].total = (quantity * unitPrice).toFixed(2);
      setFormData({
        ...formData,
        items: newItems
      });
    }
  };
  const calculateSubtotal = () => {
    return formData.items.
    reduce((total, item) => {
      const itemTotal = parseFloat(item.total) || 0;
      return total + itemTotal;
    }, 0).
    toFixed(2);
  };
  const calculateTax = () => {
    return 0 .toFixed(2);
  };
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    return (subtotal + tax).toFixed(2);
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
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">

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
                <h3 className="text-2xl font-bold">Nouveaux Honoraires</h3>
                <p className="text-purple-100 text-sm mt-1">
                  Créer une nouvelle note d'honoraires patient
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <SparklesIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <div className="text-xs text-purple-100">Statut</div>
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
                    htmlFor="practitioner"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Praticien
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="practitioner"
                      name="practitioner"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.practitioner}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Date de consultation
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
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-2">

                    Date d'échéance de paiement
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.dueDate}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Honoraire Items */}
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

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <FileTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Détail des honoraires
                    </h3>
                    <p className="text-sm text-gray-600">
                      Ajouter les prestations effectuées
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
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                        Qté
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                        Prix unitaire
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                        Total
                      </th>
                      <th className="px-4 py-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {formData.items.map((item, index) =>
                    <tr key={index}>
                        <td className="px-4 py-3">
                          <div className="space-y-2">
                            <select
                            className="block w-full text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 py-2 px-3"
                            value=""
                            onChange={(e) =>
                            handleSelectService(index, e.target.value)
                            }>

                              <option value="">Sélectionner un service</option>
                              {services.map((service) =>
                            <option key={service.id} value={service.id}>
                                  {service.code} - {service.description}
                                </option>
                            )}
                            </select>
                            <input
                            type="text"
                            className="block w-full text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 py-2 px-3"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) =>
                            handleItemChange(
                              index,
                              'description',
                              e.target.value
                            )
                            }
                            required />

                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                          type="number"
                          min="1"
                          className="block w-full text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center py-2 px-3"
                          value={item.quantity}
                          onChange={(e) =>
                          handleItemChange(
                            index,
                            'quantity',
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
                            className="block w-full text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right py-2 px-3"
                            placeholder="0.00"
                            value={item.unitPrice}
                            onChange={(e) =>
                            handleItemChange(
                              index,
                              'unitPrice',
                              e.target.value
                            )
                            }
                            required />

                            <span className="ml-2 text-sm text-gray-500">
                              DT
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end">
                            <span className="text-sm font-bold text-gray-900">
                              {item.total || '0.00'}
                            </span>
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
                className="mt-4 inline-flex items-center px-4 py-2 border-2 border-purple-300 shadow-sm text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
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

              {/* Totals */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg border-2 border-blue-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Récapitulatif
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sous-total:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {calculateSubtotal()} DT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">TVA:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {calculateTax()} DT
                    </span>
                  </div>
                  <div className="pt-3 border-t-2 border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-blue-600">
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
                    Prise en charge mutuelle
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
                        Montant remboursé:
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {calculateCoverage()} DT
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">
                        Reste à charge:
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
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">

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
          message="La note d'honoraires a été créée avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

}
export default NouvelHonoraire;