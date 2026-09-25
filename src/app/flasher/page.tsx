import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { PogoCableLinks } from "@/components/pogo-cable-links";
import { downloadApiPath } from "@/lib/downloads";

export const metadata: Metadata = {
  title: {
    absolute: "15CE Flasher — Flash HP 15c CE Firmware on Mac or Windows",
  },
  description:
    "Flash HP 15c Collector’s Edition firmware with 15CE Flasher. Free guided app for Mac and Windows over the official pogo cable.",
  openGraph: {
    title: "15CE Flasher — Flash HP 15c CE Firmware on Mac or Windows",
    description:
      "Free Mac and Windows apps to flash HP 15c Collector’s Edition firmware over the pogo cable.",
    url: "https://machiilabs.com/flasher",
    siteName: "Mach II Labs",
    images: [
      {
        url: "/flasher/og.png",
        width: 1200,
        height: 630,
        alt: "15CE Flasher — Flash HP 15c CE firmware",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "15CE Flasher — Flash HP 15c CE Firmware on Mac or Windows",
    description:
      "Free Mac and Windows apps to flash HP 15c Collector’s Edition firmware over the pogo cable.",
    images: ["/flasher/og.png"],
  },
  alternates: {
    canonical: "https://machiilabs.com/flasher",
  },
};

const MAC_DOWNLOAD_HREF = downloadApiPath("flasher");
const WIN_DOWNLOAD_HREF = downloadApiPath("winflasher");

const MAC_VERSION = "1.3.0";
const MAC_BUILD = "217";
const MAC_SHA256 =
  "16b92b28b137fa773cd1b9f31e28e677dc99b982b835d78bf952aa90ffa39c30";
const MAC_FILENAME = "15CEFlasher-1.3.0-217.dmg";

const WIN_VERSION = "1.1.0";
const WIN_BUILD = "110";
const WIN_SHA256 =
  "66108db0837e31e67b2a08d2eb3fd4fe235cc933730279d56fe312a2ec973dda";
const WIN_FILENAME = "15CEFlasher-Win-1.1.0-110.exe";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "15CE Flasher",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS",
      description:
        "Flash HP 15c Collector’s Edition firmware on a Mac over the official pogo cable.",
      url: "https://machiilabs.com/flasher",
      softwareVersion: MAC_VERSION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: {
        "@type": "Organization",
        name: "Mach II Labs",
        url: "https://machiilabs.com",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "15CE Flasher for Windows",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows",
      description:
        "Flash HP 15c Collector’s Edition firmware on Windows over the official pogo cable.",
      url: "https://machiilabs.com/flasher#windows",
      softwareVersion: WIN_VERSION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: {
        "@type": "Organization",
        name: "Mach II Labs",
        url: "https://machiilabs.com",
      },
    },
  ],
};

export default function FlasherPage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <SiteHeader product="flasher" tone="light" active="flasher" />

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
              Free · Mac &amp; Windows
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] font-bold tracking-tight text-[#1a1a1a]">
              15CE Flasher
            </h1>
            <p className="mt-4 text-xl font-semibold tracking-tight text-[#1a1a1a] sm:text-2xl">
              Flash HP 15c CE firmware on Mac or Windows.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#374151] sm:text-lg">
              Guided app for the HP 15c Collector&apos;s Edition over the
              official pogo cable. Choose your platform below — the app walks you
              through every step.
            </p>
            <Link
              href="/flasher/guide"
              className="mt-6 inline-flex items-center text-sm font-semibold tracking-wide text-[#1d4ed8] underline-offset-2 hover:underline"
            >
              Install help &amp; troubleshooting →
            </Link>
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

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div
            id="mac"
            className="scroll-mt-24 rounded-lg border border-[#e5e7eb] bg-white p-6"
          >
            <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
              macOS 13+
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#1a1a1a]">Mac</h2>
            <a
              href={MAC_DOWNLOAD_HREF}
              className="mt-5 inline-flex items-center gap-3 bg-[#1a1a1a] px-6 py-3.5 text-base font-semibold tracking-wide text-white transition-colors hover:bg-[#374151]"
            >
              Download free
              <span className="text-sm font-medium text-white/70">
                v{MAC_VERSION} ({MAC_BUILD})
              </span>
            </a>
            <p className="mt-3 text-sm text-[#6b7280]">Notarized DMG</p>
            <details className="mt-4 text-sm text-[#6b7280]">
              <summary className="cursor-pointer text-[#4b5563] transition-colors hover:text-[#1a1a1a]">
                Verify download (SHA-256)
              </summary>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed">
                <li>
                  Filename:{" "}
                  <span className="font-mono text-[#374151]">{MAC_FILENAME}</span>
                </li>
                <li>
                  In Terminal:{" "}
                  <code className="break-all font-mono text-[#374151]">
                    shasum -a 256 /path/to/{MAC_FILENAME}
                  </code>
                </li>
                <li>
                  Expected:{" "}
                  <span className="break-all font-mono text-[#374151]">
                    {MAC_SHA256}
                  </span>
                </li>
              </ol>
            </details>
          </div>

          <div
            id="windows"
            className="scroll-mt-24 rounded-lg border border-[#e5e7eb] bg-white p-6"
          >
            <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
              Windows 10/11 · 64-bit
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#1a1a1a]">
              Windows
            </h2>
            <a
              href={WIN_DOWNLOAD_HREF}
              className="mt-5 inline-flex items-center gap-3 bg-[#1a1a1a] px-6 py-3.5 text-base font-semibold tracking-wide text-white transition-colors hover:bg-[#374151]"
            >
              Download free
              <span className="text-sm font-medium text-white/70">
                v{WIN_VERSION} ({WIN_BUILD})
              </span>
            </a>
            <p className="mt-3 text-sm text-[#6b7280]">
              Self-contained app · unsigned (see SmartScreen note below)
            </p>
            <details className="mt-4 text-sm text-[#6b7280]">
              <summary className="cursor-pointer text-[#4b5563] transition-colors hover:text-[#1a1a1a]">
                Verify download (SHA-256)
              </summary>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed">
                <li>
                  Filename:{" "}
                  <span className="font-mono text-[#374151]">{WIN_FILENAME}</span>
                </li>
                <li>
                  In PowerShell:{" "}
                  <code className="break-all font-mono text-[#374151]">
                    Get-FileHash -Algorithm SHA256
                    &quot;$env:USERPROFILE\Downloads\{WIN_FILENAME}&quot;
                  </code>
                </li>
                <li>
                  Expected:{" "}
                  <span className="break-all font-mono text-[#374151]">
                    {WIN_SHA256}
                  </span>
                </li>
              </ol>
            </details>
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-[#e5e7eb] pt-14 sm:grid-cols-2 sm:gap-12">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Modes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              <strong className="font-semibold text-[#1a1a1a]">DEMO</strong>{" "}
              walks through the wizard with a simulated calculator — no hardware
              required.{" "}
              <strong className="font-semibold text-[#1a1a1a]">FLASH</strong> is
              the full seven-step wizard for one CE.{" "}
              <strong className="font-semibold text-[#1a1a1a]">BATCH</strong>{" "}
              flashes many calculators in sequence with the same firmware.{" "}
              <strong className="font-semibold text-[#1a1a1a]">
                Connection Probe
              </strong>{" "}
              lets you confirm the cable and SAM-BA detection on real hardware
              before flashing firmware.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Step-by-step workflow
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              A seven-step wizard with diagrams and navigation. Status feedback
              when the cable and SAM-BA connect. No other software to install.
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
              <li>
                A Mac (macOS 13+) or a PC (Windows 10/11, 64-bit)
              </li>
              <li>
                HP 15c Collector&apos;s Edition (primary).
                <p className="mt-2 border-l-2 border-[#e5e7eb] pl-4 text-sm leading-relaxed text-[#6b7280]">
                  Field reports suggest that the HP 16c CE and post-2015 HP 12c
                  also work with this software — they have the same ATSAM4LC2C
                  chip; use at your own risk and confirm the firmware matches
                  your calculator.
                </p>
              </li>
              <li>
                Official USB-C (or USB-A) pogo programming cable. You can get it
                at <PogoCableLinks />.
              </li>
              <li>
                A 114,688-byte (112 KB) firmware{" "}
                <code className="font-mono text-sm text-[#1a1a1a]">.bin</code>{" "}
                from HP — not included with this download (see the{" "}
                <Link
                  href="/flasher/guide"
                  className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
                >
                  install help
                </Link>
                )
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              Windows SmartScreen
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#374151]">
              The Windows build is unsigned. If SmartScreen blocks the app,
              choose <strong>More info</strong> → <strong>Run anyway</strong>.
            </p>
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
          <span>No ads · No subscriptions · No tracking</span>
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
