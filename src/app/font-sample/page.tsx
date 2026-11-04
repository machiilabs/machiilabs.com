import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Font sample",
  robots: { index: false, follow: false },
};

const earlierCandidates = [
  { name: "Special Elite", note: "Grungy typewriter" },
  { name: "Space Grotesk", note: "Aerospace geometric" },
  { name: "Chakra Petch", note: "Technical / angular" },
  { name: "Archivo", note: "Industrial sturdy" },
  { name: "Sora", note: "Modern geometric" },
] as const;

export default function FontSamplePage() {
  return (
    <div className="min-h-dvh bg-ink text-snow">
      <SiteHeader />
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Display font samples
        </h1>
        <p className="mt-2 text-fog">
          Inter is the live display face. It is served from this site, not
          Google Fonts.
        </p>

        <p className="font-display mt-12 text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
          Mach&nbsp;II Labs
        </p>

        <p className="mt-12 text-xs font-semibold tracking-[0.2em] text-fog uppercase">
          Earlier candidates
        </p>
        <ul className="mt-4 space-y-2 text-sm text-fog">
          {earlierCandidates.map((sample) => (
            <li key={sample.name}>
              <span className="text-snow">{sample.name}</span>
              <span className="ml-3 text-fog/70">{sample.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
