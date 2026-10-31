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
  HeartPulseIcon,
  UploadIcon,
  PaperclipIcon,
  XIcon,
  CheckCircleIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouvelleFSE = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    date: new Date().toISOString().split('T')[0],
    practitioner: 'Dr. Dupont',
    mutuelle: '',
    treatments: [
    {
      code: '',
      description: '',
      amount: ''
    }],

    notes: '',
    documents: []
  });
  // Mock data for patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    insuranceNumber: '2 92 04 75 123 456',
    mutuelle: 'CNAM'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    insuranceNumber: '1 85 09 23 234 567',
    mutuelle: 'CNRPS'
  },
  {
    id: 3,
    name: 'Emma Petit',
    insuranceNumber: '2 98 12 07 345 678',
    mutuelle: 'Assurance Carte'
  }];

  // Mock data for treatment codes
  const treatmentCodes = [
  {
    code: 'ODF-001',
    description: 'Consultation orthodontique',
    amount: '150 DT'
  },
  {
    code: 'ODF-002',
    description: 'Bilan orthodontique complet',
    amount: '250 DT'
  },
  {
    code: 'ODF-023',
    description: 'Ajustement appareil orthodontique',
    amount: '300 DT'
  },
  {
    code: 'ODF-045',
    description: 'Pose appareil multi-attaches',
    amount: '800 DT'
  },
  {
    code: 'ODF-067',
    description: 'Contrôle mensuel',
    amount: '100 DT'
  }];

  // Mock data for mutuelles
  const mutuelles = [
  {
    id: 1,
    name: 'CNAM',
    type: 'Régime général'
  },
  {
    id: 2,
    name: 'CNRPS',
    type: 'Fonctionnaire'
  },
  {
    id: 3,
    name: 'Assurance Carte',
    type: 'Complémentaire'
  },
  {
    id: 4,
    name: 'MGPTT',
    type: 'Complémentaire'
  },
  {
    id: 5,
    name: 'MDS',
    type: 'Complémentaire'
  }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Auto-fill mutuelle when patient is selected
    if (name === 'patient' && value) {
      const selectedPatient = patients.find((p) => p.id === parseInt(value));
      if (selectedPatient) {
        setFormData((prev) => ({
          ...prev,
          mutuelle: selectedPatient.mutuelle
        }));
      }
    }
  };
  const handleTreatmentChange = (index, field, value) => {
    const newTreatments = [...formData.treatments];
    newTreatments[index][field] = value;
    setFormData({
      ...formData,
      treatments: newTreatments
    });
  };
  const handleSelectTreatment = (index, code) => {
    const treatment = treatmentCodes.find((t) => t.code === code);
    if (treatment) {
      const newTreatments = [...formData.treatments];
      newTreatments[index] = {
        code: treatment.code,
        description: treatment.description,
        amount: treatment.amount
      };
      setFormData({
        ...formData,
        treatments: newTreatments
      });
    }
  };
  const handleAddTreatment = () => {
    setFormData({
      ...formData,
      treatments: [
      ...formData.treatments,
      {
        code: '',
        description: '',
        amount: ''
      }]

    });
  };
  const handleRemoveTreatment = (index) => {
    const newTreatments = [...formData.treatments];
    newTreatments.splice(index, 1);
    setFormData({
      ...formData,
      treatments: newTreatments
    });
  };
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    }));
    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments]
    });
  };
  const handleRemoveDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({
      ...formData,
      documents: newDocuments
    });
  };
  const calculateTotal = () => {
    return formData.treatments.
    reduce((total, treatment) => {
      const amount = parseFloat(treatment.amount?.replace(' DT', '')) || 0;
      return total + amount;
    }, 0).
    toFixed(2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };
  const handleSuccessComplete = () => {
    setShowSuccess(false);
    navigate('/administration/mutuelles');
  };
  const handleBack = () => {
    navigate('/administration/mutuelles');
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
          className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl">

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
                <h3 className="text-2xl font-bold">
                  Nouvelle Feuille de Soins
                </h3>
                <p className="text-cyan-100 text-sm mt-1">
                  Créer une nouvelle FSE pour transmission
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <SparklesIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <div className="text-xs text-cyan-100">Statut</div>
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Informations Patient
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sélectionner le patient et sa mutuelle
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="patient"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                    Patient
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <select
                      id="patient"
                      name="patient"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.patient}
                      onChange={handleChange}
                      required>

                      <option value="">Sélectionner un patient</option>
                      {patients.map((patient) =>
                      <option key={patient.id} value={patient.id}>
                          {patient.name} - {patient.insuranceNumber}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="mutuelle"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                    Mutuelle
                  </label>
                  <div className="relative">
                    <HeartPulseIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <select
                      id="mutuelle"
                      name="mutuelle"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.mutuelle}
                      onChange={handleChange}
                      required>

                      <option value="">Sélectionner une mutuelle</option>
                      {mutuelles.map((mutuelle) =>
                      <option key={mutuelle.id} value={mutuelle.name}>
                          {mutuelle.name} - {mutuelle.type}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                    Date des soins
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.date}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="practitioner"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                    Praticien
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      id="practitioner"
                      name="practitioner"
                      className="block w-full pl-10 pr-3 py-2.5 text-base border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                      value={formData.practitioner}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Treatments */}
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

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 border-b border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <FileTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Actes et Soins
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ajouter les actes effectués
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {formData.treatments.map((treatment, index) =>
                <motion.div
                  key={index}
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
                  className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Code acte
                        </label>
                        <select
                        className="block w-full text-sm border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 py-2.5 px-3"
                        value={treatment.code}
                        onChange={(e) =>
                        handleSelectTreatment(index, e.target.value)
                        }>

                          <option value="">Sélectionner un acte</option>
                          {treatmentCodes.map((code) =>
                        <option key={code.code} value={code.code}>
                              {code.code} - {code.description}
                            </option>
                        )}
                        </select>
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description
                        </label>
                        <input
                        type="text"
                        className="block w-full text-sm border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 py-2.5 px-3"
                        placeholder="Description de l'acte"
                        value={treatment.description}
                        onChange={(e) =>
                        handleTreatmentChange(
                          index,
                          'description',
                          e.target.value
                        )
                        }
                        required />

                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Montant
                        </label>
                        <input
                        type="text"
                        className="block w-full text-sm border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 py-2.5 px-3"
                        placeholder="0 DT"
                        value={treatment.amount}
                        onChange={(e) =>
                        handleTreatmentChange(
                          index,
                          'amount',
                          e.target.value
                        )
                        }
                        required />

                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        type="button"
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveTreatment(index)}
                        disabled={formData.treatments.length === 1}>

                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border-2 border-purple-300 dark:border-purple-600 shadow-sm text-sm font-medium rounded-lg text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                onClick={handleAddTreatment}>

                <PlusIcon className="h-4 w-4 mr-2" />
                Ajouter un acte
              </motion.button>
            </div>
          </motion.div>
          {/* Documents and Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Documents */}
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 border-b border-amber-100 dark:border-amber-800">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <PaperclipIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Documents justificatifs
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Prescriptions, radios, etc.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {formData.documents.map((doc, index) =>
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">

                      <div className="flex items-center">
                        <PaperclipIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {doc.size}
                          </p>
                        </div>
                      </div>
                      <button
                      type="button"
                      onClick={() => handleRemoveDocument(index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">

                        <XIcon className="h-5 w-5" />
                      </button>
                    </motion.div>
                  )}
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">
                          Cliquez pour ajouter
                        </span>{' '}
                        ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, JPG, PNG (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload} />

                  </label>
                </div>
              </div>
            </motion.div>
            {/* Summary and Notes */}
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
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl shadow-lg border-2 border-blue-100 dark:border-blue-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Montant total
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    Total FSE:
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {calculateTotal()} DT
                  </span>
                </div>
              </div>
              {/* Notes */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Notes
                </h3>
                <textarea
                  id="notes"
                  name="notes"
                  rows={6}
                  className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notes additionnelles pour la transmission..." />

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
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all">

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
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all">

              <SaveIcon className="h-4 w-4 mr-2" />
              Enregistrer et transmettre
            </motion.button>
          </motion.div>
        </form>
      </div>
      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess &&
        <SuccessAnimation
          message="La feuille de soins a été créée avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouvelleFSE;