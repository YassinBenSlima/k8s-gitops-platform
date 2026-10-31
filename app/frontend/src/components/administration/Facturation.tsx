import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  XCircleIcon,
  EyeIcon,
  EditIcon,
  CreditCardIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  FileTextIcon,
  DollarSignIcon,
  CalendarIcon,
  UserIcon,
  ArrowRightIcon,
  SparklesIcon,
  ZapIcon,
  AwardIcon,
  TargetIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon } from
'lucide-react';
import InvoiceCard from './common/InvoiceCard';
import HonoraireCard from './common/HonoraireCard';
import { Link } from 'react-router-dom';
import NewInvoiceModal from './modals/NewInvoiceModal';
import { useNavigate } from 'react-router-dom';
const Facturation = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const navigate = useNavigate();
  // Mock data for invoices
  const invoices = [
  {
    id: 'INV-2023-156',
    patient: 'Sophie Martin',
    date: '12/06/2023',
    amount: '750 DT',
    status: 'paid',
    treatment: 'Contrôle mensuel',
    practitioner: 'Dr. Dupont'
  },
  {
    id: 'INV-2023-155',
    patient: 'Thomas Bernard',
    date: '10/06/2023',
    amount: '1 200 DT',
    status: 'partial',
    treatment: 'Pose appareil',
    practitioner: 'Dr. Dupont'
  },
  {
    id: 'INV-2023-154',
    patient: 'Emma Petit',
    date: '08/06/2023',
    amount: '450 DT',
    status: 'pending',
    treatment: 'Consultation initiale',
    practitioner: 'Dr. Martin'
  },
  {
    id: 'INV-2023-153',
    patient: 'Lucas Dubois',
    date: '05/06/2023',
    amount: '900 DT',
    status: 'overdue',
    treatment: 'Ajustement appareil',
    practitioner: 'Dr. Dupont'
  },
  {
    id: 'INV-2023-152',
    patient: 'Nathan Robert',
    date: '02/06/2023',
    amount: '350 DT',
    status: 'paid',
    treatment: 'Contrôle mensuel',
    practitioner: 'Dr. Martin'
  },
  {
    id: 'INV-2023-151',
    patient: 'Léa Richard',
    date: '01/06/2023',
    amount: '450 DT',
    status: 'paid',
    treatment: 'Contrôle mensuel',
    practitioner: 'Dr. Dupont'
  }];

  // Calculate invoice statistics
  const invoiceStats = {
    total: invoices.length,
    paid: invoices.filter((inv) => inv.status === 'paid').length,
    pending: invoices.filter((inv) => inv.status === 'pending').length,
    overdue: invoices.filter((inv) => inv.status === 'overdue').length,
    partial: invoices.filter((inv) => inv.status === 'partial').length,
    totalAmount: '24 750 DT',
    paidAmount: '18 430 DT',
    pendingAmount: '6 320 DT'
  };
  // Filter invoices based on selected filter and search term
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter =
    selectedFilter === 'all' || invoice.status === selectedFilter;
    const matchesSearch =
    invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  // Mock invoice details for the selected invoice
  const invoiceDetails = {
    id: 'INV-2023-156',
    patient: {
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      address: "123 Rue de l'Orthodontie, 75000 Paris"
    },
    date: '12/06/2023',
    dueDate: '26/06/2023',
    items: [
    {
      description: 'Contrôle mensuel',
      quantity: 1,
      unitPrice: '750 DT',
      total: '750 DT'
    }],

    subtotal: '750 DT',
    tax: '0 DT',
    total: '750 DT',
    status: 'paid',
    paymentDate: '12/06/2023',
    paymentMethod: 'Carte bancaire',
    notes: 'Prochain rendez-vous prévu le 15/07/2023'
  };
  const handleNewInvoice = () => {
    navigate('/administration/facturation/nouvelle');
  };
  const handleViewInvoice = (invoiceId) => {
    // In a real app, this would fetch the invoice details
    setShowInvoiceDetails(true);
  };
  const handleCloseInvoiceDetails = () => {
    setShowInvoiceDetails(false);
  };
  const handleSendInvoice = () => {
    // In a real app, this would send the invoice to the patient
    alert('Facture envoyée par email');
    handleCloseInvoiceDetails();
  };
  const handlePrintInvoice = () => {
    // In a real app, this would print the invoice
    alert('Impression de la facture');
  };
  const handleDownloadInvoice = () => {
    // In a real app, this would download the invoice as PDF
    alert('Téléchargement de la facture en PDF');
  };
  const handleMarkAsPaid = () => {
    // In a real app, this would mark the invoice as paid
    alert('Facture marquée comme payée');
    handleCloseInvoiceDetails();
  };
  const renderInvoiceDetails = () =>
  <AnimatePresence>
      {showInvoiceDetails &&
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

            <div className="px-4 py-3 border-b border-red-100 bg-red-50 rounded-t-2xl flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold text-red-800">Honoraire {invoiceDetails.id}</h3>
                <p className="text-xs text-red-600 mt-0.5">Émis le {invoiceDetails.date}</p>
              </div>
              <div className="flex space-x-2">
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleSendInvoice}
              className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-all"
              title="Envoyer par email">

                  <MailIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handlePrintInvoice}
              className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-all"
              title="Imprimer">

                  <PrinterIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleDownloadInvoice}
              className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-all"
              title="Télécharger">

                  <DownloadIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleCloseInvoiceDetails}
              className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-all"
              title="Fermer">

                  <XCircleIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 dark:bg-gray-800">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                      HealthPilot
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Rue de l'Orthodontie
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      75000 Paris
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      contact@orthobizz.fr
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      HONORAIRE
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      N° {invoiceDetails.id}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Date: {invoiceDetails.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Échéance: {invoiceDetails.dueDate}
                    </p>
                  </div>
                </div>
                {/* Patient Info */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Facturé à:
                  </h4>
                  <div className="space-y-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {invoiceDetails.patient.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {invoiceDetails.patient.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {invoiceDetails.patient.email}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {invoiceDetails.patient.phone}
                    </p>
                  </div>
                </div>
                {/* Invoice Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Détails de l'honoraire
                  </h4>
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Quantité
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Prix unitaire
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600">
                        {invoiceDetails.items.map((item, index) =>
                    <tr key={index}>
                            <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                              {item.description}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-center">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-right">
                              {item.unitPrice}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-right font-medium">
                              {item.total}
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
                      <dt className="text-sm text-gray-600 dark:text-gray-400">
                        Sous-total:
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-white">
                        {invoiceDetails.subtotal}
                      </dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">
                        TVA:
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-white">
                        {invoiceDetails.tax}
                      </dd>
                    </div>
                    <div className="flex justify-between py-3 border-t-2 border-gray-200 dark:border-gray-600 font-bold">
                      <dt className="text-gray-900 dark:text-white">Total:</dt>
                      <dd className="text-purple-600 dark:text-purple-400 text-lg">
                        {invoiceDetails.total}
                      </dd>
                    </div>
                  </div>
                </div>
                {/* Payment Status */}
                {invoiceDetails.status === 'paid' &&
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                    <h4 className="font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Paiement reçu
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700 dark:text-green-400">
                          Date de paiement:
                        </span>
                        <span className="text-sm font-medium text-green-900 dark:text-green-200">
                          {invoiceDetails.paymentDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700 dark:text-green-400">
                          Méthode de paiement:
                        </span>
                        <span className="text-sm font-medium text-green-900 dark:text-green-200">
                          {invoiceDetails.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
            }
                {/* Notes */}
                {invoiceDetails.notes &&
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Notes
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {invoiceDetails.notes}
                    </p>
                  </div>
            }
                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Statut:
                    </span>
                    <InvoiceCard status={invoiceDetails.status} />
                  </div>
                  {invoiceDetails.status !== 'paid' &&
              <motion.button
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={handleMarkAsPaid}
                type="button"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Marquer comme payée
                    </motion.button>
              }
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
        {
          label: 'Honoraires payés',
          value: String(invoiceStats.paid),
          icon: CheckCircleIcon,
          color: 'green',
          subtext: 'sur ' + invoiceStats.total + ' total'
        },
        {
          label: 'En attente',
          value: String(invoiceStats.pending),
          icon: ClockIcon,
          color: 'blue',
          subtext: invoiceStats.pendingAmount
        },
        {
          label: 'Partielles',
          value: String(invoiceStats.partial),
          icon: AlertCircleIcon,
          color: 'amber',
          subtext: 'paiement partiel'
        },
        {
          label: 'En retard',
          value: String(invoiceStats.overdue),
          icon: XCircleIcon,
          color: 'rose',
          subtext: 'action requise'
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
      {/* Filters and Search */}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedFilter('all')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === 'all' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

              Toutes ({invoiceStats.total})
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedFilter('paid')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === 'paid' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Payées ({invoiceStats.paid})
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedFilter('pending')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === 'pending' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

              <ClockIcon className="h-4 w-4 mr-1" />
              En attente ({invoiceStats.pending})
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedFilter('partial')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === 'partial' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

              <AlertCircleIcon className="h-4 w-4 mr-1" />
              Partielles ({invoiceStats.partial})
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedFilter('overdue')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === 'overdue' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

              <XCircleIcon className="h-4 w-4 mr-1" />
              En retard ({invoiceStats.overdue})
            </motion.button>
          </div>
          <div className="relative max-w-xs w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>
        </div>
      </motion.div>
      {/* Invoice Table */}
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  N° Honoraire
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Traitement
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
              {filteredInvoices.map((invoice, index) =>
              <motion.tr
                key={invoice.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.5 + index * 0.05
                }}
                whileHover={{
                  backgroundColor: 'rgba(249, 250, 251, 0.5)'
                }}
                className="cursor-pointer transition-all dark:hover:bg-gray-700/50">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {invoice.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {invoice.patient.
                      split(' ').
                      map((name) => name[0]).
                      join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {invoice.patient}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {invoice.practitioner}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {invoice.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {invoice.treatment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {invoice.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <InvoiceCard status={invoice.status} />
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
                      onClick={() => handleViewInvoice(invoice.id)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">

                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                      whileHover={{
                        scale: 1.1
                      }}
                      whileTap={{
                        scale: 0.9
                      }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all">

                        <MailIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                      whileHover={{
                        scale: 1.1
                      }}
                      whileTap={{
                        scale: 0.9
                      }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all">

                        <DownloadIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
          {filteredInvoices.length === 0 &&
          <div className="text-center py-12">
              <FileTextIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Aucune facture ne correspond à vos critères
              </p>
            </div>
          }
        </div>
        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-600">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Précédent
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Affichage de <span className="font-medium">1</span> à{' '}
                <span className="font-medium">6</span> sur{' '}
                <span className="font-medium">12</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Précédent</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">

                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd" />

                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Suivant</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">

                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd" />

                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Invoice Details Modal */}
      {renderInvoiceDetails()}
    </div>);

};
export default Facturation;