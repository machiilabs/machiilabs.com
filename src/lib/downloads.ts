export const PRODUCT_DOWNLOADS = {
  flasher: "https://downloads.machiilabs.com/15CEFlasher-1.3.0-217.dmg",
  winflasher: "https://downloads.machiilabs.com/15CEFlasher-Win-1.1.0-110.exe",
  skagway: "https://downloads.machiilabs.com/Skagway.dmg",
} as const;

export type DownloadProduct = keyof typeof PRODUCT_DOWNLOADS;

export function downloadApiPath(product: DownloadProduct): string {
  return `/api/download?product=${product}`;
}
