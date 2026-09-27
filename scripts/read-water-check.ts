import assert from "node:assert/strict";
import { readWater, type WaterReading } from "../src/lib/pond/read-water";
import type { Raster } from "../src/lib/pond/read-kit";

function raster(
  width: number,
  height: number,
  paint: (x: number, y: number) => [number, number, number],
): Raster {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = paint(x, y);
      const i = (y * width + x) * 4;
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
  return { width, height, data };
}

function read(
  paint: (x: number, y: number) => [number, number, number],
): WaterReading {
  const result = readWater(raster(80, 60, paint));
  assert.ok(result);
  return result;
}

const flat = read(() => [70, 140, 60]);
assert.equal(flat.color, "green");
assert.equal(flat.string_algae, "none");
assert.ok(flat.clarity === "murky" || flat.clarity === "cloudy");

const rocks = read((x, y) => ((x + y) % 4 < 2 ? [150, 140, 120] : [40, 38, 34]));
assert.equal(rocks.clarity, "clear");
assert.equal(rocks.string_algae, "none");

const strings = read((x, y) => {
  if (x % 6 === 0) return [40, 170, 50];
  return (x + y) % 4 < 2 ? [150, 140, 120] : [50, 48, 44];
});
assert.equal(strings.clarity, "clear");
assert.ok(strings.string_algae === "some" || strings.string_algae === "heavy");

const charcoal = read((x, y) => ((x + y) % 8 < 2 ? [90, 82, 70] : [54, 56, 58]));
assert.equal(charcoal.clarity, "clear");
assert.equal(charcoal.color, "clear");
assert.equal(charcoal.string_algae, "none");

console.log("pond photo checks passed");
