import React, { useEffect, useState, useRef } from 'react';
import {
  MoveIcon,
  RotateCwIcon,
  MaximizeIcon,
  CheckIcon,
  XIcon } from
'lucide-react';
export interface TransformState {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  skewX: number;
  skewY: number;
}
interface FreeTransformProps {
  initialTransform: TransformState;
  onApply: (transform: TransformState) => void;
  onCancel: () => void;
  width: number;
  height: number;
}
export function FreeTransform({
  initialTransform,
  onApply,
  onCancel,
  width,
  height
}: FreeTransformProps) {
  const [transform, setTransform] = useState<TransformState>(initialTransform);
  const [mode, setMode] = useState<'scale' | 'rotate' | 'skew' | 'perspective'>(
    'scale'
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Handles configuration
  const handles = [
  {
    id: 'tl',
    x: 0,
    y: 0,
    cursor: 'nw-resize'
  },
  {
    id: 'tm',
    x: 0.5,
    y: 0,
    cursor: 'n-resize'
  },
  {
    id: 'tr',
    x: 1,
    y: 0,
    cursor: 'ne-resize'
  },
  {
    id: 'mr',
    x: 1,
    y: 0.5,
    cursor: 'e-resize'
  },
  {
    id: 'br',
    x: 1,
    y: 1,
    cursor: 'se-resize'
  },
  {
    id: 'bm',
    x: 0.5,
    y: 1,
    cursor: 's-resize'
  },
  {
    id: 'bl',
    x: 0,
    y: 1,
    cursor: 'sw-resize'
  },
  {
    id: 'ml',
    x: 0,
    y: 0.5,
    cursor: 'w-resize'
  },
  {
    id: 'rot',
    x: 0.5,
    y: -0.2,
    cursor: 'grab'
  } // Rotation handle
  ];
  const updateTransform = (updates: Partial<TransformState>) => {
    setTransform((prev) => ({
      ...prev,
      ...updates
    }));
  };
  const reset = () => {
    setTransform(initialTransform);
  };
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Transform Controls Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-lg p-2 flex items-center gap-2 pointer-events-auto shadow-xl">
        <div className="flex bg-gray-800 rounded-md p-1">
          <button
            onClick={() => setMode('scale')}
            className={`p-1.5 rounded ${mode === 'scale' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            title="Scale">

            <MaximizeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('rotate')}
            className={`p-1.5 rounded ${mode === 'rotate' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            title="Rotate">

            <RotateCwIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('skew')}
            className={`p-1.5 rounded ${mode === 'skew' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            title="Skew">

            <MoveIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span>X: {Math.round(transform.x)}</span>
              <span>Y: {Math.round(transform.y)}</span>
            </div>
            <div className="flex gap-2">
              <span>W: {Math.round(width * transform.scaleX)}%</span>
              <span>H: {Math.round(height * transform.scaleY)}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 pl-2 border-l border-gray-700">
            <span>R: {Math.round(transform.rotation)}°</span>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        <button
          onClick={onCancel}
          className="p-1.5 text-red-400 hover:bg-red-900/30 rounded"
          title="Cancel">

          <XIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onApply(transform)}
          className="p-1.5 text-green-400 hover:bg-green-900/30 rounded"
          title="Apply">

          <CheckIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Transform Box */}
      <div
        ref={containerRef}
        className="absolute border-2 border-blue-500 pointer-events-auto"
        style={{
          left: '50%',
          top: '50%',
          width: width,
          height: height,
          transform: `
            translate(-50%, -50%)
            translate(${transform.x}px, ${transform.y}px)
            rotate(${transform.rotation}deg)
            scale(${transform.scaleX}, ${transform.scaleY})
            skew(${transform.skewX}deg, ${transform.skewY}deg)
          `,
          transformOrigin: 'center'
        }}>

        {/* Handles */}
        {handles.map((handle) =>
        <div
          key={handle.id}
          className={`absolute w-3 h-3 bg-white border border-blue-500 rounded-full hover:scale-125 transition-transform z-10 ${handle.id === 'rot' ? 'top-[-20px] left-1/2 -translate-x-1/2 bg-blue-500' : ''}`}
          style={{
            left: handle.id !== 'rot' ? `${handle.x * 100}%` : undefined,
            top: handle.id !== 'rot' ? `${handle.y * 100}%` : undefined,
            transform: 'translate(-50%, -50%)',
            cursor: handle.cursor
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setActiveHandle(handle.id);
            setIsDragging(true);
            setDragStart({
              x: e.clientX,
              y: e.clientY
            });
          }} />

        )}

        {/* Center Pivot */}
        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>);

}