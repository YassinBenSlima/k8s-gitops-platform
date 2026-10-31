import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  HistoryIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  CalendarIcon,
  UserIcon,
  PackageIcon } from
'lucide-react';
const mockHistory = [
{
  id: 1,
  type: 'in',
  quantity: 50,
  date: '2023-06-15',
  user: 'Dr. Dupont',
  reason: 'Réapprovisionnement commande #ORD-2023-045',
  balance: 42
},
{
  id: 2,
  type: 'out',
  quantity: 8,
  date: '2023-06-10',
  user: 'Dr. Martin',
  reason: 'Utilisation patient - Traitement #TR-1042',
  balance: 34
},
{
  id: 3,
  type: 'out',
  quantity: 5,
  date: '2023-06-05',
  user: 'Dr. Dupont',
  reason: 'Utilisation patient - Traitement #TR-1038',
  balance: 29
},
{
  id: 4,
  type: 'in',
  quantity: 20,
  date: '2023-05-28',
  user: 'Admin',
  reason: 'Réapprovisionnement commande #ORD-2023-031',
  balance: 24
},
{
  id: 5,
  type: 'out',
  quantity: 3,
  date: '2023-05-20',
  user: 'Dr. Lefevre',
  reason: 'Utilisation patient - Traitement #TR-1021',
  balance: 21
},
{
  id: 6,
  type: 'in',
  quantity: 30,
  date: '2023-05-10',
  user: 'Admin',
  reason: 'Stock initial',
  balance: 30
}];

interface StockHistoryModalProps {
  material: any;
  onClose: () => void;
}
const StockHistoryModal: React.FC<StockHistoryModalProps> = ({
  material,
  onClose
}) => {
  const totalIn = mockHistory.
  filter((h) => h.type === 'in').
  reduce((s, h) => s + h.quantity, 0);
  const totalOut = mockHistory.
  filter((h) => h.type === 'out').
  reduce((s, h) => s + h.quantity, 0);
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                <HistoryIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Historique des mouvements
                </h2>
                <p className="text-gray-300 text-xs mt-0.5">
                  {material?.name} — {material?.reference}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={onClose}
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">

              <XIcon className="h-5 w-5 text-white" />
            </motion.button>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-600 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Stock actuel
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {material?.currentStock}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {material?.unit}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-800 text-center">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                  Total entrées
                </p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                  +{totalIn}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  unités
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200 dark:border-red-800 text-center">
                <p className="text-xs text-red-600 dark:text-red-400 mb-1">
                  Total sorties
                </p>
                <p className="text-xl font-bold text-red-700 dark:text-red-300">
                  -{totalOut}
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">unités</p>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="px-6 py-4 max-h-96 overflow-y-auto space-y-3">
            {mockHistory.map((entry, index) =>
            <motion.div
              key={entry.id}
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.05
              }}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-700/50">

                <div
                className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${entry.type === 'in' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>

                  {entry.type === 'in' ?
                <ArrowUpCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" /> :

                <ArrowDownCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                    className={`text-sm font-bold ${entry.type === 'in' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>

                      {entry.type === 'in' ? '+' : '-'}
                      {entry.quantity} unités
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                      Solde: {entry.balance}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {entry.reason}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <CalendarIcon className="h-3 w-3" />
                      {entry.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <UserIcon className="h-3 w-3" />
                      {entry.user}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={onClose}
              className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">

              Fermer
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

};
export default StockHistoryModal;