export interface ImageFilter {
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  blur: number; // 0 to 20
}

export interface ImageTransform {
  rotation: number; // degrees
  flipHorizontal: boolean;
  flipVertical: boolean;
  zoom: number;
  offsetX: number;
  offsetY: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PerspectivePoints {
  topLeft: {x: number;y: number;};
  topRight: {x: number;y: number;};
  bottomRight: {x: number;y: number;};
  bottomLeft: {x: number;y: number;};
}

export const defaultFilters: ImageFilter = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0
};

export const defaultTransform: ImageTransform = {
  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,
  zoom: 1,
  offsetX: 0,
  offsetY: 0
};

// Helper to load image
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Apply filters to a canvas context
export const applyFiltersToContext = (
ctx: CanvasRenderingContext2D,
filters: ImageFilter) =>
{
  const brightness = 100 + filters.brightness;
  const contrast = 100 + filters.contrast;
  const saturation = 100 + filters.saturation;

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${filters.blur}px)`;
};

// Calculate Homography Matrix
// Based on 4 pairs of points (src -> dst)
const calculateHomographyMatrix = (
src: PerspectivePoints,
dstWidth: number,
dstHeight: number) =>
{
  // Source points
  const x0 = src.topLeft.x,
    y0 = src.topLeft.y;
  const x1 = src.topRight.x,
    y1 = src.topRight.y;
  const x2 = src.bottomRight.x,
    y2 = src.bottomRight.y;
  const x3 = src.bottomLeft.x,
    y3 = src.bottomLeft.y;

  // Destination points (rectangle)
  const u0 = 0,
    v0 = 0;
  const u1 = dstWidth,
    v1 = 0;
  const u2 = dstWidth,
    v2 = dstHeight;
  const u3 = 0,
    v3 = dstHeight;

  const A = [
  [x0, y0, 1, 0, 0, 0, -u0 * x0, -u0 * y0],
  [0, 0, 0, x0, y0, 1, -v0 * x0, -v0 * y0],
  [x1, y1, 1, 0, 0, 0, -u1 * x1, -u1 * y1],
  [0, 0, 0, x1, y1, 1, -v1 * x1, -v1 * y1],
  [x2, y2, 1, 0, 0, 0, -u2 * x2, -u2 * y2],
  [0, 0, 0, x2, y2, 1, -v2 * x2, -v2 * y2],
  [x3, y3, 1, 0, 0, 0, -u3 * x3, -u3 * y3],
  [0, 0, 0, x3, y3, 1, -v3 * x3, -v3 * y3]];


  const b = [u0, v0, u1, v1, u2, v2, u3, v3];

  // Gaussian elimination to solve Ax = b
  const n = 8;
  for (let i = 0; i < n; i++) {
    // Search for maximum in this column
    let maxEl = Math.abs(A[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > maxEl) {
        maxEl = Math.abs(A[k][i]);
        maxRow = k;
      }
    }

    // Swap maximum row with current row
    for (let k = i; k < n; k++) {
      const tmp = A[maxRow][k];
      A[maxRow][k] = A[i][k];
      A[i][k] = tmp;
    }
    const tmp = b[maxRow];
    b[maxRow] = b[i];
    b[i] = tmp;

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const c = -A[k][i] / A[i][i];
      for (let j = i; j < n; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
      b[k] += c * b[i];
    }
  }

  // Solve equation Ax=b for an upper triangular matrix A
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = b[i] / A[i][i];
    for (let k = i - 1; k >= 0; k--) {
      b[k] -= A[k][i] * x[i];
    }
  }

  return [...x, 1]; // Returns the 9 elements of the homography matrix
};

// Apply perspective transform to create a new image
export const applyPerspectiveTransform = async (
image: HTMLImageElement,
points: PerspectivePoints)
: Promise<HTMLImageElement> => {
  // Calculate destination dimensions based on the bounding box of the points
  // or the average widths/heights to minimize distortion
  const widthTop = Math.sqrt(
    Math.pow(points.topRight.x - points.topLeft.x, 2) +
    Math.pow(points.topRight.y - points.topLeft.y, 2)
  );
  const widthBottom = Math.sqrt(
    Math.pow(points.bottomRight.x - points.bottomLeft.x, 2) +
    Math.pow(points.bottomRight.y - points.bottomLeft.y, 2)
  );
  const heightLeft = Math.sqrt(
    Math.pow(points.bottomLeft.x - points.topLeft.x, 2) +
    Math.pow(points.bottomLeft.y - points.topLeft.y, 2)
  );
  const heightRight = Math.sqrt(
    Math.pow(points.bottomRight.x - points.topRight.x, 2) +
    Math.pow(points.bottomRight.y - points.topRight.y, 2)
  );

  const dstWidth = Math.max(widthTop, widthBottom);
  const dstHeight = Math.max(heightLeft, heightRight);

  const canvas = document.createElement('canvas');
  canvas.width = dstWidth;
  canvas.height = dstHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Get homography matrix
  const h = calculateHomographyMatrix(points, dstWidth, dstHeight);

  // Inverse mapping for pixel interpolation
  // Since we don't have a simple inverse function for the 3x3 matrix here without a library,
  // we'll use a forward mapping approach with a dense mesh or pixel-by-pixel if performance allows.
  // For better performance in JS without WebGL, we can use a simple scanline approach or just
  // rely on the fact that we can transform the canvas context if we had a 3d context, but for 2d:

  // We will iterate over destination pixels and find source pixels (inverse warping)
  // But calculating inverse homography is complex without a matrix library.
  // Instead, let's use a simpler approximation or a library-free approach:
  // We'll iterate over the destination image pixels.

  // First, we need the inverse of matrix H to map dst -> src
  // Let's implement a simple 3x3 matrix inversion

  const invH = invertMatrix3x3(h);

  const imgData = ctx.createImageData(dstWidth, dstHeight);
  const data = imgData.data;

  // Draw original image to a temp canvas to get pixel data
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = image.width;
  tempCanvas.height = image.height;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('Could not get temp canvas context');
  tempCtx.drawImage(image, 0, 0);
  const srcData = tempCtx.getImageData(0, 0, image.width, image.height).data;

  for (let y = 0; y < dstHeight; y++) {
    for (let x = 0; x < dstWidth; x++) {
      // Apply inverse homography
      const w = invH[6] * x + invH[7] * y + invH[8];
      const srcX = (invH[0] * x + invH[1] * y + invH[2]) / w;
      const srcY = (invH[3] * x + invH[4] * y + invH[5]) / w;

      // Bilinear interpolation
      if (
      srcX >= 0 &&
      srcX < image.width - 1 &&
      srcY >= 0 &&
      srcY < image.height - 1)
      {
        const x0 = Math.floor(srcX);
        const y0 = Math.floor(srcY);
        const x1 = x0 + 1;
        const y1 = y0 + 1;

        const dx = srcX - x0;
        const dy = srcY - y0;

        const idx = (y * dstWidth + x) * 4;

        // Helper to get pixel value
        const getVal = (x: number, y: number, offset: number) =>
        srcData[(y * image.width + x) * 4 + offset];

        for (let c = 0; c < 3; c++) {
          const val =
          getVal(x0, y0, c) * (1 - dx) * (1 - dy) +
          getVal(x1, y0, c) * dx * (1 - dy) +
          getVal(x0, y1, c) * (1 - dx) * dy +
          getVal(x1, y1, c) * dx * dy;

          data[idx + c] = val;
        }
        data[idx + 3] = 255; // Alpha
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const newImage = new Image();
  newImage.src = canvas.toDataURL();
  await new Promise((resolve) => newImage.onload = resolve);
  return newImage;
};

// Helper to invert 3x3 matrix
const invertMatrix3x3 = (m: number[]) => {
  const det =
  m[0] * (m[4] * m[8] - m[7] * m[5]) -
  m[1] * (m[3] * m[8] - m[5] * m[6]) +
  m[2] * (m[3] * m[7] - m[4] * m[6]);

  const invDet = 1 / det;

  return [
  (m[4] * m[8] - m[7] * m[5]) * invDet,
  (m[2] * m[7] - m[1] * m[8]) * invDet,
  (m[1] * m[5] - m[2] * m[4]) * invDet,
  (m[5] * m[6] - m[3] * m[8]) * invDet,
  (m[0] * m[8] - m[2] * m[6]) * invDet,
  (m[3] * m[2] - m[0] * m[5]) * invDet,
  (m[3] * m[7] - m[6] * m[4]) * invDet,
  (m[6] * m[1] - m[0] * m[7]) * invDet,
  (m[0] * m[4] - m[3] * m[1]) * invDet];

};

// Apply crop to canvas
const applyCrop = (
canvas: HTMLCanvasElement,
ctx: CanvasRenderingContext2D,
image: HTMLImageElement,
cropArea: CropArea | null,
transform: ImageTransform,
filters: ImageFilter) =>
{
  if (!cropArea) {
    // No crop - use full image
    canvas.width = image.width;
    canvas.height = image.height;

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
  } else {
    // Apply crop
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    ctx.save();
    applyFiltersToContext(ctx, filters);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(transform.rotation * Math.PI / 180);
    ctx.scale(
      transform.flipHorizontal ? -1 : 1,
      transform.flipVertical ? -1 : 1
    );

    // Draw cropped portion
    ctx.drawImage(
      image,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      -cropArea.width / 2,
      -cropArea.height / 2,
      cropArea.width,
      cropArea.height
    );
    ctx.restore();
  }
};

// Generate the final image blob
export const generateFinalImage = async (
originalImage: HTMLImageElement,
transform: ImageTransform,
filters: ImageFilter,
annotations: any[],
cropArea: CropArea | null = null)
: Promise<Blob | null> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Apply crop and transformations
  applyCrop(canvas, ctx, originalImage, cropArea, transform, filters);

  // Draw annotations on top
  annotations.forEach((ann) => {
    drawAnnotationToContext(ctx, ann);
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
  });
};

// Helper to draw annotation to context
const drawAnnotationToContext = (ctx: CanvasRenderingContext2D, ann: any) => {
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
        ann.points.forEach((p: any) => ctx.lineTo(p.x, p.y));
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