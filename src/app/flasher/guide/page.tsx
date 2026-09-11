import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MachiiLogo } from "@/components/machii-logo";
import { downloadApiPath } from "@/lib/downloads";

export const metadata: Metadata = {
  title: {
    absolute: "How to Flash HP 15c CE Firmware — 15CE Flasher Guide",
  },
  description:
    "How to flash HP 15c Collector’s Edition firmware with 15CE Flasher on Mac or Windows: install the free app, use the pogo cable, and follow guided steps.",
  openGraph: {
    title: "How to Flash HP 15c CE Firmware — 15CE Flasher Guide",
    description:
      "Step-by-step guide to flash HP 15c Collector’s Edition firmware on Mac or Windows with 15CE Flasher.",
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
    title: "How to Flash HP 15c CE Firmware — 15CE Flasher Guide",
    description:
      "Flash HP 15c Collector’s Edition firmware on Mac or Windows with 15CE Flasher.",
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

export default function FlasherGuidePage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <MachiiLogo tone="light" />
            <Link href="/flasher" className="font-semibold text-[#1a1a1a]">
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
          How to flash HP 15c CE firmware
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#374151]">
          Use{" "}
          <strong className="font-semibold text-[#1a1a1a]">15CE Flasher</strong>{" "}
          on a Mac or Windows PC to flash HP 15c Collector&apos;s Edition
          firmware over the official pogo cable.{" "}
          <strong className="font-semibold text-[#1a1a1a]">
            The app guides you through every step
          </strong>{" "}
          with diagrams, status messages, and Continue / Back.
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
            Before you start
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              A Mac running macOS 13 or later, or a PC running Windows 10/11
              (64-bit)
            </li>
            <li>
              HP 15c Collector&apos;s Edition (primary).
              <p className="mt-2 border-l-2 border-[#e5e7eb] pl-4 text-sm leading-relaxed text-[#6b7280]">
                Field reports suggest that the HP 16c CE and post-2015 HP 12c
                also work with this software — they have the same ATSAM4LC2C
                chip; use at your own risk and confirm the firmware matches your
                calculator.
              </p>
            </li>
            <li>Official USB-C or USB-A pogo programming cable</li>
            <li>
              A 114,688-byte firmware{" "}
              <code className="font-mono text-sm">.bin</code> on your computer —{" "}
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
            <span className="font-bold text-[#1a1a1a]">Cable warning.</span> Do
            not use this cable on an HP 15c Limited Edition, a pre-2015 12C, an
            HP 20b, or an HP 30b — it can permanently damage those machines.
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
              </a>{" "}
              from the{" "}
              <Link
                href="/flasher#mac"
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                product page
              </Link>
              .
            </li>
            <li>
              Optionally verify the SHA-256. In Terminal, run:
              <pre className="mt-2 overflow-x-auto rounded-md bg-[#eceae4] px-3 py-2 font-mono text-sm text-[#1a1a1a]">
                {`shasum -a 256 /path/to/${MAC_FILENAME}`}
              </pre>
              <span className="mt-2 block">
                It should equal:{" "}
                <code className="break-all font-mono text-sm text-[#1a1a1a]">
                  {MAC_SHA256}
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
              </a>{" "}
              from the{" "}
              <Link
                href="/flasher#windows"
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                product page
              </Link>
              .
            </li>
            <li>
              Optionally verify the SHA-256. In PowerShell, run:
              <pre className="mt-2 overflow-x-auto rounded-md bg-[#eceae4] px-3 py-2 font-mono text-sm text-[#1a1a1a]">
                {`Get-FileHash -Algorithm SHA256 "$env:USERPROFILE\\Downloads\\${WIN_FILENAME}"`}
              </pre>
              <span className="mt-2 block">
                It should equal:{" "}
                <code className="break-all font-mono text-sm text-[#1a1a1a]">
                  {WIN_SHA256}
                </code>
              </span>
            </li>
            <li>
              Run the <code className="font-mono text-sm">.exe</code>. If
              SmartScreen warns about an unknown publisher, choose{" "}
              <strong>More info</strong> → <strong>Run anyway</strong>.
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
              simulated calculator and full wizard walkthrough. On Mac, this is
              the recommended first run if you have never flashed a CE.
            </li>
            <li>
              <strong className="font-semibold text-[#1a1a1a]">
                Connection Probe
              </strong>{" "}
              — connect to real hardware and confirm SAM-BA detection without
              flashing firmware. See below.
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
            Connection Probe
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            Pick <strong>Connection Probe</strong> on the welcome screen to
            confirm the cable and calculator before you choose firmware or
            flash. The app connects and identifies the chip, then you can quit
            and start <strong>FLASH</strong> or <strong>BATCH</strong>.
          </p>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Hold <strong>ERASE</strong>, press <strong>RESET</strong>, then
              release <strong>ERASE</strong>.
            </li>
            <li>
              When the app shows <strong>Connected: ATSAM4LC2C</strong>, the
              calculator is in programming mode and SAM-BA is responding.
            </li>
            <li>
              Quit and choose <strong>FLASH</strong> or <strong>BATCH</strong>{" "}
              when you are ready to proceed.
            </li>
          </ol>
          <p className="mt-4 border-l-2 border-[#e5e7eb] pl-4 text-sm leading-relaxed text-[#6b7280]">
            <strong className="text-[#4b5563]">Windows:</strong> after
            ERASE+RESET, Windows may list more than one COM port. The app uses
            the Atmel SAM-BA port (
            <code className="font-mono text-xs">03EB:6124</code>), not FTDI.
          </p>
          <p className="mt-3 border-l-2 border-[#e5e7eb] pl-4 text-sm leading-relaxed text-[#6b7280]">
            <strong className="text-[#4b5563]">Mac:</strong> the programming
            port appears as <code className="font-mono text-xs">cu.usbmodem…</code>
            . Use <strong>DEMO</strong> to learn the full wizard without
            hardware; use <strong>Connection Probe</strong> to test a real
            calculator without flashing.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            FLASH mode walkthrough
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            Choose <strong>FLASH</strong> on the welcome screen. The app opens a
            seven-step wizard with a step checklist on the left (Mac and
            Windows), diagrams on each step, and <strong>Back</strong> /{" "}
            <strong>Next</strong> at the bottom. The status bar at the bottom of
            the window shows connection progress once you reach programming mode.
          </p>
          <figure className="mt-6 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <Image
              src="/flasher/15CE Flasher.png"
              alt="15CE Flasher wizard with the seven-step checklist and cable step"
              width={2024}
              height={1744}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-[#e5e7eb] px-4 py-3 text-sm text-[#6b7280]">
              The in-app wizard — follow the highlighted step; the app is the
              source of truth for button labels and status text.
            </figcaption>
          </figure>

          <h3 className="mt-10 text-base font-semibold text-[#1a1a1a]">
            The seven steps
          </h3>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              <strong className="text-[#1a1a1a]">Cable</strong> — Open the
              battery door, seat the keyed POGO plug, and connect USB to your Mac
              or PC.
            </li>
            <li>
              <strong className="text-[#1a1a1a]">Programming mode</strong> —
              Hold <strong>ERASE</strong>, press <strong>RESET</strong>, then
              release <strong>ERASE</strong>. Wait until the app reports{" "}
              <strong>Connected: ATSAM4LC2C</strong> before you continue.
            </li>
            <li>
              <strong className="text-[#1a1a1a]">Backup</strong> — Save a copy
              of the firmware currently on the calculator, or skip backup if you
              already have one.
            </li>
            <li>
              <strong className="text-[#1a1a1a]">Firmware</strong> — Choose the
              114,688-byte <code className="font-mono text-sm">.bin</code> file
              you want to install. The app checks size and checksum.
            </li>
            <li>
              <strong className="text-[#1a1a1a]">Flash</strong> — Confirm the
              warning dialog, then write firmware starting at address{" "}
              <code className="font-mono text-sm">0x04000</code>. The bootloader
              below that address is not overwritten.
            </li>
            <li>
              <strong className="text-[#1a1a1a]">Restart</strong> — Press{" "}
              <strong>RESET</strong> on the cable box, turn the calculator on,
              and clear <strong>Pr Error</strong> with any key.
            </li>
            <li>
              <strong className="text-[#1a1a1a]">Checksum</strong> — Optional
              check on the calculator that the new firmware matches what you
              flashed.
            </li>
          </ol>

          <h3 className="mt-10 text-base font-semibold text-[#1a1a1a]">
            Programming mode — where most issues show up
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            The calculator display stays off in programming mode; the ON key is
            ignored. Keep <strong>ERASE</strong> held while you press and
            release <strong>RESET</strong>, then release <strong>ERASE</strong>.
            When connection succeeds, the status bar shows{" "}
            <strong>Connected: ATSAM4LC2C</strong> and{" "}
            <strong>Next</strong> becomes available.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            If you are unsure the cable is connected correctly, run{" "}
            <strong>Connection Probe</strong> first (see above), then start{" "}
            <strong>FLASH</strong>.
          </p>
          <figure className="mt-4 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <Image
              src="/flasher/guide/wizard-programming-mode.png"
              alt="Diagram: hold ERASE, press RESET, then release ERASE on the cable switch box"
              width={1200}
              height={400}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-[#e5e7eb] px-4 py-3 text-sm text-[#6b7280]">
              Programming mode sequence on the cable switch box (same in the
              app).
            </figcaption>
          </figure>

          <h3 className="mt-10 text-base font-semibold text-[#1a1a1a]">
            Backup and firmware file
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            On the <strong>Backup</strong> step,{" "}
            <strong>Save backup…</strong> reads the calculator immediately and
            writes a <code className="font-mono text-sm">.bin</code> to the
            folder you pick. Choose <strong>Skip backup</strong> only if you
            already have a known-good copy to restore later.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            On the <strong>Firmware</strong> step, use{" "}
            <strong>Choose firmware…</strong> and select your 114,688-byte HP
            firmware file (for example from{" "}
            <a
              href={FIRMWARE_URL}
              className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
            >
              hpcalcs.com
            </a>
            ). The app shows whether the file looks valid before you continue.
            You must complete both steps before <strong>Flash</strong> unlocks.
          </p>

          <h3 className="mt-10 text-base font-semibold text-[#1a1a1a]">
            Checksum — confirm on the calculator
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            After restart, the wizard&apos;s last step walks you through the CE
            test menu. Turn the calculator <strong>OFF</strong>, hold{" "}
            <strong>g</strong> and <strong>ENTER</strong>, press{" "}
            <strong>ON</strong>, then release <strong>ON</strong>, then release{" "}
            <strong>g</strong> and <strong>ENTER</strong>. When you see{" "}
            <strong>1.L 2.C 3.H</strong>, press <strong>2</strong>. Compare the
            value on the display to the expected checksum shown in the app.
          </p>
          <figure className="mt-4 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <Image
              src="/flasher/guide/wizard-checksum.png"
              alt="Diagram: calculator keys for the checksum test menu"
              width={1200}
              height={400}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-[#e5e7eb] px-4 py-3 text-sm text-[#6b7280]">
              Key sequence for the checksum test (same in the app).
            </figcaption>
          </figure>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Batch mode (experienced users)
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#374151]">
            Choose <strong>BATCH</strong> when you already know ERASE+RESET and
            want to flash more than one Collector&apos;s Edition with the same
            firmware.
          </p>
          <ol className="mt-4 list-decimal space-y-2.5 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              Choose your firmware <code className="font-mono text-sm">.bin</code>{" "}
              once.
            </li>
            <li>
              Pick backup policy: skip backup, or auto-save numbered backups to a
              folder you choose.
            </li>
            <li>
              Click <strong>Start batch</strong>, then for each calculator: hold{" "}
              <strong>ERASE</strong>, press <strong>RESET</strong>, release{" "}
              <strong>ERASE</strong>. The app connects and flashes automatically.
            </li>
            <li>
              When a unit finishes, press <strong>RESET</strong>, turn the
              calculator on, and confirm the checksum if you like. Click{" "}
              <strong>Next unit</strong> and repeat for the next CE.
            </li>
            <li>
              Click <strong>Stop batch</strong> when you are done.
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
            The pogo head is not symmetrical: it has a <strong>wide</strong> side
            and a <strong>narrow</strong> side. Line those up with the port and
            squeeze the sides as you push until it snaps in.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[#1a1a1a]">
            App doesn&apos;t recognize the ATSAM4LC2C
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#374151]">
            <li>
              USB hubs can be unreliable. Plug the cable directly into the
              computer when possible.
            </li>
            <li>
              Press the cable buttons fully: hold <strong>ERASE</strong>, press
              and release <strong>RESET</strong>, then release{" "}
              <strong>ERASE</strong>.
            </li>
            <li>
              Try <strong>Connection Probe</strong> first to confirm SAM-BA
              detection before FLASH or BATCH.
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
