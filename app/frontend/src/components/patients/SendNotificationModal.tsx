import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  SendIcon,
  MessageSquareIcon,
  MailIcon,
  SmartphoneIcon,
  UsersIcon,
  SparklesIcon,
  CheckCircleIcon } from
'lucide-react';
interface SendNotificationModalProps {
  selectedPatients: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    color: string;
  }>;
  onClose: () => void;
  onSend: (type: 'message' | 'email' | 'sms', content: string) => void;
}
const SendNotificationModal: React.FC<SendNotificationModalProps> = ({
  selectedPatients,
  onClose,
  onSend
}) => {
  const [notificationType, setNotificationType] = useState<
    'message' | 'email' | 'sms'>(
    'message');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const notificationTypes = [
  {
    id: 'message' as const,
    name: 'Message',
    description: 'Visible dans la page Communication',
    icon: MessageSquareIcon,
    color: 'from-blue-500 to-cyan-500',
    bgColor:
    'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    id: 'email' as const,
    name: 'Email',
    description: 'Envoyé par email',
    icon: MailIcon,
    color: 'from-purple-500 to-pink-500',
    bgColor:
    'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  {
    id: 'sms' as const,
    name: 'SMS',
    description: 'Envoyé par SMS',
    icon: SmartphoneIcon,
    color: 'from-green-500 to-emerald-500',
    bgColor:
    'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  }];

  const selectedType = notificationTypes.find((t) => t.id === notificationType)!;
  const handleSend = async () => {
    if (!content.trim()) return;
    setIsSending(true);
    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onSend(notificationType, content);
    setIsSending(false);
    setShowSuccess(true);
    // Close modal after showing success
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  const colorGradients: Record<string, string> = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
    pink: 'from-pink-500 to-rose-500',
    cyan: 'from-cyan-500 to-blue-500'
  };
  return (
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}>

      <motion.div
        initial={{
          scale: 0.9,
          y: 20
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 20
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">

        {/* Header */}
        <div
          className={`bg-gradient-to-r ${selectedType.color} p-6 text-white`}>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
                <SendIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Envoyer une notification</h3>
                <p className="text-white text-opacity-90 text-sm mt-1">
                  {selectedPatients.length} patient
                  {selectedPatients.length > 1 ? 's' : ''} sélectionné
                  {selectedPatients.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 90
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">

              <XIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Success Message */}
          <AnimatePresence>
            {showSuccess &&
            <motion.div
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">

                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Notification envoyée avec succès!
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {selectedPatients.length} patient
                      {selectedPatients.length > 1 ? 's' : ''} notifié
                      {selectedPatients.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* Selected Patients */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <UsersIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Destinataires ({selectedPatients.length})
              </h4>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-gray-200 dark:border-gray-600 max-h-32 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {selectedPatients.map((patient) =>
                <motion.div
                  key={patient.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-600 shadow-sm">

                    <div
                    className={`h-6 w-6 rounded-lg bg-gradient-to-br ${colorGradients[patient.color]} flex items-center justify-center mr-2`}>

                      <span className="text-xs font-bold text-white">
                        {patient.avatar}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {patient.name}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Notification Type Selector */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <SparklesIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Type de notification
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {notificationTypes.map((type) =>
              <motion.button
                key={type.id}
                whileHover={{
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => setNotificationType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all ${notificationType === type.id ? `bg-gradient-to-br ${type.bgColor} ${type.borderColor} shadow-md` : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}>

                  <div className="flex flex-col items-center text-center">
                    <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 shadow-md`}>

                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      {type.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </motion.button>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <MessageSquareIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Message
              </h4>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Rédigez votre ${notificationType === 'message' ? 'message' : notificationType === 'email' ? 'email' : 'SMS'}...`}
              rows={6}
              disabled={isSending || showSuccess}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" />

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {content.length} caractères
              </p>
              {notificationType === 'sms' &&
              <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.ceil(content.length / 160)} SMS
                </p>
              }
            </div>
          </div>

          {/* Info Box */}
          <div
            className={`p-4 bg-gradient-to-r ${selectedType.bgColor} rounded-xl border ${selectedType.borderColor}`}>

            <div className="flex items-start">
              <selectedType.icon className="h-5 w-5 text-gray-700 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                  {notificationType === 'message' &&
                  'Le message sera visible dans la page Communication'}
                  {notificationType === 'email' &&
                  'Un email sera envoyé à tous les patients sélectionnés'}
                  {notificationType === 'sms' &&
                  'Un SMS sera envoyé au numéro de téléphone de chaque patient'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {notificationType === 'message' &&
                  'Les patients pourront répondre directement depuis leur interface'}
                  {notificationType === 'email' &&
                  `${selectedPatients.length} email${selectedPatients.length > 1 ? 's' : ''} sera${selectedPatients.length > 1 ? 'ont' : ''} envoyé${selectedPatients.length > 1 ? 's' : ''}`}
                  {notificationType === 'sms' &&
                  `${selectedPatients.length * Math.ceil(content.length / 160)} SMS sera${selectedPatients.length * Math.ceil(content.length / 160) > 1 ? 'ont' : ''} envoyé${selectedPatients.length * Math.ceil(content.length / 160) > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={onClose}
              disabled={isSending || showSuccess}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">

              Annuler
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleSend}
              disabled={!content.trim() || isSending || showSuccess}
              className={`px-6 py-3 bg-gradient-to-r ${selectedType.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}>

              {isSending ?
              <>
                  <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="mr-2">

                    <SparklesIcon className="h-5 w-5" />
                  </motion.div>
                  Envoi en cours...
                </> :
              showSuccess ?
              <>
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Envoyé!
                </> :

              <>
                  <SendIcon className="h-5 w-5 mr-2" />
                  Envoyer
                </>
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>);

};
export default SendNotificationModal;