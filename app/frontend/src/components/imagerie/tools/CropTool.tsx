import React from 'react';
import { Crop, Square, Monitor, Smartphone, Maximize } from 'lucide-react';
interface CropToolProps {
  onApply: (aspectRatio: number | null) => void;
  onCancel: () => void;
  currentAspectRatio: number | null;
}
export const CropTool: React.FC<CropToolProps> = ({
  onApply,
  onCancel,
  currentAspectRatio
}) => {
  const ratios = [
  {
    label: 'Free',
    value: null,
    icon: Maximize
  },
  {
    label: '1:1',
    value: 1,
    icon: Square
  },
  {
    label: '4:3',
    value: 4 / 3,
    icon: Monitor
  },
  {
    label: '16:9',
    value: 16 / 9,
    icon: Monitor
  },
  {
    label: '9:16',
    value: 9 / 16,
    icon: Smartphone
  }];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Crop & Resize
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Select an aspect ratio or drag the handles on the canvas to crop the
          image.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {ratios.map((ratio) =>
        <button
          key={ratio.label}
          onClick={() => onApply(ratio.value)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${currentAspectRatio === ratio.value ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>

            <ratio.icon
            className={`w-5 h-5 mb-2 ${currentAspectRatio === ratio.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`} />

            <span
            className={`text-xs font-medium ${currentAspectRatio === ratio.value ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}>

              {ratio.label}
            </span>
          </button>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onCancel}
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium">

          Reset Crop
        </button>
      </div>
    </div>);

};