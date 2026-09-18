export const PRODUCT_DOWNLOADS = {
  flasher: "https://downloads.machiilabs.com/15CEFlasher-1.3.0-217.dmg",
  winflasher: "https://downloads.machiilabs.com/15CEFlasher-Win-1.1.0-110.exe",
  // Versioned object name so browsers don't reuse a cached Skagway.dmg from a prior release.
  // Sparkle still uses the stable Skagway.dmg enclosure URL.
  skagway: "https://downloads.machiilabs.com/Skagway-1.2.0-1082.dmg",
} as const;

export type DownloadProduct = keyof typeof PRODUCT_DOWNLOADS;

export function downloadApiPath(product: DownloadProduct): string {
  return `/api/download?product=${product}`;
}
