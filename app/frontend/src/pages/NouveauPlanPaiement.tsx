import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  DollarSignIcon,
  CreditCardIcon,
  FileTextIcon,
  PlusIcon,
  SaveIcon,
  SparklesIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircleIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouveauPlanPaiement = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    treatment: '',
    totalAmount: '',
    numberOfInstallments: '12',
    frequency: 'monthly',
    firstPaymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'card',
    autoCharge: true,
    sendReminders: true,
    reminderDays: '3',
    notes: ''
  });
  // Mock data for patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com'
  },
  {
    id: 3,
    name: 'Emma Petit',
    email: 'emma.petit@email.com'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    email: 'lucas.dubois@email.com'
  }];

  // Mock data for treatments
  const treatments = [
  {
    id: 1,
    name: 'Orthodontie complète - Appareil fixe',
    suggestedAmount: '3600'
  },
  {
    id: 2,
    name: 'Orthodontie complète - Aligneurs',
    suggestedAmount: '4800'
  },
  {
    id: 3,
    name: 'Orthodontie partielle',
    suggestedAmount: '2400'
  },
  {
    id: 4,
    name: 'Traitement interceptif',
    suggestedAmount: '1800'
  }];

  const handleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  const handleTreatmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const treatmentId = e.target.value;
    const treatment = treatments.find((t) => t.id === parseInt(treatmentId));
    if (treatment) {
      setFormData({
        ...formData,
        treatment: treatmentId,
        totalAmount: treatment.suggestedAmount
      });
    } else {
      setFormData({
        ...formData,
        treatment: treatmentId
      });
    }
  };
  const calculateInstallmentAmount = () => {
    const total = parseFloat(formData.totalAmount) || 0;
    const installments = parseInt(formData.numberOfInstallments) || 1;
    return (total / installments).toFixed(2);
  };
  const getFrequencyLabel = () => {
    switch (formData.frequency) {
      case 'weekly':
        return 'semaine';
      case 'biweekly':
        return '2 semaines';
      case 'monthly':
        return 'mois';
      case 'quarterly':
        return 'trimestre';
      default:
        return 'mois';
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating payment plan:', formData);
    setShowSuccess(true);
  };
  const handleSuccessComplete = () => {
    setShowSuccess(false);
    navigate('/administration/paiements');
  };
  const handleBack = () => {
    navigate('/administration/paiements');
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-5xl mx-auto p-6">
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
            className="mb-6">

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleBack}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4">

              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour aux paiements
            </motion.button>
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                  <CalendarIcon className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Créer un plan de paiement
                  </h1>
                  <p className="text-green-100 text-sm mt-1">
                    Configurez un échéancier de paiement personnalisé
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient & Treatment Information */}
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

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Patient et traitement
                    </h2>
                    <p className="text-sm text-gray-600">
                      Sélectionnez le patient et le traitement concerné
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="patient"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Patient *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <select
                      id="patient"
                      name="patient"
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      value={formData.patient}
                      onChange={handleInputChange}>

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
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Traitement *
                  </label>
                  <div className="relative">
                    <FileTextIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <select
                      id="treatment"
                      name="treatment"
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      value={formData.treatment}
                      onChange={handleTreatmentChange}>

                      <option value="">Sélectionner un traitement</option>
                      {treatments.map((treatment) =>
                      <option key={treatment.id} value={treatment.id}>
                          {treatment.name}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Payment Schedule */}
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

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <DollarSignIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Échéancier de paiement
                    </h2>
                    <p className="text-sm text-gray-600">
                      Définissez le montant et la fréquence
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="totalAmount"
                      className="block text-sm font-bold text-gray-700 mb-2">

                      Montant total *
                    </label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        id="totalAmount"
                        name="totalAmount"
                        required
                        min="0"
                        step="0.01"
                        className="block w-full pl-10 pr-16 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        placeholder="3600.00"
                        value={formData.totalAmount}
                        onChange={handleInputChange} />

                      <span className="absolute right-3 top-3.5 text-gray-500 font-medium">
                        DT
                      </span>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="numberOfInstallments"
                      className="block text-sm font-bold text-gray-700 mb-2">

                      Nombre d'échéances *
                    </label>
                    <input
                      type="number"
                      id="numberOfInstallments"
                      name="numberOfInstallments"
                      required
                      min="2"
                      max="60"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      value={formData.numberOfInstallments}
                      onChange={handleInputChange} />

                  </div>
                  <div>
                    <label
                      htmlFor="frequency"
                      className="block text-sm font-bold text-gray-700 mb-2">

                      Fréquence *
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      required
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      value={formData.frequency}
                      onChange={handleInputChange}>

                      <option value="weekly">Hebdomadaire</option>
                      <option value="biweekly">Bimensuel</option>
                      <option value="monthly">Mensuel</option>
                      <option value="quarterly">Trimestriel</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="firstPaymentDate"
                      className="block text-sm font-bold text-gray-700 mb-2">

                      Date du premier paiement *
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        id="firstPaymentDate"
                        name="firstPaymentDate"
                        required
                        className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        value={formData.firstPaymentDate}
                        onChange={handleInputChange} />

                    </div>
                  </div>
                </div>
                {/* Payment Summary */}
                {formData.totalAmount && formData.numberOfInstallments &&
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                          <TrendingUpIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 ml-3">
                          Résumé du plan
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">
                          Montant par échéance
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {calculateInstallmentAmount()} DT
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Fréquence</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formData.numberOfInstallments}x
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          par {getFrequencyLabel()}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">
                          Montant total
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                          {formData.totalAmount} DT
                        </p>
                      </div>
                    </div>
                  </motion.div>
                }
              </div>
            </motion.div>
            {/* Payment Method & Automation */}
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
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                    <CreditCardIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Mode de paiement et automatisation
                    </h2>
                    <p className="text-sm text-gray-600">
                      Configurez les préférences de paiement
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Mode de paiement préféré *
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    required
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}>

                    <option value="card">Carte bancaire</option>
                    <option value="bank_transfer">Virement bancaire</option>
                    <option value="cash">Espèces</option>
                    <option value="check">Chèque</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="autoCharge"
                      checked={formData.autoCharge}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-0.5" />

                    <div className="ml-3">
                      <span className="text-sm font-bold text-gray-900">
                        Prélèvement automatique
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        Débiter automatiquement la carte du patient à chaque
                        échéance
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="sendReminders"
                      checked={formData.sendReminders}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-0.5" />

                    <div className="ml-3">
                      <span className="text-sm font-bold text-gray-900">
                        Envoyer des rappels
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        Notifier le patient avant chaque échéance
                      </p>
                    </div>
                  </label>
                  {formData.sendReminders &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto'
                    }}
                    className="ml-8">

                      <label
                      htmlFor="reminderDays"
                      className="block text-sm font-medium text-gray-700 mb-2">

                        Envoyer un rappel
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                        type="number"
                        id="reminderDays"
                        name="reminderDays"
                        min="1"
                        max="30"
                        className="block w-20 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                        value={formData.reminderDays}
                        onChange={handleInputChange} />

                        <span className="text-sm text-gray-600">
                          jour(s) avant l'échéance
                        </span>
                      </div>
                    </motion.div>
                  }
                </div>
              </div>
            </motion.div>
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
                delay: 0.4
              }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Notes additionnelles
                    </h2>
                    <p className="text-sm text-gray-600">
                      Informations complémentaires
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all resize-none"
                  placeholder="Ajoutez des notes ou conditions particulières pour ce plan de paiement..."
                  value={formData.notes}
                  onChange={handleInputChange} />

              </div>
            </motion.div>
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
              className="flex justify-end space-x-4 pb-6">

              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all shadow-md">

                Annuler
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                type="submit"
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transition-all">

                <SaveIcon className="h-5 w-5 mr-2" />
                Créer le plan
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>
      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess &&
        <SuccessAnimation
          message="Le plan de paiement a été créé avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouveauPlanPaiement;