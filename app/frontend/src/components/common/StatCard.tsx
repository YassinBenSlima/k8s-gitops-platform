import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  trend?: string;
}
const StatCard = ({ title, value, icon, trend }: StatCardProps) => {
  const isTrendPositive = trend && trend.startsWith('+');
  const { isRTL } = useLanguage();
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className={`${isRTL ? 'mr-5' : 'ml-5'} w-0 flex-1`}>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
              </div>
              {trend &&
              <div
                className={`${isRTL ? 'mr-2' : 'ml-2'} flex items-baseline text-sm font-semibold ${isTrendPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>

                  {isTrendPositive ?
                <ArrowUpIcon
                  className="self-center flex-shrink-0 h-4 w-4 text-green-500 dark:text-green-400"
                  aria-hidden="true" /> :


                <ArrowDownIcon
                  className="self-center flex-shrink-0 h-4 w-4 text-red-500 dark:text-red-400"
                  aria-hidden="true" />

                }
                  <span className="sr-only">
                    {isTrendPositive ? 'Increased' : 'Decreased'} by
                  </span>
                  {trend}
                </div>
              }
            </dd>
          </div>
        </div>
      </div>
    </div>);

};
export default StatCard;