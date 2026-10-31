import React from 'react';
import { Sun, Contrast, Droplet, Activity } from 'lucide-react';
import { ImageFilter } from '../utils/imageProcessing';
interface FilterToolProps {
  filters: ImageFilter;
  onChange: (key: keyof ImageFilter, value: number) => void;
}
export const FilterTool: React.FC<FilterToolProps> = ({
  filters,
  onChange
}) => {
  const controls = [
  {
    key: 'brightness',
    label: 'Brightness',
    icon: Sun,
    min: -100,
    max: 100,
    step: 1
  },
  {
    key: 'contrast',
    label: 'Contrast',
    icon: Contrast,
    min: -100,
    max: 100,
    step: 1
  },
  {
    key: 'saturation',
    label: 'Saturation',
    icon: Droplet,
    min: -100,
    max: 100,
    step: 1
  },
  {
    key: 'blur',
    label: 'Blur',
    icon: Activity,
    min: 0,
    max: 20,
    step: 0.5
  }] as
  const;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Adjustments
        </h3>
      </div>

      <div className="space-y-6">
        {controls.map((control) =>
        <div key={control.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-xs font-medium text-gray-700 dark:text-gray-300">
                <control.icon className="w-4 h-4 mr-2 text-gray-500" />
                {control.label}
              </div>
              <span className="text-xs text-gray-500">
                {filters[control.key]}
              </span>
            </div>
            <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={filters[control.key]}
            onChange={(e) =>
            onChange(control.key, parseFloat(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            onChange('brightness', 0);
            onChange('contrast', 0);
            onChange('saturation', 0);
            onChange('blur', 0);
          }}
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium">

          Reset Adjustments
        </button>
      </div>
    </div>);

};