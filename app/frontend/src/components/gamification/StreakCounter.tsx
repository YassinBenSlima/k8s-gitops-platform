import React from 'react';
import { motion } from 'framer-motion';
import { FlameIcon } from 'lucide-react';
import { useTranslation } from '../../../node_modules/react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
interface StreakCounterProps {
  count: number;
  lastActive: string;
}
const StreakCounter: React.FC<StreakCounterProps> = ({ count, lastActive }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const isActiveToday = lastActive === t('dashboard.streak.today');
  return (
    <motion.div
      whileHover={{
        scale: 1.03
      }}
      className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-amber-100">

      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3
        }}
        className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-white">

        <FlameIcon className="h-5 w-5" />
      </motion.div>
      <div className={`${isRTL ? 'mr-3' : 'ml-3'}`}>
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-amber-600">{count}</span>
          <span className={`${isRTL ? 'mr-1' : 'ml-1'} text-sm text-gray-600`}>
            {t('dashboard.streak.days')}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {isActiveToday ?
            <span className="text-green-600">
              {t('dashboard.streak.loggedInToday')}
            </span> :

            <span>
              {t('dashboard.streak.lastLogin')} {lastActive}
            </span>
          }
        </div>
      </div>
      <div className={`${isRTL ? 'mr-auto' : 'ml-auto'}`}>
        <div className="text-xs font-medium text-amber-600">
          {t('dashboard.streak.activeStreak')}
        </div>
      </div>
    </motion.div>);

};
export default StreakCounter;