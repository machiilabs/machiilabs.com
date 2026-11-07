import localFont from "next/font/local";

// The site's fonts, hosted with the site instead of fetched from Google Fonts (2026-11-07). The build fetched them
// from Google every time and, lately, failed on the first attempt ("next/font/google queries have exactly one
// entry") and passed on a retry with no code change. Local files remove that fetch from the build, and visitors'
// browsers never contact Google either. Latin-only woff2 from Google Fonts, the subsets the site already used;
// licenses in ./licenses (SIL OFL; Apache 2.0 for Special Elite).

/** Inter, 400–800 upright and italic (variable). */
export const inter = localFont({
  src: [
    { path: "./inter-latin.woff2", weight: "400 800", style: "normal" },
    { path: "./inter-italic-latin.woff2", weight: "400 800", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

/** Instrument Sans, 400–600 (variable). */
export const instrument = localFont({
  src: "./instrument-sans-latin.woff2",
  weight: "400 600",
  variable: "--font-instrument",
  display: "swap",
});
