import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MachiiLogo } from "@/components/machii-logo";
import { PRODUCT_DOWNLOADS, downloadApiPath } from "@/lib/downloads";

export const metadata: Metadata = {
  title: {
    absolute: "Flash HP 15c CE Firmware on Mac — 15CE Flasher",
  },
  description:
    "Flash HP 15c Collector’s Edition firmware on a Mac with 15CE Flasher. Free guided app over the official pogo cable — Mac only, free forever.",
  openGraph: {
    title: "Flash HP 15c CE Firmware on Mac — 15CE Flasher",
    description:
      "Free Mac app to flash HP 15c Collector’s Edition firmware over the pogo cable. Guided steps. Free forever from Mach II Labs.",
    url: "https://machiilabs.com/flasher",
    siteName: "Mach II Labs",
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
    title: "Flash HP 15c CE Firmware on Mac — 15CE Flasher",
    description:
      "Free Mac app to flash HP 15c Collector’s Edition firmware over the pogo cable. Free forever.",
    images: ["/flasher/og.png"],
  },
  alternates: {
    canonical: "https://machiilabs.com/flasher",
  },
};

const DOWNLOAD_URL = PRODUCT_DOWNLOADS.flasher;
const DOWNLOAD_HREF = downloadApiPath("flasher");
const VERSION = "1.2.1";
const BUILD = "213";
const SHA256 =
  "6870d96105001aaef0a636760752da829616c9c3efb2224bb06ec5101bdea858";
const DMG_FILENAME = "15CEFlasher-1.2.1-213.dmg";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "15CE Flasher",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS",
  description:
    "Flash HP 15c Collector’s Edition firmware on a Mac over the official pogo cable. Guided native app from Mach II Labs.",
  url: "https://machiilabs.com/flasher",
  downloadUrl: DOWNLOAD_URL,
  softwareVersion: VERSION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Mach II Labs",
    url: "https://machiilabs.com",
  },
};

export default function FlasherPage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
          <MachiiLogo tone="light" />
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/flasher/guide"
              className="text-[#4b5563] transition-colors hover:text-[#1a1a1a]"
            >
              Users guide
            </Link>
            <a
              href="mailto:support@machiilabs.com"
              className="text-[#4b5563] transition-colors hover:text-[#1a1a1a]"
            >
              Support
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
              Mac only · free forever · macOS 13+
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] font-bold tracking-tight text-[#1a1a1a]">
              15CE Flasher
            </h1>
            <p className="mt-4 text-xl font-semibold tracking-tight text-[#1a1a1a] sm:text-2xl">
              Flash HP 15c CE firmware on a Mac.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#374151] sm:text-lg">
              Free guided app for the HP 15c Collector&apos;s Edition over the
              official pogo cable. Mac only — the app walks you through every
              step of the flashing process.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={DOWNLOAD_HREF}
                className="inline-flex items-center gap-3 bg-[#1a1a1a] px-6 py-3.5 text-base font-semibold tracking-wide text-white transition-colors hover:bg-[#374151]"
              >
                Download free
                <span className="text-sm font-medium text-white/70">
                  v{VERSION} ({BUILD}) · macOS 13+
                </span>
              </a>
              <Link
                href="/flasher/guide"
                className="inline-flex items-center text-sm font-semibold tracking-wide text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                Read the users guide →
              </Link>
            </div>
            <p className="mt-3 text-sm text-[#6b7280]">
              Notarized DMG · Mac only · No HP firmware included
            </p>
            <p className="mt-2 text-sm text-[#6b7280]">
              Built for Mac users who previously needed Windows SAM-BA — you
              don&apos;t anymore.
            </p>
            <details className="mt-4 text-sm text-[#6b7280]">
              <summary className="cursor-pointer text-[#4b5563] transition-colors hover:text-[#1a1a1a]">
                How do I verify the download?
              </summary>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-[#6b7280]">
                <li>
                  Check the filename is{" "}
                  <span className="font-mono text-[#374151]">{DMG_FILENAME}</span>
                </li>
                <li>
                  In Terminal, run{" "}
                  <code className="break-all font-mono text-[#374151]">
                    shasum -a 256 /path/to/{DMG_FILENAME}
                  </code>
                </li>
                <li>
                  Ensure the output value is{" "}
                  <span className="break-all font-mono text-[#374151]">
                    {SHA256}
                  </span>
                </li>
              </ol>
            </details>
          </div>

          <div className="min-w-0 w-full">
            <div className="overflow-hidden border border-[#e5e7eb] bg-white shadow-sm">
              <Image
                src="/flasher/15CE Flasher.png"
                alt="15CE Flasher — guided flashing wizard"
                width={2024}
                height={1744}
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-[#e5e7eb] pt-14 sm:grid-cols-2 sm:gap-12">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Three modes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              <strong className="font-semibold text-[#1a1a1a]">DEMO</strong>{" "}
              walks through the wizard with a simulated calculator — no hardware
              required to learn the steps.{" "}
              <strong className="font-semibold text-[#1a1a1a]">FLASH</strong> is
              the full seven-step wizard for one CE.{" "}
              <strong className="font-semibold text-[#1a1a1a]">BATCH</strong> is
              for experienced operators and those who want to flash multiple
              calculators in sequence.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Step by Step Workflow
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              A seven-step wizard with diagrams and Continue / Back navigation.
              Status feedback when the cable and SAM-BA connect. There is no
              other software you need to install.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Safe flash layout
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              Writing starts at address 0x04000. The SAM-BA bootloader below that
              is left intact. Optional backup before you flash; verify after
              write; checksum check on the calculator when you&apos;re done.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              What you need
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#374151]">
              <li>A Mac running macOS 13 or later</li>
              <li>
                HP 15c Collector&apos;s Edition (primary). There are field
                reports that Flasher also works with the HP 16c CE and post-2015
                HP 12c. These calculators use the same ATSAM4LC2C chip as the HP
                15c CE — use at your own risk and confirm the firmware file
                matches the calculator.
              </li>
              <li>Official USB-C (or USB-A) pogo programming cable</li>
              <li>
                A 114,688-byte (112 KB) firmware{" "}
                <code className="font-mono text-sm text-[#1a1a1a]">.bin</code>{" "}
                you already have — this download does not include HP firmware
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Privacy
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              Offline. No telemetry, no network, no automatic diagnostics.
            </p>
          </div>
        </section>

        <aside className="mt-14 max-w-3xl border-l-2 border-[#f59e0b] pl-5">
          <p className="text-base leading-relaxed text-[#374151]">
            <span className="font-semibold text-[#1a1a1a]">Cable warning.</span>{" "}
            Use the pogo cable only on calculators designed for it (HP 15c
            Collector&apos;s Edition and the same post-2015 USB-pogo family). Do
            not use it on an HP 15c Limited Edition, a pre-2015 12C, an HP 20b,
            or an HP 30b — different protocol and voltage; the cable can
            permanently damage those calculators.
          </p>
        </aside>

        <aside className="mt-6 max-w-3xl border-l-2 border-[#9ca3af] pl-5">
          <p className="text-base leading-relaxed text-[#374151]">
            <span className="font-semibold text-[#1a1a1a]">Disclaimer.</span>{" "}
            15CE Flasher and related documentation are provided as is, without
            warranty of any kind. Although we have employed several safeguards
            to help keep this software safe, flashing firmware can wipe user
            memory, leave the calculator unusable, or permanently brick the
            device. You are solely responsible for backups, choosing a correct
            firmware file, and following the app&apos;s instructions. If the
            instructions are not clear in DEMO mode, do not execute in FLASH
            mode. Mach II Labs is not liable for damage, data loss, or repair
            costs arising from use of this software.
          </p>
        </aside>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-[#6b7280]">
          Mach II Labs is not affiliated with HP, Atmel, or Microchip. The
          download does not include HP firmware. Flash helper applet from Atmel
          SAM-BA 2.16 redistributed under the SAM Software Package License.
        </p>
      </main>

      <footer className="border-t border-[#e5e7eb] bg-white px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Mach II Labs · 15CE Flasher · free
            forever
          </span>
          <a
            href="mailto:support@machiilabs.com"
            className="transition-colors hover:text-[#1a1a1a]"
          >
            support@machiilabs.com
          </a>
        </div>
      </footer>
    </div>
  );
}
