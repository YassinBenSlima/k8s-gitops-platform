import React, { useCallback, useState } from 'react';
import { PaletteIcon } from 'lucide-react';
interface ArtisticFiltersProps {
  onApply: (imageData: ImageData) => void;
  getImageData: () => ImageData | null;
  onPreview: (imageData: ImageData | null) => void;
}
type ArtisticType =
'oilPaint' |
'pixelate' |
'posterize' |
'mosaic' |
'sketch' |
'cartoon';
export function ArtisticFilters({
  onApply,
  getImageData,
  onPreview
}: ArtisticFiltersProps) {
  const [filterType, setFilterType] = useState<ArtisticType>('oilPaint');
  const [intensity, setIntensity] = useState(5);
  const [levels, setLevels] = useState(6);
  const [blockSize, setBlockSize] = useState(10);
  const [edgeThreshold, setEdgeThreshold] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const applyFilter = useCallback(
    async (preview: boolean = false) => {
      const imageData = getImageData();
      if (!imageData) return;
      setIsProcessing(true);
      setTimeout(() => {
        let result: ImageData;
        switch (filterType) {
          case 'oilPaint':
            result = oilPaintFilter(imageData, intensity);
            break;
          case 'pixelate':
            result = pixelateFilter(imageData, blockSize);
            break;
          case 'posterize':
            result = posterizeFilter(imageData, levels);
            break;
          case 'mosaic':
            result = mosaicFilter(imageData, blockSize);
            break;
          case 'sketch':
            result = sketchFilter(imageData, edgeThreshold);
            break;
          case 'cartoon':
            result = cartoonFilter(imageData, levels, edgeThreshold);
            break;
          default:
            result = imageData;
        }
        if (preview) {
          onPreview(result);
        } else {
          onApply(result);
          onPreview(null);
        }
        setIsProcessing(false);
      }, 10);
    },
    [
    filterType,
    intensity,
    levels,
    blockSize,
    edgeThreshold,
    getImageData,
    onApply,
    onPreview]

  );
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <PaletteIcon className="w-4 h-4" />
        <span>Artistic Filters</span>
      </div>

      {/* Filter Type Selection */}
      <div className="grid grid-cols-2 gap-2">
        {(
        [
        'oilPaint',
        'pixelate',
        'posterize',
        'mosaic',
        'sketch',
        'cartoon'] as
        ArtisticType[]).
        map((type) =>
        <button
          key={type}
          onClick={() => setFilterType(type)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>

            {type === 'oilPaint' ?
          'Oil Paint' :
          type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        )}
      </div>

      {/* Oil Paint Controls */}
      {filterType === 'oilPaint' &&
      <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Brush Size</span>
            <span className="text-gray-300">{intensity}</span>
          </div>
          <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      }

      {/* Pixelate/Mosaic Controls */}
      {(filterType === 'pixelate' || filterType === 'mosaic') &&
      <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Block Size</span>
            <span className="text-gray-300">{blockSize}px</span>
          </div>
          <input
          type="range"
          min="2"
          max="50"
          value={blockSize}
          onChange={(e) => setBlockSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      }

      {/* Posterize Controls */}
      {filterType === 'posterize' &&
      <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Color Levels</span>
            <span className="text-gray-300">{levels}</span>
          </div>
          <input
          type="range"
          min="2"
          max="16"
          value={levels}
          onChange={(e) => setLevels(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      }

      {/* Sketch Controls */}
      {filterType === 'sketch' &&
      <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Edge Threshold</span>
            <span className="text-gray-300">{edgeThreshold}</span>
          </div>
          <input
          type="range"
          min="10"
          max="200"
          value={edgeThreshold}
          onChange={(e) => setEdgeThreshold(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

        </div>
      }

      {/* Cartoon Controls */}
      {filterType === 'cartoon' &&
      <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Color Levels</span>
              <span className="text-gray-300">{levels}</span>
            </div>
            <input
            type="range"
            min="2"
            max="12"
            value={levels}
            onChange={(e) => setLevels(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Edge Strength</span>
              <span className="text-gray-300">{edgeThreshold}</span>
            </div>
            <input
            type="range"
            min="10"
            max="150"
            value={edgeThreshold}
            onChange={(e) => setEdgeThreshold(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>
        </>
      }

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => applyFilter(true)}
          disabled={isProcessing}
          className="flex-1 px-3 py-2 text-sm bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors">

          Preview
        </button>
        <button
          onClick={() => applyFilter(false)}
          disabled={isProcessing}
          className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors">

          {isProcessing ? 'Processing...' : 'Apply'}
        </button>
      </div>
    </div>);

}
// Oil paint filter (Kuwahara filter)
function oilPaintFilter(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const regions: {
        r: number;
        g: number;
        b: number;
        variance: number;
      }[] = [];
      const quadrants = [
      {
        dx: [-radius, 0],
        dy: [-radius, 0]
      },
      {
        dx: [0, radius],
        dy: [-radius, 0]
      },
      {
        dx: [-radius, 0],
        dy: [0, radius]
      },
      {
        dx: [0, radius],
        dy: [0, radius]
      }];

      for (const quad of quadrants) {
        let sumR = 0,
          sumG = 0,
          sumB = 0;
        let sumR2 = 0,
          sumG2 = 0,
          sumB2 = 0;
        let count = 0;
        for (let dy = quad.dy[0]; dy <= quad.dy[1]; dy++) {
          for (let dx = quad.dx[0]; dx <= quad.dx[1]; dx++) {
            const px = Math.min(width - 1, Math.max(0, x + dx));
            const py = Math.min(height - 1, Math.max(0, y + dy));
            const idx = (py * width + px) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            sumR += r;
            sumG += g;
            sumB += b;
            sumR2 += r * r;
            sumG2 += g * g;
            sumB2 += b * b;
            count++;
          }
        }
        if (count > 0) {
          const avgR = sumR / count;
          const avgG = sumG / count;
          const avgB = sumB / count;
          const varR = sumR2 / count - avgR * avgR;
          const varG = sumG2 / count - avgG * avgG;
          const varB = sumB2 / count - avgB * avgB;
          regions.push({
            r: avgR,
            g: avgG,
            b: avgB,
            variance: varR + varG + varB
          });
        }
      }
      const best = regions.reduce((a, b) => a.variance < b.variance ? a : b);
      const outIdx = (y * width + x) * 4;
      result.data[outIdx] = Math.round(best.r);
      result.data[outIdx + 1] = Math.round(best.g);
      result.data[outIdx + 2] = Math.round(best.b);
      result.data[outIdx + 3] = data[outIdx + 3];
    }
  }
  return result;
}
// Pixelate filter
function pixelateFilter(imageData: ImageData, blockSize: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  for (let by = 0; by < height; by += blockSize) {
    for (let bx = 0; bx < width; bx += blockSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let y = by; y < Math.min(by + blockSize, height); y++) {
        for (let x = bx; x < Math.min(bx + blockSize, width); x++) {
          const idx = (y * width + x) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          count++;
        }
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      for (let y = by; y < Math.min(by + blockSize, height); y++) {
        for (let x = bx; x < Math.min(bx + blockSize, width); x++) {
          const idx = (y * width + x) * 4;
          result.data[idx] = r;
          result.data[idx + 1] = g;
          result.data[idx + 2] = b;
          result.data[idx + 3] = data[idx + 3];
        }
      }
    }
  }
  return result;
}
// Posterize filter
function posterizeFilter(imageData: ImageData, levels: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  const step = 255 / (levels - 1);
  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = Math.round(Math.round(result.data[i] / step) * step);
    result.data[i + 1] = Math.round(
      Math.round(result.data[i + 1] / step) * step
    );
    result.data[i + 2] = Math.round(
      Math.round(result.data[i + 2] / step) * step
    );
  }
  return result;
}
// Mosaic filter (circular blocks)
function mosaicFilter(imageData: ImageData, blockSize: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  // Fill with white first
  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = 255;
    result.data[i + 1] = 255;
    result.data[i + 2] = 255;
    result.data[i + 3] = 255;
  }
  const radius = blockSize / 2;
  for (let by = 0; by < height; by += blockSize) {
    for (let bx = 0; bx < width; bx += blockSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      const centerX = bx + radius;
      const centerY = by + radius;
      for (let y = by; y < Math.min(by + blockSize, height); y++) {
        for (let x = bx; x < Math.min(bx + blockSize, width); x++) {
          const idx = (y * width + x) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          count++;
        }
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      // Draw circle
      for (let y = by; y < Math.min(by + blockSize, height); y++) {
        for (let x = bx; x < Math.min(bx + blockSize, width); x++) {
          const dx = x - centerX;
          const dy = y - centerY;
          if (dx * dx + dy * dy <= radius * radius) {
            const idx = (y * width + x) * 4;
            result.data[idx] = r;
            result.data[idx + 1] = g;
            result.data[idx + 2] = b;
            result.data[idx + 3] = 255;
          }
        }
      }
    }
  }
  return result;
}
// Sketch filter
function sketchFilter(imageData: ImageData, threshold: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  // Convert to grayscale and detect edges
  const gray = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      gray[y * width + x] =
      0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    }
  }
  // Sobel edge detection
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const gx =
      -gray[(y - 1) * width + (x - 1)] +
      gray[(y - 1) * width + (x + 1)] +
      -2 * gray[y * width + (x - 1)] +
      2 * gray[y * width + (x + 1)] +
      -gray[(y + 1) * width + (x - 1)] +
      gray[(y + 1) * width + (x + 1)];
      const gy =
      -gray[(y - 1) * width + (x - 1)] -
      2 * gray[(y - 1) * width + x] -
      gray[(y - 1) * width + (x + 1)] +
      gray[(y + 1) * width + (x - 1)] +
      2 * gray[(y + 1) * width + x] +
      gray[(y + 1) * width + (x + 1)];
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const value = magnitude > threshold ? 0 : 255;
      const idx = (y * width + x) * 4;
      result.data[idx] = value;
      result.data[idx + 1] = value;
      result.data[idx + 2] = value;
      result.data[idx + 3] = 255;
    }
  }
  return result;
}
// Cartoon filter
function cartoonFilter(
imageData: ImageData,
levels: number,
edgeThreshold: number)
: ImageData {
  const { width, height, data } = imageData;
  // First posterize
  const posterized = posterizeFilter(imageData, levels);
  // Then detect edges
  const gray = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      gray[y * width + x] =
      0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    }
  }
  const result = new ImageData(
    new Uint8ClampedArray(posterized.data),
    width,
    height
  );
  // Apply edge detection and darken edges
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const gx =
      -gray[(y - 1) * width + (x - 1)] +
      gray[(y - 1) * width + (x + 1)] +
      -2 * gray[y * width + (x - 1)] +
      2 * gray[y * width + (x + 1)] +
      -gray[(y + 1) * width + (x - 1)] +
      gray[(y + 1) * width + (x + 1)];
      const gy =
      -gray[(y - 1) * width + (x - 1)] -
      2 * gray[(y - 1) * width + x] -
      gray[(y - 1) * width + (x + 1)] +
      gray[(y + 1) * width + (x - 1)] +
      2 * gray[(y + 1) * width + x] +
      gray[(y + 1) * width + (x + 1)];
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      if (magnitude > edgeThreshold) {
        const idx = (y * width + x) * 4;
        result.data[idx] = 0;
        result.data[idx + 1] = 0;
        result.data[idx + 2] = 0;
      }
    }
  }
  return result;
}