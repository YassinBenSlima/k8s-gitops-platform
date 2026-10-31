import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  DollarSignIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  DownloadIcon,
  PrinterIcon,
  FileTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  TrendingUpIcon,
  ActivityIcon,
  InfoIcon,
  ExternalLinkIcon,
  CreditCardIcon,
  PercentIcon } from
'lucide-react';
const ReimbursementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  // Mock reimbursement data - in real app, fetch based on id
  const reimbursementData = {
    'RMB-2023-023': {
      id: 'RMB-2023-023',
      patient: 'Lucas Dubois',
      date: '10/06/2023',
      mutuelle: 'CNAM',
      amount: '540 DT',
      originalAmount: '900 DT',
      coverage: '60%',
      fseReference: 'FSE-2023-042',
      patientResponsibility: '360 DT',
      status: 'completed',
      paymentMethod: 'Virement bancaire',
      paymentDate: '10/06/2023',
      patientInfo: {
        name: 'Lucas Dubois',
        birthDate: '30/06/1976',
        insuranceNumber: '1 76 06 30 456 789',
        address: '789 Rue Lafayette, 75010 Paris',
        phone: '06 45 67 89 01',
        email: 'lucas.dubois@email.com'
      },
      mutuelleInfo: {
        name: 'CNAM',
        type: 'Régime général',
        coverageRate: '60%',
        contractNumber: 'CNAM-2023-456789'
      },
      breakdown: [
      {
        description: 'Montant total des soins',
        amount: '900 DT',
        type: 'total'
      },
      {
        description: 'Prise en charge mutuelle (60%)',
        amount: '540 DT',
        type: 'covered'
      },
      {
        description: 'Reste à charge patient (40%)',
        amount: '360 DT',
        type: 'patient'
      }],

      treatments: [
      {
        code: 'ODF-045',
        description: 'Pose appareil multi-attaches',
        amount: '800 DT',
        coveredAmount: '480 DT',
        patientAmount: '320 DT'
      },
      {
        code: 'ODF-067',
        description: 'Contrôle mensuel',
        amount: '100 DT',
        coveredAmount: '60 DT',
        patientAmount: '40 DT'
      }],

      documents: [
      {
        name: 'Attestation_remboursement.pdf',
        type: 'Attestation de remboursement',
        size: '0.8 MB',
        uploadDate: '10/06/2023'
      },
      {
        name: 'Decompte.pdf',
        type: 'Décompte détaillé',
        size: '1.1 MB',
        uploadDate: '10/06/2023'
      }],

      timeline: [
      {
        date: '10/06/2023 15:30',
        action: 'Remboursement effectué',
        user: 'Système',
        status: 'success',
        details: 'Virement bancaire de 540 DT effectué'
      },
      {
        date: '09/06/2023 10:15',
        action: 'Remboursement approuvé',
        user: 'CNAM',
        status: 'success',
        details: 'Demande approuvée par la mutuelle'
      },
      {
        date: '07/06/2023 14:20',
        action: 'Analyse en cours',
        user: 'CNAM',
        status: 'processing',
        details: 'Vérification des documents et des droits'
      },
      {
        date: '05/06/2023 16:45',
        action: 'FSE transmise',
        user: 'Dr. Dupont',
        status: 'success',
        details: 'Feuille de soins électronique envoyée'
      }]

    },
    'RMB-2023-022': {
      id: 'RMB-2023-022',
      patient: 'Nathan Robert',
      date: '08/06/2023',
      mutuelle: 'Assurance Carte',
      amount: '210 DT',
      originalAmount: '350 DT',
      coverage: '60%',
      fseReference: 'FSE-2023-041',
      patientResponsibility: '140 DT',
      status: 'completed',
      paymentMethod: 'Virement bancaire',
      paymentDate: '08/06/2023',
      patientInfo: {
        name: 'Nathan Robert',
        birthDate: '18/03/1990',
        insuranceNumber: '1 90 03 18 567 890',
        address: '456 Boulevard Haussmann, 75008 Paris',
        phone: '06 56 78 90 12',
        email: 'nathan.robert@email.com'
      },
      mutuelleInfo: {
        name: 'Assurance Carte',
        type: 'Complémentaire',
        coverageRate: '60%',
        contractNumber: 'AC-2023-567890'
      },
      breakdown: [
      {
        description: 'Montant total des soins',
        amount: '350 DT',
        type: 'total'
      },
      {
        description: 'Prise en charge mutuelle (60%)',
        amount: '210 DT',
        type: 'covered'
      },
      {
        description: 'Reste à charge patient (40%)',
        amount: '140 DT',
        type: 'patient'
      }],

      treatments: [
      {
        code: 'ODF-023',
        description: 'Ajustement appareil orthodontique',
        amount: '250 DT',
        coveredAmount: '150 DT',
        patientAmount: '100 DT'
      },
      {
        code: 'ODF-067',
        description: 'Contrôle mensuel',
        amount: '100 DT',
        coveredAmount: '60 DT',
        patientAmount: '40 DT'
      }],

      documents: [
      {
        name: 'Attestation_remboursement.pdf',
        type: 'Attestation de remboursement',
        size: '0.7 MB',
        uploadDate: '08/06/2023'
      }],

      timeline: [
      {
        date: '08/06/2023 11:20',
        action: 'Remboursement effectué',
        user: 'Système',
        status: 'success',
        details: 'Virement bancaire de 210 DT effectué'
      },
      {
        date: '07/06/2023 16:30',
        action: 'Remboursement approuvé',
        user: 'Assurance Carte',
        status: 'success',
        details: 'Demande approuvée par la mutuelle'
      },
      {
        date: '06/06/2023 09:45',
        action: 'FSE transmise',
        user: 'Dr. Martin',
        status: 'success',
        details: 'Feuille de soins électronique envoyée'
      }]

    },
    'RMB-2023-021': {
      id: 'RMB-2023-021',
      patient: 'Léa Richard',
      date: '05/06/2023',
      mutuelle: 'CNRPS',
      amount: '315 DT',
      originalAmount: '450 DT',
      coverage: '70%',
      fseReference: 'FSE-2023-040',
      patientResponsibility: '135 DT',
      status: 'completed',
      paymentMethod: 'Virement bancaire',
      paymentDate: '05/06/2023',
      patientInfo: {
        name: 'Léa Richard',
        birthDate: '25/11/1982',
        insuranceNumber: '2 82 11 25 678 901',
        address: '321 Avenue de la Liberté, 75011 Paris',
        phone: '06 67 89 01 23',
        email: 'lea.richard@email.com'
      },
      mutuelleInfo: {
        name: 'CNRPS',
        type: 'Fonctionnaire',
        coverageRate: '70%',
        contractNumber: 'CNRPS-2023-678901'
      },
      breakdown: [
      {
        description: 'Montant total des soins',
        amount: '450 DT',
        type: 'total'
      },
      {
        description: 'Prise en charge mutuelle (70%)',
        amount: '315 DT',
        type: 'covered'
      },
      {
        description: 'Reste à charge patient (30%)',
        amount: '135 DT',
        type: 'patient'
      }],

      treatments: [
      {
        code: 'ODF-001',
        description: 'Consultation orthodontique',
        amount: '150 DT',
        coveredAmount: '105 DT',
        patientAmount: '45 DT'
      },
      {
        code: 'ODF-023',
        description: 'Ajustement appareil orthodontique',
        amount: '300 DT',
        coveredAmount: '210 DT',
        patientAmount: '90 DT'
      }],

      documents: [
      {
        name: 'Attestation_remboursement.pdf',
        type: 'Attestation de remboursement',
        size: '0.9 MB',
        uploadDate: '05/06/2023'
      },
      {
        name: 'Decompte.pdf',
        type: 'Décompte détaillé',
        size: '1.0 MB',
        uploadDate: '05/06/2023'
      }],

      timeline: [
      {
        date: '05/06/2023 14:45',
        action: 'Remboursement effectué',
        user: 'Système',
        status: 'success',
        details: 'Virement bancaire de 315 DT effectué'
      },
      {
        date: '04/06/2023 11:20',
        action: 'Remboursement approuvé',
        user: 'CNRPS',
        status: 'success',
        details: 'Demande approuvée par la mutuelle'
      },
      {
        date: '03/06/2023 15:30',
        action: 'FSE transmise',
        user: 'Dr. Dupont',
        status: 'success',
        details: 'Feuille de soins électronique envoyée'
      }]

    }
  };
  const reimbursement =
  reimbursementData[id] || reimbursementData['RMB-2023-023'];
  const getTimelineIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ActivityIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const handleBack = () => {
    navigate('/administration/mutuelles');
  };
  const handleViewFSE = () => {
    navigate(`/administration/mutuelles/fse/${reimbursement.fseReference}`);
  };
  const renderDetailsTab = () =>
  <div className="space-y-6">
      {/* Patient Information */}
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 shadow-lg">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Informations Patient
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nom complet</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.patientInfo.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date de naissance</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.patientInfo.birthDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Numéro de sécurité sociale</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.patientInfo.insuranceNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Téléphone</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.patientInfo.phone}
            </p>
          </div>
        </div>
      </motion.div>
      {/* Mutuelle Information */}
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
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100 shadow-lg">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
            <ShieldCheckIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Informations Mutuelle
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Mutuelle</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.mutuelleInfo.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Type de couverture</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.mutuelleInfo.type}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Numéro de contrat</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.mutuelleInfo.contractNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Taux de remboursement</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.mutuelleInfo.coverageRate}
            </p>
          </div>
        </div>
      </motion.div>
      {/* Reimbursement Details */}
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
      className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mr-3">
            <FileTextIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Détails du remboursement
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Date de remboursement</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.paymentDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Mode de paiement</p>
            <p className="text-base font-semibold text-gray-900">
              {reimbursement.paymentMethod}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Référence FSE</p>
            <button
            onClick={handleViewFSE}
            className="text-base font-semibold text-blue-600 hover:text-blue-700 flex items-center transition-colors">

              {reimbursement.fseReference}
              <ExternalLinkIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-600">Statut</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Remboursé
            </span>
          </div>
        </div>
      </motion.div>
    </div>;

  const renderBreakdownTab = () =>
  <div className="space-y-6">
      {/* Amount Breakdown */}
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100 shadow-lg">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <DollarSignIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Décomposition des montants
          </h3>
        </div>
        <div className="space-y-4">
          {reimbursement.breakdown.map((item, index) =>
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: index * 0.1
          }}
          className={`bg-white rounded-lg p-4 border-2 ${item.type === 'total' ? 'border-gray-200' : item.type === 'covered' ? 'border-green-200' : 'border-orange-200'}`}>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {item.description}
                </span>
                <span
              className={`text-lg font-bold ${item.type === 'total' ? 'text-gray-900' : item.type === 'covered' ? 'text-green-600' : 'text-orange-600'}`}>

                  {item.amount}
                </span>
              </div>
            </motion.div>
        )}
        </div>
      </motion.div>
      {/* Treatment Breakdown */}
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
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Détail par acte</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Montant total
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Remboursé
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reste à charge
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {reimbursement.treatments.map((treatment, index) =>
            <motion.tr
              key={index}
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
              }}>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {treatment.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {treatment.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900">
                      {treatment.amount}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-green-600">
                      {treatment.coveredAmount}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-orange-600">
                      {treatment.patientAmount}
                    </p>
                  </td>
                </motion.tr>
            )}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Visual Summary */}
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
      className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200">
          <div className="flex items-center mb-2">
            <CreditCardIcon className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">
              Montant total
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {reimbursement.originalAmount}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center mb-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">Remboursé</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {reimbursement.amount}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ({reimbursement.coverage})
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200">
          <div className="flex items-center mb-2">
            <PercentIcon className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">
              Reste à charge
            </span>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {reimbursement.patientResponsibility}
          </p>
        </div>
      </motion.div>
    </div>;

  const renderDocumentsTab = () =>
  <div className="space-y-6">
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

        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            Documents du remboursement
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {reimbursement.documents.length} document(s) disponible(s)
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {reimbursement.documents.map((doc, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-all">

                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <FileTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {doc.type} • {doc.size} • {doc.uploadDate}
                    </p>
                  </div>
                </div>
                <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all">

                  <DownloadIcon className="h-5 w-5" />
                </motion.button>
              </motion.div>
          )}
          </div>
        </div>
      </motion.div>
    </div>;

  const renderTimelineTab = () =>
  <div className="space-y-6">
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

        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            Historique du remboursement
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Suivi chronologique des actions
          </p>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {reimbursement.timeline.map((item, index) =>
            <motion.li
              key={index}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.1
              }}>

                  <div className="relative pb-8">
                    {index !== reimbursement.timeline.length - 1 &&
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true" />

                }
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-md">
                          {getTimelineIcon(item.status)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900">
                              {item.action}
                            </p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                          <p className="text-sm text-gray-700">
                            {item.details}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Par {item.user}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
            )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">

              <ArrowLeftIcon className="h-5 w-5 text-white" />
            </motion.button>
            <div className="h-14 w-14 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mr-4">
              <DollarSignIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{reimbursement.id}</h3>
              <p className="text-emerald-100 text-sm mt-1">
                {reimbursement.patient} • {reimbursement.date}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white text-green-600 shadow-lg">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Remboursé
            </span>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-2 bg-white text-green-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

              <DownloadIcon className="h-4 w-4 mr-2" />
              Télécharger
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-2 bg-white text-green-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

              <PrinterIcon className="h-4 w-4 mr-2" />
              Imprimer
            </motion.button>
          </div>
        </div>
      </motion.div>
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
          delay: 0.1
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
              onClick={() => setActiveTab('details')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'details' ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2" />
                Détails
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setActiveTab('breakdown')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'breakdown' ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2" />
                Décomposition
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setActiveTab('documents')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'documents' ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2" />
                Documents
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setActiveTab('timeline')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'timeline' ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                Historique
              </div>
            </motion.button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'breakdown' && renderBreakdownTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'timeline' && renderTimelineTab()}
        </div>
      </motion.div>
    </div>);

};
export default ReimbursementDetails;