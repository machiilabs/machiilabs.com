import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MachiiLogo } from "@/components/machii-logo";

export const metadata: Metadata = {
  title: "Mac Video Organizer & Library — Skagway",
  description:
    "Skagway is a fast Mac video organizer and library for the files already on your drives — built for large collections. Free forever from Mach II Labs.",
  openGraph: {
    title: "Mac Video Organizer & Library — Skagway",
    description:
      "Organize and play the video files already on your Mac. Fast with large libraries. Free forever.",
    url: "https://machiilabs.com/skagway",
  },
  twitter: {
    title: "Mac Video Organizer & Library — Skagway",
    description:
      "Organize and play the video files already on your Mac. Fast with large libraries. Free forever.",
  },
  alternates: {
    canonical: "https://machiilabs.com/skagway",
  },
};

export default function SkagwayPage() {
  return (
    <div className="relative min-h-dvh bg-ink text-snow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 sky-drift"
          style={{
            background: `
              radial-gradient(110% 70% at 80% 0%, rgba(61, 111, 154, 0.35) 0%, transparent 55%),
              radial-gradient(80% 50% at 10% 90%, rgba(232, 160, 69, 0.14) 0%, transparent 50%),
              linear-gradient(165deg, #05080f 0%, #0a1220 42%, #081018 100%)
            `,
          }}
        />
        <div
          className="horizon-glow absolute inset-x-0 bottom-0 h-[36vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(232, 160, 69, 0.18) 0%, rgba(61, 111, 154, 0.14) 40%, transparent 100%)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:px-10">
        <MachiiLogo />
        <a
          href="mailto:support@machiilabs.com"
          className="text-sm text-fog/80 transition-colors hover:text-snow"
        >
          Support
        </a>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-6 sm:px-10 sm:pt-8">
        {/* Hero — copy left, product shot right */}
        <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
          <div className="relative z-20 max-w-xl lg:pt-2">
            <p className="anim-rise font-display text-[0.7rem] font-semibold tracking-[0.28em] text-afterburn-soft uppercase sm:text-xs">
              Free forever
            </p>

            <h1 className="anim-rise anim-rise-delay-1 mt-5 font-display text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.1] font-extrabold tracking-[-0.04em] text-snow">
              Skagway
            </h1>

            <p className="anim-rise anim-rise-delay-2 mt-6 font-display text-2xl leading-snug font-semibold tracking-tight text-snow sm:text-3xl">
              A Mac video organizer and library for the files already on your
              drives.
            </p>

            <p className="anim-rise anim-rise-delay-3 mt-5 text-lg leading-relaxed text-fog sm:text-xl">
              Browse, tag, filter, and play large personal collections — without
              moving media into a proprietary container.
            </p>

            <div className="anim-rise anim-rise-delay-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="https://downloads.machiilabs.com/Skagway.dmg"
                className="group relative inline-flex items-center font-display text-base font-semibold tracking-wide text-snow transition-colors hover:text-afterburn-soft"
              >
                Download free
                <span
                  aria-hidden
                  className="cta-underline absolute -bottom-1 left-0 h-px w-full bg-afterburn"
                />
              </a>
              <Link
                href="/skagway/explore"
                className="font-display text-base font-semibold tracking-wide text-fog transition-colors hover:text-snow"
              >
                Explore Skagway
              </Link>
              <Link
                href="/skagway/manual"
                className="font-display text-base font-semibold tracking-wide text-fog transition-colors hover:text-snow"
              >
                Manual
              </Link>
              <span className="w-full text-sm text-fog/80 sm:w-auto">
                macOS 26+ · notarized DMG (version 0.79.0)
              </span>
            </div>
          </div>

          <div className="relative z-0 mt-[1in] ml-[1in] min-w-0 w-full">
            <div className="product-stage">
              <div className="product-frame bg-black p-[30px]">
                <Image
                  src="/skagway/product.png"
                  alt="Skagway personal library — video grid with detail panel"
                  width={4704}
                  height={2504}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 max-w-2xl border-t border-white/10 pt-8">
          <h2 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
            Built for real libraries
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
            Skagway indexes folders you already keep on disk, then adds ratings,
            tags, smart collections, and fast keyboard-driven browsing on top.
            Built for performance. Tuned to stay smooth when you have thousands of videos,
            regardless of length or file size.
          </p>
        </section>

        <section className="mt-16 max-w-2xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
            Free forever
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
            The full app. No trial clock, no paywall, no paid tier. No
            limits. Skagway is
            Mach II Labs&apos; free Mac app — serious software, yours forever.
          </p>
        </section>

        <section className="mt-16 max-w-2xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
            Your files stay yours
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
            No proprietary library container. No phone-home telemetry by
            default. Bug reports only when you choose to send them.
          </p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Mach II Labs · Skagway
          </span>
          <a
            href="mailto:support@machiilabs.com"
            className="transition-colors hover:text-snow"
          >
            support@machiilabs.com
          </a>
        </div>
      </footer>
    </div>
  );
}
