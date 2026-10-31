import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  PlusIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  AwardIcon,
  FilterIcon,
  SunIcon,
  ThermometerIcon,
  HeartIcon,
  UserIcon,
  FlowerIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon } from
'lucide-react';
interface VacationBalance {
  congesPayes: {
    used: number;
    total: number;
  };
  maladie: {
    used: number;
    total: number;
  };
  maternite: {
    used: number;
    total: number;
  };
  paternite: {
    used: number;
    total: number;
  };
  decesParent: {
    used: number;
    total: number;
  };
  decesEnfant: {
    used: number;
    total: number;
  };
}
interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  performance: number;
  status: string;
  avatar: string;
  vacationBalances: VacationBalance;
}
const leaveTypes = [
{
  key: 'congesPayes',
  label: 'Congés Payés',
  icon: SunIcon,
  bar: 'bg-blue-400',
  track: 'bg-blue-100',
  badge: 'bg-blue-100 text-blue-700'
},
{
  key: 'maladie',
  label: 'Maladie',
  icon: ThermometerIcon,
  bar: 'bg-rose-400',
  track: 'bg-rose-100',
  badge: 'bg-rose-100 text-rose-700'
},
{
  key: 'maternite',
  label: 'Maternité',
  icon: HeartIcon,
  bar: 'bg-pink-400',
  track: 'bg-pink-100',
  badge: 'bg-pink-100 text-pink-700'
},
{
  key: 'paternite',
  label: 'Paternité',
  icon: UserIcon,
  bar: 'bg-teal-400',
  track: 'bg-teal-100',
  badge: 'bg-teal-100 text-teal-700'
},
{
  key: 'decesParent',
  label: 'Décès parent',
  icon: FlowerIcon,
  bar: 'bg-slate-400',
  track: 'bg-slate-100',
  badge: 'bg-slate-100 text-slate-700'
},
{
  key: 'decesEnfant',
  label: 'Décès enfant',
  icon: StarIcon,
  bar: 'bg-violet-400',
  track: 'bg-violet-100',
  badge: 'bg-violet-100 text-violet-700'
}];

const staff: StaffMember[] = [
{
  id: 1,
  name: 'Sarah Martin',
  role: 'Assistante dentaire',
  email: 'sarah.martin@orthobizz.com',
  phone: '+216 98 765 432',
  joinDate: '15 Mar 2020',
  performance: 4.5,
  status: 'active',
  avatar: 'SM',
  vacationBalances: {
    congesPayes: {
      used: 8,
      total: 25
    },
    maladie: {
      used: 0,
      total: 15
    },
    maternite: {
      used: 0,
      total: 98
    },
    paternite: {
      used: 0,
      total: 11
    },
    decesParent: {
      used: 0,
      total: 3
    },
    decesEnfant: {
      used: 0,
      total: 5
    }
  }
},
{
  id: 2,
  name: 'Marc Dubois',
  role: 'Réceptionniste',
  email: 'marc.dubois@orthobizz.com',
  phone: '+216 98 123 456',
  joinDate: '10 Jan 2021',
  performance: 4.2,
  status: 'active',
  avatar: 'MD',
  vacationBalances: {
    congesPayes: {
      used: 17,
      total: 25
    },
    maladie: {
      used: 3,
      total: 15
    },
    maternite: {
      used: 0,
      total: 0
    },
    paternite: {
      used: 0,
      total: 11
    },
    decesParent: {
      used: 3,
      total: 3
    },
    decesEnfant: {
      used: 0,
      total: 5
    }
  }
},
{
  id: 3,
  name: 'Julie Leroy',
  role: 'Assistante dentaire',
  email: 'julie.leroy@orthobizz.com',
  phone: '+216 97 654 321',
  joinDate: '20 Jun 2019',
  performance: 4.8,
  status: 'active',
  avatar: 'JL',
  vacationBalances: {
    congesPayes: {
      used: 5,
      total: 25
    },
    maladie: {
      used: 0,
      total: 15
    },
    maternite: {
      used: 98,
      total: 98
    },
    paternite: {
      used: 0,
      total: 0
    },
    decesParent: {
      used: 0,
      total: 3
    },
    decesEnfant: {
      used: 0,
      total: 5
    }
  }
},
{
  id: 4,
  name: 'Emma Rousseau',
  role: 'Hygiéniste',
  email: 'emma.rousseau@orthobizz.com',
  phone: '+216 99 876 543',
  joinDate: '5 Sep 2021',
  performance: 4.6,
  status: 'vacation',
  avatar: 'ER',
  vacationBalances: {
    congesPayes: {
      used: 20,
      total: 25
    },
    maladie: {
      used: 5,
      total: 15
    },
    maternite: {
      used: 0,
      total: 98
    },
    paternite: {
      used: 0,
      total: 0
    },
    decesParent: {
      used: 0,
      total: 3
    },
    decesEnfant: {
      used: 0,
      total: 5
    }
  }
}];

const StaffDirectory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const roles = ['all', 'Assistante dentaire', 'Réceptionniste', 'Hygiéniste'];
  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const handleViewProfile = (id: number) => navigate(`/hr/staff/${id}`);
  const handleEditStaff = (member: StaffMember) => {
    const nameParts = member.name.trim().split(' ');
    navigate('/hr/staff/new', {
      state: {
        staffData: {
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: member.email,
          phone: member.phone,
          position: member.role,
          startDate: member.joinDate,
          skills: [],
          certificates: [],
          trainings: []
        }
      }
    });
  };
  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon
            size={12}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />

        </div>
        <div className="relative">
          <FilterIcon
            size={11}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none">

            {roles.map((r) =>
            <option key={r} value={r}>
                {r === 'all' ? 'Tous les rôles' : r}
              </option>
            )}
          </select>
        </div>
        <button
          onClick={() => navigate('/hr/staff/new')}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">

          <PlusIcon size={12} />
          Ajouter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xs font-semibold text-gray-700">
            Personnel ({filteredStaff.length})
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Nom
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Rôle
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Email
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Téléphone
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Depuis
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Perf.
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Statut
              </th>
              <th className="text-left px-3 py-1.5 text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((member) => {
              const isExpanded = expandedRows.includes(member.id);
              return (
                <Fragment key={member.id}>
                  <tr className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {member.avatar}
                        </div>
                        <span className="text-xs font-medium text-gray-800">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-600">
                      {member.role}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">
                      {member.phone}
                    </td>
                    <td className="px-3 py-1.5 text-xs text-gray-500">
                      {member.joinDate}
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <AwardIcon size={11} className="text-amber-500" />
                        <span className="text-xs font-medium text-gray-700">
                          {member.performance}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-xs ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>

                        {member.status === 'active' ? 'Actif' : 'En congé'}
                      </span>
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleEditStaff(member)}
                          className="p-1 hover:bg-amber-50 rounded text-gray-400 hover:text-amber-600"
                          title="Modifier">

                          <EditIcon size={11} />
                        </button>
                        <button
                          onClick={() => handleViewProfile(member.id)}
                          className="p-1 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600"
                          title="Profil">

                          <UserIcon size={11} />
                        </button>
                        <button
                          onClick={() => toggleRow(member.id)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">

                          {isExpanded ?
                          <ChevronUpIcon size={11} /> :

                          <ChevronDownIcon size={11} />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded &&
                  <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={8} className="px-3 py-2">
                        <div className="text-xs font-medium text-gray-600 mb-1.5">
                          Soldes de congés
                        </div>
                        <div className="grid grid-cols-6 gap-1.5">
                          {leaveTypes.map((type) => {
                          const balance =
                          member.vacationBalances[
                          type.key as keyof VacationBalance];

                          const remaining = balance.total - balance.used;
                          const pct =
                          balance.total > 0 ?
                          balance.used / balance.total * 100 :
                          0;
                          const Icon = type.icon;
                          return (
                            <div
                              key={type.key}
                              className="bg-white border border-gray-200 rounded p-1.5">

                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1">
                                    <Icon size={10} className="text-gray-500" />
                                    <span className="text-[10px] text-gray-600">
                                      {type.label}
                                    </span>
                                  </div>
                                  <span
                                  className={`text-[10px] font-bold px-1 py-0.5 rounded ${type.badge}`}>

                                    {remaining}j
                                  </span>
                                </div>
                                <div
                                className={`h-1 rounded-full ${type.track}`}>

                                  <div
                                  className={`h-1 rounded-full ${type.bar}`}
                                  style={{
                                    width: `${pct}%`
                                  }} />

                                </div>
                                <div className="flex justify-between mt-0.5">
                                  <span className="text-[10px] text-gray-400">
                                    {balance.used} utilisé
                                  </span>
                                  <span className="text-[10px] text-gray-400">
                                    /{balance.total}j
                                  </span>
                                </div>
                              </div>);

                        })}
                        </div>
                      </td>
                    </tr>
                  }
                </Fragment>);

            })}
          </tbody>
        </table>
      </div>
    </div>);

};
export default StaffDirectory;