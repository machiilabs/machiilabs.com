import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementSignup } from "@/components/announcement-signup";
import { MachiiLogo } from "@/components/machii-logo";
import { SiteHeader } from "@/components/site-header";
import { SkagwayComingSoon } from "@/components/skagway-coming-soon";
import { StudioPromises } from "@/components/studio-promises";
import {
  latestSkagwayRelease,
  SKAGWAY_UPCOMING,
  skagwayHomeReleaseLines,
  skagwayVersionLabel,
} from "@/lib/skagway-releases";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mach II Labs",
  description:
    "Independent Mac software lab. Skagway 1.3 — free video organizer for files already on your drives. Also: 15CE Flasher for HP 15c CE.",
  alternates: {
    canonical: "https://machiilabs.com",
  },
  openGraph: {
    title: "Mach II Labs — Skagway 1.3",
    description:
      "Skagway 1.3 is out: Storyboard view, hide the Inspector, a rolodex-style scroll index, and Reconnect. Free Mac video organizer for the files already on your drives.",
    url: "https://machiilabs.com",
    siteName: "Mach II Labs",
    images: [
      {
        url: "/skagway/product.png",
        width: 1200,
        height: 630,
        alt: "Skagway — Mac video organizer and library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mach II Labs — Skagway 1.3",
    description:
      "Skagway 1.3 is out: Storyboard view, hide the Inspector, a rolodex-style scroll index, and Reconnect.",
    images: ["/skagway/product.png"],
  },
};

export default function Home() {
  const latestSkagway = latestSkagwayRelease();
  const skagwayReleaseLines = skagwayHomeReleaseLines(latestSkagway);
  const skagwayMinorVersion = latestSkagway.version.replace(/\.0$/, "");

  return (
    <div
      className={`${inter.className} relative min-h-dvh overflow-x-hidden bg-ink text-snow`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sky-drift"
        style={{
          background: `
            radial-gradient(120% 80% at 70% 110%, rgba(61, 111, 154, 0.45) 0%, transparent 55%),
            radial-gradient(90% 60% at 15% 20%, rgba(232, 160, 69, 0.12) 0%, transparent 50%),
            linear-gradient(165deg, #05080f 0%, #0a1220 42%, #081018 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="horizon-glow pointer-events-none absolute inset-x-0 bottom-0 h-[42vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(232, 160, 69, 0.22) 0%, rgba(61, 111, 154, 0.18) 35%, transparent 100%)",
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vapor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(120,170,210,0)" />
            <stop offset="40%" stopColor="rgba(120,170,210,0.35)" />
            <stop offset="100%" stopColor="rgba(232,160,69,0.15)" />
          </linearGradient>
        </defs>
        <g stroke="url(#vapor)" strokeWidth="1" fill="none">
          <path d="M-40 62% L110% 48%" />
          <path d="M-40 68% L110% 56%" opacity="0.7" />
          <path d="M-40 74% L110% 63%" opacity="0.45" />
        </g>
      </svg>

      <SiteHeader active="home" bordered={false} hero className="relative z-10" />

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col justify-start px-6 pb-16 pt-5 sm:px-10 sm:pb-20 lg:pb-24 lg:pt-6">
        <p className="anim-rise text-[0.7rem] font-semibold tracking-[0.28em] text-fog uppercase sm:text-xs">
          Independent software lab
        </p>

        <div className="anim-rise anim-rise-delay-1 mt-5 w-fit text-[clamp(2.75rem,9vw,5.5rem)]">
          <h1>
            <MachiiLogo href={null} wordmarkLayout="stacked" />
          </h1>
          <p className="mt-[0.22em] text-center font-display text-[0.34em] leading-snug font-semibold tracking-tight text-fog">
            Software you keep
          </p>
        </div>

        <nav
          aria-label="Jump to products"
          className="anim-rise anim-rise-delay-2 mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base"
        >
          <span className="text-fog">Jump to</span>
          <span className="text-fog/50" aria-hidden>
            →
          </span>
          <a
            href="#skagway"
            className="font-semibold text-snow transition-colors hover:text-afterburn-soft"
          >
            Skagway
          </a>
          <a
            href="#flasher"
            className="font-semibold text-snow transition-colors hover:text-afterburn-soft"
          >
            15CE Flasher
          </a>
          <a
            href="#promises"
            className="font-semibold text-snow transition-colors hover:text-afterburn-soft"
          >
            Promises
          </a>
        </nav>

        <div className="anim-rise anim-rise-delay-3 mt-14 flex flex-col gap-14">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <article
              id="skagway"
              className="flex scroll-mt-8 flex-col rounded-2xl border border-white/12 bg-ink-elevated/70 p-6 sm:p-8"
            >
              <Link
                href="/skagway"
                className="mb-6 block overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-opacity hover:opacity-90"
                aria-label="Skagway"
              >
                <Image
                  src="/skagway/product.png"
                  alt=""
                  width={4704}
                  height={2504}
                  priority
                  className="h-auto w-full"
                />
              </Link>
              <p className="text-sm font-semibold tracking-[0.18em] text-afterburn-soft uppercase">
                Newest release · {skagwayVersionLabel(latestSkagway.version)}
              </p>
              <Link
                href="/skagway"
                className="mt-3 block font-display text-3xl font-bold tracking-tight text-snow transition-colors hover:text-afterburn-soft sm:text-4xl"
              >
                Skagway
              </Link>
              <p className="mt-3 text-base leading-relaxed text-fog sm:text-lg">
                A Mac video organizer and library for the files already on your
                drives — browse, tag, filter, and play without locking media into
                a proprietary container. Built to stay fast with thousands of
                videos in the library — serious software. And it&apos;s{" "}
                <span className="font-semibold text-snow">free forever</span>.
              </p>
              {SKAGWAY_UPCOMING ? null : skagwayReleaseLines.length > 0 ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.16em] text-afterburn-soft uppercase">
                    New in {skagwayMinorVersion}
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed text-fog sm:text-base">
                    {skagwayReleaseLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                <Link
                  href="/skagway"
                  className="group relative inline-flex w-fit items-center text-base font-semibold tracking-wide text-snow transition-colors hover:text-afterburn-soft"
                >
                  Get Skagway
                  <span
                    aria-hidden
                    className="cta-underline absolute -bottom-1 left-0 h-px w-full bg-afterburn"
                  />
                </Link>
                <Link
                  href="/skagway/manual"
                  className="text-base text-fog transition-colors hover:text-afterburn-soft"
                >
                  Manual →
                </Link>
              </div>
            </article>

            <article
              id="flasher"
              className="flex scroll-mt-8 flex-col rounded-2xl border border-white/12 bg-ink-elevated/70 p-6 sm:p-8"
            >
              <Link
                href="/flasher"
                className="mb-6 flex justify-center overflow-hidden rounded-xl border border-white/10 bg-black/25 py-8 transition-opacity hover:opacity-90 sm:py-10"
                aria-label="15CE Flasher"
              >
                <Image
                  src="/flasher/app-icon.png"
                  alt=""
                  width={1024}
                  height={1024}
                  className="h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                />
              </Link>
              <p className="text-sm font-semibold tracking-[0.18em] text-afterburn-soft uppercase">
                Mac &amp; Windows
              </p>
              <Link
                href="/flasher"
                className="mt-3 block font-display text-3xl font-bold tracking-tight text-snow transition-colors hover:text-afterburn-soft sm:text-4xl"
              >
                15CE Flasher
              </Link>
              <p className="mt-3 text-base leading-relaxed text-fog sm:text-lg">
                SAM-BA programmer for the HP 15c Collector&apos;s Edition.
                Firmware updates without hassle,{" "}
                <span className="font-semibold text-snow">free forever</span>.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                <Link
                  href="/flasher"
                  className="group relative inline-flex w-fit items-center text-base font-semibold tracking-wide text-snow transition-colors hover:text-afterburn-soft"
                >
                  Get 15CE Flasher
                  <span
                    aria-hidden
                    className="cta-underline absolute -bottom-1 left-0 h-px w-full bg-afterburn"
                  />
                </Link>
                <Link
                  href="/flasher/guide"
                  className="text-base text-fog transition-colors hover:text-afterburn-soft"
                >
                  Install Guide →
                </Link>
              </div>
            </article>
          </div>

          {SKAGWAY_UPCOMING ? <SkagwayComingSoon variant="home" /> : null}

          <StudioPromises />

          <AnnouncementSignup />
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs</span>
          <a
            href="#promises"
            className="transition-colors hover:text-snow"
          >
            No ads · No subscriptions · No tracking
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link
              href="/privacy"
              className="transition-colors hover:text-snow"
            >
              Privacy
            </Link>
            <a
              href="mailto:contact@machiilabs.com"
              className="transition-colors hover:text-snow"
            >
              Contact Mach II Labs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
