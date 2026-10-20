"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type RefObject } from "react";
import {
  MANUAL_PART_LABELS,
  MANUAL_PARTS,
  MANUAL_TASK_GROUPS,
  getManualNavPages,
  manualPageHref,
  manualPart,
  manualSectionId,
  type ManualPage,
} from "./manual";

/** Scroll the sidebar so the active page link is in view (not stuck at the top). */
function scrollActiveNavIntoView(el: HTMLElement) {
  const scroller = el.closest<HTMLElement>("[data-manual-sidebar-scroll]");
  if (!scroller) return;

  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  const padding = Math.min(48, scroller.clientHeight * 0.2);
  const nextTop =
    scroller.scrollTop + (elRect.top - scrollerRect.top) - padding;

  scroller.scrollTo({ top: Math.max(0, nextTop), behavior: "instant" });
}

function ManualNavList({
  pages,
  currentSlug,
  activeRef,
}: {
  pages: ManualPage[];
  currentSlug?: string;
  activeRef: RefObject<HTMLAnchorElement | null>;
}) {
  return (
    <ul className="space-y-1">
      {pages.map((page) => {
        const active = page.slug === currentSlug;
        const href = manualPageHref(page.slug);

        return (
          <li key={page.slug}>
            <Link
              ref={active ? activeRef : undefined}
              href={href}
              data-manual-nav={page.slug}
              className={
                active
                  ? "block rounded px-2.5 py-1.5 font-semibold text-[#1d4ed8]"
                  : "block rounded px-2.5 py-1.5 font-semibold text-[#1a1a1a] hover:bg-[#f3f4f6]"
              }
              style={active ? { background: "#eff6ff" } : undefined}
              aria-current={active ? "page" : undefined}
            >
              {page.title}
            </Link>
            {active && page.sections.length > 0 ? (
              <ul className="mt-1 ml-2 space-y-0.5 border-l border-[#e5e7eb] pl-3">
                {page.sections.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`${href}#${manualSectionId(section.title)}`}
                      className="block py-1 text-[0.8125rem] text-[#4b5563] hover:text-[#1a1a1a]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function ManualPartNav({
  pages,
  currentSlug,
  activeRef,
}: {
  pages: ManualPage[];
  currentSlug?: string;
  activeRef: RefObject<HTMLAnchorElement | null>;
}) {
  const ungrouped = pages.filter((page) => !page.taskGroup);
  const groups = MANUAL_TASK_GROUPS.map((group) => ({
    group,
    pages: pages.filter((page) => page.taskGroup === group),
  })).filter(({ pages: groupPages }) => groupPages.length > 0);

  return (
    <>
      {ungrouped.length > 0 ? (
        <ManualNavList
          pages={ungrouped}
          currentSlug={currentSlug}
          activeRef={activeRef}
        />
      ) : null}
      {groups.map(({ group, pages: groupPages }) => (
        <div key={group}>
          <p className="mt-4 mb-1 px-2.5 text-[0.75rem] text-[#6b7280]">
            {group}
          </p>
          <ManualNavList
            pages={groupPages}
            currentSlug={currentSlug}
            activeRef={activeRef}
          />
        </div>
      ))}
    </>
  );
}

export function ManualSidebar({ currentSlug }: { currentSlug?: string }) {
  const pages = getManualNavPages();
  const activeRef = useRef<HTMLAnchorElement>(null);
  useLayoutEffect(() => {
    if (!currentSlug || !activeRef.current) return;
    scrollActiveNavIntoView(activeRef.current);
  }, [currentSlug]);

  return (
    <nav aria-label="Manual topics" className="text-[0.875rem] leading-snug">
      {MANUAL_PARTS.map((part, index) => (
        <div key={part}>
          <p
            className={`${index > 0 ? "mt-6 " : ""}mb-3 text-[0.7rem] font-semibold tracking-wide text-[#6b7280] uppercase`}
          >
            {MANUAL_PART_LABELS[part]}
          </p>
          <ManualPartNav
            pages={pages.filter((page) => manualPart(page) === part)}
            currentSlug={currentSlug}
            activeRef={activeRef}
          />
        </div>
      ))}
    </nav>
  );
}
