import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SearchIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  LockIcon,
  UnlockIcon,
  UserIcon,
  UserCogIcon,
  UserCheckIcon,
  ShieldIcon,
  CheckIcon,
  XIcon,
  SparklesIcon,
  InfoIcon,
  MailIcon,
  KeyIcon,
  AlertCircleIcon,
  SaveIcon,
  ClockIcon,
  ZapIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  AlertTriangleIcon,
  Trash2Icon } from
'lucide-react';
const users = [
{
  id: 1,
  name: 'Dr. Sophie Dupont',
  email: 'sophie.dupont@smartortho.fr',
  role: 'orthodontist',
  status: 'active',
  lastActive: 'Il y a 5 minutes',
  avatar: 'SD',
  color: 'from-purple-400 to-indigo-500'
},
{
  id: 2,
  name: 'Marie Laurent',
  email: 'marie.laurent@smartortho.fr',
  role: 'assistant',
  status: 'active',
  lastActive: 'Il y a 1 heure',
  avatar: 'ML',
  color: 'from-blue-400 to-cyan-500'
},
{
  id: 3,
  name: 'Thomas Petit',
  email: 'thomas.petit@smartortho.fr',
  role: 'receptionist',
  status: 'active',
  lastActive: "Aujourd'hui à 10:45",
  avatar: 'TP',
  color: 'from-green-400 to-emerald-500'
},
{
  id: 4,
  name: 'Dr. Jean Martin',
  email: 'jean.martin@smartortho.fr',
  role: 'orthodontist',
  status: 'inactive',
  lastActive: 'Il y a 2 jours',
  avatar: 'JM',
  color: 'from-gray-400 to-slate-500'
},
{
  id: 5,
  name: 'Amélie Rousseau',
  email: 'amelie.rousseau@smartortho.fr',
  role: 'assistant',
  status: 'active',
  lastActive: 'Hier à 16:30',
  avatar: 'AR',
  color: 'from-pink-400 to-rose-500'
},
{
  id: 6,
  name: 'Lucas Bernard',
  email: 'lucas.bernard@smartortho.fr',
  role: 'custom',
  customRole: 'Stagiaire',
  status: 'active',
  lastActive: 'Il y a 3 heures',
  avatar: 'LB',
  color: 'from-amber-400 to-orange-500'
}];

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserRole, setEditUserRole] = useState('');
  const [editUserStatus, setEditUserStatus] = useState('');
  const [completedFields, setCompletedFields] = useState<
    Record<string, boolean>>(
    {});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [showActivationSuccess, setShowActivationSuccess] = useState(false);
  const [showDeactivationSuccess, setShowDeactivationSuccess] = useState(false);
  const [actionUser, setActionUser] = useState<any>(null);
  const [countdown, setCountdown] = useState(3);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteUser, setDeleteUser] = useState<any>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteStep, setDeleteStep] = useState(1);
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.role === filter;
    return matchesSearch && matchesFilter;
  });
  const getRoleBadge = (role: string, customRole?: string) => {
    const map: Record<string, string> = {
      orthodontist: 'bg-purple-100 text-purple-700',
      assistant: 'bg-blue-100 text-blue-700',
      receptionist: 'bg-green-100 text-green-700',
      admin: 'bg-red-100 text-red-700',
      custom: 'bg-gray-100 text-gray-700'
    };
    const labels: Record<string, string> = {
      orthodontist: 'Orthodontiste',
      assistant: 'Assistant(e)',
      receptionist: 'Réceptionniste',
      admin: 'Administrateur',
      custom: customRole || role
    };
    return (
      <span
        className={`px-1.5 py-0.5 rounded text-xs font-medium ${map[role] || 'bg-gray-100 text-gray-700'}`}>

        {labels[role] || role}
      </span>);

  };
  const getStatusBadge = (status: string) => {
    if (status === 'active')
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-700">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Actif
        </span>);

    if (status === 'inactive')
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          Inactif
        </span>);

    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        Suspendu
      </span>);

  };
  const calculateEditProgress = () => {
    const filled = [
    editUserName.trim(),
    editUserEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUserEmail),
    editUserRole,
    editUserStatus].
    filter(Boolean).length;
    return Math.round(filled / 4 * 100);
  };
  const handleEditUserChange = (field: string, value: string) => {
    if (field === 'name') setEditUserName(value);
    if (field === 'email') setEditUserEmail(value);
    if (field === 'role') setEditUserRole(value);
    if (field === 'status') setEditUserStatus(value);
    setCompletedFields((prev) => ({
      ...prev,
      [field]:
      field === 'email' ?
      !!(value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) :
      !!value.trim()
    }));
    if (errors[field])
    setErrors((prev) => ({
      ...prev,
      [field]: null
    }));
  };
  const validateEditUser = () => {
    const newErrors: Record<string, string> = {};
    if (!editUserName.trim()) newErrors.name = 'Le nom complet est requis';else
    if (editUserName.trim().length < 3)
    newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    if (!editUserEmail.trim()) newErrors.email = "L'email est requis";else
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUserEmail))
    newErrors.email = "L'email n'est pas valide";
    if (!editUserRole) newErrors.role = 'Le rôle est requis';
    if (!editUserStatus) newErrors.status = 'Le statut est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserName(user.name);
    setEditUserEmail(user.email);
    setEditUserRole(user.role);
    setEditUserStatus(user.status);
    setCompletedFields({
      name: true,
      email: true,
      role: true,
      status: true
    });
    setErrors({});
    setShowUserModal(true);
  };
  const handleSaveUser = () => {
    if (validateEditUser()) {
      alert(`Utilisateur "${editUserName}" modifié avec succès`);
      handleCloseUserModal();
    }
  };
  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    setEditUserName('');
    setEditUserEmail('');
    setEditUserRole('');
    setEditUserStatus('');
    setCompletedFields({});
    setErrors({});
  };
  useEffect(() => {
    if (showActivationSuccess || showDeactivationSuccess) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowActivationSuccess(false);
            setShowDeactivationSuccess(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showActivationSuccess, showDeactivationSuccess]);
  const handleToggleUserStatus = (user: any) => {
    setActionUser(user);
    user.status === 'active' ?
    setShowDeactivationSuccess(true) :
    setShowActivationSuccess(true);
  };
  const handleCloseSuccessModal = () => {
    setShowActivationSuccess(false);
    setShowDeactivationSuccess(false);
    setActionUser(null);
  };
  const handleDeleteUser = (user: any) => {
    setDeleteUser(user);
    setDeleteStep(1);
    setDeleteConfirmText('');
    setShowDeleteConfirm(true);
  };
  const handleConfirmDelete = () => {
    if (deleteStep === 1) setDeleteStep(2);else
    if (deleteStep === 2 && deleteConfirmText === 'SUPPRIMER') {
      alert(`Utilisateur "${deleteUser.name}" supprimé avec succès`);
      handleCloseDeleteModal();
    }
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setDeleteUser(null);
    setDeleteConfirmText('');
    setDeleteStep(1);
  };
  const editProgress = calculateEditProgress();
  const filterButtons = [
  {
    id: 'all',
    label: `Tous (${users.length})`,
    icon: ZapIcon
  },
  {
    id: 'orthodontist',
    label: 'Orthodontistes',
    icon: UserCogIcon
  },
  {
    id: 'assistant',
    label: 'Assistant(e)s',
    icon: UserCheckIcon
  },
  {
    id: 'receptionist',
    label: 'Réceptionnistes',
    icon: UserIcon
  }];

  return (
    <div className="space-y-3">
      {/* Search + Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <SearchIcon
            size={12}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white w-48 focus:outline-none focus:ring-1 focus:ring-blue-500" />

        </div>
        <div className="flex gap-1">
          {filterButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition-all ${filter === btn.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>

                <Icon size={11} />
                {btn.label}
              </button>);

          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Total</span>
            <UserIcon size={14} className="text-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-600">{users.length}</div>
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
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700">
            Utilisateurs ({filteredUsers.length})
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Utilisateur
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Rôle
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Statut
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Dernière activité
              </th>
              <th className="text-right px-3 py-1.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) =>
            <tr
              key={user.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>

                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-0.5">
                        <MailIcon size={10} />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  {getRoleBadge(user.role, (user as any).customRole)}
                </td>
                <td className="px-3 py-1.5">{getStatusBadge(user.status)}</td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ClockIcon size={11} />
                    {user.lastActive}
                  </div>
                </td>
                <td className="px-3 py-1.5 text-right">
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                    onClick={() => handleEditUser(user)}
                    className="p-1 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600 transition-colors"
                    title="Modifier">

                      <EditIcon size={11} />
                    </button>
                    <button
                    onClick={() => handleToggleUserStatus(user)}
                    className={`p-1 rounded transition-colors ${user.status === 'active' ? 'hover:bg-amber-50 text-gray-400 hover:text-amber-600' : 'hover:bg-green-50 text-gray-400 hover:text-green-600'}`}
                    title={
                    user.status === 'active' ?
                    'Verrouiller' :
                    'Déverrouiller'
                    }>

                      {user.status === 'active' ?
                    <LockIcon size={11} /> :

                    <UnlockIcon size={11} />
                    }
                    </button>
                    <button
                    onClick={() => handleDeleteUser(user)}
                    className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
                    title="Supprimer">

                      <TrashIcon size={11} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {filteredUsers.length === 0 &&
            <tr>
                <td
                colSpan={5}
                className="px-3 py-8 text-center text-xs text-gray-400">

                  Aucun utilisateur ne correspond à votre recherche
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      {/* All modals kept as-is */}
      <AnimatePresence>
        {showUserModal &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">

              <div className="border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-red-800">Modifier l'utilisateur</h3>
                    <p className="text-xs text-red-600 mt-0.5">Mettez à jour les informations de l'utilisateur</p>
                  </div>
                  <button
                  onClick={handleCloseUserModal}
                  className="rounded-md p-1 text-red-600 hover:bg-red-100"
                  aria-label="Fermer">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-red-700">Progression</span>
                    <span className="font-bold text-red-700">{editProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-red-100 rounded-full overflow-hidden">
                    <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${editProgress}%`
                    }}
                    transition={{
                      duration: 0.5
                    }}
                    className="h-full bg-red-500 rounded-full" />

                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                  type="text"
                  className={`block w-full px-3 py-2 rounded-lg border-2 transition-all ${errors.name ? 'border-red-300' : completedFields.name ? 'border-green-300' : 'border-gray-200'} focus:outline-none bg-white text-gray-900`}
                  value={editUserName}
                  onChange={(e) =>
                  handleEditUserChange('name', e.target.value)
                  }
                  placeholder="Ex: Dr. Marie Dupont" />

                  {errors.name &&
                <p className="mt-1 text-xs text-red-600 flex items-center">
                      <InfoIcon className="h-3 w-3 mr-1" />
                      {errors.name}
                    </p>
                }
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email *
                  </label>
                  <input
                  type="email"
                  className={`block w-full px-3 py-2 rounded-lg border-2 transition-all ${errors.email ? 'border-red-300' : completedFields.email ? 'border-green-300' : 'border-gray-200'} focus:outline-none bg-white text-gray-900`}
                  value={editUserEmail}
                  onChange={(e) =>
                  handleEditUserChange('email', e.target.value)
                  }
                  placeholder="marie.dupont@smartortho.fr" />

                  {errors.email &&
                <p className="mt-1 text-xs text-red-600 flex items-center">
                      <InfoIcon className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                }
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle *
                  </label>
                  <select
                  className={`block w-full px-3 py-2 rounded-lg border-2 transition-all ${errors.role ? 'border-red-300' : completedFields.role ? 'border-green-300' : 'border-gray-200'} focus:outline-none bg-white text-gray-900`}
                  value={editUserRole}
                  onChange={(e) =>
                  handleEditUserChange('role', e.target.value)
                  }>

                    <option value="">Sélectionner un rôle</option>
                    <option value="orthodontist">Orthodontiste</option>
                    <option value="assistant">Assistant(e)</option>
                    <option value="receptionist">Réceptionniste</option>
                    <option value="admin">Administrateur</option>
                    <option value="custom">Personnalisé</option>
                  </select>
                  {errors.role &&
                <p className="mt-1 text-xs text-red-600 flex items-center">
                      <InfoIcon className="h-3 w-3 mr-1" />
                      {errors.role}
                    </p>
                }
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut *
                  </label>
                  <select
                  className={`block w-full px-3 py-2 rounded-lg border-2 transition-all ${errors.status ? 'border-red-300' : completedFields.status ? 'border-green-300' : 'border-gray-200'} focus:outline-none bg-white text-gray-900`}
                  value={editUserStatus}
                  onChange={(e) =>
                  handleEditUserChange('status', e.target.value)
                  }>

                    <option value="">Sélectionner un statut</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="suspended">Suspendu</option>
                  </select>
                  {errors.status &&
                <p className="mt-1 text-xs text-red-600 flex items-center">
                      <InfoIcon className="h-3 w-3 mr-1" />
                      {errors.status}
                    </p>
                }
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                type="button"
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
                onClick={handleCloseUserModal}>

                  <XIcon className="h-4 w-4 inline mr-2" />
                  Annuler
                </button>
                <button
                type="button"
                className="px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all disabled:opacity-50"
                onClick={handleSaveUser}
                disabled={
                !editUserName.trim() ||
                !editUserEmail.trim() ||
                !editUserRole ||
                !editUserStatus
                }>

                  <SaveIcon className="h-4 w-4 inline mr-2" />
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {showActivationSuccess && actionUser &&
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.5
            }}
            transition={{
              type: 'spring',
              duration: 0.6
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

              <div className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8 overflow-hidden">
                <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
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
                    <UnlockIcon className="h-10 w-10 text-green-500" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  Compte Activé !
                </h3>
                <p className="text-green-50 text-center text-sm">
                  L'utilisateur peut maintenant accéder au système
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Fermeture automatique</span>
                    <span className="font-bold">{countdown}s</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                    initial={{
                      width: '100%'
                    }}
                    animate={{
                      width: '0%'
                    }}
                    transition={{
                      duration: 3,
                      ease: 'linear'
                    }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500" />

                  </div>
                </div>
                <button
                onClick={handleCloseSuccessModal}
                className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center">

                  <CheckIcon className="h-4 w-4 mr-2" />
                  Parfait !
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {showDeactivationSuccess && actionUser &&
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.5
            }}
            transition={{
              type: 'spring',
              duration: 0.6
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

              <div className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-8 overflow-hidden">
                <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
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
                    <LockIcon className="h-10 w-10 text-amber-500" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  Compte Désactivé
                </h3>
                <p className="text-amber-50 text-center text-sm">
                  L'accès au système a été révoqué
                </p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Fermeture automatique</span>
                    <span className="font-bold">{countdown}s</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                    initial={{
                      width: '100%'
                    }}
                    animate={{
                      width: '0%'
                    }}
                    transition={{
                      duration: 3,
                      ease: 'linear'
                    }}
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500" />

                  </div>
                </div>
                <button
                onClick={handleCloseSuccessModal}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl flex items-center justify-center">

                  <CheckIcon className="h-4 w-4 mr-2" />
                  Compris
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && deleteUser &&
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[80] p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 50
            }}
            transition={{
              type: 'spring',
              duration: 0.5
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">

              <div className="relative bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 p-8 overflow-hidden">
                <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />

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
                    <AlertTriangleIcon className="h-10 w-10 text-red-500" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  {deleteStep === 1 ? 'Attention !' : 'Confirmation finale'}
                </h3>
                <p className="text-red-50 text-center text-sm">
                  {deleteStep === 1 ?
                'Cette action est irréversible' :
                'Dernière étape avant suppression'}
                </p>
              </div>
              <div className="p-6">
                {deleteStep === 1 ?
              <>
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4">
                      <div className="flex">
                        <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="ml-3">
                          <h5 className="text-sm font-bold text-red-900 mb-1">
                            Suppression définitive
                          </h5>
                          <p className="text-xs text-red-800">
                            Toutes les données de cet utilisateur seront
                            définitivement supprimées.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                    onClick={handleCloseDeleteModal}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl border-2 border-gray-300 flex items-center justify-center">

                        <XIcon className="h-4 w-4 mr-2" />
                        Annuler
                      </button>
                      <button
                    onClick={handleConfirmDelete}
                    className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl flex items-center justify-center">

                        <ArrowRightIcon className="h-4 w-4 mr-2" />
                        Continuer
                      </button>
                    </div>
                  </> :

              <>
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
                      <p className="text-xs text-red-800 mb-3">
                        Tapez{' '}
                        <span className="font-bold bg-red-100 px-2 py-1 rounded">
                          SUPPRIMER
                        </span>{' '}
                        pour confirmer :
                      </p>
                      <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) =>
                    setDeleteConfirmText(e.target.value.toUpperCase())
                    }
                    placeholder="Tapez SUPPRIMER"
                    className={`w-full px-4 py-3 rounded-lg border-2 text-center font-bold ${deleteConfirmText === 'SUPPRIMER' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-300 bg-white text-gray-700'} focus:outline-none`} />

                    </div>
                    <div className="flex space-x-3">
                      <button
                    onClick={() => setDeleteStep(1)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl border-2 border-gray-300 flex items-center justify-center">

                        Retour
                      </button>
                      <button
                    onClick={handleConfirmDelete}
                    disabled={deleteConfirmText !== 'SUPPRIMER'}
                    className={`flex-1 py-2.5 font-bold rounded-xl flex items-center justify-center ${deleteConfirmText === 'SUPPRIMER' ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>

                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Supprimer définitivement
                      </button>
                    </div>
                  </>
              }
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

};
export default UsersList;