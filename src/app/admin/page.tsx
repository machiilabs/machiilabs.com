import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/auth";
import { signOutAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const PORTALS = [
  {
    name: "Vercel",
    href: "https://vercel.com/pkleim10s-projects/machii-labs",
    blurb: "Deployments, domains, env vars",
  },
  {
    name: "GitHub",
    href: "https://github.com/pkleim10/machii-labs",
    blurb: "machii-labs repository",
  },
  {
    name: "Supabase",
    href: "https://supabase.com/dashboard/project/rddzasjcgrdlugeducsu",
    blurb: "Auth, database, project settings",
  },
  {
    name: "Cloudflare",
    href: "https://dash.cloudflare.com",
    blurb: "DNS for machiilabs.com",
  },
  {
    name: "Apple Developer",
    href: "https://developer.apple.com/account",
    blurb: "Certificates, identifiers, App Store Connect",
  },
] as const;

export default async function AdminDashboardPage() {
  const user = await requireAdmin();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-14">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-afterburn uppercase">
            Mach II Labs
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-snow">
            Admin
          </h1>
          <p className="mt-2 text-sm text-fog">
            Signed in as {user.email}
          </p>
        </div>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="rounded-md border border-white/15 px-3 py-2 text-sm text-fog transition hover:border-white/30 hover:text-snow"
          >
            Sign out
          </button>
        </form>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-snow">
          Site portals
        </h2>
        <p className="mt-1 text-sm text-fog">
          External dashboards only — no API keys stored here.
        </p>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {PORTALS.map((portal) => (
            <li key={portal.name}>
              <a
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-4 transition hover:bg-white/[0.03]"
              >
                <span>
                  <span className="font-medium text-snow group-hover:text-afterburn-soft">
                    {portal.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-fog">
                    {portal.blurb}
                  </span>
                </span>
                <span aria-hidden className="shrink-0 text-fog">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-sm text-fog">
        <Link href="/" className="text-snow underline-offset-4 hover:underline">
          ← Public site
        </Link>
      </p>
    </main>
  );
}
