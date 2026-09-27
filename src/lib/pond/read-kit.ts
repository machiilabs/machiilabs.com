/**
 * Read a 7-in-1 strip or a phosphate tube by matching its color to the
 * swatches printed on the card in the same photo. Lighting changes between
 * photos, so a stored picture of the card is not the scale.
 *
 * 7-in-1 framing: the strip stands on the left of the card.
 * Phosphate framing: the tube stands on the right of the card.
 */

export type Raster = {
  width: number;
  height: number;
  /** RGBA, row-major. */
  data: Uint8ClampedArray;
};

export type StripReading = {
  nitrate: string;
  nitrite: string;
  chlorine: string;
  alkalinity: string;
  ph: string;
  /** On the strip, not stored on the pond card. */
  hardness: string;
  carbonate: string;
};

export type PhosphateReading = {
  ppm: string;
};

const STRIP_ROWS = [
  { key: "nitrate", scale: ["0", "10", "25", "50", "100", "250", "500"] },
  { key: "nitrite", scale: ["0", "1", "5", "10", "20", "40", "80"] },
  { key: "hardness", scale: ["0", "25", "50", "120", "250", "425"] },
  { key: "chlorine", scale: ["0", "0.5", "1", "3", "5", "10", "20"] },
  { key: "alkalinity", scale: ["0", "40", "80", "120", "180", "240", "360"] },
  { key: "carbonate", scale: ["0", "40", "80", "120", "180", "240", "360"] },
  { key: "ph", scale: ["6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"] },
] as const;

const PHOSPHATE_SCALE = ["0.0", "0.25", "0.5", "1.0", "2.0", "5.0", "10.0"];

type Box = { x0: number; y0: number; x1: number; y1: number };

function saturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function lab(r: number, g: number, b: number): [number, number, number] {
  const pivot = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const R = pivot(r);
  const G = pivot(g);
  const B = pivot(b);
  const X = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  const Y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  const Z = R * 0.0193339 + G * 0.119192 + B * 0.9503041;
  const cube = (t: number) => (t > 0.008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116);
  const x = cube(X / 0.95047);
  const y = cube(Y);
  const z = cube(Z / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function pixel(raster: Raster, x: number, y: number): [number, number, number] {
  const i = (y * raster.width + x) * 4;
  return [raster.data[i], raster.data[i + 1], raster.data[i + 2]];
}

function medianColor(
  raster: Raster,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): [number, number, number] | null {
  const colors: [number, number, number][] = [];
  const left = Math.max(0, Math.floor(x0));
  const top = Math.max(0, Math.floor(y0));
  const right = Math.min(raster.width, Math.ceil(x1));
  const bottom = Math.min(raster.height, Math.ceil(y1));
  for (let y = top; y < bottom; y += 2) {
    for (let x = left; x < right; x += 2) {
      colors.push(pixel(raster, x, y));
    }
  }
  if (colors.length === 0) return null;
  colors.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  return colors[Math.floor(colors.length / 2)];
}

function coloredBlobs(raster: Raster, minX: number): Box[] {
  const { width, height } = raster;
  const step = Math.max(2, Math.round(width / 200));
  const cols = Math.ceil(width / step);
  const rows = Math.ceil(height / step);
  const mask = new Uint8Array(cols * rows);
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const [r, g, b] = pixel(raster, x, y);
      if (saturation(r, g, b) > 0.22 && Math.max(r, g, b) > 90 && Math.min(r, g, b) < 240) {
        mask[(y / step) * cols + x / step] = 1;
      }
    }
  }
  const seen = new Uint8Array(mask.length);
  const blobs: Box[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const start = y * cols + x;
      if (!mask[start] || seen[start]) continue;
      const stack = [x, y];
      seen[start] = 1;
      let minCX = x;
      let maxCX = x;
      let minCY = y;
      let maxCY = y;
      let count = 0;
      while (stack.length) {
        const cy = stack.pop()!;
        const cx = stack.pop()!;
        count++;
        if (cx < minCX) minCX = cx;
        if (cx > maxCX) maxCX = cx;
        if (cy < minCY) minCY = cy;
        if (cy > maxCY) maxCY = cy;
        const neighbors = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ];
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
          const ni = ny * cols + nx;
          if (!mask[ni] || seen[ni]) continue;
          seen[ni] = 1;
          stack.push(nx, ny);
        }
      }
      if (count < 8) continue;
      const box: Box = {
        x0: minCX * step,
        y0: minCY * step,
        x1: (maxCX + 1) * step,
        y1: (maxCY + 1) * step,
      };
      const bw = box.x1 - box.x0;
      const bh = box.y1 - box.y0;
      if (bh > height * 0.14 || bw > width * 0.22) continue;
      if (box.x0 < minX) continue;
      blobs.push(box);
    }
  }
  return blobs;
}

function clusterRows(blobs: Box[], height: number): Box[][] {
  const sorted = [...blobs].sort((a, b) => (a.y0 + a.y1) / 2 - (b.y0 + b.y1) / 2);
  const groups: Box[][] = [];
  const gap = height * 0.045;
  for (const blob of sorted) {
    const cy = (blob.y0 + blob.y1) / 2;
    const last = groups[groups.length - 1];
    const lastCy = last ? (last[last.length - 1].y0 + last[last.length - 1].y1) / 2 : 0;
    if (!last || cy - lastCy > gap) groups.push([blob]);
    else last.push(blob);
  }
  return groups.filter((group) => group.length >= 3);
}

function nearest(sample: [number, number, number], swatches: [number, number, number][]): number {
  const from = lab(...sample);
  let best = 0;
  let bestDistance = Infinity;
  swatches.forEach((swatch, index) => {
    const distance = colorDistance(from, lab(...swatch));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return bestDistance > 48 ? -1 : best;
}

export function readStrip(raster: Raster): StripReading | null {
  const rows = clusterRows(coloredBlobs(raster, raster.width * 0.12), raster.height);
  if (rows.length !== STRIP_ROWS.length) return null;

  const reading: Record<string, string> = {};
  let saturatedPads = 0;
  for (let rowIndex = 0; rowIndex < STRIP_ROWS.length; rowIndex++) {
    const { key, scale } = STRIP_ROWS[rowIndex];
    const blobs = [...rows[rowIndex]].sort((a, b) => a.x0 - b.x0);
    const centers = blobs.map((blob) => ({
      x: (blob.x0 + blob.x1) / 2,
      y: (blob.y0 + blob.y1) / 2,
    }));
    const pitches = centers.slice(1).map((center, index) => center.x - centers[index].x);
    pitches.sort((a, b) => a - b);
    const pitch = pitches[Math.floor(pitches.length / 2)];
    if (!pitch || pitch < 4) return null;
    const swatchWidth = blobs.reduce((sum, blob) => sum + (blob.x1 - blob.x0), 0) / blobs.length;
    const swatchHeight = blobs.reduce((sum, blob) => sum + (blob.y1 - blob.y0), 0) / blobs.length;
    const anchor = centers[centers.length - 1];
    const stripY = centers[0].y;
    const samples: [number, number, number][] = [];
    for (let i = 0; i < scale.length; i++) {
      const stepsFromRight = scale.length - 1 - i;
      const cx = anchor.x - stepsFromRight * pitch;
      const color = medianColor(
        raster,
        cx - swatchWidth * 0.28,
        anchor.y - swatchHeight * 0.28,
        cx + swatchWidth * 0.28,
        anchor.y + swatchHeight * 0.28,
      );
      if (!color) return null;
      samples.push(color);
    }
    const pad = medianColor(
      raster,
      raster.width * 0.02,
      stripY - swatchHeight * 0.22,
      raster.width * 0.12,
      stripY + swatchHeight * 0.22,
    );
    if (!pad) return null;
    if (saturation(...pad) > 0.2) saturatedPads++;
    const match = nearest(pad, samples);
    if (match < 0) return null;
    reading[key] = scale[match];
  }

  if (saturatedPads < 2) return null;
  return reading as StripReading;
}

export function readPhosphate(raster: Raster): PhosphateReading | null {
  const { width, height } = raster;
  const x0 = Math.floor(width * 0.18);
  const x1 = Math.floor(width * 0.4);
  const rowSaturated = (y: number, minimum: number) => {
    let saturated = 0;
    let count = 0;
    for (let x = x0; x < x1; x += 2) {
      const [r, g, b] = pixel(raster, x, y);
      count++;
      if (saturation(r, g, b) > 0.18 && Math.max(r, g, b) > minimum) saturated++;
    }
    return count ? saturated / count : 0;
  };
  const bars: { y0: number; y1: number }[] = [];
  let start: number | null = null;
  const minHeight = height * 0.04;
  for (let y = 0; y < height; y += 2) {
    if (rowSaturated(y, 110) > 0.6) {
      if (start === null) start = y;
    } else if (start !== null) {
      if (y - start > minHeight) bars.push({ y0: start, y1: y });
      start = null;
    }
  }
  if (start !== null && height - start > minHeight) bars.push({ y0: start, y1: height });
  const lastBar = bars[bars.length - 1];
  if (lastBar && bars.length === PHOSPHATE_SCALE.length - 1) {
    let darkStart: number | null = null;
    for (let y = lastBar.y1 + 4; y < height; y += 2) {
      if (rowSaturated(y, 60) > 0.6) {
        if (darkStart === null) darkStart = y;
      } else if (darkStart !== null) {
        if (y - darkStart > minHeight) bars.push({ y0: darkStart, y1: y });
        break;
      }
    }
  }
  if (bars.length !== PHOSPHATE_SCALE.length) return null;

  const swatches: [number, number, number][] = [];
  for (const bar of bars) {
    const color = medianColor(raster, x0, bar.y0 + 6, x1, bar.y1 - 6);
    if (!color) return null;
    swatches.push(color);
  }

  const tubeColors: [number, number, number][] = [];
  const tubeX0 = Math.floor(width * 0.62);
  const tubeX1 = Math.floor(width * 0.98);
  for (let y = Math.floor(height * 0.2); y < height * 0.9; y += 2) {
    let brightest: [number, number, number] | null = null;
    let brightestSum = -1;
    for (let x = tubeX0; x < tubeX1; x += 2) {
      const [r, g, b] = pixel(raster, x, y);
      if (!(saturation(r, g, b) > 0.28 && b >= g && b >= r && b > 80 && b < 210)) continue;
      const sum = r + g + b;
      if (sum > brightestSum) {
        brightestSum = sum;
        brightest = [r, g, b];
      }
    }
    if (brightest) tubeColors.push(brightest);
  }
  if (tubeColors.length < 30) return null;
  tubeColors.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  const tube = tubeColors[Math.floor(tubeColors.length / 2)];
  const match = nearest(tube, swatches);
  if (match < 0) return null;
  return { ppm: PHOSPHATE_SCALE[match] };
}
