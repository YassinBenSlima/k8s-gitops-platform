import React from 'react';
import {
  PenTool as PenIcon,
  MousePointer2Icon,
  PlusIcon,
  MinusIcon } from
'lucide-react';
export type PenMode = 'path' | 'shape' | 'selection';
export type PenSubTool =
'pen' |
'add-anchor' |
'delete-anchor' |
'convert-point' |
'direct-select';
export interface PenSettings {
  mode: PenMode;
  subTool: PenSubTool;
  strokeWidth: number;
  strokeColor: string;
  fillColor: string;
  autoAddDelete: boolean;
  rubberBand: boolean;
}
interface PenToolProps {
  settings: PenSettings;
  onSettingsChange: (settings: PenSettings) => void;
}
export function PenTool({ settings, onSettingsChange }: PenToolProps) {
  const updateSetting = <K extends keyof PenSettings,>(
  key: K,
  value: PenSettings[K]) =>
  {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };
  const subTools: {
    id: PenSubTool;
    icon: React.ElementType;
    label: string;
  }[] = [
  {
    id: 'pen',
    icon: PenIcon,
    label: 'Pen Tool'
  },
  {
    id: 'add-anchor',
    icon: PlusIcon,
    label: 'Add Anchor'
  },
  {
    id: 'delete-anchor',
    icon: MinusIcon,
    label: 'Delete Anchor'
  },
  {
    id: 'direct-select',
    icon: MousePointer2Icon,
    label: 'Direct Select'
  }];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <PenIcon className="w-4 h-4" />
        <span>Pen Tool</span>
      </div>

      {/* Mode Selection */}
      <div className="flex bg-gray-800 rounded-lg p-1">
        {(['path', 'shape', 'selection'] as PenMode[]).map((mode) =>
        <button
          key={mode}
          onClick={() => updateSetting('mode', mode)}
          className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${settings.mode === mode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>

            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        )}
      </div>

      {/* Sub Tools */}
      <div className="grid grid-cols-4 gap-1">
        {subTools.map((tool) =>
        <button
          key={tool.id}
          onClick={() => updateSetting('subTool', tool.id)}
          className={`p-2 rounded transition-colors flex items-center justify-center ${settings.subTool === tool.id ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-800'}`}
          title={tool.label}>

            <tool.icon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Style Settings (for Shape mode) */}
      {settings.mode === 'shape' &&
      <div className="space-y-3 pt-2 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Fill</label>
              <div className="flex items-center gap-2">
                <input
                type="color"
                value={settings.fillColor}
                onChange={(e) => updateSetting('fillColor', e.target.value)}
                className="w-8 h-8 rounded border border-gray-600 cursor-pointer" />

              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Stroke</label>
              <div className="flex items-center gap-2">
                <input
                type="color"
                value={settings.strokeColor}
                onChange={(e) => updateSetting('strokeColor', e.target.value)}
                className="w-8 h-8 rounded border border-gray-600 cursor-pointer" />

              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Stroke Width</span>
              <span className="text-gray-300">{settings.strokeWidth}px</span>
            </div>
            <input
            type="range"
            min="0"
            max="20"
            value={settings.strokeWidth}
            onChange={(e) =>
            updateSetting('strokeWidth', Number(e.target.value))
            }
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>
        </div>
      }

      {/* Options */}
      <div className="space-y-2 pt-2 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Auto Add/Delete</label>
          <input
            type="checkbox"
            checked={settings.autoAddDelete}
            onChange={(e) => updateSetting('autoAddDelete', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Rubber Band</label>
          <input
            type="checkbox"
            checked={settings.rubberBand}
            onChange={(e) => updateSetting('rubberBand', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

        </div>
      </div>

      {/* Actions */}
      <div className="pt-2">
        <button className="w-full px-3 py-2 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors">
          {settings.mode === 'selection' ?
          'Make Selection' :
          settings.mode === 'shape' ?
          'Create Shape' :
          'Stroke Path'}
        </button>
      </div>
    </div>);

}