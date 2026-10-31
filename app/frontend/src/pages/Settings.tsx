import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SettingsIcon,
  UserIcon,
  BellIcon,
  GlobeIcon,
  PaletteIcon,
  ShieldIcon,
  ZapIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  CheckIcon,
  SaveIcon,
  InfoIcon,
  MailIcon,
  MessageSquareIcon,
  CalendarIcon,
  ClockIcon,
  LanguagesIcon,
  MapPinIcon,
  SparklesIcon,
  KeyIcon,
  LockIcon,
  SmartphoneIcon,
  EyeIcon,
  EyeOffIcon,
  RefreshCwIcon } from
'lucide-react';
import SecuritySettings from '../components/users/SecuritySettings';
import { useTheme } from '../contexts/ThemeContext';
const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    displayName: 'Dr. Sophie Dupont',
    email: 'sophie.dupont@smartortho.fr',
    phone: '+33 6 12 34 56 78',
    timezone: 'Europe/Paris',
    language: 'fr',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    patientMessages: true,
    systemUpdates: false,
    marketingEmails: false,
    reminderTime: '24',
    accentColor: 'blue',
    compactMode: false,
    showAvatars: true,
    animationsEnabled: true,
    profileVisibility: 'team',
    showOnlineStatus: true,
    shareAnalytics: true
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const tabs = [
  {
    id: 'account',
    label: 'Compte',
    icon: UserIcon,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'appearance',
    label: 'Apparence',
    icon: PaletteIcon,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'security',
    label: 'Sécurité',
    icon: ShieldIcon,
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'integrations',
    label: 'Intégrations',
    icon: ZapIcon,
    color: 'from-amber-500 to-orange-600'
  }];

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  const renderAccountSettings = () =>
  <motion.div
    initial={{
      opacity: 0,
      y: 20
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    exit={{
      opacity: 0,
      y: -20
    }}
    className="space-y-6">

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border-2 border-blue-100 dark:border-blue-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Informations du profil
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérez vos informations personnelles
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

              Nom d'affichage
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
              type="text"
              id="displayName"
              className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition-all"
              value={settings.displayName}
              onChange={(e) =>
              handleSettingChange('displayName', e.target.value)
              } />

            </div>
          </div>
          <div>
            <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

              Adresse email
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
              type="email"
              id="email"
              className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition-all"
              value={settings.email}
              onChange={(e) => handleSettingChange('email', e.target.value)} />

            </div>
          </div>
          <div>
            <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

              Téléphone
            </label>
            <div className="relative">
              <SmartphoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
              type="tel"
              id="phone"
              className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition-all"
              value={settings.phone}
              onChange={(e) => handleSettingChange('phone', e.target.value)} />

            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center">
            <GlobeIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Région et langue
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Préférences régionales
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

              Langue
            </label>
            <div className="relative">
              <LanguagesIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
              id="language"
              className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:outline-none transition-all appearance-none"
              value={settings.language}
              onChange={(e) =>
              handleSettingChange('language', e.target.value)
              }>

                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
          <div>
            <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

              Fuseau horaire
            </label>
            <div className="relative">
              <ClockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
              id="timezone"
              className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:outline-none transition-all appearance-none"
              value={settings.timezone}
              onChange={(e) =>
              handleSettingChange('timezone', e.target.value)
              }>

                <option value="Europe/Paris">Paris (GMT+1)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
                <option value="America/New_York">New York (GMT-5)</option>
                <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;

  const renderNotificationSettings = () =>
  <motion.div
    initial={{
      opacity: 0,
      y: 20
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    exit={{
      opacity: 0,
      y: -20
    }}
    className="space-y-6">

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-100 dark:border-purple-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
            <BellIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Canaux de notification
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choisissez comment recevoir les notifications
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {[
        {
          key: 'emailNotifications',
          label: 'Notifications par email',
          icon: MailIcon,
          description: 'Recevez des emails pour les événements importants'
        },
        {
          key: 'smsNotifications',
          label: 'Notifications SMS',
          icon: MessageSquareIcon,
          description: 'Recevez des SMS pour les alertes urgentes'
        },
        {
          key: 'pushNotifications',
          label: 'Notifications push',
          icon: SmartphoneIcon,
          description: 'Recevez des notifications sur votre appareil'
        }].
        map((channel) =>
        <motion.div
          key={channel.key}
          whileHover={{
            scale: 1.02
          }}
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${settings[channel.key] ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}`}
          onClick={() =>
          handleSettingChange(channel.key, !settings[channel.key])
          }>

              <div
            className={`h-6 w-6 rounded flex items-center justify-center mr-3 transition-all ${settings[channel.key] ? 'bg-purple-500 dark:bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`}>

                {settings[channel.key] &&
            <CheckIcon className="h-4 w-4 text-white" />
            }
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <channel.icon className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {channel.label}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {channel.description}
                </p>
              </div>
            </motion.div>
        )}
        </div>
      </div>
      {/* Notification Types */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border-2 border-blue-100 dark:border-blue-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Types de notifications
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personnalisez les alertes que vous recevez
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {[
        {
          key: 'appointmentReminders',
          label: 'Rappels de rendez-vous',
          icon: CalendarIcon
        },
        {
          key: 'patientMessages',
          label: 'Messages des patients',
          icon: MessageSquareIcon
        },
        {
          key: 'systemUpdates',
          label: 'Mises à jour système',
          icon: RefreshCwIcon
        },
        {
          key: 'marketingEmails',
          label: 'Emails marketing',
          icon: MailIcon
        }].
        map((type) =>
        <motion.div
          key={type.key}
          whileHover={{
            scale: 1.02
          }}
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${settings[type.key] ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}`}
          onClick={() => handleSettingChange(type.key, !settings[type.key])}>

              <div
            className={`h-6 w-6 rounded flex items-center justify-center mr-3 transition-all ${settings[type.key] ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>

                {settings[type.key] &&
            <CheckIcon className="h-4 w-4 text-white" />
            }
              </div>
              <type.icon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {type.label}
              </span>
            </motion.div>
        )}
        </div>
        <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
          <label
          htmlFor="reminderTime"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

            Envoyer les rappels
          </label>
          <div className="flex items-center space-x-2">
            <input
            type="number"
            id="reminderTime"
            min="1"
            max="168"
            className="block w-20 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none transition-all"
            value={settings.reminderTime}
            onChange={(e) =>
            handleSettingChange('reminderTime', e.target.value)
            } />

            <span className="text-sm text-gray-600 dark:text-gray-400">
              heures avant le rendez-vous
            </span>
          </div>
        </div>
      </div>
    </motion.div>;

  const renderAppearanceSettings = () =>
  <motion.div
    initial={{
      opacity: 0,
      y: 20
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    exit={{
      opacity: 0,
      y: -20
    }}
    className="space-y-6">

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-100 dark:border-green-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
            <PaletteIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Thème
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personnalisez l'apparence de l'interface
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
          whileHover={{
            scale: 1.05,
            y: -5
          }}
          whileTap={{
            scale: 0.95
          }}
          className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all ${theme === 'light' ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700'}`}
          onClick={() => setTheme('light')}>

            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 mx-auto">
              <SunIcon className="h-8 w-8 text-white" />
            </div>
            <p className="text-center font-medium text-gray-900 dark:text-white">
              Clair
            </p>
            {theme === 'light' &&
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">

                <CheckIcon className="h-4 w-4 text-white" />
              </motion.div>
          }
          </motion.div>
          <motion.div
          whileHover={{
            scale: 1.05,
            y: -5
          }}
          whileTap={{
            scale: 0.95
          }}
          className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all ${theme === 'dark' ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700'}`}
          onClick={() => setTheme('dark')}>

            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-4 mx-auto">
              <MoonIcon className="h-8 w-8 text-white" />
            </div>
            <p className="text-center font-medium text-gray-900 dark:text-white">
              Sombre
            </p>
            {theme === 'dark' &&
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">

                <CheckIcon className="h-4 w-4 text-white" />
              </motion.div>
          }
          </motion.div>
        </div>
      </div>
      {/* Accent Color */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Couleur d'accent
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choisissez votre couleur préférée
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
        {
          id: 'blue',
          color: 'bg-blue-500'
        },
        {
          id: 'purple',
          color: 'bg-purple-500'
        },
        {
          id: 'pink',
          color: 'bg-pink-500'
        },
        {
          id: 'red',
          color: 'bg-red-500'
        },
        {
          id: 'orange',
          color: 'bg-orange-500'
        },
        {
          id: 'yellow',
          color: 'bg-yellow-500'
        },
        {
          id: 'green',
          color: 'bg-green-500'
        },
        {
          id: 'teal',
          color: 'bg-teal-500'
        }].
        map((color) =>
        <motion.div
          key={color.id}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          className={`relative h-12 w-12 rounded-full ${color.color} cursor-pointer shadow-lg ${settings.accentColor === color.id ? 'ring-4 ring-offset-2 dark:ring-offset-gray-800 ring-gray-400 dark:ring-gray-500' : ''}`}
          onClick={() => handleSettingChange('accentColor', color.id)}>

              {settings.accentColor === color.id &&
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            className="absolute inset-0 flex items-center justify-center">

                  <CheckIcon className="h-6 w-6 text-white" />
                </motion.div>
          }
            </motion.div>
        )}
        </div>
      </div>
      {/* Display Options */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-100 dark:border-amber-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center">
            <EyeIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Options d'affichage
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personnalisez l'interface
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {[
        {
          key: 'compactMode',
          label: 'Mode compact',
          description: "Réduire l'espacement entre les éléments"
        },
        {
          key: 'showAvatars',
          label: 'Afficher les avatars',
          description: 'Montrer les photos de profil'
        },
        {
          key: 'animationsEnabled',
          label: 'Animations activées',
          description: 'Activer les transitions et animations'
        }].
        map((option) =>
        <motion.div
          key={option.key}
          whileHover={{
            scale: 1.02
          }}
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${settings[option.key] ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'}`}
          onClick={() =>
          handleSettingChange(option.key, !settings[option.key])
          }>

              <div
            className={`h-6 w-6 rounded flex items-center justify-center mr-3 transition-all ${settings[option.key] ? 'bg-amber-500 dark:bg-amber-600' : 'bg-gray-200 dark:bg-gray-700'}`}>

                {settings[option.key] &&
            <CheckIcon className="h-4 w-4 text-white" />
            }
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white block">
                  {option.label}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {option.description}
                </p>
              </div>
            </motion.div>
        )}
        </div>
      </div>
    </motion.div>;

  const renderIntegrationSettings = () =>
  <motion.div
    initial={{
      opacity: 0,
      y: 20
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    exit={{
      opacity: 0,
      y: -20
    }}
    className="space-y-6">

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-100 dark:border-amber-800 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center">
            <ZapIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Intégrations disponibles
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connectez vos outils préférés
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
        {
          name: 'Google Calendar',
          description: 'Synchroniser les rendez-vous',
          icon: CalendarIcon,
          connected: true,
          color: 'blue'
        },
        {
          name: 'Stripe',
          description: 'Traiter les paiements',
          icon: CreditCardIcon,
          connected: true,
          color: 'purple'
        },
        {
          name: 'Twilio',
          description: 'Envoyer des SMS',
          icon: MessageSquareIcon,
          connected: false,
          color: 'red'
        },
        {
          name: 'Mailchimp',
          description: 'Campagnes email',
          icon: MailIcon,
          connected: false,
          color: 'yellow'
        }].
        map((integration) =>
        <motion.div
          key={integration.name}
          whileHover={{
            scale: 1.02
          }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 transition-all">

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div
                className={`h-10 w-10 rounded-lg bg-${integration.color}-100 dark:bg-${integration.color}-900/30 flex items-center justify-center`}>

                    <integration.icon
                  className={`h-5 w-5 text-${integration.color}-600 dark:text-${integration.color}-400`} />

                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </div>
              <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${integration.connected ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>

                {integration.connected ? 'Connecté' : 'Connecter'}
              </motion.button>
            </motion.div>
        )}
        </div>
      </div>
    </motion.div>;

  return (
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
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">

        <div className="relative p-8">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}>
            </div>
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="h-14 w-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">

                <SettingsIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Paramètres
                </h1>
                <p className="text-blue-100 text-sm">
                  Personnalisez votre expérience OrthoBizz
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleSaveSettings}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">

              <SaveIcon className="h-5 w-5 mr-2" />
              Enregistrer
            </motion.button>
          </div>
        </div>
      </motion.div>
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess &&
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          className="bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center">

            <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Paramètres enregistrés avec succès!
            </p>
          </motion.div>
        }
      </AnimatePresence>
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) =>
          <motion.button
            key={tab.id}
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max px-6 py-4 flex items-center justify-center space-x-2 font-medium transition-all relative ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>

              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
              {activeTab === tab.id &&
            <motion.div
              layoutId="activeTab"
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.color}`}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }} />

            }
            </motion.button>
          )}
        </div>
      </div>
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'account' && renderAccountSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'appearance' && renderAppearanceSettings()}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'integrations' && renderIntegrationSettings()}
      </AnimatePresence>
    </div>);

};
export default Settings;