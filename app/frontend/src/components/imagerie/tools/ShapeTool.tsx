import React from 'react';
import {
  SquareIcon,
  CircleIcon,
  TriangleIcon,
  StarIcon,
  ArrowRightIcon,
  MessageSquareIcon } from
'lucide-react';
export type ShapeType =
'rectangle' |
'ellipse' |
'triangle' |
'star' |
'arrow' |
'line' |
'polygon' |
'callout';
export interface ShapeSettings {
  type: ShapeType;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  sides?: number; // For polygon/star
  radius?: number; // For rounded rect / star inner radius
  arrowHead?: 'start' | 'end' | 'both' | 'none';
}
interface ShapeToolProps {
  settings: ShapeSettings;
  onSettingsChange: (settings: ShapeSettings) => void;
}
export function ShapeTool({ settings, onSettingsChange }: ShapeToolProps) {
  const updateSetting = <K extends keyof ShapeSettings,>(
  key: K,
  value: ShapeSettings[K]) =>
  {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };
  const shapes: {
    type: ShapeType;
    icon: React.ElementType;
    label: string;
  }[] = [
  {
    type: 'rectangle',
    icon: SquareIcon,
    label: 'Rectangle'
  },
  {
    type: 'ellipse',
    icon: CircleIcon,
    label: 'Ellipse'
  },
  {
    type: 'triangle',
    icon: TriangleIcon,
    label: 'Triangle'
  },
  {
    type: 'star',
    icon: StarIcon,
    label: 'Star'
  },
  {
    type: 'arrow',
    icon: ArrowRightIcon,
    label: 'Arrow'
  },
  {
    type: 'callout',
    icon: MessageSquareIcon,
    label: 'Callout'
  }];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <SquareIcon className="w-4 h-4" />
        <span>Shapes</span>
      </div>

      {/* Shape Type Selection */}
      <div className="grid grid-cols-3 gap-2">
        {shapes.map((shape) =>
        <button
          key={shape.type}
          onClick={() => updateSetting('type', shape.type)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${settings.type === shape.type ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          title={shape.label}>

            <shape.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px]">{shape.label}</span>
          </button>
        )}
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Fill</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.fill}
              onChange={(e) => updateSetting('fill', e.target.value)}
              className="w-8 h-8 rounded border border-gray-600 cursor-pointer" />

            <div className="flex-1 h-8 bg-gray-800 rounded border border-gray-700 flex items-center px-2 text-xs text-gray-300">
              {settings.fill}
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Stroke</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.stroke}
              onChange={(e) => updateSetting('stroke', e.target.value)}
              className="w-8 h-8 rounded border border-gray-600 cursor-pointer" />

            <div className="flex-1 h-8 bg-gray-800 rounded border border-gray-700 flex items-center px-2 text-xs text-gray-300">
              {settings.stroke}
            </div>
          </div>
        </div>
      </div>

      {/* Stroke Width */}
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
          onChange={(e) => updateSetting('strokeWidth', Number(e.target.value))}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

      </div>

      {/* Opacity */}
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

      {/* Specific Shape Settings */}
      {(settings.type === 'star' || settings.type === 'polygon') &&
      <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Sides / Points</span>
            <span className="text-gray-300">{settings.sides || 5}</span>
          </div>
          <input
          type="range"
          min="3"
          max="20"
          value={settings.sides || 5}
          onChange={(e) => updateSetting('sides', Number(e.target.value))}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      }

      {settings.type === 'rectangle' &&
      <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Corner Radius</span>
            <span className="text-gray-300">{settings.radius || 0}px</span>
          </div>
          <input
          type="range"
          min="0"
          max="100"
          value={settings.radius || 0}
          onChange={(e) => updateSetting('radius', Number(e.target.value))}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      }
    </div>);

}