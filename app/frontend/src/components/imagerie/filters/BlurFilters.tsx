import React, { useCallback, useState } from 'react';
interface BlurFiltersProps {
  onApply: (imageData: ImageData) => void;
  getImageData: () => ImageData | null;
  onPreview: (imageData: ImageData | null) => void;
}
type BlurType = 'gaussian' | 'motion' | 'radial' | 'box';
export function BlurFilters({
  onApply,
  getImageData,
  onPreview
}: BlurFiltersProps) {
  const [blurType, setBlurType] = useState<BlurType>('gaussian');
  const [radius, setRadius] = useState(5);
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(20);
  const [centerX, setCenterX] = useState(50);
  const [centerY, setCenterY] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const applyBlur = useCallback(
    async (preview: boolean = false) => {
      const imageData = getImageData();
      if (!imageData) return;
      setIsProcessing(true);
      // Use setTimeout to allow UI to update
      setTimeout(() => {
        let result: ImageData;
        switch (blurType) {
          case 'gaussian':
            result = gaussianBlurFilter(imageData, radius);
            break;
          case 'motion':
            result = motionBlurFilter(imageData, angle, distance);
            break;
          case 'radial':
            result = radialBlurFilter(
              imageData,
              centerX / 100 * imageData.width,
              centerY / 100 * imageData.height,
              radius / 10
            );
            break;
          case 'box':
            result = boxBlurFilter(imageData, radius);
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
    blurType,
    radius,
    angle,
    distance,
    centerX,
    centerY,
    getImageData,
    onApply,
    onPreview]

  );
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
        <div className="w-4 h-4" />
        <span>Blur Filters</span>
      </div>

      {/* Blur Type Selection */}
      <div className="grid grid-cols-2 gap-2">
        {(['gaussian', 'motion', 'radial', 'box'] as BlurType[]).map((type) =>
        <button
          key={type}
          onClick={() => setBlurType(type)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${blurType === type ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>

            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        )}
      </div>

      {/* Common Radius Control */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Radius</span>
          <span className="text-gray-300">{radius}px</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

      </div>

      {/* Motion Blur Controls */}
      {blurType === 'motion' &&
      <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Angle</span>
              <span className="text-gray-300">{angle}°</span>
            </div>
            <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Distance</span>
              <span className="text-gray-300">{distance}px</span>
            </div>
            <input
            type="range"
            min="1"
            max="100"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>
        </>
      }

      {/* Radial Blur Controls */}
      {blurType === 'radial' &&
      <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Center X</span>
              <span className="text-gray-300">{centerX}%</span>
            </div>
            <input
            type="range"
            min="0"
            max="100"
            value={centerX}
            onChange={(e) => setCenterX(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Center Y</span>
              <span className="text-gray-300">{centerY}%</span>
            </div>
            <input
            type="range"
            min="0"
            max="100"
            value={centerY}
            onChange={(e) => setCenterY(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />

          </div>
        </>
      }

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => applyBlur(true)}
          disabled={isProcessing}
          className="flex-1 px-3 py-2 text-sm bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors">

          Preview
        </button>
        <button
          onClick={() => applyBlur(false)}
          disabled={isProcessing}
          className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors">

          {isProcessing ? 'Processing...' : 'Apply'}
        </button>
      </div>
    </div>);

}
// Gaussian blur implementation
function gaussianBlurFilter(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  const size = Math.ceil(radius * 3) * 2 + 1;
  const kernel: number[] = [];
  const sigma = radius / 2;
  let sum = 0;
  for (let i = 0; i < size; i++) {
    const x = i - Math.floor(size / 2);
    const g = Math.exp(-(x * x) / (2 * sigma * sigma));
    kernel.push(g);
    sum += g;
  }
  for (let i = 0; i < size; i++) {
    kernel[i] /= sum;
  }
  // Horizontal pass
  const temp = new Float32Array(width * height * 4);
  const half = Math.floor(size / 2);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let k = 0; k < size; k++) {
        const px = Math.min(width - 1, Math.max(0, x + k - half));
        const idx = (y * width + px) * 4;
        const weight = kernel[k];
        r += data[idx] * weight;
        g += data[idx + 1] * weight;
        b += data[idx + 2] * weight;
        a += data[idx + 3] * weight;
      }
      const outIdx = (y * width + x) * 4;
      temp[outIdx] = r;
      temp[outIdx + 1] = g;
      temp[outIdx + 2] = b;
      temp[outIdx + 3] = a;
    }
  }
  // Vertical pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let k = 0; k < size; k++) {
        const py = Math.min(height - 1, Math.max(0, y + k - half));
        const idx = (py * width + x) * 4;
        const weight = kernel[k];
        r += temp[idx] * weight;
        g += temp[idx + 1] * weight;
        b += temp[idx + 2] * weight;
        a += temp[idx + 3] * weight;
      }
      const outIdx = (y * width + x) * 4;
      result.data[outIdx] = Math.round(r);
      result.data[outIdx + 1] = Math.round(g);
      result.data[outIdx + 2] = Math.round(b);
      result.data[outIdx + 3] = Math.round(a);
    }
  }
  return result;
}
// Motion blur implementation
function motionBlurFilter(
imageData: ImageData,
angle: number,
distance: number)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  const radians = angle * Math.PI / 180;
  const dx = Math.cos(radians);
  const dy = Math.sin(radians);
  const samples = Math.ceil(distance);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      let count = 0;
      for (let i = -samples; i <= samples; i++) {
        const px = Math.round(x + dx * i * (distance / samples));
        const py = Math.round(y + dy * i * (distance / samples));
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const idx = (py * width + px) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          a += data[idx + 3];
          count++;
        }
      }
      const outIdx = (y * width + x) * 4;
      result.data[outIdx] = Math.round(r / count);
      result.data[outIdx + 1] = Math.round(g / count);
      result.data[outIdx + 2] = Math.round(b / count);
      result.data[outIdx + 3] = Math.round(a / count);
    }
  }
  return result;
}
// Radial blur implementation
function radialBlurFilter(
imageData: ImageData,
centerX: number,
centerY: number,
amount: number)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  const samples = Math.max(10, Math.ceil(amount * 20));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const blur = dist / Math.max(width, height) * amount;
      for (let i = 0; i < samples; i++) {
        const t = (i / samples - 0.5) * blur;
        const px = Math.round(centerX + dx * (1 + t));
        const py = Math.round(centerY + dy * (1 + t));
        let idx: number;
        if (px >= 0 && px < width && py >= 0 && py < height) {
          idx = (py * width + px) * 4;
        } else {
          idx = (y * width + x) * 4;
        }
        r += data[idx];
        g += data[idx + 1];
        b += data[idx + 2];
        a += data[idx + 3];
      }
      const outIdx = (y * width + x) * 4;
      result.data[outIdx] = Math.round(r / samples);
      result.data[outIdx + 1] = Math.round(g / samples);
      result.data[outIdx + 2] = Math.round(b / samples);
      result.data[outIdx + 3] = Math.round(a / samples);
    }
  }
  return result;
}
// Box blur implementation
function boxBlurFilter(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  const size = radius * 2 + 1;
  const area = size * size;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const px = Math.min(width - 1, Math.max(0, x + dx));
          const py = Math.min(height - 1, Math.max(0, y + dy));
          const idx = (py * width + px) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          a += data[idx + 3];
        }
      }
      const outIdx = (y * width + x) * 4;
      result.data[outIdx] = Math.round(r / area);
      result.data[outIdx + 1] = Math.round(g / area);
      result.data[outIdx + 2] = Math.round(b / area);
      result.data[outIdx + 3] = Math.round(a / area);
    }
  }
  return result;
}