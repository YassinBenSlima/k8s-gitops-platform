import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  EditIcon,
  PlusIcon,
  TrashIcon,
  AlertCircleIcon,
  LogInIcon,
  LogOutIcon,
  CheckCircleIcon,
  ActivityIcon,
  CheckIcon,
  UserCogIcon } from
'lucide-react';
const users = [
{
  id: 1,
  name: 'Dr. Sophie Dupont',
  role: 'orthodontist',
  status: 'active',
  lastActive: '5 minutes ago'
},
{
  id: 2,
  name: 'Marie Laurent',
  role: 'assistant',
  status: 'active',
  lastActive: '2 hours ago'
},
{
  id: 3,
  name: 'Thomas Petit',
  role: 'receptionist',
  status: 'active',
  lastActive: '10 minutes ago'
},
{
  id: 4,
  name: 'Dr. Jean Martin',
  role: 'orthodontist',
  status: 'active',
  lastActive: '1 hour ago'
}];

const activityLogs = [
{
  id: 1,
  userId: 1,
  userName: 'Dr. Sophie Dupont',
  userRole: 'orthodontist',
  action: 'view',
  target: 'patient',
  targetId: 12,
  targetName: 'Emma Petit',
  date: '2023-06-15T10:23:15',
  ipAddress: '192.168.1.45'
},
{
  id: 2,
  userId: 2,
  userName: 'Marie Laurent',
  userRole: 'assistant',
  action: 'update',
  target: 'appointment',
  targetId: 56,
  targetName: 'RDV Thomas Bernard',
  date: '2023-06-15T09:47:22',
  ipAddress: '192.168.1.32'
},
{
  id: 3,
  userId: 1,
  userName: 'Dr. Sophie Dupont',
  userRole: 'orthodontist',
  action: 'create',
  target: 'treatment',
  targetId: 34,
  targetName: 'Plan de traitement Lucas Dubois',
  date: '2023-06-15T09:15:03',
  ipAddress: '192.168.1.45'
},
{
  id: 4,
  userId: 3,
  userName: 'Thomas Petit',
  userRole: 'receptionist',
  action: 'create',
  target: 'appointment',
  targetId: 57,
  targetName: 'Nouveau RDV Sophie Martin',
  date: '2023-06-14T16:42:18',
  ipAddress: '192.168.1.50'
},
{
  id: 5,
  userId: 2,
  userName: 'Marie Laurent',
  userRole: 'assistant',
  action: 'upload',
  target: 'document',
  targetId: 89,
  targetName: 'Radiographie Nathan Robert',
  date: '2023-06-14T15:37:42',
  ipAddress: '192.168.1.32'
},
{
  id: 6,
  userId: 1,
  userName: 'Dr. Sophie Dupont',
  userRole: 'orthodontist',
  action: 'login',
  target: 'system',
  targetId: null,
  targetName: 'Connexion au système',
  date: '2023-06-14T08:30:15',
  ipAddress: '192.168.1.45'
},
{
  id: 7,
  userId: 4,
  userName: 'Dr. Jean Martin',
  userRole: 'orthodontist',
  action: 'delete',
  target: 'document',
  targetId: 87,
  targetName: 'Ancien scan 3D Léa Richard',
  date: '2023-06-13T14:22:36',
  ipAddress: '192.168.1.60'
},
{
  id: 8,
  userId: 3,
  userName: 'Thomas Petit',
  userRole: 'receptionist',
  action: 'payment',
  target: 'invoice',
  targetId: 123,
  targetName: 'Paiement facture Emma Petit',
  date: '2023-06-13T11:15:29',
  ipAddress: '192.168.1.50'
},
{
  id: 9,
  userId: 2,
  userName: 'Marie Laurent',
  userRole: 'assistant',
  action: 'logout',
  target: 'system',
  targetId: null,
  targetName: 'Déconnexion du système',
  date: '2023-06-13T17:30:42',
  ipAddress: '192.168.1.32'
},
{
  id: 10,
  userId: 1,
  userName: 'Dr. Sophie Dupont',
  userRole: 'orthodontist',
  action: 'export',
  target: 'report',
  targetId: 45,
  targetName: 'Export rapport mensuel',
  date: '2023-06-12T16:45:11',
  ipAddress: '192.168.1.45'
}];

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedTarget, setSelectedTarget] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser =
    selectedUser === 'all' || log.userId.toString() === selectedUser;
    const matchesAction =
    selectedAction === 'all' || log.action === selectedAction;
    const matchesTarget =
    selectedTarget === 'all' || log.target === selectedTarget;
    const logDate = new Date(log.date);
    const matchesStartDate = !startDate || new Date(startDate) <= logDate;
    const matchesEndDate = !endDate || new Date(endDate) >= logDate;
    return (
      matchesSearch &&
      matchesUser &&
      matchesAction &&
      matchesTarget &&
      matchesStartDate &&
      matchesEndDate);

  });
  const uniqueUsers = [
  ...new Set(
    activityLogs.map((log) => ({
      id: log.userId,
      name: log.userName
    }))
  )].
  filter((v, i, self) => self.findIndex((x) => x.id === v.id) === i);
  const uniqueActions = [...new Set(activityLogs.map((log) => log.action))];
  const uniqueTargets = [...new Set(activityLogs.map((log) => log.target))];
  const formatDate = (d: string) => new Date(d).toLocaleString('fr-FR');
  const getActionIcon = (action: string) => {
    const map: Record<string, React.ReactNode> = {
      view: <EyeIcon size={11} className="text-blue-500" />,
      create: <PlusIcon size={11} className="text-green-500" />,
      update: <EditIcon size={11} className="text-amber-500" />,
      delete: <TrashIcon size={11} className="text-red-500" />,
      login: <LogInIcon size={11} className="text-indigo-500" />,
      logout: <LogOutIcon size={11} className="text-gray-500" />,
      upload: <DownloadIcon size={11} className="text-blue-500" />,
      export: <DownloadIcon size={11} className="text-blue-500" />,
      payment: <CheckCircleIcon size={11} className="text-green-500" />
    };
    return (
      map[action] || <AlertCircleIcon size={11} className="text-gray-500" />);

  };
  const getUserBadge = (role: string) => {
    const map: Record<string, string> = {
      orthodontist: 'bg-purple-100 text-purple-700',
      assistant: 'bg-blue-100 text-blue-700',
      receptionist: 'bg-green-100 text-green-700',
      admin: 'bg-red-100 text-red-700'
    };
    const labels: Record<string, string> = {
      orthodontist: 'Orthodontiste',
      assistant: 'Assistant(e)',
      receptionist: 'Réceptionniste',
      admin: 'Admin'
    };
    return (
      <span
        className={`px-1.5 py-0.5 rounded text-xs ${map[role] || 'bg-gray-100 text-gray-600'}`}>

        {labels[role] || role}
      </span>);

  };
  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Total Logs</span>
            <FileTextIcon size={14} className="text-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-600">
            {activityLogs.length}
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Actifs</span>
            <CheckIcon size={14} className="text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">
            {users.filter((u) => u.status === 'active').length}
          </div>
        </div>
        <div className="bg-white border border-purple-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Orthodontistes</span>
            <UserCogIcon size={14} className="text-purple-500" />
          </div>
          <div className="text-xl font-bold text-purple-600">
            {users.filter((u) => u.role === 'orthodontist').length}
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">En ligne</span>
            <ClockIcon size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600">
            {users.filter((u) => u.lastActive.includes('minutes')).length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <ActivityIcon size={12} className="text-blue-500" />
            Journal d'activité
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon
                size={11}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-6 pr-3 py-1 text-xs border border-gray-200 rounded-lg w-36 focus:outline-none focus:ring-1 focus:ring-blue-500" />

            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg border transition-all ${showFilters ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>

              <FilterIcon size={11} />
              {showFilters ? 'Masquer' : 'Filtres'}
            </button>
            <button
              onClick={() => alert('Export des logs en cours...')}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">

              <DownloadIcon size={11} />
              Exporter
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters &&
          <motion.div
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: 'auto',
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="overflow-hidden">

              <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 grid grid-cols-5 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Utilisateur
                  </label>
                  <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">

                    <option value="all">Tous</option>
                    {uniqueUsers.map((u) =>
                  <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                  )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Action
                  </label>
                  <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">

                    <option value="all">Toutes</option>
                    {uniqueActions.map((a) =>
                  <option key={a} value={a}>
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </option>
                  )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Cible
                  </label>
                  <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">

                    <option value="all">Toutes</option>
                    {uniqueTargets.map((t) =>
                  <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                  )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Date début
                  </label>
                  <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />

                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Date fin
                  </label>
                  <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />

                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Date & Heure
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Utilisateur
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Action
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Détails
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                IP
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) =>
            <tr
              key={log.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <ClockIcon size={11} className="text-gray-400" />
                    {formatDate(log.date)}
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="text-xs font-medium text-gray-800">
                    {log.userName}
                  </div>
                  <div className="mt-0.5">{getUserBadge(log.userRole)}</div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    {getActionIcon(log.action)}
                    <span className="text-xs text-gray-700">
                      {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <FileTextIcon
                    size={11}
                    className="text-gray-400 flex-shrink-0" />

                    <span className="text-xs text-gray-700">
                      {log.targetName}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-mono">
                    {log.ipAddress}
                  </span>
                </td>
              </tr>
            )}
            {filteredLogs.length === 0 &&
            <tr>
                <td
                colSpan={5}
                className="px-3 py-8 text-center text-xs text-gray-400">

                  Aucune activité ne correspond à vos critères
                </td>
              </tr>
            }
          </tbody>
        </table>

        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50">
          <span className="text-xs text-gray-500">
            {filteredLogs.length} activité{filteredLogs.length > 1 ? 's' : ''}
          </span>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-100 text-gray-600">
              Précédent
            </button>
            <button className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-100 text-gray-600">
              Suivant
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        <strong className="text-blue-900">Conservation des logs:</strong>{' '}
        Conformément aux réglementations, les journaux d'activité sont conservés
        pendant 3 ans. Exportez-les à tout moment pour vos archives.
      </div>
    </div>);

};
export default ActivityLogs;