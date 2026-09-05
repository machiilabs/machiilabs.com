import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Mach II Labs handles the optional product-announcement email list and site contact.",
  alternates: { canonical: "https://machiilabs.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-ink text-snow">
      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-afterburn uppercase">
          Mach II Labs
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
          Privacy
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-fog">
          Short and specific. We do not run site analytics or app telemetry by
          default.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-snow">
            Product announcement list
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fog">
            <li>
              If you opt in on the home page, we store your{" "}
              <strong className="font-medium text-snow">email address</strong>{" "}
              so we can send occasional product announcements (new releases,
              important updates). Not a newsletter drip.
            </li>
            <li>
              We keep that address only so we can email you those announcements.
              We do not sell your email.
            </li>
            <li>
              You can leave anytime via the link in an announcement (when we
              send one). That removes your address from our list. Or email{" "}
              <a
                href="mailto:support@machiilabs.com"
                className="text-snow underline-offset-4 hover:underline"
              >
                support@machiilabs.com
              </a>
              .
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
            Mach II Labs products do not phone home with usage analytics or
            silent diagnostics. Bug reports are user-initiated.
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
