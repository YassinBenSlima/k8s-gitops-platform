import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  CheckIcon,
  TrashIcon,
  FilterIcon,
  SearchIcon,
  AwardIcon,
  TrophyIcon,
  CalendarIcon,
  ActivityIcon,
  SparklesIcon,
  XIcon,
  CheckCircleIcon,
  MailIcon,
  UserIcon,
  ClockIcon,
  AlertCircleIcon } from
'lucide-react';
const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    title: 'Nouveau badge débloqué!',
    description: 'Vous avez débloqué le badge "Expert en diagnostic"',
    time: 'Il y a 2 heures',
    type: 'achievement',
    isNew: true,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Rappel de rendez-vous',
    description: 'Sophie Martin a rendez-vous demain à 10h00',
    time: 'Il y a 4 heures',
    type: 'appointment',
    isNew: true,
    date: '2024-01-15'
  },
  {
    id: 3,
    title: 'Félicitations!',
    description: 'Vous avez atteint une série de 5 jours consécutifs!',
    time: 'Hier',
    type: 'streak',
    isNew: false,
    date: '2024-01-14'
  },
  {
    id: 4,
    title: 'Traitement terminé',
    description: 'Le traitement de Lucas Dubois est maintenant terminé',
    time: 'Il y a 2 jours',
    type: 'treatment',
    isNew: false,
    date: '2024-01-13'
  },
  {
    id: 5,
    title: 'Nouveau patient',
    description: 'Emma Petit a été ajoutée à votre liste de patients',
    time: 'Il y a 3 jours',
    type: 'patient',
    isNew: false,
    date: '2024-01-12'
  },
  {
    id: 6,
    title: 'Rendez-vous annulé',
    description: 'Thomas Bernard a annulé son rendez-vous du 20/01',
    time: 'Il y a 3 jours',
    type: 'appointment',
    isNew: false,
    date: '2024-01-12'
  },
  {
    id: 7,
    title: 'Message reçu',
    description: 'Nouveau message de Sophie Martin concernant son traitement',
    time: 'Il y a 4 jours',
    type: 'message',
    isNew: false,
    date: '2024-01-11'
  },
  {
    id: 8,
    title: 'Objectif atteint',
    description: 'Vous avez traité 10 patients ce mois-ci!',
    time: 'Il y a 5 jours',
    type: 'achievement',
    isNew: false,
    date: '2024-01-10'
  }]
  );
  const filters = [
  {
    id: 'all',
    name: 'Toutes',
    icon: BellIcon,
    gradient: 'from-red-500 to-rose-500',
    count: notifications.length
  },
  {
    id: 'achievement',
    name: 'Succès',
    icon: AwardIcon,
    gradient: 'from-red-600 to-red-500',
    count: notifications.filter((n) => n.type === 'achievement').length
  },
  {
    id: 'appointment',
    name: 'Rendez-vous',
    icon: CalendarIcon,
    gradient: 'from-red-500 to-rose-500',
    count: notifications.filter((n) => n.type === 'appointment').length
  },
  {
    id: 'treatment',
    name: 'Traitements',
    icon: ActivityIcon,
    gradient: 'from-green-500 to-emerald-600',
    count: notifications.filter((n) => n.type === 'treatment').length
  },
  {
    id: 'streak',
    name: 'Séries',
    icon: TrophyIcon,
    gradient: 'from-amber-500 to-orange-600',
    count: notifications.filter((n) => n.type === 'streak').length
  }];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <AwardIcon className="h-5 w-5 text-red-500" />;
      case 'streak':
        return <TrophyIcon className="h-5 w-5 text-amber-500" />;
      case 'appointment':
        return <CalendarIcon className="h-5 w-5 text-red-500" />;
      case 'treatment':
        return <ActivityIcon className="h-5 w-5 text-green-500" />;
      case 'patient':
        return <UserIcon className="h-5 w-5 text-red-500" />;
      case 'message':
        return <MailIcon className="h-5 w-5 text-red-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-400" />;
    }
  };
  const getNotificationGradient = (type) => {
    switch (type) {
      case 'achievement':
        return 'from-red-50 to-rose-50 border-red-100';
      case 'streak':
        return 'from-amber-50 to-orange-50 border-amber-100';
      case 'appointment':
        return 'from-red-50 to-rose-50 border-red-100';
      case 'treatment':
        return 'from-green-50 to-emerald-50 border-green-100';
      case 'patient':
        return 'from-red-50 to-rose-50 border-red-100';
      case 'message':
        return 'from-red-50 to-rose-50 border-red-100';
      default:
        return 'from-gray-50 to-slate-50 border-gray-100';
    }
  };
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
      n.id === id ?
      {
        ...n,
        isNew: false
      } :
      n
      )
    );
  };
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        isNew: false
      }))
    );
  };
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };
  const deleteAllRead = () => {
    setNotifications(notifications.filter((n) => n.isNew));
  };
  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
    selectedFilter === 'all' || notification.type === selectedFilter;
    const matchesSearch =
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const newNotificationsCount = notifications.filter((n) => n.isNew).length;
  return (
    <div className="space-y-4">
      {/* Header - Compact */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-red-600 via-red-500 to-rose-500 rounded-lg p-3 text-white shadow-sm">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <BellIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none">
                Notifications
              </h1>
              <p className="text-red-100 text-xs mt-0.5">
                Gérez toutes vos notifications en un seul endroit
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <BellIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{notifications.length}</span>
                <span className="text-red-100 text-xs">total</span>
              </div>
              {newNotificationsCount > 0 &&
              <div className="flex items-center gap-1.5 bg-white bg-opacity-20 rounded-md px-2.5 py-1.5 text-sm">
                  <AlertCircleIcon className="h-3.5 w-3.5" />
                  <span className="font-bold">{newNotificationsCount}</span>
                  <span className="text-red-100 text-xs">nouvelles</span>
                </div>
              }
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Actions */}
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
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <SearchIcon className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                placeholder="Rechercher une notification..." />

            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              disabled={newNotificationsCount === 0}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all">

              <CheckCircleIcon className="h-3.5 w-3.5 mr-1.5" />
              Tout marquer comme lu
            </button>
            <button
              onClick={deleteAllRead}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 transition-all">

              <TrashIcon className="h-3.5 w-3.5 mr-1.5" />
              Supprimer lues
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
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
        className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">

        <div className="bg-gray-50 border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {filters.map((filter, index) =>
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`${selectedFilter === filter.id ? 'border-b-2 border-red-500' : 'border-b-2 border-transparent'} whitespace-nowrap py-2.5 px-4 font-medium text-xs flex items-center transition-all relative group`}>

                <div
                className={`h-7 w-7 rounded-full flex items-center justify-center mr-2 transition-all ${selectedFilter === filter.id ? `bg-gradient-to-br ${filter.gradient}` : 'bg-gray-200 group-hover:bg-gray-300'}`}>

                  <filter.icon
                  className={`h-3.5 w-3.5 ${selectedFilter === filter.id ? 'text-white' : 'text-gray-500'}`} />

                </div>
                <span
                className={`${selectedFilter === filter.id ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>

                  {filter.name}
                </span>
                <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedFilter === filter.id ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-600'}`}>

                  {filter.count}
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="p-3">
          {filteredNotifications.length > 0 ?
          <div className="space-y-2">
              {filteredNotifications.map((notification, index) =>
            <motion.div
              key={notification.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.05
              }}
              className={`bg-gradient-to-br ${getNotificationGradient(notification.type)} rounded-lg border overflow-hidden ${notification.isNew ? 'ring-1 ring-red-500' : ''}`}>

                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                              {notification.title}
                              {notification.isNew &&
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                                  Nouveau
                                </span>
                          }
                            </h3>
                            <p className="text-xs text-gray-700 mt-0.5">
                              {notification.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 ml-3">
                            {notification.isNew &&
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all">

                                <CheckIcon className="h-3 w-3" />
                              </button>
                        }
                            <button
                          onClick={() =>
                          deleteNotification(notification.id)
                          }
                          className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all">

                              <TrashIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center text-[10px] text-gray-500">
                          <ClockIcon className="h-2.5 w-2.5 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            )}
            </div> :

          <div className="flex flex-col items-center justify-center py-10">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <BellIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Aucune notification
              </h3>
              <p className="text-xs text-gray-500">
                {searchQuery ?
              'Aucune notification ne correspond à votre recherche' :
              'Vous êtes à jour avec toutes vos notifications'}
              </p>
            </div>
          }
        </div>
      </motion.div>

      {/* Stats */}
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
        className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-3 border border-red-100">

        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
            <SparklesIcon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-bold text-red-900 mb-1">
              Statistiques des notifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
              {
                icon: BellIcon,
                color: 'red',
                label: 'Total',
                val: notifications.length
              },
              {
                icon: AlertCircleIcon,
                color: 'red',
                label: 'Nouvelles',
                val: newNotificationsCount
              },
              {
                icon: CheckCircleIcon,
                color: 'green',
                label: 'Lues',
                val: notifications.length - newNotificationsCount
              },
              {
                icon: CalendarIcon,
                color: 'red',
                label: "Aujourd'hui",
                val: notifications.filter((n) => n.date === '2024-01-15').
                length
              }].
              map((item, i) =>
              <div
                key={i}
                className="bg-white rounded-lg p-2.5 border border-red-100">

                  <div className="flex items-center gap-1.5 mb-1">
                    <item.icon
                    className={`h-3.5 w-3.5 text-${item.color}-500`} />

                    <span className="text-[10px] font-medium text-gray-600">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {item.val}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default Notifications;