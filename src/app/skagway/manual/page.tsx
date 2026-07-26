import type { Metadata } from "next";
import Link from "next/link";
import { MANUAL_HOME, MANUAL_PAGES, manualSectionId } from "./manual";
import { ManualInline } from "./manual-inline";
import { ManualSteps } from "./manual-shell";
import { ManualFigure, ManualShell } from "./manual-shell";

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
  const next = MANUAL_PAGES[0];

  return (
    <ManualShell currentSlug="first-launch">
      <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
        Manual
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
        {MANUAL_HOME.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
        <ManualInline text={MANUAL_HOME.summary} />
      </p>

      <ManualFigure page={MANUAL_HOME} />

      <div className="mt-10 space-y-10">
        {MANUAL_HOME.sections.map((section) => (
          <section key={section.title} id={manualSectionId(section.title)}>
            <h2 className="scroll-mt-8 text-xl font-semibold tracking-tight text-[#1a1a1a]">
              <ManualInline text={section.title} />
            </h2>
            <ManualSteps steps={section.steps} />
            {section.note ? (
              <p className="mt-4 border-l-2 border-[#93c5fd] pl-4 text-sm leading-relaxed text-[#4b5563]">
                <ManualInline text={section.note} />
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5e7eb] pt-6 text-sm">
        <Link href="/skagway" className="text-[#4b5563] hover:text-[#1a1a1a]">
          ← Skagway
        </Link>
        {next ? (
          <Link
            href={`/skagway/manual/${next.slug}`}
            className="text-[#4b5563] hover:text-[#1a1a1a]"
          >
            {next.title} →
          </Link>
        ) : null}
      </div>
    </ManualShell>
  );
}
