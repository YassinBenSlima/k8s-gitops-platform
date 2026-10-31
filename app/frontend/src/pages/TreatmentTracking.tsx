import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ActivityIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  PlusIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ClockIcon,
  TrendingUpIcon,
  UserIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  EditIcon,
  MoreVerticalIcon,
  BarChart2Icon,
  StarIcon,
  XCircleIcon,
  CheckIcon,
  BellIcon,
  PhoneIcon,
  RefreshCwIcon,
  ListIcon,
  GridIcon,
  TrendingDownIcon,
  ZapIcon,
  AwardIcon,
  AlertCircleIcon,
  ChevronDownIcon } from
'lucide-react';
const TreatmentTracking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('evaluation');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  // Progression tab state
  const [progressTreatmentFilter, setProgressTreatmentFilter] = useState('all');
  const [progressView, setProgressView] = useState<'grid' | 'list'>('grid');
  // Rendez-vous tab state
  const [apptDateFilter, setApptDateFilter] = useState<
    'today' | 'week' | 'month' | 'all'>(
    'week');
  const [apptStatusFilter, setApptStatusFilter] = useState('all');
  const [apptSearchTerm, setApptSearchTerm] = useState('');
  const itemsPerPage = 20;
  // Mock data for 600+ patients
  const generateMockPatients = () => {
    const treatments = [
    'Appareil fixe',
    'Aligneurs',
    'Appareil amovible',
    'Contention'];

    const statuses = ['En cours', 'En pause', 'Terminé', 'À risque'];
    const priorities = ['Haute', 'Moyenne', 'Faible'];
    return Array.from(
      {
        length: 650
      },
      (_, i) => ({
        id: i + 1,
        name: `Patient ${i + 1}`,
        dateOfBirth: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${1990 + Math.floor(Math.random() * 20)}`,
        treatment: treatments[Math.floor(Math.random() * treatments.length)],
        progress: Math.floor(Math.random() * 100),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        lastEvaluation: `${Math.floor(Math.random() * 30) + 1}/${Math.floor(Math.random() * 12) + 1}/2024`,
        nextEvaluation: `${Math.floor(Math.random() * 30) + 1}/${Math.floor(Math.random() * 12) + 1}/2024`,
        avatar: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        color: ['blue', 'purple', 'green', 'amber', 'pink', 'cyan'][
        Math.floor(Math.random() * 6)]

      })
    );
  };
  const patients = generateMockPatients();
  const colorGradients = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
    pink: 'from-pink-500 to-rose-500',
    cyan: 'from-cyan-500 to-blue-500'
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'En pause':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'Terminé':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'À risque':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute':
        return 'text-red-600 dark:text-red-400';
      case 'Moyenne':
        return 'text-amber-600 dark:text-amber-400';
      case 'Faible':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  // ── Appointment mock data ────────────────────────────────────────────────────
  const appointmentTypes = [
  'Évaluation',
  'Ajustement',
  'Contrôle',
  'Urgence',
  'Pose',
  'Dépose'];

  const appointmentStatuses = [
  'Confirmé',
  'En attente',
  'Annulé',
  'Terminé',
  'Manqué'];

  const timeSlots = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00'];

  const generateAppointments = () => {
    const today = new Date();
    return Array.from(
      {
        length: 120
      },
      (_, i) => {
        const daysOffset = Math.floor(Math.random() * 30) - 5;
        const apptDate = new Date(today);
        apptDate.setDate(today.getDate() + daysOffset);
        const patientId = Math.floor(Math.random() * 650) + 1;
        const statusWeights =
        daysOffset < 0 ?
        ['Terminé', 'Terminé', 'Terminé', 'Manqué', 'Annulé'] :
        daysOffset === 0 ?
        ['Confirmé', 'Confirmé', 'Confirmé', 'En attente', 'En attente'] :
        ['Confirmé', 'Confirmé', 'En attente', 'En attente', 'Annulé'];
        return {
          id: i + 1,
          patientId,
          patientName: `Patient ${patientId}`,
          patientAvatar: `P${patientId}`.slice(0, 2).toUpperCase(),
          patientColor: ['blue', 'purple', 'green', 'amber', 'pink', 'cyan'][
          Math.floor(Math.random() * 6)],

          date: apptDate,
          dateStr: apptDate.toLocaleDateString('fr-FR'),
          time: timeSlots[Math.floor(Math.random() * timeSlots.length)],
          type: appointmentTypes[
          Math.floor(Math.random() * appointmentTypes.length)],

          status:
          statusWeights[Math.floor(Math.random() * statusWeights.length)],
          duration: [30, 45, 60][Math.floor(Math.random() * 3)],
          treatment: [
          'Appareil fixe',
          'Aligneurs',
          'Appareil amovible',
          'Contention'][
          Math.floor(Math.random() * 4)],
          notes:
          Math.random() > 0.6 ? 'Vérifier la coopération du patient' : '',
          isUrgent: Math.random() > 0.9
        };
      }
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  const allAppointments = useMemo(() => generateAppointments(), []);
  // Filter and sort patients
  const filteredPatients = patients.
  filter((patient) => {
    const matchesSearch =
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    filterStatus === 'all' || patient.status === filterStatus;
    const matchesPriority =
    filterPriority === 'all' || patient.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  }).
  sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === 'progress') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const handleSelectAll = () => {
    if (selectedRows.length === currentPatients.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPatients.map((p) => p.id));
    }
  };
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const handleExport = () => {
    alert('Export des données...');
  };
  const tabs = [
  {
    id: 'evaluation',
    name: "Suivi d'évaluation",
    icon: ActivityIcon
  },
  {
    id: 'progress',
    name: 'Progression',
    icon: TrendingUpIcon
  },
  {
    id: 'appointments',
    name: 'Rendez-vous',
    icon: CalendarIcon
  }];

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
        className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-600 dark:to-pink-600 rounded-lg p-3 text-white shadow-sm">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <ActivityIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none">
                Suivi des traitements
              </h1>
              <p className="text-indigo-100 dark:text-purple-100 text-xs mt-0.5">
                Gérez et suivez l'évolution de vos {patients.length} patients
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <UserIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">{patients.length}</span>
                <span className="text-indigo-100 text-xs">patients</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <ActivityIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">
                  {patients.filter((p) => p.status === 'En cours').length}
                </span>
                <span className="text-indigo-100 text-xs">en cours</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-md px-2.5 py-1.5 text-sm">
                <AlertTriangleIcon className="h-3.5 w-3.5 opacity-75" />
                <span className="font-bold">
                  {patients.filter((p) => p.status === 'À risque').length}
                </span>
                <span className="text-indigo-100 text-xs">à risque</span>
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-3 py-1.5 bg-white text-indigo-600 dark:text-purple-600 rounded-md font-semibold shadow-sm hover:shadow-md transition-all text-sm">

              <PlusIcon className="h-4 w-4 mr-1.5" />
              Nouvelle évaluation
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>

                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )}
          </div>
        </div>

        {/* Evaluation Tab */}
        {activeTab === 'evaluation' &&
        <div className="p-6 space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 relative max-w-md">
                <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent sm:text-sm shadow-sm"
                placeholder="Rechercher un patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />

              </div>
              <div className="flex gap-3">
                <select
                className="px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}>

                  <option value="all">Tous les statuts</option>
                  <option value="En cours">En cours</option>
                  <option value="En pause">En pause</option>
                  <option value="Terminé">Terminé</option>
                  <option value="À risque">À risque</option>
                </select>
                <select
                className="px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}>

                  <option value="all">Toutes priorités</option>
                  <option value="Haute">Haute</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Faible">Faible</option>
                </select>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handleExport}
                className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all text-sm">

                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Exporter
                </motion.button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredPatients.length} patient
                {filteredPatients.length > 1 ? 's' : ''} trouvé
                {filteredPatients.length > 1 ? 's' : ''}
                {selectedRows.length > 0 &&
              ` • ${selectedRows.length} sélectionné${selectedRows.length > 1 ? 's' : ''}`}
              </p>
              {selectedRows.length > 0 &&
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                  Actions groupées
                </button>
            }
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left">
                      <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={
                      selectedRows.length === currentPatients.length &&
                      currentPatients.length > 0
                      }
                      onChange={handleSelectAll} />

                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort('name')}>

                      <div className="flex items-center">
                        Patient
                        {sortField === 'name' && (
                      sortDirection === 'asc' ?
                      <ArrowUpIcon className="h-4 w-4 ml-1" /> :

                      <ArrowDownIcon className="h-4 w-4 ml-1" />)
                      }
                      </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort('treatment')}>

                      <div className="flex items-center">
                        Traitement
                        {sortField === 'treatment' && (
                      sortDirection === 'asc' ?
                      <ArrowUpIcon className="h-4 w-4 ml-1" /> :

                      <ArrowDownIcon className="h-4 w-4 ml-1" />)
                      }
                      </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort('progress')}>

                      <div className="flex items-center">
                        Progression
                        {sortField === 'progress' && (
                      sortDirection === 'asc' ?
                      <ArrowUpIcon className="h-4 w-4 ml-1" /> :

                      <ArrowDownIcon className="h-4 w-4 ml-1" />)
                      }
                      </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort('status')}>

                      <div className="flex items-center">
                        Statut
                        {sortField === 'status' && (
                      sortDirection === 'asc' ?
                      <ArrowUpIcon className="h-4 w-4 ml-1" /> :

                      <ArrowDownIcon className="h-4 w-4 ml-1" />)
                      }
                      </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">

                      Priorité
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">

                      Dernière éval.
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">

                      Prochaine éval.
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">

                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {currentPatients.map((patient) =>
                <motion.tr
                  key={patient.id}
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">

                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={selectedRows.includes(patient.id)}
                      onChange={() => handleSelectRow(patient.id)} />

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colorGradients[patient.color]} flex items-center justify-center shadow-md flex-shrink-0`}>

                            <span className="text-sm font-bold text-white">
                              {patient.avatar}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {patient.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Né(e) le {patient.dateOfBirth}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {patient.treatment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 w-24">
                            <div
                          className={`bg-gradient-to-r ${colorGradients[patient.color]} h-2 rounded-full`}
                          style={{
                            width: `${patient.progress}%`
                          }} />

                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {patient.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>

                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                      className={`text-sm font-semibold ${getPriorityColor(patient.priority)}`}>

                          {patient.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                          {patient.lastEvaluation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                          {patient.nextEvaluation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        onClick={() =>
                        navigate(`/treatments/${patient.id}`)
                        }
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        title="Voir détails">

                            <EyeIcon className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        title="Modifier">

                            <EditIcon className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        title="Plus d'actions">

                            <MoreVerticalIcon className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Affichage de {startIndex + 1} à{' '}
                {Math.min(endIndex, filteredPatients.length)} sur{' '}
                {filteredPatients.length} résultats
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

                  <ChevronLeftIcon className="h-5 w-5" />
                </motion.button>
                <div className="flex items-center space-x-1">
                  {Array.from(
                  {
                    length: Math.min(5, totalPages)
                  },
                  (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;else
                    if (currentPage <= 3) pageNum = i + 1;else
                    if (currentPage >= totalPages - 2)
                    pageNum = totalPages - 4 + i;else
                    pageNum = currentPage - 2 + i;
                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{
                          scale: 1.1
                        }}
                        whileTap={{
                          scale: 0.9
                        }}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>

                          {pageNum}
                        </motion.button>);

                  }
                )}
                </div>
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

                  <ChevronRightIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        }

        {/* ── PROGRESSION TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'progress' &&
        (() => {
          const treatments = [
          'Appareil fixe',
          'Aligneurs',
          'Appareil amovible',
          'Contention'];

          const filtered =
          progressTreatmentFilter === 'all' ?
          patients :
          patients.filter(
            (p) => p.treatment === progressTreatmentFilter
          );
          // Distribution buckets 0-9%, 10-19%, ..., 90-100%
          const buckets = Array.from(
            {
              length: 10
            },
            (_, i) => ({
              label: `${i * 10}-${i * 10 + 9}%`,
              count: filtered.filter(
                (p) => p.progress >= i * 10 && p.progress < (i + 1) * 10
              ).length
            })
          );
          buckets[9].count += filtered.filter(
            (p) => p.progress === 100
          ).length;
          const maxBucket = Math.max(...buckets.map((b) => b.count));
          // By treatment type stats
          const byTreatment = treatments.map((t) => {
            const group = patients.filter((p) => p.treatment === t);
            return {
              name: t,
              count: group.length,
              avg: group.length ?
              Math.round(
                group.reduce((s, p) => s + p.progress, 0) / group.length
              ) :
              0,
              atRisk: group.filter((p) => p.status === 'À risque').length
            };
          });
          // Top performers (progress >= 80, status En cours)
          const topPerformers = patients.
          filter((p) => p.progress >= 80 && p.status === 'En cours').
          sort((a, b) => b.progress - a.progress).
          slice(0, 6);
          // At risk patients
          const atRiskPatients = patients.
          filter((p) => p.status === 'À risque').
          sort((a, b) => a.progress - b.progress).
          slice(0, 6);
          // Filtered patient cards
          const progressPatients = filtered.
          sort((a, b) => b.progress - a.progress).
          slice(0, progressView === 'grid' ? 24 : 15);
          return (
            <div className="p-6 space-y-6">
                {/* Filters + View Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <select
                    value={progressTreatmentFilter}
                    onChange={(e) =>
                    setProgressTreatmentFilter(e.target.value)
                    }
                    className="px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm">

                      <option value="all">Tous les traitements</option>
                      {treatments.map((t) =>
                    <option key={t} value={t}>
                          {t}
                        </option>
                    )}
                    </select>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {filtered.length} patients
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <button
                    onClick={() => setProgressView('grid')}
                    className={`p-2 rounded-lg transition-all ${progressView === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>

                      <GridIcon className="h-4 w-4" />
                    </button>
                    <button
                    onClick={() => setProgressView('list')}
                    className={`p-2 rounded-lg transition-all ${progressView === 'list' ? 'bg-white dark:bg-gray-600 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>

                      <ListIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                {
                  label: 'Progression moyenne',
                  value: `${Math.round(filtered.reduce((s, p) => s + p.progress, 0) / (filtered.length || 1))}%`,
                  icon: TrendingUpIcon,
                  color: 'from-indigo-500 to-purple-500',
                  bg: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
                  border: 'border-indigo-100 dark:border-indigo-800'
                },
                {
                  label: 'Avancés (>75%)',
                  value: filtered.filter((p) => p.progress > 75).length,
                  icon: AwardIcon,
                  color: 'from-green-500 to-emerald-500',
                  bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                  border: 'border-green-100 dark:border-green-800'
                },
                {
                  label: 'En retard (<25%)',
                  value: filtered.filter((p) => p.progress < 25).length,
                  icon: TrendingDownIcon,
                  color: 'from-amber-500 to-orange-500',
                  bg: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
                  border: 'border-amber-100 dark:border-amber-800'
                },
                {
                  label: 'À risque',
                  value: filtered.filter((p) => p.status === 'À risque').
                  length,
                  icon: AlertCircleIcon,
                  color: 'from-red-500 to-rose-500',
                  bg: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
                  border: 'border-red-100 dark:border-red-800'
                }].
                map((stat, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: i * 0.1
                  }}
                  className={`bg-gradient-to-br ${stat.bg} rounded-xl p-4 border ${stat.border}`}>

                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <div
                      className={`h-8 w-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>

                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </motion.div>
                )}
                </div>

                {/* Distribution Chart + By Treatment */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Distribution Bar Chart */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <BarChart2Icon className="h-4 w-4 text-indigo-500" />
                      Distribution de la progression
                    </h3>
                    <div className="flex items-end gap-2 h-36">
                      {buckets.map((bucket, i) => {
                      const heightPct =
                      maxBucket > 0 ? bucket.count / maxBucket * 100 : 0;
                      const hue = Math.round(i / 9 * 120); // red→green
                      return (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-1 group">

                            <div
                            className="relative w-full flex items-end justify-center"
                            style={{
                              height: '120px'
                            }}>

                              <motion.div
                              initial={{
                                height: 0
                              }}
                              animate={{
                                height: `${heightPct}%`
                              }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.05
                              }}
                              className="w-full rounded-t-lg cursor-pointer transition-opacity group-hover:opacity-80"
                              style={{
                                background: `hsl(${hue}, 70%, 55%)`,
                                minHeight: bucket.count > 0 ? '4px' : '0'
                              }} />

                              {/* Tooltip */}
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {bucket.count} patients
                              </div>
                            </div>
                            <span
                            className="text-xs text-gray-500 dark:text-gray-400 font-medium"
                            style={{
                              fontSize: '9px'
                            }}>

                              {bucket.label}
                            </span>
                          </div>);

                    })}
                    </div>
                  </div>

                  {/* By Treatment Type */}
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <ZapIcon className="h-4 w-4 text-purple-500" />
                      Par type de traitement
                    </h3>
                    <div className="space-y-3">
                      {byTreatment.map((t, i) =>
                    <div key={i}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                              {t.name}
                            </span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                              {t.avg}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div
                          initial={{
                            width: 0
                          }}
                          animate={{
                            width: `${t.avg}%`
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1
                          }}
                          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />

                          </div>
                          <div className="flex justify-between mt-0.5">
                            <span className="text-xs text-gray-400">
                              {t.count} patients
                            </span>
                            {t.atRisk > 0 &&
                        <span className="text-xs text-red-500">
                                {t.atRisk} à risque
                              </span>
                        }
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>

                {/* Top Performers & At Risk */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Performers */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 border border-green-100 dark:border-gray-600">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <AwardIcon className="h-4 w-4 text-green-500" />
                      Meilleurs progressions
                      <span className="ml-auto text-xs font-normal text-gray-500 dark:text-gray-400">
                        ≥ 80%
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {topPerformers.map((p, i) =>
                    <motion.div
                      key={p.id}
                      initial={{
                        opacity: 0,
                        x: -10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: i * 0.05
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => navigate(`/treatments/${p.id}`)}>

                          <span className="text-xs font-bold text-gray-400 w-4">
                            {i + 1}
                          </span>
                          <div
                        className={`h-8 w-8 rounded-lg bg-gradient-to-br ${colorGradients[p.color]} flex items-center justify-center flex-shrink-0`}>

                            <span className="text-xs font-bold text-white">
                              {p.avatar}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {p.treatment}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-500 rounded-full h-1.5">
                              <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                            style={{
                              width: `${p.progress}%`
                            }} />

                            </div>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400 w-8 text-right">
                              {p.progress}%
                            </span>
                          </div>
                        </motion.div>
                    )}
                    </div>
                  </div>

                  {/* At Risk */}
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 border border-red-100 dark:border-gray-600">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <AlertCircleIcon className="h-4 w-4 text-red-500" />
                      Patients à risque
                      <span className="ml-auto text-xs font-normal text-gray-500 dark:text-gray-400">
                        {patients.filter((p) => p.status === 'À risque').length}{' '}
                        total
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {atRiskPatients.map((p, i) =>
                    <motion.div
                      key={p.id}
                      initial={{
                        opacity: 0,
                        x: 10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: i * 0.05
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => navigate(`/treatments/${p.id}`)}>

                          <div
                        className={`h-8 w-8 rounded-lg bg-gradient-to-br ${colorGradients[p.color]} flex items-center justify-center flex-shrink-0`}>

                            <span className="text-xs font-bold text-white">
                              {p.avatar}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {p.treatment}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-500 rounded-full h-1.5">
                              <div
                            className="bg-gradient-to-r from-red-500 to-rose-500 h-1.5 rounded-full"
                            style={{
                              width: `${p.progress}%`
                            }} />

                            </div>
                            <span className="text-xs font-bold text-red-600 dark:text-red-400 w-8 text-right">
                              {p.progress}%
                            </span>
                          </div>
                          <span
                        className={`text-xs font-semibold ${getPriorityColor(p.priority)}`}>

                            {p.priority}
                          </span>
                        </motion.div>
                    )}
                    </div>
                  </div>
                </div>

                {/* Patient Progress Cards / List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Tous les patients — progression
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Triés par progression décroissante
                    </span>
                  </div>
                  {progressView === 'grid' ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {progressPatients.map((p, i) =>
                  <motion.div
                    key={p.id}
                    initial={{
                      opacity: 0,
                      scale: 0.95
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{
                      delay: i * 0.03
                    }}
                    onClick={() => navigate(`/treatments/${p.id}`)}
                    className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all cursor-pointer group">

                          <div className="flex items-center gap-3 mb-3">
                            <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colorGradients[p.color]} flex items-center justify-center flex-shrink-0`}>

                              <span className="text-sm font-bold text-white">
                                {p.avatar}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {p.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {p.treatment}
                              </p>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Progression
                              </span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {p.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <motion.div
                          initial={{
                            width: 0
                          }}
                          animate={{
                            width: `${p.progress}%`
                          }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.02
                          }}
                          className={`bg-gradient-to-r ${colorGradients[p.color]} h-2 rounded-full`} />

                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>

                              {p.status}
                            </span>
                            <span
                        className={`text-xs font-semibold ${getPriorityColor(p.priority)}`}>

                              {p.priority}
                            </span>
                          </div>
                        </motion.div>
                  )}
                    </div> :

                <div className="space-y-2">
                      {progressPatients.map((p, i) =>
                  <motion.div
                    key={p.id}
                    initial={{
                      opacity: 0,
                      x: -10
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: i * 0.02
                    }}
                    onClick={() => navigate(`/treatments/${p.id}`)}
                    className="flex items-center gap-4 p-3 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all cursor-pointer group">

                          <span className="text-xs text-gray-400 w-6 text-right">
                            {i + 1}
                          </span>
                          <div
                      className={`h-9 w-9 rounded-xl bg-gradient-to-br ${colorGradients[p.color]} flex items-center justify-center flex-shrink-0`}>

                            <span className="text-xs font-bold text-white">
                              {p.avatar}
                            </span>
                          </div>
                          <div className="w-32 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              {p.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {p.treatment}
                            </p>
                          </div>
                          <div className="flex-1 flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <motion.div
                          initial={{
                            width: 0
                          }}
                          animate={{
                            width: `${p.progress}%`
                          }}
                          transition={{
                            duration: 0.6
                          }}
                          className={`bg-gradient-to-r ${colorGradients[p.color]} h-2 rounded-full`} />

                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white w-10 text-right">
                              {p.progress}%
                            </span>
                          </div>
                          <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>

                            {p.status}
                          </span>
                          <span
                      className={`text-xs font-semibold w-14 text-right ${getPriorityColor(p.priority)}`}>

                            {p.priority}
                          </span>
                        </motion.div>
                  )}
                    </div>
                }
                </div>
              </div>);

        })()}

        {/* ── RENDEZ-VOUS TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'appointments' &&
        (() => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          const nextMonth = new Date(today);
          nextMonth.setDate(today.getDate() + 30);
          const filteredAppts = allAppointments.filter((a) => {
            const aDate = new Date(a.date);
            aDate.setHours(0, 0, 0, 0);
            const matchesDate =
            apptDateFilter === 'today' ?
            aDate.getTime() === today.getTime() :
            apptDateFilter === 'week' ?
            aDate >= today && aDate < nextWeek :
            apptDateFilter === 'month' ?
            aDate >= today && aDate < nextMonth :
            true;
            const matchesStatus =
            apptStatusFilter === 'all' || a.status === apptStatusFilter;
            const matchesSearch =
            !apptSearchTerm ||
            a.patientName.
            toLowerCase().
            includes(apptSearchTerm.toLowerCase()) ||
            a.type.toLowerCase().includes(apptSearchTerm.toLowerCase());
            return matchesDate && matchesStatus && matchesSearch;
          });
          const todayAppts = allAppointments.filter((a) => {
            const d = new Date(a.date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === today.getTime();
          });
          const weekAppts = allAppointments.filter((a) => {
            const d = new Date(a.date);
            d.setHours(0, 0, 0, 0);
            return d >= today && d < nextWeek;
          });
          const missedAppts = allAppointments.filter(
            (a) => a.status === 'Manqué'
          );
          const pendingAppts = allAppointments.filter(
            (a) => a.status === 'En attente'
          );
          // Group by date for display
          const grouped: Record<string, typeof allAppointments> = {};
          filteredAppts.forEach((a) => {
            const key = a.dateStr;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(a);
          });
          const groupedEntries = Object.entries(grouped).slice(0, 14);
          const isToday = (dateStr: string) => {
            const d = new Date(dateStr.split('/').reverse().join('-'));
            d.setHours(0, 0, 0, 0);
            return d.getTime() === today.getTime();
          };
          const isTomorrow = (dateStr: string) => {
            const d = new Date(dateStr.split('/').reverse().join('-'));
            d.setHours(0, 0, 0, 0);
            return d.getTime() === tomorrow.getTime();
          };
          return (
            <div className="p-6 space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                {
                  label: "Aujourd'hui",
                  value: todayAppts.length,
                  icon: CalendarIcon,
                  color: 'from-indigo-500 to-purple-500',
                  bg: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
                  border: 'border-indigo-100 dark:border-indigo-800',
                  sub: `${todayAppts.filter((a) => a.status === 'Confirmé').length} confirmés`
                },
                {
                  label: 'Cette semaine',
                  value: weekAppts.length,
                  icon: ClockIcon,
                  color: 'from-blue-500 to-cyan-500',
                  bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
                  border: 'border-blue-100 dark:border-blue-800',
                  sub: `${weekAppts.filter((a) => a.status === 'En attente').length} en attente`
                },
                {
                  label: 'En attente',
                  value: pendingAppts.length,
                  icon: BellIcon,
                  color: 'from-amber-500 to-orange-500',
                  bg: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
                  border: 'border-amber-100 dark:border-amber-800',
                  sub: 'À confirmer'
                },
                {
                  label: 'Manqués',
                  value: missedAppts.length,
                  icon: AlertTriangleIcon,
                  color: 'from-red-500 to-rose-500',
                  bg: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
                  border: 'border-red-100 dark:border-red-800',
                  sub: 'À replanifier'
                }].
                map((stat, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: i * 0.1
                  }}
                  className={`bg-gradient-to-br ${stat.bg} rounded-xl p-4 border ${stat.border}`}>

                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <div
                      className={`h-8 w-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>

                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {stat.sub}
                      </p>
                    </motion.div>
                )}
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Rechercher..."
                    value={apptSearchTerm}
                    onChange={(e) => setApptSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />

                  </div>
                  {/* Date filter pills */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    {[
                  {
                    id: 'today',
                    label: 'Auj.'
                  },
                  {
                    id: 'week',
                    label: 'Semaine'
                  },
                  {
                    id: 'month',
                    label: 'Mois'
                  },
                  {
                    id: 'all',
                    label: 'Tout'
                  }].
                  map((f) =>
                  <button
                    key={f.id}
                    onClick={() => setApptDateFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${apptDateFilter === f.id ? 'bg-white dark:bg-gray-600 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>

                        {f.label}
                      </button>
                  )}
                  </div>
                  <select
                  value={apptStatusFilter}
                  onChange={(e) => setApptStatusFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">

                    <option value="all">Tous les statuts</option>
                    <option value="Confirmé">Confirmé</option>
                    <option value="En attente">En attente</option>
                    <option value="Annulé">Annulé</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Manqué">Manqué</option>
                  </select>
                  <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-sm">

                    <PlusIcon className="h-4 w-4 mr-1.5" />
                    Nouveau RDV
                  </motion.button>
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredAppts.length} rendez-vous trouvés
                </p>

                {/* Appointments grouped by date */}
                {groupedEntries.length === 0 ?
              <div className="text-center py-16">
                    <CalendarIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      Aucun rendez-vous trouvé
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Modifiez les filtres pour voir plus de résultats
                    </p>
                  </div> :

              <div className="space-y-6">
                    {groupedEntries.map(([dateStr, appts]) =>
                <div key={dateStr}>
                        {/* Date header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${isToday(dateStr) ? 'bg-indigo-600 text-white' : isTomorrow(dateStr) ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>

                            {isToday(dateStr) ?
                      "Aujourd'hui" :
                      isTomorrow(dateStr) ?
                      'Demain' :
                      dateStr}
                          </div>
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {appts.length} RDV
                          </span>
                        </div>

                        {/* Appointment cards */}
                        <div className="space-y-2">
                          {appts.
                    sort((a, b) => a.time.localeCompare(b.time)).
                    map((appt, i) =>
                    <motion.div
                      key={appt.id}
                      initial={{
                        opacity: 0,
                        y: 8
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        delay: i * 0.04
                      }}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${appt.isUrgent ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'}`}>

                                {/* Time */}
                                <div className="text-center flex-shrink-0 w-14">
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                                    {appt.time}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {appt.duration}min
                                  </p>
                                </div>

                                {/* Divider */}
                                <div
                        className={`w-0.5 h-10 rounded-full flex-shrink-0 ${appt.status === 'Confirmé' ? 'bg-green-400' : appt.status === 'En attente' ? 'bg-amber-400' : appt.status === 'Annulé' ? 'bg-red-400' : appt.status === 'Manqué' ? 'bg-gray-400' : 'bg-blue-400'}`} />


                                {/* Patient */}
                                <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colorGradients[appt.patientColor]} flex items-center justify-center flex-shrink-0`}>

                                  <span className="text-xs font-bold text-white">
                                    {appt.patientAvatar}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {appt.patientName}
                                    </p>
                                    {appt.isUrgent &&
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                        <AlertTriangleIcon className="h-3 w-3" />
                                        Urgent
                                      </span>
                          }
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getApptTypeColor(appt.type)}`}>

                                      {appt.type}
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                      {appt.treatment}
                                    </span>
                                    {appt.notes &&
                          <span className="text-xs text-gray-400 dark:text-gray-500 italic truncate max-w-xs">
                                        • {appt.notes}
                                      </span>
                          }
                                  </div>
                                </div>

                                {/* Status */}
                                <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getApptStatusColor(appt.status)}`}>

                                  {appt.status === 'Confirmé' &&
                        <CheckIcon className="h-3 w-3 mr-1" />
                        }
                                  {appt.status === 'Annulé' &&
                        <XCircleIcon className="h-3 w-3 mr-1" />
                        }
                                  {appt.status === 'Manqué' &&
                        <AlertTriangleIcon className="h-3 w-3 mr-1" />
                        }
                                  {appt.status}
                                </span>

                                {/* Actions */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          onClick={() =>
                          navigate(`/treatments/${appt.patientId}`)
                          }
                          className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          title="Voir patient">

                                    <EyeIcon className="h-4 w-4" />
                                  </motion.button>
                                  {appt.status === 'En attente' &&
                        <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          className="p-1.5 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                          title="Confirmer">

                                      <CheckCircleIcon className="h-4 w-4" />
                                    </motion.button>
                        }
                                  {appt.status === 'Manqué' &&
                        <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          className="p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                          title="Replanifier">

                                      <RefreshCwIcon className="h-4 w-4" />
                                    </motion.button>
                        }
                                  <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          title="Plus d'actions">

                                    <MoreVerticalIcon className="h-4 w-4" />
                                  </motion.button>
                                </div>
                              </motion.div>
                    )}
                        </div>
                      </div>
                )}
                  </div>
              }
              </div>);

        })()}
      </motion.div>
    </div>);

};
export default TreatmentTracking;