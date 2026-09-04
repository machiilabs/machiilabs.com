import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { MachiiLogo } from "@/components/machii-logo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    absolute: "15CE Flasher — HP 15c CE on Mac",
  },
  description:
    "Free native macOS app to flash HP 15c Collector’s Edition firmware over the official pogo cable. Guided steps — no Windows SAM-BA required.",
  openGraph: {
    title: "15CE Flasher — HP 15c CE on Mac",
    description:
      "Guided native Mac app for HP 15c Collector’s Edition firmware. Pogo cable, no Windows SAM-BA. Free forever from Mach II Labs.",
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
    title: "15CE Flasher — HP 15c CE on Mac",
    description:
      "Guided native Mac app for HP 15c Collector’s Edition firmware. No Windows SAM-BA. Free forever.",
    images: ["/flasher/og.png"],
  },
  alternates: {
    canonical: "https://machiilabs.com/flasher",
  },
};

const DOWNLOAD_URL =
  "https://downloads.machiilabs.com/15CEFlasher-1.1.0-203.dmg";
const VERSION = "1.1.0";
const SHA256 =
  "614964b543aeaf35921ac396191786ea617bb6ef6e379de80819d80fda555405";
const DMG_FILENAME = "15CEFlasher-1.1.0-203.dmg";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "15CE Flasher",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS",
  description:
    "Native macOS app that guides you through flashing HP 15c Collector’s Edition firmware over the official pogo cable. Windows SAM-BA not required.",
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
    <div className="relative min-h-dvh overflow-hidden bg-ink text-snow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(100% 70% at 80% 0%, rgba(61, 111, 154, 0.28) 0%, transparent 55%),
            radial-gradient(80% 50% at 10% 90%, rgba(232, 160, 69, 0.1) 0%, transparent 50%),
            linear-gradient(165deg, #05080f 0%, #0a1220 45%, #081018 100%)
          `,
        }}
      />

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
          <MachiiLogo />
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/flasher/guide"
              className="text-fog transition-colors hover:text-snow"
            >
              Users guide
            </Link>
            <a
              href="mailto:support@machiilabs.com"
              className="text-fog transition-colors hover:text-snow"
            >
              Support
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-14 sm:px-10 sm:pt-20">
        <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div className="relative z-20 max-w-xl lg:pt-2">
            <p className="font-display text-[0.7rem] font-semibold tracking-[0.28em] text-fog uppercase">
              Mac only · free forever · macOS 13+
            </p>
            <h1
              className={`${inter.className} mt-4 text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.03em] text-snow`}
            >
              15CE Flasher
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-fog sm:text-xl">
              A Mac app that flashes HP 15c Collector&apos;s Edition firmware
              over the official pogo cable. Windows SAM-BA is not required —
              this software runs on Mac only, and the app guides you through
              every step of the flashing process.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <DownloadButton
                href={DOWNLOAD_URL}
                meta={`v${VERSION} · macOS 13+`}
              />
              <Link
                href="/flasher/guide"
                className="inline-flex items-center font-display text-sm font-semibold tracking-wide text-snow underline-offset-4 hover:text-afterburn-soft hover:underline"
              >
                Read the users guide →
              </Link>
            </div>
            <p className="mt-3 text-sm text-fog/70">
              Notarized DMG · Windows SAM-BA not required · No HP firmware
              included
            </p>
            <details className="mt-4 text-sm text-fog/70">
              <summary className="cursor-pointer text-fog transition-colors hover:text-snow">
                How do I verify the download?
              </summary>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-fog/60">
                <li>
                  Check the filename is{" "}
                  <span className="font-mono text-fog/80">{DMG_FILENAME}</span>
                </li>
                <li>
                  In Terminal, run{" "}
                  <code className="break-all font-mono text-fog/80">
                    shasum -a 256 /path/to/15CEFlasher-1.1.0-203.dmg
                  </code>
                </li>
                <li>
                  Ensure the output value is{" "}
                  <span className="break-all font-mono text-fog/80">
                    {SHA256}
                  </span>
                </li>
              </ol>
            </details>
          </div>

          <div className="relative z-0 mt-8 min-w-0 w-full lg:mt-[1in] lg:ml-[0.5in]">
            <div className="product-stage">
              <div className="product-frame bg-black p-[20px] sm:p-[30px]">
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
          </div>
        </section>

        <section className="mt-20 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-bold text-snow">
              Step by Step Workflow
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fog">
              A seven-step wizard with diagrams and Continue / Back navigation.
              Status feedback when the cable and SAM-BA connect. There is no
              other software you need to install.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-snow">
              Safe flash layout
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fog">
              Writing starts at address 0x04000. The SAM-BA bootloader below that
              is left intact. Optional backup before you flash; verify after
              write; checksum check on the calculator when you&apos;re done.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-snow">
              What you need
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-fog">
              <li>A Mac running macOS 13 or later</li>
              <li>HP 15c Collector&apos;s Edition</li>
              <li>Official USB-C (or USB-A) pogo programming cable</li>
              <li>
                A 114,688-byte (112 KB) firmware <code className="font-mono text-snow">.bin</code> you
                already have — this download does not include HP firmware
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-snow">
              Privacy
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fog">
              Offline. No telemetry, no network, no automatic diagnostics.
            </p>
          </div>
        </section>

        <aside className="mt-16 max-w-3xl border-l-2 border-afterburn/70 pl-5">
          <p className="text-base leading-relaxed text-fog">
            <span className="font-semibold text-snow">Cable warning.</span> Use
            the pogo cable only on the HP 15c Collector&apos;s Edition. Do not
            use it on an HP 15c Limited Edition, a pre-2015 12C, an HP 20b, or an
            HP 30b — different protocol and voltage; the cable can permanently
            damage those calculators.
          </p>
        </aside>

        <aside className="mt-8 max-w-3xl border-l-2 border-white/20 pl-5">
          <p className="text-base leading-relaxed text-fog">
            <span className="font-semibold text-snow">Disclaimer.</span> 15CE
            Flasher and related documentation are provided as is, without
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
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Mach II Labs · 15CE Flasher · free
            forever
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
