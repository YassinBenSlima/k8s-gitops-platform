import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  SparklesIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ListIcon,
  GridIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  XIcon
} from
  'lucide-react';
import { useTranslation } from '../../node_modules/react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid/index.js';
import timeGridPlugin from '@fullcalendar/timegrid/index.js';
import interactionPlugin from '@fullcalendar/interaction/index.js';
import frLocale from '@fullcalendar/core/locales/fr.js';
import ScheduleOptimization from '../components/ai-tools/ScheduleOptimization';
const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Ahmed Ben Salah',
    patientAge: 62,
    type: 'Consultation cardiologique',
    date: '2025-10-15',
    startTime: '09:00',
    endTime: '09:30',
    status: 'confirmed',
    doctor: 'Dr. Mansouri',
    room: 'Consultation 1',
    phone: '+216 98 765 432',
    email: 'ahmed.bensalah@email.com',
    color: 'blue',
    avatar: 'AB'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Fatma Trabelsi',
    patientAge: 55,
    type: 'Échocardiographie',
    date: '2025-10-15',
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    doctor: 'Dr. Khelil',
    room: 'Salle Écho 1',
    phone: '+216 22 456 789',
    email: 'fatma.trabelsi@email.com',
    color: 'green',
    avatar: 'FT'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Mohamed Khelifi',
    patientAge: 71,
    type: 'Holter ECG 24h',
    date: '2025-10-15',
    startTime: '11:30',
    endTime: '12:00',
    status: 'completed',
    doctor: 'Dr. Chaabane',
    room: 'Salle ECG 2',
    phone: '+216 20 654 321',
    email: 'm.khelifi@email.com',
    color: 'green',
    avatar: 'MK'
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Leila Hamdi',
    patientAge: 48,
    type: 'Urgence cardiologique',
    date: '2025-10-15',
    startTime: '14:00',
    endTime: '14:30',
    status: 'pending',
    doctor: 'Dr. Trabelsi',
    room: 'USIC',
    phone: '+216 55 112 233',
    email: 'leila.hamdi@email.com',
    color: 'red',
    avatar: 'LH'
  },
  {
    id: 5,
    patientId: 5,
    patientName: 'Karim Bouzid',
    patientAge: 58,
    type: 'Coronarographie',
    date: '2025-10-15',
    startTime: '15:00',
    endTime: '15:30',
    status: 'confirmed',
    doctor: 'Dr. Ben Ali',
    room: 'Salle Cathétérisme',
    phone: '+216 99 778 844',
    email: 'karim.bouzid@email.com',
    color: 'amber',
    avatar: 'KB'
  },
  {
    id: 6,
    patientId: 6,
    patientName: 'Sonia Mejri',
    patientAge: 44,
    type: 'Épreuve d\'effort',
    date: '2025-10-15',
    startTime: '16:00',
    endTime: '16:30',
    status: 'cancelled',
    doctor: 'Dr. Mansouri',
    room: 'Salle Effort',
    phone: '+216 24 998 877',
    email: 'sonia.mejri@email.com',
    color: 'cyan',
    avatar: 'SM'
  },
  {
    id: 7,
    patientId: 7,
    patientName: 'Riadh Gharbi',
    patientAge: 67,
    type: 'Bilan cardiovasculaire',
    date: '2025-10-15',
    startTime: '09:30',
    endTime: '10:00',
    status: 'pending',
    doctor: 'Dr. Mansouri',
    room: 'Consultation 2',
    phone: '+216 21 335 577',
    email: 'riadh.gharbi@email.com',
    color: 'blue',
    avatar: 'RG'
  },
  {
    id: 8,
    patientId: 8,
    patientName: 'Nadia Sfar',
    patientAge: 52,
    type: 'Téléconsultation cardiologie',
    date: '2025-10-15',
    startTime: '10:30',
    endTime: '11:00',
    status: 'confirmed',
    doctor: 'Dr. Trabelsi',
    room: 'Téléconsultation',
    phone: '+216 52 441 100',
    email: 'nadia.sfar@email.com',
    color: 'green',
    avatar: 'NS'
  },
  {
    id: 9,
    patientId: 9,
    patientName: 'Samir Bouhlel',
    patientAge: 60,
    type: 'Cardioversion électrique',
    date: '2025-10-15',
    startTime: '13:00',
    endTime: '13:30',
    status: 'confirmed',
    doctor: 'Dr. Chaabane',
    room: 'Bloc rythmologie',
    phone: '+216 28 122 166',
    email: 'samir.bouhlel@email.com',
    color: 'red',
    avatar: 'SB'
  },
  {
    id: 10,
    patientId: 10,
    patientName: 'Ines Cherif',
    patientAge: 46,
    type: 'ECG / Tracé cardiaque',
    date: '2025-10-15',
    startTime: '17:00',
    endTime: '17:30',
    status: 'confirmed',
    doctor: 'Dr. Mansouri',
    room: 'Salle ECG 1',
    phone: '+216 27 700 612',
    email: 'ines.cherif@email.com',
    color: 'blue',
    avatar: 'IC'
  }];

const appointmentTypeColors = {
  'Consultation cardiologique': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300'
  },
  'ECG / Tracé cardiaque': {
    bg: 'bg-cyan-100',
    text: 'text-cyan-800',
    border: 'border-cyan-300'
  },
  'Échocardiographie': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300'
  },
  'Épreuve d\'effort': {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300'
  },
  'Holter ECG 24h': {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-300'
  },
  Coronarographie: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300'
  },
  'Cardioversion électrique': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300'
  },
  'Bilan cardiovasculaire': {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-300'
  },
  'Téléconsultation cardiologie': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-300'
  },
  'Urgence cardiologique': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300'
  }
};
const statusColors = {
  confirmed: {
    bullet: 'bg-green-500',
    label: 'Confirmé',
    bg: 'bg-green-100',
    text: 'text-green-800'
  },
  pending: {
    bullet: 'bg-yellow-500',
    label: 'En attente',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800'
  },
  cancelled: {
    bullet: 'bg-red-500',
    label: 'Annulé',
    bg: 'bg-red-100',
    text: 'text-red-800'
  },
  completed: {
    bullet: 'bg-blue-500',
    label: 'Terminé',
    bg: 'bg-blue-100',
    text: 'text-blue-800'
  }
};
const Appointments = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-10-15');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.
        toLowerCase().
        includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = appointment.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });
  const stats = {
    total: appointments.filter((a) => a.date === selectedDate).length,
    completed: appointments.filter(
      (a) => a.date === selectedDate && a.status === 'completed'
    ).length,
    scheduled: appointments.filter(
      (a) =>
        a.date === selectedDate && (
          a.status === 'confirmed' || a.status === 'pending')
    ).length,
    cancelled: appointments.filter(
      (a) => a.date === selectedDate && a.status === 'cancelled'
    ).length
  };
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: `${appointment.patientName} - ${appointment.type}`,
    start: `${appointment.date}T${appointment.startTime}`,
    end: `${appointment.date}T${appointment.endTime}`,
    backgroundColor: (statusColors as any)[appointment.status]?.bullet || '#3b82f6',
    borderColor: (statusColors as any)[appointment.status]?.bullet || '#2563eb',
    extendedProps: {
      patientName: appointment.patientName,
      type: appointment.type,
      status: appointment.status,
      doctor: appointment.doctor,
      room: appointment.room,
      phone: appointment.phone,
      email: appointment.email,
      color: appointment.color,
      avatar: appointment.avatar
    }
  }));
  const handleEventClick = (info) => {
    const appointmentId = info.event.id;
    navigate(`/appointments/${appointmentId}`);
  };
  const handleDateSelect = (selectInfo) => {
    const date = selectInfo.startStr.split('T')[0];
    navigate(`/appointments/create?date=${date}`);
  };
  const handleNewAppointment = () => {
    navigate('/appointments/create');
  };
  const handleAppointmentClick = (id) => {
    navigate(`/appointments/${id}`);
  };
  const handleDateChange = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };
  const getStatusBadge = (status) => {
    const statusInfo = statusColors[status];
    switch (status) {
      case 'completed':
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
            {statusInfo.label}
          </span>);

      case 'cancelled':
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>

            <XCircleIcon className="h-3 w-3 mr-1" />
            {statusInfo.label}
          </span>);

      case 'pending':
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>

            <AlertCircleIcon className="h-3 w-3 mr-1" />
            {statusInfo.label}
          </span>);

      default:
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>

            <CalendarIcon className="h-3 w-3 mr-1" />
            {statusInfo.label}
          </span>);

    }
  };
  const displayedAppointments = showAllAppointments ?
    filteredAppointments :
    filteredAppointments.slice(0, 10);
  return (
    <div className="space-y-2.5">
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
        className="bg-red-600 rounded-lg p-2 text-white shadow-sm">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none">
                {t('appointments.title')}
              </h1>
              <p className="text-red-100 text-xs mt-0.5">
                Manage appointments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <CalendarIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{stats.total}</span>
                <span className="text-red-100 text-xs">total</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <ClockIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{stats.scheduled}</span>
                <span className="text-red-100 text-xs">scheduled</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <CheckCircleIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{stats.completed}</span>
                <span className="text-red-100 text-xs">completed</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <XCircleIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{stats.cancelled}</span>
                <span className="text-red-100 text-xs">cancelled</span>
              </div>
            </div>
            {/* Optimize Planning button */}
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setShowOptimizeModal(true)}
              className="inline-flex items-center px-2.5 py-1 bg-white bg-opacity-20 border border-white border-opacity-40 text-white rounded-md font-semibold hover:bg-opacity-30 transition-all text-xs backdrop-blur-sm">

              <SparklesIcon className="h-3.5 w-3.5 mr-1" />
              Optimize
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleNewAppointment}
              className="inline-flex items-center px-2.5 py-1 bg-white text-red-600 rounded-md font-semibold shadow-sm hover:shadow-md transition-all text-xs">

              <PlusIcon className="h-3.5 w-3.5 mr-1" />
              New
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Date Selector */}
      {viewMode === 'list' &&
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
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                onClick={() => handleDateChange('prev')}
                className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all">

                <ChevronLeftIcon className="h-4 w-4" />
              </motion.button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center shadow-sm">
                  <CalendarIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {new Date(selectedDate).toLocaleDateString('fr-FR', {
                      weekday: 'long'
                    })}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                onClick={() => handleDateChange('next')}
                className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all">

                <ChevronRightIcon className="h-4 w-4" />
              </motion.button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>

                  <ListIcon className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>

                  <GridIcon className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      }

      {/* Search and Filter */}
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
          delay: 0.6
        }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-1.5 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent text-xs shadow-sm"
              placeholder="Search appointment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 shadow-sm">

              <option value="all">Tous les statuts</option>
              <option value="confirmed">Confirmés</option>
              <option value="pending">En attente</option>
              <option value="completed">Terminés</option>
              <option value="cancelled">Annulés</option>
            </select>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow-sm hover:bg-gray-200 transition-all text-xs">

              <FilterIcon className="h-4 w-4 mr-1.5" />
              Filter
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Appointments List/Calendar */}
      {viewMode === 'list' ?
        <div className="space-y-2.5">
          {displayedAppointments.map((appointment, index) =>
            <motion.div
              key={appointment.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.7 + index * 0.03
              }}
              whileHover={{
                y: -2,
                scale: 1.005
              }}
              onClick={() => handleAppointmentClick(appointment.id)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer group">

              <div className="flex">
                <div className="w-1 bg-red-600" />

                <div className="flex-1 p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center shadow-sm">

                          <span className="text-sm font-bold text-red-600">
                            {appointment.avatar}
                          </span>
                        </div>
                        <div
                          className={`absolute -top-1 -left-1 h-3 w-3 rounded-full ${(statusColors as any)[appointment.status]?.bullet || 'bg-gray-400'} border-2 border-white shadow-sm`}>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 mb-1 flex-wrap">
                          <h3 className="text-xs font-bold text-gray-900 truncate">
                            {appointment.patientName}
                          </h3>
                          <span className="text-xs text-gray-600">
                            {appointment.patientAge} ans
                          </span>
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold border ${(appointmentTypeColors as any)[appointment.type]?.bg || 'bg-gray-100'} ${(appointmentTypeColors as any)[appointment.type]?.text || 'text-gray-800'} ${(appointmentTypeColors as any)[appointment.type]?.border || 'border-gray-200'}`}>

                            {appointment.type}
                          </span>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <div className="flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="font-semibold">
                              {appointment.startTime}-{appointment.endTime}
                            </span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center truncate">
                            <UserIcon className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
                            <span className="truncate">
                              {appointment.doctor}
                            </span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center truncate">
                            <MapPinIcon className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{appointment.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{
                        x: 5
                      }}
                      className="text-red-600 group-hover:text-red-700 flex-shrink-0 ml-2">

                      <ArrowRightIcon className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {filteredAppointments.length > 10 &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.8
              }}
              className="flex justify-center">

              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => setShowAllAppointments(!showAllAppointments)}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all text-sm">

                <EyeIcon className="h-4 w-4 mr-1.5" />
                {showAllAppointments ?
                  'View less' :
                  `View all (${filteredAppointments.length - 10} more)`}
              </motion.button>
            </motion.div>
          }
        </div> :

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
            delay: 0.7
          }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-2">

          <style>
            {`
              .fc {
                --fc-border-color: rgb(229 231 235);
                --fc-button-bg-color: rgb(220 38 38);
                --fc-button-border-color: rgb(220 38 38);
                --fc-button-hover-bg-color: rgb(185 28 28);
                --fc-button-hover-border-color: rgb(185 28 28);
                --fc-button-active-bg-color: rgb(153 27 27);
                --fc-button-active-border-color: rgb(153 27 27);
                --fc-today-bg-color: rgb(254 242 242);
              }
              .fc .fc-toolbar {
                margin-bottom: 0.5rem;
                gap: 0.35rem;
              }
          .fc .fc-toolbar-title {
                font-size: 0.95rem;
                font-weight: 700;
                color: rgb(17 24 39);
              }
              .fc .fc-button {
                padding: 0.25rem 0.5rem;
                border-radius: 0.3rem;
                font-weight: 600;
                text-transform: capitalize;
                font-size: 0.75rem;
                line-height: 1.1;
              }
              .fc .fc-daygrid-day-number {
                color: rgb(75 85 99);
                font-weight: 600;
                padding: 0.125rem 0.25rem;
                font-size: 0.7rem;
              }
              .fc .fc-col-header-cell {
                background: rgb(249 250 251);
                font-weight: 700;
                text-transform: uppercase;
                font-size: 0.65rem;
                letter-spacing: 0.05em;
                padding: 0.5rem 0.25rem;
                color: rgb(75 85 99);
              }
              .fc .fc-event {
                border-radius: 0.4rem;
                padding: 0.125rem 0.25rem;
                margin: 0.05rem;
                font-weight: 600;
                font-size: 0.7rem;
                cursor: pointer;
                transition: all 0.2s;
              }
              .fc .fc-event:hover {
                transform: scale(1.02);
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              }
              .fc .fc-daygrid-day.fc-day-today {
                background: var(--fc-today-bg-color) !important;
              }
              .fc .fc-timegrid-slot {
                height: 1.55rem;
              }
              .fc .fc-timegrid-slot-label {
                color: rgb(107 114 128);
                font-size: 0.65rem;
                font-weight: 600;
              }
              .fc .fc-timegrid-axis {
                font-size: 0.65rem;
              }
              .fc .fc-timegrid-axis-cushion,
              .fc .fc-timegrid-slot-label-cushion,
              .fc .fc-col-header-cell-cushion {
                padding: 0.2rem;
              }
              .fc .fc-daygrid-event-harness,
              .fc .fc-timegrid-event-harness {
                margin: 0.05rem 0;
              }
              .fc-theme-standard td,
              .fc-theme-standard th {
                border-color: var(--fc-border-color);
              }
              .fc-theme-standard .fc-scrollgrid {
                border-color: var(--fc-border-color);
              }
            `}
          </style>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            initialDate="2025-10-15"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={frLocale}
            events={calendarEvents}
            eventClick={handleEventClick}
            selectable={true}
            select={handleDateSelect}
            slotMinTime="08:00:00"
            slotMaxTime="19:00:00"
            allDaySlot={false}
            height="auto"
            expandRows={true}
            slotDuration="00:15:00"
            slotLabelInterval="01:00"
            nowIndicator={true}
            dayMaxEventRows={3}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
            }}
            buttonText={{
              today: "Today",
              month: 'Month',
              week: 'Week',
              day: 'Day'
            }}
            eventContent={(eventInfo) => {
              const { extendedProps } = eventInfo.event;
              const typeColors = appointmentTypeColors[extendedProps.type];
              const statusInfo = statusColors[extendedProps.status];
              return (
                <div className="flex flex-col space-y-0.5 p-0.5 overflow-hidden">
                  <div className="flex items-center space-x-1.5">
                    <div
                      className={`flex-shrink-0 h-1.5 w-1.5 rounded-full ${statusInfo.bullet}`}>
                    </div>
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-[9px] font-bold">
                      {extendedProps.avatar}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-[10px] font-bold truncate leading-tight">
                        {extendedProps.patientName}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${typeColors.bg} ${typeColors.text} w-fit`}>

                    {extendedProps.type}
                  </div>
                </div>);

            }} />

        </motion.div>
      }

      {filteredAppointments.length === 0 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="text-center py-12">

          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Aucun rendez-vous trouvé
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucun rendez-vous ne correspond à vos critères de recherche
          </p>
          <div className="mt-6">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleNewAppointment}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">

              <PlusIcon className="h-5 w-5 mr-2" />
              Nouveau rendez-vous
            </motion.button>
          </div>
        </motion.div>
      }

      {/* Optimize Planning Modal */}
      <AnimatePresence>
        {showOptimizeModal &&
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowOptimizeModal(false);
            }}>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20
              }}
              transition={{
                duration: 0.2
              }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-red-600 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Optimisation du Planning
                    </h2>
                    <p className="text-red-100 text-xs">
                      Maximisez l'efficacité de votre agenda avec l'IA
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOptimizeModal(false)}
                  className="p-1.5 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors">

                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              {/* Modal Body - scrollable */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-white to-gray-50">
                <ScheduleOptimization />
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};
export default Appointments;