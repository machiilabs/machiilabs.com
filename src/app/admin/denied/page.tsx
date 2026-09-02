import type { Metadata } from "next";
import Link from "next/link";
import { signOutAdmin } from "../actions";

export const metadata: Metadata = {
  title: "Access denied",
  robots: { index: false, follow: false },
};

export default function AdminDeniedPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-6 py-16">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-afterburn uppercase">
        Mach II Labs
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-snow">
        Access denied
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-fog">
        This account is not on the admin allowlist.
      </p>
      <form action={signOutAdmin} className="mt-8">
        <button
          type="submit"
          className="text-sm text-snow underline-offset-4 hover:underline"
        >
          Clear session and return to login
        </button>
      </form>
      <p className="mt-4 text-sm text-fog">
        <Link href="/" className="text-snow underline-offset-4 hover:underline">
          Back to site
        </Link>
      </p>
    </main>
  );
}
