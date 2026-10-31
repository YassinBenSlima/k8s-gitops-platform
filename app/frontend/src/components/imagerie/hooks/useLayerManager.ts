import { useState, useCallback, useMemo } from 'react';
import {
  Layer,
  LayerGroup,
  LayerMask,
  createEmptyLayer,
  createLayerFromImage,
  duplicateLayer,
  mergeLayers,
  flattenLayers,
  reorderLayers,
  updateLayerThumbnail,
  generateLayerId } from
'../utils/layerOperations';
import { BlendMode } from '../utils/blendModes';

export interface UseLayerManagerReturn {
  layers: Layer[];
  activeLayerId: string | null;
  selectedLayerIds: string[];
  groups: LayerGroup[];

  // Layer operations
  addLayer: (layer?: Partial<Layer>) => string;
  addLayerFromImage: (
  image: HTMLImageElement | HTMLCanvasElement,
  name?: string)
  => string;
  removeLayer: (layerId: string) => void;
  duplicateLayerById: (layerId: string) => string | null;
  mergeSelectedLayers: () => void;
  mergeDown: (layerId: string) => void;
  flattenAllLayers: () => void;

  // Selection
  setActiveLayer: (layerId: string | null) => void;
  selectLayer: (layerId: string, addToSelection?: boolean) => void;
  selectAllLayers: () => void;
  deselectAllLayers: () => void;

  // Layer properties
  updateLayer: (layerId: string, updates: Partial<Layer>) => void;
  setLayerVisibility: (layerId: string, visible: boolean) => void;
  setLayerLocked: (layerId: string, locked: boolean) => void;
  setLayerOpacity: (layerId: string, opacity: number) => void;
  setLayerBlendMode: (layerId: string, blendMode: BlendMode) => void;
  renameLayer: (layerId: string, name: string) => void;

  // Layer ordering
  moveLayerUp: (layerId: string) => void;
  moveLayerDown: (layerId: string) => void;
  moveLayerToTop: (layerId: string) => void;
  moveLayerToBottom: (layerId: string) => void;
  reorderLayersByIds: (fromIndex: number, toIndex: number) => void;

  // Groups
  createGroup: (name?: string, layerIds?: string[]) => string;
  ungroupLayers: (groupId: string) => void;
  addLayerToGroup: (layerId: string, groupId: string) => void;
  removeLayerFromGroup: (layerId: string) => void;

  // Masks
  addMask: (layerId: string, mask?: LayerMask) => void;
  removeMask: (layerId: string) => void;
  toggleMask: (layerId: string) => void;

  // Layer data
  updateLayerImageData: (layerId: string, imageData: ImageData) => void;
  getActiveLayer: () => Layer | null;
  getLayerById: (layerId: string) => Layer | null;

  // Canvas dimensions
  canvasSize: {width: number;height: number;};
  setCanvasSize: (width: number, height: number) => void;
}

export function useLayerManager(
initialWidth: number = 800,
initialHeight: number = 600)
: UseLayerManagerReturn {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [selectedLayerIds, setSelectedLayerIds] = useState<string[]>([]);
  const [groups, setGroups] = useState<LayerGroup[]>([]);
  const [canvasSize, setCanvasSizeState] = useState({
    width: initialWidth,
    height: initialHeight
  });

  // Add a new layer
  const addLayer = useCallback(
    (layerProps?: Partial<Layer>): string => {
      const newLayer = createEmptyLayer(canvasSize.width, canvasSize.height);
      const layer: Layer = { ...newLayer, ...layerProps };

      setLayers((prev) => [layer, ...prev]);
      setActiveLayerId(layer.id);
      setSelectedLayerIds([layer.id]);

      return layer.id;
    },
    [canvasSize]
  );

  // Add layer from image
  const addLayerFromImage = useCallback(
    (image: HTMLImageElement | HTMLCanvasElement, name?: string): string => {
      const layer = createLayerFromImage(image, name);

      setLayers((prev) => [layer, ...prev]);
      setActiveLayerId(layer.id);
      setSelectedLayerIds([layer.id]);

      return layer.id;
    },
    []
  );

  // Remove layer
  const removeLayer = useCallback(
    (layerId: string) => {
      setLayers((prev) => {
        const newLayers = prev.filter((l) => l.id !== layerId);

        // Update active layer if needed
        if (activeLayerId === layerId) {
          const index = prev.findIndex((l) => l.id === layerId);
          const newActiveId =
          newLayers[Math.min(index, newLayers.length - 1)]?.id || null;
          setActiveLayerId(newActiveId);
          if (newActiveId) setSelectedLayerIds([newActiveId]);
        }

        return newLayers;
      });

      setSelectedLayerIds((prev) => prev.filter((id) => id !== layerId));
    },
    [activeLayerId]
  );

  // Duplicate layer
  const duplicateLayerById = useCallback(
    (layerId: string): string | null => {
      const layer = layers.find((l) => l.id === layerId);
      if (!layer) return null;

      const newLayer = duplicateLayer(layer);
      const index = layers.findIndex((l) => l.id === layerId);

      setLayers((prev) => {
        const newLayers = [...prev];
        newLayers.splice(index, 0, newLayer);
        return newLayers;
      });

      setActiveLayerId(newLayer.id);
      setSelectedLayerIds([newLayer.id]);

      return newLayer.id;
    },
    [layers]
  );

  // Merge selected layers
  const mergeSelectedLayers = useCallback(() => {
    if (selectedLayerIds.length < 2) return;

    const selectedLayers = layers.filter((l) => selectedLayerIds.includes(l.id));
    if (selectedLayers.length < 2) return;

    // Sort by layer order
    const sortedLayers = selectedLayers.sort(
      (a, b) => layers.indexOf(a) - layers.indexOf(b)
    );

    // Merge from bottom to top
    let merged = sortedLayers[sortedLayers.length - 1];
    for (let i = sortedLayers.length - 2; i >= 0; i--) {
      merged = mergeLayers(
        merged,
        sortedLayers[i],
        canvasSize.width,
        canvasSize.height
      );
    }

    // Replace selected layers with merged
    const insertIndex = Math.min(
      ...selectedLayerIds.map((id) => layers.findIndex((l) => l.id === id))
    );

    setLayers((prev) => {
      const filtered = prev.filter((l) => !selectedLayerIds.includes(l.id));
      filtered.splice(insertIndex, 0, merged);
      return filtered;
    });

    setActiveLayerId(merged.id);
    setSelectedLayerIds([merged.id]);
  }, [layers, selectedLayerIds, canvasSize]);

  // Merge down
  const mergeDown = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index === -1 || index === layers.length - 1) return;

      const topLayer = layers[index];
      const bottomLayer = layers[index + 1];

      const merged = mergeLayers(
        bottomLayer,
        topLayer,
        canvasSize.width,
        canvasSize.height
      );

      setLayers((prev) => {
        const newLayers = [...prev];
        newLayers.splice(index, 2, merged);
        return newLayers;
      });

      setActiveLayerId(merged.id);
      setSelectedLayerIds([merged.id]);
    },
    [layers, canvasSize]
  );

  // Flatten all layers
  const flattenAllLayers = useCallback(() => {
    if (layers.length === 0) return;

    const flattened = flattenLayers(layers, canvasSize.width, canvasSize.height);

    setLayers([flattened]);
    setActiveLayerId(flattened.id);
    setSelectedLayerIds([flattened.id]);
  }, [layers, canvasSize]);

  // Select layer
  const selectLayer = useCallback(
    (layerId: string, addToSelection: boolean = false) => {
      if (addToSelection) {
        setSelectedLayerIds((prev) =>
        prev.includes(layerId) ?
        prev.filter((id) => id !== layerId) :
        [...prev, layerId]
        );
      } else {
        setSelectedLayerIds([layerId]);
      }
      setActiveLayerId(layerId);
    },
    []
  );

  // Select all layers
  const selectAllLayers = useCallback(() => {
    setSelectedLayerIds(layers.map((l) => l.id));
  }, [layers]);

  // Deselect all layers
  const deselectAllLayers = useCallback(() => {
    setSelectedLayerIds([]);
    setActiveLayerId(null);
  }, []);

  // Update layer
  const updateLayer = useCallback(
    (layerId: string, updates: Partial<Layer>) => {
      setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId) return layer;

        const updated = { ...layer, ...updates };

        // Update thumbnail if image data changed
        if (updates.imageData) {
          updated.thumbnail = updateLayerThumbnail(updated);
        }

        return updated;
      })
      );
    },
    []
  );

  // Layer visibility
  const setLayerVisibility = useCallback(
    (layerId: string, visible: boolean) => {
      updateLayer(layerId, { visible });
    },
    [updateLayer]
  );

  // Layer locked
  const setLayerLocked = useCallback(
    (layerId: string, locked: boolean) => {
      updateLayer(layerId, { locked });
    },
    [updateLayer]
  );

  // Layer opacity
  const setLayerOpacity = useCallback(
    (layerId: string, opacity: number) => {
      updateLayer(layerId, { opacity: Math.max(0, Math.min(100, opacity)) });
    },
    [updateLayer]
  );

  // Layer blend mode
  const setLayerBlendMode = useCallback(
    (layerId: string, blendMode: BlendMode) => {
      updateLayer(layerId, { blendMode });
    },
    [updateLayer]
  );

  // Rename layer
  const renameLayer = useCallback(
    (layerId: string, name: string) => {
      updateLayer(layerId, { name });
    },
    [updateLayer]
  );

  // Move layer up
  const moveLayerUp = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index <= 0) return;

      setLayers((prev) => reorderLayers(prev, index, index - 1));
    },
    [layers]
  );

  // Move layer down
  const moveLayerDown = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index === -1 || index >= layers.length - 1) return;

      setLayers((prev) => reorderLayers(prev, index, index + 1));
    },
    [layers]
  );

  // Move layer to top
  const moveLayerToTop = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index <= 0) return;

      setLayers((prev) => reorderLayers(prev, index, 0));
    },
    [layers]
  );

  // Move layer to bottom
  const moveLayerToBottom = useCallback(
    (layerId: string) => {
      const index = layers.findIndex((l) => l.id === layerId);
      if (index === -1 || index >= layers.length - 1) return;

      setLayers((prev) => reorderLayers(prev, index, prev.length - 1));
    },
    [layers]
  );

  // Reorder by indices
  const reorderLayersByIds = useCallback(
    (fromIndex: number, toIndex: number) => {
      setLayers((prev) => reorderLayers(prev, fromIndex, toIndex));
    },
    []
  );

  // Create group
  const createGroup = useCallback(
    (name?: string, layerIds?: string[]): string => {
      const groupId = generateLayerId();
      const group: LayerGroup = {
        id: groupId,
        name: name || 'Group',
        expanded: true,
        layers: layerIds || selectedLayerIds,
        blendMode: 'normal',
        opacity: 100,
        visible: true,
        locked: false
      };

      setGroups((prev) => [...prev, group]);

      // Update layers with parent group
      if (layerIds || selectedLayerIds.length > 0) {
        const idsToGroup = layerIds || selectedLayerIds;
        setLayers((prev) =>
        prev.map((layer) =>
        idsToGroup.includes(layer.id) ?
        { ...layer, parentId: groupId } :
        layer
        )
        );
      }

      return groupId;
    },
    [selectedLayerIds]
  );

  // Ungroup layers
  const ungroupLayers = useCallback((groupId: string) => {
    setLayers((prev) =>
    prev.map((layer) =>
    layer.parentId === groupId ? { ...layer, parentId: null } : layer
    )
    );

    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  // Add layer to group
  const addLayerToGroup = useCallback(
    (layerId: string, groupId: string) => {
      updateLayer(layerId, { parentId: groupId });

      setGroups((prev) =>
      prev.map((group) =>
      group.id === groupId ?
      { ...group, layers: [...group.layers, layerId] } :
      group
      )
      );
    },
    [updateLayer]
  );

  // Remove layer from group
  const removeLayerFromGroup = useCallback(
    (layerId: string) => {
      const layer = layers.find((l) => l.id === layerId);
      if (!layer?.parentId) return;

      const groupId = layer.parentId;
      updateLayer(layerId, { parentId: null });

      setGroups((prev) =>
      prev.map((group) =>
      group.id === groupId ?
      { ...group, layers: group.layers.filter((id) => id !== layerId) } :
      group
      )
      );
    },
    [layers, updateLayer]
  );

  // Add mask
  const addMask = useCallback(
    (layerId: string, mask?: LayerMask) => {
      const defaultMask: LayerMask = mask || {
        enabled: true,
        linked: true,
        imageData: new ImageData(canvasSize.width, canvasSize.height),
        inverted: false
      };

      // Fill mask with white (fully visible)
      if (!mask) {
        for (let i = 0; i < defaultMask.imageData.data.length; i += 4) {
          defaultMask.imageData.data[i] = 255;
          defaultMask.imageData.data[i + 1] = 255;
          defaultMask.imageData.data[i + 2] = 255;
          defaultMask.imageData.data[i + 3] = 255;
        }
      }

      updateLayer(layerId, { mask: defaultMask });
    },
    [canvasSize, updateLayer]
  );

  // Remove mask
  const removeMask = useCallback(
    (layerId: string) => {
      updateLayer(layerId, { mask: undefined });
    },
    [updateLayer]
  );

  // Toggle mask
  const toggleMask = useCallback(
    (layerId: string) => {
      const layer = layers.find((l) => l.id === layerId);
      if (!layer?.mask) return;

      updateLayer(layerId, {
        mask: { ...layer.mask, enabled: !layer.mask.enabled }
      });
    },
    [layers, updateLayer]
  );

  // Update layer image data
  const updateLayerImageData = useCallback(
    (layerId: string, imageData: ImageData) => {
      updateLayer(layerId, { imageData });
    },
    [updateLayer]
  );

  // Get active layer
  const getActiveLayer = useCallback((): Layer | null => {
    return layers.find((l) => l.id === activeLayerId) || null;
  }, [layers, activeLayerId]);

  // Get layer by ID
  const getLayerById = useCallback(
    (layerId: string): Layer | null => {
      return layers.find((l) => l.id === layerId) || null;
    },
    [layers]
  );

  // Set canvas size
  const setCanvasSize = useCallback((width: number, height: number) => {
    setCanvasSizeState({ width, height });
  }, []);

  return {
    layers,
    activeLayerId,
    selectedLayerIds,
    groups,

    addLayer,
    addLayerFromImage,
    removeLayer,
    duplicateLayerById,
    mergeSelectedLayers,
    mergeDown,
    flattenAllLayers,

    setActiveLayer: setActiveLayerId,
    selectLayer,
    selectAllLayers,
    deselectAllLayers,

    updateLayer,
    setLayerVisibility,
    setLayerLocked,
    setLayerOpacity,
    setLayerBlendMode,
    renameLayer,

    moveLayerUp,
    moveLayerDown,
    moveLayerToTop,
    moveLayerToBottom,
    reorderLayersByIds,

    createGroup,
    ungroupLayers,
    addLayerToGroup,
    removeLayerFromGroup,

    addMask,
    removeMask,
    toggleMask,

    updateLayerImageData,
    getActiveLayer,
    getLayerById,

    canvasSize,
    setCanvasSize
  };
}