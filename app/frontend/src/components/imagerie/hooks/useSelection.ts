import { useState, useCallback } from 'react';
import {
  Selection,
  SelectionMode,
  SelectionPoint,
  SelectionRect,
  createRectangleSelection,
  createEllipseSelection,
  createPolygonSelection,
  floodFillSelection,
  combineSelections,
  featherSelection,
  expandSelection,
  contractSelection,
  invertSelection,
  selectAll,
  isSelectionEmpty,
  getSelectionBounds,
  generateSelectionId } from
'../utils/selectionUtils';

export type SelectionTool =
'rectangle' |
'ellipse' |
'lasso' |
'polygon' |
'magnetic' |
'quick' |
'wand';

export interface SavedSelection {
  id: string;
  name: string;
  selection: Selection;
  createdAt: Date;
}

export interface UseSelectionReturn {
  // Current selection
  selection: Selection | null;
  selectionMode: SelectionMode;
  activeTool: SelectionTool;

  // Saved selections
  savedSelections: SavedSelection[];

  // Selection state
  isSelecting: boolean;
  selectionPoints: SelectionPoint[];

  // Settings
  featherRadius: number;
  antiAlias: boolean;
  tolerance: number;
  contiguous: boolean;

  // Actions
  setSelectionMode: (mode: SelectionMode) => void;
  setActiveTool: (tool: SelectionTool) => void;
  setFeatherRadius: (radius: number) => void;
  setAntiAlias: (enabled: boolean) => void;
  setTolerance: (tolerance: number) => void;
  setContiguous: (contiguous: boolean) => void;

  // Selection operations
  startSelection: (point: SelectionPoint) => void;
  updateSelection: (point: SelectionPoint) => void;
  finishSelection: () => void;
  cancelSelection: () => void;

  // Rectangle/Ellipse selection
  createRectSelection: (rect: SelectionRect) => void;
  createEllipseSelection: (rect: SelectionRect) => void;

  // Polygon/Lasso selection
  addPolygonPoint: (point: SelectionPoint) => void;
  closePolygon: () => void;

  // Quick selection / Magic wand
  quickSelect: (imageData: ImageData, x: number, y: number) => void;

  // Selection modifications
  feather: (radius?: number) => void;
  expand: (pixels: number) => void;
  contract: (pixels: number) => void;
  invert: () => void;
  selectAllPixels: () => void;
  deselectAll: () => void;

  // Save/Load
  saveSelection: (name?: string) => void;
  loadSelection: (id: string) => void;
  deleteSelection: (id: string) => void;

  // Utilities
  hasSelection: boolean;
  selectionBounds: SelectionRect | null;

  // Canvas dimensions
  canvasSize: {width: number;height: number;};
  setCanvasSize: (width: number, height: number) => void;
}

export function useSelection(
initialWidth: number = 800,
initialHeight: number = 600)
: UseSelectionReturn {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('new');
  const [activeTool, setActiveTool] = useState<SelectionTool>('rectangle');
  const [savedSelections, setSavedSelections] = useState<SavedSelection[]>([]);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionPoints, setSelectionPoints] = useState<SelectionPoint[]>([]);
  const [startPoint, setStartPoint] = useState<SelectionPoint | null>(null);

  const [featherRadius, setFeatherRadius] = useState(0);
  const [antiAlias, setAntiAlias] = useState(true);
  const [tolerance, setTolerance] = useState(32);
  const [contiguous, setContiguous] = useState(true);

  const [canvasSize, setCanvasSizeState] = useState({
    width: initialWidth,
    height: initialHeight
  });

  const setCanvasSize = useCallback((width: number, height: number) => {
    setCanvasSizeState({ width, height });
  }, []);

  // Apply selection with mode
  const applySelection = useCallback(
    (newSelection: Selection) => {
      if (selectionMode === 'new' || !selection) {
        setSelection(newSelection);
      } else {
        const combined = combineSelections(
          selection,
          newSelection,
          selectionMode
        );
        setSelection(combined);
      }
    },
    [selection, selectionMode]
  );

  // Start selection
  const startSelection = useCallback((point: SelectionPoint) => {
    setIsSelecting(true);
    setStartPoint(point);
    setSelectionPoints([point]);
  }, []);

  // Update selection (for drag operations)
  const updateSelection = useCallback(
    (point: SelectionPoint) => {
      if (!isSelecting) return;

      if (activeTool === 'lasso' || activeTool === 'magnetic') {
        setSelectionPoints((prev) => [...prev, point]);
      } else {
        setSelectionPoints([startPoint!, point]);
      }
    },
    [isSelecting, activeTool, startPoint]
  );

  // Finish selection
  const finishSelection = useCallback(() => {
    if (!isSelecting || selectionPoints.length < 2) {
      cancelSelection();
      return;
    }

    let newSelection: Selection | null = null;

    if (activeTool === 'rectangle') {
      const [p1, p2] = selectionPoints;
      const rect: SelectionRect = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
        width: Math.abs(p2.x - p1.x),
        height: Math.abs(p2.y - p1.y)
      };
      newSelection = createRectangleSelection(
        rect,
        canvasSize.width,
        canvasSize.height,
        featherRadius,
        antiAlias
      );
    } else if (activeTool === 'ellipse') {
      const [p1, p2] = selectionPoints;
      const rect: SelectionRect = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
        width: Math.abs(p2.x - p1.x),
        height: Math.abs(p2.y - p1.y)
      };
      newSelection = createEllipseSelection(
        rect,
        canvasSize.width,
        canvasSize.height,
        featherRadius,
        antiAlias
      );
    } else if (activeTool === 'lasso' || activeTool === 'polygon') {
      if (selectionPoints.length >= 3) {
        newSelection = createPolygonSelection(
          selectionPoints,
          canvasSize.width,
          canvasSize.height,
          featherRadius
        );
      }
    }

    if (newSelection) {
      applySelection(newSelection);
    }

    setIsSelecting(false);
    setSelectionPoints([]);
    setStartPoint(null);
  }, [
  isSelecting,
  selectionPoints,
  activeTool,
  canvasSize,
  featherRadius,
  antiAlias,
  applySelection]
  );

  // Cancel selection
  const cancelSelection = useCallback(() => {
    setIsSelecting(false);
    setSelectionPoints([]);
    setStartPoint(null);
  }, []);

  // Create rectangle selection directly
  const createRectSelection = useCallback(
    (rect: SelectionRect) => {
      const newSelection = createRectangleSelection(
        rect,
        canvasSize.width,
        canvasSize.height,
        featherRadius,
        antiAlias
      );
      applySelection(newSelection);
    },
    [canvasSize, featherRadius, antiAlias, applySelection]
  );

  // Create ellipse selection directly
  const createEllipseSelectionFn = useCallback(
    (rect: SelectionRect) => {
      const newSelection = createEllipseSelection(
        rect,
        canvasSize.width,
        canvasSize.height,
        featherRadius,
        antiAlias
      );
      applySelection(newSelection);
    },
    [canvasSize, featherRadius, antiAlias, applySelection]
  );

  // Add polygon point
  const addPolygonPoint = useCallback(
    (point: SelectionPoint) => {
      setSelectionPoints((prev) => [...prev, point]);
      if (!isSelecting) setIsSelecting(true);
    },
    [isSelecting]
  );

  // Close polygon
  const closePolygon = useCallback(() => {
    if (selectionPoints.length >= 3) {
      const newSelection = createPolygonSelection(
        selectionPoints,
        canvasSize.width,
        canvasSize.height,
        featherRadius
      );
      applySelection(newSelection);
    }
    setIsSelecting(false);
    setSelectionPoints([]);
  }, [selectionPoints, canvasSize, featherRadius, applySelection]);

  // Quick select / Magic wand
  const quickSelect = useCallback(
    (imageData: ImageData, x: number, y: number) => {
      const newSelection = floodFillSelection(
        imageData,
        Math.round(x),
        Math.round(y),
        tolerance,
        contiguous
      );
      applySelection(newSelection);
    },
    [tolerance, contiguous, applySelection]
  );

  // Feather selection
  const feather = useCallback(
    (radius?: number) => {
      if (!selection) return;
      const r = radius ?? featherRadius;
      if (r > 0) {
        setSelection(featherSelection(selection, r));
      }
    },
    [selection, featherRadius]
  );

  // Expand selection
  const expand = useCallback(
    (pixels: number) => {
      if (!selection || pixels <= 0) return;
      setSelection(expandSelection(selection, pixels));
    },
    [selection]
  );

  // Contract selection
  const contract = useCallback(
    (pixels: number) => {
      if (!selection || pixels <= 0) return;
      setSelection(contractSelection(selection, pixels));
    },
    [selection]
  );

  // Invert selection
  const invert = useCallback(() => {
    if (!selection) {
      // If no selection, select all
      setSelection(selectAll(canvasSize.width, canvasSize.height));
    } else {
      setSelection(invertSelection(selection));
    }
  }, [selection, canvasSize]);

  // Select all
  const selectAllPixels = useCallback(() => {
    setSelection(selectAll(canvasSize.width, canvasSize.height));
  }, [canvasSize]);

  // Deselect all
  const deselectAll = useCallback(() => {
    setSelection(null);
  }, []);

  // Save selection
  const saveSelection = useCallback(
    (name?: string) => {
      if (!selection) return;

      const saved: SavedSelection = {
        id: generateSelectionId(),
        name: name || `Selection ${savedSelections.length + 1}`,
        selection: { ...selection },
        createdAt: new Date()
      };

      setSavedSelections((prev) => [...prev, saved]);
    },
    [selection, savedSelections.length]
  );

  // Load selection
  const loadSelection = useCallback(
    (id: string) => {
      const saved = savedSelections.find((s) => s.id === id);
      if (saved) {
        applySelection(saved.selection);
      }
    },
    [savedSelections, applySelection]
  );

  // Delete saved selection
  const deleteSelection = useCallback((id: string) => {
    setSavedSelections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Computed values
  const hasSelection = selection !== null && !isSelectionEmpty(selection);
  const selectionBounds = selection ? getSelectionBounds(selection) : null;

  return {
    selection,
    selectionMode,
    activeTool,
    savedSelections,
    isSelecting,
    selectionPoints,
    featherRadius,
    antiAlias,
    tolerance,
    contiguous,

    setSelectionMode,
    setActiveTool,
    setFeatherRadius,
    setAntiAlias,
    setTolerance,
    setContiguous,

    startSelection,
    updateSelection,
    finishSelection,
    cancelSelection,

    createRectSelection,
    createEllipseSelection: createEllipseSelectionFn,
    addPolygonPoint,
    closePolygon,
    quickSelect,

    feather,
    expand,
    contract,
    invert,
    selectAllPixels,
    deselectAll,

    saveSelection,
    loadSelection,
    deleteSelection,

    hasSelection,
    selectionBounds,

    canvasSize,
    setCanvasSize
  };
}