import React, { useEffect, useState, useRef } from 'react';
import { PaintBucketIcon, RefreshCwIcon } from 'lucide-react';
export interface GradientStop {
  offset: number;
  color: string;
}
export interface GradientSettings {
  type: 'linear' | 'radial' | 'angle' | 'reflected' | 'diamond';
  stops: GradientStop[];
  angle: number;
  opacity: number;
  blendMode: string;
  reverse: boolean;
  dither: boolean;
}
interface GradientToolProps {
  settings: GradientSettings;
  onSettingsChange: (settings: GradientSettings) => void;
}
export function GradientTool({
  settings,
  onSettingsChange
}: GradientToolProps) {
  const [activeStopIndex, setActiveStopIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Draw gradient preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    // Clear
    ctx.clearRect(0, 0, width, height);
    // Draw checkerboard
    const checkSize = 8;
    for (let y = 0; y < height; y += checkSize) {
      for (let x = 0; x < width; x += checkSize) {
        ctx.fillStyle = (x + y) / checkSize % 2 === 0 ? '#2a2a2a' : '#3a3a3a';
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    // Sort stops by offset
    const sortedStops = [...settings.stops].sort((a, b) => a.offset - b.offset);
    sortedStops.forEach((stop) => {
      gradient.addColorStop(stop.offset, stop.color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, [settings.stops]);
  const updateSetting = <K extends keyof GradientSettings,>(
  key: K,
  value: GradientSettings[K]) =>
  {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };
  const addStop = (offset: number) => {
    // Find colors at this offset
    const sortedStops = [...settings.stops].sort((a, b) => a.offset - b.offset);
    let color = '#ffffff';
    for (let i = 0; i < sortedStops.length - 1; i++) {
      if (
      offset >= sortedStops[i].offset &&
      offset <= sortedStops[i + 1].offset)
      {
        // Simple interpolation (could be better)
        color = sortedStops[i].color;
        break;
      }
    }
    const newStop = {
      offset,
      color
    };
    const newStops = [...settings.stops, newStop].sort(
      (a, b) => a.offset - b.offset
    );
    updateSetting('stops', newStops);
    setActiveStopIndex(newStops.findIndex((s) => s === newStop));
  };
  const removeStop = (index: number) => {
    if (settings.stops.length <= 2) return;
    const newStops = settings.stops.filter((_, i) => i !== index);
    updateSetting('stops', newStops);
    setActiveStopIndex(null);
  };
  const updateStop = (index: number, updates: Partial<GradientStop>) => {
    const newStops = [...settings.stops];
    newStops[index] = {
      ...newStops[index],
      ...updates
    };
    updateSetting('stops', newStops);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <PaintBucketIcon className="w-4 h-4" />
        <span>Gradient</span>
      </div>

      {/* Gradient Preview / Editor */}
      <div className="relative h-12 rounded-lg overflow-hidden cursor-crosshair group">
        <canvas
          ref={canvasRef}
          width={300}
          height={48}
          className="w-full h-full"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offset = (e.clientX - rect.left) / rect.width;
            addStop(offset);
          }} />


        {/* Stops */}
        {settings.stops.map((stop, index) =>
        <div
          key={index}
          className={`absolute bottom-0 w-4 h-4 -ml-2 border-2 border-white rounded-full cursor-pointer shadow-md transform translate-y-1/2 ${activeStopIndex === index ? 'scale-125 z-10' : 'z-0'}`}
          style={{
            left: `${stop.offset * 100}%`,
            backgroundColor: stop.color
          }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveStopIndex(index);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            removeStop(index);
          }} />

        )}
      </div>

      {/* Active Stop Controls */}
      {activeStopIndex !== null &&
      <div className="p-3 bg-gray-800 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Selected Stop</span>
            <button
            onClick={() => removeStop(activeStopIndex)}
            className="text-xs text-red-400 hover:text-red-300"
            disabled={settings.stops.length <= 2}>

              Remove
            </button>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Color</label>
              <div className="flex items-center gap-2">
                <input
                type="color"
                value={settings.stops[activeStopIndex].color}
                onChange={(e) =>
                updateStop(activeStopIndex, {
                  color: e.target.value
                })
                }
                className="w-8 h-8 rounded border border-gray-600 cursor-pointer" />

                <input
                type="text"
                value={settings.stops[activeStopIndex].color}
                onChange={(e) =>
                updateStop(activeStopIndex, {
                  color: e.target.value
                })
                }
                className="flex-1 px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-gray-200" />

              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">
                Location
              </label>
              <div className="flex items-center gap-2">
                <input
                type="number"
                min="0"
                max="100"
                value={Math.round(
                  settings.stops[activeStopIndex].offset * 100
                )}
                onChange={(e) =>
                updateStop(activeStopIndex, {
                  offset: Number(e.target.value) / 100
                })
                }
                className="w-full px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-gray-200" />

                <span className="text-xs text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Type Selection */}
      <div className="grid grid-cols-5 gap-1">
        {(['linear', 'radial', 'angle', 'reflected', 'diamond'] as const).map(
          (type) =>
          <button
            key={type}
            onClick={() => updateSetting('type', type)}
            className={`p-2 rounded transition-colors ${settings.type === type ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            title={type.charAt(0).toUpperCase() + type.slice(1)}>

              <div
              className={`w-4 h-4 bg-current rounded-sm ${type === 'radial' ? 'rounded-full' : ''}`} />

            </button>

        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Reverse</label>
          <input
            type="checkbox"
            checked={settings.reverse}
            onChange={(e) => updateSetting('reverse', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400">Dither</label>
          <input
            type="checkbox"
            checked={settings.dither}
            onChange={(e) => updateSetting('dither', e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />

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
    </div>);

}