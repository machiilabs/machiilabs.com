import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { PogoCableLinks } from "@/components/pogo-cable-links";
import { downloadApiPath } from "@/lib/downloads";

export const metadata: Metadata = {
  title: {
    absolute: "15CE Flasher — Install Help & Troubleshooting",
  },
  description:
    "Install 15CE Flasher on Mac or Windows, verify downloads, and fix common connection issues. The app guides you through flashing — you do not need to memorize steps here.",
  openGraph: {
    title: "15CE Flasher — Install Help & Troubleshooting",
    description:
      "Install help and troubleshooting for 15CE Flasher on Mac and Windows.",
    url: "https://machiilabs.com/flasher/guide",
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
    title: "15CE Flasher — Install Help & Troubleshooting",
    description:
      "Install help and troubleshooting for 15CE Flasher on Mac and Windows.",
    images: ["/flasher/og.png"],
  },
  alternates: {
    canonical: "https://machiilabs.com/flasher/guide",
  },
};

const MAC_DOWNLOAD_HREF = downloadApiPath("flasher");
const WIN_DOWNLOAD_HREF = downloadApiPath("winflasher");
const FIRMWARE_URL =
  "https://hpcalcs.com/downloads/apps/HP_IAR_USB%20120ms.bin";

const MAC_SHA256 =
  "16b92b28b137fa773cd1b9f31e28e677dc99b982b835d78bf952aa90ffa39c30";
const MAC_FILENAME = "15CEFlasher-1.3.0-217.dmg";

const WIN_SHA256 =
  "66108db0837e31e67b2a08d2eb3fd4fe235cc933730279d56fe312a2ec973dda";
const WIN_FILENAME = "15CEFlasher-Win-1.1.0-110.exe";

function StuckDetails({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-lg border border-[#e5e7eb] bg-white">
      <summary className="cursor-pointer list-none px-4 py-3 text-base font-semibold text-[#1a1a1a] marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          {title}
          <span
            aria-hidden
            className="text-[#9ca3af] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </span>
      </summary>
      <div className="border-t border-[#e5e7eb] px-4 py-4 text-base leading-relaxed text-[#374151]">
        {children}
      </div>
    </details>
  );
}

export default function FlasherGuidePage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <SiteHeader
        product="flasher"
        tone="light"
        active="flasher-guide"
        maxWidth="3xl"
        contentClassName="sm:px-8"
      />

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12 sm:px-8">
        <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
          15CE Flasher · Install help
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
          Install help &amp; troubleshooting
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#374151]">
          You do not need to study this page before flashing. Download{" "}
          <strong className="font-semibold text-[#1a1a1a]">15CE Flasher</strong>
          , choose <strong>FLASH</strong>, and follow the in-app wizard — it
          shows diagrams, status messages, and Back / Next on every step.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="/flasher#mac"
            className="font-semibold text-[#1d4ed8] underline-offset-2 hover:underline"
          >
            Download for Mac
          </Link>
          <Link
            href="/flasher#windows"
            className="font-semibold text-[#1d4ed8] underline-offset-2 hover:underline"
          >
            Download for Windows
          </Link>
          <a
            href={FIRMWARE_URL}
            className="font-semibold text-[#1d4ed8] underline-offset-2 hover:underline"
          >
            Latest HP firmware
          </a>
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Quick start
          </h2>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Download and install the app for{" "}
              <Link
                href="/flasher#mac"
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                Mac
              </Link>{" "}
              or{" "}
              <Link
                href="/flasher#windows"
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                Windows
              </Link>{" "}
              (details below if you need them).
            </li>
            <li>
              Open 15CE Flasher and choose{" "}
              <strong>FLASH</strong> on the welcome screen.
            </li>
            <li>
              Follow the seven-step wizard. The app tells you what to do at each
              step — plug in the cable, enter programming mode, save a backup,
              pick your firmware file, flash, restart, and optionally confirm the
              checksum.
            </li>
          </ol>
          <figure className="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <Image
              src="/flasher/15CE Flasher.png"
              alt="15CE Flasher wizard with the step checklist and cable diagram"
              width={2024}
              height={1744}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-[#e5e7eb] px-4 py-3 text-sm text-[#6b7280]">
              The app is the guide — button labels and status text in the window
              are always current.
            </figcaption>
          </figure>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            What you need
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              A Mac (macOS 13+) or a PC (Windows 10/11, 64-bit)
            </li>
            <li>
              HP 15c Collector&apos;s Edition and the official pogo cable. You
              can get it at <PogoCableLinks />.
            </li>
            <li>
              A 114,688-byte firmware{" "}
              <code className="font-mono text-sm">.bin</code> from HP —{" "}
              <a
                href={FIRMWARE_URL}
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                download here
              </a>{" "}
              (not included with 15CE Flasher)
            </li>
          </ul>
          <p className="mt-4 border-l-2 border-[#f59e0b] pl-4 text-sm leading-relaxed text-[#4b5563]">
            <span className="font-bold text-[#1a1a1a]">Cable warning.</span> Use
            this cable only on the HP 15c Collector&apos;s Edition. It can
            permanently damage other calculators.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Install on Mac
          </h2>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Download{" "}
              <a
                href={MAC_DOWNLOAD_HREF}
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                {MAC_FILENAME}
              </a>
              .
            </li>
            <li>
              Open the disk image and drag <strong>15CE Flasher</strong> to
              Applications.
            </li>
          </ol>
          <details className="mt-4 text-sm text-[#6b7280]">
            <summary className="cursor-pointer text-[#4b5563] transition-colors hover:text-[#1a1a1a]">
              Verify download (SHA-256)
            </summary>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed">
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
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Install on Windows
          </h2>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Download{" "}
              <a
                href={WIN_DOWNLOAD_HREF}
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                {WIN_FILENAME}
              </a>
              .
            </li>
            <li>
              Run the <code className="font-mono text-sm">.exe</code>. If
              SmartScreen warns about an unknown publisher, choose{" "}
              <strong>More info</strong> → <strong>Run anyway</strong>.
            </li>
          </ol>
          <details className="mt-4 text-sm text-[#6b7280]">
            <summary className="cursor-pointer text-[#4b5563] transition-colors hover:text-[#1a1a1a]">
              Verify download (SHA-256)
            </summary>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed">
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
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Optional: try before you flash
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            <strong className="text-[#1a1a1a]">DEMO</strong> walks through the
            same wizard with a simulated calculator — no cable required. Mac and
            Windows both support it. Good if you want to see the flow before
            touching real hardware.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            <strong className="text-[#1a1a1a]">Connection Probe</strong> connects
            to your real calculator and confirms detection without flashing
            firmware. Use it if the cable step in FLASH is not connecting and
            you want a quick yes/no before you pick a{" "}
            <code className="font-mono text-sm">.bin</code> file.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            If you get stuck
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            Expand a topic below. The in-app wizard still has the full diagrams
            and instructions — these notes are for when something does not match
            what you expected.
          </p>
          <div className="mt-5 space-y-3">
            <StuckDetails title="Calculator not connecting">
              <p>
                On the cable switch box: hold <strong>ERASE</strong>, press{" "}
                <strong>RESET</strong>, then release <strong>ERASE</strong>. The
                calculator display stays off; the ON key is ignored in
                programming mode.
              </p>
              <p className="mt-3">
                When the app connects, status shows{" "}
                <strong>Connected: ATSAM4LC2C</strong> and{" "}
                <strong>Next</strong> becomes available.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Plug the cable directly into the computer — USB hubs can be
                  unreliable.
                </li>
                <li>
                  Try <strong>Connection Probe</strong> on the welcome screen for
                  a connection-only test.
                </li>
                <li>
                  <strong>Windows:</strong> after ERASE+RESET, Windows may show
                  more than one COM port. The app uses the Atmel SAM-BA port, not
                  FTDI.
                </li>
                <li>
                  <strong>Mac:</strong> the programming port appears as{" "}
                  <code className="font-mono text-xs">cu.usbmodem…</code>.
                </li>
              </ul>
              <figure className="mt-4 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f7f6f3]">
                <Image
                  src="/flasher/guide/wizard-programming-mode.png"
                  alt="Diagram: hold ERASE, press RESET, then release ERASE"
                  width={1200}
                  height={400}
                  className="h-auto w-full"
                />
              </figure>
            </StuckDetails>

            <StuckDetails title="Pogo cable won't seat">
              <p>
                The pogo head is keyed — it has a <strong>wide</strong> side and
                a <strong>narrow</strong> side. Line those up with the port and
                squeeze the sides as you push until it snaps in.
              </p>
            </StuckDetails>

            <StuckDetails title="Backup and firmware file">
              <p>
                On the <strong>Backup</strong> step,{" "}
                <strong>Save backup…</strong> writes a{" "}
                <code className="font-mono text-sm">.bin</code> of what is on the
                calculator now. Choose <strong>Skip backup</strong> only if you
                already have a known-good copy.
              </p>
              <p className="mt-3">
                On the <strong>Firmware</strong> step, pick your 114,688-byte HP{" "}
                <code className="font-mono text-sm">.bin</code>. The app checks
                the file before flash unlocks.
              </p>
            </StuckDetails>

            <StuckDetails title="After flashing — Pr Error and user memory">
              <p>
                Press <strong>RESET</strong> on the cable box, turn the calculator
                on, and press any key to clear <strong>Pr Error</strong> — that
                is expected. User memory was cleared; that is normal too.
              </p>
              <p className="mt-3">
                If something looks wrong, restore from the backup you saved in
                the app or re-flash another{" "}
                <code className="font-mono text-sm">.bin</code>. The bootloader
                below address 0x04000 was not overwritten.
              </p>
            </StuckDetails>

            <StuckDetails title="Checksum test on the calculator">
              <p>
                The last wizard step walks you through this. Turn the calculator{" "}
                <strong>OFF</strong>, hold <strong>g</strong> and{" "}
                <strong>ENTER</strong>, press <strong>ON</strong>, then release
                keys in the order the app shows. Press <strong>2</strong> when
                you see <strong>1.L 2.C 3.H</strong>, and compare the display to
                the value shown in the app.
              </p>
              <figure className="mt-4 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f7f6f3]">
                <Image
                  src="/flasher/guide/wizard-checksum.png"
                  alt="Diagram: calculator keys for the checksum test menu"
                  width={1200}
                  height={400}
                  className="h-auto w-full"
                />
              </figure>
            </StuckDetails>

            <StuckDetails title="Batch mode (many calculators)">
              <p>
                Choose <strong>BATCH</strong> on the welcome screen when you
                already know ERASE+RESET and want to flash several CE units with
                the same firmware. Pick your{" "}
                <code className="font-mono text-sm">.bin</code> once, set backup
                policy, click <strong>Start batch</strong>, then ERASE+RESET each
                calculator in turn. The app connects and flashes automatically.
              </p>
            </StuckDetails>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Privacy &amp; support
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            The app is offline: no telemetry, no network, no automatic
            diagnostics. Questions:{" "}
            <a
              href="mailto:support@machiilabs.com"
              className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
            >
              support@machiilabs.com
            </a>
            .
          </p>
        </section>

        <p className="mt-16 text-sm leading-relaxed text-[#6b7280]">
          Mach II Labs is not affiliated with HP, Atmel, or Microchip. The
          download does not include HP firmware. Flash helper applet from Atmel
          SAM-BA 2.16 redistributed under the SAM Software Package License.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#6b7280]">
          Flashing firmware can wipe user memory or leave the calculator
          unusable if instructions are not followed. You are responsible for
          backups and choosing a correct firmware file. If DEMO mode does not
          make the steps clear, do not proceed in FLASH mode.
        </p>
      </main>

      <footer className="border-t border-[#e5e7eb] bg-white px-6 py-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-1 text-sm text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs · 15CE Flasher</span>
          <span>No ads · No subscriptions · No tracking</span>
          <Link href="/flasher" className="hover:text-[#1a1a1a]">
            ← Back to product
          </Link>
        </div>
      </footer>
    </div>
  );
}
