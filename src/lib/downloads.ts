export const PRODUCT_DOWNLOADS = {
  flasher: "https://downloads.machiilabs.com/15CEFlasher-1.3.0-217.dmg",
  winflasher: "https://downloads.machiilabs.com/15CEFlasher-Win-1.1.0-110.exe",
  // Query busts Safari's sticky cache of /Skagway.dmg; object key is still Skagway.dmg.
  // Bump ?v= on each release. Sparkle appcast keeps the bare Skagway.dmg URL.
  skagway: "https://downloads.machiilabs.com/Skagway.dmg?v=1.2.0-1082",
} as const;

export type DownloadProduct = keyof typeof PRODUCT_DOWNLOADS;

export function downloadApiPath(product: DownloadProduct): string {
  return `/api/download?product=${product}`;
}
