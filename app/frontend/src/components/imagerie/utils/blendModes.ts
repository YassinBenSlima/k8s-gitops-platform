// Blend mode calculations for layer compositing
// All blend modes operate on normalized RGB values (0-1)

export type BlendMode =
'normal' |
'multiply' |
'screen' |
'overlay' |
'softLight' |
'hardLight' |
'colorDodge' |
'colorBurn' |
'darken' |
'lighten' |
'difference' |
'exclusion' |
'hue' |
'saturation' |
'color' |
'luminosity';

export interface BlendModeInfo {
  id: BlendMode;
  name: string;
  description: string;
  category:
  'basic' |
  'darken' |
  'lighten' |
  'contrast' |
  'inversion' |
  'component';
}

export const BLEND_MODES: BlendModeInfo[] = [
{
  id: 'normal',
  name: 'Normal',
  description: 'Default blending',
  category: 'basic'
},
{
  id: 'multiply',
  name: 'Multiply',
  description: 'Darkens by multiplying colors',
  category: 'darken'
},
{
  id: 'screen',
  name: 'Screen',
  description: 'Lightens by inverting, multiplying, inverting',
  category: 'lighten'
},
{
  id: 'overlay',
  name: 'Overlay',
  description: 'Combines multiply and screen',
  category: 'contrast'
},
{
  id: 'softLight',
  name: 'Soft Light',
  description: 'Subtle contrast adjustment',
  category: 'contrast'
},
{
  id: 'hardLight',
  name: 'Hard Light',
  description: 'Strong contrast adjustment',
  category: 'contrast'
},
{
  id: 'colorDodge',
  name: 'Color Dodge',
  description: 'Brightens base color',
  category: 'lighten'
},
{
  id: 'colorBurn',
  name: 'Color Burn',
  description: 'Darkens base color',
  category: 'darken'
},
{
  id: 'darken',
  name: 'Darken',
  description: 'Keeps darker pixels',
  category: 'darken'
},
{
  id: 'lighten',
  name: 'Lighten',
  description: 'Keeps lighter pixels',
  category: 'lighten'
},
{
  id: 'difference',
  name: 'Difference',
  description: 'Subtracts colors',
  category: 'inversion'
},
{
  id: 'exclusion',
  name: 'Exclusion',
  description: 'Similar to difference, lower contrast',
  category: 'inversion'
},
{
  id: 'hue',
  name: 'Hue',
  description: 'Uses hue from blend layer',
  category: 'component'
},
{
  id: 'saturation',
  name: 'Saturation',
  description: 'Uses saturation from blend layer',
  category: 'component'
},
{
  id: 'color',
  name: 'Color',
  description: 'Uses hue and saturation from blend layer',
  category: 'component'
},
{
  id: 'luminosity',
  name: 'Luminosity',
  description: 'Uses luminosity from blend layer',
  category: 'component'
}];


// Helper functions for color space conversions
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return [0, 0, l];
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
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

  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    return [l, l, l];
  }

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

  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
}

function getLuminosity(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function setLuminosity(
r: number,
g: number,
b: number,
lum: number)
: [number, number, number] {
  const d = lum - getLuminosity(r, g, b);
  return clipColor(r + d, g + d, b + d);
}

function clipColor(r: number, g: number, b: number): [number, number, number] {
  const l = getLuminosity(r, g, b);
  const n = Math.min(r, g, b);
  const x = Math.max(r, g, b);

  let nr = r,
    ng = g,
    nb = b;

  if (n < 0) {
    nr = l + (r - l) * l / (l - n);
    ng = l + (g - l) * l / (l - n);
    nb = l + (b - l) * l / (l - n);
  }

  if (x > 1) {
    nr = l + (nr - l) * (1 - l) / (x - l);
    ng = l + (ng - l) * (1 - l) / (x - l);
    nb = l + (nb - l) * (1 - l) / (x - l);
  }

  return [
  Math.max(0, Math.min(1, nr)),
  Math.max(0, Math.min(1, ng)),
  Math.max(0, Math.min(1, nb))];

}

// Blend mode functions - all operate on normalized 0-1 values
const blendFunctions: Record<
  BlendMode,
  (base: number, blend: number) => number> =
{
  normal: (_, blend) => blend,
  multiply: (base, blend) => base * blend,
  screen: (base, blend) => 1 - (1 - base) * (1 - blend),
  overlay: (base, blend) =>
  base < 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend),
  softLight: (base, blend) => {
    if (blend < 0.5) {
      return base - (1 - 2 * blend) * base * (1 - base);
    }
    const d =
    base <= 0.25 ? ((16 * base - 12) * base + 4) * base : Math.sqrt(base);
    return base + (2 * blend - 1) * (d - base);
  },
  hardLight: (base, blend) =>
  blend < 0.5 ? 2 * base * blend : 1 - 2 * (1 - base) * (1 - blend),
  colorDodge: (base, blend) =>
  blend === 1 ? 1 : Math.min(1, base / (1 - blend)),
  colorBurn: (base, blend) =>
  blend === 0 ? 0 : Math.max(0, 1 - (1 - base) / blend),
  darken: (base, blend) => Math.min(base, blend),
  lighten: (base, blend) => Math.max(base, blend),
  difference: (base, blend) => Math.abs(base - blend),
  exclusion: (base, blend) => base + blend - 2 * base * blend,
  // Component modes are handled separately
  hue: (base) => base,
  saturation: (base) => base,
  color: (base) => base,
  luminosity: (base) => base
};

// Main blend function for RGB colors
export function blendColors(
baseR: number,
baseG: number,
baseB: number,
baseA: number,
blendR: number,
blendG: number,
blendB: number,
blendA: number,
mode: BlendMode,
opacity: number = 1)
: [number, number, number, number] {
  // Normalize to 0-1 if needed (assuming 0-255 input)
  const br = baseR / 255;
  const bg = baseG / 255;
  const bb = baseB / 255;
  const ba = baseA / 255;

  const lr = blendR / 255;
  const lg = blendG / 255;
  const lb = blendB / 255;
  const la = blendA / 255 * opacity;

  let resultR: number, resultG: number, resultB: number;

  // Handle component blend modes
  if (
  mode === 'hue' ||
  mode === 'saturation' ||
  mode === 'color' ||
  mode === 'luminosity')
  {
    const [baseH, baseS, baseL] = rgbToHsl(br, bg, bb);
    const [blendH, blendS, blendL] = rgbToHsl(lr, lg, lb);

    let h: number, s: number, l: number;

    switch (mode) {
      case 'hue':
        h = blendH;
        s = baseS;
        l = baseL;
        break;
      case 'saturation':
        h = baseH;
        s = blendS;
        l = baseL;
        break;
      case 'color':
        h = blendH;
        s = blendS;
        l = baseL;
        break;
      case 'luminosity':
        ;[resultR, resultG, resultB] = setLuminosity(
          br,
          bg,
          bb,
          getLuminosity(lr, lg, lb)
        );
        break;
      default:
        h = baseH;
        s = baseS;
        l = baseL;
    }

    if (mode !== 'luminosity') {
      ;[resultR, resultG, resultB] = hslToRgb(h!, s!, l!);
    }
  } else {
    // Standard blend modes
    const blendFn = blendFunctions[mode];
    resultR = blendFn(br, lr);
    resultG = blendFn(bg, lg);
    resultB = blendFn(bb, lb);
  }

  // Alpha compositing
  const resultA = ba + la * (1 - ba);

  if (resultA === 0) {
    return [0, 0, 0, 0];
  }

  // Blend with base using alpha
  const finalR = (resultR! * la + br * ba * (1 - la)) / resultA;
  const finalG = (resultG! * la + bg * ba * (1 - la)) / resultA;
  const finalB = (resultB! * la + bb * ba * (1 - la)) / resultA;

  return [
  Math.round(finalR * 255),
  Math.round(finalG * 255),
  Math.round(finalB * 255),
  Math.round(resultA * 255)];

}

// Apply blend mode to entire image data
export function applyBlendMode(
baseData: ImageData,
blendData: ImageData,
mode: BlendMode,
opacity: number = 1)
: ImageData {
  const result = new ImageData(baseData.width, baseData.height);
  const base = baseData.data;
  const blend = blendData.data;
  const out = result.data;

  for (let i = 0; i < base.length; i += 4) {
    const [r, g, b, a] = blendColors(
      base[i],
      base[i + 1],
      base[i + 2],
      base[i + 3],
      blend[i],
      blend[i + 1],
      blend[i + 2],
      blend[i + 3],
      mode,
      opacity
    );
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
    out[i + 3] = a;
  }

  return result;
}

// Get blend mode by category
export function getBlendModesByCategory(): Record<string, BlendModeInfo[]> {
  const categories: Record<string, BlendModeInfo[]> = {};

  for (const mode of BLEND_MODES) {
    if (!categories[mode.category]) {
      categories[mode.category] = [];
    }
    categories[mode.category].push(mode);
  }

  return categories;
}