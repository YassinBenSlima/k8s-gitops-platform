import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  SaveIcon,
  XIcon,
  CheckIcon,
  InfoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  WalletIcon,
  CreditCardIcon,
  FileTextIcon,
  CalendarIcon,
  DollarSignIcon,
  TagIcon,
  AlertCircleIcon,
  SparklesIcon,
  TrendingUpIcon,
  ShoppingCartIcon,
  UsersIcon,
  BuildingIcon,
  ZapIcon,
  UploadIcon,
  ScanIcon,
  FileIcon,
  ImageIcon,
  Loader2Icon,
  CheckCircleIcon } from
'lucide-react';
const NouveauMouvementTresorerie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    category: '',
    description: '',
    amount: '',
    paymentMethod: '',
    notes: ''
  });
  const [completedFields, setCompletedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [showExtraction, setShowExtraction] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const movementTypes = [
  {
    id: 'entree',
    label: 'Entrée',
    description: 'Encaissement / Revenu',
    icon: ArrowUpIcon,
    color: 'green',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-500'
  },
  {
    id: 'sortie',
    label: 'Sortie',
    description: 'Décaissement / Dépense',
    icon: ArrowDownIcon,
    color: 'red',
    bgGradient: 'from-red-50 to-pink-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-500'
  }];

  const categories = {
    entree: [
    {
      id: 'consultation',
      label: 'Consultation',
      icon: UsersIcon,
      color: 'blue'
    },
    {
      id: 'traitement',
      label: 'Traitement',
      icon: TrendingUpIcon,
      color: 'purple'
    },
    {
      id: 'equipement',
      label: 'Vente Équipement',
      icon: BuildingIcon,
      color: 'indigo'
    },
    {
      id: 'autre_entree',
      label: 'Autre',
      icon: ZapIcon,
      color: 'gray'
    }],

    sortie: [
    {
      id: 'fournitures',
      label: 'Fournitures',
      icon: ShoppingCartIcon,
      color: 'orange'
    },
    {
      id: 'salaires',
      label: 'Salaires',
      icon: UsersIcon,
      color: 'purple'
    },
    {
      id: 'equipement_achat',
      label: 'Achat Équipement',
      icon: BuildingIcon,
      color: 'indigo'
    },
    {
      id: 'loyer',
      label: 'Loyer',
      icon: BuildingIcon,
      color: 'blue'
    },
    {
      id: 'autre_sortie',
      label: 'Autre',
      icon: ZapIcon,
      color: 'gray'
    }]

  };
  const paymentMethods = [
  {
    id: 'carte',
    label: 'Carte Bancaire',
    icon: CreditCardIcon,
    color: 'blue'
  },
  {
    id: 'especes',
    label: 'Espèces',
    icon: WalletIcon,
    color: 'green'
  },
  {
    id: 'cheque',
    label: 'Chèque',
    icon: FileTextIcon,
    color: 'purple'
  },
  {
    id: 'virement',
    label: 'Virement',
    icon: ArrowUpIcon,
    color: 'indigo'
  }];

  // Mock OCR extraction function
  const performOCR = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate extracted data from bank statement
        const mockExtractedData = {
          date: '2024-01-15',
          type: 'sortie',
          category: 'fournitures',
          description: 'Achat fournitures dentaires - Fournisseur XYZ',
          amount: '1250.00',
          paymentMethod: 'carte',
          confidence: {
            date: 98,
            type: 95,
            category: 87,
            description: 92,
            amount: 99,
            paymentMethod: 90
          }
        };
        resolve(mockExtractedData);
      }, 3000); // Simulate 3 second processing
    });
  };
  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploadedFile(file);
    setIsProcessing(true);
    setShowExtraction(false);
    try {
      const extracted = await performOCR(file);
      setExtractedData(extracted);
      setIsProcessing(false);
      setShowExtraction(true);
    } catch (error) {
      console.error('OCR Error:', error);
      setIsProcessing(false);
      alert("Erreur lors de l'extraction des données");
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  const handleApplyExtractedData = () => {
    if (!extractedData) return;
    setFormData({
      date: extractedData.date,
      type: extractedData.type,
      category: extractedData.category,
      description: extractedData.description,
      amount: extractedData.amount,
      paymentMethod: extractedData.paymentMethod,
      notes: formData.notes
    });
    // Mark all fields as completed
    setCompletedFields({
      date: true,
      type: true,
      category: true,
      description: true,
      amount: true,
      paymentMethod: true
    });
    setShowExtraction(false);
    setExtractedData(null);
  };
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedData(null);
    setShowExtraction(false);
  };
  const getFileIcon = (file) => {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />;
    } else if (file.type === 'application/pdf') {
      return <FileTextIcon className="h-6 w-6 text-red-500 dark:text-red-400" />;
    } else {
      return <FileIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />;
    }
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 dark:text-green-400';
    if (confidence >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  const getConfidenceBg = (confidence) => {
    if (confidence >= 90) return 'bg-green-100 dark:bg-green-900/30';
    if (confidence >= 70) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (field === 'amount') {
      setCompletedFields((prev) => ({
        ...prev,
        [field]: value && !isNaN(parseFloat(value)) && parseFloat(value) > 0
      }));
    } else {
      setCompletedFields((prev) => ({
        ...prev,
        [field]: !!value
      }));
    }
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null
      }));
    }
  };
  const calculateProgress = () => {
    const requiredFields = [
    'date',
    'type',
    'category',
    'description',
    'amount',
    'paymentMethod'];

    const completed = requiredFields.filter(
      (field) => completedFields[field]
    ).length;
    return Math.round(completed / requiredFields.length * 100);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }
    if (!formData.type) {
      newErrors.type = 'Le type de mouvement est requis';
    }
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    if (!formData.description || formData.description.trim().length < 3) {
      newErrors.description =
      'La description doit contenir au moins 3 caractères';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Le montant doit être supérieur à 0';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Le moyen de paiement est requis';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      navigate('/administration/comptabilite');
    }
  };
  const progress = calculateProgress();
  const selectedType = movementTypes.find((t) => t.id === formData.type);
  const availableCategories = formData.type ?
  categories[formData.type] || [] :
  [];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => navigate('/administration/comptabilite')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">

            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nouveau Mouvement de Trésorerie
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Enregistrez une entrée ou sortie de trésorerie
            </p>
          </div>
        </div>
      </div>
      {/* OCR Upload Section */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-indigo-200 dark:border-gray-600">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mr-3">
            <ScanIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Extraction automatique (OCR)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Téléversez un extrait bancaire ou document pour remplir
              automatiquement le formulaire
            </p>
          </div>
        </div>
        {!uploadedFile && !isProcessing &&
        <motion.div
          animate={{
            scale: dragActive ? 1.02 : 1
          }}
          className={`relative border-3 border-dashed rounded-2xl p-8 transition-all ${dragActive ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-100 dark:bg-indigo-900/20' : 'border-indigo-200 dark:border-gray-600 bg-white dark:bg-gray-800'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}>

            <div className="text-center">
              <motion.div
              animate={{
                y: dragActive ? -10 : 0
              }}
              className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">

                <UploadIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex text-sm text-gray-600 dark:text-gray-300 justify-center">
                <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-xl px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 transition-all">

                  <span>Télécharger un document</span>
                  <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange} />

                </label>
                <p className="pl-2 self-center">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PDF, JPG, PNG jusqu'à 10MB
              </p>
            </div>
          </motion.div>
        }
        {isProcessing &&
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-indigo-200 dark:border-gray-600">

            <div className="text-center">
              <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">

                <ScanIcon className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Extraction en cours...
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyse du document et extraction des données
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <motion.div
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0
                }}
                className="h-2 w-2 rounded-full bg-indigo-500" />

                <motion.div
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0.2
                }}
                className="h-2 w-2 rounded-full bg-purple-500" />

                <motion.div
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0.4
                }}
                className="h-2 w-2 rounded-full bg-pink-500" />

              </div>
            </div>
          </motion.div>
        }
        {uploadedFile && !isProcessing &&
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 border-2 border-indigo-200 dark:border-gray-600">

            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  {getFileIcon(uploadedFile)}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatFileSize(uploadedFile.size)}
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
              type="button"
              className="ml-4 p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
              onClick={handleRemoveFile}>

                <XIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        }
      </motion.div>
      {/* Extracted Data Preview */}
      <AnimatePresence>
        {showExtraction && extractedData &&
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
            height: 0
          }}
          animate={{
            opacity: 1,
            y: 0,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            y: -20,
            height: 0
          }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-200 dark:border-gray-600 overflow-hidden">

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mr-3">
                  <CheckCircleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Données extraites
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vérifiez et appliquez les données au formulaire
                  </p>
                </div>
              </div>
              <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={handleApplyExtractedData}
              className="inline-flex items-center px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-600 dark:hover:bg-green-700 transition-all">

                <CheckIcon className="h-4 w-4 mr-2" />
                Appliquer les données
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Date
                  </span>
                  <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${getConfidenceBg(extractedData.confidence.date)} ${getConfidenceColor(extractedData.confidence.date)}`}>

                    {extractedData.confidence.date}%
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {new Date(extractedData.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Type
                  </span>
                  <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${getConfidenceBg(extractedData.confidence.type)} ${getConfidenceColor(extractedData.confidence.type)}`}>

                    {extractedData.confidence.type}%
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {extractedData.type === 'entree' ? 'Entrée' : 'Sortie'}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Montant
                  </span>
                  <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${getConfidenceBg(extractedData.confidence.amount)} ${getConfidenceColor(extractedData.confidence.amount)}`}>

                    {extractedData.confidence.amount}%
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {parseFloat(extractedData.amount).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2
                })}{' '}
                  TND
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Moyen de paiement
                  </span>
                  <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${getConfidenceBg(extractedData.confidence.paymentMethod)} ${getConfidenceColor(extractedData.confidence.paymentMethod)}`}>

                    {extractedData.confidence.paymentMethod}%
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {
                paymentMethods.find(
                  (p) => p.id === extractedData.paymentMethod
                )?.label
                }
                </p>
              </div>
              <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </span>
                  <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${getConfidenceBg(extractedData.confidence.description)} ${getConfidenceColor(extractedData.confidence.description)}`}>

                    {extractedData.confidence.description}%
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {extractedData.description}
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Les données ont été extraites automatiquement. Vérifiez leur
                  exactitude avant de les appliquer au formulaire.
                </p>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
      {/* Progress Bar */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-100 dark:border-gray-600">

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3">
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Progression du formulaire
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Complétez tous les champs requis
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {progress}%
            </p>
          </div>
        </div>
        <div className="h-3 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{
              width: 0
            }}
            animate={{
              width: `${progress}%`
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut'
            }}
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />

        </div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date and Type Selection */}
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">

            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Date et Type
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Informations de base du mouvement
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date du mouvement{' '}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.date ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.date ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white`} />

                  {completedFields.date && !errors.date &&
                  <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                  }
                </div>
                {errors.date &&
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    {errors.date}
                  </p>
                }
              </div>
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de mouvement{' '}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {movementTypes.map((type) =>
                  <motion.button
                    key={type.id}
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() => {
                      handleInputChange('type', type.id);
                      handleInputChange('category', '');
                    }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${formData.type === type.id ? `bg-gradient-to-br ${type.bgGradient} dark:from-gray-700 dark:to-gray-600 ${type.borderColor} dark:border-${type.color}-700` : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>

                      <div className="flex items-center space-x-3">
                        <div
                        className={`h-12 w-12 rounded-full ${type.iconBg} dark:bg-${type.color}-600 flex items-center justify-center`}>

                          <type.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p
                          className={`font-bold ${formData.type === type.id ? `text-${type.color}-900 dark:text-${type.color}-300` : 'text-gray-900 dark:text-white'}`}>

                            {type.label}
                          </p>
                          <p
                          className={`text-xs ${formData.type === type.id ? `text-${type.color}-700 dark:text-${type.color}-400` : 'text-gray-600 dark:text-gray-400'}`}>

                            {type.description}
                          </p>
                        </div>
                      </div>
                      {formData.type === type.id &&
                    <motion.div
                      initial={{
                        scale: 0
                      }}
                      animate={{
                        scale: 1
                      }}
                      className="absolute top-2 right-2">

                          <CheckIcon
                        className={`h-5 w-5 text-${type.color}-600 dark:text-${type.color}-400`} />

                        </motion.div>
                    }
                    </motion.button>
                  )}
                </div>
                {errors.type &&
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    {errors.type}
                  </p>
                }
              </div>
            </div>
          </motion.div>
          {/* Category Selection */}
          {formData.type &&
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
            className={`bg-gradient-to-br ${selectedType?.bgGradient} dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 ${selectedType?.borderColor} dark:border-gray-600`}>

              <div className="flex items-center mb-6">
                <div
                className={`h-10 w-10 rounded-full ${selectedType?.iconBg} dark:bg-${selectedType?.color}-600 flex items-center justify-center`}>

                  <TagIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Catégorie
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sélectionnez la catégorie du mouvement
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableCategories.map((category) =>
              <motion.button
                key={category.id}
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => handleInputChange('category', category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${formData.category === category.id ? `bg-white dark:bg-gray-700 border-${category.color}-500 dark:border-${category.color}-600 shadow-md` : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>

                    <div className="flex flex-col items-center text-center space-y-2">
                      <div
                    className={`h-10 w-10 rounded-full ${formData.category === category.id ? `bg-${category.color}-100 dark:bg-${category.color}-900/30` : 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center`}>

                        <category.icon
                      className={`h-5 w-5 ${formData.category === category.id ? `text-${category.color}-600 dark:text-${category.color}-400` : 'text-gray-500 dark:text-gray-400'}`} />

                      </div>
                      <span
                    className={`text-sm font-medium ${formData.category === category.id ? `text-${category.color}-900 dark:text-${category.color}-300` : 'text-gray-700 dark:text-gray-300'}`}>

                        {category.label}
                      </span>
                    </div>
                  </motion.button>
              )}
              </div>
              {errors.category &&
            <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <InfoIcon className="h-4 w-4 mr-1" />
                  {errors.category}
                </p>
            }
            </motion.div>
          }
          {/* Description and Amount */}
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">

            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
                <DollarSignIcon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Détails du Mouvement
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Description et montant
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description{' '}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                  <FileTextIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                    handleInputChange('description', e.target.value)
                    }
                    placeholder="Ex: Paiement patient #1234"
                    className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.description ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.description ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                  {completedFields.description && !errors.description &&
                  <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                  }
                </div>
                {errors.description &&
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    {errors.description}
                  </p>
                }
              </div>
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Montant (TND){' '}
                  <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                    handleInputChange('amount', e.target.value)
                    }
                    placeholder="0.00"
                    className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.amount ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.amount ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                  {completedFields.amount && !errors.amount &&
                  <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                  }
                </div>
                {errors.amount &&
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    {errors.amount}
                  </p>
                }
              </div>
            </div>
          </motion.div>
          {/* Payment Method */}
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
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-indigo-200 dark:border-gray-600">

            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center">
                <CreditCardIcon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Moyen de Paiement
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sélectionnez le mode de paiement
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paymentMethods.map((method) =>
              <motion.button
                key={method.id}
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => handleInputChange('paymentMethod', method.id)}
                className={`p-4 rounded-lg border-2 transition-all ${formData.paymentMethod === method.id ? `bg-white dark:bg-gray-700 border-${method.color}-500 dark:border-${method.color}-600 shadow-md` : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                    className={`h-10 w-10 rounded-full ${formData.paymentMethod === method.id ? `bg-${method.color}-100 dark:bg-${method.color}-900/30` : 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center`}>

                      <method.icon
                      className={`h-5 w-5 ${formData.paymentMethod === method.id ? `text-${method.color}-600 dark:text-${method.color}-400` : 'text-gray-500 dark:text-gray-400'}`} />

                    </div>
                    <span
                    className={`text-sm font-medium ${formData.paymentMethod === method.id ? `text-${method.color}-900 dark:text-${method.color}-300` : 'text-gray-700 dark:text-gray-300'}`}>

                      {method.label}
                    </span>
                  </div>
                </motion.button>
              )}
            </div>
            {errors.paymentMethod &&
            <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center">
                <InfoIcon className="h-4 w-4 mr-1" />
                {errors.paymentMethod}
              </p>
            }
          </motion.div>
          {/* Notes */}
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">

            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-500 dark:bg-gray-600 flex items-center justify-center">
                <FileTextIcon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notes Additionnelles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Informations complémentaires (optionnel)
                </p>
              </div>
            </div>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              placeholder="Ajoutez des notes ou commentaires supplémentaires..."
              className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />

          </motion.div>
        </div>
        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Summary Card */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-200 dark:border-gray-600 sticky top-6">

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Résumé
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Date
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formData.date ?
                  new Date(formData.date).toLocaleDateString('fr-FR') :
                  '-'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Type
                </span>
                {formData.type ?
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${formData.type === 'entree' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>

                    {formData.type === 'entree' ?
                  <ArrowUpIcon className="h-3 w-3 mr-1" /> :

                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  }
                    {formData.type === 'entree' ? 'Entrée' : 'Sortie'}
                  </span> :

                <span className="text-sm text-gray-400 dark:text-gray-500">
                    -
                  </span>
                }
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Catégorie
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formData.category ?
                  availableCategories.find(
                    (c) => c.id === formData.category
                  )?.label || '-' :
                  '-'}
                </span>
              </div>
              <div className="border-t border-blue-200 dark:border-gray-600 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Montant
                  </span>
                  <span
                    className={`text-xl font-bold ${formData.type === 'entree' ? 'text-green-600 dark:text-green-400' : formData.type === 'sortie' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>

                    {formData.amount ?
                    `${formData.type === 'entree' ? '+' : formData.type === 'sortie' ? '-' : ''}${parseFloat(
                      formData.amount
                    ).toLocaleString('fr-FR', {
                      minimumFractionDigits: 2
                    })} TND` :
                    '0.00 TND'}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Paiement
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formData.paymentMethod ?
                  paymentMethods.find(
                    (p) => p.id === formData.paymentMethod
                  )?.label || '-' :
                  '-'}
                </span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={handleSubmit}
                disabled={progress < 100}
                className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${progress === 100 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}>

                <SaveIcon className="h-5 w-5 mr-2" />
                Enregistrer le Mouvement
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => navigate('/administration/comptabilite')}
                className="w-full py-3 rounded-lg font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center">

                <XIcon className="h-5 w-5 mr-2" />
                Annuler
              </motion.button>
            </div>
          </motion.div>
          {/* Info Box */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.3
            }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">

            <div className="flex">
              <AlertCircleIcon className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
                  Important
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-400">
                  Assurez-vous que toutes les informations sont correctes avant
                  d'enregistrer le mouvement. Cette opération affectera votre
                  trésorerie.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

};
export default NouveauMouvementTresorerie;