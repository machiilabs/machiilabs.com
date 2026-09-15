import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin") ? params.next : "/admin";
  const authError = params.error === "auth";

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-snow">
        Admin sign-in
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-fog">
        Magic link for allowlisted accounts only. Public signup is disabled.
      </p>
      {authError ? (
        <p className="mt-4 text-sm text-red-300" role="alert">
          Sign-in link was invalid or expired. Request a new one.
        </p>
      ) : null}
      <div className="mt-8">
        <LoginForm nextPath={nextPath} />
      </div>
      <p className="mt-10 text-sm text-fog">
        <Link href="/" className="text-snow underline-offset-4 hover:underline">
          ← Back to site
        </Link>
      </p>
    </main>
  );
}
