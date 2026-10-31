import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';
interface DoctorLevelProps {
  level: number;
  experience: number;
  nextLevelExperience: number;
  title: string;
}
const DoctorLevel: React.FC<DoctorLevelProps> = ({
  level,
  experience,
  nextLevelExperience,
  title
}) => {
  const progressPercentage = experience / nextLevelExperience * 100;
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <TrophyIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Niveau {level}
          </p>
          <p className="text-xs text-gray-600 dark:text-white">{title}</p>
        </div>
      </div>
      <div className="w-32">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">XP</span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {experience}/{nextLevelExperience}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{
              width: 0
            }}
            animate={{
              width: `${progressPercentage}%`
            }}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500" />

        </div>
      </div>
    </div>);

};
export default DoctorLevel;