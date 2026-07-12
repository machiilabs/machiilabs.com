export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center text-snow">
      <p className="font-display text-sm tracking-[0.25em] text-fog uppercase">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
        Not found
      </h1>
      <a
        href="/"
        className="mt-8 font-display text-afterburn-soft underline-offset-4 hover:underline"
      >
        Back to Mach II Labs
      </a>
    </div>
  );
}
