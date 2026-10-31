import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  SaveIcon,
  XIcon,
  CheckIcon,
  InfoIcon,
  FileTextIcon,
  CalendarIcon,
  DollarSignIcon,
  PercentIcon,
  SparklesIcon,
  AlertCircleIcon,
  UploadIcon,
  PaperclipIcon,
  CalculatorIcon,
  TrendingUpIcon,
  BuildingIcon,
  ClockIcon,
  CheckCircle2Icon } from
'lucide-react';
import SuccessAnimation from '../components/animations/SuccessAnimation';
const NouvelleDeclaration = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    declarationType: '',
    period: '',
    year: new Date().getFullYear().toString(),
    quarter: '',
    month: '',
    revenue: '',
    deductibleExpenses: '',
    netIncome: '',
    taxRate: '',
    taxAmount: '',
    tvaCollected: '',
    tvaDeductible: '',
    tvaPayable: '',
    tclBase: '',
    tclAmount: '',
    withholdingBase: '',
    withholdingAmount: '',
    notes: '',
    documents: []
  });
  const [completedFields, setCompletedFields] = useState({});
  const [errors, setErrors] = useState({});
  const declarationTypes = [
  {
    id: 'tva',
    label: 'TVA (Taxe sur la Valeur Ajoutée)',
    description: 'Déclaration mensuelle - 19%',
    icon: PercentIcon,
    color: 'blue',
    frequency: 'monthly',
    dueDate: '15 du mois suivant',
    rate: '19'
  },
  {
    id: 'income_tax',
    label: 'Impôt sur le Revenu',
    description: 'Déclaration trimestrielle - Barème progressif',
    icon: DollarSignIcon,
    color: 'purple',
    frequency: 'quarterly',
    dueDate: '28 du mois suivant le trimestre',
    rate: 'variable'
  },
  {
    id: 'tcl',
    label: 'TCL (Taxe sur les Établissements)',
    description: 'Contribution au logement social - 1%',
    icon: BuildingIcon,
    color: 'green',
    frequency: 'monthly',
    dueDate: '15 du mois suivant',
    rate: '1'
  },
  {
    id: 'withholding',
    label: 'Retenue à la Source',
    description: 'Retenue sur salaires et honoraires',
    icon: TrendingUpIcon,
    color: 'amber',
    frequency: 'monthly',
    dueDate: '15 du mois suivant',
    rate: 'variable'
  }];

  const quarters = [
  {
    id: 'Q1',
    label: 'T1 (Janvier - Mars)',
    months: 'Janvier, Février, Mars'
  },
  {
    id: 'Q2',
    label: 'T2 (Avril - Juin)',
    months: 'Avril, Mai, Juin'
  },
  {
    id: 'Q3',
    label: 'T3 (Juillet - Septembre)',
    months: 'Juillet, Août, Septembre'
  },
  {
    id: 'Q4',
    label: 'T4 (Octobre - Décembre)',
    months: 'Octobre, Novembre, Décembre'
  }];

  const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'];

  const incomeTaxBrackets = [
  {
    max: 5000,
    rate: 0,
    description: 'Exonéré'
  },
  {
    min: 5000,
    max: 20000,
    rate: 26,
    description: '26%'
  },
  {
    min: 20000,
    max: 30000,
    rate: 28,
    description: '28%'
  },
  {
    min: 30000,
    max: 50000,
    rate: 32,
    description: '32%'
  },
  {
    min: 50000,
    rate: 35,
    description: '35%'
  }];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Auto-calculations based on declaration type
    if (field === 'declarationType') {
      const selectedType = declarationTypes.find((t) => t.id === value);
      if (selectedType && selectedType.rate !== 'variable') {
        setFormData((prev) => ({
          ...prev,
          taxRate: selectedType.rate
        }));
      }
      // Reset period fields when changing declaration type
      setFormData((prev) => ({
        ...prev,
        quarter: '',
        month: ''
      }));
    }
    // TVA calculations
    if (field === 'tvaCollected' || field === 'tvaDeductible') {
      const collected =
      field === 'tvaCollected' ?
      parseFloat(value) || 0 :
      parseFloat(formData.tvaCollected) || 0;
      const deductible =
      field === 'tvaDeductible' ?
      parseFloat(value) || 0 :
      parseFloat(formData.tvaDeductible) || 0;
      setFormData((prev) => ({
        ...prev,
        tvaPayable: (collected - deductible).toFixed(2)
      }));
    }
    // Income tax calculations
    if (field === 'revenue' || field === 'deductibleExpenses') {
      const revenue =
      field === 'revenue' ?
      parseFloat(value) || 0 :
      parseFloat(formData.revenue) || 0;
      const expenses =
      field === 'deductibleExpenses' ?
      parseFloat(value) || 0 :
      parseFloat(formData.deductibleExpenses) || 0;
      const netIncome = revenue - expenses;
      setFormData((prev) => ({
        ...prev,
        netIncome: netIncome.toFixed(2)
      }));
      // Calculate tax based on brackets
      if (netIncome > 0) {
        let tax = 0;
        let remainingIncome = netIncome;
        if (remainingIncome > 5000) {
          if (remainingIncome <= 20000) {
            tax = (remainingIncome - 5000) * 0.26;
          } else if (remainingIncome <= 30000) {
            tax = 15000 * 0.26 + (remainingIncome - 20000) * 0.28;
          } else if (remainingIncome <= 50000) {
            tax = 15000 * 0.26 + 10000 * 0.28 + (remainingIncome - 30000) * 0.32;
          } else {
            tax =
            15000 * 0.26 +
            10000 * 0.28 +
            20000 * 0.32 +
            (remainingIncome - 50000) * 0.35;
          }
        }
        setFormData((prev) => ({
          ...prev,
          taxAmount: tax.toFixed(2)
        }));
      }
    }
    // TCL calculations
    if (field === 'tclBase') {
      const base = parseFloat(value) || 0;
      setFormData((prev) => ({
        ...prev,
        tclAmount: (base * 0.01).toFixed(2)
      }));
    }
    // Withholding calculations
    if (field === 'withholdingBase') {
      const base = parseFloat(value) || 0;
      // Assuming 15% withholding rate for professional services
      setFormData((prev) => ({
        ...prev,
        withholdingAmount: (base * 0.15).toFixed(2)
      }));
    }
    // Mark field as completed
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
    const requiredFields = ['declarationType', 'period', 'year'];
    // Add type-specific required fields
    if (formData.declarationType === 'tva') {
      requiredFields.push('tvaCollected', 'tvaDeductible');
    } else if (formData.declarationType === 'income_tax') {
      requiredFields.push('revenue', 'deductibleExpenses');
    } else if (formData.declarationType === 'tcl') {
      requiredFields.push('tclBase');
    } else if (formData.declarationType === 'withholding') {
      requiredFields.push('withholdingBase');
    }
    const completed = requiredFields.filter(
      (field) => completedFields[field]
    ).length;
    return Math.round(completed / requiredFields.length * 100);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.declarationType) {
      newErrors.declarationType = 'Le type de déclaration est requis';
    }
    if (!formData.year) {
      newErrors.year = "L'année est requise";
    }
    const selectedType = declarationTypes.find(
      (t) => t.id === formData.declarationType
    );
    if (selectedType) {
      if (selectedType.frequency === 'quarterly' && !formData.quarter) {
        newErrors.quarter = 'Le trimestre est requis';
      }
      if (selectedType.frequency === 'monthly' && !formData.month) {
        newErrors.month = 'Le mois est requis';
      }
    }
    // Type-specific validations
    if (formData.declarationType === 'tva') {
      if (!formData.tvaCollected || parseFloat(formData.tvaCollected) < 0) {
        newErrors.tvaCollected = 'La TVA collectée est requise';
      }
      if (!formData.tvaDeductible || parseFloat(formData.tvaDeductible) < 0) {
        newErrors.tvaDeductible = 'La TVA déductible est requise';
      }
    } else if (formData.declarationType === 'income_tax') {
      if (!formData.revenue || parseFloat(formData.revenue) < 0) {
        newErrors.revenue = "Le chiffre d'affaires est requis";
      }
      if (
      !formData.deductibleExpenses ||
      parseFloat(formData.deductibleExpenses) < 0)
      {
        newErrors.deductibleExpenses = 'Les charges déductibles sont requises';
      }
    } else if (formData.declarationType === 'tcl') {
      if (!formData.tclBase || parseFloat(formData.tclBase) < 0) {
        newErrors.tclBase = 'La base de calcul est requise';
      }
    } else if (formData.declarationType === 'withholding') {
      if (
      !formData.withholdingBase ||
      parseFloat(formData.withholdingBase) < 0)
      {
        newErrors.withholdingBase = 'La base de calcul est requise';
      }
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
  const selectedType = declarationTypes.find(
    (t) => t.id === formData.declarationType
  );
  const getTotalAmount = () => {
    switch (formData.declarationType) {
      case 'tva':
        return formData.tvaPayable || '0.00';
      case 'income_tax':
        return formData.taxAmount || '0.00';
      case 'tcl':
        return formData.tclAmount || '0.00';
      case 'withholding':
        return formData.withholdingAmount || '0.00';
      default:
        return '0.00';
    }
  };
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
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl">

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
                <h3 className="text-2xl font-bold">
                  Nouvelle Déclaration Fiscale
                </h3>
                <p className="text-purple-100 text-sm mt-1">
                  Conforme à la législation fiscale tunisienne
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <SparklesIcon className="h-5 w-5 text-yellow-300" />
              <div>
                <div className="text-xs text-purple-100">Progression</div>
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
              {/* Declaration Type Selection */}
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
                  <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Type de Déclaration
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sélectionnez le type de déclaration fiscale
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {declarationTypes.map((type) =>
                  <motion.button
                    key={type.id}
                    type="button"
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() =>
                    handleInputChange('declarationType', type.id)
                    }
                    className={`p-4 rounded-xl border-2 transition-all text-left ${formData.declarationType === type.id ? `bg-${type.color}-50 dark:bg-${type.color}-900/30 border-${type.color}-500 dark:border-${type.color}-600 shadow-md` : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>

                      <div className="flex items-start space-x-3">
                        <div
                        className={`h-10 w-10 rounded-lg ${formData.declarationType === type.id ? `bg-${type.color}-100 dark:bg-${type.color}-900/30` : 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center flex-shrink-0`}>

                          <type.icon
                          className={`h-5 w-5 ${formData.declarationType === type.id ? `text-${type.color}-600 dark:text-${type.color}-400` : 'text-gray-500 dark:text-gray-400'}`} />

                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                          className={`font-semibold mb-1 ${formData.declarationType === type.id ? `text-${type.color}-900 dark:text-${type.color}-300` : 'text-gray-900 dark:text-white'}`}>

                            {type.label}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {type.description}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">
                              <ClockIcon className="h-3 w-3 inline mr-1" />
                              {type.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  )}
                </div>
                {errors.declarationType &&
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    {errors.declarationType}
                  </p>
                }
              </motion.div>
              {/* Period Selection */}
              {selectedType &&
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
                className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-indigo-200 dark:border-gray-600">

                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Période de Déclaration
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sélectionnez la période concernée
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Année{' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <select
                      value={formData.year}
                      onChange={(e) =>
                      handleInputChange('year', e.target.value)
                      }
                      className={`block w-full px-4 py-3 rounded-lg border-2 transition-all ${errors.year ? 'border-red-300 dark:border-red-700' : completedFields.year ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}>

                        <option value={new Date().getFullYear()}>
                          {new Date().getFullYear()}
                        </option>
                        <option value={new Date().getFullYear() - 1}>
                          {new Date().getFullYear() - 1}
                        </option>
                        <option value={new Date().getFullYear() - 2}>
                          {new Date().getFullYear() - 2}
                        </option>
                      </select>
                    </div>
                    {selectedType.frequency === 'quarterly' &&
                  <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Trimestre{' '}
                          <span className="text-red-500 dark:text-red-400">
                            *
                          </span>
                        </label>
                        <select
                      value={formData.quarter}
                      onChange={(e) =>
                      handleInputChange('quarter', e.target.value)
                      }
                      className={`block w-full px-4 py-3 rounded-lg border-2 transition-all ${errors.quarter ? 'border-red-300 dark:border-red-700' : completedFields.quarter ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}>

                          <option value="">Sélectionner un trimestre</option>
                          {quarters.map((q) =>
                      <option key={q.id} value={q.id}>
                              {q.label}
                            </option>
                      )}
                        </select>
                        {formData.quarter &&
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {
                      quarters.find((q) => q.id === formData.quarter)?.
                      months
                      }
                          </p>
                    }
                      </div>
                  }
                    {selectedType.frequency === 'monthly' &&
                  <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mois{' '}
                          <span className="text-red-500 dark:text-red-400">
                            *
                          </span>
                        </label>
                        <select
                      value={formData.month}
                      onChange={(e) =>
                      handleInputChange('month', e.target.value)
                      }
                      className={`block w-full px-4 py-3 rounded-lg border-2 transition-all ${errors.month ? 'border-red-300 dark:border-red-700' : completedFields.month ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}>

                          <option value="">Sélectionner un mois</option>
                          {months.map((month, index) =>
                      <option key={index} value={month}>
                              {month}
                            </option>
                      )}
                        </select>
                      </div>
                  }
                  </div>
                </motion.div>
              }
              {/* TVA Form */}
              {formData.declarationType === 'tva' &&
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
                    <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                      <CalculatorIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Calcul de la TVA
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Taux normal: 19%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        TVA Collectée (TND){' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.tvaCollected}
                        onChange={(e) =>
                        handleInputChange('tvaCollected', e.target.value)
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.tvaCollected ? 'border-red-300 dark:border-red-700' : completedFields.tvaCollected ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                        {completedFields.tvaCollected &&
                      !errors.tvaCollected &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                      </div>
                      {errors.tvaCollected &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <InfoIcon className="h-4 w-4 mr-1" />
                          {errors.tvaCollected}
                        </p>
                    }
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        TVA Déductible (TND){' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.tvaDeductible}
                        onChange={(e) =>
                        handleInputChange('tvaDeductible', e.target.value)
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.tvaDeductible ? 'border-red-300 dark:border-red-700' : completedFields.tvaDeductible ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                        {completedFields.tvaDeductible &&
                      !errors.tvaDeductible &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                      </div>
                      {errors.tvaDeductible &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <InfoIcon className="h-4 w-4 mr-1" />
                          {errors.tvaDeductible}
                        </p>
                    }
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          TVA à Payer
                        </span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {formData.tvaPayable || '0.00'} TND
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              }
              {/* Income Tax Form */}
              {formData.declarationType === 'income_tax' &&
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
                      <CalculatorIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Calcul de l'Impôt sur le Revenu
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Barème progressif selon la législation tunisienne
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chiffre d'Affaires (TND){' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <TrendingUpIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.revenue}
                        onChange={(e) =>
                        handleInputChange('revenue', e.target.value)
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.revenue ? 'border-red-300 dark:border-red-700' : completedFields.revenue ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                        {completedFields.revenue && !errors.revenue &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                      </div>
                      {errors.revenue &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <InfoIcon className="h-4 w-4 mr-1" />
                          {errors.revenue}
                        </p>
                    }
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Charges Déductibles (TND){' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.deductibleExpenses}
                        onChange={(e) =>
                        handleInputChange(
                          'deductibleExpenses',
                          e.target.value
                        )
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.deductibleExpenses ? 'border-red-300 dark:border-red-700' : completedFields.deductibleExpenses ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                        {completedFields.deductibleExpenses &&
                      !errors.deductibleExpenses &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                      </div>
                      {errors.deductibleExpenses &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <InfoIcon className="h-4 w-4 mr-1" />
                          {errors.deductibleExpenses}
                        </p>
                    }
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Revenu Net Imposable
                        </span>
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {formData.netIncome || '0.00'} TND
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-purple-200 dark:border-purple-700">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Impôt Calculé
                        </span>
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          {formData.taxAmount || '0.00'} TND
                        </span>
                      </div>
                    </div>
                    {/* Tax Brackets Info */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-2" />
                        Barème d'imposition
                      </h4>
                      <div className="space-y-1 text-xs text-blue-800 dark:text-blue-400">
                        {incomeTaxBrackets.map((bracket, index) =>
                      <div key={index} className="flex justify-between">
                            <span>
                              {bracket.min ?
                          `${bracket.min.toLocaleString()} TND` :
                          '0 TND'}{' '}
                              -{' '}
                              {bracket.max ?
                          `${bracket.max.toLocaleString()} TND` :
                          'et plus'}
                            </span>
                            <span className="font-semibold">
                              {bracket.description}
                            </span>
                          </div>
                      )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              }
              {/* TCL Form */}
              {formData.declarationType === 'tcl' &&
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
                    <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                      <BuildingIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Taxe sur les Établissements (TCL)
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Contribution au logement social - Taux: 1%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Base de Calcul (TND){' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.tclBase}
                        onChange={(e) =>
                        handleInputChange('tclBase', e.target.value)
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.tclBase ? 'border-red-300 dark:border-red-700' : completedFields.tclBase ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                        {completedFields.tclBase && !errors.tclBase &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                      </div>
                      {errors.tclBase &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <InfoIcon className="h-4 w-4 mr-1" />
                          {errors.tclBase}
                        </p>
                    }
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Généralement basée sur le chiffre d'affaires
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          TCL à Payer (1%)
                        </span>
                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                          {formData.tclAmount || '0.00'} TND
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              }
              {/* Withholding Tax Form */}
              {formData.declarationType === 'withholding' &&
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
                    <div className="h-10 w-10 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center">
                      <PercentIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Retenue à la Source
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Retenue sur salaires et honoraires
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Base de Calcul (TND){' '}
                        <span className="text-red-500 dark:text-red-400">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.withholdingBase}
                        onChange={(e) =>
                        handleInputChange('withholdingBase', e.target.value)
                        }
                        placeholder="0.00"
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${errors.withholdingBase ? 'border-red-300 dark:border-red-700' : completedFields.withholdingBase ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`} />

                        {completedFields.withholdingBase &&
                      !errors.withholdingBase &&
                      <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                      }
                      </div>
                      {errors.withholdingBase &&
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <InfoIcon className="h-4 w-4 mr-1" />
                          {errors.withholdingBase}
                        </p>
                    }
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Montant total des salaires ou honoraires versés
                      </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Retenue à Verser (15%)
                        </span>
                        <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                          {formData.withholdingAmount || '0.00'} TND
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              }
              {/* Notes and Documents */}
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
                      Documents et Notes
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pièces justificatives et informations complémentaires
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                      handleInputChange('notes', e.target.value)
                      }
                      rows={4}
                      placeholder="Notes additionnelles sur la déclaration..."
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none" />

                  </div>
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
                className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-purple-200 dark:border-gray-600 sticky top-6">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Résumé de la Déclaration
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Type
                    </span>
                    {selectedType ?
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedType.label.split(' ')[0]}
                      </span> :

                    <span className="text-sm text-gray-400 dark:text-gray-500">
                        -
                      </span>
                    }
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Période
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formData.quarter || formData.month || '-'}{' '}
                      {formData.year}
                    </span>
                  </div>
                  {selectedType &&
                  <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Date limite
                      </span>
                      <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {selectedType.dueDate}
                      </span>
                    </div>
                  }
                  <div className="border-t border-purple-200 dark:border-gray-600 pt-3 mt-3">
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Montant à Payer
                      </span>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {getTotalAmount()} TND
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
                    className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${progress === 100 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}>

                    <SaveIcon className="h-5 w-5 mr-2" />
                    Enregistrer et Soumettre
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
                      Information Importante
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      Assurez-vous que toutes les informations sont exactes
                      avant de soumettre votre déclaration. Les déclarations
                      tardives peuvent entraîner des pénalités.
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
          message="La déclaration fiscale a été créée avec succès!"
          onComplete={handleSuccessComplete} />

        }
      </AnimatePresence>
    </>);

};
export default NouvelleDeclaration;