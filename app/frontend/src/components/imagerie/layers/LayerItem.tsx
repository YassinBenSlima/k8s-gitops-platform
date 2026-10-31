import React, { useEffect, useState, useRef } from 'react';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UnlockIcon,
  GripVerticalIcon,
  Trash2Icon,
  CopyIcon,
  MoreVerticalIcon } from
'lucide-react';
import { Layer } from '../utils/layerOperations';
import { BlendModeSelector } from './BlendModeSelector';
import { BlendMode } from '../utils/blendModes';
interface LayerItemProps {
  layer: Layer;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (addToSelection?: boolean) => void;
  onVisibilityToggle: () => void;
  onLockToggle: () => void;
  onOpacityChange: (opacity: number) => void;
  onBlendModeChange: (mode: BlendMode) => void;
  onRename: (name: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging?: boolean;
}
export function LayerItem({
  layer,
  isActive,
  isSelected,
  onSelect,
  onVisibilityToggle,
  onLockToggle,
  onOpacityChange,
  onBlendModeChange,
  onRename,
  onDuplicate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging
}: LayerItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(layer.name);
  const [showMenu, setShowMenu] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleNameSubmit = () => {
    if (editName.trim() && editName !== layer.name) {
      onRename(editName.trim());
    } else {
      setEditName(layer.name);
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditName(layer.name);
      setIsEditing(false);
    }
  };
  return (
    <div
      className={`
        group relative flex items-center gap-2 p-2 rounded-lg transition-all duration-150
        ${isActive ? 'bg-blue-600/20 ring-1 ring-blue-500' : ''}
        ${isSelected && !isActive ? 'bg-gray-700/50' : ''}
        ${!isActive && !isSelected ? 'hover:bg-gray-800/50' : ''}
        ${isDragging ? 'opacity-50' : ''}
        ${layer.locked ? 'opacity-75' : ''}
      `}
      onClick={(e) => onSelect(e.shiftKey || e.ctrlKey || e.metaKey)}
      draggable={!layer.locked}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}>

      {/* Drag Handle */}
      <div
        className="cursor-grab opacity-0 group-hover:opacity-50 hover:opacity-100 transition-opacity"
        onMouseDown={(e) => e.stopPropagation()}>

        <GripVerticalIcon className="w-4 h-4 text-gray-500" />
      </div>

      {/* Visibility Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVisibilityToggle();
        }}
        className={`p-1 rounded transition-colors ${layer.visible ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-400 hover:bg-gray-700'}`}
        title={layer.visible ? 'Hide layer' : 'Show layer'}>

        {layer.visible ?
        <EyeIcon className="w-4 h-4" /> :

        <EyeOffIcon className="w-4 h-4" />
        }
      </button>

      {/* Thumbnail */}
      <div className="w-10 h-10 rounded border border-gray-700 overflow-hidden flex-shrink-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC')] bg-repeat">
        {layer.thumbnail &&
        <img
          src={layer.thumbnail}
          alt={layer.name}
          className="w-full h-full object-contain" />

        }
      </div>

      {/* Layer Info */}
      <div className="flex-1 min-w-0">
        {isEditing ?
        <input
          ref={inputRef}
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleNameSubmit}
          onKeyDown={handleKeyDown}
          className="w-full px-1 py-0.5 text-sm bg-gray-900 border border-blue-500 rounded text-white focus:outline-none"
          onClick={(e) => e.stopPropagation()} /> :


        <div
          className="text-sm text-gray-200 truncate cursor-text"
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (!layer.locked) setIsEditing(true);
          }}>

            {layer.name}
          </div>
        }

        {/* Opacity slider on hover */}
        {showOpacity &&
        <div className="flex items-center gap-2 mt-1">
            <input
            type="range"
            min="0"
            max="100"
            value={layer.opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

            <span className="text-xs text-gray-400 w-8">{layer.opacity}%</span>
          </div>
        }
      </div>

      {/* Lock Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLockToggle();
        }}
        className={`p-1 rounded transition-colors ${layer.locked ? 'text-yellow-500 hover:text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-400 hover:bg-gray-700 opacity-0 group-hover:opacity-100'}`}
        title={layer.locked ? 'Unlock layer' : 'Lock layer'}>

        {layer.locked ?
        <LockIcon className="w-4 h-4" /> :

        <UnlockIcon className="w-4 h-4" />
        }
      </button>

      {/* More Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 rounded text-gray-500 hover:text-gray-300 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">

          <MoreVerticalIcon className="w-4 h-4" />
        </button>

        {showMenu &&
        <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
            <button
            onClick={(e) => {
              e.stopPropagation();
              setShowOpacity(!showOpacity);
              setShowMenu(false);
            }}
            className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2">

              Opacity: {layer.opacity}%
            </button>

            <div className="px-3 py-2 border-t border-gray-700">
              <div className="text-xs text-gray-500 mb-1">Blend Mode</div>
              <BlendModeSelector
              value={layer.blendMode}
              onChange={(mode) => {
                onBlendModeChange(mode);
                setShowMenu(false);
              }}
              disabled={layer.locked} />

            </div>

            <div className="border-t border-gray-700 mt-1 pt-1">
              <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2">

                <CopyIcon className="w-4 h-4" />
                Duplicate
              </button>

              <button
              onClick={(e) => {
                e.stopPropagation();
                if (!layer.locked) setIsEditing(true);
                setShowMenu(false);
              }}
              disabled={layer.locked}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 disabled:opacity-50">

                Rename
              </button>

              <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2">

                <Trash2Icon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}