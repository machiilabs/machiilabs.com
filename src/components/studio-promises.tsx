import Link from "next/link";

export function StudioPromises() {
  return (
    <section
      id="promises"
      aria-labelledby="studio-promises-heading"
      className="max-w-xl scroll-mt-8 border-t border-white/10 pt-10"
    >
      <h2
        id="studio-promises-heading"
        className="font-display text-2xl font-bold tracking-tight text-afterburn-soft sm:text-3xl"
      >
        What you can count on from us
      </h2>

      <ul className="mt-6 space-y-3 font-display text-lg font-semibold tracking-tight text-snow sm:text-xl">
        <li>No ads. Ever.</li>
        <li>No subscriptions. Ever.</li>
        <li>
          No invisible reports. Usage, logs, crashes, or any other telemetry
          that could identify who you are or how you use an app — unless you
          send it.
        </li>
        <li>Skagway and 15CE Flasher are free forever.</li>
      </ul>

      <p className="mt-8 text-base leading-relaxed text-fog sm:text-lg">
        The software lives on your computer. There is no account and no backend
        we can turn off. We&apos;ll keep shipping updates as long as we can.
      </p>
      <p className="mt-4 text-base leading-relaxed sm:text-lg">
        <Link
          href="/privacy"
          className="font-semibold text-snow transition-colors hover:text-afterburn-soft"
        >
          View our Privacy Statement
        </Link>
      </p>
    </section>
  );
}
