import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XIcon,
  PlusIcon,
  MinusIcon,
  PackageIcon,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
  ActivityIcon,
  SparklesIcon,
  TrendingUpIcon,
  TrendingDownIcon } from
'lucide-react';
const StockMovement = ({ material, onClose }) => {
  const [formData, setFormData] = useState({
    type: 'in',
    quantity: 1,
    reason: '',
    date: new Date().toISOString().split('T')[0],
    patient: '',
    treatment: '',
    notes: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting stock movement:', {
      materialId: material.id,
      ...formData
    });
    onClose();
  };
  const newStock =
  formData.type === 'in' ?
  material.currentStock + parseInt(formData.quantity || 0) :
  material.currentStock - parseInt(formData.quantity || 0);
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div
          className={`${formData.type === 'in' ? 'bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700' : 'bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-700 dark:to-rose-700'} p-6 text-white`}>

          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                {formData.type === 'in' ?
                <TrendingUpIcon className="h-6 w-6 text-white" /> :

                <TrendingDownIcon className="h-6 w-6 text-white" />
                }
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mouvement de stock</h3>
                <p
                  className={`${formData.type === 'in' ? 'text-green-100' : 'text-red-100'} text-sm mt-1`}>

                  {material.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Material Info Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6 border-2 border-blue-100 dark:border-gray-600">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Référence
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {material.reference}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Stock actuel
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {material.currentStock} {material.unit}(s)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Nouveau stock
                </p>
                <p
                  className={`text-lg font-bold ${newStock < material.minStock ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>

                  {newStock} {material.unit}(s)
                </p>
              </div>
            </div>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Movement Type */}
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
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600">

              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Type de mouvement <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.label
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.type === 'in' ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/30' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'}`}>

                  <input
                    type="radio"
                    name="type"
                    value="in"
                    checked={formData.type === 'in'}
                    onChange={handleChange}
                    className="sr-only" />

                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${formData.type === 'in' ? 'bg-green-500' : 'bg-gray-200'}`}>

                      <PlusIcon
                        className={`h-6 w-6 ${formData.type === 'in' ? 'text-white' : 'text-gray-400'}`} />

                    </div>
                    <span
                      className={`font-bold ${formData.type === 'in' ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>

                      Entrée de stock
                    </span>
                  </div>
                </motion.label>
                <motion.label
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.type === 'out' ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'}`}>

                  <input
                    type="radio"
                    name="type"
                    value="out"
                    checked={formData.type === 'out'}
                    onChange={handleChange}
                    className="sr-only" />

                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${formData.type === 'out' ? 'bg-red-500' : 'bg-gray-200'}`}>

                      <MinusIcon
                        className={`h-6 w-6 ${formData.type === 'out' ? 'text-white' : 'text-gray-400'}`} />

                    </div>
                    <span
                      className={`font-bold ${formData.type === 'out' ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-400'}`}>

                      Sortie de stock
                    </span>
                  </div>
                </motion.label>
              </div>
            </motion.div>
            {/* Quantity and Date */}
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
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-purple-100 dark:border-gray-600">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                    Quantité <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PackageIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      min="1"
                      max={
                      formData.type === 'out' ?
                      material.currentStock :
                      undefined
                      }
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={formData.quantity}
                      onChange={handleChange} />

                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={formData.date}
                      onChange={handleChange} />

                  </div>
                </div>
              </div>
            </motion.div>
            {/* Reason */}
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
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-amber-100 dark:border-gray-600">

              <label
                htmlFor="reason"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                Motif <span className="text-red-500">*</span>
              </label>
              <select
                name="reason"
                id="reason"
                required
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.reason}
                onChange={handleChange}>

                <option value="">Sélectionner un motif</option>
                {formData.type === 'in' ?
                <>
                    <option value="achat">Achat</option>
                    <option value="retour">Retour</option>
                    <option value="don">Don</option>
                    <option value="correction">Correction d'inventaire</option>
                    <option value="autre">Autre</option>
                  </> :

                <>
                    <option value="utilisation">
                      Utilisation pour patient
                    </option>
                    <option value="perte">Perte/Casse</option>
                    <option value="perime">Périmé</option>
                    <option value="correction">Correction d'inventaire</option>
                    <option value="autre">Autre</option>
                  </>
                }
              </select>
            </motion.div>
            {/* Patient and Treatment (for usage) */}
            {formData.type === 'out' && formData.reason === 'utilisation' &&
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
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-100 dark:border-gray-600">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                    htmlFor="patient"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                      Patient
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <input
                      type="text"
                      name="patient"
                      id="patient"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      value={formData.patient}
                      onChange={handleChange}
                      placeholder="Nom du patient" />

                    </div>
                  </div>
                  <div>
                    <label
                    htmlFor="treatment"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                      Traitement
                    </label>
                    <div className="relative">
                      <ActivityIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <input
                      type="text"
                      name="treatment"
                      id="treatment"
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      value={formData.treatment}
                      onChange={handleChange}
                      placeholder="Type de traitement" />

                    </div>
                  </div>
                </div>
              </motion.div>
            }
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-100 dark:border-gray-600">

              <label
                htmlFor="notes"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">

                Notes
              </label>
              <div className="relative">
                <FileTextIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <textarea
                  name="notes"
                  id="notes"
                  rows={4}
                  className="block w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 focus:outline-none transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Ajoutez des notes supplémentaires..." />

              </div>
            </motion.div>
          </form>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all shadow-md">

              <XIcon className="h-4 w-4 mr-2" />
              Annuler
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              type="button"
              onClick={handleSubmit}
              className={`inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl text-sm font-bold shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${formData.type === 'in' ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-green-500' : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 focus:ring-red-500'}`}>

              {formData.type === 'in' ?
              <>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Ajouter au stock
                </> :

              <>
                  <MinusIcon className="h-5 w-5 mr-2" />
                  Retirer du stock
                </>
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>);

};
export default StockMovement;