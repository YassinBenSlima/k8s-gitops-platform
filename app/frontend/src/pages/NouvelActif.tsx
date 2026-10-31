import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  SaveIcon,
  XIcon,
  CheckIcon,
  InfoIcon,
  BriefcaseIcon,
  CalendarIcon,
  DollarSignIcon,
  TagIcon,
  FileTextIcon,
  PercentIcon,
  BuildingIcon,
  WrenchIcon,
  MonitorIcon,
  CarIcon,
  SparklesIcon,
  AlertCircleIcon,
  UploadIcon,
  PaperclipIcon,
  TrendingDownIcon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouvelActif = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    purchaseValue: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    depreciationRate: '',
    depreciationMethod: 'lineaire',
    supplier: '',
    invoiceNumber: '',
    location: '',
    serialNumber: '',
    warranty: '',
    notes: '',
    documents: []
  });
  const [completedFields, setCompletedFields] = useState({});
  const [errors, setErrors] = useState({});
  const categories = [
  {
    id: 'immobilier',
    label: 'Immobilier',
    icon: BuildingIcon,
    color: 'blue',
    defaultDepreciation: '5'
  },
  {
    id: 'materiel_medical',
    label: 'Matériel Médical',
    icon: WrenchIcon,
    color: 'purple',
    defaultDepreciation: '15'
  },
  {
    id: 'equipement_informatique',
    label: 'Équipement Informatique',
    icon: MonitorIcon,
    color: 'indigo',
    defaultDepreciation: '25'
  },
  {
    id: 'mobilier',
    label: 'Mobilier',
    icon: BriefcaseIcon,
    color: 'green',
    defaultDepreciation: '20'
  },
  {
    id: 'vehicule',
    label: 'Véhicule',
    icon: CarIcon,
    color: 'amber',
    defaultDepreciation: '20'
  },
  {
    id: 'autre',
    label: 'Autre',
    icon: TagIcon,
    color: 'gray',
    defaultDepreciation: '10'
  }];

  const depreciationMethods = [
  {
    id: 'lineaire',
    label: 'Linéaire',
    description: 'Dépréciation constante sur la durée'
  },
  {
    id: 'degressif',
    label: 'Dégressif',
    description: 'Dépréciation plus importante au début'
  }];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (field === 'category' && value) {
      const selectedCategory = categories.find((c) => c.id === value);
      if (selectedCategory && !formData.depreciationRate) {
        setFormData((prev) => ({
          ...prev,
          depreciationRate: selectedCategory.defaultDepreciation
        }));
      }
    }
    if (field === 'purchaseValue') {
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
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    }));
    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments]
    });
  };
  const handleRemoveDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({
      ...formData,
      documents: newDocuments
    });
  };
  const calculateProgress = () => {
    const requiredFields = [
    'name',
    'category',
    'purchaseValue',
    'purchaseDate',
    'depreciationRate'];

    const completed = requiredFields.filter(
      (field) => completedFields[field]
    ).length;
    return Math.round(completed / requiredFields.length * 100);
  };
  const calculateCurrentValue = () => {
    if (
    !formData.purchaseValue ||
    !formData.depreciationRate ||
    !formData.purchaseDate)
    {
      return 0;
    }
    const purchaseValue = parseFloat(formData.purchaseValue);
    const depreciationRate = parseFloat(formData.depreciationRate) / 100;
    const purchaseDate = new Date(formData.purchaseDate);
    const today = new Date();
    const yearsDiff = (today - purchaseDate) / (1000 * 60 * 60 * 24 * 365);
    if (formData.depreciationMethod === 'lineaire') {
      const depreciation = purchaseValue * depreciationRate * yearsDiff;
      return Math.max(0, purchaseValue - depreciation);
    } else {
      // Dégressif
      const currentValue =
      purchaseValue * Math.pow(1 - depreciationRate, yearsDiff);
      return Math.max(0, currentValue);
    }
  };
  const calculateAnnualDepreciation = () => {
    if (!formData.purchaseValue || !formData.depreciationRate) {
      return 0;
    }
    const purchaseValue = parseFloat(formData.purchaseValue);
    const depreciationRate = parseFloat(formData.depreciationRate) / 100;
    return purchaseValue * depreciationRate;
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    if (!formData.purchaseValue || parseFloat(formData.purchaseValue) <= 0) {
      newErrors.purchaseValue = "La valeur d'achat doit être supérieure à 0";
    }
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "La date d'achat est requise";
    }
    if (
    !formData.depreciationRate ||
    parseFloat(formData.depreciationRate) < 0 ||
    parseFloat(formData.depreciationRate) > 100)
    {
      newErrors.depreciationRate =
      'Le taux de dépréciation doit être entre 0 et 100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
    }
  };
  const handleSuccessComplete = () => {
    setShowSuccess(false);
    navigate('/administration/comptabilite');
  };
  const handleBack = () => {
    navigate('/administration/comptabilite');
  };
  const progress = calculateProgress();
  const currentValue = calculateCurrentValue();
  const annualDepreciation = calculateAnnualDepreciation();
  const selectedCategory = categories.find((c) => c.id === formData.category);
  return (
    <>
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
                <BriefcaseIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Nouvel Actif</h3>
                <p className="text-green-100 text-sm mt-1">
                  Ajouter un nouvel actif au patrimoine
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <SparklesIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <div className="text-xs text-green-100">Progression</div>
                <div className="text-sm font-bold">{progress}%</div>
              </div>
            </div>
          </div>
        </motion.div>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
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
                  <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                    <TagIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Informations de Base
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Détails principaux de l'actif
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Asset Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom de l'actif{' '}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <TagIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                        handleInputChange('name', e.target.value)
                        }
                        placeholder="Ex: Équipement Radiologie Numérique"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.name ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.name ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                      {completedFields.name && !errors.name &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                    </div>
                    {errors.name &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    }
                  </div>
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie{' '}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) =>
                      <motion.button
                        key={category.id}
                        type="button"
                        whileHover={{
                          scale: 1.05
                        }}
                        whileTap={{
                          scale: 0.95
                        }}
                        onClick={() =>
                        handleInputChange('category', category.id)
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${formData.category === category.id ? `bg-${category.color}-50 dark:bg-${category.color}-900/30 border-${category.color}-500 dark:border-${category.color}-600 shadow-md` : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>

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
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.category}
                      </p>
                    }
                  </div>
                </div>
              </motion.div>
              {/* Financial Information */}
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
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-purple-200 dark:border-gray-600">

                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
                    <DollarSignIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Informations Financières
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Valeur et dépréciation
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Purchase Value */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Valeur d'achat (TND){' '}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.purchaseValue}
                        onChange={(e) =>
                        handleInputChange('purchaseValue', e.target.value)
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.purchaseValue ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.purchaseValue ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                      {completedFields.purchaseValue &&
                      !errors.purchaseValue &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                    </div>
                    {errors.purchaseValue &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.purchaseValue}
                      </p>
                    }
                  </div>
                  {/* Purchase Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date d'achat{' '}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="date"
                        value={formData.purchaseDate}
                        onChange={(e) =>
                        handleInputChange('purchaseDate', e.target.value)
                        }
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.purchaseDate ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.purchaseDate ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white`} />

                      {completedFields.purchaseDate && !errors.purchaseDate &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                    </div>
                    {errors.purchaseDate &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.purchaseDate}
                      </p>
                    }
                  </div>
                  {/* Depreciation Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Taux de dépréciation (%){' '}
                      <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <PercentIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={formData.depreciationRate}
                        onChange={(e) =>
                        handleInputChange('depreciationRate', e.target.value)
                        }
                        placeholder="0.0"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.depreciationRate ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400' : completedFields.depreciationRate ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                      {completedFields.depreciationRate &&
                      !errors.depreciationRate &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                    </div>
                    {errors.depreciationRate &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.depreciationRate}
                      </p>
                    }
                  </div>
                  {/* Depreciation Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Méthode de dépréciation
                    </label>
                    <select
                      value={formData.depreciationMethod}
                      onChange={(e) =>
                      handleInputChange('depreciationMethod', e.target.value)
                      }
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

                      {depreciationMethods.map((method) =>
                      <option key={method.id} value={method.id}>
                          {method.label} - {method.description}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
              </motion.div>
              {/* Additional Details */}
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
                  <div className="h-10 w-10 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Détails Complémentaires
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Informations additionnelles (optionnel)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fournisseur
                    </label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) =>
                      handleInputChange('supplier', e.target.value)
                      }
                      placeholder="Nom du fournisseur"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro de facture
                    </label>
                    <input
                      type="text"
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                      handleInputChange('invoiceNumber', e.target.value)
                      }
                      placeholder="N° facture"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Localisation
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                      handleInputChange('location', e.target.value)
                      }
                      placeholder="Emplacement de l'actif"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro de série
                    </label>
                    <input
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) =>
                      handleInputChange('serialNumber', e.target.value)
                      }
                      placeholder="N° série"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Garantie
                    </label>
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) =>
                      handleInputChange('warranty', e.target.value)
                      }
                      placeholder="Durée et conditions de garantie"
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                      handleInputChange('notes', e.target.value)
                      }
                      rows={4}
                      placeholder="Notes additionnelles sur l'actif..."
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none" />

                  </div>
                </div>
              </motion.div>
              {/* Documents */}
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
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-amber-200 dark:border-gray-600">

                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center">
                    <PaperclipIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Documents
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Factures, certificats, garanties
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {formData.documents.map((doc, index) =>
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
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-amber-200 dark:border-gray-600">

                      <div className="flex items-center">
                        <PaperclipIcon className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {doc.size}
                          </p>
                        </div>
                      </div>
                      <button
                      type="button"
                      onClick={() => handleRemoveDocument(index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">

                        <XIcon className="h-5 w-5" />
                      </button>
                    </motion.div>
                  )}
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 dark:border-gray-600 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-gray-600 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="h-8 w-8 text-amber-500 dark:text-amber-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">
                          Cliquez pour ajouter
                        </span>{' '}
                        ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, JPG, PNG (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload} />

                  </label>
                </div>
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
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-200 dark:border-gray-600 sticky top-6">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Résumé
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Catégorie
                    </span>
                    {selectedCategory ?
                    <div className="flex items-center">
                        <selectedCategory.icon
                        className={`h-4 w-4 text-${selectedCategory.color}-600 dark:text-${selectedCategory.color}-400 mr-2`} />

                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedCategory.label}
                        </span>
                      </div> :

                    <span className="text-sm text-gray-400 dark:text-gray-500">
                        -
                      </span>
                    }
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Date d'achat
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formData.purchaseDate ?
                      new Date(formData.purchaseDate).toLocaleDateString(
                        'fr-FR'
                      ) :
                      '-'}
                    </span>
                  </div>
                  <div className="border-t border-green-200 dark:border-gray-600 pt-3 mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Valeur d'achat
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formData.purchaseValue ?
                        `${parseFloat(
                          formData.purchaseValue
                        ).toLocaleString('fr-FR', {
                          minimumFractionDigits: 2
                        })} TND` :
                        '0.00 TND'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Dépréciation annuelle
                      </span>
                      <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                        -
                        {annualDepreciation.toLocaleString('fr-FR', {
                          minimumFractionDigits: 2
                        })}{' '}
                        TND
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-green-200 dark:border-gray-600">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Valeur actuelle
                      </span>
                      <span className="text-xl font-bold text-green-600 dark:text-green-400">
                        {currentValue.toLocaleString('fr-FR', {
                          minimumFractionDigits: 2
                        })}{' '}
                        TND
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-green-200 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Taux dépréciation
                    </span>
                    <div className="flex items-center">
                      <TrendingDownIcon className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formData.depreciationRate || '0'}% / an
                      </span>
                    </div>
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
                    type="submit"
                    disabled={progress < 100}
                    className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${progress === 100 ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}>

                    <SaveIcon className="h-5 w-5 mr-2" />
                    Enregistrer l'Actif
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    type="button"
                    onClick={handleBack}
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
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">

                <div className="flex">
                  <AlertCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                      Dépréciation
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      La dépréciation est calculée automatiquement selon la
                      méthode choisie. Les taux suggérés sont conformes à la
                      législation tunisienne.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess &&
        <SuccessAnimation
          message="L'actif a été ajouté avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouvelActif;