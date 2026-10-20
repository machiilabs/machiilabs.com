import type { Metadata } from "next";
import Link from "next/link";
import { MANUAL_HOME, getManualNeighbors, manualPartLabel } from "./manual";
import { ManualInline } from "./manual-inline";
import {
  ManualPageFigure,
  ManualPager,
  ManualSectionBlock,
  ManualShell,
} from "./manual-shell";

export const metadata: Metadata = {
  title: "Manual — Skagway",
  description: MANUAL_HOME.summary,
  openGraph: {
    title: "Manual — Skagway",
    description: MANUAL_HOME.summary,
    url: "https://machiilabs.com/skagway/manual",
  },
  twitter: {
    title: "Manual — Skagway",
    description: MANUAL_HOME.summary,
  },
  alternates: {
    canonical: "https://machiilabs.com/skagway/manual",
  },
};

export default function SkagwayManualIndexPage() {
  const { prev, next } = getManualNeighbors(MANUAL_HOME.slug);

  return (
    <ManualShell currentSlug="first-launch">
      <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
        {manualPartLabel(MANUAL_HOME)}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
        {MANUAL_HOME.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
        <ManualInline text={MANUAL_HOME.summary} />
      </p>
      <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
        After the library is open, see{" "}
        <Link
          href="/skagway/manual/how-do-i"
          className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
        >
          How do I…?
        </Link>{" "}
        for some of the powerful tasks you can perform on your videos.
      </p>

      <ManualPageFigure page={MANUAL_HOME} />

      <div className="mt-10 space-y-10">
        {MANUAL_HOME.sections.map((section) => (
          <ManualSectionBlock key={section.title} section={section} />
        ))}
      </div>

      <ManualPager prev={prev} next={next} />
    </ManualShell>
  );
}
