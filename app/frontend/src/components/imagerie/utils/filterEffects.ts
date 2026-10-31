// Advanced filter effects and algorithms

export interface ConvolutionKernel {
  matrix: number[][];
  divisor?: number;
  offset?: number;
}

// Predefined kernels
export const KERNELS: Record<string, ConvolutionKernel> = {
  identity: {
    matrix: [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]]

  },
  sharpen: {
    matrix: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]]

  },
  sharpenStrong: {
    matrix: [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]]

  },
  blur: {
    matrix: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]],

    divisor: 9
  },
  gaussianBlur3x3: {
    matrix: [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]],

    divisor: 16
  },
  gaussianBlur5x5: {
    matrix: [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1]],

    divisor: 256
  },
  edgeDetect: {
    matrix: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]]

  },
  edgeDetectHorizontal: {
    matrix: [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]]

  },
  edgeDetectVertical: {
    matrix: [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]]

  },
  emboss: {
    matrix: [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]]

  },
  embossLight: {
    matrix: [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]],

    offset: 128
  }
};

// Apply convolution kernel to image
export function applyConvolution(
imageData: ImageData,
kernel: ConvolutionKernel)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  const { matrix, divisor = 1, offset = 0 } = kernel;

  const kSize = matrix.length;
  const kHalf = Math.floor(kSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = 0; ky < kSize; ky++) {
        for (let kx = 0; kx < kSize; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx - kHalf));
          const py = Math.min(height - 1, Math.max(0, y + ky - kHalf));
          const idx = (py * width + px) * 4;
          const weight = matrix[ky][kx];

          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
        }
      }

      const outIdx = (y * width + x) * 4;
      result.data[outIdx] = Math.max(0, Math.min(255, r / divisor + offset));
      result.data[outIdx + 1] = Math.max(0, Math.min(255, g / divisor + offset));
      result.data[outIdx + 2] = Math.max(0, Math.min(255, b / divisor + offset));
      result.data[outIdx + 3] = data[outIdx + 3];
    }
  }

  return result;
}

// Gaussian blur with variable radius
export function gaussianBlur(imageData: ImageData, radius: number): ImageData {
  if (radius <= 0) return imageData;

  const { width, height, data } = imageData;
  const result = new ImageData(width, height);

  // Create Gaussian kernel
  const size = Math.ceil(radius * 3) * 2 + 1;
  const kernel: number[] = [];
  const sigma = radius;
  let sum = 0;

  for (let i = 0; i < size; i++) {
    const x = i - Math.floor(size / 2);
    const g = Math.exp(-(x * x) / (2 * sigma * sigma));
    kernel.push(g);
    sum += g;
  }

  // Normalize kernel
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

// Motion blur
export function motionBlur(
imageData: ImageData,
angle: number,
distance: number)
: ImageData {
  if (distance <= 0) return imageData;

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
        const px = Math.round(x + dx * i);
        const py = Math.round(y + dy * i);

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

// Radial blur
export function radialBlur(
imageData: ImageData,
centerX: number,
centerY: number,
amount: number)
: ImageData {
  if (amount <= 0) return imageData;

  const { width, height, data } = imageData;
  const result = new ImageData(width, height);
  const samples = Math.ceil(amount * 10);

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

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const idx = (py * width + px) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          a += data[idx + 3];
        } else {
          const idx = (y * width + x) * 4;
          r += data[idx];
          g += data[idx + 1];
          b += data[idx + 2];
          a += data[idx + 3];
        }
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

// Unsharp mask
export function unsharpMask(
imageData: ImageData,
amount: number,
radius: number,
threshold: number)
: ImageData {
  const blurred = gaussianBlur(imageData, radius);
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const original = data[i + c];
      const blur = blurred.data[i + c];
      const diff = original - blur;

      if (Math.abs(diff) > threshold) {
        result.data[i + c] = Math.max(
          0,
          Math.min(255, original + diff * amount)
        );
      } else {
        result.data[i + c] = original;
      }
    }
    result.data[i + 3] = data[i + 3];
  }

  return result;
}

// Add noise
export function addNoise(
imageData: ImageData,
amount: number,
monochrome: boolean = false)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  for (let i = 0; i < result.data.length; i += 4) {
    if (monochrome) {
      const noise = (Math.random() - 0.5) * amount * 2;
      result.data[i] = Math.max(0, Math.min(255, result.data[i] + noise));
      result.data[i + 1] = Math.max(
        0,
        Math.min(255, result.data[i + 1] + noise)
      );
      result.data[i + 2] = Math.max(
        0,
        Math.min(255, result.data[i + 2] + noise)
      );
    } else {
      result.data[i] = Math.max(
        0,
        Math.min(255, result.data[i] + (Math.random() - 0.5) * amount * 2)
      );
      result.data[i + 1] = Math.max(
        0,
        Math.min(255, result.data[i + 1] + (Math.random() - 0.5) * amount * 2)
      );
      result.data[i + 2] = Math.max(
        0,
        Math.min(255, result.data[i + 2] + (Math.random() - 0.5) * amount * 2)
      );
    }
  }

  return result;
}

// Reduce noise (median filter)
export function reduceNoise(
imageData: ImageData,
radius: number = 1)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rValues: number[] = [];
      const gValues: number[] = [];
      const bValues: number[] = [];

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const px = Math.min(width - 1, Math.max(0, x + dx));
          const py = Math.min(height - 1, Math.max(0, y + dy));
          const idx = (py * width + px) * 4;

          rValues.push(data[idx]);
          gValues.push(data[idx + 1]);
          bValues.push(data[idx + 2]);
        }
      }

      rValues.sort((a, b) => a - b);
      gValues.sort((a, b) => a - b);
      bValues.sort((a, b) => a - b);

      const mid = Math.floor(rValues.length / 2);
      const outIdx = (y * width + x) * 4;

      result.data[outIdx] = rValues[mid];
      result.data[outIdx + 1] = gValues[mid];
      result.data[outIdx + 2] = bValues[mid];
      result.data[outIdx + 3] = data[outIdx + 3];
    }
  }

  return result;
}

// Pixelate
export function pixelate(imageData: ImageData, blockSize: number): ImageData {
  if (blockSize <= 1) return imageData;

  const { width, height, data } = imageData;
  const result = new ImageData(width, height);

  for (let by = 0; by < height; by += blockSize) {
    for (let bx = 0; bx < width; bx += blockSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Average colors in block
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

      // Fill block with average
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

// Oil paint effect (Kuwahara filter)
export function oilPaint(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const regions: {r: number;g: number;b: number;variance: number;}[] =
      [];

      // Four quadrants
      const quadrants = [
      { dx: [-radius, 0], dy: [-radius, 0] },
      { dx: [0, radius], dy: [-radius, 0] },
      { dx: [-radius, 0], dy: [0, radius] },
      { dx: [0, radius], dy: [0, radius] }];


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

      // Use region with lowest variance
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

// Posterize
export function posterize(imageData: ImageData, levels: number): ImageData {
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

// Vignette
export function vignette(
imageData: ImageData,
amount: number,
size: number = 0.5)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) / maxDist;

      const vignetteFactor =
      1 - Math.pow(Math.max(0, dist - (1 - size)) / size, 2) * amount;

      const idx = (y * width + x) * 4;
      result.data[idx] = Math.round(result.data[idx] * vignetteFactor);
      result.data[idx + 1] = Math.round(result.data[idx + 1] * vignetteFactor);
      result.data[idx + 2] = Math.round(result.data[idx + 2] * vignetteFactor);
    }
  }

  return result;
}

// Glow effect
export function glow(
imageData: ImageData,
radius: number,
intensity: number)
: ImageData {
  const blurred = gaussianBlur(imageData, radius);
  const { width, height, data } = imageData;
  const result = new ImageData(width, height);

  for (let i = 0; i < data.length; i += 4) {
    // Screen blend mode
    for (let c = 0; c < 3; c++) {
      const base = data[i + c] / 255;
      const blend = blurred.data[i + c] / 255 * intensity;
      result.data[i + c] = Math.round((1 - (1 - base) * (1 - blend)) * 255);
    }
    result.data[i + 3] = data[i + 3];
  }

  return result;
}

// Curves adjustment
export function applyCurves(
imageData: ImageData,
curve // 256 values mapping input to output
: number[]): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = curve[result.data[i]];
    result.data[i + 1] = curve[result.data[i + 1]];
    result.data[i + 2] = curve[result.data[i + 2]];
  }

  return result;
}

// Levels adjustment
export function applyLevels(
imageData: ImageData,
inputBlack: number,
inputWhite: number,
gamma: number,
outputBlack: number,
outputWhite: number)
: ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  const inputRange = inputWhite - inputBlack;
  const outputRange = outputWhite - outputBlack;

  for (let i = 0; i < result.data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      let value = result.data[i + c];

      // Input levels
      value = (value - inputBlack) / inputRange;
      value = Math.max(0, Math.min(1, value));

      // Gamma
      value = Math.pow(value, 1 / gamma);

      // Output levels
      value = value * outputRange + outputBlack;

      result.data[i + c] = Math.round(Math.max(0, Math.min(255, value)));
    }
  }

  return result;
}

// Color temperature adjustment
export function adjustColorTemperature(
imageData: ImageData,
temperature // -100 to 100
: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  const t = temperature / 100;

  for (let i = 0; i < result.data.length; i += 4) {
    if (t > 0) {
      // Warmer (more red/yellow)
      result.data[i] = Math.min(255, result.data[i] + t * 30);
      result.data[i + 1] = Math.min(255, result.data[i + 1] + t * 10);
      result.data[i + 2] = Math.max(0, result.data[i + 2] - t * 20);
    } else {
      // Cooler (more blue)
      result.data[i] = Math.max(0, result.data[i] + t * 20);
      result.data[i + 1] = Math.min(255, result.data[i + 1] - t * 5);
      result.data[i + 2] = Math.min(255, result.data[i + 2] - t * 30);
    }
  }

  return result;
}

// Vibrance adjustment
export function adjustVibrance(
imageData: ImageData,
amount // -100 to 100
: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  const v = amount / 100;

  for (let i = 0; i < result.data.length; i += 4) {
    const r = result.data[i];
    const g = result.data[i + 1];
    const b = result.data[i + 2];

    const max = Math.max(r, g, b);
    const avg = (r + g + b) / 3;
    const saturation = max === 0 ? 0 : 1 - avg / max;

    // Apply more to less saturated colors
    const factor = 1 + v * (1 - saturation);

    result.data[i] = Math.max(0, Math.min(255, avg + (r - avg) * factor));
    result.data[i + 1] = Math.max(0, Math.min(255, avg + (g - avg) * factor));
    result.data[i + 2] = Math.max(0, Math.min(255, avg + (b - avg) * factor));
  }

  return result;
}

// Hue/Saturation/Lightness adjustment
export function adjustHSL(
imageData: ImageData,
hueShift: number, // -180 to 180
saturation: number, // -100 to 100
lightness // -100 to 100
: number): ImageData {
  const { width, height, data } = imageData;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);

  for (let i = 0; i < result.data.length; i += 4) {
    const r = result.data[i] / 255;
    const g = result.data[i + 1] / 255;
    const b = result.data[i + 2] / 255;

    // RGB to HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    // Apply adjustments
    h = (h + hueShift / 360 + 1) % 1;
    s = Math.max(0, Math.min(1, s * (1 + saturation / 100)));
    l = Math.max(0, Math.min(1, l + lightness / 100));

    // HSL to RGB
    let r2, g2, b2;

    if (s === 0) {
      r2 = g2 = b2 = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r2 = hue2rgb(p, q, h + 1 / 3);
      g2 = hue2rgb(p, q, h);
      b2 = hue2rgb(p, q, h - 1 / 3);
    }

    result.data[i] = Math.round(r2 * 255);
    result.data[i + 1] = Math.round(g2 * 255);
    result.data[i + 2] = Math.round(b2 * 255);
  }

  return result;
}

// Calculate histogram
export function calculateHistogram(imageData: ImageData): {
  r: number[];
  g: number[];
  b: number[];
  luminance: number[];
} {
  const r = new Array(256).fill(0);
  const g = new Array(256).fill(0);
  const b = new Array(256).fill(0);
  const luminance = new Array(256).fill(0);

  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    r[data[i]]++;
    g[data[i + 1]]++;
    b[data[i + 2]]++;

    const lum = Math.round(
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    );
    luminance[lum]++;
  }

  return { r, g, b, luminance };
}