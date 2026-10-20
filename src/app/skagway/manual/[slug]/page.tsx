import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MANUAL_TASKS_OVERVIEW_SLUG,
  getManualNeighbors,
  getManualPage,
  getManualTopicPages,
  manualPartLabel,
  manualPlainText,
} from "../manual";
import { ManualInline } from "../manual-inline";
import {
  ManualPageFigure,
  ManualPager,
  ManualSectionBlock,
  ManualShell,
  ManualTaskCards,
} from "../manual-shell";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getManualTopicPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getManualPage(slug);
  if (!page) return {};

  const url = `https://machiilabs.com/skagway/manual/${page.slug}`;
  const description = manualPlainText(page.summary);
  return {
    title: `${page.title} — Skagway Manual`,
    description,
    openGraph: {
      title: `${page.title} — Skagway Manual`,
      description,
      url,
    },
    twitter: {
      title: `${page.title} — Skagway Manual`,
      description,
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
        {manualPartLabel(page)}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
        {page.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-lg">
        <ManualInline text={page.summary} />
      </p>

      <ManualPageFigure page={page} />

      {page.slug === MANUAL_TASKS_OVERVIEW_SLUG ? <ManualTaskCards /> : null}

      <div className="mt-10 space-y-10">
        {page.sections.map((section) => (
          <ManualSectionBlock key={section.title} section={section} />
        ))}
      </div>

      <ManualPager prev={prev} next={next} />
    </ManualShell>
  );
}
