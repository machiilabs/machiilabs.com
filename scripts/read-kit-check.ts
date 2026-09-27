import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { inflateSync } from "node:zlib";
import { readPhosphate, readStrip, type Raster } from "../src/lib/pond/read-kit";

function pngRaster(path: string): Raster {
  const dir = mkdtempSync(join(tmpdir(), "pond-kit-"));
  const pngPath = join(dir, "kit.png");
  execFileSync("sips", ["-s", "format", "png", path, "--out", pngPath], {
    stdio: "ignore",
  });
  const data = readFileSync(pngPath);
  const signature = data.subarray(0, 8).toString("binary");
  assert.equal(signature, "\x89PNG\r\n\x1a\n");
  let pos = 8;
  let width = 0;
  let height = 0;
  let color = 0;
  const idat: Buffer[] = [];
  while (pos < data.length) {
    const length = data.readUInt32BE(pos);
    const type = data.subarray(pos + 4, pos + 8).toString("ascii");
    const chunk = data.subarray(pos + 8, pos + 8 + length);
    pos += 12 + length;
    if (type === "IHDR") {
      width = chunk.readUInt32BE(0);
      height = chunk.readUInt32BE(4);
      color = chunk[9];
    } else if (type === "IDAT") {
      idat.push(chunk);
    } else if (type === "IEND") {
      break;
    }
  }
  const raw = inflateSync(Buffer.concat(idat));
  const bpp = color === 6 ? 4 : 3;
  const stride = width * bpp;
  const rgba = new Uint8ClampedArray(width * height * 4);
  let offset = 0;
  const prev = Buffer.alloc(stride);
  const row = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[offset];
    offset += 1;
    raw.copy(row, 0, offset, offset + stride);
    offset += stride;
    if (filter === 1) {
      for (let x = 0; x < stride; x++) row[x] = (row[x] + (x >= bpp ? row[x - bpp] : 0)) & 255;
    } else if (filter === 2) {
      for (let x = 0; x < stride; x++) row[x] = (row[x] + prev[x]) & 255;
    } else if (filter === 3) {
      for (let x = 0; x < stride; x++) {
        const left = x >= bpp ? row[x - bpp] : 0;
        row[x] = (row[x] + ((left + prev[x]) >> 1)) & 255;
      }
    } else if (filter === 4) {
      for (let x = 0; x < stride; x++) {
        const a = x >= bpp ? row[x - bpp] : 0;
        const b = prev[x];
        const c = x >= bpp ? prev[x - bpp] : 0;
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        row[x] = (row[x] + pr) & 255;
      }
    } else if (filter !== 0) {
      throw new Error(`png filter ${filter}`);
    }
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      rgba[i] = row[x * bpp];
      rgba[i + 1] = row[x * bpp + 1];
      rgba[i + 2] = row[x * bpp + 2];
      rgba[i + 3] = 255;
    }
    row.copy(prev);
  }
  return { width, height, data: rgba };
}

const root = new URL("../reference/pond-kits/", import.meta.url);
const strip = readStrip(pngRaster(new URL("7in1-strip.jpg", root).pathname));
const phosphate = readPhosphate(pngRaster(new URL("phosphate-tube.jpg", root).pathname));
const stripCardOnly = readStrip(pngRaster(new URL("7in1-card.jpg", root).pathname));
const phosphateCardOnly = readPhosphate(pngRaster(new URL("phosphate-card.jpg", root).pathname));

console.log("strip", strip);
console.log("phosphate", phosphate);

assert.ok(strip);
assert.ok(["0", "10"].includes(strip.nitrate));
assert.equal(strip.nitrite, "0");
assert.ok(["0", "0.5"].includes(strip.chlorine));
assert.ok(["80", "120", "180"].includes(strip.alkalinity));
assert.ok(["7.0", "7.5"].includes(strip.ph));
assert.ok(phosphate);
assert.equal(phosphate.ppm, "5.0");
assert.equal(stripCardOnly, null);
assert.equal(phosphateCardOnly, null);
