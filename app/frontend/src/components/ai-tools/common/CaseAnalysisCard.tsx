import React from 'react';
interface CaseAnalysisCardProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
  footerText?: string;
}
const CaseAnalysisCard: React.FC<CaseAnalysisCardProps> = ({
  title,
  items,
  footerText
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className="p-4">
        <dl className="space-y-3">
          {items.map((item, index) =>
          <div key={index} className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.label}
              </dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-white">
                {item.value}
              </dd>
            </div>
          )}
        </dl>
        {footerText &&
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {footerText}
            </p>
          </div>
        }
      </div>
    </div>);

};
export default CaseAnalysisCard;