import React, { useEffect, useState, useRef } from 'react';
import {
  ImageFilter,
  ImageTransform,
  CropArea,
  PerspectivePoints,
  applyFiltersToContext } from
'./utils/imageProcessing';
import { ToolType } from './hooks/useImageEditor';
import { Annotation } from './hooks/useAnnotations';
interface EditorCanvasProps {
  imageSrc: string | null;
  filters: ImageFilter;
  transform: ImageTransform;
  activeTool: ToolType;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Annotation) => void;
  annotationSettings: any;
  cropArea: CropArea | null;
  onCropChange: (crop: CropArea | null) => void;
  cropAspectRatio: number | null;
  perspectivePoints: PerspectivePoints | null;
  onPerspectiveChange: (points: PerspectivePoints | null) => void;
}
export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  imageSrc,
  filters,
  transform,
  activeTool,
  annotations,
  onAddAnnotation,
  annotationSettings,
  cropArea,
  onCropChange,
  cropAspectRatio,
  perspectivePoints,
  onPerspectiveChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({
    x: 0,
    y: 0
  });
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );
  const [draggedHandle, setDraggedHandle] = useState<string | null>(null);
  // Load image
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      img.onload = () => setImage(img);
    }
  }, [imageSrc]);
  // Initialize crop area when crop tool is activated
  useEffect(() => {
    if (activeTool === 'crop' && !cropArea && image) {
      const margin = Math.min(image.width, image.height) * 0.1;
      let width = image.width - margin * 2;
      let height = image.height - margin * 2;
      // If aspect ratio is set, adjust initial crop
      if (cropAspectRatio) {
        if (width / height > cropAspectRatio) {
          width = height * cropAspectRatio;
        } else {
          height = width / cropAspectRatio;
        }
      }
      onCropChange({
        x: (image.width - width) / 2,
        y: (image.height - height) / 2,
        width,
        height
      });
    }
  }, [activeTool, cropArea, image, onCropChange, cropAspectRatio]);
  // Initialize perspective points when perspective tool is activated
  useEffect(() => {
    if (activeTool === 'perspective' && !perspectivePoints && image) {
      const margin = Math.min(image.width, image.height) * 0.1;
      onPerspectiveChange({
        topLeft: {
          x: margin,
          y: margin
        },
        topRight: {
          x: image.width - margin,
          y: margin
        },
        bottomRight: {
          x: image.width - margin,
          y: image.height - margin
        },
        bottomLeft: {
          x: margin,
          y: image.height - margin
        }
      });
    }
  }, [activeTool, perspectivePoints, image, onPerspectiveChange]);
  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !image) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    applyFiltersToContext(ctx, filters);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(transform.rotation * Math.PI / 180);
    ctx.scale(
      transform.flipHorizontal ? -1 : 1,
      transform.flipVertical ? -1 : 1
    );
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
    // Draw crop overlay
    if (activeTool === 'crop' && cropArea) {
      // Darken outside crop area
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
      // Draw crop border
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
      // Draw grid lines (rule of thirds)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      // Vertical lines
      ctx.moveTo(cropArea.x + cropArea.width / 3, cropArea.y);
      ctx.lineTo(cropArea.x + cropArea.width / 3, cropArea.y + cropArea.height);
      ctx.moveTo(cropArea.x + cropArea.width * 2 / 3, cropArea.y);
      ctx.lineTo(
        cropArea.x + cropArea.width * 2 / 3,
        cropArea.y + cropArea.height
      );
      // Horizontal lines
      ctx.moveTo(cropArea.x, cropArea.y + cropArea.height / 3);
      ctx.lineTo(cropArea.x + cropArea.width, cropArea.y + cropArea.height / 3);
      ctx.moveTo(cropArea.x, cropArea.y + cropArea.height * 2 / 3);
      ctx.lineTo(
        cropArea.x + cropArea.width,
        cropArea.y + cropArea.height * 2 / 3
      );
      ctx.stroke();
      // Draw corner handles
      const handleSize = 10;
      const handles = [
      {
        x: cropArea.x,
        y: cropArea.y
      },
      {
        x: cropArea.x + cropArea.width,
        y: cropArea.y
      },
      {
        x: cropArea.x + cropArea.width,
        y: cropArea.y + cropArea.height
      },
      {
        x: cropArea.x,
        y: cropArea.y + cropArea.height
      }];

      ctx.fillStyle = '#3B82F6';
      handles.forEach((handle) => {
        ctx.fillRect(
          handle.x - handleSize / 2,
          handle.y - handleSize / 2,
          handleSize,
          handleSize
        );
      });
    }
    // Draw perspective overlay
    if (activeTool === 'perspective' && perspectivePoints) {
      // Draw grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 1;
      // Draw perspective quadrilateral
      ctx.beginPath();
      ctx.moveTo(perspectivePoints.topLeft.x, perspectivePoints.topLeft.y);
      ctx.lineTo(perspectivePoints.topRight.x, perspectivePoints.topRight.y);
      ctx.lineTo(
        perspectivePoints.bottomRight.x,
        perspectivePoints.bottomRight.y
      );
      ctx.lineTo(perspectivePoints.bottomLeft.x, perspectivePoints.bottomLeft.y);
      ctx.closePath();
      ctx.stroke();
      // Draw grid inside perspective quad (approximate)
      // This is just a visual guide, not mathematically perfect perspective grid
      const steps = 3;
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        // Top to Bottom lines
        const topX =
        perspectivePoints.topLeft.x +
        (perspectivePoints.topRight.x - perspectivePoints.topLeft.x) * t;
        const topY =
        perspectivePoints.topLeft.y +
        (perspectivePoints.topRight.y - perspectivePoints.topLeft.y) * t;
        const bottomX =
        perspectivePoints.bottomLeft.x +
        (perspectivePoints.bottomRight.x - perspectivePoints.bottomLeft.x) * t;
        const bottomY =
        perspectivePoints.bottomLeft.y +
        (perspectivePoints.bottomRight.y - perspectivePoints.bottomLeft.y) * t;
        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
        // Left to Right lines
        const leftX =
        perspectivePoints.topLeft.x +
        (perspectivePoints.bottomLeft.x - perspectivePoints.topLeft.x) * t;
        const leftY =
        perspectivePoints.topLeft.y +
        (perspectivePoints.bottomLeft.y - perspectivePoints.topLeft.y) * t;
        const rightX =
        perspectivePoints.topRight.x +
        (perspectivePoints.bottomRight.x - perspectivePoints.topRight.x) * t;
        const rightY =
        perspectivePoints.topRight.y +
        (perspectivePoints.bottomRight.y - perspectivePoints.topRight.y) * t;
        ctx.beginPath();
        ctx.moveTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.stroke();
      }
      // Draw corner handles
      const handleSize = 12;
      const corners = [
      perspectivePoints.topLeft,
      perspectivePoints.topRight,
      perspectivePoints.bottomRight,
      perspectivePoints.bottomLeft];

      ctx.fillStyle = '#3B82F6';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      corners.forEach((corner) => {
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, handleSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    }
    // Draw existing annotations
    annotations.forEach((ann) => drawAnnotation(ctx, ann));
    // Draw current drawing annotation
    if (currentAnnotation) {
      drawAnnotation(ctx, currentAnnotation);
    }
  }, [
  image,
  filters,
  transform,
  annotations,
  currentAnnotation,
  activeTool,
  cropArea,
  perspectivePoints]
  );
  const drawAnnotation = (ctx: CanvasRenderingContext2D, ann: Annotation) => {
    ctx.save();
    ctx.strokeStyle = ann.color;
    ctx.lineWidth = ann.strokeWidth;
    ctx.fillStyle = ann.fill ? ann.color + '40' : 'transparent';
    ctx.beginPath();
    switch (ann.type) {
      case 'rect':
        if (ann.width && ann.height) {
          ctx.rect(ann.x, ann.y, ann.width, ann.height);
          if (ann.fill) ctx.fill();
          ctx.stroke();
        }
        break;
      case 'circle':
        if (ann.width) {
          const radius = Math.abs(ann.width) / 2;
          ctx.arc(ann.x + radius, ann.y + radius, radius, 0, 2 * Math.PI);
          if (ann.fill) ctx.fill();
          ctx.stroke();
        }
        break;
      case 'line':
        if (ann.endX && ann.endY) {
          ctx.moveTo(ann.x, ann.y);
          ctx.lineTo(ann.endX, ann.endY);
          ctx.stroke();
        }
        break;
      case 'arrow':
        if (ann.endX && ann.endY) {
          ctx.moveTo(ann.x, ann.y);
          ctx.lineTo(ann.endX, ann.endY);
          ctx.stroke();
          const angle = Math.atan2(ann.endY - ann.y, ann.endX - ann.x);
          const headLen = 15 * (ann.strokeWidth / 3);
          ctx.beginPath();
          ctx.moveTo(ann.endX, ann.endY);
          ctx.lineTo(
            ann.endX - headLen * Math.cos(angle - Math.PI / 6),
            ann.endY - headLen * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            ann.endX - headLen * Math.cos(angle + Math.PI / 6),
            ann.endY - headLen * Math.sin(angle + Math.PI / 6)
          );
          ctx.lineTo(ann.endX, ann.endY);
          ctx.fillStyle = ann.color;
          ctx.fill();
        }
        break;
      case 'freehand':
        if (ann.points && ann.points.length > 0) {
          ctx.moveTo(ann.points[0].x, ann.points[0].y);
          ann.points.forEach((p) => ctx.lineTo(p.x, p.y));
          ctx.stroke();
        }
        break;
      case 'text':
        if (ann.text) {
          ctx.font = `${ann.strokeWidth * 10}px Arial`;
          ctx.fillStyle = ann.color;
          ctx.fillText(ann.text, ann.x, ann.y);
        }
        break;
    }
    ctx.restore();
  };
  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas)
    return {
      x: 0,
      y: 0
    };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getCanvasCoordinates(e);
    setStartPos(pos);
    // Handle crop tool
    if (activeTool === 'crop' && cropArea) {
      const handleSize = 10;
      const handles = [
      {
        name: 'tl',
        x: cropArea.x,
        y: cropArea.y
      },
      {
        name: 'tr',
        x: cropArea.x + cropArea.width,
        y: cropArea.y
      },
      {
        name: 'br',
        x: cropArea.x + cropArea.width,
        y: cropArea.y + cropArea.height
      },
      {
        name: 'bl',
        x: cropArea.x,
        y: cropArea.y + cropArea.height
      }];

      for (const handle of handles) {
        if (
        Math.abs(pos.x - handle.x) < handleSize &&
        Math.abs(pos.y - handle.y) < handleSize)
        {
          setDraggedHandle(handle.name);
          setIsDrawing(true);
          return;
        }
      }
      // Check if clicking inside crop area to move it
      if (
      pos.x >= cropArea.x &&
      pos.x <= cropArea.x + cropArea.width &&
      pos.y >= cropArea.y &&
      pos.y <= cropArea.y + cropArea.height)
      {
        setDraggedHandle('move');
        setIsDrawing(true);
        return;
      }
    }
    // Handle perspective tool
    if (activeTool === 'perspective' && perspectivePoints) {
      const handleSize = 12;
      const corners = [
      {
        name: 'topLeft',
        ...perspectivePoints.topLeft
      },
      {
        name: 'topRight',
        ...perspectivePoints.topRight
      },
      {
        name: 'bottomRight',
        ...perspectivePoints.bottomRight
      },
      {
        name: 'bottomLeft',
        ...perspectivePoints.bottomLeft
      }];

      for (const corner of corners) {
        if (
        Math.abs(pos.x - corner.x) < handleSize &&
        Math.abs(pos.y - corner.y) < handleSize)
        {
          setDraggedHandle(corner.name);
          setIsDrawing(true);
          return;
        }
      }
    }
    // Handle annotation tool
    if (activeTool === 'annotate') {
      setIsDrawing(true);
      if (annotationSettings.type === 'freehand') {
        setCurrentAnnotation({
          id: Date.now().toString(),
          type: 'freehand',
          x: pos.x,
          y: pos.y,
          points: [
          {
            x: pos.x,
            y: pos.y
          }],

          color: annotationSettings.color,
          strokeWidth: annotationSettings.strokeWidth,
          fill: false
        });
      } else if (annotationSettings.type === 'text') {
        const text = prompt('Enter text:');
        if (text) {
          onAddAnnotation({
            id: Date.now().toString(),
            type: 'text',
            x: pos.x,
            y: pos.y,
            text,
            color: annotationSettings.color,
            strokeWidth: annotationSettings.strokeWidth
          });
        }
        setIsDrawing(false);
      } else {
        setCurrentAnnotation({
          id: Date.now().toString(),
          type: annotationSettings.type,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          endX: pos.x,
          endY: pos.y,
          color: annotationSettings.color,
          strokeWidth: annotationSettings.strokeWidth,
          fill: annotationSettings.fill
        });
      }
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const pos = getCanvasCoordinates(e);
    // Handle crop resizing
    if (activeTool === 'crop' && cropArea && draggedHandle) {
      const newCrop = {
        ...cropArea
      };
      if (draggedHandle === 'move') {
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;
        newCrop.x += dx;
        newCrop.y += dy;
        // Clamp to image bounds
        if (image) {
          if (newCrop.x < 0) newCrop.x = 0;
          if (newCrop.y < 0) newCrop.y = 0;
          if (newCrop.x + newCrop.width > image.width)
          newCrop.x = image.width - newCrop.width;
          if (newCrop.y + newCrop.height > image.height)
          newCrop.y = image.height - newCrop.height;
        }
        setStartPos(pos);
      } else {
        // Handle resizing with aspect ratio constraint
        if (cropAspectRatio) {
          let newWidth = newCrop.width;
          let newHeight = newCrop.height;
          switch (draggedHandle) {
            case 'tl':
              // Calculate new width based on mouse position
              newWidth = newCrop.x + newCrop.width - pos.x;
              newHeight = newWidth / cropAspectRatio;
              // Update position
              newCrop.x = pos.x;
              newCrop.y = newCrop.y + newCrop.height - newHeight;
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              break;
            case 'tr':
              newWidth = pos.x - newCrop.x;
              newHeight = newWidth / cropAspectRatio;
              newCrop.y = newCrop.y + newCrop.height - newHeight;
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              break;
            case 'br':
              newWidth = pos.x - newCrop.x;
              newHeight = newWidth / cropAspectRatio;
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              break;
            case 'bl':
              newWidth = newCrop.x + newCrop.width - pos.x;
              newHeight = newWidth / cropAspectRatio;
              newCrop.x = pos.x;
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              break;
          }
        } else {
          // Free resizing
          switch (draggedHandle) {
            case 'tl':
              newCrop.width += newCrop.x - pos.x;
              newCrop.height += newCrop.y - pos.y;
              newCrop.x = pos.x;
              newCrop.y = pos.y;
              break;
            case 'tr':
              newCrop.width = pos.x - newCrop.x;
              newCrop.height += newCrop.y - pos.y;
              newCrop.y = pos.y;
              break;
            case 'br':
              newCrop.width = pos.x - newCrop.x;
              newCrop.height = pos.y - newCrop.y;
              break;
            case 'bl':
              newCrop.width += newCrop.x - pos.x;
              newCrop.x = pos.x;
              newCrop.height = pos.y - newCrop.y;
              break;
          }
        }
      }
      onCropChange(newCrop);
      return;
    }
    // Handle perspective point dragging
    if (activeTool === 'perspective' && perspectivePoints && draggedHandle) {
      const newPoints = {
        ...perspectivePoints
      };
      switch (draggedHandle) {
        case 'topLeft':
          newPoints.topLeft = pos;
          break;
        case 'topRight':
          newPoints.topRight = pos;
          break;
        case 'bottomRight':
          newPoints.bottomRight = pos;
          break;
        case 'bottomLeft':
          newPoints.bottomLeft = pos;
          break;
      }
      onPerspectiveChange(newPoints);
      return;
    }
    // Handle annotation drawing
    if (activeTool === 'annotate' && currentAnnotation) {
      if (currentAnnotation.type === 'freehand') {
        setCurrentAnnotation((prev) => ({
          ...prev!,
          points: [
          ...(prev?.points || []),
          {
            x: pos.x,
            y: pos.y
          }]

        }));
      } else {
        setCurrentAnnotation((prev) => ({
          ...prev!,
          width: pos.x - startPos.x,
          height: pos.y - startPos.y,
          endX: pos.x,
          endY: pos.y
        }));
      }
    }
  };
  const handleMouseUp = () => {
    if (isDrawing && currentAnnotation && activeTool === 'annotate') {
      onAddAnnotation(currentAnnotation);
      setCurrentAnnotation(null);
    }
    setIsDrawing(false);
    setDraggedHandle(null);
  };
  const getCursor = () => {
    if (activeTool === 'crop') return 'crosshair';
    if (activeTool === 'perspective') return 'crosshair';
    if (activeTool === 'annotate') return 'crosshair';
    return 'default';
  };
  return (
    <div
      ref={containerRef}
      className="flex-1 bg-[#F3F4F6] dark:bg-black overflow-hidden relative flex items-center justify-center"
      style={{
        backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>

      {!imageSrc ?
      <div className="text-center text-gray-400">
          <p>No image loaded</p>
        </div> :

      <div
        style={{
          transform: `scale(${transform.zoom}) translate(${transform.offsetX}px, ${transform.offsetY}px)`,
          transition: 'transform 0.1s ease-out'
        }}
        className="relative shadow-2xl">

          <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="max-w-full max-h-full block"
          style={{
            cursor: getCursor()
          }} />

        </div>
      }
    </div>);

};