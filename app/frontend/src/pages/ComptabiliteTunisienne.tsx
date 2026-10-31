import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileTextIcon,
  TrendingUpIcon,
  WalletIcon,
  PlusIcon,
  DownloadIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  BriefcaseIcon,
  BuildingIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSignIcon,
  BarChart3Icon,
  PieChartIcon,
  TrendingDownIcon,
  ClockIcon,
  FilterIcon,
  SearchIcon,
  PrinterIcon,
  SendIcon,
  EyeIcon } from
'lucide-react';
const ComptabiliteTunisienne = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  // Helper functions for declarations
  const getDeclarationColor = (type: string) => {
    switch (type) {
      case 'TVA':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'Impôt sur le Revenu':
        return 'bg-purple-100 dark:bg-purple-900/30';
      case 'TCL':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'Retenue à la Source':
        return 'bg-amber-100 dark:bg-amber-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  };
  const getDeclarationIcon = (type: string) => {
    switch (type) {
      case 'TVA':
        return (
          <FileTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />);

      case 'Impôt sur le Revenu':
        return (
          <DollarSignIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />);

      case 'TCL':
        return (
          <BuildingIcon className="h-5 w-5 text-green-600 dark:text-green-400" />);

      case 'Retenue à la Source':
        return (
          <CreditCardIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />);

      default:
        return (
          <FileTextIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />);

    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Soumise':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
            <CheckCircle2Icon className="h-3 w-3 mr-1" />
            Soumise
          </span>);

      case 'En attente':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400">
            <ClockIcon className="h-3 w-3 mr-1" />
            En attente
          </span>);

      case 'En retard':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            En retard
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            {status}
          </span>);

    }
  };
  const tabs = [
  {
    id: 'dashboard',
    name: 'Tableau de Bord',
    icon: BarChart3Icon,
    color: 'blue'
  },
  {
    id: 'declarations',
    name: 'Déclarations Fiscales',
    icon: FileTextIcon,
    color: 'purple'
  },
  {
    id: 'patrimoine',
    name: 'Gestion Patrimoine',
    icon: BriefcaseIcon,
    color: 'green'
  },
  {
    id: 'tresorerie',
    name: 'Gestion Trésorerie',
    icon: WalletIcon,
    color: 'amber'
  }];

  // Sample data for dashboard
  const dashboardStats = [
  {
    label: "Chiffre d'Affaires",
    value: '245,680 TND',
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUpIcon,
    color: 'green'
  },
  {
    label: 'Charges Totales',
    value: '89,420 TND',
    change: '+5.2%',
    trend: 'up',
    icon: TrendingDownIcon,
    color: 'red'
  },
  {
    label: 'Bénéfice Net',
    value: '156,260 TND',
    change: '+18.3%',
    trend: 'up',
    icon: DollarSignIcon,
    color: 'blue'
  },
  {
    label: 'Trésorerie',
    value: '78,350 TND',
    change: '-3.1%',
    trend: 'down',
    icon: WalletIcon,
    color: 'amber'
  }];

  // Tax declarations data
  const taxDeclarations = [
  {
    id: 1,
    type: 'TVA',
    period: 'Janvier 2024',
    status: 'Soumise',
    dueDate: '2024-02-15',
    amount: '12,450 TND',
    statusColor: 'green',
    reference: 'TVA-2024-001'
  },
  {
    id: 2,
    type: 'Impôt sur le Revenu',
    period: 'Q1 2024',
    status: 'En attente',
    dueDate: '2024-04-30',
    amount: '28,670 TND',
    statusColor: 'amber',
    reference: 'IR-2024-002'
  },
  {
    id: 3,
    type: 'TCL',
    period: 'Janvier 2024',
    status: 'Soumise',
    dueDate: '2024-02-15',
    amount: '850 TND',
    statusColor: 'green',
    reference: 'TCL-2024-003'
  },
  {
    id: 4,
    type: 'Retenue à la Source',
    period: 'Janvier 2024',
    status: 'En retard',
    dueDate: '2024-02-10',
    amount: '3,200 TND',
    statusColor: 'red',
    reference: 'RAS-2024-004'
  }];

  // Assets data
  const patrimoine = [
  {
    id: 1,
    name: 'Équipement Médical',
    category: 'Matériel Professionnel',
    value: '185,000 TND',
    purchaseDate: '2022-03-15',
    depreciation: '15%',
    currentValue: '157,250 TND'
  },
  {
    id: 2,
    name: 'Local Professionnel',
    category: 'Immobilier',
    value: '350,000 TND',
    purchaseDate: '2020-06-01',
    depreciation: '5%',
    currentValue: '332,500 TND'
  },
  {
    id: 3,
    name: 'Mobilier Bureau',
    category: 'Équipement',
    value: '25,000 TND',
    purchaseDate: '2021-09-10',
    depreciation: '20%',
    currentValue: '16,250 TND'
  }];

  // Treasury movements
  const tresorerieMovements = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'Entrée',
    category: 'Consultation',
    description: 'Paiement patient #1234',
    amount: '+2,500 TND',
    balance: '78,350 TND'
  },
  {
    id: 2,
    date: '2024-01-14',
    type: 'Sortie',
    category: 'Fournitures',
    description: 'Achat matériel orthodontique',
    amount: '-1,850 TND',
    balance: '75,850 TND'
  },
  {
    id: 3,
    date: '2024-01-13',
    type: 'Entrée',
    category: 'Traitement',
    description: 'Paiement traitement complet',
    amount: '+8,500 TND',
    balance: '77,700 TND'
  },
  {
    id: 4,
    date: '2024-01-12',
    type: 'Sortie',
    category: 'Salaires',
    description: 'Salaire assistant',
    amount: '-2,200 TND',
    balance: '69,200 TND'
  }];

  const handleViewDeclaration = (declarationId) => {
    navigate(`/administration/comptabilite/declaration/${declarationId}`);
  };
  const renderDashboard = () =>
  <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) =>
      <motion.div
        key={stat.label}
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: index * 0.1
        }}
        className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-${stat.color}-200 dark:border-gray-600`}>

            <div className="flex items-center justify-between mb-4">
              <div
            className={`h-12 w-12 rounded-full bg-${stat.color}-500 dark:bg-${stat.color}-600 flex items-center justify-center`}>

                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div
            className={`flex items-center text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>

                {stat.trend === 'up' ?
            <ArrowUpIcon className="h-4 w-4 mr-1" /> :

            <ArrowDownIcon className="h-4 w-4 mr-1" />
            }
                {stat.change}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {stat.label}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </motion.div>
      )}
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
        initial={{
          opacity: 0,
          x: -20
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Évolution du CA
            </h3>
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <PieChartIcon className="h-16 w-16" />
          </div>
        </motion.div>
        {/* Expenses Chart */}
        <motion.div
        initial={{
          opacity: 0,
          x: 20
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Répartition des Charges
            </h3>
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
              <option>Mensuel</option>
              <option>Trimestriel</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <BarChart3Icon className="h-16 w-16" />
          </div>
        </motion.div>
      </div>
      {/* Quick Actions */}
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-indigo-200 dark:border-gray-600">

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border-2 border-indigo-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <PlusIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Nouvelle Déclaration
            </span>
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border-2 border-indigo-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <DownloadIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Exporter Rapport
            </span>
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border-2 border-indigo-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <PrinterIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Imprimer Bilan
            </span>
          </button>
        </div>
      </motion.div>
    </div>;

  const renderDeclarations = () =>
  <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Déclarations Fiscales
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos déclarations fiscales selon la législation tunisienne
          </p>
        </div>
        <button
        onClick={() =>
        navigate('/administration/comptabilite/declaration/nouvelle')
        }
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 dark:from-purple-700 dark:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 text-white rounded-lg font-medium transition-colors">

          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle Déclaration
        </button>
      </div>
      {/* Declarations Table */}
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date limite
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {taxDeclarations.map((declaration, index) =>
            <motion.tr
              key={declaration.id}
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
              whileHover={{
                backgroundColor: 'rgba(249, 250, 251, 0.5)'
              }}
              className="cursor-pointer transition-all dark:hover:bg-gray-700/50">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                    className={`h-10 w-10 rounded-lg ${getDeclarationColor(declaration.type)} flex items-center justify-center mr-3`}>

                        {getDeclarationIcon(declaration.type)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {declaration.type}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {declaration.reference}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {declaration.period}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {declaration.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {declaration.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(declaration.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <motion.button
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                  onClick={() => handleViewDeclaration(declaration.id)}>

                      <EyeIcon className="h-5 w-5" />
                    </motion.button>
                  </td>
                </motion.tr>
            )}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex">
          <AlertCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Rappel Fiscal
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Les déclarations TVA doivent être soumises avant le 15 de chaque
              mois. Les déclarations d'impôt sur le revenu sont dues
              trimestriellement.
            </p>
          </div>
        </div>
      </div>
    </div>;

  const renderPatrimoine = () =>
  <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Gestion du Patrimoine
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Suivez vos actifs et leur dépréciation
          </p>
        </div>
        <button
        onClick={() =>
        navigate('/administration/comptabilite/patrimoine/nouveau')
        }
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-700 dark:to-emerald-700 dark:hover:from-green-800 dark:hover:to-emerald-800 text-white rounded-lg font-medium transition-colors">

          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un Actif
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-200 dark:border-gray-600">

          <div className="flex items-center justify-between mb-4">
            <BuildingIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              Immobilisations
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            560,000 TND
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Valeur totale des actifs
          </p>
        </motion.div>
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
        className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-amber-200 dark:border-gray-600">

          <div className="flex items-center justify-between mb-4">
            <TrendingDownIcon className="h-12 w-12 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Dépréciation
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            54,000 TND
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dépréciation cumulée
          </p>
        </motion.div>
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
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-200 dark:border-gray-600">

          <div className="flex items-center justify-between mb-4">
            <BriefcaseIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Valeur Nette
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            506,000 TND
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Valeur actuelle du patrimoine
          </p>
        </motion.div>
      </div>
      {/* Assets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
            <input
            type="text"
            placeholder="Rechercher un actif..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />

          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valeur d'Achat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date d'Achat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dépréciation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valeur Actuelle
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {patrimoine.map((asset) =>
            <tr
              key={asset.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <BriefcaseIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {asset.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {asset.category}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {asset.value}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {new Date(asset.purchaseDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400">
                      {asset.depreciation}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">
                    {asset.currentValue}
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>;

  const renderTresorerie = () =>
  <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Gestion de Trésorerie
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Suivez vos flux de trésorerie et liquidités
          </p>
        </div>
        <button
        onClick={() =>
        navigate('/administration/comptabilite/tresorerie/nouveau')
        }
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-700 dark:to-orange-700 dark:hover:from-amber-800 dark:hover:to-orange-800 text-white rounded-lg font-medium transition-colors">

          <PlusIcon className="h-5 w-5 mr-2" />
          Nouveau Mouvement
        </button>
      </div>
      {/* Cash Flow Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-200 dark:border-gray-600">

          <div className="flex items-center justify-between mb-4">
            <ArrowUpIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              Entrées
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            245,680 TND
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ce mois</p>
        </motion.div>
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
        className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-red-200 dark:border-gray-600">

          <div className="flex items-center justify-between mb-4">
            <ArrowDownIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Sorties
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            89,420 TND
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ce mois</p>
        </motion.div>
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
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-200 dark:border-gray-600">

          <div className="flex items-center justify-between mb-4">
            <WalletIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Solde
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            78,350 TND
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Trésorerie disponible
          </p>
        </motion.div>
      </div>
      {/* Movements Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center flex-1">
              <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
              <input
              type="text"
              placeholder="Rechercher un mouvement..."
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />

            </div>
            <div className="flex items-center space-x-3">
              <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option>Tous les types</option>
                <option>Entrées</option>
                <option>Sorties</option>
              </select>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <FilterIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Solde
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {tresorerieMovements.map((movement) =>
            <tr
              key={movement.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">

                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {new Date(movement.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${movement.type === 'Entrée' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>

                      {movement.type === 'Entrée' ?
                  <ArrowUpIcon className="h-3 w-3 mr-1" /> :

                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  }
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {movement.category}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {movement.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                  className={`font-bold ${movement.type === 'Entrée' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>

                      {movement.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                    {movement.balance}
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Moyens de Paiement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-blue-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <CreditCardIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                60%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Carte Bancaire
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              147,408 TND
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-green-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <WalletIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                30%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Espèces
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              73,704 TND
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-purple-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <FileTextIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                10%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Chèque
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              24,568 TND
            </p>
          </div>
        </div>
      </div>
    </div>;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Comptabilité Tunisienne</h1>
        <p className="text-blue-100 dark:text-blue-200">
          Gestion comptable et fiscale selon la législation tunisienne
        </p>
      </div>
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-2 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg` : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>

              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          )}
        </div>
      </div>
      {/* Tab Content */}
      <div>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'declarations' && renderDeclarations()}
        {activeTab === 'patrimoine' && renderPatrimoine()}
        {activeTab === 'tresorerie' && renderTresorerie()}
      </div>
    </div>);

};
export default ComptabiliteTunisienne;