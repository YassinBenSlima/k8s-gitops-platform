import React, { useEffect, useState, useRef } from 'react';
import { GridIcon, CheckIcon, XIcon, RefreshCwIcon } from 'lucide-react';
interface Point {
  x: number;
  y: number;
}
interface WarpMesh {
  rows: number;
  cols: number;
  points: Point[][];
}
interface WarpToolProps {
  onApply: (mesh: WarpMesh) => void;
  onCancel: () => void;
  width: number;
  height: number;
}
export function WarpTool({ onApply, onCancel, width, height }: WarpToolProps) {
  const [gridSize, setGridSize] = useState({
    rows: 3,
    cols: 3
  });
  const [mesh, setMesh] = useState<WarpMesh | null>(null);
  const [activePoint, setActivePoint] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Initialize mesh
  useEffect(() => {
    const points: Point[][] = [];
    for (let r = 0; r <= gridSize.rows; r++) {
      points[r] = [];
      for (let c = 0; c <= gridSize.cols; c++) {
        points[r][c] = {
          x: c / gridSize.cols * width,
          y: r / gridSize.rows * height
        };
      }
    }
    setMesh({
      rows: gridSize.rows,
      cols: gridSize.cols,
      points
    });
  }, [gridSize, width, height]);
  const handleMouseDown = (r: number, c: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePoint({
      r,
      c
    });
    setIsDragging(true);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !activePoint || !mesh) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...mesh.points];
    newPoints[activePoint.r] = [...newPoints[activePoint.r]];
    newPoints[activePoint.r][activePoint.c] = {
      x,
      y
    };
    setMesh({
      ...mesh,
      points: newPoints
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setActivePoint(null);
  };
  const resetMesh = () => {
    const points: Point[][] = [];
    for (let r = 0; r <= gridSize.rows; r++) {
      points[r] = [];
      for (let c = 0; c <= gridSize.cols; c++) {
        points[r][c] = {
          x: c / gridSize.cols * width,
          y: r / gridSize.rows * height
        };
      }
    }
    setMesh({
      rows: gridSize.rows,
      cols: gridSize.cols,
      points
    });
  };
  if (!mesh) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-lg p-2 flex items-center gap-3 pointer-events-auto shadow-xl">
        <div className="flex items-center gap-2">
          <GridIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-200">Warp</span>
        </div>

        <div className="w-px h-6 bg-gray-700" />

        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-400">Grid:</label>
          <select
            value={`${gridSize.rows}x${gridSize.cols}`}
            onChange={(e) => {
              const [rows, cols] = e.target.value.split('x').map(Number);
              setGridSize({
                rows,
                cols
              });
            }}
            className="bg-gray-800 border border-gray-600 rounded text-xs text-gray-200 px-2 py-1">

            <option value="2x2">2x2</option>
            <option value="3x3">3x3</option>
            <option value="4x4">4x4</option>
            <option value="5x5">5x5</option>
          </select>
        </div>

        <button
          onClick={resetMesh}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
          title="Reset">

          <RefreshCwIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-700" />

        <button
          onClick={onCancel}
          className="p-1.5 text-red-400 hover:bg-red-900/30 rounded"
          title="Cancel">

          <XIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onApply(mesh)}
          className="p-1.5 text-green-400 hover:bg-green-900/30 rounded"
          title="Apply">

          <CheckIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Warp Grid */}
      <div
        className="relative pointer-events-auto cursor-crosshair"
        style={{
          width,
          height
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>

        <svg className="absolute inset-0 w-full h-full overflow-visible">
          {/* Draw Grid Lines */}
          {/* Horizontal Lines */}
          {mesh.points.map((row, r) =>
          <path
            key={`h-${r}`}
            d={`M ${row.map((p) => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1" />

          )}

          {/* Vertical Lines */}
          {Array.from({
            length: mesh.cols + 1
          }).map((_, c) =>
          <path
            key={`v-${c}`}
            d={`M ${mesh.points.map((row) => `${row[c].x},${row[c].y}`).join(' L ')}`}
            fill="none"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1" />

          )}

          {/* Control Points */}
          {mesh.points.map((row, r) =>
          row.map((point, c) =>
          <circle
            key={`${r}-${c}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={
            activePoint?.r === r && activePoint?.c === c ?
            '#3b82f6' :
            'white'
            }
            stroke="#3b82f6"
            strokeWidth="2"
            className="cursor-move hover:r-6 transition-all"
            onMouseDown={(e) => handleMouseDown(r, c, e as any)} />

          )
          )}
        </svg>
      </div>
    </div>);

}