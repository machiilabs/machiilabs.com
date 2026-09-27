import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Mach II Labs handles the website, optional product-announcement email list, and apps.",
  alternates: { canonical: "https://machiilabs.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-ink text-snow">
      <SiteHeader active="privacy" />

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Privacy
        </h1>
        <p className="mt-4 text-base leading-relaxed text-snow sm:text-lg">
          We don&apos;t sell your data to anyone. Ever.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-snow">
            Website
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fog">
            <li>
              We use standard web analytics to collect aggregate visit stats so
              we can count traffic to each page on machiilabs.com. It is
              cookieless, does not collect personally identifying information,
              and does not build advertising profiles.
            </li>
            <li>
              App download buttons go through a short redirect on our site so we
              can count how often our applications are downloaded. The file
              itself is served from downloads.machiilabs.com.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-snow">
            Product announcement list
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fog">
            <li>
              If you opt in, we store your{" "}
              <strong className="font-medium text-snow">email address</strong>{" "}
              so we can send occasional product announcements (new releases,
              important updates).
            </li>
            <li>
              We keep that address only so we can email you those announcements.
              We do not sell your email.
            </li>
            <li>
              You can leave anytime via the link in an announcement (when we
              send one). That removes your address from our list.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-snow">
            Support mail
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Email you send to support@machiilabs.com is read by a human to help
            you. It is not an automatic signup for the announcement list.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-snow">
            Apps
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Mach II Labs products do not send usage analytics or silent
            diagnostics. Bug reports are user-initiated via email to{" "}
            <a
              href="mailto:support@machiilabs.com"
              className="text-snow underline-offset-4 hover:underline"
            >
              support@machiilabs.com
            </a>
            . Some apps offer optional update checks that are off by default;
            if you turn them on, the app only asks whether a newer build
            exists — nothing about how you use the app.
          </p>
        </section>

        <p className="mt-14 text-sm text-fog">
          <Link href="/" className="text-snow underline-offset-4 hover:underline">
            ← Home
          </Link>
        </p>
      </main>
    </div>
  );
}
