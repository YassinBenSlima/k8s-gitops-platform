import { BlendMode, applyBlendMode } from './blendModes';

export interface Layer {
  id: string;
  name: string;
  type: 'raster' | 'adjustment' | 'text' | 'shape' | 'smart' | 'group';
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  position: {x: number;y: number;};
  size: {width: number;height: number;};
  imageData?: ImageData;
  thumbnail?: string;
  parentId?: string | null;
  children?: string[];
  mask?: LayerMask;
  effects?: LayerEffect[];
  metadata?: Record<string, any>;
}

export interface LayerMask {
  enabled: boolean;
  linked: boolean;
  imageData: ImageData;
  inverted: boolean;
}

export interface LayerEffect {
  id: string;
  type:
  'dropShadow' |
  'innerShadow' |
  'outerGlow' |
  'innerGlow' |
  'bevel' |
  'stroke' |
  'colorOverlay' |
  'gradientOverlay';
  enabled: boolean;
  settings: Record<string, any>;
}

export interface LayerGroup {
  id: string;
  name: string;
  expanded: boolean;
  layers: string[];
  blendMode: BlendMode;
  opacity: number;
  visible: boolean;
  locked: boolean;
}

export interface LayerState {
  layers: Layer[];
  activeLayerId: string | null;
  selectedLayerIds: string[];
  groups: LayerGroup[];
}

// Generate unique layer ID
export function generateLayerId(): string {
  return `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create a new empty layer
export function createEmptyLayer(
width: number,
height: number,
name?: string)
: Layer {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, width, height);

  return {
    id: generateLayerId(),
    name: name || 'New Layer',
    type: 'raster',
    visible: true,
    locked: false,
    opacity: 100,
    blendMode: 'normal',
    position: { x: 0, y: 0 },
    size: { width, height },
    imageData,
    thumbnail: canvas.toDataURL('image/png')
  };
}

// Create layer from image
export function createLayerFromImage(
image: HTMLImageElement | HTMLCanvasElement,
name?: string)
: Layer {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Generate thumbnail
  const thumbCanvas = document.createElement('canvas');
  const thumbSize = 64;
  const scale = Math.min(thumbSize / image.width, thumbSize / image.height);
  thumbCanvas.width = image.width * scale;
  thumbCanvas.height = image.height * scale;
  const thumbCtx = thumbCanvas.getContext('2d')!;
  thumbCtx.drawImage(image, 0, 0, thumbCanvas.width, thumbCanvas.height);

  return {
    id: generateLayerId(),
    name: name || 'Layer',
    type: 'raster',
    visible: true,
    locked: false,
    opacity: 100,
    blendMode: 'normal',
    position: { x: 0, y: 0 },
    size: { width: image.width, height: image.height },
    imageData,
    thumbnail: thumbCanvas.toDataURL('image/png')
  };
}

// Duplicate a layer
export function duplicateLayer(layer: Layer): Layer {
  const newImageData = layer.imageData ?
  new ImageData(
    new Uint8ClampedArray(layer.imageData.data),
    layer.imageData.width,
    layer.imageData.height
  ) :
  undefined;

  return {
    ...layer,
    id: generateLayerId(),
    name: `${layer.name} copy`,
    imageData: newImageData,
    mask: layer.mask ?
    {
      ...layer.mask,
      imageData: new ImageData(
        new Uint8ClampedArray(layer.mask.imageData.data),
        layer.mask.imageData.width,
        layer.mask.imageData.height
      )
    } :
    undefined,
    effects: layer.effects?.map((e) => ({ ...e, id: generateLayerId() }))
  };
}

// Merge two layers
export function mergeLayers(
bottomLayer: Layer,
topLayer: Layer,
canvasWidth: number,
canvasHeight: number)
: Layer {
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;

  // Draw bottom layer
  if (bottomLayer.imageData && bottomLayer.visible) {
    const bottomCanvas = document.createElement('canvas');
    bottomCanvas.width = bottomLayer.imageData.width;
    bottomCanvas.height = bottomLayer.imageData.height;
    const bottomCtx = bottomCanvas.getContext('2d')!;
    bottomCtx.putImageData(bottomLayer.imageData, 0, 0);

    ctx.globalAlpha = bottomLayer.opacity / 100;
    ctx.drawImage(bottomCanvas, bottomLayer.position.x, bottomLayer.position.y);
  }

  // Draw top layer with blend mode
  if (topLayer.imageData && topLayer.visible) {
    const topCanvas = document.createElement('canvas');
    topCanvas.width = topLayer.imageData.width;
    topCanvas.height = topLayer.imageData.height;
    const topCtx = topCanvas.getContext('2d')!;
    topCtx.putImageData(topLayer.imageData, 0, 0);

    ctx.globalAlpha = topLayer.opacity / 100;
    ctx.globalCompositeOperation = getCanvasBlendMode(topLayer.blendMode);
    ctx.drawImage(topCanvas, topLayer.position.x, topLayer.position.y);
  }

  const mergedImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

  // Generate thumbnail
  const thumbCanvas = document.createElement('canvas');
  const thumbSize = 64;
  const scale = Math.min(thumbSize / canvasWidth, thumbSize / canvasHeight);
  thumbCanvas.width = canvasWidth * scale;
  thumbCanvas.height = canvasHeight * scale;
  const thumbCtx = thumbCanvas.getContext('2d')!;
  thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);

  return {
    id: generateLayerId(),
    name: `${bottomLayer.name} + ${topLayer.name}`,
    type: 'raster',
    visible: true,
    locked: false,
    opacity: 100,
    blendMode: 'normal',
    position: { x: 0, y: 0 },
    size: { width: canvasWidth, height: canvasHeight },
    imageData: mergedImageData,
    thumbnail: thumbCanvas.toDataURL('image/png')
  };
}

// Flatten all visible layers
export function flattenLayers(
layers: Layer[],
canvasWidth: number,
canvasHeight: number)
: Layer {
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;

  // Fill with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw layers from bottom to top
  const sortedLayers = [...layers].reverse();

  for (const layer of sortedLayers) {
    if (!layer.visible || !layer.imageData) continue;

    const layerCanvas = document.createElement('canvas');
    layerCanvas.width = layer.imageData.width;
    layerCanvas.height = layer.imageData.height;
    const layerCtx = layerCanvas.getContext('2d')!;
    layerCtx.putImageData(layer.imageData, 0, 0);

    // Apply mask if present
    if (layer.mask?.enabled) {
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = layer.mask.imageData.width;
      maskCanvas.height = layer.mask.imageData.height;
      const maskCtx = maskCanvas.getContext('2d')!;
      maskCtx.putImageData(layer.mask.imageData, 0, 0);

      layerCtx.globalCompositeOperation = 'destination-in';
      layerCtx.drawImage(maskCanvas, 0, 0);
    }

    ctx.globalAlpha = layer.opacity / 100;
    ctx.globalCompositeOperation = getCanvasBlendMode(layer.blendMode);
    ctx.drawImage(layerCanvas, layer.position.x, layer.position.y);
  }

  const flattenedImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

  return {
    id: generateLayerId(),
    name: 'Flattened',
    type: 'raster',
    visible: true,
    locked: false,
    opacity: 100,
    blendMode: 'normal',
    position: { x: 0, y: 0 },
    size: { width: canvasWidth, height: canvasHeight },
    imageData: flattenedImageData,
    thumbnail: canvas.toDataURL('image/png')
  };
}

// Convert blend mode to canvas globalCompositeOperation
export function getCanvasBlendMode(
blendMode: BlendMode)
: GlobalCompositeOperation {
  const mapping: Record<BlendMode, GlobalCompositeOperation> = {
    normal: 'source-over',
    multiply: 'multiply',
    screen: 'screen',
    overlay: 'overlay',
    softLight: 'soft-light',
    hardLight: 'hard-light',
    colorDodge: 'color-dodge',
    colorBurn: 'color-burn',
    darken: 'darken',
    lighten: 'lighten',
    difference: 'difference',
    exclusion: 'exclusion',
    hue: 'hue',
    saturation: 'saturation',
    color: 'color',
    luminosity: 'luminosity'
  };
  return mapping[blendMode] || 'source-over';
}

// Update layer thumbnail
export function updateLayerThumbnail(layer: Layer): string {
  if (!layer.imageData) return '';

  const canvas = document.createElement('canvas');
  canvas.width = layer.imageData.width;
  canvas.height = layer.imageData.height;
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(layer.imageData, 0, 0);

  const thumbCanvas = document.createElement('canvas');
  const thumbSize = 64;
  const scale = Math.min(thumbSize / canvas.width, thumbSize / canvas.height);
  thumbCanvas.width = Math.max(1, canvas.width * scale);
  thumbCanvas.height = Math.max(1, canvas.height * scale);
  const thumbCtx = thumbCanvas.getContext('2d')!;
  thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);

  return thumbCanvas.toDataURL('image/png');
}

// Create layer mask from selection
export function createMaskFromSelection(
selectionData: ImageData,
invert: boolean = false)
: LayerMask {
  const maskData = new ImageData(selectionData.width, selectionData.height);

  for (let i = 0; i < selectionData.data.length; i += 4) {
    // Use red channel as mask value
    let value = selectionData.data[i];
    if (invert) value = 255 - value;

    maskData.data[i] = value;
    maskData.data[i + 1] = value;
    maskData.data[i + 2] = value;
    maskData.data[i + 3] = 255;
  }

  return {
    enabled: true,
    linked: true,
    imageData: maskData,
    inverted: invert
  };
}

// Apply mask to layer
export function applyMaskToLayer(layer: Layer): ImageData | null {
  if (!layer.imageData || !layer.mask?.enabled) {
    return layer.imageData || null;
  }

  const result = new ImageData(
    new Uint8ClampedArray(layer.imageData.data),
    layer.imageData.width,
    layer.imageData.height
  );

  const mask = layer.mask.imageData;

  for (let i = 0; i < result.data.length; i += 4) {
    // Use mask's red channel (grayscale) to modify alpha
    let maskValue = mask.data[i];
    if (layer.mask.inverted) maskValue = 255 - maskValue;

    result.data[i + 3] = Math.round(result.data[i + 3] * maskValue / 255);
  }

  return result;
}

// Reorder layers
export function reorderLayers(
layers: Layer[],
fromIndex: number,
toIndex: number)
: Layer[] {
  const result = [...layers];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

// Get layer bounds (non-transparent pixels)
export function getLayerBounds(
layer: Layer)
: {x: number;y: number;width: number;height: number;} | null {
  if (!layer.imageData) return null;

  const { data, width, height } = layer.imageData;
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  let hasContent = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > 0) {
        hasContent = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (!hasContent) return null;

  return {
    x: layer.position.x + minX,
    y: layer.position.y + minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}

// Trim layer to content
export function trimLayerToContent(layer: Layer): Layer {
  const bounds = getLayerBounds(layer);
  if (!bounds || !layer.imageData) return layer;

  const canvas = document.createElement('canvas');
  canvas.width = layer.imageData.width;
  canvas.height = layer.imageData.height;
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(layer.imageData, 0, 0);

  const trimmedData = ctx.getImageData(
    bounds.x - layer.position.x,
    bounds.y - layer.position.y,
    bounds.width,
    bounds.height
  );

  return {
    ...layer,
    position: { x: bounds.x, y: bounds.y },
    size: { width: bounds.width, height: bounds.height },
    imageData: trimmedData,
    thumbnail: updateLayerThumbnail({ ...layer, imageData: trimmedData })
  };
}