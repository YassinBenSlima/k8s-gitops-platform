import React from 'react';
interface AIInsightCardProps {
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ElementType;
  color: string;
}
const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  value,
  trend,
  description,
  icon: Icon,
  color
}) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'green':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'amber':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400';
      case 'indigo':
        return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };
  const getTrendColor = (trend) => {
    if (trend.startsWith('+')) {
      return 'text-green-600 dark:text-green-400';
    } else if (trend.startsWith('-')) {
      return 'text-red-600 dark:text-red-400';
    } else {
      return 'text-gray-500 dark:text-gray-400';
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 rounded-md p-3 ${getColorClasses(color)}`}>

            <Icon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {value}
                  </div>
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${getTrendColor(trend)}`}>

                    {trend}
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>);

};
export default AIInsightCard;