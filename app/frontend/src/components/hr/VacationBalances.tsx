import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  ClockIcon } from
'lucide-react';
interface EmployeeBalance {
  id: number;
  name: string;
  role: string;
  avatar: string;
  balances: {
    congesPayes: number;
    rtt: number;
    maladie: number;
    formation: number;
    exceptionnel: number;
    sansSolde: number;
  };
}
const VacationBalances = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  // Mock data based on StaffDirectory
  const employees: EmployeeBalance[] = [
  {
    id: 1,
    name: 'Sarah Martin',
    role: 'Assistante dentaire',
    avatar: 'SM',
    balances: {
      congesPayes: 12.5,
      rtt: 4,
      maladie: 0,
      formation: 2,
      exceptionnel: 0,
      sansSolde: 0
    }
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Réceptionniste',
    avatar: 'MD',
    balances: {
      congesPayes: 8,
      rtt: 2,
      maladie: 3,
      formation: 0,
      exceptionnel: 1,
      sansSolde: 0
    }
  },
  {
    id: 3,
    name: 'Julie Leroy',
    role: 'Assistante dentaire',
    avatar: 'JL',
    balances: {
      congesPayes: 20,
      rtt: 8,
      maladie: 0,
      formation: 5,
      exceptionnel: 0,
      sansSolde: 0
    }
  },
  {
    id: 4,
    name: 'Emma Rousseau',
    role: 'Hygiéniste',
    avatar: 'ER',
    balances: {
      congesPayes: 5,
      rtt: 0,
      maladie: 0,
      formation: 1,
      exceptionnel: 0,
      sansSolde: 2
    }
  },
  {
    id: 5,
    name: 'Thomas Bernard',
    role: 'Chirurgien Dentiste',
    avatar: 'TB',
    balances: {
      congesPayes: 15,
      rtt: 6,
      maladie: 1,
      formation: 10,
      exceptionnel: 0,
      sansSolde: 0
    }
  }];

  const roles = [
  'all',
  'Assistante dentaire',
  'Réceptionniste',
  'Hygiéniste',
  'Chirurgien Dentiste'];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || employee.role === filterRole;
    return matchesSearch && matchesRole;
  });
  const getBalanceColor = (days: number, type: string) => {
    if (type === 'maladie' || type === 'sansSolde')
    return 'text-gray-900 dark:text-white';
    if (days < 5) return 'text-red-600 dark:text-red-400 font-bold';
    if (days < 10) return 'text-amber-600 dark:text-amber-400 font-semibold';
    return 'text-green-600 dark:text-green-400 font-semibold';
  };
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white" />

          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white appearance-none text-sm">

              {roles.map((role) =>
              <option key={role} value={role}>
                  {role === 'all' ? 'Tous les rôles' : role}
                </option>
              )}
            </select>
          </div>
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">

            <DownloadIcon className="h-4 w-4 mr-2" />
            Exporter
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employé
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Congés Payés
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  RTT
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Maladie
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Exceptionnel
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sans Solde
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map((employee, index) =>
              <motion.tr
                key={employee.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.05
                }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                        {employee.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {employee.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                    className={`text-sm ${getBalanceColor(employee.balances.congesPayes, 'congesPayes')}`}>

                      {employee.balances.congesPayes} j
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                    className={`text-sm ${getBalanceColor(employee.balances.rtt, 'rtt')}`}>

                      {employee.balances.rtt} j
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {employee.balances.maladie} j
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {employee.balances.formation} j
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {employee.balances.exceptionnel} j
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {employee.balances.sansSolde} j
                    </span>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredEmployees.length === 0 &&
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Aucun employé trouvé pour cette recherche.
          </div>
        }
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 px-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span>Solde confortable (&gt; 10j)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
          <span>Solde moyen (5-10j)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span>Solde bas (&lt; 5j)</span>
        </div>
      </div>
    </div>);

};
export default VacationBalances;