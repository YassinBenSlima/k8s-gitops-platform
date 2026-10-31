import React from 'react';
import { useTranslation } from '../../../node_modules/react-i18next';
const BadgeShowcase = () => {
  const { t } = useTranslation();
  // Sample badges data
  const badges = [
    {
      id: 1,
      name: t('gamification.badges.patientCare'),
      icon: '🏆',
      achieved: true
    },
    {
      id: 2,
      name: t('gamification.badges.perfectAttendance'),
      icon: '⭐',
      achieved: true
    },
    {
      id: 3,
      name: t('gamification.badges.quickLearner'),
      icon: '🧠',
      achieved: true
    },
    {
      id: 4,
      name: t('gamification.badges.teamPlayer'),
      icon: '👥',
      achieved: false
    }];

  return (
    <div className="grid grid-cols-2 gap-3">
      {badges.map((badge) =>
        <div
          key={badge.id}
          className={`flex items-center p-3 rounded-lg border ${badge.achieved ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'}`}>

          <div className="text-xl mr-2">{badge.icon}</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {badge.name}
            {!badge.achieved &&
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('gamification.badges.locked')}
              </div>
            }
          </div>
        </div>
      )}
    </div>);

};
export default BadgeShowcase;