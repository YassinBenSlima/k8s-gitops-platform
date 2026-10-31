import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { ImageTransform } from '../utils/imageProcessing';
interface ZoomToolProps {
  transform: ImageTransform;
  onChange: (key: keyof ImageTransform, value: any) => void;
}
export const ZoomTool: React.FC<ZoomToolProps> = ({ transform, onChange }) => {
  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.1, Math.min(5, transform.zoom + delta));
    onChange('zoom', newZoom);
  };
  const handleReset = () => {
    onChange('zoom', 1);
    onChange('offsetX', 0);
    onChange('offsetY', 0);
  };
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
      <button
        onClick={() => handleZoom(-0.1)}
        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        title="Zoom Out">

        <ZoomOut className="w-4 h-4" />
      </button>

      <span className="text-xs font-medium w-12 text-center text-gray-700 dark:text-gray-300">
        {Math.round(transform.zoom * 100)}%
      </span>

      <button
        onClick={() => handleZoom(0.1)}
        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        title="Zoom In">

        <ZoomIn className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1" />

      <button
        onClick={handleReset}
        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        title="Fit to Screen">

        <Maximize className="w-4 h-4" />
      </button>
    </div>);

};