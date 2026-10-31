import React, { useState } from 'react';
import {
  FileTextIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  PlusIcon,
  CheckCircleIcon,
  ClipboardIcon,
  CreditCardIcon,
  UserIcon,
  CalendarIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ActivityIcon,
  SparklesIcon,
  ZapIcon,
  AwardIcon,
  BarChart3Icon,
  PieChartIcon,
  FileBarChartIcon,
  SettingsIcon } from
'lucide-react';
import NouveauDevis from './NouveauDevis';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Rapports = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('devis');
  const [showDevisDetails, setShowDevisDetails] = useState(false);
  const [showNewDevis, setShowNewDevis] = useState(false);
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [selectedReportForPreview, setSelectedReportForPreview] = useState(null);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showScheduledReportModal, setShowScheduledReportModal] =
  useState(false);
  const [exportPeriod, setExportPeriod] = useState('current');
  const [exportStartDate, setExportStartDate] = useState('');
  const [exportEndDate, setExportEndDate] = useState('');
  const [integrationConfig, setIntegrationConfig] = useState({
    software: '',
    apiKey: '',
    syncFrequency: 'daily',
    autoSync: true,
    syncOptions: {
      invoices: true,
      payments: true,
      expenses: true,
      patients: false
    }
  });
  const [scheduledReportConfig, setScheduledReportConfig] = useState({
    name: '',
    type: 'monthly',
    frequency: 'monthly',
    dayOfWeek: 'monday',
    dayOfMonth: '1',
    time: '09:00',
    format: 'pdf',
    recipients: [''],
    sections: {
      revenue: true,
      expenses: true,
      patients: true,
      treatments: true,
      payments: true,
      mutuelle: true
    },
    active: true
  });
  const [reportConfig, setReportConfig] = useState({
    type: 'monthly',
    period: 'current',
    format: 'pdf',
    sections: {
      revenue: true,
      expenses: true,
      patients: true,
      treatments: true,
      payments: true,
      mutuelle: true
    }
  });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  // Mock data for devis (quotes)
  const devis = [
  {
    id: 'DEV-2023-045',
    patient: 'Sophie Martin',
    date: '12/06/2023',
    validUntil: '12/07/2023',
    amount: '3 600 DT',
    status: 'pending',
    treatment: 'Orthodontie complète - Appareil fixe'
  },
  {
    id: 'DEV-2023-044',
    patient: 'Thomas Bernard',
    date: '10/06/2023',
    validUntil: '10/07/2023',
    amount: '4 800 DT',
    status: 'accepted',
    treatment: 'Orthodontie complète - Aligneurs'
  },
  {
    id: 'DEV-2023-043',
    patient: 'Emma Petit',
    date: '08/06/2023',
    validUntil: '08/07/2023',
    amount: '2 400 DT',
    status: 'declined',
    treatment: 'Traitement partiel - Appareil fixe'
  },
  {
    id: 'DEV-2023-042',
    patient: 'Lucas Dubois',
    date: '05/06/2023',
    validUntil: '05/07/2023',
    amount: '3 200 DT',
    status: 'expired',
    treatment: 'Orthodontie complète - Appareil fixe'
  }];

  // Mock data for financial reports
  const financialReports = [
  {
    id: 'REP-2023-006',
    name: 'Rapport mensuel - Mai 2023',
    type: 'monthly',
    date: '01/06/2023',
    period: 'Mai 2023',
    totalRevenue: '45 600 DT',
    newPatients: 12,
    completedTreatments: 8
  },
  {
    id: 'REP-2023-005',
    name: 'Rapport mensuel - Avril 2023',
    type: 'monthly',
    date: '01/05/2023',
    period: 'Avril 2023',
    totalRevenue: '42 800 DT',
    newPatients: 10,
    completedTreatments: 6
  },
  {
    id: 'REP-2023-004',
    name: 'Rapport trimestriel - T1 2023',
    type: 'quarterly',
    date: '01/04/2023',
    period: 'Janvier - Mars 2023',
    totalRevenue: '132 500 DT',
    newPatients: 35,
    completedTreatments: 22
  }];

  // Mock data for devis details
  const devisDetails = {
    id: 'DEV-2023-045',
    date: '12/06/2023',
    validUntil: '12/07/2023',
    patient: {
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      address: "123 Rue de l'Orthodontie, 75000 Paris"
    },
    treatment: 'Orthodontie complète - Appareil fixe',
    items: [
    {
      description: 'Bilan initial et diagnostic',
      amount: '200 DT'
    },
    {
      description: "Pose d'appareil fixe complet",
      amount: '800 DT'
    },
    {
      description: 'Suivi mensuel (24 mois)',
      amount: '2 400 DT'
    },
    {
      description: 'Dépose et contention',
      amount: '200 DT'
    }],

    subtotal: '3 600 DT',
    discount: '0 DT',
    total: '3 600 DT',
    notes: 'Devis valable 30 jours. Possibilité de paiement en plusieurs fois.',
    coverage: {
      type: 'CNAM',
      rate: '60%',
      estimatedCoverage: '2 160 DT',
      patientShare: '1 440 DT'
    },
    status: 'pending'
  };
  // Calculate statistics
  const stats = {
    totalDevis: devis.length,
    acceptedDevis: devis.filter((d) => d.status === 'accepted').length,
    pendingDevis: devis.filter((d) => d.status === 'pending').length,
    totalReports: financialReports.length,
    totalDevisAmount: '14 000 DT',
    acceptanceRate: '25%'
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            En attente
          </span>);

      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Accepté
          </span>);

      case 'declined':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Refusé
          </span>);

      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Expiré
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>);

    }
  };
  const handleNewDevis = () => {
    navigate('/administration/devis/nouveau');
  };
  const handleViewDevis = (devisId) => {
    setShowDevisDetails(true);
  };
  const handleCloseDevisDetails = () => {
    setShowDevisDetails(false);
  };
  const handleGenerateReport = () => {
    setShowGenerateReportModal(true);
    setReportGenerated(false);
  };
  const handleCloseGenerateReportModal = () => {
    setShowGenerateReportModal(false);
    setReportGenerated(false);
    setReportConfig({
      type: 'monthly',
      period: 'current',
      format: 'pdf',
      sections: {
        revenue: true,
        expenses: true,
        patients: true,
        treatments: true,
        payments: true,
        mutuelle: true
      }
    });
  };
  const handleReportConfigChange = (field, value) => {
    setReportConfig({
      ...reportConfig,
      [field]: value
    });
  };
  const handleToggleSection = (section) => {
    setReportConfig({
      ...reportConfig,
      sections: {
        ...reportConfig.sections,
        [section]: !reportConfig.sections[section]
      }
    });
  };
  const handleGenerateReportSubmit = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportGenerated(true);
    }, 2000);
  };
  const handleViewReportPreview = () => {
    setShowReportPreview(true);
  };
  const handleCloseReportPreview = () => {
    setShowReportPreview(false);
    setSelectedReportForPreview(null);
  };
  const handleViewFinancialReport = (reportId) => {
    const report = financialReports.find((r) => r.id === reportId);
    if (report) {
      setSelectedReportForPreview(report);
      // Set report config based on the selected report
      setReportConfig({
        type: report.type,
        period: 'current',
        format: 'pdf',
        sections: {
          revenue: true,
          expenses: true,
          patients: true,
          treatments: true,
          payments: true,
          mutuelle: true
        }
      });
      setShowReportPreview(true);
    }
  };
  const handleOpenIntegrationModal = () => {
    setShowIntegrationModal(true);
  };
  const handleCloseIntegrationModal = () => {
    setShowIntegrationModal(false);
  };
  const handleIntegrationConfigChange = (field, value) => {
    setIntegrationConfig({
      ...integrationConfig,
      [field]: value
    });
  };
  const handleToggleSyncOption = (option) => {
    setIntegrationConfig({
      ...integrationConfig,
      syncOptions: {
        ...integrationConfig.syncOptions,
        [option]: !integrationConfig.syncOptions[option]
      }
    });
  };
  const handleTestConnection = () => {
    // Simulate connection test
    alert('Test de connexion en cours...');
  };
  const handleSaveIntegration = () => {
    // Save integration configuration
    alert('Configuration enregistrée avec succès!');
    setShowIntegrationModal(false);
  };
  const handleOpenScheduledReportModal = () => {
    setShowScheduledReportModal(true);
  };
  const handleCloseScheduledReportModal = () => {
    setShowScheduledReportModal(false);
    // Reset form
    setScheduledReportConfig({
      name: '',
      type: 'monthly',
      frequency: 'monthly',
      dayOfWeek: 'monday',
      dayOfMonth: '1',
      time: '09:00',
      format: 'pdf',
      recipients: [''],
      sections: {
        revenue: true,
        expenses: true,
        patients: true,
        treatments: true,
        payments: true,
        mutuelle: true
      },
      active: true
    });
  };
  const handleScheduledReportConfigChange = (field, value) => {
    setScheduledReportConfig({
      ...scheduledReportConfig,
      [field]: value
    });
  };
  const handleToggleScheduledSection = (section) => {
    setScheduledReportConfig({
      ...scheduledReportConfig,
      sections: {
        ...scheduledReportConfig.sections,
        [section]: !scheduledReportConfig.sections[section]
      }
    });
  };
  const handleAddRecipient = () => {
    setScheduledReportConfig({
      ...scheduledReportConfig,
      recipients: [...scheduledReportConfig.recipients, '']
    });
  };
  const handleRemoveRecipient = (index) => {
    const newRecipients = scheduledReportConfig.recipients.filter(
      (_, i) => i !== index
    );
    setScheduledReportConfig({
      ...scheduledReportConfig,
      recipients: newRecipients.length > 0 ? newRecipients : ['']
    });
  };
  const handleRecipientChange = (index, value) => {
    const newRecipients = [...scheduledReportConfig.recipients];
    newRecipients[index] = value;
    setScheduledReportConfig({
      ...scheduledReportConfig,
      recipients: newRecipients
    });
  };
  const handleSaveScheduledReport = () => {
    // Save scheduled report configuration
    alert('Rapport programmé créé avec succès!');
    handleCloseScheduledReportModal();
  };
  const renderDevisTab = () =>
  <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Liste des devis</h4>
        <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={handleNewDevis}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

          <PlusIcon className="h-4 w-4 mr-2" />
          Nouveau devis
        </motion.button>
      </div>
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Traitement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {devis.map((item, index) =>
            <motion.tr
              key={item.id}
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
                backgroundColor: '#f9fafb',
                scale: 1.01
              }}
              className="cursor-pointer transition-all">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {item.patient.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {item.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.treatment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-blue-600">
                      {item.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex space-x-2 justify-end">
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() => handleViewDevis(item.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">

                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">

                        <MailIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">

                        <DownloadIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
            )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>;

  const renderReportsTab = () =>
  <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Rapports financiers</h4>
        <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={handleGenerateReport}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

          <PlusIcon className="h-4 w-4 mr-2" />
          Générer un rapport
        </motion.button>
      </div>
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date de génération
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chiffre d'affaires
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {financialReports.map((report, index) =>
            <motion.tr
              key={report.id}
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
                backgroundColor: '#f9fafb',
                scale: 1.01
              }}
              className="cursor-pointer transition-all">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.type === 'monthly' ? 'Mensuel' : 'Trimestriel'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {report.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {report.totalRevenue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex space-x-2 justify-end">
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    onClick={() => handleViewFinancialReport(report.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">

                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">

                        <DownloadIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">

                        <PrinterIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
            )}
            </tbody>
          </table>
        </div>
      </motion.div>
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
        transition={{
          delay: 0.1
        }}
        whileHover={{
          y: -5,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
            <h5 className="font-semibold text-gray-900 flex items-center">
              <FileBarChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              Exporter les données
            </h5>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label
                htmlFor="report-type"
                className="block text-sm font-medium text-gray-700 mb-1">

                  Type de rapport
                </label>
                <select
                id="report-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg">

                  <option>Rapport financier</option>
                  <option>Rapport de facturation</option>
                  <option>Rapport de paiements</option>
                  <option>Rapport de mutuelle</option>
                </select>
              </div>
              <div>
                <label
                htmlFor="period"
                className="block text-sm font-medium text-gray-700 mb-1">

                  Période
                </label>
                <select
                id="period"
                value={exportPeriod}
                onChange={(e) => setExportPeriod(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg">

                  <option value="current">Mois en cours</option>
                  <option value="previous">Mois précédent</option>
                  <option value="quarter">Trimestre en cours</option>
                  <option value="year">Année en cours</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <AnimatePresence>
                {exportPeriod === 'custom' &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}
                transition={{
                  duration: 0.3
                }}
                className="space-y-4 overflow-hidden">

                    <div>
                      <label
                    htmlFor="start-date"
                    className="block text-sm font-medium text-gray-700 mb-1">

                        Date de début
                      </label>
                      <input
                    type="date"
                    id="start-date"
                    value={exportStartDate}
                    onChange={(e) => setExportStartDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 text-base border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg bg-white shadow-sm transition-all" />

                    </div>
                    <div>
                      <label
                    htmlFor="end-date"
                    className="block text-sm font-medium text-gray-700 mb-1">

                        Date de fin
                      </label>
                      <input
                    type="date"
                    id="end-date"
                    value={exportEndDate}
                    onChange={(e) => setExportEndDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 text-base border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg bg-white shadow-sm transition-all" />

                    </div>
                  </motion.div>
              }
              </AnimatePresence>
              <div>
                <label
                htmlFor="format"
                className="block text-sm font-medium text-gray-700 mb-1">

                  Format
                </label>
                <select
                id="format"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg">

                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div className="pt-4">
                <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                type="button"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full justify-center">

                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Exporter
                </motion.button>
              </div>
            </div>
          </div>
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
        whileHover={{
          y: -5,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <h5 className="font-semibold text-gray-900 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-green-600" />
              Rapports programmés
            </h5>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <motion.div
              whileHover={{
                scale: 1.02
              }}
              className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">

                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="text-sm font-medium text-gray-900">
                      Rapport mensuel
                    </h6>
                    <p className="text-xs text-gray-500">
                      Le 1er de chaque mois
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Actif
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
              whileHover={{
                scale: 1.02
              }}
              className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">

                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="text-sm font-medium text-gray-900">
                      Rapport trimestriel
                    </h6>
                    <p className="text-xs text-gray-500">
                      Le 1er jour du trimestre
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Actif
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="mt-4">
              <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleOpenScheduledReportModal}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all w-full justify-center">

                <PlusIcon className="h-4 w-4 mr-2" />
                Ajouter un rapport programmé
              </motion.button>
            </div>
          </div>
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
          delay: 0.3
        }}
        whileHover={{
          y: -5,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
            <h5 className="font-semibold text-gray-900 flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-purple-600" />
              Intégration comptable
            </h5>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <motion.div
              whileHover={{
                scale: 1.02
              }}
              className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">

                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <ClipboardIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h6 className="text-sm font-medium text-gray-900">
                    Export comptable
                  </h6>
                  <p className="text-xs text-gray-500">Format compatible</p>
                </div>
              </motion.div>
              <motion.div
              whileHover={{
                scale: 1.02
              }}
              className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">

                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h6 className="text-sm font-medium text-gray-900">
                    Rapprochement bancaire
                  </h6>
                  <p className="text-xs text-gray-500">Synchronisation</p>
                </div>
              </motion.div>
            </div>
            <div className="mt-4">
              <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleOpenIntegrationModal}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all w-full justify-center">

                Configurer l'intégration
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;

  const renderDevisDetails = () =>
  <AnimatePresence>
      {showDevisDetails &&
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">

          <motion.div
        initial={{
          scale: 0.9,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        exit={{
          scale: 0.9,
          opacity: 0
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">

            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Devis {devisDetails.id}</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Créé le {devisDetails.date}
                </p>
              </div>
              <div className="flex space-x-2">
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
              title="Envoyer par email">

                  <MailIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
              title="Imprimer">

                  <PrinterIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
              title="Télécharger">

                  <DownloadIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleCloseDevisDetails}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
              title="Fermer">

                  <XCircleIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-gray-900">
                      OrthoBizz
                    </h2>
                    <p className="text-gray-600">123 Rue de l'Orthodontie</p>
                    <p className="text-gray-600">75000 Paris</p>
                    <p className="text-gray-600">contact@orthobizz.fr</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg text-gray-900">DEVIS</h3>
                    <p className="text-gray-600">N° {devisDetails.id}</p>
                    <p className="text-gray-600">Date: {devisDetails.date}</p>
                    <p className="text-gray-600">
                      Valable jusqu'au: {devisDetails.validUntil}
                    </p>
                  </div>
                </div>
                {/* Patient Info */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Devis pour:
                  </h4>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-medium">
                      {devisDetails.patient.name}
                    </p>
                    <p className="text-gray-600">
                      {devisDetails.patient.address}
                    </p>
                    <p className="text-gray-600">
                      {devisDetails.patient.email}
                    </p>
                    <p className="text-gray-600">
                      {devisDetails.patient.phone}
                    </p>
                  </div>
                </div>
                {/* Treatment Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Traitement: {devisDetails.treatment}
                  </h4>
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Montant
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {devisDetails.items.map((item, index) =>
                    <tr key={index}>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {item.description}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">
                              {item.amount}
                            </td>
                          </tr>
                    )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between py-2">
                      <dt className="text-sm text-gray-600">Sous-total:</dt>
                      <dd className="text-sm text-gray-900">
                        {devisDetails.subtotal}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-sm text-gray-600">Remise:</dt>
                      <dd className="text-sm text-gray-900">
                        {devisDetails.discount}
                      </dd>
                    </div>
                    <div className="flex justify-between py-3 border-t-2 border-gray-200 font-bold">
                      <dt className="text-gray-900">Total:</dt>
                      <dd className="text-blue-600 text-lg">
                        {devisDetails.total}
                      </dd>
                    </div>
                  </div>
                </div>
                {/* Coverage Estimation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Estimation de prise en charge
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">
                        Type de mutuelle:
                      </span>
                      <span className="text-sm font-medium text-green-900">
                        {devisDetails.coverage.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">
                        Taux de remboursement:
                      </span>
                      <span className="text-sm font-medium text-green-900">
                        {devisDetails.coverage.rate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">
                        Montant estimé remboursé:
                      </span>
                      <span className="text-sm font-medium text-green-900">
                        {devisDetails.coverage.estimatedCoverage}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                      <span className="text-sm font-medium text-green-800">
                        Reste à charge patient:
                      </span>
                      <span className="text-sm font-bold text-green-900">
                        {devisDetails.coverage.patientShare}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Notes */}
                {devisDetails.notes &&
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                    <p className="text-sm text-gray-600">
                      {devisDetails.notes}
                    </p>
                  </div>
            }
                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      Statut:
                    </span>
                    {getStatusBadge(devisDetails.status)}
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all">

                      <XCircleIcon className="h-4 w-4 mr-2" />
                      Refuser
                    </motion.button>
                    <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Accepter
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  const renderGenerateReportModal = () =>
  <AnimatePresence>
      {showGenerateReportModal &&
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <motion.div
        initial={{
          scale: 0.9,
          y: 20
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 20
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                    <BarChart3Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Générer un rapport financier
                    </h3>
                    <p className="text-purple-100 text-sm mt-1">
                      Configurez et générez votre rapport personnalisé
                    </p>
                  </div>
                </div>
                <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 90
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleCloseGenerateReportModal}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all">

                  <XCircleIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!reportGenerated ?
          <div className="space-y-6">
                  {/* Report Type */}
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
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">

                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <FileBarChartIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Type de rapport
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                {
                  id: 'monthly',
                  label: 'Mensuel',
                  icon: CalendarIcon
                },
                {
                  id: 'quarterly',
                  label: 'Trimestriel',
                  icon: PieChartIcon
                },
                {
                  id: 'annual',
                  label: 'Annuel',
                  icon: TrendingUpIcon
                },
                {
                  id: 'custom',
                  label: 'Personnalisé',
                  icon: SettingsIcon
                }].
                map((type) =>
                <motion.div
                  key={type.id}
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() =>
                  handleReportConfigChange('type', type.id)
                  }
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${reportConfig.type === type.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-blue-200 text-gray-700 hover:border-blue-400'}`}>

                          <type.icon
                    className={`h-6 w-6 mb-2 ${reportConfig.type === type.id ? 'text-white' : 'text-blue-600'}`} />

                          <p className="text-sm font-bold">{type.label}</p>
                        </motion.div>
                )}
                    </div>
                  </motion.div>
                  {/* Period Selection */}
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
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">

                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Période
                    </h4>
                    <select
                value={reportConfig.period}
                onChange={(e) =>
                handleReportConfigChange('period', e.target.value)
                }
                className="block w-full px-4 py-3 text-base border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg bg-white shadow-sm transition-all">

                      <option value="current">Période en cours</option>
                      <option value="previous">Période précédente</option>
                      <option value="last3months">3 derniers mois</option>
                      <option value="last6months">6 derniers mois</option>
                      <option value="ytd">Année en cours</option>
                      <option value="lastyear">Année précédente</option>
                      <option value="custom">Personnalisé</option>
                    </select>
                  </motion.div>
                  {/* Sections to Include */}
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">

                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <ClipboardIcon className="h-5 w-5 mr-2 text-green-600" />
                      Sections à inclure
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                {
                  id: 'revenue',
                  label: "Chiffre d'affaires",
                  icon: DollarSignIcon
                },
                {
                  id: 'expenses',
                  label: 'Dépenses',
                  icon: TrendingUpIcon
                },
                {
                  id: 'patients',
                  label: 'Statistiques patients',
                  icon: UserIcon
                },
                {
                  id: 'treatments',
                  label: 'Traitements',
                  icon: ActivityIcon
                },
                {
                  id: 'payments',
                  label: 'Paiements',
                  icon: CreditCardIcon
                },
                {
                  id: 'mutuelle',
                  label: 'Mutuelles',
                  icon: AwardIcon
                }].
                map((section) =>
                <motion.div
                  key={section.id}
                  whileHover={{
                    scale: 1.01
                  }}
                  onClick={() => handleToggleSection(section.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${reportConfig.sections[section.id] ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}>

                          <div className="flex items-center">
                            <div
                      className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center mr-3 transition-all ${reportConfig.sections[section.id] ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>

                              {reportConfig.sections[section.id] &&
                      <CheckCircleIcon className="h-4 w-4 text-white" />
                      }
                            </div>
                            <section.icon
                      className={`h-5 w-5 mr-2 ${reportConfig.sections[section.id] ? 'text-green-600' : 'text-gray-400'}`} />

                            <p className="text-sm font-bold text-gray-900">
                              {section.label}
                            </p>
                          </div>
                        </motion.div>
                )}
                    </div>
                  </motion.div>
                  {/* Format Selection */}
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
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-100">

                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <FileTextIcon className="h-5 w-5 mr-2 text-orange-600" />
                      Format du rapport
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                {
                  id: 'pdf',
                  label: 'PDF',
                  description: 'Document imprimable'
                },
                {
                  id: 'excel',
                  label: 'Excel',
                  description: 'Feuille de calcul'
                },
                {
                  id: 'csv',
                  label: 'CSV',
                  description: 'Données brutes'
                }].
                map((format) =>
                <motion.div
                  key={format.id}
                  whileHover={{
                    scale: 1.02,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() =>
                  handleReportConfigChange('format', format.id)
                  }
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${reportConfig.format === format.id ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : 'bg-white border-orange-200 text-gray-700 hover:border-orange-400'}`}>

                          <FileTextIcon
                    className={`h-8 w-8 mb-2 ${reportConfig.format === format.id ? 'text-white' : 'text-orange-600'}`} />

                          <p className="text-sm font-bold">{format.label}</p>
                          <p
                    className={`text-xs mt-1 ${reportConfig.format === format.id ? 'text-orange-100' : 'text-gray-600'}`}>

                            {format.description}
                          </p>
                        </motion.div>
                )}
                    </div>
                  </motion.div>
                  {/* Generate Button */}
                  <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={handleGenerateReportSubmit}
              disabled={isGeneratingReport}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all">

                    {isGeneratingReport ?
              <span className="flex items-center justify-center">
                        <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />

                        Génération en cours...
                      </span> :

              <span className="flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Générer le rapport
                      </span>
              }
                  </motion.button>
                </div> :

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            className="space-y-6">

                  {/* Success Message */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200 text-center">
                    <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
                className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg">

                      <CheckCircleIcon className="h-12 w-12 text-white" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      Rapport généré avec succès!
                    </h4>
                    <p className="text-sm text-gray-600">
                      Votre rapport financier est prêt à être téléchargé ou
                      partagé
                    </p>
                  </div>
                  {/* Report Preview */}
                  <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md">
                    <h5 className="text-lg font-bold text-gray-900 mb-4">
                      Aperçu du rapport
                    </h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className="text-sm font-bold text-gray-900">
                          {reportConfig.type === 'monthly' && 'Mensuel'}
                          {reportConfig.type === 'quarterly' && 'Trimestriel'}
                          {reportConfig.type === 'annual' && 'Annuel'}
                          {reportConfig.type === 'custom' && 'Personnalisé'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm text-gray-600">Format:</span>
                        <span className="text-sm font-bold text-gray-900 uppercase">
                          {reportConfig.format}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm text-gray-600">
                          Sections incluses:
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {
                    Object.values(reportConfig.sections).filter(Boolean).
                    length
                    }{' '}
                          / 6
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-md">

                      <DownloadIcon className="h-5 w-5 mr-2" />
                      Télécharger
                    </motion.button>
                    <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={handleViewReportPreview}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-md">

                      <EyeIcon className="h-5 w-5 mr-2" />
                      Aperçu
                    </motion.button>
                    <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-md">

                      <PrinterIcon className="h-5 w-5 mr-2" />
                      Imprimer
                    </motion.button>
                    <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-blue-200 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-md">

                      <MailIcon className="h-5 w-5 mr-2" />
                      Envoyer par email
                    </motion.button>
                  </div>
                </motion.div>
          }
            </div>
            {/* Footer */}
            <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-end">
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleCloseGenerateReportModal}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  {reportGenerated ? 'Fermer' : 'Annuler'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  const renderReportPreviewModal = () =>
  <AnimatePresence>
      {showReportPreview &&
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <motion.div
        initial={{
          scale: 0.9,
          y: 20
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 20
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                    <FileTextIcon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedReportForPreview ?
                  selectedReportForPreview.name :
                  'Aperçu du rapport financier'}
                    </h3>
                    <p className="text-purple-100 text-sm mt-1">
                      {selectedReportForPreview ?
                  `Période: ${selectedReportForPreview.period}` :
                  `Rapport ${reportConfig.type === 'monthly' && 'mensuel'}${reportConfig.type === 'quarterly' && 'trimestriel'}${reportConfig.type === 'annual' && 'annuel'}${reportConfig.type === 'custom' && 'personnalisé'}`}{' '}
                      - {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
                title="Imprimer">

                    <PrinterIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
                title="Télécharger">

                    <DownloadIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                whileHover={{
                  scale: 1.1,
                  rotate: 90
                }}
                whileTap={{
                  scale: 0.9
                }}
                onClick={handleCloseReportPreview}
                className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
                title="Fermer">

                    <XCircleIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-purple-50">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Report Header */}
                <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Cabinet OrthoBizz
                      </h1>
                      <p className="text-gray-600">
                        123 Rue de l'Orthodontie, 75000 Paris
                      </p>
                      <p className="text-gray-600">contact@orthobizz.fr</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md mb-2">
                        <p className="text-xs font-medium">RAPPORT FINANCIER</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {selectedReportForPreview ?
                    `Référence: ${selectedReportForPreview.id}` :
                    `Période: ${reportConfig.period === 'current' && 'En cours'}${reportConfig.period === 'previous' && 'Précédente'}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        Généré le{' '}
                        {selectedReportForPreview ?
                    selectedReportForPreview.date :
                    new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
                {/* Revenue Section */}
                {reportConfig.sections.revenue &&
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
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100">

                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                        <DollarSignIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Chiffre d'affaires
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <p className="text-sm text-green-700 font-medium mb-1">
                          Total
                        </p>
                        <p className="text-3xl font-bold text-green-900">
                          {selectedReportForPreview ?
                    selectedReportForPreview.totalRevenue :
                    '45 600 DT'}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          +12% vs mois précédent
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium mb-1">
                          Consultations
                        </p>
                        <p className="text-3xl font-bold text-blue-900">
                          18 400 DT
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          142 consultations
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                        <p className="text-sm text-purple-700 font-medium mb-1">
                          Traitements
                        </p>
                        <p className="text-3xl font-bold text-purple-900">
                          27 200 DT
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          24 traitements actifs
                        </p>
                      </div>
                    </div>
                  </motion.div>
            }
                {/* Expenses Section */}
                {reportConfig.sections.expenses &&
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
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100">

                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mr-3">
                        <TrendingUpIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Dépenses
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
                        <p className="text-sm text-red-700 font-medium mb-1">
                          Total
                        </p>
                        <p className="text-2xl font-bold text-red-900">
                          12 800 DT
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Matériel
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          5 200 DT
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Personnel
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          6 400 DT
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Autres
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          1 200 DT
                        </p>
                      </div>
                    </div>
                  </motion.div>
            }
                {/* Patients Section */}
                {reportConfig.sections.patients &&
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
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">

                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                        <UserIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Statistiques patients
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium mb-1">
                          Nouveaux patients
                        </p>
                        <p className="text-3xl font-bold text-blue-900">
                          {selectedReportForPreview ?
                    selectedReportForPreview.newPatients :
                    '12'}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          +3 vs mois précédent
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                        <p className="text-sm text-purple-700 font-medium mb-1">
                          Patients actifs
                        </p>
                        <p className="text-3xl font-bold text-purple-900">87</p>
                        <p className="text-xs text-purple-600 mt-1">
                          En traitement
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <p className="text-sm text-green-700 font-medium mb-1">
                          Taux de satisfaction
                        </p>
                        <p className="text-3xl font-bold text-green-900">96%</p>
                        <p className="text-xs text-green-600 mt-1">
                          Basé sur 45 avis
                        </p>
                      </div>
                    </div>
                  </motion.div>
            }
                {/* Treatments Section */}
                {reportConfig.sections.treatments &&
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
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">

                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                        <ActivityIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Traitements
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Traitements débutés
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          8
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Traitements terminés
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {selectedReportForPreview ?
                    selectedReportForPreview.completedTreatments :
                    '6'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Durée moyenne
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          18 mois
                        </span>
                      </div>
                    </div>
                  </motion.div>
            }
                {/* Payments Section */}
                {reportConfig.sections.payments &&
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
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">

                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mr-3">
                        <CreditCardIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Paiements
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <p className="text-sm text-green-700 font-medium mb-1">
                          Paiements reçus
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          42 300 DT
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-700 font-medium mb-1">
                          En attente
                        </p>
                        <p className="text-2xl font-bold text-yellow-900">
                          8 400 DT
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
                        <p className="text-sm text-red-700 font-medium mb-1">
                          En retard
                        </p>
                        <p className="text-2xl font-bold text-red-900">
                          2 100 DT
                        </p>
                      </div>
                    </div>
                  </motion.div>
            }
                {/* Mutuelle Section */}
                {reportConfig.sections.mutuelle &&
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
                delay: 0.6
              }}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100">

                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
                        <AwardIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Mutuelles
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Remboursements reçus
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          28 600 DT
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          FSE envoyées
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          142
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          Taux de remboursement moyen
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          62%
                        </span>
                      </div>
                    </div>
                  </motion.div>
            }
                {/* Summary */}
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
                delay: 0.7
              }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Résumé financier
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="text-base font-medium text-gray-700">
                        Chiffre d'affaires total
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {selectedReportForPreview ?
                    selectedReportForPreview.totalRevenue :
                    '45 600 DT'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <span className="text-base font-medium text-gray-700">
                        Dépenses totales
                      </span>
                      <span className="text-xl font-bold text-red-600">
                        -12 800 DT
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
                      <span className="text-base font-bold">Bénéfice net</span>
                      <span className="text-2xl font-bold">32 800 DT</span>
                    </div>
                  </div>
                </motion.div>
                {/* Footer */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        Rapport généré automatiquement
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cabinet OrthoBizz -{' '}
                        {selectedReportForPreview ?
                    selectedReportForPreview.date :
                    new Date().toLocaleDateString()}{' '}
                        à {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        Dr. Dupont
                      </p>
                      <p className="text-xs text-gray-600">Orthodontiste</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer Actions */}
            <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-end space-x-3">
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleCloseReportPreview}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  Fermer
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all">

                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Télécharger PDF
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  const renderIntegrationModal = () =>
  <AnimatePresence>
      {showIntegrationModal &&
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <motion.div
        initial={{
          scale: 0.9,
          y: 20
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 20
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                    <SettingsIcon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Configuration de l'intégration
                    </h3>
                    <p className="text-purple-100 text-sm mt-1">
                      Connectez votre logiciel comptable
                    </p>
                  </div>
                </div>
                <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 90
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleCloseIntegrationModal}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all">

                  <XCircleIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Software Selection */}
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
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ClipboardIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Logiciel comptable
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                {
                  id: 'sage',
                  label: 'Sage'
                },
                {
                  id: 'cegid',
                  label: 'Cegid'
                },
                {
                  id: 'ebp',
                  label: 'EBP'
                },
                {
                  id: 'quickbooks',
                  label: 'QuickBooks'
                }].
                map((software) =>
                <motion.div
                  key={software.id}
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() =>
                  handleIntegrationConfigChange('software', software.id)
                  }
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${integrationConfig.software === software.id ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-blue-200 text-gray-700 hover:border-blue-400'}`}>

                        <p className="text-sm font-bold text-center">
                          {software.label}
                        </p>
                      </motion.div>
                )}
                  </div>
                </motion.div>
                {/* API Configuration */}
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
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ZapIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Configuration API
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clé API
                      </label>
                      <input
                    type="password"
                    value={integrationConfig.apiKey}
                    onChange={(e) =>
                    handleIntegrationConfigChange(
                      'apiKey',
                      e.target.value
                    )
                    }
                    placeholder="Entrez votre clé API"
                    className="block w-full px-4 py-3 text-base border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg bg-white shadow-sm transition-all" />

                    </div>
                    <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={handleTestConnection}
                  className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-all">

                      <SparklesIcon className="h-4 w-4 mr-2" />
                      Tester la connexion
                    </motion.button>
                  </div>
                </motion.div>
                {/* Sync Options */}
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ActivityIcon className="h-5 w-5 mr-2 text-green-600" />
                    Options de synchronisation
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Synchronisation automatique
                      </label>
                      <motion.button
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={() =>
                    handleIntegrationConfigChange(
                      'autoSync',
                      !integrationConfig.autoSync
                    )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${integrationConfig.autoSync ? 'bg-green-500' : 'bg-gray-300'}`}>

                        <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${integrationConfig.autoSync ? 'translate-x-6' : 'translate-x-1'}`} />

                      </motion.button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fréquence de synchronisation
                      </label>
                      <select
                    value={integrationConfig.syncFrequency}
                    onChange={(e) =>
                    handleIntegrationConfigChange(
                      'syncFrequency',
                      e.target.value
                    )
                    }
                    className="block w-full px-4 py-3 text-base border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg bg-white shadow-sm transition-all">

                        <option value="realtime">Temps réel</option>
                        <option value="hourly">Toutes les heures</option>
                        <option value="daily">Quotidienne</option>
                        <option value="weekly">Hebdomadaire</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
                {/* Data to Sync */}
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
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileTextIcon className="h-5 w-5 mr-2 text-orange-600" />
                    Données à synchroniser
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                {
                  id: 'invoices',
                  label: 'Factures',
                  icon: FileTextIcon
                },
                {
                  id: 'payments',
                  label: 'Paiements',
                  icon: CreditCardIcon
                },
                {
                  id: 'expenses',
                  label: 'Dépenses',
                  icon: TrendingUpIcon
                },
                {
                  id: 'patients',
                  label: 'Patients',
                  icon: UserIcon
                }].
                map((option) =>
                <motion.div
                  key={option.id}
                  whileHover={{
                    scale: 1.01
                  }}
                  onClick={() => handleToggleSyncOption(option.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${integrationConfig.syncOptions[option.id] ? 'bg-orange-50 border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}>

                        <div className="flex items-center">
                          <div
                      className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center mr-3 transition-all ${integrationConfig.syncOptions[option.id] ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-300'}`}>

                            {integrationConfig.syncOptions[option.id] &&
                      <CheckCircleIcon className="h-4 w-4 text-white" />
                      }
                          </div>
                          <option.icon
                      className={`h-5 w-5 mr-2 ${integrationConfig.syncOptions[option.id] ? 'text-orange-600' : 'text-gray-400'}`} />

                          <p className="text-sm font-bold text-gray-900">
                            {option.label}
                          </p>
                        </div>
                      </motion.div>
                )}
                  </div>
                </motion.div>
              </div>
            </div>
            {/* Footer */}
            <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-end space-x-3">
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleCloseIntegrationModal}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  Annuler
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleSaveIntegration}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all">

                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Enregistrer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  const renderScheduledReportModal = () =>
  <AnimatePresence>
      {showScheduledReportModal &&
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <motion.div
        initial={{
          scale: 0.9,
          y: 20
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 20
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">

                    <ClockIcon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Nouveau rapport programmé
                    </h3>
                    <p className="text-green-100 text-sm mt-1">
                      Configurez un rapport automatique récurrent
                    </p>
                  </div>
                </div>
                <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 90
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleCloseScheduledReportModal}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all">

                  <XCircleIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Report Name */}
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
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileTextIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Nom du rapport
                  </h4>
                  <input
                type="text"
                value={scheduledReportConfig.name}
                onChange={(e) =>
                handleScheduledReportConfigChange('name', e.target.value)
                }
                placeholder="Ex: Rapport mensuel automatique"
                className="block w-full px-4 py-3 text-base border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg bg-white shadow-sm transition-all" />

                </motion.div>
                {/* Report Type and Frequency */}
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
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Fréquence
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                {
                  id: 'daily',
                  label: 'Quotidien'
                },
                {
                  id: 'weekly',
                  label: 'Hebdomadaire'
                },
                {
                  id: 'monthly',
                  label: 'Mensuel'
                },
                {
                  id: 'quarterly',
                  label: 'Trimestriel'
                },
                {
                  id: 'yearly',
                  label: 'Annuel'
                }].
                map((freq) =>
                <motion.div
                  key={freq.id}
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() =>
                  handleScheduledReportConfigChange(
                    'frequency',
                    freq.id
                  )
                  }
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${scheduledReportConfig.frequency === freq.id ? 'bg-purple-500 border-purple-500 text-white' : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400'}`}>

                        <p className="text-sm font-bold text-center">
                          {freq.label}
                        </p>
                      </motion.div>
                )}
                  </div>
                  {/* Schedule Details */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scheduledReportConfig.frequency === 'weekly' &&
                <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jour de la semaine
                        </label>
                        <select
                    value={scheduledReportConfig.dayOfWeek}
                    onChange={(e) =>
                    handleScheduledReportConfigChange(
                      'dayOfWeek',
                      e.target.value
                    )
                    }
                    className="block w-full px-4 py-3 text-base border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg bg-white shadow-sm transition-all">

                          <option value="monday">Lundi</option>
                          <option value="tuesday">Mardi</option>
                          <option value="wednesday">Mercredi</option>
                          <option value="thursday">Jeudi</option>
                          <option value="friday">Vendredi</option>
                          <option value="saturday">Samedi</option>
                          <option value="sunday">Dimanche</option>
                        </select>
                      </div>
                }
                    {(scheduledReportConfig.frequency === 'monthly' ||
                scheduledReportConfig.frequency === 'quarterly' ||
                scheduledReportConfig.frequency === 'yearly') &&
                <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jour du mois
                        </label>
                        <select
                    value={scheduledReportConfig.dayOfMonth}
                    onChange={(e) =>
                    handleScheduledReportConfigChange(
                      'dayOfMonth',
                      e.target.value
                    )
                    }
                    className="block w-full px-4 py-3 text-base border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg bg-white shadow-sm transition-all">

                          {Array.from(
                      {
                        length: 28
                      },
                      (_, i) => i + 1
                    ).map((day) =>
                    <option key={day} value={day.toString()}>
                              {day}
                            </option>
                    )}
                          <option value="last">Dernier jour du mois</option>
                        </select>
                      </div>
                }
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure d'envoi
                      </label>
                      <input
                    type="time"
                    value={scheduledReportConfig.time}
                    onChange={(e) =>
                    handleScheduledReportConfigChange(
                      'time',
                      e.target.value
                    )
                    }
                    className="block w-full px-4 py-3 text-base border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg bg-white shadow-sm transition-all" />

                    </div>
                  </div>
                </motion.div>
                {/* Recipients */}
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
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MailIcon className="h-5 w-5 mr-2 text-orange-600" />
                    Destinataires
                  </h4>
                  <div className="space-y-3">
                    {scheduledReportConfig.recipients.map(
                  (recipient, index) =>
                  <div key={index} className="flex gap-2">
                          <input
                      type="email"
                      value={recipient}
                      onChange={(e) =>
                      handleRecipientChange(index, e.target.value)
                      }
                      placeholder="email@exemple.com"
                      className="flex-1 px-4 py-3 text-base border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-lg bg-white shadow-sm transition-all" />

                          {scheduledReportConfig.recipients.length > 1 &&
                    <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={() => handleRemoveRecipient(index)}
                      className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all">

                              <XCircleIcon className="h-5 w-5" />
                            </motion.button>
                    }
                        </div>

                )}
                    <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={handleAddRecipient}
                  className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold hover:bg-orange-200 transition-all">

                      <PlusIcon className="h-4 w-4 mr-2" />
                      Ajouter un destinataire
                    </motion.button>
                  </div>
                </motion.div>
                {/* Sections to Include */}
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ClipboardIcon className="h-5 w-5 mr-2 text-green-600" />
                    Sections à inclure
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                {
                  id: 'revenue',
                  label: "Chiffre d'affaires",
                  icon: DollarSignIcon
                },
                {
                  id: 'expenses',
                  label: 'Dépenses',
                  icon: TrendingUpIcon
                },
                {
                  id: 'patients',
                  label: 'Statistiques patients',
                  icon: UserIcon
                },
                {
                  id: 'treatments',
                  label: 'Traitements',
                  icon: ActivityIcon
                },
                {
                  id: 'payments',
                  label: 'Paiements',
                  icon: CreditCardIcon
                },
                {
                  id: 'mutuelle',
                  label: 'Mutuelles',
                  icon: AwardIcon
                }].
                map((section) =>
                <motion.div
                  key={section.id}
                  whileHover={{
                    scale: 1.01
                  }}
                  onClick={() => handleToggleScheduledSection(section.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${scheduledReportConfig.sections[section.id] ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}>

                        <div className="flex items-center">
                          <div
                      className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center mr-3 transition-all ${scheduledReportConfig.sections[section.id] ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>

                            {scheduledReportConfig.sections[section.id] &&
                      <CheckCircleIcon className="h-4 w-4 text-white" />
                      }
                          </div>
                          <section.icon
                      className={`h-5 w-5 mr-2 ${scheduledReportConfig.sections[section.id] ? 'text-green-600' : 'text-gray-400'}`} />

                          <p className="text-sm font-bold text-gray-900">
                            {section.label}
                          </p>
                        </div>
                      </motion.div>
                )}
                  </div>
                </motion.div>
                {/* Format Selection */}
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
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">

                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileTextIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Format du rapport
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                {
                  id: 'pdf',
                  label: 'PDF',
                  description: 'Document imprimable'
                },
                {
                  id: 'excel',
                  label: 'Excel',
                  description: 'Feuille de calcul'
                },
                {
                  id: 'csv',
                  label: 'CSV',
                  description: 'Données brutes'
                }].
                map((format) =>
                <motion.div
                  key={format.id}
                  whileHover={{
                    scale: 1.02,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() =>
                  handleScheduledReportConfigChange('format', format.id)
                  }
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${scheduledReportConfig.format === format.id ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg' : 'bg-white border-indigo-200 text-gray-700 hover:border-indigo-400'}`}>

                        <FileTextIcon
                    className={`h-8 w-8 mb-2 ${scheduledReportConfig.format === format.id ? 'text-white' : 'text-indigo-600'}`} />

                        <p className="text-sm font-bold">{format.label}</p>
                        <p
                    className={`text-xs mt-1 ${scheduledReportConfig.format === format.id ? 'text-indigo-100' : 'text-gray-600'}`}>

                          {format.description}
                        </p>
                      </motion.div>
                )}
                  </div>
                </motion.div>
              </div>
            </div>
            {/* Footer */}
            <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-end space-x-3">
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleCloseScheduledReportModal}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all">

                  Annuler
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleSaveScheduledReport}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all">

                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Créer le rapport programmé
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
        {
          label: 'Devis totaux',
          value: String(stats.totalDevis),
          icon: FileTextIcon,
          color: 'orange',
          subtext: 'toutes périodes'
        },
        {
          label: 'Acceptés',
          value: String(stats.acceptedDevis),
          icon: CheckCircleIcon,
          color: 'green',
          subtext: 'taux: ' + stats.acceptanceRate
        },
        {
          label: 'Montant total',
          value: stats.totalDevisAmount,
          icon: DollarSignIcon,
          color: 'blue',
          subtext: 'valeur des devis'
        },
        {
          label: 'Rapports générés',
          value: String(stats.totalReports),
          icon: BarChart3Icon,
          color: 'purple',
          subtext: 'rapports disponibles'
        }].
        map((stat, index) =>
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
          className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start justify-between relative overflow-hidden group hover:border-indigo-300 transition-colors">

            <div
            className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500`} />

            <div className="pl-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <h4 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
                {stat.value}
              </h4>
              <span className="text-xs text-slate-400 mt-1 block">
                {stat.subtext}
              </span>
            </div>
            <div
            className={`p-2 rounded-md bg-${stat.color}-50 text-${stat.color}-600 opacity-80 group-hover:scale-110 transition-transform`}>

              <stat.icon className="w-5 h-5" />
            </div>
          </motion.div>
        )}
      </div>
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
          delay: 0.3
        }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('devis')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'devis' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2" />
                Devis
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('reports')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'reports' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <ClipboardIcon className="h-5 w-5 mr-2" />
                Rapports financiers
              </div>
            </motion.button>
          </nav>
        </div>
        <div className="p-6">
          {selectedTab === 'devis' && renderDevisTab()}
          {selectedTab === 'reports' && renderReportsTab()}
        </div>
      </motion.div>
      {renderDevisDetails()}
      {renderGenerateReportModal()}
      {renderReportPreviewModal()}
      {renderIntegrationModal()}
      {renderScheduledReportModal()}
      {showNewDevis && <NouveauDevis onClose={() => setShowNewDevis(false)} />}
    </div>);

};
export default Rapports;