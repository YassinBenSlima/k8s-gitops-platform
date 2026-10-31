import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  UsersIcon,
  CreditCardIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  CalendarIcon,
  UserIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  BanknoteIcon,
  ActivityIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
const FinancialDashboard = () => {
  // Mock data for statistics
  const stats = {
    totalRevenue: '45 750 DT',
    revenueChange: '+12.5%',
    revenueChangePositive: true,
    pendingPayments: '8 320 DT',
    pendingCount: 12,
    monthlyRevenue: '38 500 DT',
    monthlyChange: '+8.3%',
    monthlyChangePositive: true,
    activePatients: 156,
    patientsChange: '+5'
  };
  // Mock data for recent transactions — enriched
  const recentTransactions = [
  {
    id: 'TRX-2023-156',
    patient: 'Sophie Martin',
    practitioner: 'Dr. Dupont',
    treatment: 'Contrôle mensuel',
    amount: '750 DT',
    date: '12/06/2023',
    status: 'completed',
    type: 'payment',
    method: 'card',
    invoice: 'INV-2023-156'
  },
  {
    id: 'TRX-2023-155',
    patient: 'Thomas Bernard',
    practitioner: 'Dr. Martin',
    treatment: 'Pose appareil',
    amount: '1 200 DT',
    date: '10/06/2023',
    status: 'completed',
    type: 'payment',
    method: 'bank_transfer',
    invoice: 'INV-2023-155'
  },
  {
    id: 'TRX-2023-154',
    patient: 'Emma Petit',
    practitioner: 'Dr. Dupont',
    treatment: 'Consultation initiale',
    amount: '450 DT',
    date: '08/06/2023',
    status: 'pending',
    type: 'invoice',
    method: 'card',
    invoice: 'INV-2023-154'
  },
  {
    id: 'TRX-2023-153',
    patient: 'Lucas Dubois',
    practitioner: 'Dr. Martin',
    treatment: 'Ajustement appareil',
    amount: '900 DT',
    date: '05/06/2023',
    status: 'overdue',
    type: 'invoice',
    method: 'cash',
    invoice: 'INV-2023-153'
  }];

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'card':
        return {
          label: 'Carte',
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-900/30'
        };
      case 'bank_transfer':
        return {
          label: 'Virement',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/30'
        };
      case 'cash':
        return {
          label: 'Espèces',
          color: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-900/30'
        };
      default:
        return {
          label: method,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-700'
        };
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Payé
          </span>);

      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
            <ClockIcon className="h-3 w-3 mr-1" />
            En attente
          </span>);

      case 'overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            En retard
          </span>);

      default:
        return null;
    }
  };
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenu total */}
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
            delay: 0.1
          }}
          className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-indigo-300 transition-colors">

          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <div className="pl-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              Revenu total
            </p>
            <h4 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
              {stats.totalRevenue}
            </h4>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-xs font-bold flex items-center text-emerald-600">
                <ArrowUpRightIcon className="w-3 h-3 mr-0.5" />
                {stats.revenueChange}
              </span>
              <span className="text-xs text-slate-400">vs mois dernier</span>
            </div>
          </div>
          <div className="p-2 rounded-md bg-blue-50 text-blue-600 opacity-80 group-hover:scale-110 transition-transform">
            <DollarSignIcon className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Paiements en attente */}
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
            delay: 0.2
          }}
          className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-indigo-300 transition-colors">

          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="pl-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              Paiements en attente
            </p>
            <h4 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
              {stats.pendingPayments}
            </h4>
            <span className="text-xs text-slate-400 mt-1 block">
              {stats.pendingCount} factures
            </span>
          </div>
          <div className="p-2 rounded-md bg-amber-50 text-amber-600 opacity-80 group-hover:scale-110 transition-transform">
            <ClockIcon className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Revenu mensuel */}
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
            delay: 0.3
          }}
          className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-indigo-300 transition-colors">

          <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
          <div className="pl-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              Revenu mensuel
            </p>
            <h4 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
              {stats.monthlyRevenue}
            </h4>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-xs font-bold flex items-center text-emerald-600">
                <ArrowUpRightIcon className="w-3 h-3 mr-0.5" />
                {stats.monthlyChange}
              </span>
              <span className="text-xs text-slate-400">ce mois</span>
            </div>
          </div>
          <div className="p-2 rounded-md bg-green-50 text-green-600 opacity-80 group-hover:scale-110 transition-transform">
            <CreditCardIcon className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Patients actifs */}
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
            delay: 0.4
          }}
          className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-indigo-300 transition-colors">

          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
          <div className="pl-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              Patients actifs
            </p>
            <h4 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
              {stats.activePatients}
            </h4>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-xs font-bold flex items-center text-emerald-600">
                <ArrowUpRightIcon className="w-3 h-3 mr-0.5" />
                {stats.patientsChange}
              </span>
              <span className="text-xs text-slate-400">ce mois</span>
            </div>
          </div>
          <div className="p-2 rounded-md bg-purple-50 text-purple-600 opacity-80 group-hover:scale-110 transition-transform">
            <UsersIcon className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
      {/* Recent Transactions */}
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

        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <ActivityIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Transactions récentes
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {recentTransactions.length} dernières transactions
                </p>
              </div>
            </div>
            <Link
              to="/administration/facturation"
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 gap-1">

              Voir tout
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient / Praticien
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Traitement
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentTransactions.map((transaction, index) => {
                const method = getMethodLabel(transaction.method);
                return (
                  <motion.tr
                    key={transaction.id}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: 0.6 + index * 0.1
                    }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">

                    {/* Référence */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                        {transaction.id}
                      </span>
                    </td>
                    {/* Patient / Praticien */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                          {transaction.patient.
                          split(' ').
                          map((n) => n[0]).
                          join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {transaction.patient}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <UserIcon className="h-3 w-3" />
                            {transaction.practitioner}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Traitement */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {transaction.treatment}
                      </span>
                    </td>
                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {transaction.date}
                      </div>
                    </td>
                    {/* Mode */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${method.bg} ${method.color}`}>

                        {method.label}
                      </span>
                    </td>
                    {/* Montant */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {transaction.amount}
                      </div>
                    </td>
                    {/* Type */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {transaction.type === 'payment' ?
                        <CreditCardIcon className="h-4 w-4 text-green-500 mr-2" /> :

                        <FileTextIcon className="h-4 w-4 text-blue-500 mr-2" />
                        }
                        <span className="text-sm text-gray-900 dark:text-white">
                          {transaction.type === 'payment' ?
                          'Paiement' :
                          'Facture'}
                        </span>
                      </div>
                    </td>
                    {/* Statut */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                  </motion.tr>);

              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>);

};
export default FinancialDashboard;