import React, { useState } from 'react';
import {
  XIcon,
  PlusIcon,
  SaveIcon,
  UserIcon,
  CalendarIcon,
  ClipboardIcon,
  TrashIcon,
  CheckCircleIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
const NouveauDevis = ({ onClose }) => {
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
    address: '456 Avenue des Soins, 75000 Paris'
  },
  {
    id: 3,
    name: 'Emma Petit',
    email: 'emma.petit@email.com',
    phone: '06 34 56 78 90',
    address: '789 Boulevard Médical, 75000 Paris'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    email: 'lucas.dubois@email.com',
    phone: '06 45 67 89 01',
    address: '101 Rue de la Santé, 75000 Paris'
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
    // In a real app, this would save the devis to the database
    alert('Devis créé avec succès');
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Nouveau Devis</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500">

            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="patient"
                    className="block text-sm font-medium text-gray-700">

                    Patient
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="patient"
                      name="patient"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                    className="block text-sm font-medium text-gray-700">

                    Traitement
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ClipboardIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="treatment"
                      name="treatment"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                    className="block text-sm font-medium text-gray-700">

                    Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      value={formData.date}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="validUntil"
                    className="block text-sm font-medium text-gray-700">

                    Valable jusqu'au
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="validUntil"
                      name="validUntil"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      value={formData.validUntil}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Éléments du devis
                </h4>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Montant (DT)
                        </th>
                        <th scope="col" className="relative px-4 py-3 w-10">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.items.map((item, index) =>
                      <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                            type="text"
                            className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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

                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
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

                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleRemoveItem(index)}
                            disabled={formData.items.length === 1}>

                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan="3"
                          className="px-4 py-2 text-sm font-medium text-gray-900 text-right">

                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleAddItem}>

                            <PlusIcon className="h-4 w-4 mr-1" />
                            Ajouter un élément
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700">

                    Notes
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      value={formData.notes}
                      onChange={handleChange} />

                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Prise en charge mutuelle
                  </h4>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="mutuelle"
                          className="block text-sm font-medium text-blue-700">

                          Mutuelle
                        </label>
                        <select
                          id="mutuelle"
                          name="mutuelle"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
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
                          className="block text-sm font-medium text-blue-700">

                          Taux de couverture (%)
                        </label>
                        <input
                          type="number"
                          id="tauxCouverture"
                          name="tauxCouverture"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          value={formData.tauxCouverture}
                          onChange={handleChange}
                          min="0"
                          max="100" />

                      </div>
                      <div className="pt-2 border-t border-blue-200">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">Total:</span>
                          <span className="text-sm font-medium text-blue-900">
                            {calculateTotal()} DT
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-blue-700">
                            Montant remboursé:
                          </span>
                          <span className="text-sm font-medium text-blue-900">
                            {calculateCoverage()} DT
                          </span>
                        </div>
                        <div className="flex justify-between mt-1 border-t border-blue-200 pt-2">
                          <span className="text-sm font-medium text-blue-800">
                            Reste à charge:
                          </span>
                          <span className="text-sm font-medium text-blue-900">
                            {calculatePatientShare()} DT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            onClick={onClose}>

            Annuler
          </button>
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSubmit}>

            <SaveIcon className="h-4 w-4 mr-2" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>);

};
export default NouveauDevis;