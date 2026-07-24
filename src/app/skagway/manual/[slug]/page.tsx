import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getManualNeighbors,
  getManualPage,
  MANUAL_PAGES,
} from "../manual";
import { ManualFigure, ManualIcon, ManualPager, ManualShell } from "../manual-shell";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MANUAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getManualPage(slug);
  if (!page) return {};

  const url = `https://machiilabs.com/skagway/manual/${page.slug}`;
  return {
    title: `${page.title} — Skagway Manual`,
    description: page.summary,
    openGraph: {
      title: `${page.title} — Skagway Manual`,
      description: page.summary,
      url,
    },
    twitter: {
      title: `${page.title} — Skagway Manual`,
      description: page.summary,
    },
    alternates: { canonical: url },
  };
}

export default async function SkagwayManualTopicPage({ params }: Props) {
  const { slug } = await params;
  const page = getManualPage(slug);
  if (!page) notFound();

  const { prev, next } = getManualNeighbors(slug);

  return (
    <ManualShell currentSlug={page.slug}>
      <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-afterburn-soft uppercase sm:text-xs">
        Manual
      </p>
      <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.08] font-extrabold tracking-[-0.04em] text-snow">
        {page.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-fog sm:text-xl">
        {page.summary}
      </p>

      <ManualFigure page={page} />

      <div className="mt-12 space-y-12">
        {page.sections.map((section) => (
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
              <p className="mt-5 flex flex-wrap items-center gap-3 border-l-2 border-afterburn/60 pl-4 text-sm leading-relaxed text-fog">
                {section.noteIcon ? (
                  <ManualIcon
                    filename={section.noteIcon}
                    alt={section.noteIconAlt ?? section.note}
                  />
                ) : null}
                <span>
                  {section.note}
                  {section.noteHref && section.noteLinkLabel ? (
                    <>
                      {" "}
                      See the{" "}
                      <Link
                        href={section.noteHref}
                        className="text-afterburn-soft underline-offset-4 transition-colors hover:text-snow hover:underline"
                      >
                        {section.noteLinkLabel}
                      </Link>{" "}
                      page.
                    </>
                  ) : null}
                </span>
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <ManualPager prev={prev} next={next} />
    </ManualShell>
  );
}
