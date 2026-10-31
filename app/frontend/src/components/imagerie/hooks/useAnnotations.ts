import { useState, useCallback } from 'react';

export type AnnotationType =
'arrow' |
'line' |
'rect' |
'circle' |
'text' |
'freehand';

export interface Annotation {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  endX?: number;
  endY?: number;
  color: string;
  strokeWidth: number;
  text?: string;
  points?: {x: number;y: number;}[]; // For freehand
  fill?: boolean;
}

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<
    string | null>(
    null);
  const [drawingAnnotation, setDrawingAnnotation] = useState<Annotation | null>(
    null
  );

  // Settings for new annotations
  const [currentType, setCurrentType] = useState<AnnotationType>('arrow');
  const [currentColor, setCurrentColor] = useState('#EF4444'); // Default red
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(3);
  const [isFilled, setIsFilled] = useState(false);

  const addAnnotation = useCallback((annotation: Annotation) => {
    setAnnotations((prev) => [...prev, annotation]);
  }, []);

  const updateAnnotation = useCallback(
    (id: string, updates: Partial<Annotation>) => {
      setAnnotations((prev) =>
      prev.map((ann) => ann.id === id ? { ...ann, ...updates } : ann)
      );
    },
    []
  );

  const removeAnnotation = useCallback(
    (id: string) => {
      setAnnotations((prev) => prev.filter((ann) => ann.id !== id));
      if (selectedAnnotationId === id) setSelectedAnnotationId(null);
    },
    [selectedAnnotationId]
  );

  const clearAnnotations = useCallback(() => {
    setAnnotations([]);
    setSelectedAnnotationId(null);
  }, []);

  return {
    annotations,
    setAnnotations,
    selectedAnnotationId,
    setSelectedAnnotationId,
    drawingAnnotation,
    setDrawingAnnotation,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    clearAnnotations,
    settings: {
      type: currentType,
      setType: setCurrentType,
      color: currentColor,
      setColor: setCurrentColor,
      strokeWidth: currentStrokeWidth,
      setStrokeWidth: setCurrentStrokeWidth,
      fill: isFilled,
      setFill: setIsFilled
    }
  };
};