import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paul Kleimeyer makes Mach II Labs software: Skagway and 15CE Flasher, free forever.",
  alternates: { canonical: "https://machiilabs.com/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-ink text-snow">
      <SiteHeader active="about" />

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-afterburn-soft uppercase">
          Mach II Labs
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Paul Kleimeyer
        </h1>
        <p className="mt-6 text-base leading-relaxed text-snow sm:text-lg">
          I make the software on this site. Skagway is a free Mac app that
          catalogs the videos already on your drives, so you can browse, tag,
          and play them without moving a file. 15CE Flasher is a free app for
          firmware updates on the HP 15c and 16c Collector&apos;s Editions.
        </p>
        <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
          Both are free forever. No account, no ads, no subscription. The apps
          run on your computer. There is no service we can switch off to make
          them stop working.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            <a
              href="mailto:contact@machiilabs.com"
              className="text-snow underline-offset-4 hover:underline"
            >
              contact@machiilabs.com
            </a>
            <br />
            <a
              href="mailto:support@machiilabs.com"
              className="text-snow underline-offset-4 hover:underline"
            >
              support@machiilabs.com
            </a>
          </p>
        </section>

        <p className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href="/skagway"
            className="font-semibold text-snow underline-offset-4 hover:underline"
          >
            Skagway
          </Link>
          <Link
            href="/flasher"
            className="font-semibold text-snow underline-offset-4 hover:underline"
          >
            15CE Flasher
          </Link>
          <Link
            href="/privacy"
            className="font-semibold text-snow underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-semibold text-snow underline-offset-4 hover:underline"
          >
            Terms
          </Link>
        </p>

        <p className="mt-14 text-sm text-fog">
          <Link href="/" className="text-snow underline-offset-4 hover:underline">
            ← Home
          </Link>
        </p>
      </main>
    </div>
  );
}
