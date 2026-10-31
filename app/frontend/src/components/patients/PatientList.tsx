import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, CalendarIcon, TrendingUpIcon } from 'lucide-react';
import { useTranslation } from '../../../node_modules/react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
const patients = [
  {
    id: 1,
    name: 'Sophie Martin',
    age: '14 ans',
    treatment: 'Appareil fixe',
    progress: 60,
    nextAppointment: '15/06/2023',
    avatar: 'SM',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    age: '12 ans',
    treatment: 'Appareil fixe',
    progress: 30,
    nextAppointment: '22/06/2023',
    avatar: 'TB',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    name: 'Emma Petit',
    age: '16 ans',
    treatment: 'Aligneurs',
    progress: 80,
    nextAppointment: '18/06/2023',
    avatar: 'EP',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    name: 'Lucas Dubois',
    age: '15 ans',
    treatment: 'Appareil fixe',
    progress: 45,
    nextAppointment: '29/06/2023',
    avatar: 'LD',
    color: 'from-amber-500 to-orange-500'
  }];

interface PatientListProps {
  compact?: boolean;
}

const PatientList = ({ compact = false }: PatientListProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      {patients.map((patient, index) =>
        <motion.div
          key={patient.id}
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
          whileHover={{
            scale: compact ? 1.01 : 1.02,
            x: compact ? 3 : 5
          }}
          className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl ${compact ? 'p-2.5' : 'p-4'} border border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-all cursor-pointer group`}>

          <div className="flex items-center">
            <div
              className={`${compact ? 'h-9 w-9 rounded-lg' : 'h-12 w-12 rounded-xl'} bg-gradient-to-br ${patient.color} flex items-center justify-center shadow-md`}>

              <span className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-white`}>{patient.avatar}</span>
            </div>
            <div className={`flex-1 min-w-0 ${compact ? 'ml-2.5' : 'ml-4'}`}>
              <p className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-gray-900 dark:text-white truncate`}>
                {patient.name}
              </p>
              <p className={`${compact ? 'text-[11px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
                {patient.age} · {patient.treatment}
              </p>
            </div>
            <div className={`flex flex-col items-end ${compact ? 'mr-2.5' : 'mr-4'}`}>
              <div className="flex items-center mb-1">
                <div className={`${compact ? 'w-16 h-1' : 'w-20 h-1.5'} bg-gray-200 dark:bg-gray-600 rounded-full`}>
                  <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${patient.progress}%`
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.1
                    }}
                    className={`bg-gradient-to-r ${patient.color} ${compact ? 'h-1' : 'h-1.5'} rounded-full`} />

                </div>
                <span className={`${compact ? 'ml-1.5 text-[10px]' : 'ml-2 text-xs'} font-semibold text-gray-700 dark:text-gray-300`}>
                  {patient.progress}%
                </span>
              </div>
              <div className={`${compact ? 'text-[10px]' : 'text-xs'} flex items-center text-gray-500 dark:text-gray-400`}>
                <CalendarIcon className={`${compact ? 'h-2.5 w-2.5 mr-1' : 'h-3 w-3 mr-1'}`} />
                {patient.nextAppointment}
              </div>
            </div>
            <ChevronRightIcon className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors`} />
          </div>
        </motion.div>
      )}
    </div>);

};
export default PatientList;