import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowUpRightIcon, ArrowDownRightIcon } from 'lucide-react';
interface StatsCardProps {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon?: React.ElementType;
  color?: string;
  bgGradient?: string;
  description?: string;
}
const StatsCard = ({
  name,
  value,
  change,
  changeType,
  icon: Icon,
  color = 'blue',
  bgGradient = 'from-blue-500 to-cyan-500',
  description
}: StatsCardProps) => {
  const { isRTL } = useLanguage();
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02
      }}
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">

      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-5 dark:opacity-10`} />

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          {Icon &&
          <div
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg`}>

              <Icon className="h-6 w-6 text-white" />
            </div>
          }
          <div
            className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${changeType === 'increase' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>

            {changeType === 'increase' ?
            <ArrowUpRightIcon className="h-3 w-3 mr-1" /> :

            <ArrowDownRightIcon className="h-3 w-3 mr-1" />
            }
            {change}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {name}
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          {description &&
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </div>
          }
        </div>
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: '70%'
              }}
              transition={{
                duration: 1,
                delay: 0.2
              }}
              className={`bg-gradient-to-r ${bgGradient} h-1 rounded-full`} />

          </div>
        </div>
      </div>
    </motion.div>);

};
export default StatsCard;