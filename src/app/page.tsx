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
  skagwayVersionLabel,
} from "@/lib/skagway-releases";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

/** Home jump links — off while the product cards sit in view. Flip to show. */
const SHOW_HOME_JUMP_LINKS = false;

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
        url: "/skagway/og.jpg",
        width: 1200,
        height: 630,
        alt: "Skagway — Free Mac video organizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mach II Labs — Skagway 1.3",
    description:
      "Skagway 1.3 is out: Storyboard view, hide the Inspector, a rolodex-style scroll index, and Reconnect.",
    images: ["/skagway/og.jpg"],
  },
};

export default function Home() {
  const latestSkagway = latestSkagwayRelease();

  return (
    <div
      className={`${inter.className} relative min-h-dvh overflow-x-hidden bg-[#fafafa] text-[#1a1a1a]`}
    >
      <style>{`body{background:#fafafa;color:#1a1a1a}`}</style>

      <SiteHeader active="home" tone="light" hero className="relative z-10" />

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col justify-start px-6 pb-16 pt-5 sm:px-10 sm:pb-20 lg:pb-24 lg:pt-6">
        <p className="anim-rise text-[0.7rem] font-semibold tracking-[0.28em] text-[#4b5563] uppercase sm:text-xs">
          Independent software lab
        </p>

        <div className="anim-rise anim-rise-delay-1 mt-5 w-fit text-[clamp(2.75rem,9vw,5.5rem)]">
          <h1>
            <MachiiLogo href={null} wordmarkLayout="stacked" tone="light" />
          </h1>
          <p className="mt-[0.22em] text-center font-display text-[0.34em] leading-snug font-semibold tracking-tight text-[#4b5563]">
            Software you keep
          </p>
        </div>

        {SHOW_HOME_JUMP_LINKS ? (
          <nav
            aria-label="Jump to products"
            className="anim-rise anim-rise-delay-2 mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base"
          >
            <span className="text-[#4b5563]">Jump to</span>
            <span className="text-[#4b5563]/50" aria-hidden>
              →
            </span>
            <a
              href="#skagway"
              className="font-semibold text-[#1a1a1a] transition-colors hover:text-[#8a5a20]"
            >
              Skagway
            </a>
            <a
              href="#flasher"
              className="font-semibold text-[#1a1a1a] transition-colors hover:text-[#8a5a20]"
            >
              15CE Flasher
            </a>
            <a
              href="#promises"
              className="font-semibold text-[#1a1a1a] transition-colors hover:text-[#8a5a20]"
            >
              Promises
            </a>
          </nav>
        ) : null}

        <div className="anim-rise anim-rise-delay-3 mt-14 flex flex-col gap-14">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <article
              id="skagway"
              className="flex scroll-mt-8 flex-col rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8"
            >
              <Link
                href="/skagway"
                className="mb-6 block overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f4f4f5] transition-opacity hover:opacity-90"
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
              <p className="text-sm font-semibold tracking-[0.18em] text-[#8a5a20] uppercase">
                Newest release · {skagwayVersionLabel(latestSkagway.version)}
              </p>
              <Link
                href="/skagway"
                className="mt-3 block font-display text-3xl font-bold tracking-tight text-[#1a1a1a] transition-colors hover:text-[#8a5a20] sm:text-4xl"
              >
                Skagway
              </Link>
              <p className="mt-3 text-base leading-relaxed text-[#4b5563] sm:text-lg">
                A Mac video organizer and library for the files already on your
                drives. It{" "}
                <span className="font-semibold text-[#1a1a1a]">stays fast</span>{" "}
                with thousands of videos. Browse, tag, filter, and play without
                locking media into a proprietary container. And it&apos;s{" "}
                <span className="font-semibold text-[#1a1a1a]">free forever</span>.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                <Link
                  href="/skagway"
                  className="group relative inline-flex w-fit items-center text-base font-semibold tracking-wide text-[#1a1a1a] transition-colors hover:text-[#8a5a20]"
                >
                  Get Skagway
                  <span
                    aria-hidden
                    className="cta-underline absolute -bottom-1 left-0 h-px w-full bg-[#e8a045]"
                  />
                </Link>
                <Link
                  href="/skagway/manual"
                  className="text-base text-[#4b5563] transition-colors hover:text-[#8a5a20]"
                >
                  Manual →
                </Link>
              </div>
            </article>

            <article
              id="flasher"
              className="flex scroll-mt-8 flex-col rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8"
            >
              <Link
                href="/flasher"
                className="mb-6 flex justify-center overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f4f4f5] py-8 transition-opacity hover:opacity-90 sm:py-10"
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
              <p className="text-sm font-semibold tracking-[0.18em] text-[#8a5a20] uppercase">
                Mac &amp; Windows
              </p>
              <Link
                href="/flasher"
                className="mt-3 block font-display text-3xl font-bold tracking-tight text-[#1a1a1a] transition-colors hover:text-[#8a5a20] sm:text-4xl"
              >
                15CE Flasher
              </Link>
              <p className="mt-3 text-base leading-relaxed text-[#4b5563] sm:text-lg">
                Flasher for the HP 15c and 16c Collector&apos;s Editions, on
                Mac and Windows. Firmware updates without hassle,{" "}
                <span className="font-semibold text-[#1a1a1a]">free forever</span>.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                <Link
                  href="/flasher"
                  className="group relative inline-flex w-fit items-center text-base font-semibold tracking-wide text-[#1a1a1a] transition-colors hover:text-[#8a5a20]"
                >
                  Get 15CE Flasher
                  <span
                    aria-hidden
                    className="cta-underline absolute -bottom-1 left-0 h-px w-full bg-[#e8a045]"
                  />
                </Link>
                <Link
                  href="/flasher/guide"
                  className="text-base text-[#4b5563] transition-colors hover:text-[#8a5a20]"
                >
                  Install Guide →
                </Link>
              </div>
            </article>
          </div>

          {SKAGWAY_UPCOMING ? <SkagwayComingSoon variant="home" /> : null}

          <StudioPromises />

          <AnnouncementSignup tone="light" />
        </div>
      </main>

      <footer className="relative z-10 border-t border-[#e5e7eb] bg-white px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-[#4b5563] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link
              href="/about"
              className="transition-colors hover:text-[#1a1a1a]"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#1a1a1a]"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#1a1a1a]"
            >
              Privacy
            </Link>
            <a
              href="mailto:contact@machiilabs.com"
              className="transition-colors hover:text-[#1a1a1a]"
            >
              Contact Mach II Labs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
