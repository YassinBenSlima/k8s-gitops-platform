import React, { useEffect, useState, useRef } from 'react';
import {
  WavesIcon,
  FingerprintIcon,
  MinimizeIcon,
  MaximizeIcon,
  RotateCwIcon } from
'lucide-react';
export type LiquifyMode = 'warp' | 'pucker' | 'bloat' | 'twirl' | 'reconstruct';
interface LiquifyToolProps {
  onApply: () => void;
  onCancel: () => void;
  width: number;
  height: number;
}
export function LiquifyTool({
  onApply,
  onCancel,
  width,
  height
}: LiquifyToolProps) {
  const [mode, setMode] = useState<LiquifyMode>('warp');
  const [brushSize, setBrushSize] = useState(50);
  const [pressure, setPressure] = useState(50);
  const [density, setDensity] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tools: {
    id: LiquifyMode;
    icon: React.ElementType;
    label: string;
  }[] = [
  {
    id: 'warp',
    icon: FingerprintIcon,
    label: 'Forward Warp'
  },
  {
    id: 'pucker',
    icon: MinimizeIcon,
    label: 'Pucker'
  },
  {
    id: 'bloat',
    icon: MaximizeIcon,
    label: 'Bloat'
  },
  {
    id: 'twirl',
    icon: RotateCwIcon,
    label: 'Twirl Clockwise'
  },
  {
    id: 'reconstruct',
    icon: WavesIcon,
    label: 'Reconstruct'
  }];

  return (
    <div className="flex h-full">
      {/* Sidebar Controls */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h3 className="text-sm font-medium text-gray-200 mb-3">
            Liquify Tools
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) =>
            <button
              key={tool.id}
              onClick={() => setMode(tool.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${mode === tool.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>

                <tool.icon className="w-6 h-6 mb-2" />
                <span className="text-xs">{tool.label}</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-200">Brush Options</h3>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Size</span>
              <span className="text-gray-300">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Pressure</span>
              <span className="text-gray-300">{pressure}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Density</span>
              <span className="text-gray-300">{density}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={onApply}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium">

            Apply
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">

            Cancel
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-gray-950 flex items-center justify-center overflow-hidden relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="max-w-full max-h-full object-contain cursor-crosshair shadow-2xl" />


        {/* Brush Cursor */}
        <div
          className="absolute pointer-events-none border border-white rounded-full mix-blend-difference"
          style={{
            width: brushSize,
            height: brushSize,
            // Position would be updated by mouse move
            display: 'none'
          }} />

      </div>
    </div>);

}