import React, { useState } from 'react';
import {
  Package2Icon,
  ArrowUpDownIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  HistoryIcon,
  EditIcon,
  AlertTriangleIcon,
  SparklesIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import StockHistoryModal from './StockHistoryModal';
import AddMaterial from './AddMaterial';
// Mock data for materials
const materialData = [
{
  id: 1,
  name: 'Vis orthodontiques (1.6mm)',
  reference: 'VIS-16-100',
  category: 'Vis',
  supplier: 'OrthoSupply',
  currentStock: 42,
  minStock: 15,
  unit: 'boîte',
  unitQuantity: 100,
  location: 'Armoire A, Étagère 2',
  lastUpdated: '2023-06-15'
},
{
  id: 2,
  name: 'Brackets céramiques',
  reference: 'BRK-CER-20',
  category: 'Brackets',
  supplier: 'DentalPro',
  currentStock: 5,
  minStock: 10,
  unit: 'paquet',
  unitQuantity: 20,
  location: 'Armoire B, Étagère 1',
  lastUpdated: '2023-06-12'
},
{
  id: 3,
  name: 'Fils NiTi .016"',
  reference: 'FIL-NITI-016',
  category: 'Fils',
  supplier: 'OrthoSupply',
  currentStock: 18,
  minStock: 8,
  unit: 'paquet',
  unitQuantity: 10,
  location: 'Armoire A, Étagère 3',
  lastUpdated: '2023-06-10'
},
{
  id: 4,
  name: "Vis d'expansion palatine",
  reference: 'VIS-PAL-10',
  category: 'Vis',
  supplier: 'MedOrtho',
  currentStock: 12,
  minStock: 5,
  unit: 'boîte',
  unitQuantity: 10,
  location: 'Armoire A, Étagère 2',
  lastUpdated: '2023-06-08'
},
{
  id: 5,
  name: 'Élastiques orthodontiques',
  reference: 'ELAS-COL-100',
  category: 'Élastiques',
  supplier: 'DentalPro',
  currentStock: 3,
  minStock: 15,
  unit: 'sachet',
  unitQuantity: 100,
  location: 'Armoire C, Tiroir 2',
  lastUpdated: '2023-06-05'
},
{
  id: 6,
  name: "Mini-vis d'ancrage (1.4mm)",
  reference: 'MVIS-14-10',
  category: 'Vis',
  supplier: 'OrthoSupply',
  currentStock: 25,
  minStock: 10,
  unit: 'boîte',
  unitQuantity: 10,
  location: 'Armoire A, Étagère 1',
  lastUpdated: '2023-06-02'
},
{
  id: 7,
  name: 'Bagues molaires',
  reference: 'BAG-MOL-20',
  category: 'Bagues',
  supplier: 'MedOrtho',
  currentStock: 14,
  minStock: 8,
  unit: 'boîte',
  unitQuantity: 20,
  location: 'Armoire B, Étagère 2',
  lastUpdated: '2023-05-28'
},
{
  id: 8,
  name: 'Adhésif orthodontique',
  reference: 'ADH-ORT-5',
  category: 'Adhésifs',
  supplier: 'DentalPro',
  currentStock: 8,
  minStock: 3,
  unit: 'tube',
  unitQuantity: 5,
  location: 'Armoire C, Tiroir 1',
  lastUpdated: '2023-05-25'
}];

const MaterialList = ({
  onStockMovement,
  searchTerm,
  filterCategory,
  sortBy,
  sortDirection,
  onSort
}) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  // Filter and sort materials
  let materials = [...materialData];
  // Apply filters
  if (searchTerm) {
    materials = materials.filter(
      (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (filterCategory !== 'all') {
    materials = materials.filter(
      (material) => material.category === filterCategory
    );
  }
  // Apply sorting
  materials.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'currentStock') {
      comparison = a.currentStock - b.currentStock;
    } else if (sortBy === 'category') {
      comparison = a.category.localeCompare(b.category);
    } else if (sortBy === 'supplier') {
      comparison = a.supplier.localeCompare(b.supplier);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  const handleHistory = (material) => {
    setSelectedMaterial(material);
    setShowHistoryModal(true);
  };
  const handleEdit = (material) => {
    setSelectedMaterial(material);
    setShowEditModal(true);
  };
  const handleSaveEdit = (updatedMaterial) => {
    console.log('Updated material:', updatedMaterial);
    setShowEditModal(false);
    setSelectedMaterial(null);
  };
  const getCategoryColor = (category) => {
    const colors = {
      Brackets:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Fils: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      Élastiques:
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      Vis: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Bagues:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      Adhésifs:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      Instruments:
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return (
      colors[category] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300');

  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onSort('name')}>

              <div className="flex items-center">
                Nom du matériel
                <ArrowUpDownIcon className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onSort('category')}>

              <div className="flex items-center">
                Catégorie
                <ArrowUpDownIcon className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">

              Référence
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onSort('supplier')}>

              <div className="flex items-center">
                Fournisseur
                <ArrowUpDownIcon className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onSort('currentStock')}>

              <div className="flex items-center">
                Stock actuel
                <ArrowUpDownIcon className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">

              Emplacement
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">

              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {materials.map((material, index) =>
          <motion.tr
            key={material.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.3,
              delay: index * 0.05
            }}
            whileHover={{
              backgroundColor: '#f9fafb'
            }}
            className="transition-colors dark:hover:bg-gray-700">

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 10
                  }}
                  className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center shadow-md">

                    <Package2Icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {material.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {material.unitQuantity} par {material.unit}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getCategoryColor(material.category)}`}>

                  {material.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {material.reference}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">
                {material.supplier}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {material.currentStock <= material.minStock ?
                <div className="flex items-center">
                      <motion.div
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}>

                        <AlertTriangleIcon className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                      </motion.div>
                      <span className="text-red-600 dark:text-red-400 font-bold text-lg">
                        {material.currentStock}
                      </span>
                    </div> :

                <span className="text-gray-900 dark:text-white font-bold text-lg">
                      {material.currentStock}
                    </span>
                }
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                    / min: {material.minStock}
                  </span>
                </div>
                {material.currentStock <= material.minStock &&
              <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      Stock bas
                    </span>
                  </div>
              }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">
                {material.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <motion.button
                  whileHover={{
                    scale: 1.1,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => onStockMovement(material)}
                  className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all shadow-sm"
                  title="Entrée de stock">

                    <PlusCircleIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                  whileHover={{
                    scale: 1.1,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => onStockMovement(material)}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all shadow-sm"
                  title="Sortie de stock">

                    <MinusCircleIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                  whileHover={{
                    scale: 1.1,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => handleHistory(material)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-sm"
                  title="Historique">

                    <HistoryIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                  whileHover={{
                    scale: 1.1,
                    y: -2
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => handleEdit(material)}
                  className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all shadow-sm"
                  title="Modifier">

                    <EditIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
      {materials.length === 0 &&
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        className="text-center py-12">

          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <Package2Icon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Aucun matériel trouvé
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Aucun matériel ne correspond à vos critères de recherche.
          </p>
        </motion.div>
      }
      {/* Modals */}
      {showHistoryModal && selectedMaterial &&
      <StockHistoryModal
        material={selectedMaterial}
        onClose={() => {
          setShowHistoryModal(false);
          setSelectedMaterial(null);
        }} />

      }

      {showEditModal && selectedMaterial &&
      <AddMaterial
        initialData={selectedMaterial}
        onSave={handleSaveEdit}
        onClose={() => {
          setShowEditModal(false);
          setSelectedMaterial(null);
        }} />

      }
    </div>);

};
export default MaterialList;