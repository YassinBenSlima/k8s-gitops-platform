import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, SearchIcon, AwardIcon, TrophyIcon, UserIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../node_modules/react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DoctorLevel from '../gamification/DoctorLevel';
import LanguageSelector from '../language/LanguageSelector';
import { usePatient, RISK_STYLES } from '../../contexts/PatientContext';
const Header = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const patientDropdownRef = useRef<HTMLDivElement>(null);

  const { patients, selectedPatient, setSelectedPatientId } = usePatient();

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.dossier.toLowerCase().includes(patientSearch.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        patientDropdownRef.current &&
        !patientDropdownRef.current.contains(e.target as Node)
      ) {
        setShowPatientDropdown(false);
        setPatientSearch('');
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nouveau badge débloqué!',
      description: 'Vous avez débloqué le badge "Expert en diagnostic"',
      time: 'Il y a 2 heures',
      type: 'achievement',
      isNew: true
    },
    {
      id: 2,
      title: 'Rappel de rendez-vous',
      description: 'Sophie Martin a rendez-vous demain à 10h00',
      time: 'Il y a 4 heures',
      type: 'appointment',
      isNew: true
    },
    {
      id: 3,
      title: 'Félicitations!',
      description: 'Vous avez atteint une série de 5 jours consécutifs!',
      time: 'Hier',
      type: 'streak',
      isNew: false
    },
    {
      id: 4,
      title: 'Traitement terminé',
      description: 'Le traitement de Lucas Dubois est maintenant terminé',
      time: 'Il y a 2 jours',
      type: 'treatment',
      isNew: false
    }]
  );
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <AwardIcon className="h-5 w-5 text-indigo-500" />;
      case 'streak':
        return <TrophyIcon className="h-5 w-5 text-amber-500" />;
      case 'appointment':
        return (
          <svg
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />

          </svg>);

      case 'treatment':
        return (
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />

          </svg>);

      default:
        return <BellIcon className="h-5 w-5 text-gray-400" />;
    }
  };
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        isNew: false
      }))
    );
  };
  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };
  const newNotificationsCount = notifications.filter((n) => n.isNew).length;
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                {t('header.search')}
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>

                  <SearchIcon
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    aria-hidden="true" />

                </div>
                <motion.input
                  whileFocus={{
                    scale: 1.02
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  id="search"
                  name="search"
                  className={`block w-full ${isRTL ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3 text-left'} py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm`}
                  placeholder={t('header.search')}
                  type="search"
                  dir={isRTL ? 'rtl' : 'ltr'} />

              </div>
            </div>
          </div>

          {/* ── Patient Selector ── */}
          <div className="mx-4 flex-shrink-0" ref={patientDropdownRef}>
            <div className="relative">
              <button
                onClick={() => {
                  setShowPatientDropdown((v) => !v);
                  setPatientSearch('');
                }}
                className={`flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-lg border transition-all
                  ${showPatientDropdown
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
                    : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/10'
                  }`}
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-white">
                    {selectedPatient.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                {/* Patient info */}
                <div className="text-left min-w-0 hidden sm:block">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight truncate max-w-[120px]">
                    {selectedPatient.name}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                    {selectedPatient.age} ans · {selectedPatient.dossier}
                  </p>
                </div>
                {/* Risk badge */}
                <span className={`hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${RISK_STYLES[selectedPatient.riskLevel].bg} ${RISK_STYLES[selectedPatient.riskLevel].text} ${RISK_STYLES[selectedPatient.riskLevel].border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${RISK_STYLES[selectedPatient.riskLevel].dot}`} />
                  {selectedPatient.riskLevel}
                </span>
                {showPatientDropdown
                  ? <ChevronUpIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  : <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                }
              </button>

              <AnimatePresence>
                {showPatientDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1.5 left-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {/* Search input */}
                    <div className="px-3 pt-2.5 pb-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
                        Sélectionner un patient
                      </p>
                      <div className="relative">
                        <SearchIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                          value={patientSearch}
                          onChange={(e) => setPatientSearch(e.target.value)}
                          placeholder="Nom ou n° dossier…"
                          className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-400"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Patient list */}
                    <div className="overflow-y-auto max-h-64">
                      {filteredPatients.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-4">
                          Aucun patient trouvé
                        </p>
                      ) : (
                        filteredPatients.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setSelectedPatientId(p.id);
                              setShowPatientDropdown(false);
                              setPatientSearch('');
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${p.id === selectedPatient.id
                                ? 'bg-red-50 dark:bg-red-900/20'
                                : ''
                              }`}
                          >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${p.id === selectedPatient.id
                                ? 'bg-gradient-to-br from-red-500 to-rose-600'
                                : 'bg-gray-100 dark:bg-gray-700'
                              }`}>
                              <span className={`text-[10px] font-bold ${p.id === selectedPatient.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                                {p.name}
                              </p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                                {p.gender === 'M' ? 'H' : 'F'} · {p.age} ans · {p.dossier}
                              </p>
                            </div>
                            {/* Risk */}
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border flex-shrink-0 ${RISK_STYLES[p.riskLevel].bg} ${RISK_STYLES[p.riskLevel].text} ${RISK_STYLES[p.riskLevel].border}`}>
                              <span className={`w-1 h-1 rounded-full ${RISK_STYLES[p.riskLevel].dot}`} />
                              {p.riskLevel}
                            </span>
                            {/* Active checkmark */}
                            {p.id === selectedPatient.id && (
                              <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">
                        {patients.length} patients actifs
                      </span>
                      <button
                        onClick={() => {
                          setShowPatientDropdown(false);
                          navigate('/patients');
                        }}
                        className="text-[10px] text-red-600 dark:text-red-400 font-medium hover:underline"
                      >
                        Gérer les patients →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center md:ml-0">
            <div className="hidden md:block mr-4">
              <DoctorLevel
                level={8}
                experience={350}
                nextLevelExperience={500}
                title="Orthodontiste Expert" />

            </div>
            <LanguageSelector />
            <div className="relative ml-3">
              <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                type="button"
                className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 relative"
                onClick={() => setShowNotifications(!showNotifications)}>

                <span className="sr-only">{t('header.notifications')}</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {newNotificationsCount > 0 &&
                  <motion.span
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 15
                    }}
                    className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

                    {newNotificationsCount}
                  </motion.span>
                }
              </motion.button>
              <AnimatePresence>
                {showNotifications &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95
                    }}
                    transition={{
                      duration: 0.2
                    }}
                    className={`origin-top-${isRTL ? 'left' : 'right'} absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50`}
                    dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="py-2 px-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">

                        {t('header.markAllAsRead')}
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification, idx) =>
                        <motion.div
                          key={notification.id}
                          initial={{
                            opacity: 0,
                            x: isRTL ? 10 : -10
                          }}
                          animate={{
                            opacity: 1,
                            x: 0
                          }}
                          transition={{
                            delay: idx * 0.05
                          }}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${notification.isNew ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div
                              className={`${isRTL ? 'mr-3' : 'ml-3'} w-0 flex-1`}>

                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.description}
                              </p>
                              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                            {notification.isNew &&
                              <div
                                className={`${isRTL ? 'mr-3' : 'ml-3'} flex-shrink-0`}>

                                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                              </div>
                            }
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <div className="py-2 px-3 border-t border-gray-100 dark:border-gray-700 text-center">
                      <button
                        onClick={handleViewAllNotifications}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">

                        {t('header.viewAll')}
                      </button>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>);

};
export default Header;