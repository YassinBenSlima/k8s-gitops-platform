import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShieldIcon,
  KeyIcon,
  LockIcon,
  UnlockIcon,
  SmartphoneIcon,
  AlertCircleIcon,
  CheckIcon,
  XIcon,
  EyeIcon,
  EyeOffIcon,
  RefreshCwIcon,
  ClockIcon,
  SaveIcon,
  InfoIcon,
  ActivityIcon,
  LogOutIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  SparklesIcon,
  MapPinIcon } from
'lucide-react';
const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorStep, setTwoFactorStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const activeSessions = [
  {
    id: 1,
    device: 'MacBook Pro',
    location: 'Paris, France',
    ip: '192.168.1.100',
    lastActive: 'Maintenant',
    current: true
  },
  {
    id: 2,
    device: 'iPhone 13',
    location: 'Paris, France',
    ip: '192.168.1.101',
    lastActive: 'Il y a 2 heures',
    current: false
  },
  {
    id: 3,
    device: 'iPad Air',
    location: 'Lyon, France',
    ip: '192.168.2.50',
    lastActive: 'Il y a 1 jour',
    current: false
  }];

  const loginHistory = [
  {
    id: 1,
    date: "Aujourd'hui à 14:30",
    device: 'MacBook Pro',
    location: 'Paris, France',
    status: 'success'
  },
  {
    id: 2,
    date: "Aujourd'hui à 09:15",
    device: 'iPhone 13',
    location: 'Paris, France',
    status: 'success'
  },
  {
    id: 3,
    date: 'Hier à 18:45',
    device: 'iPad Air',
    location: 'Lyon, France',
    status: 'success'
  },
  {
    id: 4,
    date: 'Il y a 2 jours à 10:20',
    device: 'Appareil inconnu',
    location: 'Marseille, France',
    status: 'failed'
  }];

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && currentPassword) {
      setSuccessMessage('Mot de passe modifié avec succès!');
      setShowSuccessModal(true);
      setShowChangePasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };
  const handleEnableTwoFactor = () => {
    if (twoFactorStep === 1) {
      setTwoFactorStep(2);
    } else if (twoFactorStep === 2 && verificationCode === '123456') {
      setTwoFactorEnabled(true);
      setSuccessMessage('Authentification à deux facteurs activée!');
      setShowSuccessModal(true);
      setShowTwoFactorModal(false);
      setTwoFactorStep(1);
      setVerificationCode('');
      setTimeout(() => setShowSuccessModal(false), 3000);
    }
  };
  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false);
    setSuccessMessage('Authentification à deux facteurs désactivée');
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };
  const handleLogoutSession = (sessionId: number) =>
  console.log('Logging out session:', sessionId);
  return (
    <div className="space-y-3">
      {/* Password Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <KeyIcon size={12} className="text-blue-500" />
            Mot de passe
          </h3>
          <button
            onClick={() => setShowChangePasswordModal(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">

            <RefreshCwIcon size={11} />
            Modifier
          </button>
        </div>
        <div className="p-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-xs text-blue-800">
            <div className="flex items-start gap-1.5">
              <InfoIcon
                size={12}
                className="text-blue-500 mt-0.5 flex-shrink-0" />

              <div>
                <strong className="text-blue-900">Conseils:</strong> Au moins 8
                caractères, mélange de majuscules/minuscules, chiffres et
                symboles. Évitez les informations personnelles.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ShieldIcon size={12} className="text-purple-500" />
            Authentification à deux facteurs
          </h3>
          <div
            className={`h-6 w-12 rounded-full transition-all relative cursor-pointer ${twoFactorEnabled ? 'bg-green-400' : 'bg-gray-300'}`}
            onClick={() =>
            twoFactorEnabled ?
            handleDisableTwoFactor() :
            setShowTwoFactorModal(true)
            }>

            <motion.div
              animate={{
                x: twoFactorEnabled ? 24 : 2
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }}
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm flex items-center justify-center">

              {twoFactorEnabled ?
              <UnlockIcon size={10} className="text-green-500" /> :

              <LockIcon size={10} className="text-gray-400" />
              }
            </motion.div>
          </div>
        </div>
        <div className="p-3">
          <div
            className={`rounded-lg p-2.5 border text-xs ${twoFactorEnabled ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>

            <div className="flex items-center gap-1.5">
              <SmartphoneIcon
                size={12}
                className={
                twoFactorEnabled ? 'text-green-600' : 'text-gray-400'
                } />

              {twoFactorEnabled ?
              'Votre compte est protégé par une authentification à deux facteurs.' :
              "Activez l'authentification à deux facteurs pour renforcer la sécurité."}
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ActivityIcon size={12} className="text-green-500" />
            Sessions actives
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {activeSessions.map((session) =>
          <div
            key={session.id}
            className="flex items-center justify-between px-3 py-2">

              <div className="flex items-center gap-2">
                <div
                className={`p-1 rounded ${session.current ? 'bg-green-100' : 'bg-gray-100'}`}>

                  <SmartphoneIcon
                  size={12}
                  className={
                  session.current ? 'text-green-600' : 'text-gray-500'
                  } />

                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-800">
                      {session.device}
                    </span>
                    {session.current &&
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                        Actuel
                      </span>
                  }
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-0.5">
                      <MapPinIcon size={10} />
                      {session.location}
                    </span>
                    <span>•</span>
                    <span>{session.ip}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <ClockIcon size={10} />
                      {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>
              {!session.current &&
            <button
              onClick={() => handleLogoutSession(session.id)}
              className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
              title="Déconnecter">

                  <LogOutIcon size={11} />
                </button>
            }
            </div>
          )}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ClockIcon size={12} className="text-amber-500" />
            Historique de connexion
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {loginHistory.map((login) =>
          <div
            key={login.id}
            className="flex items-center justify-between px-3 py-1.5">

              <div className="flex items-center gap-2">
                <div
                className={`p-0.5 rounded ${login.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>

                  {login.status === 'success' ?
                <CheckCircle2Icon size={12} className="text-green-600" /> :

                <AlertTriangleIcon size={12} className="text-red-600" />
                }
                </div>
                <div>
                  <div className="text-xs text-gray-800">
                    {login.date} • {login.device}
                  </div>
                  <div className="text-xs text-gray-400">{login.location}</div>
                </div>
              </div>
              <span
              className={`px-1.5 py-0.5 rounded text-xs ${login.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>

                {login.status === 'success' ? 'Réussi' : 'Échoué'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        <strong className="text-blue-900">Conseils de sécurité:</strong> Ne
        partagez jamais votre mot de passe. Activez la 2FA. Déconnectez-vous des
        appareils inutilisés. Vérifiez régulièrement votre historique.
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangePasswordModal &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">

              <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Changer le mot de passe</h3>
                  <p className="text-xs text-red-600 mt-0.5">Créez un nouveau mot de passe sécurisé</p>
                </div>
                <button
                onClick={() => setShowChangePasswordModal(false)}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe actuel
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)} />

                    <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">

                      {showPassword ?
                    <EyeOffIcon className="h-5 w-5" /> :

                    <EyeIcon className="h-5 w-5" />
                    }
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <KeyIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />

                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <CheckIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />

                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                onClick={() => setShowChangePasswordModal(false)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  Annuler
                </button>
                <button
                onClick={handlePasswordChange}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">

                  <SaveIcon className="h-4 w-4 inline mr-2" />
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      {/* 2FA Modal */}
      <AnimatePresence>
        {showTwoFactorModal &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">

              <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Authentification 2FA</h3>
                  <p className="text-xs text-red-600 mt-0.5">Étape {twoFactorStep} sur 2</p>
                </div>
                <button
                onClick={() => {
                  setShowTwoFactorModal(false);
                  setTwoFactorStep(1);
                }}
                className="rounded-md p-1 text-red-600 hover:bg-red-100"
                aria-label="Fermer">
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                {twoFactorStep === 1 ?
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Scanner le QR Code
                    </h4>
                    <div className="bg-white rounded-lg p-4 flex items-center justify-center mb-3">
                      <div className="h-48 w-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <SparklesIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Utilisez Google Authenticator ou Authy pour scanner ce
                      code QR.
                    </p>
                  </div> :

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Code de vérification
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Entrez le code à 6 chiffres de votre application
                      d'authentification.
                    </p>
                    <input
                  type="text"
                  maxLength={6}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-center text-2xl font-bold tracking-widest"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/\D/g, ''))
                  } />

                  </div>
              }
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                onClick={() =>
                twoFactorStep === 2 ?
                setTwoFactorStep(1) :
                setShowTwoFactorModal(false)
                }
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  {twoFactorStep === 2 ? 'Retour' : 'Annuler'}
                </button>
                <button
                onClick={handleEnableTwoFactor}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">

                  {twoFactorStep === 1 ? 'Suivant' : 'Activer'}
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -10
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: 10
            }}
            transition={{
              type: 'spring',
              duration: 0.5
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

              <div className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8 overflow-hidden">
                <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />

                <motion.div
                initial={{
                  scale: 0,
                  rotate: -180
                }}
                animate={{
                  scale: 1,
                  rotate: 0
                }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200
                }}
                className="relative z-10 flex justify-center mb-4">

                  <div className="h-20 w-20 rounded-full bg-white shadow-2xl flex items-center justify-center">
                    <CheckIcon className="h-10 w-10 text-green-500" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  Succès !
                </h3>
                <p className="text-green-50 text-center text-sm">
                  {successMessage}
                </p>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

};
export default SecuritySettings;