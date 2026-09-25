const PROMISES = [
  {
    title: "No ads. Ever.",
    body: "We will never put advertising in the software.",
  },
  {
    title: "No subscriptions.",
    body: "If something costs money, you buy it once.",
  },
  {
    title: "No tracking.",
    body: "Your data stays with you. The apps don’t phone home.",
  },
  {
    title: "No kill switch.",
    body: "It runs on your computer. No account. No server we can unplug.",
  },
] as const;

export function StudioPromises() {
  return (
    <section
      id="promises"
      aria-labelledby="studio-promises-heading"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 scroll-mt-8"
    >
      <div className="border-y-2 border-afterburn bg-ink-elevated px-6 py-12 sm:px-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-afterburn-soft uppercase">
            Our promises
          </p>
          <h2
            id="studio-promises-heading"
            className="mt-3 font-display text-2xl font-extrabold tracking-tight text-snow sm:text-3xl"
          >
            We mean these.
          </h2>

          <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
            {PROMISES.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-lg font-bold tracking-tight text-snow sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog sm:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-3xl border-t border-white/10 pt-8">
            <h3 className="font-display text-lg font-bold tracking-tight text-snow sm:text-xl">
              Free forever — when we say it.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fog sm:text-base">
              Skagway and 15CE Flasher stay free for life. That’s a guarantee,
              not a launch deal.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-fog/80 sm:text-base">
              We’ll ship updates and support as long as we can. Someday that
              ends — operating systems move on. What we will never do is shut
              the software off from our side.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
