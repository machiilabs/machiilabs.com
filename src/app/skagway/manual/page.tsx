import type { Metadata } from "next";
import Link from "next/link";
import { MANUAL_HOME, MANUAL_PAGES } from "./manual";
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
      <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-afterburn-soft uppercase sm:text-xs">
        Manual
      </p>
      <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.08] font-extrabold tracking-[-0.04em] text-snow">
        {MANUAL_HOME.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-fog sm:text-xl">
        {MANUAL_HOME.summary}
      </p>

      <ManualFigure page={MANUAL_HOME} />

      <div className="mt-12 space-y-12">
        {MANUAL_HOME.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
              {section.title}
            </h2>
            <ol className="mt-5 space-y-3 pl-6 text-base leading-relaxed text-fog sm:text-lg">
              {section.steps.map((step) => (
                <li key={step} className="list-decimal pl-2">
                  {step}
                </li>
              ))}
            </ol>
            {section.note ? (
              <p className="mt-5 border-l-2 border-afterburn/60 pl-4 text-sm leading-relaxed text-fog">
                {section.note}
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm">
        <Link
          href="/skagway"
          className="text-fog transition-colors hover:text-snow"
        >
          ← Skagway
        </Link>
        {next ? (
          <Link
            href={`/skagway/manual/${next.slug}`}
            className="text-fog transition-colors hover:text-snow"
          >
            {next.title} →
          </Link>
        ) : null}
      </div>
    </ManualShell>
  );
}
