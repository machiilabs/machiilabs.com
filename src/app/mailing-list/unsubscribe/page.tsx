import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { UnsubscribeForm } from "./unsubscribe-form";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const hasToken = Boolean(token && token.length > 0);

  return (
    <div className="min-h-dvh bg-ink text-snow">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-lg flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Unsubscribe
      </h1>
      {!hasToken ? (
        <p className="mt-4 text-sm leading-relaxed text-fog">
          This link is missing a token. Use the unsubscribe link from a Mach II
          Labs announcement email, or{" "}
          <a
            href="mailto:support@machiilabs.com"
            className="text-snow underline-offset-4 hover:underline"
          >
            contact support
          </a>
          .
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-fog">
            Remove your email from the Mach II Labs product announcement list.
            This deletes your address from our records.
          </p>
          <div className="mt-8">
            <UnsubscribeForm token={token!} />
          </div>
        </>
      )}
      <p className="mt-10 text-sm text-fog">
        <Link href="/" className="text-snow underline-offset-4 hover:underline">
          ← Back to site
        </Link>
      </p>
      </main>
    </div>
  );
}
