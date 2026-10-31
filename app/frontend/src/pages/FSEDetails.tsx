import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  FileTextIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DownloadIcon,
  PrinterIcon,
  RefreshCwIcon,
  PaperclipIcon,
  ActivityIcon,
  AlertCircleIcon,
  DollarSignIcon,
  ShieldCheckIcon,
  EditIcon,
  SendIcon } from
'lucide-react';
const FSEDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  // Mock FSE data - in real app, fetch based on id
  const fseData = {
    'FSE-2023-045': {
      id: 'FSE-2023-045',
      patient: 'Sophie Martin',
      date: '12/06/2023',
      mutuelle: 'CNAM',
      amount: '450 DT',
      status: 'sent',
      transmissionDate: '12/06/2023',
      treatments: [
      {
        code: 'ODF-001',
        description: 'Consultation orthodontique',
        amount: '150 DT',
        quantity: 1
      },
      {
        code: 'ODF-023',
        description: 'Ajustement appareil orthodontique',
        amount: '300 DT',
        quantity: 1
      }],

      documents: [
      {
        name: 'Prescription.pdf',
        type: 'Prescription médicale',
        size: '1.2 MB',
        uploadDate: '12/06/2023'
      },
      {
        name: 'Radio.jpg',
        type: 'Radiographie',
        size: '3.5 MB',
        uploadDate: '12/06/2023'
      }],

      practitioner: 'Dr. Dupont',
      notes:
      'Traitement mensuel régulier, prévoir prochain rendez-vous dans 30 jours',
      patientInfo: {
        name: 'Sophie Martin',
        birthDate: '15/04/1992',
        insuranceNumber: '2 92 04 75 123 456',
        address: '123 Avenue de la République, 75011 Paris',
        phone: '06 12 34 56 78',
        email: 'sophie.martin@email.com'
      },
      mutuelleInfo: {
        name: 'CNAM',
        type: 'Régime général',
        coverageRate: '60%',
        expectedReimbursement: '270 DT'
      },
      timeline: [
      {
        date: '12/06/2023 14:30',
        action: 'FSE transmise',
        user: 'Dr. Dupont',
        status: 'success',
        details: 'Transmission réussie vers CNAM'
      },
      {
        date: '12/06/2023 14:25',
        action: 'Documents ajoutés',
        user: 'Dr. Dupont',
        status: 'success',
        details: '2 documents téléversés'
      },
      {
        date: '12/06/2023 14:20',
        action: 'FSE créée',
        user: 'Dr. Dupont',
        status: 'success',
        details: 'Nouvelle feuille de soins créée'
      }]

    },
    'FSE-2023-044': {
      id: 'FSE-2023-044',
      patient: 'Thomas Bernard',
      date: '10/06/2023',
      mutuelle: 'CNRPS',
      amount: '720 DT',
      status: 'processing',
      transmissionDate: '10/06/2023',
      treatments: [
      {
        code: 'ODF-045',
        description: 'Pose appareil multi-attaches',
        amount: '720 DT',
        quantity: 1
      }],

      documents: [
      {
        name: 'Devis.pdf',
        type: 'Devis',
        size: '0.9 MB',
        uploadDate: '10/06/2023'
      }],

      practitioner: 'Dr. Dupont',
      notes: "Première pose d'appareil, prévoir contrôle dans 2 semaines",
      patientInfo: {
        name: 'Thomas Bernard',
        birthDate: '23/09/1985',
        insuranceNumber: '1 85 09 23 234 567',
        address: '456 Boulevard Voltaire, 75011 Paris',
        phone: '06 23 45 67 89',
        email: 'thomas.bernard@email.com'
      },
      mutuelleInfo: {
        name: 'CNRPS',
        type: 'Fonctionnaire',
        coverageRate: '70%',
        expectedReimbursement: '504 DT'
      },
      timeline: [
      {
        date: '11/06/2023 09:15',
        action: 'En cours de traitement',
        user: 'Système',
        status: 'processing',
        details: 'La mutuelle traite votre demande'
      },
      {
        date: '10/06/2023 16:45',
        action: 'FSE transmise',
        user: 'Dr. Dupont',
        status: 'success',
        details: 'Transmission réussie vers CNRPS'
      },
      {
        date: '10/06/2023 16:40',
        action: 'FSE créée',
        user: 'Dr. Dupont',
        status: 'success',
        details: 'Nouvelle feuille de soins créée'
      }]

    },
    'FSE-2023-043': {
      id: 'FSE-2023-043',
      patient: 'Emma Petit',
      date: '08/06/2023',
      mutuelle: 'Assurance Carte',
      amount: '270 DT',
      status: 'rejected',
      transmissionDate: '08/06/2023',
      rejectionReason: 'Documents incomplets - Prescription médicale manquante',
      rejectionDate: '09/06/2023',
      treatments: [
      {
        code: 'ODF-067',
        description: 'Contrôle mensuel',
        amount: '100 DT',
        quantity: 1
      },
      {
        code: 'ODF-023',
        description: 'Ajustement appareil orthodontique',
        amount: '170 DT',
        quantity: 1
      }],

      documents: [
      {
        name: 'Radio.jpg',
        type: 'Radiographie',
        size: '2.1 MB',
        uploadDate: '08/06/2023'
      }],

      practitioner: 'Dr. Martin',
      notes: 'Contrôle de routine',
      patientInfo: {
        name: 'Emma Petit',
        birthDate: '07/12/1998',
        insuranceNumber: '2 98 12 07 345 678',
        address: '789 Rue de la Paix, 75002 Paris',
        phone: '06 34 56 78 90',
        email: 'emma.petit@email.com'
      },
      mutuelleInfo: {
        name: 'Assurance Carte',
        type: 'Complémentaire',
        coverageRate: '60%',
        expectedReimbursement: '162 DT'
      },
      timeline: [
      {
        date: '09/06/2023 11:20',
        action: 'FSE rejetée',
        user: 'Système',
        status: 'error',
        details: 'Documents incomplets - Prescription médicale manquante'
      },
      {
        date: '08/06/2023 15:10',
        action: 'FSE transmise',
        user: 'Dr. Martin',
        status: 'success',
        details: 'Transmission réussie vers Assurance Carte'
      },
      {
        date: '08/06/2023 15:05',
        action: 'FSE créée',
        user: 'Dr. Martin',
        status: 'success',
        details: 'Nouvelle feuille de soins créée'
      }]

    }
  };
  const fse = fseData[id] || fseData['FSE-2023-045'];
  const getStatusBadge = (status) => {
    switch (status) {
      case 'sent':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <ClockIcon className="h-4 w-4 mr-1.5" />
            Envoyée
          </span>);

      case 'processing':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-4 w-4 mr-1.5" />
            En traitement
          </span>);

      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-4 w-4 mr-1.5" />
            Rejetée
          </span>);

      case 'reimbursed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            Remboursée
          </span>);

      default:
        return null;
    }
  };
  const getTimelineIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ActivityIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const handleBack = () => {
    navigate('/administration/mutuelles');
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
              {fse.patientInfo.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date de naissance</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.patientInfo.birthDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Numéro de sécurité sociale</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.patientInfo.insuranceNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Téléphone</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.patientInfo.phone}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Adresse</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.patientInfo.address}
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
              {fse.mutuelleInfo.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Type de couverture</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.mutuelleInfo.type}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Taux de remboursement</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.mutuelleInfo.coverageRate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Remboursement attendu</p>
            <p className="text-base font-semibold text-green-600">
              {fse.mutuelleInfo.expectedReimbursement}
            </p>
          </div>
        </div>
      </motion.div>
      {/* FSE Details */}
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
          <h3 className="text-lg font-bold text-gray-900">Détails de la FSE</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Praticien</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.practitioner}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date de transmission</p>
            <p className="text-base font-semibold text-gray-900">
              {fse.transmissionDate}
            </p>
          </div>
          {fse.notes &&
        <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-2">Notes</p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-sm text-gray-900">{fse.notes}</p>
              </div>
            </div>
        }
        </div>
      </motion.div>
      {/* Rejection Alert */}
      {fse.status === 'rejected' &&
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
      className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-lg p-4 shadow-md">

          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircleIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">FSE Rejetée</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{fse.rejectionReason}</p>
                <p className="mt-1 text-xs">Rejetée le {fse.rejectionDate}</p>
              </div>
              <div className="mt-4">
                <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition-all">

                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Retransmettre la FSE
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
    }
    </div>;

  const renderTreatmentsTab = () =>
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Montant
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {fse.treatments.map((treatment, index) =>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {treatment.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900">
                      {treatment.amount}
                    </p>
                  </td>
                </motion.tr>
            )}
            </tbody>
            <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <td
                colSpan={3}
                className="px-6 py-4 text-right text-sm font-bold text-gray-900">

                  Total:
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-base font-bold text-blue-600">
                    {fse.amount}
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
      {/* Reimbursement Summary */}
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
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100 shadow-lg">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <DollarSignIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Résumé du remboursement
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Montant total</p>
            <p className="text-xl font-bold text-gray-900">{fse.amount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Taux de couverture</p>
            <p className="text-xl font-bold text-blue-600">
              {fse.mutuelleInfo.coverageRate}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Remboursement attendu</p>
            <p className="text-xl font-bold text-green-600">
              {fse.mutuelleInfo.expectedReimbursement}
            </p>
          </div>
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

        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Documents joints
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {fse.documents.length} document(s) attaché(s)
            </p>
          </div>
          <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all">

            <PaperclipIcon className="h-4 w-4 mr-2" />
            Ajouter un document
          </motion.button>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {fse.documents.map((doc, index) =>
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
            Historique des actions
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Suivi chronologique de la FSE
          </p>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {fse.timeline.map((item, index) =>
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
                    {index !== fse.timeline.length - 1 &&
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
        className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl">

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
              <FileTextIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{fse.id}</h3>
              <p className="text-cyan-100 text-sm mt-1">
                {fse.patient} • {fse.date}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(fse.status)}
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="inline-flex items-center px-4 py-2 bg-white text-teal-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

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
              className="inline-flex items-center px-4 py-2 bg-white text-teal-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

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
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'details' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

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
              onClick={() => setActiveTab('treatments')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'treatments' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <ActivityIcon className="h-5 w-5 mr-2" />
                Actes
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
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'documents' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <PaperclipIcon className="h-5 w-5 mr-2" />
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
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${activeTab === 'timeline' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>

              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                Historique
              </div>
            </motion.button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'treatments' && renderTreatmentsTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'timeline' && renderTimelineTab()}
        </div>
      </motion.div>
    </div>);

};
export default FSEDetails;