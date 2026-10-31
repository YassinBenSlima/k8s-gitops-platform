import React from 'react';
import { RotateCw, RotateCcw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { ImageTransform } from '../utils/imageProcessing';
interface RotateToolProps {
  transform: ImageTransform;
  onChange: (key: keyof ImageTransform, value: any) => void;
}
export const RotateTool: React.FC<RotateToolProps> = ({
  transform,
  onChange
}) => {
  const handleRotate = (degrees: number) => {
    onChange('rotation', (transform.rotation + degrees) % 360);
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Rotate & Flip
        </h3>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          Rotation ({Math.round(transform.rotation)}°)
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={transform.rotation}
          onChange={(e) => onChange('rotation', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

        <div className="flex justify-between text-xs text-gray-500">
          <span>-180°</span>
          <span>0°</span>
          <span>180°</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleRotate(-90)}
          className="flex items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          title="Rotate Left 90°">

          <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-xs">Left 90°</span>
        </button>
        <button
          onClick={() => handleRotate(90)}
          className="flex items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          title="Rotate Right 90°">

          <RotateCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-xs">Right 90°</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange('flipHorizontal', !transform.flipHorizontal)}
          className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${transform.flipHorizontal ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

          <FlipHorizontal className="w-5 h-5" />
          <span className="ml-2 text-xs">Flip H</span>
        </button>
        <button
          onClick={() => onChange('flipVertical', !transform.flipVertical)}
          className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${transform.flipVertical ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

          <FlipVertical className="w-5 h-5" />
          <span className="ml-2 text-xs">Flip V</span>
        </button>
      </div>
    </div>);

};