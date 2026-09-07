import type { Metadata } from "next";
import Link from "next/link";
import { MachiiLogo } from "@/components/machii-logo";
import { downloadApiPath } from "@/lib/downloads";

export const metadata: Metadata = {
  title: {
    absolute: "15CE Flasher for Windows — Beta",
  },
  description:
    "Windows beta for flashing HP 15c Collector's Edition firmware. Connection probe and guided flasher from Mach II Labs.",
  openGraph: {
    title: "15CE Flasher for Windows — Beta",
    description:
      "Windows beta app to detect and flash HP 15c CE firmware over the pogo cable.",
    url: "https://machiilabs.com/winflasher",
    siteName: "Mach II Labs",
  },
  alternates: {
    canonical: "https://machiilabs.com/winflasher",
  },
};

const DOWNLOAD_HREF = downloadApiPath("winflasher");
const VERSION = "0.1.0";
const BUILD = "100";
const EXE_FILENAME = "15CEFlasher-Win-0.1.0-100.exe";
const SHA256 =
  "2e7fc5c31fc83b613abd7c49416229a6e2220a54c0de4eea95248431b8fbb425";

export default function WinFlasherPage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
          <MachiiLogo tone="light" />
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/flasher"
              className="text-[#4b5563] transition-colors hover:text-[#1a1a1a]"
            >
              Mac version
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

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
          Windows beta · free · Win 10/11
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-bold tracking-tight">
          15CE Flasher for Windows
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#374151]">
          Beta build for the HP 15c Collector&apos;s Edition programming cable.
          Includes a <strong>Connection Probe</strong> to verify SAM-BA detection,
          plus FLASH, BATCH, and DEMO modes.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={DOWNLOAD_HREF}
            className="inline-flex items-center gap-3 bg-[#1a1a1a] px-6 py-3.5 text-base font-semibold tracking-wide text-white transition-colors hover:bg-[#374151]"
          >
            Download beta
            <span className="text-sm font-normal opacity-80">
              v{VERSION} ({BUILD})
            </span>
          </a>
        </div>

        <dl className="mt-8 grid gap-3 rounded-lg border border-[#e5e7eb] bg-white p-6 text-sm">
          <div>
            <dt className="font-semibold text-[#6b7280]">File</dt>
            <dd className="mt-1 font-mono text-xs break-all">{EXE_FILENAME}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#6b7280]">SHA-256</dt>
            <dd className="mt-1 font-mono text-xs break-all">{SHA256}</dd>
            <dd className="mt-2 text-[#6b7280]">
              Updated when a new build is uploaded to the CDN.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#6b7280]">Requirements</dt>
            <dd className="mt-1 text-[#374151]">
              Windows 10 or 11 (64-bit) and the official HP pogo programming
              cable. No separate .NET install — the download is a
              self-contained app.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#6b7280]">SmartScreen</dt>
            <dd className="mt-1 text-[#374151]">
              Beta builds are unsigned. If Windows blocks the app, choose{" "}
              <strong>More info</strong> → <strong>Run anyway</strong>.
            </dd>
          </div>
        </dl>

        <section className="mt-10 space-y-4 text-[#374151]">
          <h2 className="text-xl font-semibold text-[#1a1a1a]">
            Connection Probe
          </h2>
          <p>
            Start with <strong>Connection Probe</strong> on the welcome screen.
            Hold ERASE, press RESET, then release ERASE. When the app shows{" "}
            <strong>Connected: ATSAM4LC2C</strong>, Windows is talking to the
            calculator over the correct COM port (Atmel <code>03EB:6124</code>,
            not FTDI).
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <p className="font-semibold">Beta notice</p>
          <p className="mt-2">
            This Windows port is in active testing. Flash only with a known-good
            firmware file. The Mac app at{" "}
            <Link href="/flasher" className="underline hover:text-[#1a1a1a]">
              machiilabs.com/flasher
            </Link>{" "}
            remains the primary supported release.
          </p>
        </section>
      </main>
    </div>
  );
}
