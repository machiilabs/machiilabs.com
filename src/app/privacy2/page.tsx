import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Statement (draft)",
  description:
    "Draft Privacy Statement for Mach II Labs — website, downloads, announcement list, and apps.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://machiilabs.com/privacy" },
};

const lastUpdated = "September 25, 2026";

export default function PrivacyStatementDraftPage() {
  return (
    <div className="min-h-dvh bg-ink text-snow">
      <SiteHeader active="privacy" />

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <p className="text-sm text-afterburn-soft">
          Draft for comparison. Live page:{" "}
          <Link
            href="/privacy"
            className="underline-offset-4 hover:underline"
          >
            /privacy
          </Link>
          .
        </p>

        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
          Privacy Statement
        </h1>
        <p className="mt-3 text-sm text-fog">Last updated {lastUpdated}</p>
        <p className="mt-6 text-base leading-relaxed text-snow sm:text-lg">
          Mach II Labs operates machiilabs.com and the software we publish from
          it. We do not collect, sell, or otherwise distribute your data. Our
          apps do not send reports unless you choose to write to us.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Scope
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            This statement covers the website (machiilabs.com), application
            downloads, the optional product-announcement list, support email,
            and Mach II Labs applications including Skagway and 15CE Flasher.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            What we promise about the software
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fog">
            <li>
              No invisible reports from the apps. Usage logs, crash reports,
              and other telemetry stay on your computer unless you send them.
            </li>
            <li>
              The software lives on your computer. There is no account and no
              backend we can turn off in order for the app to keep running.
            </li>
            <li>
              Bug reports and diagnostics are user-initiated. Email you send is
              read by a person. It is not an automatic signup for announcements.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Information we collect
          </h2>

          <h3 className="mt-6 text-base font-semibold text-snow">
            Website visits
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            We use Vercel Analytics and Cloudflare to see aggregate traffic:
            which pages are viewed, roughly how often, and similar visit
            counts. We use this to run the site. These tools are cookieless
            and are not used for advertising.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Hosting and CDN providers see ordinary request data (such as IP
            address, browser type, and the page requested) in order to
            deliver the site. We do not use those logs as a visitor list.
          </p>

          <h3 className="mt-6 text-base font-semibold text-snow">
            Downloads
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Download buttons go through a short redirect on our site so we can
            count how often each application is downloaded. That count is the
            product name only. The file itself is served from
            downloads.machiilabs.com.
          </p>

          <h3 className="mt-6 text-base font-semibold text-snow">
            Product announcements
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            If you opt in, we store your email address so we can send
            occasional product announcements (new releases and important
            updates).             We keep that address only for that purpose. We do not
            sell or distribute it. You can leave anytime via the unsubscribe link in an
            announcement; that removes your address from the list.
          </p>

          <h3 className="mt-6 text-base font-semibold text-snow">
            Support mail
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            If you write to{" "}
            <a
              href="mailto:support@machiilabs.com"
              className="text-snow underline-offset-4 hover:underline"
            >
              support@machiilabs.com
            </a>{" "}
            or{" "}
            <a
              href="mailto:contact@machiilabs.com"
              className="text-snow underline-offset-4 hover:underline"
            >
              contact@machiilabs.com
            </a>
            , we read the message to help you and keep it as long as needed to
            handle the conversation.
          </p>

          <h3 className="mt-6 text-base font-semibold text-snow">
            Applications
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Mach II Labs apps do not send usage analytics or silent
            diagnostics. Your library and files stay on your computer.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Some apps offer optional update checks that are off by default. If
            you turn them on, or choose Check for Updates, the app only asks
            whether a newer build exists. That request goes to our download
            host.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            How we use information
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fog">
            <li>To operate and improve the website and downloads</li>
            <li>To count visits and downloads in aggregate</li>
            <li>To send announcements you asked for</li>
            <li>To answer support and contact mail</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Cookies
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            We do not use advertising or tracking cookies on the public site.
            The visit metrics described above are cookieless.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Service providers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            We use third parties for hosting the site. They see only what is
            needed to deliver the pages and downloads.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            How long we keep it
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Announcement emails are kept until you unsubscribe. Support mail is
            kept as long as we need it to help you. Aggregate visit and
            download counts are kept to understand traffic over time. Hosting
            logs follow each provider&apos;s ordinary retention.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Your choices
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fog">
            <li>
              You can use the site and download software without joining the
              announcement list.
            </li>
            <li>
              You can unsubscribe from announcements at any time using the
              link in those emails, or write to us and ask to be removed.
            </li>
            <li>
              You can leave automatic update checks off. The apps keep
              working.
            </li>
            <li>
              If you want us to delete support mail or an announcement
              address, email{" "}
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
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Children
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Our website and software are not directed at children under 13. We
            do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Changes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            If this statement changes, we will update this page and the date
            above. We will not use a quiet policy edit to start tracking how
            you use the apps.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-afterburn-soft">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
            Mach II Labs
            <br />
            <a
              href="mailto:support@machiilabs.com"
              className="text-snow underline-offset-4 hover:underline"
            >
              support@machiilabs.com
            </a>
          </p>
        </section>

        <p className="mt-14 text-sm text-fog">
          <Link
            href="/privacy"
            className="text-snow underline-offset-4 hover:underline"
          >
            ← Current privacy page
          </Link>
        </p>
      </main>
    </div>
  );
}
