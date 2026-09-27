/**
 * Judge a pond photo on the phone. The picture stays on the card either way.
 * The walls are charcoal-gray Pond Shield. That gray is the coating showing
 * through clear water, so it is not counted as the water's color.
 * A flat green frame is cloudy or murky water, not string algae. String algae
 * needs green that changes across the frame, the way filaments do on rock.
 */

import type { Raster } from "@/lib/pond/read-kit";
import type { DebrisLevel, StringAlgae, WaterClarity } from "@/lib/pond/types";

export type WaterReading = {
  clarity: WaterClarity;
  color: string;
  string_algae: StringAlgae;
  debris: DebrisLevel;
  note: string;
};

function hsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const span = 255 - Math.abs(2 * l - 255);
  const s = d === 0 || span === 0 ? 0 : d / span;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

export function readWater(raster: Raster): WaterReading | null {
  const { width, height, data } = raster;
  if (width < 24 || height < 24) return null;
  const x0 = Math.floor(width * 0.08);
  const x1 = Math.ceil(width * 0.92);
  const y0 = Math.floor(height * 0.12);
  const y1 = Math.ceil(height * 0.92);

  const at = (x: number, y: number): [number, number, number] => {
    const i = (y * width + x) * 4;
    return [data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0];
  };

  let seen = 0;
  let wall = 0;
  let n = 0;
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let contrastSum = 0;
  let green = 0;
  let greenTextured = 0;
  let specks = 0;

  for (let y = y0; y < y1; y += 2) {
    for (let x = x0; x < x1; x += 2) {
      const [r, g, b] = at(x, y);
      const { h, s, l } = hsl(r, g, b);
      if (l > 230 && s < 0.12) continue;
      seen += 1;
      const [r2, g2, b2] = at(Math.min(x + 1, width - 1), y);
      const contrast = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
      contrastSum += contrast;
      // Charcoal Pond Shield. Dark and nearly neutral.
      const isWall = s < 0.14 && l >= 20 && l <= 120;
      if (isWall) {
        wall += 1;
        continue;
      }
      n += 1;
      sumR += r;
      sumG += g;
      sumB += b;
      const isGreen = h >= 75 && h <= 165 && s >= 0.22 && l >= 30 && l <= 200;
      if (isGreen) {
        green += 1;
        if (contrast > 40) greenTextured += 1;
      }
      const up = hsl(...at(x, Math.max(y - 2, 0)));
      if (l > 190 && s < 0.18 && up.l < 140) specks += 1;
    }
  }

  if (seen < 40) return null;
  const wallFrac = wall / seen;
  const mean = n > 0 ? hsl(sumR / n, sumG / n, sumB / n) : { h: 0, s: 0, l: 0 };
  const contrast = contrastSum / seen;
  const greenFrac = green / seen;
  const texture = green === 0 ? 0 : greenTextured / green;
  const speckFrac = specks / seen;
  const wallsShowing = wallFrac > 0.45;

  let color = "gray";
  if (n < 15 || (wallsShowing && mean.s < 0.12)) color = "clear";
  else if (mean.s < 0.1) color = mean.l > 170 ? "pale" : "gray";
  else if (mean.h >= 75 && mean.h <= 165) color = "green";
  else if (mean.h >= 15 && mean.h < 75) color = "brown";
  else if (mean.h > 165 && mean.h < 260) color = "blue";

  let clarity: WaterClarity;
  if (wallsShowing && color !== "green") clarity = "clear";
  else if (contrast >= 36) clarity = "clear";
  else if (contrast >= 18) clarity = "slightly_hazy";
  else if (color === "green" && mean.l < 120) clarity = "murky";
  else clarity = "cloudy";

  let string_algae: StringAlgae = "none";
  if (clarity === "clear" || clarity === "slightly_hazy") {
    if (greenFrac > 0.22 && texture > 0.45) string_algae = "heavy";
    else if (greenFrac > 0.08 && texture > 0.35) string_algae = "some";
  }

  let debris: DebrisLevel = "none";
  if (speckFrac > 0.06) debris = "heavy";
  else if (speckFrac > 0.015) debris = "light";

  const clarityLabel = {
    clear: "clear",
    slightly_hazy: "slightly hazy",
    cloudy: "cloudy",
    murky: "murky",
  }[clarity];
  const algaeLabel = {
    none: "no string algae",
    some: "some string algae",
    heavy: "heavy string algae",
  }[string_algae];

  return {
    clarity,
    color,
    string_algae,
    debris,
    note: `From the photo: ${clarityLabel}, ${color}, ${algaeLabel}. Change anything that looks wrong.`,
  };
}
