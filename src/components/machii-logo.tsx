import Image from "next/image";
import Link from "next/link";

type MachiiLogoProps = {
  href?: string | null;
  className?: string;
  /** Show wordmark beside the mark (default true). */
  withWordmark?: boolean;
  /**
   * inline — single-line “Mach II Labs” (nav).
   * stacked — “Mach II” over fog “LABS” (hero / brand lockup).
   */
  wordmarkLayout?: "inline" | "stacked";
  /** Mark size in pixels for inline layout (default 36). Ignored when stacked (uses em). */
  markSize?: number;
  /** Wordmark color scheme for dark or light page chrome (inline only). */
  tone?: "dark" | "light";
  /** Override inline wordmark classes. */
  wordmarkClassName?: string;
};

/** logo-mark.svg viewBox fractions (0–64). */
const TIP = 23.157 / 64;
const BAR_TOP = 54.56 / 64;
const BAR_BOTTOM = 59.925 / 64;
/** Full mark box in ems for stacked lockup (optical height ≈ tip→bar). */
const STACKED_MARK_EM = 2.65;

/**
 * Official Mach II Labs mark (chevron + horizon bar).
 *
 * Inline: wordmark caps sit between tip and bar.
 * Stacked: mark spans Mach II + LABS; tip above the M, bar with LABS (fog).
 */
export function MachiiLogo({
  href = "/",
  className = "",
  withWordmark = true,
  wordmarkLayout = "inline",
  markSize = 36,
  tone = "dark",
  wordmarkClassName,
}: MachiiLogoProps) {
  const wordmarkClass =
    wordmarkClassName ??
    (tone === "light"
      ? "font-display text-sm font-semibold tracking-wide text-[#4b5563] transition-colors group-hover:text-[#1a1a1a]"
      : "font-display text-sm font-semibold tracking-wide text-fog transition-colors group-hover:text-snow");

  const content =
    wordmarkLayout === "stacked"
      ? stackedLockup(className, withWordmark)
      : inlineLockup({
          className,
          withWordmark,
          markSize,
          wordmarkClass,
        });

  if (!href) return content;

  return (
    <Link
      href={href}
      className="group inline-flex items-center"
      aria-label="Mach II Labs"
    >
      {content}
    </Link>
  );
}

function MarkImage({
  box,
  opticalHeight,
  offsetTop,
  decorative,
}: {
  box: number | string;
  opticalHeight: number | string;
  offsetTop: number | string;
  decorative: boolean;
}) {
  return (
    <span
      className="relative shrink-0 overflow-hidden"
      style={{ width: box, height: opticalHeight }}
    >
      <Image
        src="/logo-mark.svg"
        alt={decorative ? "" : "Mach II Labs"}
        width={64}
        height={64}
        className="absolute left-0 max-w-none"
        style={{
          width: box,
          height: box,
          top: offsetTop,
        }}
        priority
      />
    </span>
  );
}

function inlineLockup({
  className,
  withWordmark,
  markSize,
  wordmarkClass,
}: {
  className: string;
  withWordmark: boolean;
  markSize: number;
  wordmarkClass: string;
}) {
  const opticalHeight = markSize * (BAR_BOTTOM - TIP);
  const barThickness = markSize * (BAR_BOTTOM - BAR_TOP);

  return (
    <span
      className={`inline-flex items-end gap-2.5 ${className}`}
      style={{ height: opticalHeight }}
    >
      <MarkImage
        box={markSize}
        opticalHeight={opticalHeight}
        offsetTop={-markSize * TIP}
        decorative={withWordmark}
      />
      {withWordmark ? (
        <span
          className={`${wordmarkClass} leading-none`}
          style={{ marginBottom: barThickness }}
        >
          Mach&nbsp;II Labs
        </span>
      ) : null}
    </span>
  );
}

function stackedLockup(className: string, withWordmark: boolean) {
  const box = `${STACKED_MARK_EM}em`;
  const opticalHeight = `calc(${STACKED_MARK_EM}em * ${BAR_BOTTOM - TIP})`;
  const offsetTop = `calc(-${STACKED_MARK_EM}em * ${TIP})`;

  return (
    <span className={`inline-flex items-end gap-[0.3em] ${className}`}>
      <MarkImage
        box={box}
        opticalHeight={opticalHeight}
        offsetTop={offsetTop}
        decorative={withWordmark}
      />
      {withWordmark ? (
        <span
          className="flex flex-col justify-between"
          style={{ height: opticalHeight, paddingTop: "0.1em" }}
        >
          <span className="text-[1em] leading-none font-extrabold tracking-[-0.04em] text-snow">
            Mach&nbsp;II
          </span>
          <span className="text-[0.32em] leading-none font-bold tracking-[0.28em] text-fog uppercase">
            Labs
          </span>
        </span>
      ) : null}
    </span>
  );
}
