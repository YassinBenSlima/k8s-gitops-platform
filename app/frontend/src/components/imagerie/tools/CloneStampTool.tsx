import React from 'react';
import { StampIcon, TargetIcon } from 'lucide-react';
export interface CloneStampSettings {
  size: number;
  hardness: number;
  opacity: number;
  flow: number;
  aligned: boolean;
  sampleAllLayers: boolean;
  sourcePoint: {
    x: number;
    y: number;
  } | null;
}
interface CloneStampToolProps {
  settings: CloneStampSettings;
  onSettingsChange: (settings: CloneStampSettings) => void;
  isSettingSource: boolean;
  onToggleSourceMode: () => void;
}
export function CloneStampTool({
  settings,
  onSettingsChange,
  isSettingSource,
  onToggleSourceMode
}: CloneStampToolProps) {
  const updateSetting = <K extends keyof CloneStampSettings,>(
  key: K,
  value: CloneStampSettings[K]) =>
  {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <StampIcon className="w-4 h-4" />
        <span>Clone Stamp</span>
      </div>

      {/* Source Selection */}
      <div className="p-3 bg-gray-800 rounded-lg space-y-2">
        <div className="text-xs text-gray-400 font-medium">Source Point</div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSourceMode}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${isSettingSource ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>

            <TargetIcon className="w-3 h-3" />
            {isSettingSource ? 'Click on Canvas' : 'Set Source'}
          </button>

          {settings.sourcePoint &&
          <div className="text-xs text-gray-500 font-mono">
              {Math.round(settings.sourcePoint.x)},{' '}
              {Math.round(settings.sourcePoint.y)}
            </div>
          }
        </div>

        <p className="text-[10px] text-gray-500">
          Alt+Click on canvas to set source point quickly
        </p>
      </div>

      {/* Brush Settings */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Size</span>
            <span className="text-gray-300">{settings.size}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="500"
            value={settings.size}
            onChange={(e) => updateSetting('size', Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Hardness</span>
            <span className="text-gray-300">{settings.hardness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.hardness}
            onChange={(e) => updateSetting('hardness', Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Opacity</span>
            <span className="text-gray-300">{settings.opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.opacity}
            onChange={(e) => updateSetting('opacity', Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 pt-2 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Aligned</label>
          <input
            type="checkbox"
            checked={settings.aligned}
            onChange={(e) => updateSetting('aligned', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Sample All Layers</label>
          <input
            type="checkbox"
            checked={settings.sampleAllLayers}
            onChange={(e) => updateSetting('sampleAllLayers', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

        </div>
      </div>
    </div>);

}