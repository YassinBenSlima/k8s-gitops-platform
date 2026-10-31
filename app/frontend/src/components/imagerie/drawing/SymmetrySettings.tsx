import React from 'react';
import { SplitIcon, GridIcon, RefreshCwIcon } from 'lucide-react';
export type SymmetryType =
'none' |
'vertical' |
'horizontal' |
'dual' |
'radial' |
'mandala';
export interface SymmetryConfig {
  enabled: boolean;
  type: SymmetryType;
  segments: number; // For radial/mandala
  centerX: number;
  centerY: number;
  showGuides: boolean;
}
interface SymmetrySettingsProps {
  config: SymmetryConfig;
  onChange: (config: SymmetryConfig) => void;
}
export function SymmetrySettings({ config, onChange }: SymmetrySettingsProps) {
  const updateConfig = <K extends keyof SymmetryConfig,>(
  key: K,
  value: SymmetryConfig[K]) =>
  {
    onChange({
      ...config,
      [key]: value
    });
  };
  const types: {
    id: SymmetryType;
    label: string;
    icon: React.ElementType;
  }[] = [
  {
    id: 'vertical',
    label: 'Vertical',
    icon: SplitIcon
  },
  {
    id: 'horizontal',
    label: 'Horizontal',
    icon: SplitIcon
  },
  {
    id: 'dual',
    label: 'Dual Axis',
    icon: GridIcon
  },
  {
    id: 'radial',
    label: 'Radial',
    icon: RefreshCwIcon
  },
  {
    id: 'mandala',
    label: 'Mandala',
    icon: RefreshCwIcon
  }];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
          <SplitIcon className="w-4 h-4" />
          <span>Symmetry</span>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="symmetry-enabled"
            checked={config.enabled}
            onChange={(e) => updateConfig('enabled', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

          <label
            htmlFor="symmetry-enabled"
            className="ml-2 text-xs text-gray-400">

            Enable
          </label>
        </div>
      </div>

      {config.enabled &&
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Type Selection */}
          <div className="grid grid-cols-3 gap-2">
            {types.map((type) =>
          <button
            key={type.id}
            onClick={() => updateConfig('type', type.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${config.type === type.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>

                <type.icon
              className={`w-4 h-4 mb-1 ${type.id === 'horizontal' ? 'rotate-90' : ''}`} />

                <span className="text-[10px]">{type.label}</span>
              </button>
          )}
          </div>

          {/* Radial/Mandala Settings */}
          {(config.type === 'radial' || config.type === 'mandala') &&
        <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Segments</span>
                <span className="text-gray-300">{config.segments}</span>
              </div>
              <input
            type="range"
            min="3"
            max="36"
            value={config.segments}
            onChange={(e) =>
            updateConfig('segments', Number(e.target.value))
            }
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

            </div>
        }

          {/* Center Position */}
          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-medium">
              Center Point
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] text-gray-500 block">X (%)</label>
                <input
                type="number"
                min="0"
                max="100"
                value={config.centerX}
                onChange={(e) =>
                updateConfig('centerX', Number(e.target.value))
                }
                className="w-full px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded text-gray-200" />

              </div>
              <div className="flex-1">
                <label className="text-[10px] text-gray-500 block">Y (%)</label>
                <input
                type="number"
                min="0"
                max="100"
                value={config.centerY}
                onChange={(e) =>
                updateConfig('centerY', Number(e.target.value))
                }
                className="w-full px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded text-gray-200" />

              </div>
            </div>
            <button
            onClick={() => {
              updateConfig('centerX', 50);
              updateConfig('centerY', 50);
            }}
            className="w-full px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded hover:bg-gray-700">

              Reset Center
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <label className="text-xs text-gray-400">Show Guides</label>
            <input
            type="checkbox"
            checked={config.showGuides}
            onChange={(e) => updateConfig('showGuides', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

          </div>
        </div>
      }
    </div>);

}