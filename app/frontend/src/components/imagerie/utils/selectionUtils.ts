// Selection utilities and algorithms

export interface SelectionPoint {
  x: number;
  y: number;
}

export interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type SelectionMode = 'new' | 'add' | 'subtract' | 'intersect';

export interface Selection {
  id: string;
  name: string;
  type:
  'rectangle' |
  'ellipse' |
  'lasso' |
  'polygon' |
  'magnetic' |
  'quick' |
  'all';
  mask: ImageData;
  bounds: SelectionRect;
  feather: number;
  antiAlias: boolean;
}

// Generate unique selection ID
export function generateSelectionId(): string {
  return `sel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create empty selection mask
export function createEmptyMask(width: number, height: number): ImageData {
  return new ImageData(width, height);
}

// Create selection from rectangle
export function createRectangleSelection(
rect: SelectionRect,
canvasWidth: number,
canvasHeight: number,
feather: number = 0,
antiAlias: boolean = true)
: Selection {
  const mask = createEmptyMask(canvasWidth, canvasHeight);

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      const i = (y * canvasWidth + x) * 4;

      if (
      x >= rect.x &&
      x < rect.x + rect.width &&
      y >= rect.y &&
      y < rect.y + rect.height)
      {
        let alpha = 255;

        if (feather > 0) {
          // Calculate distance from edge
          const distX = Math.min(x - rect.x, rect.x + rect.width - x - 1);
          const distY = Math.min(y - rect.y, rect.y + rect.height - y - 1);
          const dist = Math.min(distX, distY);

          if (dist < feather) {
            alpha = Math.round(dist / feather * 255);
          }
        }

        mask.data[i] = alpha;
        mask.data[i + 1] = alpha;
        mask.data[i + 2] = alpha;
        mask.data[i + 3] = 255;
      }
    }
  }

  return {
    id: generateSelectionId(),
    name: 'Rectangle Selection',
    type: 'rectangle',
    mask,
    bounds: rect,
    feather,
    antiAlias
  };
}

// Create selection from ellipse
export function createEllipseSelection(
rect: SelectionRect,
canvasWidth: number,
canvasHeight: number,
feather: number = 0,
antiAlias: boolean = true)
: Selection {
  const mask = createEmptyMask(canvasWidth, canvasHeight);

  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const radiusX = rect.width / 2;
  const radiusY = rect.height / 2;

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      const i = (y * canvasWidth + x) * 4;

      // Normalized distance from center
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= 1) {
        let alpha = 255;

        if (feather > 0) {
          const edgeDist = (1 - dist) * Math.min(radiusX, radiusY);
          if (edgeDist < feather) {
            alpha = Math.round(edgeDist / feather * 255);
          }
        } else if (antiAlias && dist > 0.95) {
          alpha = Math.round((1 - (dist - 0.95) / 0.05) * 255);
        }

        mask.data[i] = alpha;
        mask.data[i + 1] = alpha;
        mask.data[i + 2] = alpha;
        mask.data[i + 3] = 255;
      }
    }
  }

  return {
    id: generateSelectionId(),
    name: 'Ellipse Selection',
    type: 'ellipse',
    mask,
    bounds: rect,
    feather,
    antiAlias
  };
}

// Create selection from polygon points
export function createPolygonSelection(
points: SelectionPoint[],
canvasWidth: number,
canvasHeight: number,
feather: number = 0)
: Selection {
  const mask = createEmptyMask(canvasWidth, canvasHeight);

  if (points.length < 3) {
    return {
      id: generateSelectionId(),
      name: 'Polygon Selection',
      type: 'polygon',
      mask,
      bounds: { x: 0, y: 0, width: 0, height: 0 },
      feather,
      antiAlias: true
    };
  }

  // Calculate bounds
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }

  // Point in polygon test using ray casting
  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      if (isPointInPolygon(x, y, points)) {
        const i = (y * canvasWidth + x) * 4;
        let alpha = 255;

        if (feather > 0) {
          const dist = distanceToPolygonEdge(x, y, points);
          if (dist < feather) {
            alpha = Math.round(dist / feather * 255);
          }
        }

        mask.data[i] = alpha;
        mask.data[i + 1] = alpha;
        mask.data[i + 2] = alpha;
        mask.data[i + 3] = 255;
      }
    }
  }

  return {
    id: generateSelectionId(),
    name: 'Polygon Selection',
    type: 'polygon',
    mask,
    bounds: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
    feather,
    antiAlias: true
  };
}

// Point in polygon test (ray casting algorithm)
function isPointInPolygon(
x: number,
y: number,
points: SelectionPoint[])
: boolean {
  let inside = false;
  const n = points.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = points[i].x,
      yi = points[i].y;
    const xj = points[j].x,
      yj = points[j].y;

    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

// Distance from point to polygon edge
function distanceToPolygonEdge(
x: number,
y: number,
points: SelectionPoint[])
: number {
  let minDist = Infinity;
  const n = points.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const dist = distanceToLineSegment(
      x,
      y,
      points[i].x,
      points[i].y,
      points[j].x,
      points[j].y
    );
    minDist = Math.min(minDist, dist);
  }

  return minDist;
}

// Distance from point to line segment
function distanceToLineSegment(
px: number,
py: number,
x1: number,
y1: number,
x2: number,
y2: number)
: number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
  }

  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));

  const nearestX = x1 + t * dx;
  const nearestY = y1 + t * dy;

  return Math.sqrt((px - nearestX) ** 2 + (py - nearestY) ** 2);
}

// Flood fill for magic wand / quick selection
export function floodFillSelection(
imageData: ImageData,
startX: number,
startY: number,
tolerance: number = 32,
contiguous: boolean = true)
: Selection {
  const { width, height, data } = imageData;
  const mask = createEmptyMask(width, height);

  const startIdx = (startY * width + startX) * 4;
  const targetR = data[startIdx];
  const targetG = data[startIdx + 1];
  const targetB = data[startIdx + 2];

  const visited = new Set<number>();

  const colorMatch = (idx: number): boolean => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const diff =
    Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB);
    return diff <= tolerance * 3;
  };

  if (contiguous) {
    // Flood fill from start point
    const stack: [number, number][] = [[startX, startY]];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const key = y * width + x;

      if (visited.has(key)) continue;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;

      const idx = key * 4;
      if (!colorMatch(idx)) continue;

      visited.add(key);

      mask.data[idx] = 255;
      mask.data[idx + 1] = 255;
      mask.data[idx + 2] = 255;
      mask.data[idx + 3] = 255;

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  } else {
    // Select all matching colors
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        if (colorMatch(idx)) {
          mask.data[idx] = 255;
          mask.data[idx + 1] = 255;
          mask.data[idx + 2] = 255;
          mask.data[idx + 3] = 255;
        }
      }
    }
  }

  // Calculate bounds
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (mask.data[idx] > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return {
    id: generateSelectionId(),
    name: 'Quick Selection',
    type: 'quick',
    mask,
    bounds: {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    },
    feather: 0,
    antiAlias: true
  };
}

// Combine selections
export function combineSelections(
selection1: Selection,
selection2: Selection,
mode: SelectionMode)
: Selection {
  const width = selection1.mask.width;
  const height = selection1.mask.height;
  const result = createEmptyMask(width, height);

  for (let i = 0; i < selection1.mask.data.length; i += 4) {
    const v1 = selection1.mask.data[i];
    const v2 = selection2.mask.data[i];

    let value: number;

    switch (mode) {
      case 'new':
        value = v2;
        break;
      case 'add':
        value = Math.min(255, v1 + v2);
        break;
      case 'subtract':
        value = Math.max(0, v1 - v2);
        break;
      case 'intersect':
        value = Math.min(v1, v2);
        break;
      default:
        value = v2;
    }

    result.data[i] = value;
    result.data[i + 1] = value;
    result.data[i + 2] = value;
    result.data[i + 3] = 255;
  }

  // Recalculate bounds
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (result.data[idx] > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return {
    id: generateSelectionId(),
    name: 'Combined Selection',
    type: selection2.type,
    mask: result,
    bounds: {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    },
    feather: selection2.feather,
    antiAlias: selection2.antiAlias
  };
}

// Feather selection
export function featherSelection(
selection: Selection,
radius: number)
: Selection {
  if (radius <= 0) return selection;

  const { width, height } = selection.mask;
  const result = createEmptyMask(width, height);

  // Apply Gaussian blur to the selection mask
  const kernel = createGaussianKernel(radius);
  const kernelSize = kernel.length;
  const halfKernel = Math.floor(kernelSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let weightSum = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = x + kx - halfKernel;
          const py = y + ky - halfKernel;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const idx = (py * width + px) * 4;
            const weight = kernel[ky][kx];
            sum += selection.mask.data[idx] * weight;
            weightSum += weight;
          }
        }
      }

      const idx = (y * width + x) * 4;
      const value = Math.round(sum / weightSum);
      result.data[idx] = value;
      result.data[idx + 1] = value;
      result.data[idx + 2] = value;
      result.data[idx + 3] = 255;
    }
  }

  return {
    ...selection,
    mask: result,
    feather: radius
  };
}

// Create Gaussian kernel
function createGaussianKernel(radius: number): number[][] {
  const size = radius * 2 + 1;
  const kernel: number[][] = [];
  const sigma = radius / 3;

  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      const dx = x - radius;
      const dy = y - radius;
      kernel[y][x] = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
    }
  }

  return kernel;
}

// Expand selection
export function expandSelection(
selection: Selection,
pixels: number)
: Selection {
  if (pixels === 0) return selection;

  const { width, height } = selection.mask;
  const result = createEmptyMask(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let maxValue = 0;

      for (let dy = -pixels; dy <= pixels; dy++) {
        for (let dx = -pixels; dx <= pixels; dx++) {
          const px = x + dx;
          const py = y + dy;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= pixels) {
              const idx = (py * width + px) * 4;
              maxValue = Math.max(maxValue, selection.mask.data[idx]);
            }
          }
        }
      }

      const idx = (y * width + x) * 4;
      result.data[idx] = maxValue;
      result.data[idx + 1] = maxValue;
      result.data[idx + 2] = maxValue;
      result.data[idx + 3] = 255;
    }
  }

  return {
    ...selection,
    mask: result
  };
}

// Contract selection
export function contractSelection(
selection: Selection,
pixels: number)
: Selection {
  if (pixels === 0) return selection;

  const { width, height } = selection.mask;
  const result = createEmptyMask(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let minValue = 255;

      for (let dy = -pixels; dy <= pixels; dy++) {
        for (let dx = -pixels; dx <= pixels; dx++) {
          const px = x + dx;
          const py = y + dy;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= pixels) {
              const idx = (py * width + px) * 4;
              minValue = Math.min(minValue, selection.mask.data[idx]);
            }
          }
        }
      }

      const idx = (y * width + x) * 4;
      result.data[idx] = minValue;
      result.data[idx + 1] = minValue;
      result.data[idx + 2] = minValue;
      result.data[idx + 3] = 255;
    }
  }

  return {
    ...selection,
    mask: result
  };
}

// Invert selection
export function invertSelection(selection: Selection): Selection {
  const { width, height } = selection.mask;
  const result = createEmptyMask(width, height);

  for (let i = 0; i < selection.mask.data.length; i += 4) {
    const inverted = 255 - selection.mask.data[i];
    result.data[i] = inverted;
    result.data[i + 1] = inverted;
    result.data[i + 2] = inverted;
    result.data[i + 3] = 255;
  }

  return {
    ...selection,
    mask: result
  };
}

// Select all
export function selectAll(width: number, height: number): Selection {
  const mask = createEmptyMask(width, height);

  for (let i = 0; i < mask.data.length; i += 4) {
    mask.data[i] = 255;
    mask.data[i + 1] = 255;
    mask.data[i + 2] = 255;
    mask.data[i + 3] = 255;
  }

  return {
    id: generateSelectionId(),
    name: 'All',
    type: 'all',
    mask,
    bounds: { x: 0, y: 0, width, height },
    feather: 0,
    antiAlias: false
  };
}

// Check if selection is empty
export function isSelectionEmpty(selection: Selection): boolean {
  for (let i = 0; i < selection.mask.data.length; i += 4) {
    if (selection.mask.data[i] > 0) return false;
  }
  return true;
}

// Get selection bounds
export function getSelectionBounds(selection: Selection): SelectionRect | null {
  const { width, height } = selection.mask;
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  let hasContent = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (selection.mask.data[idx] > 0) {
        hasContent = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (!hasContent) return null;

  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}