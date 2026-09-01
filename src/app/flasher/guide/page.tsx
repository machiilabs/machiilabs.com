import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users Guide — HP 15C Flasher",
  description:
    "Short guide to HP 15C Flasher: the app walks you through every step of flashing HP 15C Collector’s Edition firmware on Mac.",
  openGraph: {
    title: "Users Guide — HP 15C Flasher",
    description:
      "The app guides you through cable, programming mode, backup, firmware, flash, restart, and checksum.",
    url: "https://machiilabs.com/flasher/guide",
  },
  alternates: {
    canonical: "https://machiilabs.com/flasher/guide",
  },
};

const DOWNLOAD_URL =
  "https://downloads.machiilabs.com/HP15CFlasher-1.0.0-190.dmg";
const FIRMWARE_URL =
  "https://hpcalcs.com/downloads/apps/HP_IAR_USB%20120ms.bin";
const SHA256 =
  "0cb627dc9d918851dd03b7ec119ab96f2931beab5c50fd025d229f947cdebe4e";
const DMG_FILENAME = "HP15CFlasher-1.0.0-190.dmg";

const steps = [
  {
    title: "Cable",
    body: "Open the calculator’s battery door and insert the keyed pogo plug until it seats. Plug the other end into this Mac. Use this cable only on the HP 15C Collector’s Edition.",
  },
  {
    title: "Programming mode",
    body: "On the cable’s switch box, hold ERASE, press RESET, then release ERASE. The display stays off. When the app shows the calculator is connected, continue.",
  },
  {
    title: "Backup",
    body: "Optionally save a copy of the firmware currently on the calculator (Save Backup…), or Skip if you already have one. A backup is your way back if the new image misbehaves.",
  },
  {
    title: "Firmware",
    body: "Choose a 114,688-byte (0x1C000) .bin file you already have. HP 15C Flasher does not download or include HP firmware.",
  },
  {
    title: "Flash",
    body: "Confirm Flash Calculator. Writing starts at 0x04000; the bootloader below that is left intact. User memory will be wiped. The app writes and verifies.",
  },
  {
    title: "Restart",
    body: "Press RESET on the cable switch box, then turn the calculator ON. “Pr Error” is expected. Press any key to see 0.0000.",
  },
  {
    title: "Checksum",
    body: "Follow the on-screen key sequence to open the test menu and press 2. Compare the displayed checksum to what the app shows for the file you just flashed, then Done.",
  },
];

export default function FlasherGuidePage() {
  return (
    <div className="min-h-dvh bg-[#f7f6f3] text-[#1a1a1a]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link href="/" className="text-[#4b5563] hover:text-[#1a1a1a]">
              Mach II Labs
            </Link>
            <Link
              href="/flasher"
              className="font-semibold text-[#1a1a1a]"
            >
              HP 15C Flasher
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
          Users guide
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
          HP 15C Flasher
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#374151]">
          You do not need a separate procedure document to flash the calculator.
          <strong className="font-semibold text-[#1a1a1a]">
            {" "}
            The app guides you through every step
          </strong>{" "}
          with diagrams, status messages, and Continue / Back. This page is a
          short overview of what you will see — open the app and follow it.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            href={DOWNLOAD_URL}
            className="font-semibold text-[#1d4ed8] underline-offset-2 hover:underline"
          >
            Download HP 15C Flasher
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
              A Mac running macOS 13 or later (this software runs on Mac only)
            </li>
            <li>HP 15C Collector&apos;s Edition only</li>
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
              (not included with HP 15C Flasher)
            </li>
          </ul>
          <p className="mt-4 border-l-2 border-[#f59e0b] pl-4 text-sm leading-relaxed text-[#4b5563]">
            Do not use this cable on an HP 15C Limited Edition, a pre-2015 12C,
            an HP 20b, or an HP 30b — it can permanently damage those machines.
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
                href={DOWNLOAD_URL}
                className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
              >
                {DMG_FILENAME}
              </a>{" "}
              from Mach II Labs.
            </li>
            <li>
              Optionally verify the SHA-256:{" "}
              <code className="break-all font-mono text-sm text-[#1a1a1a]">
                {SHA256}
              </code>
            </li>
            <li>
              Open the disk image and drag <strong>HP 15C Flasher</strong> to
              Applications.
            </li>
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            The seven steps in the app
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4b5563]">
            Each step has on-screen instructions. Use{" "}
            <span className="font-mono font-bold text-[#1a1a1a]">Continue</span>{" "}
            and{" "}
            <span className="font-mono font-bold text-[#1a1a1a]">Back</span>{" "}
            — you do not need to memorize this list.
          </p>
          <ol className="mt-6 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#1a1a1a]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-[#374151]">
                    {step.title === "Firmware" ? (
                      <>
                        Choose a 114,688-byte (0x1C000){" "}
                        <code className="font-mono text-sm">.bin</code> file
                        you already have — for example the{" "}
                        <a
                          href={FIRMWARE_URL}
                          className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
                        >
                          latest HP firmware
                        </a>
                        . HP 15C Flasher does not download or include HP
                        firmware.
                      </>
                    ) : (
                      step.body
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            After flashing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            User memory was cleared — that is normal. If something looks wrong,
            restore from the backup you saved in step 3 (or re-flash another{" "}
            <code className="font-mono text-sm">.bin</code>
            ). The bootloader region at 0x0000–0x3FFF was never overwritten.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
            Privacy &amp; support
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#374151]">
            The app is offline: no telemetry, no network, no automatic
            diagnostics. Firmware files never leave your Mac. Questions:{" "}
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
          <span>© {new Date().getFullYear()} Mach II Labs · HP 15C Flasher</span>
          <Link href="/flasher" className="hover:text-[#1a1a1a]">
            ← Back to product
          </Link>
        </div>
      </footer>
    </div>
  );
}
