import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  SendIcon,
  CheckCircleIcon,
  XCircleIcon,
  XIcon,
  PlusIcon } from
'lucide-react';
const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    patientName: 'Sophie Martin',
    type: 'Rappel de rendez-vous',
    date: '2024-01-20',
    time: '10:00',
    status: 'pending',
    message: 'Rappel automatique pour le rendez-vous de demain'
  },
  {
    id: 2,
    patientName: 'Lucas Dubois',
    type: 'Fin de traitement',
    date: '2024-01-18',
    time: '14:30',
    status: 'sent',
    message: 'Notification de fin de traitement envoyée'
  },
  {
    id: 3,
    patientName: 'Emma Petit',
    type: 'Suivi post-traitement',
    date: '2024-01-22',
    time: '09:00',
    status: 'pending',
    message: 'Rappel pour le suivi à 1 semaine'
  }]
  );
  const [showModal, setShowModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    patientName: '',
    type: '',
    date: '',
    time: '',
    message: ''
  });
  const patients = [
  'Sophie Martin',
  'Lucas Dubois',
  'Emma Petit',
  'Thomas Bernard',
  'Marie Leroy'];

  const notificationTypes = [
  'Rappel de rendez-vous',
  'Fin de traitement',
  'Suivi post-traitement',
  'Changement de rendez-vous',
  'Rappel de paiement'];

  const handleCreateNotification = () => {
    if (
    newNotification.patientName &&
    newNotification.type &&
    newNotification.date &&
    newNotification.time &&
    newNotification.message)
    {
      const notification = {
        id: notifications.length + 1,
        ...newNotification,
        status: 'pending'
      };
      setNotifications([...notifications, notification]);
      setNewNotification({
        patientName: '',
        type: '',
        date: '',
        time: '',
        message: ''
      });
      setShowModal(false);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'from-green-500 to-emerald-600';
      case 'pending':
        return 'from-amber-500 to-orange-600';
      case 'failed':
        return 'from-red-500 to-rose-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircleIcon className="h-5 w-5 text-white" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-white" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-white" />;
      default:
        return <BellIcon className="h-5 w-5 text-white" />;
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Envoyée';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échouée';
      default:
        return 'Inconnue';
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

            <BellIcon className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">Gestion des notifications</h3>
            <p className="text-pink-100 text-sm mt-1">
              Gérez les rappels et notifications automatiques pour vos patients
            </p>
          </div>
        </div>
      </motion.div>
      {/* Notifications List */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Gestion des Notifications
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Configurez les rappels et notifications pour vos patients
          </p>
        </div>
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
          className="mb-4">

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Créer une nouvelle notification
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Configurez un rappel automatique pour vos patients
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-4">
          {notifications.map((notification, index) =>
          <motion.div
            key={notification.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.1 + index * 0.1
            }}
            whileHover={{
              scale: 1.02,
              y: -4
            }}
            className="bg-transparent rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-lg cursor-pointer transition-all">

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg mr-4">
                      <UserIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {notification.patientName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.type}
                      </p>
                    </div>
                  </div>
                  <div
                  className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(notification.status)} flex items-center space-x-2`}>

                    {getStatusIcon(notification.status)}
                    <span className="text-xs font-bold text-white">
                      {getStatusText(notification.status)}
                    </span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-gray-200 space-y-3">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-200">
                    <CalendarIcon className="h-4 w-4 mr-2 text-purple-500" />
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">{notification.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-200">
                    <ClockIcon className="h-4 w-4 mr-2 text-pink-500" />
                    <span className="font-medium">Heure:</span>
                    <span className="ml-2">{notification.time}</span>
                  </div>
                  <div className="flex items-start text-sm text-gray-700 dark:text-gray-200">
                    <SendIcon className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                    <span className="font-medium">Message:</span>
                    <span className="ml-2 flex-1">{notification.message}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Create New Notification Button */}
      <motion.button
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
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        onClick={() => setShowModal(true)}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center">

        <PlusIcon className="h-5 w-5 mr-2" />
        Créer une nouvelle notification
      </motion.button>
      {/* Modal */}
      <AnimatePresence>
        {showModal &&
        <>
            {/* Backdrop */}
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40" />

            {/* Modal */}
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
                  <div>
                    <h3 className="text-sm font-semibold text-red-800">Nouvelle notification</h3>
                    <p className="text-xs text-red-600 mt-0.5">Créer une notification pour un patient</p>
                  </div>
                  <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="rounded-md p-1 text-red-600 hover:bg-red-100"
                  aria-label="Fermer">
                    <XIcon className="h-4 w-4" />
                  </motion.button>
                </div>
                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* Patient Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      <UserIcon className="h-4 w-4 inline mr-2 text-purple-500" />
                      Patient
                    </label>
                    <select
                    value={newNotification.patientName}
                    onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      patientName: e.target.value
                    })
                    }
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">

                      <option value="">Sélectionner un patient</option>
                      {patients.map((patient) =>
                    <option key={patient} value={patient}>
                          {patient}
                        </option>
                    )}
                    </select>
                  </div>
                  {/* Notification Type */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      <BellIcon className="h-4 w-4 inline mr-2 text-pink-500" />
                      Type de notification
                    </label>
                    <select
                    value={newNotification.type}
                    onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      type: e.target.value
                    })
                    }
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">

                      <option value="">Sélectionner un type</option>
                      {notificationTypes.map((type) =>
                    <option key={type} value={type}>
                          {type}
                        </option>
                    )}
                    </select>
                  </div>
                  {/* Date and Time */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      <CalendarIcon className="h-4 w-4 inline mr-2 text-purple-500" />
                      Date et heure
                    </label>
                    <input
                    type="datetime-local"
                    value={newNotification.date}
                    onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      date: e.target.value
                    })
                    }
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />

                  </div>
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      <SendIcon className="h-4 w-4 inline mr-2 text-red-500" />
                      Message
                    </label>
                    <textarea
                    value={newNotification.message}
                    onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      message: e.target.value
                    })
                    }
                    rows={3}
                    placeholder="Entrez le message de la notification..."
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" />

                  </div>
                </div>
                {/* Modal Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-2xl border-t-2 border-gray-100 dark:border-gray-600 flex justify-end space-x-3">
                  <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">

                    Annuler
                  </motion.button>
                  <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={handleCreateNotification}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center">

                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Créer la notification
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

};
export default NotificationManagement;