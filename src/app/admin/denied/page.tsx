import type { Metadata } from "next";
import Link from "next/link";
import { signOutAdmin } from "../actions";

export const metadata: Metadata = {
  title: "Access denied",
  robots: { index: false, follow: false },
};

export default function AdminDeniedPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-snow">
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
