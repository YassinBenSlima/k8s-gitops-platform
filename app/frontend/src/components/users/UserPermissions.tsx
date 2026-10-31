import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShieldIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  SaveIcon,
  LockIcon,
  UnlockIcon,
  UserIcon,
  SettingsIcon,
  FileTextIcon,
  CalendarIcon,
  UsersIcon,
  ClipboardIcon } from
'lucide-react';
const defaultRoles = [
{
  id: 'orthodontist',
  name: 'Orthodontiste',
  description: 'Accès complet aux dossiers patients et traitements',
  color: 'from-purple-400 to-indigo-500',
  icon: UserIcon,
  userCount: 2
},
{
  id: 'assistant',
  name: 'Assistant(e)',
  description: 'Accès aux rendez-vous et dossiers patients',
  color: 'from-blue-400 to-cyan-500',
  icon: UsersIcon,
  userCount: 2
},
{
  id: 'receptionist',
  name: 'Réceptionniste',
  description: 'Gestion des rendez-vous et accueil',
  color: 'from-green-400 to-emerald-500',
  icon: CalendarIcon,
  userCount: 1
},
{
  id: 'admin',
  name: 'Administrateur',
  description: 'Accès complet à toutes les fonctionnalités',
  color: 'from-red-400 to-pink-500',
  icon: ShieldIcon,
  userCount: 1
}];

const permissionCategories = [
{
  id: 'patients',
  name: 'Patients',
  icon: UserIcon,
  color: 'blue',
  permissions: [
  {
    id: 'patients.view',
    name: 'Voir les patients',
    description: 'Consulter la liste et les détails des patients'
  },
  {
    id: 'patients.create',
    name: 'Créer des patients',
    description: 'Ajouter de nouveaux patients au système'
  },
  {
    id: 'patients.edit',
    name: 'Modifier les patients',
    description: 'Mettre à jour les informations des patients'
  },
  {
    id: 'patients.delete',
    name: 'Supprimer des patients',
    description: 'Supprimer des patients du système'
  }]

},
{
  id: 'appointments',
  name: 'Rendez-vous',
  icon: CalendarIcon,
  color: 'green',
  permissions: [
  {
    id: 'appointments.view',
    name: 'Voir les rendez-vous',
    description: 'Consulter le calendrier des rendez-vous'
  },
  {
    id: 'appointments.create',
    name: 'Créer des rendez-vous',
    description: 'Planifier de nouveaux rendez-vous'
  },
  {
    id: 'appointments.edit',
    name: 'Modifier les rendez-vous',
    description: 'Changer les détails des rendez-vous'
  },
  {
    id: 'appointments.cancel',
    name: 'Annuler des rendez-vous',
    description: 'Annuler ou reporter des rendez-vous'
  }]

},
{
  id: 'documents',
  name: 'Documents',
  icon: FileTextIcon,
  color: 'purple',
  permissions: [
  {
    id: 'documents.view',
    name: 'Voir les documents',
    description: 'Accéder aux documents patients'
  },
  {
    id: 'documents.upload',
    name: 'Télécharger des documents',
    description: 'Ajouter de nouveaux documents'
  },
  {
    id: 'documents.delete',
    name: 'Supprimer des documents',
    description: 'Retirer des documents du système'
  }]

},
{
  id: 'reports',
  name: 'Rapports',
  icon: ClipboardIcon,
  color: 'amber',
  permissions: [
  {
    id: 'reports.view',
    name: 'Voir les rapports',
    description: 'Consulter les rapports et statistiques'
  },
  {
    id: 'reports.export',
    name: 'Exporter les rapports',
    description: 'Télécharger les rapports en PDF/Excel'
  }]

},
{
  id: 'settings',
  name: 'Paramètres',
  icon: SettingsIcon,
  color: 'red',
  permissions: [
  {
    id: 'settings.view',
    name: 'Voir les paramètres',
    description: 'Accéder aux paramètres du système'
  },
  {
    id: 'settings.edit',
    name: 'Modifier les paramètres',
    description: 'Changer la configuration du système'
  },
  {
    id: 'settings.users',
    name: 'Gérer les utilisateurs',
    description: 'Créer, modifier et supprimer des utilisateurs'
  }]

}];

const defaultPermissions: Record<string, string[]> = {
  orthodontist: [
  'patients.view',
  'patients.create',
  'patients.edit',
  'appointments.view',
  'appointments.create',
  'appointments.edit',
  'appointments.cancel',
  'documents.view',
  'documents.upload',
  'documents.delete',
  'reports.view',
  'reports.export'],

  assistant: [
  'patients.view',
  'patients.create',
  'patients.edit',
  'appointments.view',
  'appointments.create',
  'appointments.edit',
  'documents.view',
  'documents.upload',
  'reports.view'],

  receptionist: [
  'patients.view',
  'appointments.view',
  'appointments.create',
  'appointments.edit',
  'appointments.cancel',
  'documents.view'],

  admin: permissionCategories.flatMap((cat) =>
  cat.permissions.map((p) => p.id)
  )
};
const colorMap: Record<
  string,
  {
    text: string;
    bg: string;
    border: string;
  }> =
{
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  green: {
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  purple: {
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  amber: {
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  red: {
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200'
  }
};
const UserPermissions = () => {
  const [selectedRole, setSelectedRole] = useState(defaultRoles[0]);
  const [permissions, setPermissions] = useState<string[]>(
    defaultPermissions[defaultRoles[0].id]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const handleRoleSelect = (role: (typeof defaultRoles)[0]) => {
    setSelectedRole(role);
    setPermissions(defaultPermissions[role.id]);
    setIsEditing(false);
  };
  const handlePermissionToggle = (permissionId: string) => {
    if (!isEditing) return;
    setPermissions((prev) =>
    prev.includes(permissionId) ?
    prev.filter((p) => p !== permissionId) :
    [...prev, permissionId]
    );
  };
  const handleSave = () => {
    setShowSaveConfirm(true);
    setTimeout(() => {
      setShowSaveConfirm(false);
      setIsEditing(false);
    }, 2000);
  };
  const handleCancel = () => {
    setPermissions(defaultPermissions[selectedRole.id]);
    setIsEditing(false);
  };
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {permissions.length} permission{permissions.length > 1 ? 's' : ''}{' '}
          active{permissions.length > 1 ? 's' : ''} pour{' '}
          <strong>{selectedRole.name}</strong>
        </span>
        {!isEditing ?
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">

            <EditIcon size={11} />
            Modifier
          </button> :

        <div className="flex gap-1">
            <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">

              <XIcon size={11} />
              Annuler
            </button>
            <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">

              <SaveIcon size={11} />
              Enregistrer
            </button>
          </div>
        }
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Roles List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <UsersIcon size={12} className="text-gray-500" />
              Rôles
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {defaultRoles.map((role) =>
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={`w-full px-3 py-2 text-left transition-all ${selectedRole.id === role.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-gray-50'}`}>

                <div className="flex items-center gap-2">
                  <div
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>

                    <role.icon size={12} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-800">
                      {role.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {role.userCount} utilisateur
                      {role.userCount > 1 ? 's' : ''}
                    </div>
                  </div>
                  {selectedRole.id === role.id &&
                <CheckIcon
                  size={12}
                  className="text-blue-600 flex-shrink-0" />

                }
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Permissions */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <ShieldIcon size={12} className="text-gray-500" />
              Permissions — {selectedRole.name}
            </h3>
            {isEditing &&
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                Mode édition
              </span>
            }
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {permissionCategories.map((category) => {
              const colors = colorMap[category.color] || colorMap.blue;
              const activeCount = category.permissions.filter((p) =>
              permissions.includes(p.id)
              ).length;
              return (
                <div
                  key={category.id}
                  className="border-b border-gray-100 last:border-0">

                  <div
                    className={`flex items-center gap-2 px-3 py-2 ${colors.bg}`}>

                    <category.icon size={12} className={colors.text} />
                    <span className={`text-xs font-semibold ${colors.text}`}>
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {activeCount}/{category.permissions.length}
                    </span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {category.permissions.map((permission) => {
                      const isActive = permissions.includes(permission.id);
                      return (
                        <div
                          key={permission.id}
                          onClick={() => handlePermissionToggle(permission.id)}
                          className={`flex items-center justify-between px-3 py-2 ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'}`}>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-gray-800">
                                {permission.name}
                              </span>
                              {isActive &&
                              <CheckIcon
                                size={11}
                                className="text-green-500 flex-shrink-0" />

                              }
                            </div>
                            <span className="text-xs text-gray-400">
                              {permission.description}
                            </span>
                          </div>
                          <div
                            className={`ml-3 flex-shrink-0 h-5 w-9 rounded-full transition-all relative ${isActive ? 'bg-green-400' : 'bg-gray-300'} ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>

                            <motion.div
                              animate={{
                                x: isActive ? 16 : 2
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30
                              }}
                              className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm flex items-center justify-center">

                              {isActive ?
                              <UnlockIcon
                                size={8}
                                className="text-green-500" /> :


                              <LockIcon size={8} className="text-gray-400" />
                              }
                            </motion.div>
                          </div>
                        </div>);

                    })}
                  </div>
                </div>);

            })}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        <strong className="text-blue-900">Conseils:</strong> Accordez uniquement
        les permissions nécessaires. Révisez régulièrement les droits d'accès
        pour maintenir la sécurité.
      </div>

      <AnimatePresence>
        {showSaveConfirm &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              type: 'spring',
              duration: 0.5
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

              <div className="relative border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-3xl overflow-hidden">
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
                className="relative z-10 flex justify-center mb-2">

                  <div className="h-14 w-14 rounded-full bg-white shadow-lg border border-red-100 flex items-center justify-center">
                    <CheckIcon className="h-7 w-7 text-red-500" />
                  </div>
                </motion.div>
                <h3 className="text-sm font-semibold text-red-800 text-center mb-1">Permissions enregistrées !</h3>
                <p className="text-xs text-red-600 text-center">Les modifications ont été appliquées avec succès</p>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

};
export default UserPermissions;