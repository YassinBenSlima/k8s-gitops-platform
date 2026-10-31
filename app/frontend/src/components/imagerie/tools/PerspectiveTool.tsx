import React from 'react';
import { Grid, Check, X } from 'lucide-react';
interface PerspectiveToolProps {
  onApply: () => void;
  onCancel: () => void;
}
export const PerspectiveTool: React.FC<PerspectiveToolProps> = ({
  onApply,
  onCancel
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Perspective Correction
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Drag the four corner handles on the canvas to align the grid with the
          object you want to straighten.
        </p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className="flex items-start">
          <Grid className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-xs text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">How to use:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Drag corners to match the object's perspective</li>
              <li>The grid shows how the image will be rectified</li>
              <li>Click Apply to transform</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">

          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          onClick={onApply}
          className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

          <Check className="w-4 h-4 mr-2" />
          Apply
        </button>
      </div>
    </div>);

};