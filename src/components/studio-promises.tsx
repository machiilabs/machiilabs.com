import Link from "next/link";

export function StudioPromises() {
  return (
    <section
      id="promises"
      aria-labelledby="studio-promises-heading"
      className="max-w-xl scroll-mt-8 border-t border-[#e5e7eb] pt-10"
    >
      <h2
        id="studio-promises-heading"
        className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a] sm:text-3xl"
      >
        What you can count on from us
      </h2>

      <ul className="mt-6 space-y-3 font-display text-lg font-semibold tracking-tight text-[#1a1a1a] sm:text-xl">
        <li>No ads. Ever.</li>
        <li>No subscriptions. Ever.</li>
        <li>
          No invisible reports. Usage, logs, crashes, or other telemetry stay
          with you unless you send them.
        </li>
        <li>Skagway and 15CE Flasher are free forever.</li>
      </ul>

      <p className="mt-8 text-base leading-relaxed text-[#4b5563] sm:text-lg">
        The software lives on your computer. There is no account and no backend
        we can turn off. We&apos;ll keep shipping updates as long as we can.
      </p>
      <p className="mt-4 text-base leading-relaxed sm:text-lg">
        <Link
          href="/privacy"
          className="font-semibold text-[#1a1a1a] underline-offset-4 transition-colors hover:text-[#8a5a20] hover:underline"
        >
          View our Privacy Statement
        </Link>
      </p>
    </section>
  );
}
