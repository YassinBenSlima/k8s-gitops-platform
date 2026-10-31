import React from 'react';
import { ToolType } from './hooks/useImageEditor';
import { CropTool } from './tools/CropTool';
import { RotateTool } from './tools/RotateTool';
import { FilterTool } from './tools/FilterTool';
import { AnnotationTool } from './tools/AnnotationTool';
import { PerspectiveTool } from './tools/PerspectiveTool';
import { ImageFilter, ImageTransform, CropArea } from './utils/imageProcessing';
import { AnnotationType } from './hooks/useAnnotations';
// New imports
import { LayerPanel } from './layers/LayerPanel';
import { BlurFilters } from './filters/BlurFilters';
import { ArtisticFilters } from './filters/ArtisticFilters';
import { CurvesAdjustment } from './color/CurvesAdjustment';
import { LevelsAdjustment } from './color/LevelsAdjustment';
import { ColorPickerPanel } from './color/ColorPickerPanel';
import { BrushTool, BrushSettings } from './tools/BrushTool';
import { GradientTool, GradientSettings } from './tools/GradientTool';
import { ShapeTool, ShapeSettings } from './tools/ShapeTool';
import { PenTool, PenSettings } from './tools/PenTool';
import { CloneStampTool, CloneStampSettings } from './tools/CloneStampTool';
import { FreeTransform, TransformState } from './transform/FreeTransform';
import { WarpTool } from './transform/WarpTool';
import { LiquifyTool } from './transform/LiquifyTool';
import { TextTool, TextLayer } from './text/TextTool';
import { AIToolsPanel, AIToolType } from './ai/AIToolsPanel';
import { Layer } from './utils/layerOperations';
interface EditorSettingsPanelProps {
  activeTool: ToolType;
  filters: ImageFilter;
  transform: ImageTransform;
  onFilterChange: (key: keyof ImageFilter, value: number) => void;
  onTransformChange: (key: keyof ImageTransform, value: any) => void;
  annotationSettings: {
    type: AnnotationType;
    setType: (type: AnnotationType) => void;
    color: string;
    setColor: (color: string) => void;
    strokeWidth: number;
    setStrokeWidth: (width: number) => void;
    fill: boolean;
    setFill: (fill: boolean) => void;
  };
  onApplyCrop: () => void;
  onCancelCrop: () => void;
  onApplyPerspective: () => void;
  onCancelPerspective: () => void;
  cropArea: CropArea | null;
  onCropAreaChange: (crop: CropArea | null) => void;
  cropAspectRatio: number | null;
  setCropAspectRatio: (ratio: number | null) => void;
  // New Props
  getImageData: () => ImageData | null;
  onPreview: (imageData: ImageData | null) => void;
  onApplyFilter: (imageData: ImageData) => void;
  // Layer Props
  layers?: Layer[];
  activeLayerId?: string | null;
  selectedLayerIds?: string[];
  onLayerAction?: (action: string, ...args: any[]) => void;
  // Tool Settings
  brushSettings?: BrushSettings;
  onBrushSettingsChange?: (settings: BrushSettings) => void;
  brushColor?: string;
  onBrushColorChange?: (color: string) => void;
  gradientSettings?: GradientSettings;
  onGradientSettingsChange?: (settings: GradientSettings) => void;
  shapeSettings?: ShapeSettings;
  onShapeSettingsChange?: (settings: ShapeSettings) => void;
  penSettings?: PenSettings;
  onPenSettingsChange?: (settings: PenSettings) => void;
  cloneStampSettings?: CloneStampSettings;
  onCloneStampSettingsChange?: (settings: CloneStampSettings) => void;
  isSettingCloneSource?: boolean;
  onToggleCloneSourceMode?: () => void;
  textSettings?: {
    activeLayer?: TextLayer;
    onAddText: (text: Partial<TextLayer>) => void;
    onUpdateText: (id: string, updates: Partial<TextLayer>) => void;
  };
  aiTools?: {
    onApplyTool: (tool: AIToolType, options?: any) => Promise<void>;
    isProcessing: boolean;
  };
}
export const EditorSettingsPanel: React.FC<EditorSettingsPanelProps> = ({
  activeTool,
  filters,
  transform,
  onFilterChange,
  onTransformChange,
  annotationSettings,
  onApplyCrop,
  onCancelCrop,
  onApplyPerspective,
  onCancelPerspective,
  cropArea,
  onCropAreaChange,
  cropAspectRatio,
  setCropAspectRatio,
  getImageData,
  onPreview,
  onApplyFilter,
  layers = [],
  activeLayerId = null,
  selectedLayerIds = [],
  onLayerAction,
  brushSettings,
  onBrushSettingsChange,
  brushColor = '#000000',
  onBrushColorChange,
  gradientSettings,
  onGradientSettingsChange,
  shapeSettings,
  onShapeSettingsChange,
  penSettings,
  onPenSettingsChange,
  cloneStampSettings,
  onCloneStampSettingsChange,
  isSettingCloneSource = false,
  onToggleCloneSourceMode,
  textSettings,
  aiTools
}) => {
  const handleCropRatio = (ratio: number | null) => {
    setCropAspectRatio(ratio);
    if (!cropArea) return;
    if (ratio === null) {
      // Free crop - keep current dimensions
      return;
    }
    // Adjust crop area to match aspect ratio
    const currentRatio = cropArea.width / cropArea.height;
    if (currentRatio > ratio) {
      // Too wide, adjust width
      const newWidth = cropArea.height * ratio;
      onCropAreaChange({
        ...cropArea,
        x: cropArea.x + (cropArea.width - newWidth) / 2,
        width: newWidth
      });
    } else {
      // Too tall, adjust height
      const newHeight = cropArea.width / ratio;
      onCropAreaChange({
        ...cropArea,
        y: cropArea.y + (cropArea.height - newHeight) / 2,
        height: newHeight
      });
    }
  };
  const renderContent = () => {
    switch (activeTool) {
      case 'crop':
        return (
          <CropTool
            onApply={handleCropRatio}
            onCancel={onCancelCrop}
            currentAspectRatio={cropAspectRatio} />);


      case 'rotate':
        return <RotateTool transform={transform} onChange={onTransformChange} />;
      case 'filter':
        return <FilterTool filters={filters} onChange={onFilterChange} />;
      case 'annotate':
        return <AnnotationTool settings={annotationSettings} />;
      case 'perspective':
        return (
          <PerspectiveTool
            onApply={onApplyPerspective}
            onCancel={onCancelPerspective} />);


      // Layers
      case 'layers':
        return (
          <LayerPanel
            layers={layers}
            activeLayerId={activeLayerId}
            selectedLayerIds={selectedLayerIds}
            onSelectLayer={(id, add) => onLayerAction?.('select', id, add)}
            onSetActiveLayer={(id) => onLayerAction?.('setActive', id)}
            onVisibilityToggle={(id) => onLayerAction?.('toggleVisibility', id)}
            onLockToggle={(id) => onLayerAction?.('toggleLock', id)}
            onOpacityChange={(id, val) =>
            onLayerAction?.('setOpacity', id, val)
            }
            onBlendModeChange={(id, mode) =>
            onLayerAction?.('setBlendMode', id, mode)
            }
            onRename={(id, name) => onLayerAction?.('rename', id, name)}
            onDuplicate={(id) => onLayerAction?.('duplicate', id)}
            onDelete={(id) => onLayerAction?.('delete', id)}
            onReorder={(from, to) => onLayerAction?.('reorder', from, to)}
            onNewLayer={() => onLayerAction?.('new')}
            onCreateGroup={() => onLayerAction?.('createGroup')}
            onMergeSelected={() => onLayerAction?.('mergeSelected')}
            onMergeDown={(id) => onLayerAction?.('mergeDown', id)}
            onFlatten={() => onLayerAction?.('flatten')}
            onMoveUp={(id) => onLayerAction?.('moveUp', id)}
            onMoveDown={(id) => onLayerAction?.('moveDown', id)}
            onMoveToTop={(id) => onLayerAction?.('moveToTop', id)}
            onMoveToBottom={(id) => onLayerAction?.('moveToBottom', id)} />);


      // Selection Tools
      case 'rectangle-select':
      case 'ellipse-select':
      case 'polygon-select':
      case 'lasso-select':
      case 'magic-wand':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Selection Tool
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced selection with feather, expand/contract operations.
            </p>
            {/* Can implement specific selection settings here later */}
          </div>);

      // Filter Tools
      case 'blur':
        return (
          <BlurFilters
            onApply={onApplyFilter}
            getImageData={getImageData}
            onPreview={onPreview} />);


      case 'sharpen':
      case 'artistic':
        return (
          <ArtisticFilters
            onApply={onApplyFilter}
            getImageData={getImageData}
            onPreview={onPreview} />);


      // Color Tools
      case 'curves':
        return (
          <CurvesAdjustment
            onApply={onApplyFilter}
            getImageData={getImageData}
            onPreview={onPreview} />);


      case 'levels':
        return (
          <LevelsAdjustment
            onApply={onApplyFilter}
            getImageData={getImageData}
            onPreview={onPreview} />);


      case 'color-picker':
        return (
          <ColorPickerPanel
            color={brushColor}
            onChange={onBrushColorChange || (() => {})}
            onEyedropper={() => {}} // Could implement eyedropper mode
          />);

      case 'color-balance':
      case 'hue-saturation':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Color Adjustment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Professional color tools coming soon.
            </p>
          </div>);

      // Drawing Tools
      case 'brush':
        return brushSettings && onBrushSettingsChange ?
        <BrushTool
          settings={brushSettings}
          onSettingsChange={onBrushSettingsChange}
          color={brushColor}
          onColorChange={onBrushColorChange || (() => {})} /> :

        null;
      case 'gradient':
        return gradientSettings && onGradientSettingsChange ?
        <GradientTool
          settings={gradientSettings}
          onSettingsChange={onGradientSettingsChange} /> :

        null;
      case 'shape':
        return shapeSettings && onShapeSettingsChange ?
        <ShapeTool
          settings={shapeSettings}
          onSettingsChange={onShapeSettingsChange} /> :

        null;
      case 'pen':
        return penSettings && onPenSettingsChange ?
        <PenTool
          settings={penSettings}
          onSettingsChange={onPenSettingsChange} /> :

        null;
      case 'clone-stamp':
        return cloneStampSettings && onCloneStampSettingsChange ?
        <CloneStampTool
          settings={cloneStampSettings}
          onSettingsChange={onCloneStampSettingsChange}
          isSettingSource={isSettingCloneSource}
          onToggleSourceMode={onToggleCloneSourceMode || (() => {})} /> :

        null;
      // Transform Tools
      case 'free-transform':
        return (
          <div className="p-4 text-center text-gray-500">
            <p>Use handles on canvas to transform</p>
          </div>);

      case 'warp':
        return (
          <div className="p-4 text-center text-gray-500">
            <p>Use grid points on canvas to warp</p>
          </div>);

      case 'liquify':
        return (
          <LiquifyTool
            onApply={() => {}}
            onCancel={() => {}}
            width={500} // Should come from props
            height={500} // Should come from props
          />);

      // Text Tool
      case 'text':
        return textSettings ?
        <TextTool
          onAddText={textSettings.onAddText}
          activeTextLayer={textSettings.activeLayer}
          onUpdateText={textSettings.onUpdateText} /> :

        null;
      // AI Tools
      case 'ai-tools':
        return aiTools ?
        <AIToolsPanel
          onApplyTool={aiTools.onApplyTool}
          isProcessing={aiTools.isProcessing} /> :

        null;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
            <p className="text-sm">
              Select a tool from the toolbar to start editing.
            </p>
          </div>);

    }
  };
  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Settings</h3>
      </div>

      <div className="p-4 space-y-4">{renderContent()}</div>
    </div>);

};