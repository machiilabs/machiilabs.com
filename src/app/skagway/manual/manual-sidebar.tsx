"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  getManualNavPages,
  manualPageHref,
  manualSectionId,
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

export function ManualSidebar({ currentSlug }: { currentSlug?: string }) {
  const pages = getManualNavPages();
  const activeRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (!currentSlug || !activeRef.current) return;
    scrollActiveNavIntoView(activeRef.current);
  }, [currentSlug]);

  return (
    <nav aria-label="Manual topics" className="text-[0.875rem] leading-snug">
      <p className="mb-3 text-[0.7rem] font-semibold tracking-wide text-[#6b7280] uppercase">
        Manual
      </p>
      <ul className="space-y-3">
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
              {page.sections.length > 0 ? (
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
    </nav>
  );
}
