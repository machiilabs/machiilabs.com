import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementSignup } from "@/components/announcement-signup";
import { MachiiLogo } from "@/components/machii-logo";
import { SiteHeader } from "@/components/site-header";
import {
  latestSkagwayRelease,
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
    "Independent Mac software lab. Skagway 1.1 — free video organizer for files already on your drives. Also: 15CE Flasher for HP 15c CE.",
  alternates: {
    canonical: "https://machiilabs.com",
  },
  openGraph: {
    title: "Mach II Labs — Skagway 1.1",
    description:
      "Skagway 1.1 is out: collect clips while you browse, List hover preview, and more. Free Mac video organizer for the files already on your drives.",
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
    title: "Mach II Labs — Skagway 1.1",
    description:
      "Skagway 1.1 is out: collect clips while you browse, List hover preview, and more.",
    images: ["/skagway/product.png"],
  },
};

export default function Home() {
  const latestSkagway = latestSkagwayRelease();
  const skagwayReleaseLines = skagwayHomeReleaseLines(latestSkagway);
  const skagwayMinorVersion = latestSkagway.version.replace(/\.0$/, "");

  return (
    <div
      className={`${inter.className} relative min-h-dvh overflow-hidden bg-ink text-snow`}
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

        <h1 className="anim-rise anim-rise-delay-1 mt-5">
          <MachiiLogo
            href={null}
            wordmarkLayout="stacked"
            className="text-[clamp(2.75rem,9vw,5.5rem)]"
          />
        </h1>

        <p className="anim-rise anim-rise-delay-2 mt-8 max-w-2xl font-display text-2xl leading-snug font-semibold tracking-tight text-snow sm:text-3xl">
          Focused Mac tools for people who notice the small stuff.
        </p>

        <div className="anim-rise anim-rise-delay-3 mt-10 flex flex-col gap-12">
          <div className="flex max-w-3xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
            <div className="min-w-0 max-w-xl flex-1">
              <p className="text-sm font-semibold tracking-[0.18em] text-afterburn-soft uppercase">
                Newest release · {skagwayVersionLabel(latestSkagway.version)}
              </p>
              <Link
                href="/skagway"
                className="mt-3 block text-2xl font-bold tracking-tight text-snow transition-colors hover:text-afterburn-soft sm:text-3xl"
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
              {skagwayReleaseLines.length > 0 ? (
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
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
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
            </div>

            <Link
              href="/skagway"
              className="shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-opacity hover:opacity-90"
              aria-label="Skagway"
            >
              <Image
                src="/skagway/product.png"
                alt=""
                width={4704}
                height={2504}
                priority
                className="h-auto w-44 sm:w-52 lg:w-60"
              />
            </Link>
          </div>

          <div className="flex max-w-3xl flex-col items-start gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:gap-12">
            <div className="min-w-0 max-w-xl flex-1">
              <p className="text-sm font-semibold tracking-[0.18em] text-fog/80 uppercase">
                Also from the lab
              </p>
              <Link
                href="/flasher"
                className="mt-3 block text-2xl font-bold tracking-tight text-snow transition-colors hover:text-afterburn-soft sm:text-3xl"
              >
                15CE Flasher
              </Link>
              <p className="mt-3 text-base leading-relaxed text-fog sm:text-lg">
                SAM-BA programmer for the HP 15c Collector&apos;s Edition on Mac
                and Windows. Firmware updates without hassle,{" "}
                <span className="font-semibold text-snow">free forever</span>.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
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
            </div>

            <Link
              href="/flasher"
              className="shrink-0 overflow-hidden rounded-[22%] transition-opacity hover:opacity-90"
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
          </div>

          <AnnouncementSignup />
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs</span>
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
