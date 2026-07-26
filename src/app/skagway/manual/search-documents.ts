import {
  flattenManualSteps,
  getManualNavPages,
  manualPageHref,
  manualSectionId,
  type ManualPage,
} from "./manual";

/** One searchable unit — usually a page section; pages also get a top-level entry. */
export type ManualSearchDocument = {
  id: string;
  pageSlug: string;
  pageTitle: string;
  sectionTitle: string | null;
  /** Deep link into the manual */
  href: string;
  /** Display title, e.g. "Playback » Bookmarks" */
  title: string;
  /** Full text used for matching */
  body: string;
};

function sectionBody(section: ManualPage["sections"][number]): string {
  const parts = flattenManualSteps(section.steps);
  if (section.note) parts.push(section.note);
  return parts.join("\n");
}

/** Build the search corpus from the live manual source (`manual.ts`). */
export function buildManualSearchDocuments(): ManualSearchDocument[] {
  const docs: ManualSearchDocument[] = [];

  for (const page of getManualNavPages()) {
    const pageHref = manualPageHref(page.slug);

    docs.push({
      id: `${page.slug}__page`,
      pageSlug: page.slug,
      pageTitle: page.title,
      sectionTitle: null,
      href: pageHref,
      title: page.title,
      body: [page.blurb, page.summary].filter(Boolean).join("\n"),
    });

    for (const section of page.sections) {
      const anchor = manualSectionId(section.title);
      docs.push({
        id: `${page.slug}__${anchor}`,
        pageSlug: page.slug,
        pageTitle: page.title,
        sectionTitle: section.title,
        href: `${pageHref}#${anchor}`,
        title: `${page.title} » ${section.title}`,
        body: sectionBody(section),
      });
    }
  }

  return docs;
}
