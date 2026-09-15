"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ManualExpandableImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  dimmed?: boolean;
};

export function ManualExpandableImage({
  src,
  alt,
  className = "h-auto w-full",
  sizes = "(max-width: 768px) 100vw, 48rem",
  dimmed = false,
}: ManualExpandableImageProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const lightbox =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100]"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <div className="pointer-events-none fixed inset-0 bg-black/88" aria-hidden />
            <div
              className="fixed inset-0 overflow-auto overscroll-contain"
              onClick={close}
            >
              <div className="flex min-h-full justify-center px-4 pt-14 pb-8 sm:px-10 sm:pb-10">
                {/* Native img so the lightbox can use the file’s full pixel dimensions. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  className="h-auto max-w-full shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            </div>
            <button
              type="button"
              className="fixed top-4 right-4 z-10 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-black/75"
              onClick={close}
            >
              Close
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
        aria-label={`View full size: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={2400}
          height={1500}
          className={`${className}${dimmed ? " opacity-80" : ""}`}
          sizes={sizes}
          unoptimized
        />
        <span className="pointer-events-none absolute right-2 bottom-2 rounded bg-black/55 px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Click to enlarge
        </span>
      </button>
      {lightbox}
    </>
  );
}
