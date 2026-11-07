import localFont from "next/font/local";

// The typefaces on the hidden /font-sample page, hosted locally like the site's own (see site-fonts.ts).

export const specialElite = localFont({ src: "./special-elite-latin.woff2", weight: "400", display: "swap" });
export const spaceGrotesk = localFont({ src: "./space-grotesk-latin.woff2", weight: "600 700", display: "swap" });
export const chakraPetch = localFont({
  src: [
    { path: "./chakra-petch-600-latin.woff2", weight: "600", style: "normal" },
    { path: "./chakra-petch-700-latin.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});
export const archivo = localFont({ src: "./archivo-latin.woff2", weight: "700 800", display: "swap" });
export const sora = localFont({ src: "./sora-latin.woff2", weight: "600 800", display: "swap" });
