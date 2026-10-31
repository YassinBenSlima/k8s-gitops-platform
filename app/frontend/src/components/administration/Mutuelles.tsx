import React, { useState } from 'react';
import {
  SearchIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FileTextIcon,
  DownloadIcon,
  UploadIcon,
  EyeIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  UserIcon,
  CalendarIcon,
  FileIcon,
  XIcon,
  SaveIcon,
  PaperclipIcon,
  CheckIcon,
  InfoIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ActivityIcon,
  ShieldCheckIcon,
  SparklesIcon,
  AwardIcon,
  CheckSquareIcon } from
'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const Mutuelles = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('fse');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewFSEModal, setShowNewFSEModal] = useState(false);
  const [showFSEDetails, setShowFSEDetails] = useState(false);
  const [selectedFSE, setSelectedFSE] = useState(null);
  // Form state for new FSE
  const [formData, setFormData] = useState({
    patient: '',
    mutuelle: '',
    date: '',
    practitioner: 'Dr. Dupont',
    notes: ''
  });
  const [completedFields, setCompletedFields] = useState({
    patient: false,
    mutuelle: false,
    date: false,
    practitioner: false
  });
  // Stateful FSE data so status can be mutated inline
  const [fseData, setFseData] = useState([
  {
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
      amount: '150 DT'
    },
    {
      code: 'ODF-023',
      description: 'Ajustement appareil orthodontique',
      amount: '300 DT'
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
    }
  },
  {
    id: 'FSE-2023-044',
    patient: 'Thomas Bernard',
    date: '10/06/2023',
    mutuelle: 'CNRPS',
    amount: '720 DT',
    status: 'processing',
    transmissionDate: '10/06/2023'
  },
  {
    id: 'FSE-2023-043',
    patient: 'Emma Petit',
    date: '08/06/2023',
    mutuelle: 'Assurance Carte',
    amount: '270 DT',
    status: 'rejected',
    transmissionDate: '08/06/2023',
    rejectionReason: 'Documents incomplets'
  },
  {
    id: 'FSE-2023-042',
    patient: 'Lucas Dubois',
    date: '05/06/2023',
    mutuelle: 'CNAM',
    amount: '540 DT',
    status: 'reimbursed',
    transmissionDate: '05/06/2023',
    reimbursementDate: '10/06/2023'
  }]
  );
  const handleFSEStatusChange = (fseId: string, newStatus: string) => {
    setFseData((prev) =>
    prev.map((fse) =>
    fse.id === fseId ?
    {
      ...fse,
      status: newStatus
    } :
    fse
    )
    );
  };
  // Mock data for reimbursements
  const reimbursementData = [
  {
    id: 'RMB-2023-023',
    patient: 'Lucas Dubois',
    date: '10/06/2023',
    mutuelle: 'CNAM',
    amount: '540 DT',
    originalAmount: '900 DT',
    coverage: '60%',
    fseReference: 'FSE-2023-042'
  },
  {
    id: 'RMB-2023-022',
    patient: 'Nathan Robert',
    date: '08/06/2023',
    mutuelle: 'Assurance Carte',
    amount: '210 DT',
    originalAmount: '350 DT',
    coverage: '60%',
    fseReference: 'FSE-2023-041'
  },
  {
    id: 'RMB-2023-021',
    patient: 'Léa Richard',
    date: '05/06/2023',
    mutuelle: 'CNRPS',
    amount: '315 DT',
    originalAmount: '450 DT',
    coverage: '70%',
    fseReference: 'FSE-2023-040'
  }];

  // Stateful insurance data so status can be mutated
  const [insuranceData, setInsuranceData] = useState([
  {
    patient: 'Sophie Martin',
    mutuelle: 'CNAM',
    coverageType: 'Régime général',
    coverageRate: '60%',
    annualLimit: '1500 DT',
    remainingLimit: '1050 DT',
    expiryDate: '31/12/2023',
    status: 'active'
  },
  {
    patient: 'Thomas Bernard',
    mutuelle: 'CNRPS',
    coverageType: 'Fonctionnaire',
    coverageRate: '70%',
    annualLimit: '2000 DT',
    remainingLimit: '1280 DT',
    expiryDate: '31/12/2023',
    status: 'active'
  },
  {
    patient: 'Emma Petit',
    mutuelle: 'Assurance Carte',
    coverageType: 'Complémentaire',
    coverageRate: '60%',
    annualLimit: '1000 DT',
    remainingLimit: '730 DT',
    expiryDate: '31/12/2023',
    status: 'active'
  },
  {
    patient: 'Lucas Dubois',
    mutuelle: 'CNAM',
    coverageType: 'Régime général',
    coverageRate: '60%',
    annualLimit: '1500 DT',
    remainingLimit: '960 DT',
    expiryDate: '31/12/2023',
    status: 'active'
  }]
  );
  const handleInsuranceStatusChange = (
  patientName: string,
  newStatus: string) =>
  {
    setInsuranceData((prev) =>
    prev.map((ins) =>
    ins.patient === patientName ?
    {
      ...ins,
      status: newStatus
    } :
    ins
    )
    );
  };
  // Calculate statistics
  const stats = {
    totalFSE: fseData.length,
    sentFSE: fseData.filter((f) => f.status === 'sent').length,
    processingFSE: fseData.filter((f) => f.status === 'processing').length,
    reimbursedFSE: fseData.filter((f) => f.status === 'reimbursed').length,
    rejectedFSE: fseData.filter((f) => f.status === 'rejected').length,
    totalReimbursements: reimbursementData.length,
    totalReimbursedAmount: '1065 DT',
    activeInsurance: insuranceData.filter((i) => i.status === 'active').length
  };
  // Mock data for patients
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    birthDate: '15/04/1992',
    insuranceNumber: '2 92 04 75 123 456'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    birthDate: '23/09/1985',
    insuranceNumber: '1 85 09 23 234 567'
  },
  {
    id: 3,
    name: 'Emma Petit',
    birthDate: '07/12/1998',
    insuranceNumber: '2 98 12 07 345 678'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    birthDate: '30/06/1976',
    insuranceNumber: '1 76 06 30 456 789'
  },
  {
    id: 5,
    name: 'Nathan Robert',
    birthDate: '18/03/1990',
    insuranceNumber: '1 90 03 18 567 890'
  },
  {
    id: 6,
    name: 'Léa Richard',
    birthDate: '25/11/1982',
    insuranceNumber: '2 82 11 25 678 901'
  }];

  // Mock data for treatment codes
  const treatmentCodes = [
  {
    code: 'ODF-001',
    description: 'Consultation orthodontique',
    amount: '150 DT'
  },
  {
    code: 'ODF-002',
    description: 'Bilan orthodontique complet',
    amount: '250 DT'
  },
  {
    code: 'ODF-023',
    description: 'Ajustement appareil orthodontique',
    amount: '300 DT'
  },
  {
    code: 'ODF-045',
    description: 'Pose appareil multi-attaches',
    amount: '800 DT'
  },
  {
    code: 'ODF-067',
    description: 'Contrôle mensuel',
    amount: '100 DT'
  },
  {
    code: 'ODF-089',
    description: 'Dépose appareil',
    amount: '200 DT'
  },
  {
    code: 'ODF-112',
    description: 'Contention fixe',
    amount: '250 DT'
  }];

  // Mock data for mutuelles
  const mutuelles = [
  {
    id: 1,
    name: 'CNAM',
    type: 'Régime général'
  },
  {
    id: 2,
    name: 'CNRPS',
    type: 'Fonctionnaire'
  },
  {
    id: 3,
    name: 'Assurance Carte',
    type: 'Complémentaire'
  },
  {
    id: 4,
    name: 'MGPTT',
    type: 'Complémentaire'
  },
  {
    id: 5,
    name: 'MDS',
    type: 'Complémentaire'
  }];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'sent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            Envoyée
          </span>);

      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            En traitement
          </span>);

      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Rejetée
          </span>);

      case 'reimbursed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Remboursée
          </span>);

      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Active
          </span>);

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>);

    }
  };
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Mark field as completed if it has a value
    if (value && value.trim() !== '') {
      setCompletedFields((prev) => ({
        ...prev,
        [field]: true
      }));
    } else {
      setCompletedFields((prev) => ({
        ...prev,
        [field]: false
      }));
    }
  };
  const handleNewFSE = () => {
    navigate('/administration/mutuelles/nouvelle');
  };
  const handleViewFSE = (fseId) => {
    navigate(`/administration/mutuelles/fse/${fseId}`);
  };
  const handleViewReimbursement = (reimbursementId) => {
    navigate(`/administration/mutuelles/reimbursement/${reimbursementId}`);
  };
  const handleViewCoverage = (patientName) => {
    // Convert patient name to an ID-like format for the route
    const coverageId = patientName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/administration/mutuelles/couverture/${coverageId}`);
  };
  const handleNewCoverage = () => {
    navigate('/administration/mutuelles/couverture/nouvelle');
  };
  const renderFSETab = () =>
  <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Rechercher une FSE..."
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
        onClick={handleNewFSE}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

          <PlusIcon className="h-4 w-4 mr-2" />
          Nouvelle FSE
        </motion.button>
      </div>
      {/* FSE Table */}
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
                  Référence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Mutuelle
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
              {fseData.map((fse, index) =>
            <motion.tr
              key={fse.id}
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
              className="transition-all dark:hover:bg-gray-700/50">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {fse.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {fse.patient.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {fse.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {fse.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {fse.mutuelle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {fse.amount}
                    </div>
                  </td>
                  {/* Inline FSE status selector */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 w-fit">
                      {/* Envoyée */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() => handleFSEStatusChange(fse.id, 'sent')}
                    title="Envoyée"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${fse.status === 'sent' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:text-blue-500'}`}>

                        <ClockIcon className="h-3.5 w-3.5" />
                        {fse.status === 'sent' && <span>Envoyée</span>}
                      </motion.button>
                      {/* En traitement */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                    handleFSEStatusChange(fse.id, 'processing')
                    }
                    title="En traitement"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${fse.status === 'processing' ? 'bg-white dark:bg-gray-600 shadow-sm text-yellow-600 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500 hover:text-yellow-500'}`}>

                        <AlertCircleIcon className="h-3.5 w-3.5" />
                        {fse.status === 'processing' &&
                    <span>En traitement</span>
                    }
                      </motion.button>
                      {/* Remboursée */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                    handleFSEStatusChange(fse.id, 'reimbursed')
                    }
                    title="Remboursée"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${fse.status === 'reimbursed' ? 'bg-white dark:bg-gray-600 shadow-sm text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500 hover:text-green-500'}`}>

                        <CheckIcon className="h-3.5 w-3.5" />
                        {fse.status === 'reimbursed' && <span>Remboursée</span>}
                      </motion.button>
                      {/* Rejetée */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                    handleFSEStatusChange(fse.id, 'rejected')
                    }
                    title="Rejetée"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${fse.status === 'rejected' ? 'bg-white dark:bg-gray-600 shadow-sm text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500 hover:text-red-500'}`}>

                        <XIcon className="h-3.5 w-3.5" />
                        {fse.status === 'rejected' && <span>Rejetée</span>}
                      </motion.button>
                      {/* View FSE */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() => handleViewFSE(fse.id)}
                    title="Voir détails"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-gray-400 dark:text-gray-500 hover:text-blue-500">

                        <FileTextIcon className="h-3.5 w-3.5" />
                      </motion.button>
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
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    onClick={() => handleViewFSE(fse.id)}>

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
      {/* Alert for rejected FSE */}
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-500 rounded-lg p-4 shadow-md">

        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircleIcon className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
              FSE en attente de documents
            </h3>
            <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
              <p>
                La FSE-2023-043 pour Emma Petit a été rejetée car des documents
                sont manquants. Veuillez téléverser les documents requis pour
                relancer la demande.
              </p>
              <Link
              to="/administration/mutuelles/documents/upload"
              className="mt-3 inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg font-medium shadow-md hover:bg-amber-700 transition-all">

                <UploadIcon className="h-4 w-4 mr-2" />
                Ajouter les documents
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;

  const renderReimbursementsTab = () =>
  <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Rechercher un remboursement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      </div>
      {/* Reimbursements Table */}
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
                  Référence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Mutuelle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Montant remboursé
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Taux
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {reimbursementData.map((reimbursement, index) =>
            <motion.tr
              key={reimbursement.id}
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
                    {reimbursement.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {reimbursement.patient.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {reimbursement.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {reimbursement.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {reimbursement.mutuelle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">
                      {reimbursement.amount}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      sur {reimbursement.originalAmount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {reimbursement.coverage}
                    </span>
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
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    onClick={() =>
                    handleViewReimbursement(reimbursement.id)
                    }>

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
      {/* Success message */}
      <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-400 dark:border-green-500 rounded-lg p-4 shadow-md">

        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              Remboursements à jour
            </h3>
            <div className="mt-2 text-sm text-green-700 dark:text-green-300">
              <p>
                Tous les remboursements ont été correctement traités. Aucune
                action n'est requise.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;

  const renderInsuranceTab = () =>
  <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Rechercher un patient..."
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
        onClick={handleNewCoverage}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une couverture
        </motion.button>
      </div>
      {/* Insurance Table */}
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
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Mutuelle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Type de couverture
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Taux
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Plafond annuel
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Reste à utiliser
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
              {insuranceData.map((insurance, index) =>
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
              }}
              className="transition-all dark:hover:bg-gray-700/50">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {insurance.patient.
                    split(' ').
                    map((name) => name[0]).
                    join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {insurance.patient}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {insurance.mutuelle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {insurance.coverageType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {insurance.coverageRate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {insurance.annualLimit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {insurance.remainingLimit}
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all"
                    style={{
                      width: `${parseInt(insurance.remainingLimit) / parseInt(insurance.annualLimit) * 100}%`
                    }} />

                    </div>
                  </td>
                  {/* Inline status selector */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 w-fit">
                      {/* Active */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                    handleInsuranceStatusChange(
                      insurance.patient,
                      'active'
                    )
                    }
                    title="Actif"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${insurance.status === 'active' ? 'bg-white dark:bg-gray-600 shadow-sm text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500 hover:text-green-500'}`}>

                        <CheckIcon className="h-3.5 w-3.5" />
                        {insurance.status === 'active' && <span>Actif</span>}
                      </motion.button>
                      {/* Inactive */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                    handleInsuranceStatusChange(
                      insurance.patient,
                      'inactive'
                    )
                    }
                    title="Inactif"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${insurance.status === 'inactive' ? 'bg-white dark:bg-gray-600 shadow-sm text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500 hover:text-red-500'}`}>

                        <XIcon className="h-3.5 w-3.5" />
                        {insurance.status === 'inactive' &&
                    <span>Inactif</span>
                    }
                      </motion.button>
                      {/* Expired */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() =>
                    handleInsuranceStatusChange(
                      insurance.patient,
                      'expired'
                    )
                    }
                    title="Expiré"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${insurance.status === 'expired' ? 'bg-white dark:bg-gray-600 shadow-sm text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500 hover:text-amber-500'}`}>

                        <ClockIcon className="h-3.5 w-3.5" />
                        {insurance.status === 'expired' && <span>Expiré</span>}
                      </motion.button>
                      {/* View details */}
                      <motion.button
                    whileTap={{
                      scale: 0.92
                    }}
                    onClick={() => handleViewCoverage(insurance.patient)}
                    title="Voir détails"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-gray-400 dark:text-gray-500 hover:text-blue-500">

                        <FileTextIcon className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <motion.button
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => handleViewCoverage(insurance.patient)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">

                      <ArrowRightIcon className="h-5 w-5" />
                    </motion.button>
                  </td>
                </motion.tr>
            )}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Info message */}
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
            <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Vérification des droits
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p>
                Vous pouvez vérifier les droits d'un patient en temps réel en
                utilisant notre service de télétransmission.
              </p>
              <Link
              to="/administration/mutuelles/verification"
              className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all">

                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Vérifier les droits
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
        {
          label: 'FSE totales',
          value: String(stats.totalFSE),
          icon: FileTextIcon,
          color: 'blue',
          subtext: 'feuilles de soins'
        },
        {
          label: 'Remboursées',
          value: String(stats.reimbursedFSE),
          icon: CheckCircleIcon,
          color: 'green',
          subtext: 'traitées avec succès'
        },
        {
          label: 'Montant remboursé',
          value: stats.totalReimbursedAmount,
          icon: DollarSignIcon,
          color: 'amber',
          subtext: 'exercice en cours'
        },
        {
          label: 'Couvertures actives',
          value: String(stats.activeInsurance),
          icon: ActivityIcon,
          color: 'indigo',
          subtext: 'patients couverts'
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
              onClick={() => setSelectedTab('fse')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'fse' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

              <div className="flex items-center">
                <FileTextIcon className="h-5 w-5 mr-2" />
                Feuilles de soins
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('reimbursements')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'reimbursements' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

              <div className="flex items-center">
                <DollarSignIcon className="h-5 w-5 mr-2" />
                Remboursements
              </div>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => setSelectedTab('insurance')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all ${selectedTab === 'insurance' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>

              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Couverture patient
              </div>
            </motion.button>
          </nav>
        </div>
        <div className="p-6 dark:bg-gray-800">
          {selectedTab === 'fse' && renderFSETab()}
          {selectedTab === 'reimbursements' && renderReimbursementsTab()}
          {selectedTab === 'insurance' && renderInsuranceTab()}
        </div>
      </motion.div>
    </div>);

};
export default Mutuelles;