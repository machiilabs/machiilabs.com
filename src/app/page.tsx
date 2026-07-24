import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink text-snow">
      {/* Full-bleed atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sky-drift"
        style={{
          background: `
            radial-gradient(120% 80% at 70% 110%, rgba(61, 111, 154, 0.45) 0%, transparent 55%),
            radial-gradient(90% 60% at 15% 20%, rgba(232, 160, 69, 0.12) 0%, transparent 50%),
            linear-gradient(165deg, #05080f 0%, #0a1220 42%, #081018 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="horizon-glow pointer-events-none absolute inset-x-0 bottom-0 h-[42vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(232, 160, 69, 0.22) 0%, rgba(61, 111, 154, 0.18) 35%, transparent 100%)",
        }}
      />
      {/* Velocity lines */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vapor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(120,170,210,0)" />
            <stop offset="40%" stopColor="rgba(120,170,210,0.35)" />
            <stop offset="100%" stopColor="rgba(232,160,69,0.15)" />
          </linearGradient>
        </defs>
        <g stroke="url(#vapor)" strokeWidth="1" fill="none">
          <path d="M-40 62% L110% 48%" />
          <path d="M-40 68% L110% 56%" opacity="0.7" />
          <path d="M-40 74% L110% 63%" opacity="0.45" />
        </g>
      </svg>

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-24 sm:px-10 sm:pb-20 lg:justify-center lg:pb-24 lg:pt-20">
        <p className="anim-rise font-display text-[0.7rem] font-semibold tracking-[0.28em] text-fog uppercase sm:text-xs">
          Independent software lab
        </p>

        <h1 className="anim-rise anim-rise-delay-1 mt-5 font-display text-[clamp(3.25rem,12vw,8.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-snow">
          Mach&nbsp;II
          <span className="block text-afterburn-soft">Labs</span>
        </h1>

        <p className="anim-rise anim-rise-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-fog sm:text-xl">
          Serious Mac software, built with intent — tools that respect your
          files, your time, and how craft feels in the hand.
        </p>

        <div className="anim-rise anim-rise-delay-3 mt-10 flex flex-col gap-5 sm:gap-6">
          <a
            href="mailto:support@machiilabs.com"
            className="group relative inline-flex w-fit items-center font-display text-base font-semibold tracking-wide text-snow transition-colors hover:text-afterburn-soft"
          >
            Contact the lab
            <span
              aria-hidden
              className="cta-underline absolute -bottom-1 left-0 h-px w-full bg-afterburn"
            />
          </a>
          <Link
            href="/skagway"
            className="max-w-lg text-base leading-snug text-fog transition-colors hover:text-afterburn-soft sm:text-lg"
          >
            Try our full-powered Video Collection Library tool, Skagway
            — free forever!
          </Link>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mach II Labs</span>
          <a
            href="mailto:support@machiilabs.com"
            className="transition-colors hover:text-snow"
          >
            support@machiilabs.com
          </a>
        </div>
      </footer>
    </div>
  );
}
