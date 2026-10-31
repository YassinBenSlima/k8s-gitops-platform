import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
interface Anomaly {
  id: number;
  type: string;
  location: string;
  severity: string;
}
interface AnomalyListProps {
  anomalies: Anomaly[];
  onSelect?: (id: number) => void;
}
const AnomalyList = ({ anomalies, onSelect }: AnomalyListProps) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Élevée':
        return 'bg-red-100 text-red-800';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'Faible':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="space-y-2">
      {anomalies.length === 0 ?
      <div className="text-center py-4">
          <AlertCircleIcon className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Aucune anomalie détectée
          </p>
        </div> :

      anomalies.map((anomaly) =>
      <div
        key={anomaly.id}
        className={`p-3 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 ${onSelect ? 'cursor-pointer' : ''}`}
        onClick={() => onSelect && onSelect(anomaly.id)}>

            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {anomaly.type}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {anomaly.location}
                </p>
              </div>
              <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>

                {anomaly.severity}
              </span>
            </div>
          </div>
      )
      }
    </div>);

};
export default AnomalyList;