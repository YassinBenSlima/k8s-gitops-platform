import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  UserIcon,
  ShieldCheckIcon,
  SaveIcon,
  CheckCircleIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  UploadIcon,
  XIcon,
  PlusIcon } from
'lucide-react';
const NouvelleCouverture = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patient: '',
    mutuelle: '',
    coverageType: '',
    coverageRate: '',
    annualLimit: '',
    startDate: '',
    expiryDate: '',
    contractNumber: '',
    notes: ''
  });
  const [completedFields, setCompletedFields] = useState({
    patient: false,
    mutuelle: false,
    coverageType: false,
    coverageRate: false,
    annualLimit: false,
    startDate: false,
    expiryDate: false,
    contractNumber: false
  });
  const [documents, setDocuments] = useState([]);
  // Mock data
  const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    birthDate: '15/04/1992'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    birthDate: '23/09/1985'
  },
  {
    id: 3,
    name: 'Emma Petit',
    birthDate: '07/12/1998'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    birthDate: '30/06/1976'
  },
  {
    id: 5,
    name: 'Nathan Robert',
    birthDate: '18/03/1990'
  },
  {
    id: 6,
    name: 'Léa Richard',
    birthDate: '25/11/1982'
  }];

  const mutuelles = [
  {
    id: 1,
    name: 'CNAM',
    type: 'Régime général',
    defaultRate: '60%'
  },
  {
    id: 2,
    name: 'CNRPS',
    type: 'Fonctionnaire',
    defaultRate: '70%'
  },
  {
    id: 3,
    name: 'Assurance Carte',
    type: 'Complémentaire',
    defaultRate: '60%'
  },
  {
    id: 4,
    name: 'MGPTT',
    type: 'Complémentaire',
    defaultRate: '60%'
  },
  {
    id: 5,
    name: 'MDS',
    type: 'Complémentaire',
    defaultRate: '65%'
  }];

  const coverageTypes = [
  'Régime général',
  'Fonctionnaire',
  'Complémentaire',
  'Régime spécial'];

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
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
    // Auto-fill coverage type and rate when mutuelle is selected
    if (field === 'mutuelle') {
      const selectedMutuelle = mutuelles.find((m) => m.name === value);
      if (selectedMutuelle) {
        setFormData((prev) => ({
          ...prev,
          coverageType: selectedMutuelle.type,
          coverageRate: selectedMutuelle.defaultRate
        }));
        setCompletedFields((prev) => ({
          ...prev,
          coverageType: true,
          coverageRate: true
        }));
      }
    }
  };
  const handleDocumentAdd = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map((file: any) => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type
    }));
    setDocuments([...documents, ...newDocuments]);
  };
  const handleDocumentRemove = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };
  const handleBack = () => {
    navigate('/administration/mutuelles');
  };
  const handleSave = () => {
    // Validate and save
    console.log('Saving coverage:', formData);
    navigate('/administration/mutuelles');
  };
  const isStep1Complete =
  completedFields.patient &&
  completedFields.mutuelle &&
  completedFields.coverageType;
  const isStep2Complete =
  completedFields.coverageRate &&
  completedFields.annualLimit &&
  completedFields.startDate &&
  completedFields.expiryDate;
  const renderStep1 = () =>
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
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Sélection du patient
          </h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient *
          </label>
          <select
          value={formData.patient}
          onChange={(e) => handleFieldChange('patient', e.target.value)}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

            <option value="">Sélectionner un patient</option>
            {patients.map((patient) =>
          <option key={patient.id} value={patient.name}>
                {patient.name} - Né(e) le {patient.birthDate}
              </option>
          )}
          </select>
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
        delay: 0.1
      }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
            <ShieldCheckIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Informations mutuelle
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mutuelle *
            </label>
            <select
            value={formData.mutuelle}
            onChange={(e) => handleFieldChange('mutuelle', e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">

              <option value="">Sélectionner une mutuelle</option>
              {mutuelles.map((mutuelle) =>
            <option key={mutuelle.id} value={mutuelle.name}>
                  {mutuelle.name} - {mutuelle.type}
                </option>
            )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de couverture *
            </label>
            <select
            value={formData.coverageType}
            onChange={(e) =>
            handleFieldChange('coverageType', e.target.value)
            }
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">

              <option value="">Sélectionner un type</option>
              {coverageTypes.map((type) =>
            <option key={type} value={type}>
                  {type}
                </option>
            )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de contrat
            </label>
            <input
            type="text"
            value={formData.contractNumber}
            onChange={(e) =>
            handleFieldChange('contractNumber', e.target.value)
            }
            placeholder="CNT-2023-XXXXX"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />

          </div>
        </div>
      </motion.div>
    </div>;

  const renderStep2 = () =>
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
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <DollarSignIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Détails de couverture
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taux de remboursement * (%)
            </label>
            <input
            type="text"
            value={formData.coverageRate}
            onChange={(e) =>
            handleFieldChange('coverageRate', e.target.value)
            }
            placeholder="60%"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plafond annuel * (DT)
            </label>
            <input
            type="text"
            value={formData.annualLimit}
            onChange={(e) => handleFieldChange('annualLimit', e.target.value)}
            placeholder="1500"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />

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
        delay: 0.1
      }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-100">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
            <CalendarIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Période de validité
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début *
            </label>
            <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleFieldChange('startDate', e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date d'expiration *
            </label>
            <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />

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
      className="bg-white rounded-2xl p-6 border-2 border-gray-100">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mr-3">
            <FileTextIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Notes additionnelles
          </h3>
        </div>
        <textarea
        value={formData.notes}
        onChange={(e) => handleFieldChange('notes', e.target.value)}
        rows={4}
        placeholder="Ajoutez des notes ou commentaires..."
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />

      </motion.div>
    </div>;

  const renderStep3 = () =>
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
      className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <FileTextIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Documents</h3>
              <p className="text-sm text-gray-600">
                Attestations, carte vitale, etc.
              </p>
            </div>
          </div>
          <label className="cursor-pointer">
            <input
            type="file"
            multiple
            onChange={handleDocumentAdd}
            className="hidden" />

            <motion.div
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all">

              <UploadIcon className="h-4 w-4 mr-2" />
              Ajouter des fichiers
            </motion.div>
          </label>
        </div>
        {documents.length > 0 ?
      <div className="space-y-3">
            {documents.map((doc, index) =>
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
          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">

                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <FileTextIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-600">{doc.size}</p>
                  </div>
                </div>
                <motion.button
            whileHover={{
              scale: 1.1
            }}
            whileTap={{
              scale: 0.9
            }}
            onClick={() => handleDocumentRemove(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">

                  <XIcon className="h-5 w-5" />
                </motion.button>
              </motion.div>
        )}
          </div> :

      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Aucun document ajouté</p>
            <p className="text-xs text-gray-500 mt-1">
              Les documents sont optionnels
            </p>
          </div>
      }
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
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">

        <div className="flex items-center mb-4">
          <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
          <h3 className="text-lg font-bold text-gray-900">Récapitulatif</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Patient:</span>
            <span className="text-sm font-semibold text-gray-900">
              {formData.patient || '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Mutuelle:</span>
            <span className="text-sm font-semibold text-gray-900">
              {formData.mutuelle || '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Type de couverture:</span>
            <span className="text-sm font-semibold text-gray-900">
              {formData.coverageType || '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Taux de remboursement:
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {formData.coverageRate || '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Plafond annuel:</span>
            <span className="text-sm font-semibold text-gray-900">
              {formData.annualLimit ? `${formData.annualLimit} DT` : '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Période:</span>
            <span className="text-sm font-semibold text-gray-900">
              {formData.startDate && formData.expiryDate ?
            `${formData.startDate} - ${formData.expiryDate}` :
            '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Documents:</span>
            <span className="text-sm font-semibold text-gray-900">
              {documents.length} fichier(s)
            </span>
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
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">

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
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Nouvelle couverture</h3>
              <p className="text-indigo-100 text-sm mt-1">
                Enregistrer une nouvelle couverture d'assurance
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Progress Steps */}
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
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) =>
          <div key={step} className="flex items-center flex-1">
              <div className="flex items-center flex-col">
                <motion.div
                whileHover={{
                  scale: 1.1
                }}
                className={`h-12 w-12 rounded-full flex items-center justify-center font-bold transition-all ${currentStep === step ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg' : currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>

                  {currentStep > step ?
                <CheckCircleIcon className="h-6 w-6" /> :

                step
                }
                </motion.div>
                <span className="text-xs font-medium text-gray-600 mt-2">
                  {step === 1 && 'Patient & Mutuelle'}
                  {step === 2 && 'Couverture'}
                  {step === 3 && 'Documents'}
                </span>
              </div>
              {step < 3 &&
            <div
              className={`flex-1 h-1 mx-4 rounded transition-all ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`} />

            }
            </div>
          )}
        </div>
      </motion.div>
      {/* Form Content */}
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
        }}>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </motion.div>
      {/* Navigation Buttons */}
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
        className="flex justify-between items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-600 text-white hover:bg-gray-700'}`}>

          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Précédent
        </motion.button>
        {currentStep < 3 ?
        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={
          currentStep === 1 && !isStep1Complete ||
          currentStep === 2 && !isStep2Complete
          }
          className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${currentStep === 1 && !isStep1Complete || currentStep === 2 && !isStep2Complete ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'}`}>

            Suivant
            <ArrowLeftIcon className="h-5 w-5 ml-2 rotate-180" />
          </motion.button> :

        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleSave}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">

            <SaveIcon className="h-5 w-5 mr-2" />
            Enregistrer la couverture
          </motion.button>
        }
      </motion.div>
    </div>);

};
export default NouvelleCouverture;