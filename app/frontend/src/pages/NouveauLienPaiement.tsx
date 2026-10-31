import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  LinkIcon,
  UserIcon,
  DollarSignIcon,
  CalendarIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  CopyIcon,
  CheckIcon,
  SparklesIcon,
  CreditCardIcon,
  QrCodeIcon,
  ShareIcon } from
'lucide-react';
const NouveauLienPaiement = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    amount: '',
    description: '',
    expirationDate: '',
    expirationTime: '23:59',
    allowPartialPayment: false,
    sendEmail: true,
    sendSMS: false,
    customMessage: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating payment link:', formData);
    // In a real app, this would generate the payment link
    navigate('/administration/paiements');
  };
  const handleBack = () => {
    navigate('/administration/paiements');
  };
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
  const generatedLink = 'https://pay.orthobizz.fr/p/abc123xyz';
  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
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
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
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

                <LinkIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">
                  Créer un lien de paiement
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  Générez un lien de paiement sécurisé pour vos patients
                </p>
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

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    Informations du patient
                  </h2>
                  <p className="text-sm text-gray-600">
                    Qui va effectuer le paiement?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Nom du patient *
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  required
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                  placeholder="Sophie Martin"
                  value={formData.patientName}
                  onChange={handleInputChange} />

              </div>
              <div>
                <label
                  htmlFor="patientEmail"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Email *
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="patientEmail"
                    id="patientEmail"
                    required
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                    placeholder="sophie.martin@email.com"
                    value={formData.patientEmail}
                    onChange={handleInputChange} />

                </div>
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="patientPhone"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="patientPhone"
                    id="patientPhone"
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.patientPhone}
                    onChange={handleInputChange} />

                </div>
              </div>
            </div>
          </motion.div>
          {/* Payment Details */}
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
                    Détails du paiement
                  </h2>
                  <p className="text-sm text-gray-600">
                    Montant et description
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-bold text-gray-700 mb-2">

                    Montant *
                  </label>
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="0"
                      step="0.01"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      placeholder="750.00"
                      value={formData.amount}
                      onChange={handleInputChange} />

                  </div>
                </div>
                <div>
                  <label className="flex items-center h-full pt-8">
                    <input
                      type="checkbox"
                      name="allowPartialPayment"
                      checked={formData.allowPartialPayment}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />

                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Autoriser les paiements partiels
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={3}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all resize-none"
                  placeholder="Contrôle mensuel - Ajustement appareil"
                  value={formData.description}
                  onChange={handleInputChange} />

              </div>
            </div>
          </motion.div>
          {/* Expiration Settings */}
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

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <ClockIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    Expiration du lien
                  </h2>
                  <p className="text-sm text-gray-600">
                    Définir la durée de validité
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="expirationDate"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Date d'expiration *
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="expirationDate"
                    id="expirationDate"
                    required
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                    value={formData.expirationDate}
                    onChange={handleInputChange} />

                </div>
              </div>
              <div>
                <label
                  htmlFor="expirationTime"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Heure d'expiration
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="expirationTime"
                    id="expirationTime"
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                    value={formData.expirationTime}
                    onChange={handleInputChange} />

                </div>
              </div>
            </div>
          </motion.div>
          {/* Notification Settings */}
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
                  <MessageSquareIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    Notifications
                  </h2>
                  <p className="text-sm text-gray-600">
                    Comment envoyer le lien?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="sendEmail"
                    checked={formData.sendEmail}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />

                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Envoyer par email
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="sendSMS"
                    checked={formData.sendSMS}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />

                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Envoyer par SMS
                  </span>
                </label>
              </div>
              <div>
                <label
                  htmlFor="customMessage"
                  className="block text-sm font-bold text-gray-700 mb-2">

                  Message personnalisé (optionnel)
                </label>
                <textarea
                  name="customMessage"
                  id="customMessage"
                  rows={3}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all resize-none"
                  placeholder="Ajoutez un message personnalisé qui sera envoyé avec le lien..."
                  value={formData.customMessage}
                  onChange={handleInputChange} />

              </div>
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
            className="flex justify-end space-x-4">

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
              className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all">

              <LinkIcon className="h-5 w-5 mr-2" />
              Générer le lien
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>);

};
export default NouveauLienPaiement;