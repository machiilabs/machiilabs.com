"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { MANUAL_SEARCH_INDEX } from "./search-index.generated";
import {
  highlightSegments,
  searchManualIndex,
  type ManualSearchHit,
} from "./search";

function HighlightedText({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightSegments(text, query).map((seg, i) =>
        seg.match ? (
          <strong key={`${seg.text}-${i}`} className="font-semibold text-[#1a1a1a]">
            {seg.text}
          </strong>
        ) : (
          <span key={`${seg.text}-${i}`}>{seg.text}</span>
        ),
      )}
    </>
  );
}

export function ManualSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const hits: ManualSearchHit[] =
    query.trim().length === 0 ? [] : searchManualIndex(MANUAL_SEARCH_INDEX, query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setActiveIndex(0);
  }, []);

  const goTo = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  // Global shortcut: / or s (when not typing in a field)
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const editable =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable;

      if (event.key === "Escape" && open) {
        event.preventDefault();
        close();
        return;
      }

      if (editable) return;

      if (
        !open &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        (event.key === "/" || event.key === "s" || event.key === "S")
      ) {
        event.preventDefault();
        openSearch();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open, openSearch]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open || hits.length === 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-search-hit="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, hits.length, open]);

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = hits[activeIndex];
      if (hit) goTo(hit.document.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="inline-flex items-center gap-2 rounded border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5 text-sm text-[#6b7280] transition-colors hover:border-[#d1d5db] hover:bg-white hover:text-[#1a1a1a]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="hidden sm:inline">Search docs…</span>
        <span className="sm:hidden">Search</span>
        <kbd className="rounded border border-[#e5e7eb] bg-white px-1.5 py-0.5 font-mono text-[0.65rem] text-[#9ca3af]">
          /
        </kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:pt-[15vh]">
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            aria-label="Close search"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(70vh,32rem)] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xl"
          >
            <h2 id={titleId} className="sr-only">
              Search the Skagway manual
            </h2>
            <div className="flex items-center gap-2 border-b border-[#e5e7eb] px-3">
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search docs…"
                className="min-w-0 flex-1 bg-transparent py-3.5 text-base text-[#1a1a1a] outline-none placeholder:text-[#9ca3af]"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="rounded p-1 text-[#1d4ed8] hover:bg-[#eff6ff]"
                  aria-label="Clear search"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M10 8.586 15.293 3.293a1 1 0 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707A1 1 0 0 1 4.707 3.293L10 8.586Z" />
                  </svg>
                </button>
              ) : null}
            </div>

            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto">
              {query.trim().length === 0 ? (
                <p className="px-4 py-6 text-sm text-[#6b7280]">
                  Type to search pages and topics. Use ↑ ↓ and Enter to open a
                  result.
                </p>
              ) : hits.length === 0 ? (
                <p className="px-4 py-6 text-sm text-[#6b7280]">
                  No results for “{query.trim()}”.
                </p>
              ) : (
                <>
                  <p className="border-b border-[#f3f4f6] px-4 py-2 text-xs text-[#6b7280]">
                    {hits.length} search result{hits.length === 1 ? "" : "s"} for
                    “{query.trim()}”:
                  </p>
                  <ul className="py-1">
                    {hits.map((hit, index) => {
                      const active = index === activeIndex;
                      return (
                        <li key={hit.document.id}>
                          <button
                            type="button"
                            data-search-hit={index}
                            onClick={() => goTo(hit.document.href)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={
                              active
                                ? "block w-full px-4 py-3 text-left bg-[#eff6ff]"
                                : "block w-full px-4 py-3 text-left hover:bg-[#f9fafb]"
                            }
                          >
                            <div className="text-sm font-medium text-[#1d4ed8]">
                              <HighlightedText
                                text={hit.document.title}
                                query={query}
                              />
                            </div>
                            {hit.snippet ? (
                              <p className="mt-1 font-mono text-[0.75rem] leading-relaxed text-[#4b5563]">
                                <HighlightedText
                                  text={hit.snippet}
                                  query={query}
                                />
                              </p>
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
