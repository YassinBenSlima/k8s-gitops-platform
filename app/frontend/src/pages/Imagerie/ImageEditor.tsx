import React, { useCallback, useEffect, useState, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorTopBar } from '../../components/imagerie/EditorTopBar';
import { EditorToolbar } from '../../components/imagerie/EditorToolbar';
import { EditorSettingsPanel } from '../../components/imagerie/EditorSettingsPanel';
import { EditorCanvas } from '../../components/imagerie/EditorCanvas';
import { ZoomTool } from '../../components/imagerie/tools/ZoomTool';
import { useImageEditor } from '../../components/imagerie/hooks/useImageEditor';
import { useAnnotations } from '../../components/imagerie/hooks/useAnnotations';
import {
  loadImage,
  generateFinalImage,
  applyPerspectiveTransform } from
'../../components/imagerie/utils/imageProcessing';
// Import Types
import { BrushSettings } from '../../components/imagerie/tools/BrushTool';
import { GradientSettings } from '../../components/imagerie/tools/GradientTool';
import { ShapeSettings } from '../../components/imagerie/tools/ShapeTool';
import { PenSettings } from '../../components/imagerie/tools/PenTool';
import { CloneStampSettings } from '../../components/imagerie/tools/CloneStampTool';
import { TextLayer } from '../../components/imagerie/text/TextTool';
import { AIToolType } from '../../components/imagerie/ai/AIToolsPanel';
import { Layer } from '../../components/imagerie/utils/layerOperations';
export const ImageEditor = () => {
  const navigate = useNavigate();
  const {
    imageSrc,
    setImageSrc,
    activeTool,
    setActiveTool,
    filters,
    updateFilter,
    transform,
    updateTransform,
    cropArea,
    setCropArea,
    cropAspectRatio,
    setCropAspectRatio,
    perspectivePoints,
    setPerspectivePoints,
    undo,
    redo,
    canUndo,
    canRedo
  } = useImageEditor();
  const {
    annotations,
    addAnnotation,
    settings: annotationSettings
  } = useAnnotations();
  // --- Tool States ---
  // Brush State
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    size: 20,
    hardness: 80,
    opacity: 100,
    flow: 100,
    spacing: 10,
    shape: 'round',
    blendMode: 'normal',
    smoothing: 0,
    pressureSensitivity: true
  });
  const [brushColor, setBrushColor] = useState('#000000');
  // Gradient State
  const [gradientSettings, setGradientSettings] = useState<GradientSettings>({
    type: 'linear',
    stops: [
    {
      offset: 0,
      color: '#000000'
    },
    {
      offset: 1,
      color: '#ffffff'
    }],

    angle: 0,
    opacity: 100,
    blendMode: 'normal',
    reverse: false,
    dither: true
  });
  // Shape State
  const [shapeSettings, setShapeSettings] = useState<ShapeSettings>({
    type: 'rectangle',
    fill: '#3b82f6',
    stroke: '#1d4ed8',
    strokeWidth: 2,
    opacity: 100,
    sides: 5,
    radius: 0
  });
  // Pen State
  const [penSettings, setPenSettings] = useState<PenSettings>({
    mode: 'path',
    subTool: 'pen',
    strokeWidth: 2,
    strokeColor: '#000000',
    fillColor: 'transparent',
    autoAddDelete: true,
    rubberBand: true
  });
  // Clone Stamp State
  const [cloneStampSettings, setCloneStampSettings] =
  useState<CloneStampSettings>({
    size: 50,
    hardness: 50,
    opacity: 100,
    flow: 100,
    aligned: true,
    sampleAllLayers: true,
    sourcePoint: null
  });
  const [isSettingCloneSource, setIsSettingCloneSource] = useState(false);
  // Text State
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [activeTextLayerId, setActiveTextLayerId] = useState<string | null>(
    null
  );
  // Layers State
  const [layers, setLayers] = useState<Layer[]>([
  {
    id: 'background',
    name: 'Background',
    visible: true,
    locked: true,
    opacity: 100,
    blendMode: 'normal',
    type: 'image'
  }]
  );
  const [activeLayerId, setActiveLayerId] = useState<string | null>(
    'background'
  );
  const [selectedLayerIds, setSelectedLayerIds] = useState<string[]>([
  'background']
  );
  // AI Tools State
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  // Load a demo image if none exists
  useEffect(() => {
    if (!imageSrc) {
      setImageSrc(
        'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop'
      );
    }
  }, [imageSrc, setImageSrc]);
  // --- Handlers ---
  const handleSave = () => {
    alert('Image saved successfully!');
  };
  const handleExport = async () => {
    if (!imageSrc) return;
    try {
      const img = await loadImage(imageSrc);
      const blob = await generateFinalImage(
        img,
        transform,
        filters,
        annotations,
        cropArea
      );
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `edited-image-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export image');
    }
  };
  const handleUndo = () => {
    undo();
  };
  const handleRedo = () => {
    redo();
  };
  const handleApplyCrop = () => {
    if (cropArea) {
      setCropArea(null);
      setActiveTool('select');
    }
  };
  const handleCancelCrop = () => {
    setCropArea(null);
    setActiveTool('select');
  };
  const handleApplyPerspective = async () => {
    if (perspectivePoints && imageSrc) {
      try {
        const img = await loadImage(imageSrc);
        const newImg = await applyPerspectiveTransform(img, perspectivePoints);
        setImageSrc(newImg.src);
        setPerspectivePoints(null);
        setActiveTool('select');
      } catch (error) {
        console.error('Failed to apply perspective transform:', error);
        alert('Failed to apply perspective transform');
      }
    }
  };
  const handleCancelPerspective = () => {
    setPerspectivePoints(null);
    setActiveTool('select');
  };
  // Placeholder for getting image data - in a real app this would access the canvas ref
  const getImageData = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
      }
    }
    return null;
  }, []);
  const handlePreview = (imageData: ImageData | null) => {
    // In a real implementation, this would update a preview layer or the canvas
    console.log('Preview filter:', imageData ? 'Active' : 'Cleared');
  };
  const handleApplyFilter = (imageData: ImageData) => {
    // In a real implementation, this would apply the filter to the active layer
    console.log('Apply filter');
  };
  const handleLayerAction = (action: string, ...args: any[]) => {
    console.log('Layer action:', action, args);
    // Implement layer logic here
  };
  const handleTextAdd = (text: Partial<TextLayer>) => {
    const newLayer: TextLayer = {
      id: `text-${Date.now()}`,
      text: text.text || 'New Text',
      x: text.x || 50,
      y: text.y || 50,
      fontSize: text.fontSize || 24,
      fontFamily: text.fontFamily || 'Inter',
      color: text.color || '#ffffff',
      align: text.align || 'left',
      bold: text.bold || false,
      italic: text.italic || false,
      underline: text.underline || false,
      rotation: 0
    };
    setTextLayers([...textLayers, newLayer]);
    setActiveTextLayerId(newLayer.id);
  };
  const handleTextUpdate = (id: string, updates: Partial<TextLayer>) => {
    setTextLayers((layers) =>
    layers.map((l) =>
    l.id === id ?
    {
      ...l,
      ...updates
    } :
    l
    )
    );
  };
  const handleAITool = async (tool: AIToolType, options?: any) => {
    setIsAIProcessing(true);
    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('AI Tool applied:', tool);
    } finally {
      setIsAIProcessing(false);
    }
  };
  return (
    <div className="light min-h-screen bg-white">
      <div className="flex flex-col h-screen bg-white">
        <EditorTopBar
          onSave={handleSave}
          onExport={handleExport}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo} />


        <div className="flex flex-1 overflow-hidden">
          <EditorToolbar activeTool={activeTool} onToolChange={setActiveTool} />

          <div className="flex-1 flex flex-col relative">
            <EditorCanvas
              imageSrc={imageSrc}
              filters={filters}
              transform={transform}
              activeTool={activeTool}
              annotations={annotations}
              onAddAnnotation={addAnnotation}
              annotationSettings={annotationSettings}
              cropArea={cropArea}
              onCropChange={setCropArea}
              cropAspectRatio={cropAspectRatio}
              perspectivePoints={perspectivePoints}
              onPerspectiveChange={setPerspectivePoints} />


            {/* Floating Zoom Controls */}
            <div className="absolute bottom-6 right-6 z-20">
              <ZoomTool transform={transform} onChange={updateTransform} />
            </div>
          </div>

          <EditorSettingsPanel
            activeTool={activeTool}
            filters={filters}
            transform={transform}
            onFilterChange={updateFilter}
            onTransformChange={updateTransform}
            annotationSettings={annotationSettings}
            onApplyCrop={handleApplyCrop}
            onCancelCrop={handleCancelCrop}
            onApplyPerspective={handleApplyPerspective}
            onCancelPerspective={handleCancelPerspective}
            cropArea={cropArea}
            onCropAreaChange={setCropArea}
            cropAspectRatio={cropAspectRatio}
            setCropAspectRatio={setCropAspectRatio}
            // New Props
            getImageData={getImageData}
            onPreview={handlePreview}
            onApplyFilter={handleApplyFilter}
            // Layers
            layers={layers}
            activeLayerId={activeLayerId}
            selectedLayerIds={selectedLayerIds}
            onLayerAction={handleLayerAction}
            // Tool Settings
            brushSettings={brushSettings}
            onBrushSettingsChange={setBrushSettings}
            brushColor={brushColor}
            onBrushColorChange={setBrushColor}
            gradientSettings={gradientSettings}
            onGradientSettingsChange={setGradientSettings}
            shapeSettings={shapeSettings}
            onShapeSettingsChange={setShapeSettings}
            penSettings={penSettings}
            onPenSettingsChange={setPenSettings}
            cloneStampSettings={cloneStampSettings}
            onCloneStampSettingsChange={setCloneStampSettings}
            isSettingCloneSource={isSettingCloneSource}
            onToggleCloneSourceMode={() =>
            setIsSettingCloneSource(!isSettingCloneSource)
            }
            textSettings={{
              activeLayer: textLayers.find((l) => l.id === activeTextLayerId),
              onAddText: handleTextAdd,
              onUpdateText: handleTextUpdate
            }}
            aiTools={{
              onApplyTool: handleAITool,
              isProcessing: isAIProcessing
            }} />

        </div>
      </div>
    </div>);

};