import React, { useCallback, useState } from 'react';
import {
  LayersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon } from
'lucide-react';
import { Layer } from '../utils/layerOperations';
import { BlendMode } from '../utils/blendModes';
import { LayerItem } from './LayerItem';
import { LayerControls } from './LayerControls';
import { BlendModeSelector } from './BlendModeSelector';
interface LayerPanelProps {
  layers: Layer[];
  activeLayerId: string | null;
  selectedLayerIds: string[];
  onSelectLayer: (layerId: string, addToSelection?: boolean) => void;
  onSetActiveLayer: (layerId: string | null) => void;
  onVisibilityToggle: (layerId: string) => void;
  onLockToggle: (layerId: string) => void;
  onOpacityChange: (layerId: string, opacity: number) => void;
  onBlendModeChange: (layerId: string, mode: BlendMode) => void;
  onRename: (layerId: string, name: string) => void;
  onDuplicate: (layerId: string) => void;
  onDelete: (layerId: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onNewLayer: () => void;
  onCreateGroup: () => void;
  onMergeSelected: () => void;
  onMergeDown: (layerId: string) => void;
  onFlatten: () => void;
  onMoveUp: (layerId: string) => void;
  onMoveDown: (layerId: string) => void;
  onMoveToTop: (layerId: string) => void;
  onMoveToBottom: (layerId: string) => void;
}
export function LayerPanel({
  layers,
  activeLayerId,
  selectedLayerIds,
  onSelectLayer,
  onSetActiveLayer,
  onVisibilityToggle,
  onLockToggle,
  onOpacityChange,
  onBlendModeChange,
  onRename,
  onDuplicate,
  onDelete,
  onReorder,
  onNewLayer,
  onCreateGroup,
  onMergeSelected,
  onMergeDown,
  onFlatten,
  onMoveUp,
  onMoveDown,
  onMoveToTop,
  onMoveToBottom
}: LayerPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const activeLayer = layers.find((l) => l.id === activeLayerId);
  const activeIndex = activeLayerId ?
  layers.findIndex((l) => l.id === activeLayerId) :
  -1;
  const filteredLayers = searchQuery ?
  layers.filter((l) =>
  l.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) :
  layers;
  const handleDragStart = useCallback(
    (index: number) => (e: React.DragEvent) => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    },
    []
  );
  const handleDragOver = useCallback(
    (index: number) => (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverIndex(index);
    },
    []
  );
  const handleDrop = useCallback(
    (toIndex: number) => (e: React.DragEvent) => {
      e.preventDefault();
      const fromIndex = draggedIndex;
      if (fromIndex !== null && fromIndex !== toIndex) {
        onReorder(fromIndex, toIndex);
      }
      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [draggedIndex, onReorder]
  );
  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);
  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white transition-colors">

          {isCollapsed ?
          <ChevronRightIcon className="w-4 h-4" /> :

          <ChevronDownIcon className="w-4 h-4" />
          }
          <LayersIcon className="w-4 h-4" />
          <span>Layers</span>
          <span className="text-xs text-gray-500">({layers.length})</span>
        </button>
      </div>

      {!isCollapsed &&
      <>
          {/* Active Layer Quick Controls */}
          {activeLayer &&
        <div className="px-3 py-2 border-b border-gray-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16">Opacity</span>
                <input
              type="range"
              min="0"
              max="100"
              value={activeLayer.opacity}
              onChange={(e) =>
              onOpacityChange(activeLayer.id, Number(e.target.value))
              }
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

                <span className="text-xs text-gray-400 w-8 text-right">
                  {activeLayer.opacity}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16">Blend</span>
                <div className="flex-1">
                  <BlendModeSelector
                value={activeLayer.blendMode}
                onChange={(mode) => onBlendModeChange(activeLayer.id, mode)}
                disabled={activeLayer.locked} />

                </div>
              </div>
            </div>
        }

          {/* Search */}
          {layers.length > 5 &&
        <div className="px-3 py-2 border-b border-gray-800">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
              type="text"
              placeholder="Search layers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />

              </div>
            </div>
        }

          {/* Layer List */}
          <div
          className="flex-1 overflow-y-auto px-2 py-2 space-y-1"
          onDragEnd={handleDragEnd}>

            {filteredLayers.length === 0 ?
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <LayersIcon className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">No layers</p>
                <button
              onClick={onNewLayer}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300">

                  Create a layer
                </button>
              </div> :

          filteredLayers.map((layer, index) =>
          <div
            key={layer.id}
            className={`
                    ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''}
                  `}>

                  <LayerItem
              layer={layer}
              isActive={layer.id === activeLayerId}
              isSelected={selectedLayerIds.includes(layer.id)}
              onSelect={(addToSelection) =>
              onSelectLayer(layer.id, addToSelection)
              }
              onVisibilityToggle={() => onVisibilityToggle(layer.id)}
              onLockToggle={() => onLockToggle(layer.id)}
              onOpacityChange={(opacity) =>
              onOpacityChange(layer.id, opacity)
              }
              onBlendModeChange={(mode) =>
              onBlendModeChange(layer.id, mode)
              }
              onRename={(name) => onRename(layer.id, name)}
              onDuplicate={() => onDuplicate(layer.id)}
              onDelete={() => onDelete(layer.id)}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
              isDragging={draggedIndex === index} />

                </div>
          )
          }
          </div>

          {/* Controls */}
          <LayerControls
          hasActiveLayer={!!activeLayerId}
          hasMultipleSelected={selectedLayerIds.length > 1}
          canMoveUp={activeIndex > 0}
          canMoveDown={activeIndex < layers.length - 1 && activeIndex !== -1}
          isLocked={activeLayer?.locked || false}
          onNewLayer={onNewLayer}
          onDuplicate={() => activeLayerId && onDuplicate(activeLayerId)}
          onDelete={() => activeLayerId && onDelete(activeLayerId)}
          onCreateGroup={onCreateGroup}
          onMergeSelected={onMergeSelected}
          onMergeDown={() => activeLayerId && onMergeDown(activeLayerId)}
          onFlatten={onFlatten}
          onMoveUp={() => activeLayerId && onMoveUp(activeLayerId)}
          onMoveDown={() => activeLayerId && onMoveDown(activeLayerId)}
          onMoveToTop={() => activeLayerId && onMoveToTop(activeLayerId)}
          onMoveToBottom={() =>
          activeLayerId && onMoveToBottom(activeLayerId)
          } />

        </>
      }
    </div>);

}