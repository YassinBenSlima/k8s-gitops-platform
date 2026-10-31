import React, { useState } from 'react';
import {
  CreditCardIcon,
  QrCodeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpRightIcon,
  ReceiptIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
  RefreshCwIcon,
  WrenchIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ActivityIcon,
  SparklesIcon,
  ZapIcon,
  ShieldIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  DownloadIcon,
  PrinterIcon,
  ShareIcon,
  EditIcon } from
'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const Paiements = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showPaymentPlanDetails, setShowPaymentPlanDetails] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [configuringMethod, setConfiguringMethod] = useState(null);
  const [paymentMethodsList, setPaymentMethodsList] = useState([
  {
    id: 1,
    name: 'Carte bancaire',
    type: 'card',
    provider: 'Stripe',
    status: 'active',
    fees: '2.9% + 0.30 DT',
    apiKey: '',
    webhookUrl: ''
  },
  {
    id: 2,
    name: 'Virement bancaire',
    type: 'bank_transfer',
    provider: 'Manuel',
    status: 'active',
    fees: '0 DT',
    apiKey: '',
    webhookUrl: ''
  },
  {
    id: 3,
    name: 'Espèces',
    type: 'cash',
    provider: 'Manuel',
    status: 'active',
    fees: '0 DT',
    apiKey: '',
    webhookUrl: ''
  },
  {
    id: 4,
    name: 'Paiement mobile',
    type: 'mobile',
    provider: 'En attente',
    status: 'inactive',
    fees: '1.5%',
    apiKey: '',
    webhookUrl: ''
  }]
  );
  const [newMethodForm, setNewMethodForm] = useState({
    name: '',
    type: 'card',
    provider: '',
    fees: '',
    status: 'active'
  });
  // Mock data for transactions
  const transactions = [
  {
    id: 'TRX-2023-156',
    patient: 'Sophie Martin',
    date: '12/06/2023',
    amount: '750 DT',
    status: 'completed',
    method: 'card',
    invoice: 'INV-2023-156'
  },
  {
    id: 'TRX-2023-155',
    patient: 'Thomas Bernard',
    date: '10/06/2023',
    amount: '600 DT',
    status: 'completed',
    method: 'bank_transfer',
    invoice: 'INV-2023-155'
  },
  {
    id: 'TRX-2023-154',
    patient: 'Emma Petit',
    date: '08/06/2023',
    amount: '450 DT',
    status: 'pending',
    method: 'card',
    invoice: 'INV-2023-154'
  },
  {
    id: 'TRX-2023-153',
    patient: 'Lucas Dubois',
    date: '05/06/2023',
    amount: '900 DT',
    status: 'failed',
    method: 'card',
    invoice: 'INV-2023-153'
  },
  {
    id: 'TRX-2023-152',
    patient: 'Nathan Robert',
    date: '02/06/2023',
    amount: '350 DT',
    status: 'completed',
    method: 'cash',
    invoice: 'INV-2023-152'
  },
  {
    id: 'TRX-2023-151',
    patient: 'Léa Richard',
    date: '01/06/2023',
    amount: '450 DT',
    status: 'completed',
    method: 'card',
    invoice: 'INV-2023-151'
  }];

  // Mock data for payment methods
  const paymentMethods = [
  {
    id: 1,
    name: 'Carte bancaire',
    type: 'card',
    provider: 'Stripe',
    status: 'active',
    fees: '2.9% + 0.30 DT'
  },
  {
    id: 2,
    name: 'Virement bancaire',
    type: 'bank_transfer',
    provider: 'Manuel',
    status: 'active',
    fees: '0 DT'
  },
  {
    id: 3,
    name: 'Espèces',
    type: 'cash',
    provider: 'Manuel',
    status: 'active',
    fees: '0 DT'
  },
  {
    id: 4,
    name: 'Paiement mobile',
    type: 'mobile',
    provider: 'En attente',
    status: 'inactive',
    fees: '1.5%'
  }];

  // Mock data for payment plans with more details
  const paymentPlans = [
  {
    id: 'PLAN-2023-045',
    patient: {
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      address: "123 Rue de l'Orthodontie, 75000 Paris"
    },
    treatment: 'Orthodontie complète - Appareil fixe',
    totalAmount: '3600 DT',
    remainingAmount: '2700 DT',
    paidAmount: '900 DT',
    numberOfInstallments: 12,
    frequency: 'monthly',
    installmentAmount: '300 DT',
    startDate: '15/01/2023',
    nextPayment: {
      date: '15/07/2023',
      amount: '300 DT'
    },
    status: 'active',
    paymentMethod: 'card',
    autoCharge: true,
    sendReminders: true,
    reminderDays: 3,
    paymentHistory: [
    {
      id: 1,
      date: '15/01/2023',
      amount: '300 DT',
      status: 'completed',
      method: 'card'
    },
    {
      id: 2,
      date: '15/02/2023',
      amount: '300 DT',
      status: 'completed',
      method: 'card'
    },
    {
      id: 3,
      date: '15/03/2023',
      amount: '300 DT',
      status: 'completed',
      method: 'card'
    }],

    upcomingPayments: [
    {
      id: 4,
      date: '15/07/2023',
      amount: '300 DT',
      status: 'pending'
    },
    {
      id: 5,
      date: '15/08/2023',
      amount: '300 DT',
      status: 'scheduled'
    },
    {
      id: 6,
      date: '15/09/2023',
      amount: '300 DT',
      status: 'scheduled'
    }],

    notes: 'Plan de paiement standard pour traitement orthodontique complet'
  },
  {
    id: 'PLAN-2023-044',
    patient: {
      name: 'Thomas Bernard',
      email: 'thomas.bernard@email.com',
      phone: '06 23 45 67 89',
      address: '456 Avenue des Aligneurs, 75001 Paris'
    },
    treatment: 'Orthodontie complète - Aligneurs',
    totalAmount: '4800 DT',
    remainingAmount: '3600 DT',
    paidAmount: '1200 DT',
    numberOfInstallments: 12,
    frequency: 'monthly',
    installmentAmount: '400 DT',
    startDate: '20/02/2023',
    nextPayment: {
      date: '20/07/2023',
      amount: '400 DT'
    },
    status: 'active',
    paymentMethod: 'bank_transfer',
    autoCharge: false,
    sendReminders: true,
    reminderDays: 5,
    paymentHistory: [
    {
      id: 1,
      date: '20/02/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'bank_transfer'
    },
    {
      id: 2,
      date: '20/03/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'bank_transfer'
    },
    {
      id: 3,
      date: '20/04/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'bank_transfer'
    }],

    upcomingPayments: [
    {
      id: 4,
      date: '20/07/2023',
      amount: '400 DT',
      status: 'pending'
    },
    {
      id: 5,
      date: '20/08/2023',
      amount: '400 DT',
      status: 'scheduled'
    },
    {
      id: 6,
      date: '20/09/2023',
      amount: '400 DT',
      status: 'scheduled'
    }],

    notes: 'Traitement par aligneurs invisibles - Paiement par virement'
  },
  {
    id: 'PLAN-2023-043',
    patient: {
      name: 'Lucas Dubois',
      email: 'lucas.dubois@email.com',
      phone: '06 34 56 78 90',
      address: '789 Boulevard du Sourire, 75002 Paris'
    },
    treatment: 'Orthodontie complète - Appareil fixe',
    totalAmount: '3200 DT',
    remainingAmount: '1600 DT',
    paidAmount: '1600 DT',
    numberOfInstallments: 8,
    frequency: 'monthly',
    installmentAmount: '400 DT',
    startDate: '10/01/2023',
    nextPayment: {
      date: '10/07/2023',
      amount: '400 DT'
    },
    status: 'active',
    paymentMethod: 'card',
    autoCharge: true,
    sendReminders: true,
    reminderDays: 3,
    paymentHistory: [
    {
      id: 1,
      date: '10/01/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'card'
    },
    {
      id: 2,
      date: '10/02/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'card'
    },
    {
      id: 3,
      date: '10/03/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'card'
    },
    {
      id: 4,
      date: '10/04/2023',
      amount: '400 DT',
      status: 'completed',
      method: 'card'
    }],

    upcomingPayments: [
    {
      id: 5,
      date: '10/07/2023',
      amount: '400 DT',
      status: 'pending'
    },
    {
      id: 6,
      date: '10/08/2023',
      amount: '400 DT',
      status: 'scheduled'
    },
    {
      id: 7,
      date: '10/09/2023',
      amount: '400 DT',
      status: 'scheduled'
    },
    {
      id: 8,
      date: '10/10/2023',
      amount: '400 DT',
      status: 'scheduled'
    }],

    notes: 'Plan accéléré sur 8 mois'
  }];

  // Calculate statistics
  const stats = {
    totalTransactions: transactions.length,
    completedTransactions: transactions.filter((t) => t.status === 'completed').
    length,
    pendingTransactions: transactions.filter((t) => t.status === 'pending').
    length,
    totalRevenue: '3500 DT',
    activePaymentPlans: paymentPlans.length,
    activePaymentMethods: paymentMethods.filter((m) => m.status === 'active').
    length
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Complété
          </span>);

      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            En attente
          </span>);

      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Échoué
          </span>);

      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Actif
          </span>);

      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactif
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>);

    }
  };
  const getMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <CreditCardIcon className="h-5 w-5 text-blue-500" />;
      case 'bank_transfer':
        return <div className="h-5 w-5 text-green-500" />;
      case 'cash':
        return <div className="h-5 w-5 text-yellow-500" />;
      case 'mobile':
        return <QrCodeIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <ReceiptIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  // Filter transactions based on search term and selected status
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
    transaction.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    selectedStatus === 'all' || transaction.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  const handleCreatePaymentLink = () => {
    navigate('/administration/paiements/lien/nouveau');
  };
  const handleAddPaymentMethod = () => {
    setNewMethodForm({
      name: '',
      type: 'card',
      provider: '',
      fees: '',
      status: 'active'
    });
    setShowAddMethodModal(true);
  };
  const handleCreatePaymentPlan = () => {
    navigate('/administration/paiements/plan/nouveau');
  };
  const handleViewTransaction = (transactionId) => {
    // Find the transaction by ID
    const transaction = transactions.find((t) => t.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setShowTransactionDetails(true);
    }
  };
  const handleCloseTransactionDetails = () => {
    setShowTransactionDetails(false);
    setSelectedTransaction(null);
  };
  const handleDownloadReceipt = () => {
    alert('Téléchargement du reçu en PDF');
  };
  const handlePrintReceipt = () => {
    alert('Impression du reçu');
  };
  const handleSendReceipt = () => {
    alert('Envoi du reçu par email');
    handleCloseTransactionDetails();
  };
  const handleRefundTransaction = () => {
    alert('Remboursement de la transaction');
    handleCloseTransactionDetails();
  };
  const handleViewPaymentPlan = (planId) => {
    const plan = paymentPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPaymentPlan(plan);
      setShowPaymentPlanDetails(true);
    }
  };
  const handleClosePaymentPlanDetails = () => {
    setShowPaymentPlanDetails(false);
    setSelectedPaymentPlan(null);
  };
  const handleEditPaymentPlan = () => {
    alert('Modification du plan de paiement');
    handleClosePaymentPlanDetails();
  };
  const handlePausePaymentPlan = () => {
    alert('Mise en pause du plan de paiement');
    handleClosePaymentPlanDetails();
  };
  const handleCancelPaymentPlan = () => {
    if (
    confirm(
      'Êtes-vous sûr de vouloir annuler ce plan de paiement? Cette action est irréversible.'
    ))
    {
      alert('Plan de paiement annulé');
      handleClosePaymentPlanDetails();
    }
  };
  const handleSendPaymentReminder = () => {
    alert('Rappel de paiement envoyé au patient');
  };
  const getFrequencyLabel = (frequency) => {
    switch (frequency) {
      case 'weekly':
        return 'Hebdomadaire';
      case 'biweekly':
        return 'Bimensuel';
      case 'monthly':
        return 'Mensuel';
      case 'quarterly':
        return 'Trimestriel';
      default:
        return frequency;
    }
  };
  const renderTransactionDetails = () => {
    if (!selectedTransaction) return null;
    // Mock detailed transaction data
    const transactionDetails = {
      ...selectedTransaction,
      patient: {
        name: selectedTransaction.patient,
        email: `${selectedTransaction.patient.toLowerCase().replace(' ', '.')}@email.com`,
        phone: '06 12 34 56 78',
        address: "123 Rue de l'Orthodontie, 75000 Paris"
      },
      paymentDetails: {
        cardType: 'Visa',
        last4: '4242',
        expiryDate: '12/25'
      },
      timeline: [
      {
        status: 'initiated',
        date: selectedTransaction.date,
        time: '10:30',
        description: 'Transaction initiée'
      },
      {
        status: 'processing',
        date: selectedTransaction.date,
        time: '10:31',
        description: 'Traitement du paiement'
      },
      {
        status: 'completed',
        date: selectedTransaction.date,
        time: '10:32',
        description: 'Paiement confirmé'
      }],

      fees: '21.75 DT',
      netAmount: '728.25 DT'
    };
    return (
      <AnimatePresence>
        {showTransactionDetails &&
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
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-50 p-4">

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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">

              <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">
                    Transaction {transactionDetails.id}
                  </h3>
                  <p className="text-indigo-100 text-sm mt-1">
                    {transactionDetails.date} à{' '}
                    {transactionDetails.timeline[0].time}
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
                  onClick={handleSendReceipt}
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
                  onClick={handlePrintReceipt}
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
                  onClick={handleDownloadReceipt}
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
                  onClick={handleCloseTransactionDetails}
                  className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all"
                  title="Fermer">

                    <XCircleIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 dark:bg-gray-800">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Statut:
                      </div>
                      {getStatusBadge(transactionDetails.status)}
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {transactionDetails.amount}
                    </div>
                  </div>
                  {/* Patient Information */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Informations du patient
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Nom complet
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {transactionDetails.patient.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Email
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {transactionDetails.patient.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Téléphone
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {transactionDetails.patient.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Adresse
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {transactionDetails.patient.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Payment Details */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CreditCardIcon className="h-5 w-5 mr-2 text-blue-600" />
                      Détails du paiement
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getMethodIcon(transactionDetails.method)}
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                            {transactionDetails.method === 'card' ?
                          'Carte bancaire' :
                          transactionDetails.method === 'bank_transfer' ?
                          'Virement bancaire' :
                          transactionDetails.method === 'cash' ?
                          'Espèces' :
                          'Autre'}
                          </span>
                        </div>
                        {transactionDetails.method === 'card' &&
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                            •••• {transactionDetails.paymentDetails.last4}
                          </span>
                      }
                      </div>
                      {transactionDetails.method === 'card' &&
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Type de carte
                            </p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              {transactionDetails.paymentDetails.cardType}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Date d'expiration
                            </p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              {transactionDetails.paymentDetails.expiryDate}
                            </p>
                          </div>
                        </div>
                    }
                    </div>
                  </div>
                  {/* Transaction Breakdown */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <ReceiptIcon className="h-5 w-5 mr-2 text-gray-600" />
                      Détails de la transaction
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <dt className="text-sm text-gray-600 dark:text-gray-400">
                          Montant brut
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 dark:text-white">
                          {transactionDetails.amount}
                        </dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-sm text-gray-600 dark:text-gray-400">
                          Frais de transaction
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 dark:text-white">
                          {transactionDetails.fees}
                        </dd>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Montant net
                        </dt>
                        <dd className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                          {transactionDetails.netAmount}
                        </dd>
                      </div>
                    </div>
                  </div>
                  {/* Invoice Link */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Facture associée
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {transactionDetails.invoice}
                        </p>
                      </div>
                      <Link
                      to={`/administration/facturation/${transactionDetails.invoice}`}
                      className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg font-medium shadow-md hover:bg-amber-700 transition-all">

                        Voir la facture
                        <ArrowUpRightIcon className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                  {/* Transaction Timeline */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <ActivityIcon className="h-5 w-5 mr-2 text-green-600" />
                      Chronologie de la transaction
                    </h4>
                    <div className="space-y-4">
                      {transactionDetails.timeline.map((event, index) =>
                    <div key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {event.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {event.date} à {event.time}
                            </p>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Transaction ID:{' '}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {transactionDetails.id}
                      </span>
                    </div>
                    {transactionDetails.status === 'completed' &&
                  <motion.button
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={handleRefundTransaction}
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

                        <RefreshCwIcon className="h-4 w-4 mr-2" />
                        Rembourser
                      </motion.button>
                  }
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>);

  };
  const renderPaymentPlanDetails = () => {
    if (!selectedPaymentPlan) return null;
    const progressPercentage =
    parseFloat(selectedPaymentPlan.paidAmount.replace(/[^0-9.]/g, '')) /
    parseFloat(selectedPaymentPlan.totalAmount.replace(/[^0-9.]/g, '')) *
    100;
    return (
      <AnimatePresence>
        {showPaymentPlanDetails &&
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
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-50 p-4">

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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">

              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">
                    Plan de paiement {selectedPaymentPlan.id}
                  </h3>
                  <p className="text-green-100 text-sm mt-1">
                    {selectedPaymentPlan.treatment}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(selectedPaymentPlan.status)}
                  <motion.button
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={handleClosePaymentPlanDetails}
                  className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition-all">

                    <XCircleIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 dark:bg-gray-800">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Progress Overview */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-100 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <TrendingUpIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Progression du paiement
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {selectedPaymentPlan.paymentHistory.length} sur{' '}
                          {selectedPaymentPlan.numberOfInstallments} paiements
                          effectués
                        </span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {progressPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <motion.div
                        initial={{
                          width: 0
                        }}
                        animate={{
                          width: `${progressPercentage}%`
                        }}
                        transition={{
                          duration: 1,
                          ease: 'easeOut'
                        }}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full flex items-center justify-end pr-2">

                          {progressPercentage > 10 &&
                        <span className="text-xs font-bold text-white">
                              {progressPercentage.toFixed(0)}%
                            </span>
                        }
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Montant total
                          </p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {selectedPaymentPlan.totalAmount}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Payé
                          </p>
                          <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            {selectedPaymentPlan.paidAmount}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Restant
                          </p>
                          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            {selectedPaymentPlan.remainingAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Patient Information */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Informations du patient
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Nom complet
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.patient.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Email
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.patient.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Téléphone
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.patient.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Adresse
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.patient.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Plan Details */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-gray-600" />
                      Détails du plan
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Date de début
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.startDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Fréquence
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {getFrequencyLabel(selectedPaymentPlan.frequency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Montant par échéance
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.installmentAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Nombre d'échéances
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.numberOfInstallments}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Mode de paiement
                        </p>
                        <div className="flex items-center">
                          {getMethodIcon(selectedPaymentPlan.paymentMethod)}
                          <span className="ml-2 text-base font-medium text-gray-900 dark:text-white">
                            {selectedPaymentPlan.paymentMethod === 'card' ?
                          'Carte bancaire' :
                          selectedPaymentPlan.paymentMethod ===
                          'bank_transfer' ?
                          'Virement' :
                          selectedPaymentPlan.paymentMethod === 'cash' ?
                          'Espèces' :
                          'Autre'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Prélèvement auto
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedPaymentPlan.autoCharge ? 'Oui' : 'Non'}
                        </p>
                      </div>
                    </div>
                    {selectedPaymentPlan.notes &&
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Notes
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {selectedPaymentPlan.notes}
                        </p>
                      </div>
                  }
                  </div>
                  {/* Next Payment */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-amber-600" />
                      Prochain paiement
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Date
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {selectedPaymentPlan.nextPayment.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Montant
                        </p>
                        <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                          {selectedPaymentPlan.nextPayment.amount}
                        </p>
                      </div>
                      <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={handleSendPaymentReminder}
                      className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg font-medium shadow-md hover:bg-amber-700 transition-all">

                        <MailIcon className="h-4 w-4 mr-2" />
                        Envoyer un rappel
                      </motion.button>
                    </div>
                  </div>
                  {/* Payment History */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                      Historique des paiements (
                      {selectedPaymentPlan.paymentHistory.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedPaymentPlan.paymentHistory.map((payment) =>
                    <div
                      key={payment.id}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-green-200 dark:border-green-800 flex items-center justify-between">

                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-4">
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Paiement #{payment.id}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {payment.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              {getMethodIcon(payment.method)}
                              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                {payment.method === 'card' ?
                            'Carte' :
                            payment.method === 'bank_transfer' ?
                            'Virement' :
                            'Espèces'}
                              </span>
                            </div>
                            <p className="text-base font-bold text-green-600 dark:text-green-400">
                              {payment.amount}
                            </p>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                  {/* Upcoming Payments */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                      Paiements à venir (
                      {selectedPaymentPlan.upcomingPayments.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedPaymentPlan.upcomingPayments.map((payment) =>
                    <div
                      key={payment.id}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">

                          <div className="flex items-center">
                            <div
                          className={`h-10 w-10 rounded-full ${payment.status === 'pending' ? 'bg-yellow-500' : 'bg-indigo-500'} flex items-center justify-center mr-4`}>

                              <ClockIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Paiement #{payment.id}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {payment.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {payment.status === 'pending' ?
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                En attente
                              </span> :

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Programmé
                              </span>
                        }
                            <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                              {payment.amount}
                            </p>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={handleEditPaymentPlan}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all">

                        <EditIcon className="h-4 w-4 mr-2" />
                        Modifier
                      </motion.button>
                      <motion.button
                      whileHover={{
                        scale: 1.05
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={handlePausePaymentPlan}
                      className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium shadow-md hover:bg-yellow-700 transition-all">

                        <ClockIcon className="h-4 w-4 mr-2" />
                        Mettre en pause
                      </motion.button>
                    </div>
                    <motion.button
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={handleCancelPaymentPlan}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition-all">

                      <XCircleIcon className="h-4 w-4 mr-2" />
                      Annuler le plan
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>);

  };
  const renderTransactionsTab = () =>
  <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 gap-4">
        <div className="flex flex-wrap gap-2">
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setSelectedStatus('all')}
          className={`inline-flex items-center px-3 py-1.5 border ${selectedStatus === 'all' ? 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'} text-xs font-medium rounded-md transition-all`}>

            Toutes
          </motion.button>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setSelectedStatus('completed')}
          className={`inline-flex items-center px-3 py-1.5 border ${selectedStatus === 'completed' ? 'border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'} text-xs font-medium rounded-md transition-all`}>

            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Complétées
          </motion.button>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setSelectedStatus('pending')}
          className={`inline-flex items-center px-3 py-1.5 border ${selectedStatus === 'pending' ? 'border-yellow-500 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'} text-xs font-medium rounded-md transition-all`}>

            <ClockIcon className="h-4 w-4 mr-1" />
            En attente
          </motion.button>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setSelectedStatus('failed')}
          className={`inline-flex items-center px-3 py-1.5 border ${selectedStatus === 'failed' ? 'border-red-500 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'} text-xs font-medium rounded-md transition-all`}>

            <XCircleIcon className="h-4 w-4 mr-1" />
            Échouées
          </motion.button>
        </div>
        <div className="flex space-x-2">
          <div className="relative rounded-md shadow-sm max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

          </div>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleCreatePaymentLink}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

            <PlusIcon className="h-4 w-4 mr-2" />
            Lien de paiement
          </motion.button>
        </div>
      </div>
      {/* Transactions Table */}
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
                  ID Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Méthode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Facture
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {filteredTransactions.map((transaction, index) =>
            <motion.tr
              key={transaction.id}
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

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {transaction.patient.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {transaction.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {transaction.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodIcon(transaction.method)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                        {transaction.method === 'card' ?
                    'Carte' :
                    transaction.method === 'bank_transfer' ?
                    'Virement' :
                    transaction.method === 'cash' ?
                    'Espèces' :
                    'Autre'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                    <Link
                  to={`/administration/facturation/${transaction.invoice}`}
                  className="hover:underline font-medium">

                      {transaction.invoice}
                    </Link>
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
                    onClick={() => handleViewTransaction(transaction.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all dark:text-blue-400 dark:hover:bg-blue-900/30">

                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      {transaction.status === 'pending' &&
                  <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all dark:text-yellow-400 dark:hover:bg-yellow-900/30">

                          <RefreshCwIcon className="h-5 w-5" />
                        </motion.button>
                  }
                    </div>
                  </td>
                </motion.tr>
            )}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 &&
      <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              Aucune transaction ne correspond à vos critères
            </p>
          </div>
      }
      </motion.div>
    </div>;

  const renderPaymentMethodsTab = () =>
  <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Modes de paiement
        </h4>
        <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={handleAddPaymentMethod}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter un mode de paiement
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethodsList.map((method, index) =>
      <motion.div
        key={method.id}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
                    {getMethodIcon(method.type)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {method.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.provider}
                    </p>
                  </div>
                </div>
                {getStatusBadge(method.status)}
              </div>
              <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Frais
                  </dt>
                  <dd className="text-sm font-bold text-gray-900 dark:text-white">
                    {method.fees}
                  </dd>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => handleConfigureMethod(method)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">

                  <WrenchIcon className="h-4 w-4 mr-1" />
                  Configurer
                </motion.button>
              </div>
            </div>
          </motion.div>
      )}
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
      className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-400 dark:border-blue-500 rounded-lg p-4 shadow-md">

        <div className="flex">
          <div className="flex-shrink-0">
            <CreditCardIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Intégration des paiements
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
              <p>
                Configurez vos intégrations de paiement pour permettre à vos
                patients de payer en ligne.
              </p>
              <Link
              to="/administration/paiements/integration"
              className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all">

                Configurer les intégrations
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;

  // Add Method Modal
  const renderAddMethodModal = () =>
  <AnimatePresence>
      {showAddMethodModal &&
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowAddMethodModal(false)}>

          <motion.div
        initial={{
          scale: 0.92,
          opacity: 0,
          y: 20
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }}
        exit={{
          scale: 0.92,
          opacity: 0,
          y: 20
        }}
        transition={{
          type: 'spring',
          duration: 0.4
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Nouveau mode de paiement
                  </h2>
                  <p className="text-blue-100 text-xs">
                    Configurez un nouveau mode de paiement
                  </p>
                </div>
              </div>
              <button
            onClick={() => setShowAddMethodModal(false)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">

                <XCircleIcon className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Nom du mode *
                </label>
                <input
              type="text"
              value={newMethodForm.name}
              onChange={(e) =>
              setNewMethodForm((p) => ({
                ...p,
                name: e.target.value
              }))
              }
              placeholder="Ex: PayPal, Chèque..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Type
                </label>
                <select
              value={newMethodForm.type}
              onChange={(e) =>
              setNewMethodForm((p) => ({
                ...p,
                type: e.target.value
              }))
              }
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500">

                  <option value="card">Carte bancaire</option>
                  <option value="bank_transfer">Virement bancaire</option>
                  <option value="cash">Espèces</option>
                  <option value="mobile">Paiement mobile</option>
                  <option value="check">Chèque</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Fournisseur / Prestataire
                </label>
                <input
              type="text"
              value={newMethodForm.provider}
              onChange={(e) =>
              setNewMethodForm((p) => ({
                ...p,
                provider: e.target.value
              }))
              }
              placeholder="Ex: Stripe, Manuel..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />

              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Frais de transaction
                </label>
                <input
              type="text"
              value={newMethodForm.fees}
              onChange={(e) =>
              setNewMethodForm((p) => ({
                ...p,
                fees: e.target.value
              }))
              }
              placeholder="Ex: 2.9% + 0.30 DT"
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />

              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Statut initial
                </label>
                <div className="flex gap-3">
                  {['active', 'inactive'].map((s) =>
              <button
                key={s}
                type="button"
                onClick={() =>
                setNewMethodForm((p) => ({
                  ...p,
                  status: s
                }))
                }
                className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${newMethodForm.status === s ? s === 'active' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'border-gray-400 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}>

                      {s === 'active' ? 'Actif' : 'Inactif'}
                    </button>
              )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
              <button
            onClick={() => setShowAddMethodModal(false)}
            className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 transition-all">

                Annuler
              </button>
              <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleSaveNewMethod}
            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all">

                <PlusIcon className="h-4 w-4 mr-2" />
                Ajouter
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  // Configure Method Modal
  const renderConfigureModal = () =>
  <AnimatePresence>
      {showConfigureModal && configuringMethod &&
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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowConfigureModal(false)}>

          <motion.div
        initial={{
          scale: 0.92,
          opacity: 0,
          y: 20
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }}
        exit={{
          scale: 0.92,
          opacity: 0,
          y: 20
        }}
        transition={{
          type: 'spring',
          duration: 0.4
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <WrenchIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Configurer — {configuringMethod.name}
                  </h2>
                  <p className="text-indigo-100 text-xs">
                    Paramètres du mode de paiement
                  </p>
                </div>
              </div>
              <button
            onClick={() => setShowConfigureModal(false)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">

                <XCircleIcon className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Status toggle */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Statut
                </label>
                <div className="flex gap-3">
                  {['active', 'inactive'].map((s) =>
              <button
                key={s}
                type="button"
                onClick={() =>
                setConfiguringMethod((p) => ({
                  ...p,
                  status: s
                }))
                }
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${configuringMethod.status === s ? s === 'active' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'border-red-400 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>

                      {s === 'active' ? '✓ Actif' : '✕ Inactif'}
                    </button>
              )}
                </div>
              </div>
              {/* Provider */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Fournisseur
                </label>
                <input
              type="text"
              value={configuringMethod.provider}
              onChange={(e) =>
              setConfiguringMethod((p) => ({
                ...p,
                provider: e.target.value
              }))
              }
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500" />

              </div>
              {/* Fees */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Frais de transaction
                </label>
                <input
              type="text"
              value={configuringMethod.fees}
              onChange={(e) =>
              setConfiguringMethod((p) => ({
                ...p,
                fees: e.target.value
              }))
              }
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500" />

              </div>
              {/* API Key (for card/mobile) */}
              {(configuringMethod.type === 'card' ||
          configuringMethod.type === 'mobile') &&
          <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Clé API
                  </label>
                  <input
              type="password"
              value={configuringMethod.apiKey || ''}
              onChange={(e) =>
              setConfiguringMethod((p) => ({
                ...p,
                apiKey: e.target.value
              }))
              }
              placeholder="sk_live_..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 font-mono" />

                </div>
          }
              {/* Webhook URL */}
              {(configuringMethod.type === 'card' ||
          configuringMethod.type === 'mobile') &&
          <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    URL Webhook
                  </label>
                  <input
              type="url"
              value={configuringMethod.webhookUrl || ''}
              onChange={(e) =>
              setConfiguringMethod((p) => ({
                ...p,
                webhookUrl: e.target.value
              }))
              }
              placeholder="https://..."
              className="w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500" />

                </div>
          }
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
              <button
            onClick={() => setShowConfigureModal(false)}
            className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 transition-all">

                Annuler
              </button>
              <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleSaveConfiguration}
            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all">

                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Enregistrer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  const renderPaymentPlansTab = () =>
  <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Plans de paiement
        </h4>
        <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={handleCreatePaymentPlan}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

          <PlusIcon className="h-4 w-4 mr-2" />
          Nouveau plan
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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  ID Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Traitement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Montant total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Reste à payer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Prochain paiement
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
              {paymentPlans.map((plan, index) =>
            <motion.tr
              key={plan.id}
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

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {plan.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {plan.patient.name.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {plan.patient.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {plan.treatment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {plan.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {plan.remainingAmount}
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                      <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all"
                    style={{
                      width: `${(parseInt(plan.totalAmount.replace(/[^0-9]/g, '')) - parseInt(plan.remainingAmount.replace(/[^0-9]/g, ''))) / parseInt(plan.totalAmount.replace(/[^0-9]/g, '')) * 100}%`
                    }}>
                  </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {plan.nextPayment.amount}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {plan.nextPayment.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(plan.status)}
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
                    onClick={() => handleViewPaymentPlan(plan.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all dark:text-blue-400 dark:hover:bg-blue-900/30">

                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                    whileHover={{
                      scale: 1.1
                    }}
                    whileTap={{
                      scale: 0.9
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all dark:text-gray-400 dark:hover:bg-gray-900/30">

                        <ArrowUpRightIcon className="h-5 w-5" />
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

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
        {
          label: 'Transactions totales',
          value: String(stats.totalTransactions),
          icon: ReceiptIcon,
          color: 'indigo',
          subtext: 'toutes périodes'
        },
        {
          label: 'Complétées',
          value: String(stats.completedTransactions),
          icon: CheckCircleIcon,
          color: 'green',
          subtext: 'paiements reçus'
        },
        {
          label: 'Revenu total',
          value: stats.totalRevenue,
          icon: DollarSignIcon,
          color: 'blue',
          subtext: 'exercice en cours'
        },
        {
          label: 'Plans actifs',
          value: String(stats.activePaymentPlans),
          icon: CalendarIcon,
          color: 'amber',
          subtext: 'plans en cours'
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('transactions')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'transactions' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

              <div className="flex items-center">
                <ReceiptIcon className="h-5 w-5 mr-2" />
                Transactions
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('methods')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'methods' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

              <div className="flex items-center">
                <CreditCardIcon className="h-5 w-5 mr-2" />
                Modes de paiement
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('plans')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'plans' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Plans de paiement
              </div>
            </motion.button>
          </nav>
        </div>
        <div className="p-6 dark:bg-gray-800">
          {selectedTab === 'transactions' && renderTransactionsTab()}
          {selectedTab === 'methods' && renderPaymentMethodsTab()}
          {selectedTab === 'plans' && renderPaymentPlansTab()}
        </div>
      </motion.div>
      {/* Transaction Details Modal */}
      {renderTransactionDetails()}
      {/* Payment Plan Details Modal */}
      {renderPaymentPlanDetails()}
      {/* Add Method Modal */}
      {renderAddMethodModal()}
      {/* Configure Modal */}
      {renderConfigureModal()}
    </div>);

};
export default Paiements;