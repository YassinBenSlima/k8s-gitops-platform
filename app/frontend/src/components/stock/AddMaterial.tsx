import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  Package2Icon,
  PackageIcon,
  SparklesIcon,
  CheckIcon,
  InfoIcon,
  TagIcon,
  TruckIcon,
  ArchiveIcon,
  MapPinIcon,
  FileTextIcon,
  BoxIcon } from
'lucide-react';
const AddMaterial = ({ onClose, initialData = null, onSave = null }) => {
  const isEditMode = initialData !== null;
  const [formData, setFormData] = useState({
    name: initialData?.name ?? '',
    reference: initialData?.reference ?? '',
    category: initialData?.category ?? '',
    supplier: initialData?.supplier ?? '',
    currentStock: initialData?.currentStock ?? 0,
    minStock: initialData?.minStock ?? 0,
    unit: initialData?.unit ?? 'boîte',
    unitQuantity: initialData?.unitQuantity ?? 1,
    location: initialData?.location ?? '',
    description: initialData?.description ?? ''
  });
  const [completedFields, setCompletedFields] = useState({});
  const calculateProgress = () => {
    const requiredFields = [
    'name',
    'reference',
    'category',
    'supplier',
    'currentStock',
    'minStock',
    'unit',
    'unitQuantity'];

    const filledFields = requiredFields.filter((field) => {
      if (
      field === 'currentStock' ||
      field === 'minStock' ||
      field === 'unitQuantity')
      {
        return formData[field] > 0;
      }
      return formData[field] !== '';
    }).length;
    return Math.round(filledFields / requiredFields.length * 100);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (
    name === 'currentStock' ||
    name === 'minStock' ||
    name === 'unitQuantity')
    {
      parsedValue = parseInt(value, 10) || 0;
    }
    setFormData({
      ...formData,
      [name]: parsedValue
    });
    if (parsedValue && parsedValue !== 0) {
      setCompletedFields((prev) => ({
        ...prev,
        [name]: true
      }));
    } else {
      setCompletedFields((prev) => {
        const newFields = {
          ...prev
        };
        delete newFields[name];
        return newFields;
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode && onSave) {
      onSave({
        ...initialData,
        ...formData
      });
    } else {
      console.log('Submitting new material:', formData);
    }
    onClose();
  };
  const progress = calculateProgress();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header with Progress */}
        <div className="border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-red-800">{isEditMode ? 'Modifier le matériel' : 'Nouveau matériel'}</h3>
              <p className="text-xs text-red-600 mt-0.5">{isEditMode ? `Modifiez les informations de ${initialData?.name}` : 'Ajoutez un nouveau matériel à votre stock'}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-red-600 hover:bg-red-100"
              aria-label="Fermer">
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="space-y-1 mt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-red-700">Progression</span>
              <span className="font-bold text-red-700">{progress}%</span>
            </div>
            <div className="h-1.5 bg-red-100 rounded-full overflow-hidden">
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
                className="h-full bg-red-500 rounded-full" />
            </div>
          </div>
        </div>
        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
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
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-100 dark:border-gray-600">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                  <TagIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informations de base
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Identifiez votre matériel
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Nom du matériel <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PackageIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${completedFields.name ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="ex: Vis orthodontiques"
                      value={formData.name}
                      onChange={handleChange} />

                    {completedFields.name &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                    }
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="reference"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Référence <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TagIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="reference"
                      id="reference"
                      required
                      className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${completedFields.reference ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="ex: VIS-16-100"
                      value={formData.reference}
                      onChange={handleChange} />

                    {completedFields.reference &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                    }
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BoxIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <select
                      name="category"
                      id="category"
                      required
                      className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${completedFields.category ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900'} focus:ring-2 focus:outline-none appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      value={formData.category}
                      onChange={handleChange}>

                      <option value="">Sélectionner une catégorie</option>
                      <option value="Brackets">Brackets</option>
                      <option value="Fils">Fils orthodontiques</option>
                      <option value="Élastiques">Élastiques</option>
                      <option value="Vis">Vis et mini-vis</option>
                      <option value="Bagues">Bagues</option>
                      <option value="Adhésifs">Adhésifs</option>
                      <option value="Instruments">Instruments</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {completedFields.category &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400 pointer-events-none" />
                    }
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="supplier"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Fournisseur <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TruckIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="supplier"
                      id="supplier"
                      required
                      className={`block w-full pl-10 pr-10 py-3 rounded-lg border-2 transition-all ${completedFields.supplier ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="ex: OrthoSupply"
                      value={formData.supplier}
                      onChange={handleChange} />

                    {completedFields.supplier &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                    }
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Stock Information Section */}
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
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-purple-100 dark:border-gray-600">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
                  <ArchiveIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informations de stock
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gérez les quantités et unités
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="currentStock"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Stock initial <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="currentStock"
                      id="currentStock"
                      min="0"
                      required
                      className={`block w-full px-4 py-3 rounded-lg border-2 transition-all ${completedFields.currentStock ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-200 dark:focus:ring-purple-900'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="0"
                      value={formData.currentStock}
                      onChange={handleChange} />

                    {completedFields.currentStock &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                    }
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="minStock"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Stock minimum <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minStock"
                      id="minStock"
                      min="0"
                      required
                      className={`block w-full px-4 py-3 rounded-lg border-2 transition-all ${completedFields.minStock ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-200 dark:focus:ring-purple-900'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="0"
                      value={formData.minStock}
                      onChange={handleChange} />

                    {completedFields.minStock &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                    }
                  </div>
                  <p className="mt-2 text-sm text-purple-600 dark:text-purple-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    Alerte si stock inférieur à ce seuil
                  </p>
                </div>
                <div className="relative">
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Unité{' '}
                    <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <select
                    name="unit"
                    id="unit"
                    required
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={formData.unit}
                    onChange={handleChange}>

                    <option value="boîte">Boîte</option>
                    <option value="paquet">Paquet</option>
                    <option value="sachet">Sachet</option>
                    <option value="tube">Tube</option>
                    <option value="pièce">Pièce</option>
                    <option value="kit">Kit</option>
                  </select>
                </div>
                <div className="relative">
                  <label
                    htmlFor="unitQuantity"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Quantité par unité <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="unitQuantity"
                      id="unitQuantity"
                      min="1"
                      required
                      className={`block w-full px-4 py-3 rounded-lg border-2 transition-all ${completedFields.unitQuantity ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-200 dark:focus:ring-green-900' : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-200 dark:focus:ring-purple-900'} focus:ring-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="1"
                      value={formData.unitQuantity}
                      onChange={handleChange} />

                    {completedFields.unitQuantity &&
                    <CheckIcon className="absolute right-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
                    }
                  </div>
                  <p className="mt-2 text-sm text-purple-600 dark:text-purple-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    ex: 100 pièces par boîte
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Location & Description Section */}
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-green-100 dark:border-gray-600">

              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                  <MapPinIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Emplacement et notes
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Informations supplémentaires
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Emplacement
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="ex: Armoire A, Étagère 2"
                      value={formData.location}
                      onChange={handleChange} />

                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

                    Description
                  </label>
                  <div className="relative">
                    <FileTextIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Informations supplémentaires sur le matériel..."
                      value={formData.description}
                      onChange={handleChange} />

                  </div>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
        {/* Footer Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all">

              <XIcon className="h-4 w-4 mr-2" />
              Annuler
            </button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg transition-all">

              <Package2Icon className="h-4 w-4 mr-2" />
              {isEditMode ?
              'Enregistrer les modifications' :
              'Ajouter le matériel'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default AddMaterial;