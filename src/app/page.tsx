import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MachiiLogo } from "@/components/machii-logo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mach II Labs",
  description:
    "Independent Mac software lab. First release: 15CE Flasher — free guided app to flash HP 15c Collector’s Edition firmware on Mac. Free forever.",
  openGraph: {
    title: "Mach II Labs — 15CE Flasher for HP 15c CE",
    description:
      "Flash HP 15c Collector’s Edition firmware on Mac with 15CE Flasher. Guided native app, free forever.",
    url: "https://machiilabs.com",
    images: [
      {
        url: "/flasher/og.png",
        width: 1200,
        height: 630,
        alt: "15CE Flasher — Flash HP 15c CE firmware on Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mach II Labs — 15CE Flasher for HP 15c CE",
    description:
      "Flash HP 15c Collector’s Edition firmware on Mac. Free forever.",
    images: ["/flasher/og.png"],
  },
};

export default function Home() {
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

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-6 pt-8 sm:px-10">
        <MachiiLogo wordmarkClassName="text-sm font-semibold tracking-wide text-fog transition-colors group-hover:text-snow" />
      </header>

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

        <p className="anim-rise anim-rise-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-fog sm:text-xl">
          Focused Mac tools for people who notice the small stuff — starting
          with a guided flasher for the HP 15c Collector&apos;s Edition.
        </p>

        <div className="anim-rise anim-rise-delay-3 mt-10 flex flex-col gap-6">
          <div className="flex max-w-3xl flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
            <div className="min-w-0 max-w-xl flex-1">
              <p className="text-sm font-semibold tracking-[0.18em] text-afterburn-soft uppercase">
                Newest release
              </p>
              <Link
                href="/flasher"
                className="mt-3 block text-2xl font-bold tracking-tight text-snow transition-colors hover:text-afterburn-soft sm:text-3xl"
              >
                15CE Flasher
              </Link>
              <p className="mt-3 text-base leading-relaxed text-fog sm:text-lg">
                A Mac-only SAM-BA programmer for the HP 15c Collector&apos;s
                Edition.
                The app walks you through every step of the flashing process —
                free forever.
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
                  Users guide →
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
                priority
                className="h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52"
              />
            </Link>
          </div>

          <a
            href="mailto:support@machiilabs.com"
            className="w-fit text-base text-fog/80 transition-colors hover:text-snow"
          >
            Contact the lab
          </a>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs</span>
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
