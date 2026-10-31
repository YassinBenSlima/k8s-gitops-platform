import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FileTextIcon,
  DownloadIcon,
  EditIcon,
  ClockIcon } from
'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const CouvertureDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Mock data mapping based on patient name from URL
  const patientDataMap = {
    'sophie-martin': {
      id: '1',
      name: 'Sophie Martin',
      birthDate: '15/04/1992',
      insuranceNumber: '2 92 04 75 123 456',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      address: "123 Rue de l'Orthodontie, 75000 Paris",
      mutuelle: 'CNAM',
      coverageType: 'Régime général',
      coverageRate: '60%',
      annualLimit: '1500 DT',
      remainingLimit: '1050 DT',
      expiryDate: '31/12/2023',
      status: 'active',
      lastVerification: '10/06/2023',
      startDate: '01/01/2023',
      contractNumber: 'CNT-2023-78954',
      beneficiaries: [
      {
        name: 'Martin Hugo',
        relationship: 'Enfant',
        birthDate: '12/05/2010',
        coverage: 'Complète'
      },
      {
        name: 'Martin Léa',
        relationship: 'Enfant',
        birthDate: '25/09/2012',
        coverage: 'Complète'
      }],

      documents: [
      {
        id: 'DOC-001',
        name: 'Attestation de droits.pdf',
        type: 'Attestation',
        date: '05/01/2023',
        size: '1.2 MB'
      },
      {
        id: 'DOC-002',
        name: 'Carte_vitale.jpg',
        type: 'Carte vitale',
        date: '05/01/2023',
        size: '0.8 MB'
      }],

      reimbursements: [
      {
        id: 'RMB-2023-012',
        date: '15/03/2023',
        amount: '180 DT',
        originalAmount: '300 DT',
        treatment: 'Consultation orthodontique'
      },
      {
        id: 'RMB-2023-018',
        date: '20/04/2023',
        amount: '270 DT',
        originalAmount: '450 DT',
        treatment: 'Ajustement appareil orthodontique'
      }],

      history: [
      {
        date: '10/06/2023',
        action: 'Vérification des droits',
        user: 'Dr. Dupont',
        details: 'Droits actifs confirmés'
      },
      {
        date: '20/05/2023',
        action: 'Soumission FSE',
        user: 'Dr. Dupont',
        details: 'FSE-2023-042 envoyée'
      }]

    },
    'thomas-bernard': {
      id: '2',
      name: 'Thomas Bernard',
      birthDate: '23/09/1985',
      insuranceNumber: '1 85 09 23 234 567',
      email: 'thomas.bernard@email.com',
      phone: '06 23 45 67 89',
      address: '456 Boulevard Voltaire, 75011 Paris',
      mutuelle: 'CNRPS',
      coverageType: 'Fonctionnaire',
      coverageRate: '70%',
      annualLimit: '2000 DT',
      remainingLimit: '1280 DT',
      expiryDate: '31/12/2023',
      status: 'active',
      lastVerification: '08/06/2023',
      startDate: '01/01/2023',
      contractNumber: 'CNT-2023-89765',
      beneficiaries: [],
      documents: [
      {
        id: 'DOC-003',
        name: 'Attestation de droits.pdf',
        type: 'Attestation',
        date: '05/01/2023',
        size: '1.1 MB'
      }],

      reimbursements: [
      {
        id: 'RMB-2023-020',
        date: '25/05/2023',
        amount: '504 DT',
        originalAmount: '720 DT',
        treatment: 'Pose appareil multi-attaches'
      }],

      history: [
      {
        date: '08/06/2023',
        action: 'Vérification des droits',
        user: 'Dr. Martin',
        details: 'Droits actifs confirmés'
      }]

    }
  };
  const patient = patientDataMap[id] || patientDataMap['sophie-martin'];
  const handleBack = () => {
    navigate('/administration/mutuelles');
  };
  const [activeTab, setActiveTab] = useState('coverage');
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>);

      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>);

    }
  };
  const renderCoverageTab = () =>
  <div>
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 mb-6">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Détails de la couverture
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Informations sur la couverture d'assurance maladie du patient
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Mutuelle</dt>
              <dd className="mt-1 text-sm text-gray-900">{patient.mutuelle}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Numéro de contrat
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {patient.contractNumber}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Type de couverture
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {patient.coverageType}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Taux de remboursement
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {patient.coverageRate}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Date de début
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {patient.startDate}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Date d'expiration
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {patient.expiryDate}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Statut</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {getStatusBadge(patient.status)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Dernière vérification
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {patient.lastVerification}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 mb-6">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Plafond annuel
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">Plafond total:</span>
            <span className="text-sm font-medium text-gray-900">
              {patient.annualLimit}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">Reste à utiliser:</span>
            <span className="text-sm font-medium text-gray-900">
              {patient.remainingLimit}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
              <div
              style={{
                width: `${parseInt(patient.remainingLimit) / parseInt(patient.annualLimit) * 100}%`
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
            </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0 DT</span>
              <span>{patient.annualLimit}</span>
            </div>
          </div>
        </div>
      </div>
      {patient.beneficiaries.length > 0 &&
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Bénéficiaires
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Nom
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Lien
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Date de naissance
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Couverture
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patient.beneficiaries.map((beneficiary, index) =>
              <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {beneficiary.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {beneficiary.relationship}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {beneficiary.birthDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {beneficiary.coverage}
                      </td>
                    </tr>
              )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    }
    </div>;

  const renderDocumentsTab = () =>
  <div>
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Documents
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Documents liés à la couverture d'assurance
            </p>
          </div>
          <Link
          to="/administration/mutuelles/documents/upload"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

            Ajouter un document
          </Link>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Nom
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Type
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Date
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                    Taille
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patient.documents.map((doc) =>
              <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button className="text-blue-600 hover:text-blue-900">
                          <DownloadIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;

  const renderReimbursementsTab = () =>
  <div>
      <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Historique des remboursements
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {patient.reimbursements.length > 0 ?
        <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Référence
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Date
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Traitement
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Montant initial
                    </th>
                    <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                      Montant remboursé
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patient.reimbursements.map((reimbursement) =>
              <tr key={reimbursement.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reimbursement.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reimbursement.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reimbursement.treatment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reimbursement.originalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reimbursement.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                    to={`/administration/mutuelles/remboursements/${reimbursement.id}`}
                    className="text-blue-600 hover:text-blue-900">

                          Détails
                        </Link>
                      </td>
                    </tr>
              )}
                </tbody>
              </table>
            </div> :

        <div className="text-center py-6">
              <p className="text-sm text-gray-500">
                Aucun remboursement trouvé
              </p>
            </div>
        }
        </div>
      </div>
    </div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Couverture d'assurance
        </h3>
        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleBack}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Retour
        </motion.button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="font-medium text-indigo-800 text-lg">
                {patient.name.
                split(' ').
                map((name) => name[0]).
                join('')}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">
                {patient.name}
              </h2>
              <div className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  Né(e) le {patient.birthDate}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  N° {patient.insuranceNumber}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/administration/mutuelles/verification`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

              <ClockIcon className="h-4 w-4 mr-1" />
              Vérifier les droits
            </Link>
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <EditIcon className="h-4 w-4 mr-1" />
              Modifier
            </button>
          </div>
        </div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('coverage')}
              className={`${activeTab === 'coverage' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}>

              Couverture
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}>

              Documents
            </button>
            <button
              onClick={() => setActiveTab('reimbursements')}
              className={`${activeTab === 'reimbursements' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}>

              Remboursements
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'coverage' && renderCoverageTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'reimbursements' && renderReimbursementsTab()}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <button
            className="flex items-center justify-between w-full focus:outline-none"
            onClick={() => setHistoryExpanded(!historyExpanded)}>

            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Historique des actions
            </h3>
            {historyExpanded ?
            <ChevronUpIcon className="h-5 w-5 text-gray-500" /> :

            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            }
          </button>
        </div>
        {historyExpanded &&
        <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {patient.history.map((item, index) =>
            <li key={index} className="py-3">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <CalendarIcon className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.details} • {item.user} • {item.date}
                      </p>
                    </div>
                  </div>
                </li>
            )}
            </ul>
          </div>
        }
      </div>
    </div>);

};
export default CouvertureDetails;