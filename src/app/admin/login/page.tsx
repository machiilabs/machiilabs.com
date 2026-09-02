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
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-6 py-16">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-afterburn uppercase">
        Mach II Labs
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-snow">
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
