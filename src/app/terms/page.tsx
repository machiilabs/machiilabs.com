import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Free use of Skagway and 15CE Flasher. No warranty. Your files stay yours.",
  alternates: { canonical: "https://machiilabs.com/terms" },
};

const lastUpdated = "October 20, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-[#fafafa] text-[#1a1a1a]">
      <style>{`body{background:#fafafa;color:#1a1a1a}`}</style>
      <SiteHeader active="terms" tone="light" />

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-[#4b5563]">Last updated {lastUpdated}</p>
        <p className="mt-6 text-base leading-relaxed sm:text-lg">
          These terms cover machiilabs.com and the software Mach II Labs
          publishes from it, including Skagway and 15CE Flasher. By downloading
          or using the software, you agree to them.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            Free use
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            Skagway and 15CE Flasher are free. There is no trial limit, no
            subscription, and no account. You may use them for your own work,
            personal or commercial. A later product will say on its own page
            if it is paid.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            License
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            Mach II Labs keeps the copyright in the apps and in this website.
            You may download the apps and run them. You may not sell them,
            rent them, or present them as your own product.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            Your files
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            The apps do not take ownership of your videos, firmware, or other
            files. Those stay yours. Skagway catalogs files where they already
            are. It does not move them into a private container.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            No warranty
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            The software and the site are provided as is. Mach II Labs makes
            no warranty that they will be uninterrupted, error-free, or fit
            for a particular purpose. You use them at your own risk.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            15CE Flasher writes firmware to a calculator. Follow the steps in
            the app and in the{" "}
            <Link
              href="/flasher/guide"
              className="text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
            >
              install help
            </Link>
            . Flashing can wipe user memory or leave the calculator unusable
            if the instructions are not followed. You are responsible for
            backups and for choosing the correct firmware file.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            Mach II Labs is not affiliated with HP, Atmel, or Microchip. The
            15CE Flasher download does not include HP firmware.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            Liability
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            To the extent the law allows, Mach II Labs is not liable for lost
            files, lost data, or other damages from using the software or the
            site.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            Changes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            We may update these terms. The date at the top is the version in
            effect.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            Mach II Labs
            <br />
            <a
              href="mailto:contact@machiilabs.com"
              className="text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
            >
              contact@machiilabs.com
            </a>
          </p>
        </section>

        <p className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href="/about"
            className="font-semibold text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="font-semibold text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
          >
            Privacy
          </Link>
        </p>

        <p className="mt-14 text-sm text-[#4b5563]">
          <Link href="/" className="text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline">
            ← Home
          </Link>
        </p>
      </main>
    </div>
  );
}
