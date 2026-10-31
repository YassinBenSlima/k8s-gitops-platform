import React from 'react';
import {
  MousePointer2,
  Minus,
  Circle,
  Square,
  Type,
  Pencil,
  ArrowRight } from
'lucide-react';
import { AnnotationType } from '../hooks/useAnnotations';
interface AnnotationToolProps {
  settings: {
    type: AnnotationType;
    setType: (type: AnnotationType) => void;
    color: string;
    setColor: (color: string) => void;
    strokeWidth: number;
    setStrokeWidth: (width: number) => void;
    fill: boolean;
    setFill: (fill: boolean) => void;
  };
}
export const AnnotationTool: React.FC<AnnotationToolProps> = ({ settings }) => {
  const tools = [
  {
    id: 'arrow',
    icon: ArrowRight,
    label: 'Arrow'
  },
  {
    id: 'line',
    icon: Minus,
    label: 'Line'
  },
  {
    id: 'rect',
    icon: Square,
    label: 'Rectangle'
  },
  {
    id: 'circle',
    icon: Circle,
    label: 'Circle'
  },
  {
    id: 'text',
    icon: Type,
    label: 'Text'
  },
  {
    id: 'freehand',
    icon: Pencil,
    label: 'Draw'
  }] as
  const;
  const colors = [
  '#EF4444',
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#000000',
  '#FFFFFF' // White
  ];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Annotations
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tools.map((tool) =>
        <button
          key={tool.id}
          onClick={() => settings.setType(tool.id as AnnotationType)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${settings.type === tool.id ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

            <tool.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">{tool.label}</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) =>
            <button
              key={color}
              onClick={() => settings.setColor(color)}
              className={`w-8 h-8 rounded-full border-2 ${settings.color === color ? 'border-blue-500 scale-110' : 'border-transparent'} transition-transform`}
              style={{
                backgroundColor: color
              }}
              aria-label={`Select color ${color}`} />

            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stroke Width ({settings.strokeWidth}px)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={settings.strokeWidth}
            onChange={(e) => settings.setStrokeWidth(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

        </div>

        {settings.type !== 'arrow' &&
        settings.type !== 'line' &&
        settings.type !== 'text' &&
        <div className="flex items-center">
              <input
            type="checkbox"
            id="fill-shape"
            checked={settings.fill}
            onChange={(e) => settings.setFill(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />

              <label
            htmlFor="fill-shape"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300">

                Fill Shape
              </label>
            </div>
        }
      </div>
    </div>);

};