import React, { useCallback, useEffect, useState, useRef } from 'react';
import { BrushIcon, CircleIcon, SquareIcon, SparklesIcon } from 'lucide-react';
export interface BrushSettings {
  size: number;
  hardness: number;
  opacity: number;
  flow: number;
  spacing: number;
  shape: 'round' | 'square' | 'custom';
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay';
  smoothing: number;
  pressureSensitivity: boolean;
}
interface BrushToolProps {
  settings: BrushSettings;
  onSettingsChange: (settings: BrushSettings) => void;
  color: string;
  onColorChange: (color: string) => void;
}
export function BrushTool({
  settings,
  onSettingsChange,
  color,
  onColorChange
}: BrushToolProps) {
  const [showPresets, setShowPresets] = useState(false);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const presets: {
    name: string;
    settings: Partial<BrushSettings>;
  }[] = [
  {
    name: 'Soft Round',
    settings: {
      size: 20,
      hardness: 0,
      shape: 'round'
    }
  },
  {
    name: 'Hard Round',
    settings: {
      size: 10,
      hardness: 100,
      shape: 'round'
    }
  },
  {
    name: 'Airbrush',
    settings: {
      size: 50,
      hardness: 0,
      opacity: 30,
      flow: 20
    }
  },
  {
    name: 'Pencil',
    settings: {
      size: 3,
      hardness: 100,
      opacity: 100
    }
  },
  {
    name: 'Marker',
    settings: {
      size: 15,
      hardness: 80,
      opacity: 80
    }
  },
  {
    name: 'Watercolor',
    settings: {
      size: 30,
      hardness: 20,
      opacity: 50,
      flow: 30
    }
  }];

  // Draw brush preview
  useEffect(() => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const size = canvas.width;
    const center = size / 2;
    // Clear
    ctx.clearRect(0, 0, size, size);
    // Draw checkerboard background
    const checkSize = 8;
    for (let y = 0; y < size; y += checkSize) {
      for (let x = 0; x < size; x += checkSize) {
        ctx.fillStyle = (x + y) / checkSize % 2 === 0 ? '#2a2a2a' : '#3a3a3a';
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }
    // Draw brush preview
    const brushRadius = Math.min(settings.size / 2, center - 5);
    if (settings.shape === 'round') {
      // Create radial gradient for hardness
      const gradient = ctx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        brushRadius
      );
      const hardnessPoint = settings.hardness / 100;
      gradient.addColorStop(0, color);
      gradient.addColorStop(hardnessPoint, color);
      gradient.addColorStop(1, color + '00');
      ctx.globalAlpha = settings.opacity / 100;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(center, center, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    } else if (settings.shape === 'square') {
      ctx.globalAlpha = settings.opacity / 100;
      ctx.fillStyle = color;
      ctx.fillRect(
        center - brushRadius,
        center - brushRadius,
        brushRadius * 2,
        brushRadius * 2
      );
    }
    ctx.globalAlpha = 1;
  }, [settings, color]);
  const updateSetting = useCallback(
    <K extends keyof BrushSettings,>(key: K, value: BrushSettings[K]) => {
      onSettingsChange({
        ...settings,
        [key]: value
      });
    },
    [settings, onSettingsChange]
  );
  const applyPreset = useCallback(
    (preset: Partial<BrushSettings>) => {
      onSettingsChange({
        ...settings,
        ...preset
      });
      setShowPresets(false);
    },
    [settings, onSettingsChange]
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
          <BrushIcon className="w-4 h-4" />
          <span>Brush</span>
        </div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="text-xs text-blue-400 hover:text-blue-300">

          Presets
        </button>
      </div>

      {/* Presets Dropdown */}
      {showPresets &&
      <div className="grid grid-cols-2 gap-2 p-2 bg-gray-800 rounded-lg">
          {presets.map((preset) =>
        <button
          key={preset.name}
          onClick={() => applyPreset(preset.settings)}
          className="px-3 py-2 text-xs text-left text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition-colors">

              {preset.name}
            </button>
        )}
        </div>
      }

      {/* Brush Preview */}
      <div className="flex items-center gap-3">
        <canvas
          ref={previewRef}
          width={64}
          height={64}
          className="rounded-lg border border-gray-700" />


        <div className="flex-1 space-y-1">
          <div className="text-xs text-gray-400">Preview</div>
          <div className="text-sm text-gray-200">{settings.size}px</div>
        </div>

        {/* Color Picker */}
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer" />

        </div>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Size</span>
          <span className="text-gray-300">{settings.size}px</span>
        </div>
        <input
          type="range"
          min="1"
          max="500"
          value={settings.size}
          onChange={(e) => updateSetting('size', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

      </div>

      {/* Hardness */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Hardness</span>
          <span className="text-gray-300">{settings.hardness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.hardness}
          onChange={(e) => updateSetting('hardness', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

      </div>

      {/* Opacity */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Opacity</span>
          <span className="text" />
        </div>
      </div>
    </div>);

}