import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getManualNeighbors,
  getManualPage,
  MANUAL_PAGES,
  manualSectionId,
} from "../manual";
import { ManualInline } from "../manual-inline";
import {
  ManualFigure,
  ManualIcon,
  ManualPager,
  ManualShell,
  ManualSteps,
} from "../manual-shell";

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
  if (slug === "first-launch") notFound();
  const page = getManualPage(slug);
  if (!page) notFound();

  const { prev, next } = getManualNeighbors(slug);

  return (
    <ManualShell currentSlug={page.slug}>
      <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
        Manual
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
        {page.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
        <ManualInline text={page.summary} />
      </p>

      <ManualFigure page={page} />

      <div className="mt-10 space-y-10">
        {page.sections.map((section) => (
          <section key={section.title} id={manualSectionId(section.title)}>
            <h2 className="scroll-mt-8 text-xl font-semibold tracking-tight text-[#1a1a1a]">
              <ManualInline text={section.title} />
            </h2>
            <ManualSteps steps={section.steps} />
            {section.note ? (
              <p className="mt-4 flex flex-wrap items-center gap-3 border-l-2 border-[#93c5fd] pl-4 text-sm leading-relaxed text-[#4b5563]">
                {section.noteIcon ? (
                  <ManualIcon
                    filename={section.noteIcon}
                    alt={section.noteIconAlt ?? section.note}
                  />
                ) : null}
                <span>
                  <ManualInline text={section.note} />
                  {section.noteHref && section.noteLinkLabel ? (
                    <>
                      {" "}
                      See the{" "}
                      <Link
                        href={section.noteHref}
                        className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
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
