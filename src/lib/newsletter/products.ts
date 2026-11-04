/**
 * Each product's fixed identity in the newsletter. Issues pick a product by id
 * and supply only that issue's copy, so a product looks the same in every issue.
 * Changing an entry here is a design change (see the newsletter skill).
 */

export const NEWSLETTER_PRODUCTS = {
  skagway: {
    name: "Skagway",
    eyebrow: "Video organizer · Mac · Free",
    icon: { path: "shared/skagway-icon.png", width: 112, height: 112, alt: "Skagway icon" },
    ctaPath: "/skagway",
    requirements: "macOS 26 or later",
    tint: "#eef3f8",
  },
  flasher: {
    name: "15CE Flasher",
    eyebrow: "Calculator firmware · Mac & Windows · Free",
    icon: { path: "shared/flasher-icon.png", width: 112, height: 112, alt: "15CE Flasher icon" },
    ctaPath: "/flasher",
    requirements: "macOS 13+ · Windows 10/11 (64-bit) · official pogo cable",
    tint: "#f8f1e8",
  },
} as const;

export type NewsletterProductId = keyof typeof NEWSLETTER_PRODUCTS;
