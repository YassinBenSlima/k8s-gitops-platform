import React from 'react';
import { ArrowLeft, Undo2, Redo2, Save, Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface EditorTopBarProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onClose: () => void;
}
export const EditorTopBar: React.FC<EditorTopBarProps> = ({
  onUndo,
  onRedo,
  onSave,
  onExport,
  canUndo,
  canRedo,
  onClose
}) => {
  return (
    <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-20">
      <div className="flex items-center space-x-4">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">

          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Image Editor
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Editing Patient Photo
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mr-4">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded-md transition-colors ${canUndo ? 'hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm' : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}
            title="Undo (Ctrl+Z)">

            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded-md transition-colors ${canRedo ? 'hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm' : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}
            title="Redo (Ctrl+Y)">

            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">

          <Download className="w-4 h-4 mr-2" />
          Export
        </button>

        <button
          onClick={onSave}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">

          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>);

};