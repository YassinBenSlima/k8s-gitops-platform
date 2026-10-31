import React, { useState } from 'react';
import {
  XIcon,
  UserIcon,
  ShieldIcon,
  BellIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon } from
'lucide-react';
interface UserCreateProps {
  onClose: () => void;
  onSave?: (data: UserFormData) => void;
}
interface UserFormData {
  civilite: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  role: string;
  departement: string;
  username: string;
  password: string;
  twoFactor: boolean;
  sendCredentials: boolean;
  permissions: string[];
  notifications: string[];
}
const roles = [
'Médecin',
'Infirmier(e)',
'Secrétaire',
'Technicien',
'Administrateur',
'Directeur'];

const departments = [
'Médecine générale',
'Cardiologie',
'Urgences',
'Radiologie',
'Administration',
'RH'];

const permissionsList = [
'Patients',
'Rendez-vous',
'Prescriptions',
'Dossiers médicaux',
'Facturation',
'Rapports',
'Stock',
'RH',
'Administration'];

const notifsList = [
'Nouveaux RDV',
'Alertes patients',
'Messages',
'Rapports',
'Stock faible'];

export function UserCreate({ onClose, onSave }: UserCreateProps) {
  const [tab, setTab] = useState<'info' | 'access' | 'notifs'>('info');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    civilite: 'M.',
    prenom: '',
    nom: '',
    email: '',
    phone: '',
    role: '',
    departement: '',
    username: '',
    password: '',
    twoFactor: false,
    sendCredentials: true,
    permissions: [],
    notifications: []
  });
  const update = (
  field: keyof UserFormData,
  value: string | boolean | string[]) =>

  setFormData((prev) => ({
    ...prev,
    [field]: value
  }));
  const togglePermission = (perm: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm) ?
      prev.permissions.filter((p) => p !== perm) :
      [...prev.permissions, perm]
    }));
  };
  const toggleNotif = (notif: string) => {
    setFormData((prev) => ({
      ...prev,
      notifications: prev.notifications.includes(notif) ?
      prev.notifications.filter((n) => n !== notif) :
      [...prev.notifications, notif]
    }));
  };
  const inputCls =
  'w-full text-xs border border-gray-200 rounded px-2 py-1 h-7 focus:outline-none focus:border-blue-400 bg-white';
  const selectCls =
  'w-full text-xs border border-gray-200 rounded px-2 py-1 h-7 focus:outline-none focus:border-blue-400 bg-white';
  const labelCls = 'text-xs text-gray-500 mb-0.5 block';
  const tabs = [
  {
    id: 'info' as const,
    label: 'Informations',
    icon: UserIcon
  },
  {
    id: 'access' as const,
    label: 'Accès',
    icon: ShieldIcon
  },
  {
    id: 'notifs' as const,
    label: 'Notifications',
    icon: BellIcon
  }];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-xl">
          <div>
            <h2 className="text-sm font-semibold text-red-800">Nouvel utilisateur</h2>
            <p className="text-xs text-red-600 mt-0.5">Créer un compte utilisateur</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-red-600 hover:bg-red-100"
            aria-label="Fermer">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${tab === t.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>

                <Icon className="w-3 h-3" />
                {t.label}
              </button>);

          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tab === 'info' &&
          <>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Identité
                </p>
                <div className="grid grid-cols-6 gap-2">
                  <div>
                    <label className={labelCls}>Civilité</label>
                    <select
                    className={selectCls}
                    value={formData.civilite}
                    onChange={(e) => update('civilite', e.target.value)}>

                      <option>M.</option>
                      <option>Mme</option>
                      <option>Dr.</option>
                      <option>Pr.</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Prénom *</label>
                    <input
                    className={inputCls}
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={(e) => update('prenom', e.target.value)} />

                  </div>
                  <div className="col-span-3">
                    <label className={labelCls}>Nom *</label>
                    <input
                    className={inputCls}
                    placeholder="Nom de famille"
                    value={formData.nom}
                    onChange={(e) => update('nom', e.target.value)} />

                  </div>
                  <div className="col-span-3">
                    <label className={labelCls}>Email *</label>
                    <input
                    type="email"
                    className={inputCls}
                    placeholder="email@clinique.tn"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)} />

                  </div>
                  <div className="col-span-3">
                    <label className={labelCls}>Téléphone</label>
                    <input
                    className={inputCls}
                    placeholder="+216 XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)} />

                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Poste
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelCls}>Rôle *</label>
                    <select
                    className={selectCls}
                    value={formData.role}
                    onChange={(e) => update('role', e.target.value)}>

                      <option value="">Sélectionner</option>
                      {roles.map((r) =>
                    <option key={r}>{r}</option>
                    )}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Département</label>
                    <select
                    className={selectCls}
                    value={formData.departement}
                    onChange={(e) => update('departement', e.target.value)}>

                      <option value="">Sélectionner</option>
                      {departments.map((d) =>
                    <option key={d}>{d}</option>
                    )}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Identifiants
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={labelCls}>Nom d'utilisateur *</label>
                    <input
                    className={inputCls}
                    placeholder="prenom.nom"
                    value={formData.username}
                    onChange={(e) => update('username', e.target.value)} />

                  </div>
                  <div>
                    <label className={labelCls}>Mot de passe *</label>
                    <div className="relative">
                      <input
                      type={showPassword ? 'text' : 'password'}
                      className={`${inputCls} pr-7`}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => update('password', e.target.value)} />

                      <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">

                        {showPassword ?
                      <EyeOffIcon className="w-3 h-3" /> :

                      <EyeIcon className="w-3 h-3" />
                      }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }

          {tab === 'access' &&
          <>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Sécurité
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 rounded p-2">
                    <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={formData.twoFactor}
                    onChange={(e) => update('twoFactor', e.target.checked)} />

                    <div>
                      <p className="text-xs font-medium text-gray-700">
                        Authentification à deux facteurs
                      </p>
                      <p className="text-xs text-gray-500">
                        Sécurité renforcée via SMS ou application
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 rounded p-2">
                    <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={formData.sendCredentials}
                    onChange={(e) =>
                    update('sendCredentials', e.target.checked)
                    } />

                    <div>
                      <p className="text-xs font-medium text-gray-700">
                        Envoyer les identifiants par email
                      </p>
                      <p className="text-xs text-gray-500">
                        L'utilisateur recevra ses accès par email
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Permissions
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {permissionsList.map((perm) =>
                <label
                  key={perm}
                  className={`flex items-center gap-1.5 cursor-pointer rounded p-1.5 border text-xs transition-colors ${formData.permissions.includes(perm) ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>

                      <input
                    type="checkbox"
                    className="w-3 h-3"
                    checked={formData.permissions.includes(perm)}
                    onChange={() => togglePermission(perm)} />

                      {perm}
                    </label>
                )}
                </div>
              </div>
            </>
          }

          {tab === 'notifs' &&
          <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Notifications
              </p>
              <div className="space-y-1.5">
                {notifsList.map((notif) =>
              <label
                key={notif}
                className={`flex items-center gap-2 cursor-pointer rounded p-2 border text-xs transition-colors ${formData.notifications.includes(notif) ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>

                    <input
                  type="checkbox"
                  className="w-3.5 h-3.5"
                  checked={formData.notifications.includes(notif)}
                  onChange={() => toggleNotif(notif)} />

                    {notif}
                  </label>
              )}
              </div>
            </div>
          }
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded hover:bg-white">

            <XIcon className="w-3 h-3" /> Annuler
          </button>
          <button
            onClick={() => onSave?.(formData)}
            className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">

            <CheckIcon className="w-3 h-3" /> Créer l'utilisateur
          </button>
        </div>
      </div>
    </div>);

}
export default UserCreate;