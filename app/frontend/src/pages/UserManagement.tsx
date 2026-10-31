import React, { useState } from 'react';
import {
  UsersIcon,
  ShieldIcon,
  KeyIcon,
  ClipboardListIcon,
  UserPlusIcon } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
import UsersList from '../components/users/UsersList';
import UserPermissions from '../components/users/UserPermissions';
import ActivityLogs from '../components/users/ActivityLogs';
import SecuritySettings from '../components/users/SecuritySettings';
type TabId = 'users' | 'permissions' | 'logs' | 'security';
const tabs: {
  id: TabId;
  name: string;
  icon: React.ReactNode;
}[] = [
{
  id: 'users',
  name: 'Utilisateurs',
  icon: <UsersIcon size={13} />
},
{
  id: 'permissions',
  name: 'Permissions',
  icon: <ShieldIcon size={13} />
},
{
  id: 'logs',
  name: "Journal d'activité",
  icon: <ClipboardListIcon size={13} />
},
{
  id: 'security',
  name: 'Sécurité',
  icon: <KeyIcon size={13} />
}];

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('users');
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersList />;
      case 'permissions':
        return <UserPermissions />;
      case 'logs':
        return <ActivityLogs />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <UsersList />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <UsersIcon size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">
              Gestion des utilisateurs
            </h1>
            <p className="text-xs text-gray-500">
              Gérez les utilisateurs, les permissions et suivez l'activité du
              système
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/users/create')}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">

          <UserPlusIcon size={12} />
          Nouvel utilisateur
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 mb-3 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>

            {tab.icon}
            {tab.name}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>);

};
export default UserManagement;