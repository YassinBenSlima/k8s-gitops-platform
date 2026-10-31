import React, { useState } from 'react';
import {
  Crop,
  RotateCw,
  Sliders,
  PenTool,
  Grid,
  MousePointer2,
  Move,
  ZoomIn,
  Square,
  Circle,
  Lasso,
  Wand2,
  Droplet,
  Palette,
  Type,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Contrast,
  Paintbrush,
  Shapes,
  Copy,
  Maximize2,
  Wind,
  Droplets,
  TrendingUp,
  Sun,
  Pipette,
  BoxIcon } from
'lucide-react';
import { ToolType } from './hooks/useImageEditor';
interface EditorToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}
interface ToolSection {
  id: string;
  label: string;
  icon: any;
  tools: Array<{
    id: ToolType;
    icon: any;
    label: string;
  }>;
}
export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTool,
  onToolChange
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
  'core',
  'selection']
  );
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
    prev.includes(sectionId) ?
    prev.filter((id) => id !== sectionId) :
    [...prev, sectionId]
    );
  };
  const toolSections: ToolSection[] = [
  {
    id: 'core',
    label: 'Core',
    icon: MousePointer2,
    tools: [
    {
      id: 'select',
      icon: MousePointer2,
      label: 'Select'
    },
    {
      id: 'move',
      icon: Move,
      label: 'Move'
    },
    {
      id: 'zoom',
      icon: ZoomIn,
      label: 'Zoom'
    }]

  },
  {
    id: 'layers',
    label: 'Layers',
    icon: Layers,
    tools: [
    {
      id: 'layers',
      icon: Layers,
      label: 'Layers Panel'
    }]

  },
  {
    id: 'selection',
    label: 'Selection',
    icon: Square,
    tools: [
    {
      id: 'rectangle-select',
      icon: Square,
      label: 'Rectangle'
    },
    {
      id: 'ellipse-select',
      icon: Circle,
      label: 'Ellipse'
    },
    {
      id: 'polygon-select',
      icon: Shapes,
      label: 'Polygon'
    },
    {
      id: 'lasso-select',
      icon: Lasso,
      label: 'Lasso'
    },
    {
      id: 'magic-wand',
      icon: Wand2,
      label: 'Magic Wand'
    }]

  },
  {
    id: 'filters',
    label: 'Filters',
    icon: Sliders,
    tools: [
    {
      id: 'blur',
      icon: BoxIcon,
      label: 'BoxIcon'
    },
    {
      id: 'sharpen',
      icon: Contrast,
      label: 'Sharpen'
    },
    {
      id: 'artistic',
      icon: Paintbrush,
      label: 'Artistic'
    },
    {
      id: 'filter',
      icon: Sliders,
      label: 'Adjust'
    }]

  },
  {
    id: 'color',
    label: 'Color',
    icon: Palette,
    tools: [
    {
      id: 'curves',
      icon: TrendingUp,
      label: 'Curves'
    },
    {
      id: 'levels',
      icon: Sliders,
      label: 'Levels'
    },
    {
      id: 'color-balance',
      icon: Palette,
      label: 'Color Balance'
    },
    {
      id: 'hue-saturation',
      icon: Sun,
      label: 'Hue/Saturation'
    },
    {
      id: 'color-picker',
      icon: Pipette,
      label: 'Color Picker'
    }]

  },
  {
    id: 'drawing',
    label: 'Drawing',
    icon: Paintbrush,
    tools: [
    {
      id: 'brush',
      icon: Paintbrush,
      label: 'Brush'
    },
    {
      id: 'gradient',
      icon: Droplets,
      label: 'Gradient'
    },
    {
      id: 'shape',
      icon: Shapes,
      label: 'Shapes'
    },
    {
      id: 'pen',
      icon: PenTool,
      label: 'Pen Tool'
    },
    {
      id: 'clone-stamp',
      icon: Copy,
      label: 'Clone Stamp'
    },
    {
      id: 'annotate',
      icon: PenTool,
      label: 'Annotate'
    }]

  },
  {
    id: 'transform',
    label: 'Transform',
    icon: Maximize2,
    tools: [
    {
      id: 'free-transform',
      icon: Maximize2,
      label: 'Free Transform'
    },
    {
      id: 'warp',
      icon: Wind,
      label: 'Warp'
    },
    {
      id: 'liquify',
      icon: Droplet,
      label: 'Liquify'
    },
    {
      id: 'rotate',
      icon: RotateCw,
      label: 'Rotate'
    },
    {
      id: 'crop',
      icon: Crop,
      label: 'Crop'
    },
    {
      id: 'perspective',
      icon: Grid,
      label: 'Perspective'
    }]

  },
  {
    id: 'text',
    label: 'Text',
    icon: Type,
    tools: [
    {
      id: 'text',
      icon: Type,
      label: 'Text Tool'
    }]

  },
  {
    id: 'ai',
    label: 'AI Tools',
    icon: Sparkles,
    tools: [
    {
      id: 'ai-tools',
      icon: Sparkles,
      label: 'AI Tools Panel'
    }]

  }];

  return (
    <div className="w-[200px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto z-10">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Tools
        </h2>
      </div>

      <div className="flex-1 py-2">
        {toolSections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const hasActiveTool = section.tools.some(
            (tool) => tool.id === activeTool
          );
          return (
            <div key={section.id} className="mb-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${hasActiveTool ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>

                <div className="flex items-center space-x-2">
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </div>
                {isExpanded ?
                <ChevronDown className="w-4 h-4" /> :

                <ChevronRight className="w-4 h-4" />
                }
              </button>

              {/* Section Tools */}
              {isExpanded &&
              <div className="py-1">
                  {section.tools.map((tool) =>
                <button
                  key={tool.id}
                  onClick={() => onToolChange(tool.id)}
                  className={`group relative w-full flex items-center space-x-3 px-6 py-2 transition-all duration-200 ${activeTool === tool.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-l-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 border-l-2 border-transparent'}`}
                  title={tool.label}>

                      <tool.icon
                    className={`w-4 h-4 ${activeTool === tool.id ? 'stroke-2' : 'stroke-[1.5]'}`} />

                      <span className="text-sm">{tool.label}</span>
                    </button>
                )}
                </div>
              }
            </div>);

        })}
      </div>
    </div>);

};