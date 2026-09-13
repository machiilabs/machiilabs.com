import type { ReactNode } from "react";

export type SkagwayFaqItem = {
  question: string;
  answer: ReactNode;
};

export const SKAGWAY_FAQ: SkagwayFaqItem[] = [
  {
    question: "Why isn’t Skagway on the Mac App Store?",
    answer:
      "Skagway is distributed as a notarized Developer ID app from machiilabs.com, not through the Mac App Store. App Store apps run in a sandbox that limits how deeply software can browse your drives. Skagway needs full access to the folders you choose — including external and network volumes — and keeps your videos exactly where they already live. That workflow isn’t compatible with Mac App Store sandbox rules, so we ship direct instead.",
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
  {
    question: "Do I need ffmpeg to use Skagway?",
    answer: (
      <>
        No. Skagway plays your library directly — browse, tag, filter, and
        organize with no conversion step and no ffmpeg required. ffmpeg only
        matters if you choose{" "}
        <strong className="font-semibold text-snow">
          Fix for Built-in Player…
        </strong>
        , an optional right-click tool for the occasional file that won&apos;t
        play in Skagway&apos;s built-in player, usually because of an obscure
        format. You can also use Play in External Player for those files
        instead. If you do want the repair tool,
        Skagway auto-detects Homebrew and common install locations, or you can
        point it at the binary under Settings → Tools.
      </>
    ),
  },
];
