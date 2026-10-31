import React from 'react';
import { AlertTriangleIcon, PackageIcon, TrendingDownIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../node_modules/react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
const LowStockAlert = ({ items, onGenerateOrder, onIgnore }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
      className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-2xl shadow-lg overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}>

      <div className="p-6">
        <div className="flex items-start">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center shadow-lg">

            <AlertTriangleIcon className="h-6 w-6 text-white" />
          </motion.div>
          <div className={`${isRTL ? 'mr-4' : 'ml-4'} flex-1`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 flex items-center">
                <TrendingDownIcon className="h-5 w-5 mr-2" />
                Alerte stock bas ({items.length}{' '}
                {items.length > 1 ? 'articles' : 'article'})
              </h3>
            </div>
            <div className="space-y-3">
              {items.map((item, index) =>
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    x: -20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: index * 0.1
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-amber-200 dark:border-amber-700 shadow-sm">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-3">
                        <PackageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stock actuel
                      </p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {item.currentStock}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        min: {item.minStock}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{
                  scale: 0.95
                }}
                type="button"
                onClick={onGenerateOrder}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md transition-all">

                <PackageIcon className="h-4 w-4 mr-2" />
                Générer une commande
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{
                  scale: 0.95
                }}
                type="button"
                onClick={onIgnore}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-amber-700 bg-white border-2 border-amber-300 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-sm transition-all">

                Ignorer
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

};
export default LowStockAlert;