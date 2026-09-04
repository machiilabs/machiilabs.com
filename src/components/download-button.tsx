type DownloadButtonProps = {
  href: string;
  /** Shown after the label, e.g. "v1.0.0 · macOS 26+" */
  meta: string;
  /** Primary label. Default: "Download free" */
  label?: string;
};

/**
 * Primary product download CTA — shared by Skagway and 15CE Flasher.
 */
export function DownloadButton({
  href,
  meta,
  label = "Download free",
}: DownloadButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 bg-afterburn px-7 py-3.5 font-display text-base font-bold tracking-wide text-ink transition-colors hover:bg-afterburn-soft"
    >
      {label}
      <span className="text-sm font-semibold opacity-70">{meta}</span>
    </a>
  );
}
