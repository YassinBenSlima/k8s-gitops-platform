import { useState, useCallback, useRef } from 'react';
import {
  ImageFilter,
  ImageTransform,
  defaultFilters,
  defaultTransform,
  CropArea,
  PerspectivePoints } from
'../utils/imageProcessing';

export type ToolType =
'select' |
'move' |
'crop' |
'rotate' |
'filter' |
'annotate' |
'perspective' |
'zoom'
// Selection tools
| 'rectangle-select' |
'ellipse-select' |
'polygon-select' |
'lasso-select' |
'magic-wand'
// Filter tools
| 'blur' |
'sharpen' |
'artistic'
// Color tools
| 'curves' |
'levels' |
'color-balance' |
'hue-saturation' |
'color-picker'
// Drawing tools
| 'brush' |
'gradient' |
'shape' |
'pen' |
'clone-stamp'
// Transform tools
| 'free-transform' |
'warp' |
'liquify'
// Other tools
| 'text' |
'layers' |
'ai-tools';

interface HistoryState {
  filters: ImageFilter;
  transform: ImageTransform;
  annotations: any[];
}

export const useImageEditor = (initialImageSrc?: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImageSrc || null
  );
  const [activeTool, setActiveTool] = useState<ToolType>('select');

  const [filters, setFilters] = useState<ImageFilter>(defaultFilters);
  const [transform, setTransform] = useState<ImageTransform>(defaultTransform);

  // Crop state
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [cropAspectRatio, setCropAspectRatio] = useState<number | null>(null);

  // Perspective state
  const [perspectivePoints, setPerspectivePoints] =
  useState<PerspectivePoints | null>(null);

  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback(
    (newState: HistoryState) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        return [...newHistory, newState];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      const state = history[historyIndex - 1];
      setFilters(state.filters);
      setTransform(state.transform);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      const state = history[historyIndex + 1];
      setFilters(state.filters);
      setTransform(state.transform);
    }
  }, [history, historyIndex]);

  const reset = useCallback(() => {
    setFilters(defaultFilters);
    setTransform(defaultTransform);
    setCropArea(null);
    setCropAspectRatio(null);
    setPerspectivePoints(null);
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const updateFilter = useCallback((key: keyof ImageFilter, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateTransform = useCallback(
    (key: keyof ImageTransform, value: any) => {
      setTransform((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return {
    imageSrc,
    setImageSrc,
    activeTool,
    setActiveTool,
    filters,
    setFilters,
    updateFilter,
    transform,
    setTransform,
    updateTransform,
    cropArea,
    setCropArea,
    cropAspectRatio,
    setCropAspectRatio,
    perspectivePoints,
    setPerspectivePoints,
    undo,
    redo,
    reset,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};