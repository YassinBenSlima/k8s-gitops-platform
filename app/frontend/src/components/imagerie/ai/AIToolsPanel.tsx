import React, { useState } from 'react';
import {
  SparklesIcon,
  Wand2Icon,
  ImagePlusIcon,
  ScissorsIcon,
  UserIcon,
  CloudIcon,
  EraserIcon } from
'lucide-react';
export type AIToolType =
'remove-bg' |
'remove-object' |
'upscale' |
'colorize' |
'style' |
'face' |
'sky' |
'denoise';
interface AIToolsPanelProps {
  onApplyTool: (tool: AIToolType, options?: any) => Promise<void>;
  isProcessing: boolean;
}
export function AIToolsPanel({ onApplyTool, isProcessing }: AIToolsPanelProps) {
  const [activeTool, setActiveTool] = useState<AIToolType | null>(null);
  const tools: {
    id: AIToolType;
    icon: React.ElementType;
    label: string;
    description: string;
  }[] = [
  {
    id: 'remove-bg',
    icon: ScissorsIcon,
    label: 'Remove Background',
    description: 'Automatically isolate the subject from the background.'
  },
  {
    id: 'remove-object',
    icon: EraserIcon,
    label: 'Magic Eraser',
    description: 'Remove unwanted objects with content-aware fill.'
  },
  {
    id: 'upscale',
    icon: ImagePlusIcon,
    label: 'Smart Upscale',
    description: 'Enlarge images up to 4x without losing quality.'
  },
  {
    id: 'colorize',
    icon: Wand2Icon,
    label: 'Auto Colorize',
    description: 'Add natural colors to black and white photos.'
  },
  {
    id: 'face',
    icon: UserIcon,
    label: 'Face Enhance',
    description: 'Retouch portraits and improve facial details.'
  },
  {
    id: 'sky',
    icon: CloudIcon,
    label: 'Sky Replacement',
    description: 'Replace dull skies with dramatic clouds or sunsets.'
  },
  {
    id: 'denoise',
    icon: SparklesIcon,
    label: 'Denoise',
    description: 'Remove grain and noise from low-light photos.'
  }];

  const handleApply = async () => {
    if (activeTool) {
      await onApplyTool(activeTool);
      setActiveTool(null);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <SparklesIcon className="w-4 h-4 text-purple-400" />
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
          AI Magic Tools
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {tools.map((tool) =>
        <button
          key={tool.id}
          onClick={() => setActiveTool(tool.id)}
          className={`relative flex items-start gap-3 p-3 rounded-xl transition-all border ${activeTool === tool.id ? 'bg-purple-900/20 border-purple-500/50 ring-1 ring-purple-500/50' : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'}`}>

            <div
            className={`p-2 rounded-lg ${activeTool === tool.id ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-700 text-gray-400'}`}>

              <tool.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div
              className={`text-sm font-medium ${activeTool === tool.id ? 'text-purple-200' : 'text-gray-200'}`}>

                {tool.label}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {tool.description}
              </div>
            </div>

            {activeTool === tool.id &&
          <div className="absolute inset-0 rounded-xl ring-2 ring-purple-500 pointer-events-none animate-pulse opacity-20" />
          }
          </button>
        )}
      </div>

      {activeTool &&
      <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 space-y-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <h4 className="text-sm font-medium text-gray-200">
            {tools.find((t) => t.id === activeTool)?.label}
          </h4>

          {/* Tool specific options could go here */}

          <div className="flex gap-2 pt-2">
            <button
            onClick={() => setActiveTool(null)}
            className="flex-1 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors">

              Cancel
            </button>
            <button
            onClick={handleApply}
            disabled={isProcessing}
            className="flex-1 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all font-medium shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

              {isProcessing ?
            <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </> :

            <>
                  <SparklesIcon className="w-4 h-4" />
                  Generate
                </>
            }
            </button>
          </div>
        </div>
      }
    </div>);

}