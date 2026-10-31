import React from 'react';
import {
  PlusIcon,
  CopyIcon,
  Trash2Icon,
  FolderPlusIcon,
  MergeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpIcon,
  ChevronsDownIcon,
  LayersIcon } from
'lucide-react';
interface LayerControlsProps {
  hasActiveLayer: boolean;
  hasMultipleSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isLocked: boolean;
  onNewLayer: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onCreateGroup: () => void;
  onMergeSelected: () => void;
  onMergeDown: () => void;
  onFlatten: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveToTop: () => void;
  onMoveToBottom: () => void;
}
export function LayerControls({
  hasActiveLayer,
  hasMultipleSelected,
  canMoveUp,
  canMoveDown,
  isLocked,
  onNewLayer,
  onDuplicate,
  onDelete,
  onCreateGroup,
  onMergeSelected,
  onMergeDown,
  onFlatten,
  onMoveUp,
  onMoveDown,
  onMoveToTop,
  onMoveToBottom
}: LayerControlsProps) {
  const buttonClass = (disabled: boolean) => `
    p-1.5 rounded transition-colors
    ${disabled ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-gray-700'}
  `;
  return (
    <div className="flex items-center justify-between px-2 py-2 border-t border-gray-800 bg-gray-900/50">
      {/* Primary Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={onNewLayer}
          className={buttonClass(false)}
          title="New Layer (Ctrl+Shift+N)">

          <PlusIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onDuplicate}
          disabled={!hasActiveLayer}
          className={buttonClass(!hasActiveLayer)}
          title="Duplicate Layer (Ctrl+J)">

          <CopyIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onCreateGroup}
          disabled={!hasActiveLayer}
          className={buttonClass(!hasActiveLayer)}
          title="Create Group (Ctrl+G)">

          <FolderPlusIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-gray-700 mx-1" />

        <button
          onClick={onMergeSelected}
          disabled={!hasMultipleSelected}
          className={buttonClass(!hasMultipleSelected)}
          title="Merge Selected (Ctrl+E)">

          <MergeIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onFlatten}
          disabled={!hasActiveLayer}
          className={buttonClass(!hasActiveLayer)}
          title="Flatten Image (Ctrl+Shift+E)">

          <LayersIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Layer Order */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onMoveToTop}
          disabled={!canMoveUp || isLocked}
          className={buttonClass(!canMoveUp || isLocked)}
          title="Move to Top">

          <ChevronsUpIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onMoveUp}
          disabled={!canMoveUp || isLocked}
          className={buttonClass(!canMoveUp || isLocked)}
          title="Move Up">

          <ChevronUpIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onMoveDown}
          disabled={!canMoveDown || isLocked}
          className={buttonClass(!canMoveDown || isLocked)}
          title="Move Down">

          <ChevronDownIcon className="w-4 h-4" />
        </button>

        <button
          onClick={onMoveToBottom}
          disabled={!canMoveDown || isLocked}
          className={buttonClass(!canMoveDown || isLocked)}
          title="Move to Bottom">

          <ChevronsDownIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-gray-700 mx-1" />

        <button
          onClick={onDelete}
          disabled={!hasActiveLayer || isLocked}
          className={`
            p-1.5 rounded transition-colors
            ${!hasActiveLayer || isLocked ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-red-400 hover:bg-gray-700'}
          `}
          title="Delete Layer (Delete)">

          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>);

}