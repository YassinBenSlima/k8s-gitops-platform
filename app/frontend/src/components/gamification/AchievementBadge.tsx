import React from 'react';
import { motion } from 'framer-motion';
export interface AchievementBadgeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value?: number;
  maxValue?: number;
  color?: 'blue' | 'green' | 'amber' | 'indigo' | 'purple';
  isNew?: boolean;
  isCompleted?: boolean;
}
const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  title,
  description,
  value,
  maxValue,
  color = 'blue',
  isNew = false,
  isCompleted = false
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 ring-blue-500/30',
    green: 'bg-green-100 text-green-600 ring-green-500/30',
    amber: 'bg-amber-100 text-amber-600 ring-amber-500/30',
    indigo: 'bg-indigo-100 text-indigo-600 ring-indigo-500/30',
    purple: 'bg-purple-100 text-purple-600 ring-purple-500/30'
  };
  return (
    <motion.div
      initial={{
        scale: 0.95,
        opacity: 0
      }}
      animate={{
        scale: 1,
        opacity: 1
      }}
      transition={{
        duration: 0.3
      }}
      className={`relative p-4 rounded-lg border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'} shadow-sm hover:shadow-md transition-shadow`}
      whileHover={{
        y: -4
      }}>

      {isNew &&
      <motion.span
        initial={{
          scale: 0
        }}
        animate={{
          scale: 1
        }}
        transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 500
        }}
        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white ring-2 ring-white">

          !
        </motion.span>
      }
      <div className="flex items-start">
        <motion.div
          className={`flex-shrink-0 p-2 rounded-full ${colorClasses[color]} ring-2`}
          whileHover={{
            rotate: [0, -10, 10, -10, 0]
          }}
          transition={{
            duration: 0.5
          }}>

          {icon}
        </motion.div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
          {value !== undefined && maxValue !== undefined &&
          <div className="mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Progression</span>
                <span
                className={`font-medium ${isCompleted ? 'text-green-600' : 'text-gray-700'}`}>

                  {value}/{maxValue}
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                initial={{
                  width: 0
                }}
                animate={{
                  width: `${Math.min(100, value / maxValue * 100)}%`
                }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: 'easeOut'
                }}
                className={`h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : `bg-${color}-500`}`}>
              </motion.div>
              </div>
            </div>
          }
          {isCompleted &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.5
            }}
            className="mt-2 flex items-center">

              <svg
              className="h-4 w-4 text-green-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7" />

              </svg>
              <span className="text-xs font-medium text-green-600">
                Complété
              </span>
            </motion.div>
          }
        </div>
      </div>
    </motion.div>);

};
export default AchievementBadge;