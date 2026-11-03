import type { ReactNode } from "react";

export type SkagwayFaqItem = {
  question: string;
  answer: ReactNode;
};

export const SKAGWAY_FAQ: SkagwayFaqItem[] = [
  {
    question: "Why isn’t Skagway on the Mac App Store?",
    answer:
      "Not yet. The download on this page is the current app. A Mac App Store version is coming. It will have all the same features and 100% compatibility with the current version.",
  },
  {
    question: "Is Skagway really free?",
    answer:
      "Yes — the full app, every feature, no trial and no paid tier. Mach II Labs may sell other products later; Skagway stays free forever. No account required to download or use it.",
  },
  {
    question: "Does Skagway send my library or viewing data anywhere?",
    answer:
      "Absolutely not. No telemetry, no analytics, and no automatic upload of library paths, play history, browsing behavior, or anything else. Neither your videos nor any data associated with them ever leave your Mac unless you move them yourself. Optional update checks only ask whether a newer build exists — and only when you turn that on or choose Check for Updates.",
  },
  {
    question: "Does Skagway move or copy my video files?",
    answer:
      "No. Skagway indexes the folders you point it at and builds thumbnails and a catalog in the background — it does not import videos into a proprietary container or relocate your files. The .machii library file holds metadata and settings; your videos stay on disk where you put them.",
  },
];
