import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, EditIcon, CheckIcon, PackageIcon } from 'lucide-react';
interface EditMaterialModalProps {
  material: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}
const EditMaterialModal: React.FC<EditMaterialModalProps> = ({
  material,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState({
    name: material?.name ?? '',
    reference: material?.reference ?? '',
    category: material?.category ?? '',
    supplier: material?.supplier ?? '',
    minStock: material?.minStock ?? 0,
    unit: material?.unit ?? '',
    unitQuantity: material?.unitQuantity ?? 0,
    location: material?.location ?? ''
  });
  const handleChange = (field: string, value: any) =>
  setForm((prev) => ({
    ...prev,
    [field]: value
  }));
  const handleSubmit = () => {
    onSave({
      ...material,
      ...form
    });
    onClose();
  };
  const inputCls =
  'w-full px-3 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors';
  const labelCls =
  'block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5';
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}>

        <motion.div
          initial={{
            scale: 0.92,
            opacity: 0,
            y: 20
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0
          }}
          exit={{
            scale: 0.92,
            opacity: 0,
            y: 20
          }}
          transition={{
            type: 'spring',
            duration: 0.4
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

          {/* Header */}
          <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-4 py-3 rounded-t-2xl">
            <div>
              <h2 className="text-sm font-semibold text-red-800">Modifier le matériel</h2>
              <p className="text-xs text-red-600 mt-0.5">{material?.reference}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="rounded-md p-1 text-red-600 hover:bg-red-100"
              aria-label="Fermer">
              <XIcon className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
            {/* Section label */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl px-4 py-2.5 border border-indigo-100 dark:border-indigo-800">
              <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide flex items-center gap-2">
                <PackageIcon className="h-3.5 w-3.5" /> Informations du matériel
              </p>
            </div>

            <div>
              <label className={labelCls}>Nom du matériel *</label>
              <input
                className={inputCls}
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)} />

            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Référence</label>
                <input
                  className={inputCls}
                  value={form.reference}
                  onChange={(e) => handleChange('reference', e.target.value)} />

              </div>
              <div>
                <label className={labelCls}>Catégorie</label>
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}>

                  <option>Brackets</option>
                  <option>Fils</option>
                  <option>Élastiques</option>
                  <option>Vis</option>
                  <option>Bagues</option>
                  <option>Adhésifs</option>
                  <option>Instruments</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Fournisseur</label>
              <select
                className={inputCls}
                value={form.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}>

                <option>OrthoSupply</option>
                <option>DentalPro</option>
                <option>MedOrtho</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Stock minimum</label>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  value={form.minStock}
                  onChange={(e) =>
                  handleChange('minStock', Number(e.target.value))
                  } />

              </div>
              <div>
                <label className={labelCls}>Quantité par unité</label>
                <input
                  type="number"
                  min={1}
                  className={inputCls}
                  value={form.unitQuantity}
                  onChange={(e) =>
                  handleChange('unitQuantity', Number(e.target.value))
                  } />

              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Unité</label>
                <select
                  className={inputCls}
                  value={form.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}>

                  <option>boîte</option>
                  <option>paquet</option>
                  <option>sachet</option>
                  <option>tube</option>
                  <option>pièce</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Emplacement</label>
                <input
                  className={inputCls}
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Ex: Armoire A, Étagère 1" />

              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
            <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={onClose}
              className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">

              Annuler
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all">

              <CheckIcon className="h-4 w-4 mr-2" />
              Enregistrer
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

};
export default EditMaterialModal;