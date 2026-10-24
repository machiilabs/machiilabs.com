import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mach II Labs is a software company founded by Paul Kleimeyer in Phoenix, Arizona. Our goal is to create excellent software that you keep.",
  alternates: { canonical: "https://machiilabs.com/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-[#fafafa] text-[#1a1a1a]">
      <style>{`body{background:#fafafa;color:#1a1a1a}`}</style>
      <SiteHeader active="about" tone="light" />

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          About
        </h1>
        <p className="mt-6 text-base leading-relaxed sm:text-lg">
          Mach II Labs is a software company founded by Paul Kleimeyer in
          Phoenix, Arizona.
        </p>
        <p className="mt-4 text-base leading-relaxed sm:text-lg">
          Our goal is to create excellent software that you keep.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-[#8a5a20]">
            Philosophy
          </h2>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">
            Software, for work or for play, should be powerful and pleasant to
            use. It should not leave you shackled to a subscription.
          </p>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">
            Premium features belong in the product itself, not behind another
            paywall.
          </p>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">
            We take everything we do seriously, and we make it with care and
            attention. That is how we make software for you to keep.
          </p>
        </section>

        <section
          id="contact"
          className="mt-12 rounded-lg border border-[#e5e7eb] bg-white px-5 py-5"
        >
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
            <br />
            <a
              href="mailto:support@machiilabs.com"
              className="text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
            >
              support@machiilabs.com
            </a>
          </p>
        </section>

        <p className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href="/privacy"
            className="font-semibold text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-semibold text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
          >
            Terms
          </Link>
        </p>

        <p className="mt-14 text-sm text-[#4b5563]">
          <Link
            href="/"
            className="text-[#1a1a1a] underline-offset-4 hover:text-[#8a5a20] hover:underline"
          >
            ← Home
          </Link>
        </p>
      </main>
    </div>
  );
}
