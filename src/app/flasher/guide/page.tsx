import type { Metadata } from "next";
import Link from "next/link";
import { MachiiLogo } from "@/components/machii-logo";
import { downloadApiPath } from "@/lib/downloads";

export const metadata: Metadata = {
  title: {
    absolute: "How to Flash HP 15c CE Firmware on a Mac — 15CE Flasher Guide",
  },
  description:
    "How to flash HP 15c Collector’s Edition firmware on a Mac with 15CE Flasher: install the free app, use the official pogo cable, and follow guided on-screen steps.",
  openGraph: {
    title: "How to Flash HP 15c CE Firmware on a Mac — 15CE Flasher Guide",
    description:
      "Step-by-step: flash HP 15c Collector’s Edition firmware on Mac with 15CE Flasher over the official pogo cable.",
    url: "https://machiilabs.com/flasher/guide",
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
    title: "How to Flash HP 15c CE Firmware on a Mac — 15CE Flasher Guide",
    description:
      "Flash HP 15c Collector’s Edition firmware on a Mac with 15CE Flasher. Guided steps over the pogo cable.",
    images: ["/flasher/og.png"],
  },
  alternates: {
    canonical: "https://machiilabs.com/flasher/guide",
  },
};

const DOWNLOAD_HREF = downloadApiPath("flasher");
const FIRMWARE_URL =
  "https://hpcalcs.com/downloads/apps/HP_IAR_USB%20120ms.bin";
const SHA256 =
  "6870d96105001aaef0a636760752da829616c9c3efb2224bb06ec5101bdea858";
const DMG_FILENAME = "15CEFlasher-1.2.1-213.dmg";

export default function FlasherGuidePage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <MachiiLogo tone="light" />
            <Link
              href="/flasher"
              className="font-semibold text-[#1a1a1a]"
            >
              15CE Flasher
            </Link>
          </div>
          <a
            href="mailto:support@machiilabs.com"
            className="text-sm text-[#4b5563] hover:text-[#1a1a1a]"
          >
            Support
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12 sm:px-8">
        <p className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
          15CE Flasher · Users guide
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
          How to flash HP 15c CE firmware on a Mac
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#374151]">
          Use{" "}
          <strong className="font-semibold text-[#1a1a1a]">15CE Flasher</strong>{" "}
          to flash HP 15c Collector&apos;s Edition firmware on a Mac over the
          official pogo cable. You do not need a separate procedure document:{" "}
          <strong className="font-semibold text-[#1a1a1a]">
            the app guides you through every step
          </strong>{" "}
          with diagrams, status messages, and Continue / Back.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            href={DOWNLOAD_HREF}
            className="font-semibold text-[#1d4ed8] underline-offset-2 hover:underline"
          >
            Download 15CE Flasher
          </a>
          <a
            href={FIRMWARE_URL}
            className="font-semibold text-[#1d4ed8] underline-offset-2 hover:underline"
          >
            Latest HP firmware
          </a>
          <Link
            href="/flasher"
            className="text-[#4b5563] underline-offset-2 hover:text-[#1a1a1a] hover:underline"
          >
            Product page
          </Link>
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Before you start
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              A Mac running macOS 13 or later (this software runs on Mac only —
              you do not need Windows SAM-BA)
            </li>
            <li>HP 15c Collector&apos;s Edition only</li>
            <li>Official USB-C or USB-A pogo programming cable</li>
            <li>
              A 114,688-byte firmware{" "}
              <code className="font-mono text-sm">.bin</code> already on your
              Mac — download the{" "}
              <a
                href={FIRMWARE_URL}
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                latest HP firmware
              </a>{" "}
              (not included with 15CE Flasher)
            </li>
          </ul>
          <p className="mt-4 border-l-2 border-[#f59e0b] pl-4 text-sm leading-relaxed text-[#4b5563]">
            <span className="font-bold text-[#1a1a1a]">Cable Warning.</span>{" "}
            Do not use this cable on an HP 15c Limited Edition, a pre-2015 12C,
            an HP 20b, or an HP 30b — it can permanently damage those machines.
          </p>
          <p className="mt-4 border-l-2 border-[#9ca3af] pl-4 text-sm leading-relaxed text-[#4b5563]">
            <span className="font-semibold text-[#1a1a1a]">Disclaimer.</span>{" "}
            15CE Flasher and this guide are provided as is, without warranty of
            any kind. Although we have employed several safeguards to help keep
            this software safe, flashing firmware can wipe user memory, leave
            the calculator unusable, or permanently brick the device. You are
            solely responsible for backups, choosing a correct firmware file,
            and following the app&apos;s instructions. If the instructions are
            not clear in DEMO mode, do not execute in FLASH mode. Mach II Labs
            is not liable for damage, data loss, or repair costs arising from
            use of this software.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Install
          </h2>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Download{" "}
              <a
                href={DOWNLOAD_HREF}
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                {DMG_FILENAME}
              </a>{" "}
              from Mach II Labs.
            </li>
            <li>
              Optionally verify the SHA-256. In Terminal, run:
              <pre className="mt-2 overflow-x-auto rounded-md bg-[#eceae4] px-3 py-2 font-mono text-sm text-[#1a1a1a]">
                {`shasum -a 256 /path/to/${DMG_FILENAME}`}
              </pre>
              <span className="mt-2 block">
                It should equal:{" "}
                <code className="break-all font-mono text-sm text-[#1a1a1a]">
                  {SHA256}
                </code>
              </span>
            </li>
            <li>
              Open the disk image and drag <strong>15CE Flasher</strong> to
              Applications.
            </li>
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Choose a mode
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            When you open 15CE Flasher, pick how you want to work:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              <strong className="font-semibold text-[#1a1a1a]">DEMO</strong> —
              simulated calculator and full wizard walkthrough. Use this first if
              you have never flashed a CE.
            </li>
            <li>
              <strong className="font-semibold text-[#1a1a1a]">FLASH</strong> —
              the seven-step wizard for one calculator: backup, firmware,
              connect, flash, checksum check.
            </li>
            <li>
              <strong className="font-semibold text-[#1a1a1a]">BATCH</strong> —
              sequential flash with the same firmware for experienced operators
              (see below).
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Flash your HP 15c Collector&apos;s Edition (FLASH mode)
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            Run the <strong>15CE Flasher</strong> application, choose{" "}
            <strong>FLASH</strong>, and follow the on-screen instructions.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Batch mode (quick path for experienced users)
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            Choose <strong>BATCH</strong>{" "}on the welcome screen when you already
            know ERASE+RESET and want a shorter path than guided FLASH mode —
            including when you flash more than one Collector&apos;s Edition with
            the same firmware.
          </p>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Choose your firmware <code className="font-mono text-sm">.bin</code>{" "}
              once. The app remembers it across launches; use{" "}
              <strong>Choose Firmware…</strong> anytime to switch files.
            </li>
            <li>
              Pick backup policy: skip backup, or auto-save numbered backups
              (for example{" "}
              <code className="font-mono text-sm">hp15c-20260904-141530-001.bin</code>
              ) to a folder you choose.
            </li>
            <li>
              Click <strong>Start batch</strong>, then for each calculator:
              hold <strong>ERASE</strong>, press <strong>RESET</strong>, release{" "}
              <strong>ERASE</strong>. The app connects and flashes automatically.
            </li>
            <li>
              When a unit finishes, press <strong>RESET</strong> on the cable,
              turn the calculator on, and confirm the checksum if you like. Click{" "}
              <strong>Next unit</strong> and repeat ERASE+RESET for the next CE.
            </li>
            <li>
              Click <strong>Stop batch</strong> when you are done — the app quits,
              same as <strong>Done</strong> in FLASH mode.
            </li>
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            After flashing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            User memory was cleared — that is normal. If something looks wrong,
            restore from a backup you saved in the app (or re-flash another{" "}
            <code className="font-mono text-sm">.bin</code>
            ). The bootloader region at 0x0000–0x3FFF was never overwritten.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Troubleshooting
          </h2>

          <h3 className="mt-6 text-base font-semibold text-[#1a1a1a]">
            Pogo cable won&apos;t seat in the calculator
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[#374151]">
            You&apos;re in good company — the fit can take some getting used to
            at first. The pogo head is
            not symmetrical: it has a <strong>wide</strong> side and a{" "}
            <strong>narrow</strong> side. Line those up with the port and
            squeeze in the sides as you push. Even then, you may need to fidget
            until it snaps in.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[#1a1a1a]">
            App doesn&apos;t recognize the ATSAM4LC2C
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[#374151]">
            If the app never sees the calculator&apos;s chip, try these:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              USB hubs can be unreliable for this kind of data connection. Try a
              different port or hub, or plug the cable directly into a USB port
              on the Mac.
            </li>
            <li>
              The buttons on the pogo controller are small and must be pressed
              fully. Use your fingertips and push them all the way down.
            </li>
            <li>
              Follow the programming-mode sequence carefully: hold{" "}
              <strong>ERASE</strong>, press and release <strong>RESET</strong>,
              then release <strong>ERASE</strong>. Keep ERASE held the whole
              time RESET is pressed.
            </li>
          </ul>
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
      </main>

      <footer className="border-t border-[#e5e7eb] bg-white px-6 py-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-1 text-sm text-[#6b7280] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs · 15CE Flasher</span>
          <Link href="/flasher" className="hover:text-[#1a1a1a]">
            ← Back to product
          </Link>
        </div>
      </footer>
    </div>
  );
}
