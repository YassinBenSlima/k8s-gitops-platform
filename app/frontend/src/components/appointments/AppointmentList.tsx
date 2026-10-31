import React from 'react';
import { ClockIcon, CheckIcon, XIcon } from 'lucide-react';
import { useTranslation } from '../../../node_modules/react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
const appointments = [
  {
    id: 1,
    patient: 'Sophie Martin',
    time: '09:00',
    duration: '30 min',
    type: 'Consultation',
    status: 'confirmed'
  },
  {
    id: 2,
    patient: 'Thomas Bernard',
    time: '10:00',
    duration: '45 min',
    type: 'Pose appareil',
    status: 'confirmed'
  },
  {
    id: 3,
    patient: 'Emma Petit',
    time: '11:00',
    duration: '30 min',
    type: 'Contrôle',
    status: 'confirmed'
  },
  {
    id: 4,
    patient: 'Lucas Dubois',
    time: '14:00',
    duration: '45 min',
    type: 'Ajustement',
    status: 'pending'
  }];

interface AppointmentListProps {
  compact?: boolean;
}

const AppointmentList = ({ compact = false }: AppointmentListProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const getAppointmentType = (type) => {
    switch (type) {
      case 'Consultation':
        return t('appointments.appointmentTypes.initialConsultation');
      case 'Pose appareil':
        return t('appointments.appointmentTypes.applianceInstallation');
      case 'Contrôle':
        return t('appointments.appointmentTypes.checkup');
      case 'Ajustement':
        return t('appointments.appointmentTypes.adjustment');
      default:
        return type;
    }
  };
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment) =>
          <li key={appointment.id} className={compact ? 'py-2.5' : 'py-4'}>
            <div
              className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} ${compact ? 'space-x-3' : 'space-x-4'}`}>

              <div className="flex-shrink-0">
                <div className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} rounded-full bg-blue-100 flex items-center justify-center`}>
                  <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-blue-800`}>
                    {appointment.patient.
                      split(' ').
                      map((name) => name[0]).
                      join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900 dark:text-white truncate`}>
                  {appointment.patient}
                </p>
                <div
                  className={`flex items-center mt-1 ${isRTL ? 'space-x-reverse' : ''}`}>

                  <ClockIcon
                    className={`flex-shrink-0 ${isRTL ? 'ml-1.5' : 'mr-1.5'} ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-gray-400`} />

                  <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 truncate`}>
                    {appointment.time} · {appointment.duration} ·{' '}
                    {getAppointmentType(appointment.type)}
                  </p>
                </div>
              </div>
              <div>
                {appointment.status === 'confirmed' ?
                  <span
                    className={`inline-flex items-center ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs'} rounded-full font-medium bg-green-100 text-green-800 ${isRTL ? 'space-x-reverse' : ''}`}>

                    <CheckIcon
                      className={`${isRTL ? 'ml-1' : 'mr-1'} ${compact ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />

                    {t('appointments.status.confirmed')}
                  </span> :

                  <span className={`inline-flex items-center rounded-full font-medium bg-yellow-100 text-yellow-800 ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs'}`}>
                    {t('appointments.status.pending')}
                  </span>
                }
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>);

};
export default AppointmentList;