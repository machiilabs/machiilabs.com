import { Inter } from "next/font/google";
import {
  SKAGWAY_UPCOMING,
  skagwayVersionLabel,
} from "@/lib/skagway-releases";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

function ComingSoonInner({
  headingId,
  variant,
}: {
  headingId: string;
  variant: "home" | "product";
}) {
  if (!SKAGWAY_UPCOMING) return null;

  return (
    <>
      <p
        id={headingId}
        className="inline-flex items-center rounded-full bg-[#1a140c] px-3 py-1 text-[0.7rem] font-semibold tracking-[0.2em] text-afterburn-soft uppercase"
      >
        {SKAGWAY_UPCOMING.eyebrow} ·{" "}
        {skagwayVersionLabel(SKAGWAY_UPCOMING.version)}
      </p>
      <p
        className={`${inter.className} mt-5 max-w-2xl text-xl font-bold tracking-tight text-[#1a140c] sm:text-2xl`}
      >
        {SKAGWAY_UPCOMING.lede}
      </p>
      {variant === "product" ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {SKAGWAY_UPCOMING.highlights.map((item) => (
            <div key={item.title} className="border-t border-[#1a140c]/12 pt-4">
              <h2 className="font-display text-lg font-bold tracking-tight text-[#1a140c] sm:text-xl">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4a4033] sm:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {SKAGWAY_UPCOMING.highlights.map((item) => (
            <li
              key={item.title}
              className="flex gap-2.5 text-sm leading-relaxed text-[#3d3428] sm:text-base"
            >
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-afterburn"
              />
              {item.homeLine}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#4a4033] sm:text-base">
        {SKAGWAY_UPCOMING.closer}
      </p>
    </>
  );
}

export function SkagwayComingSoon({
  variant,
}: {
  variant: "home" | "product";
}) {
  if (!SKAGWAY_UPCOMING) return null;

  if (variant === "product") {
    return (
      <section
        aria-labelledby="skagway-coming-soon"
        className="relative left-1/2 mt-16 w-screen max-w-[100vw] -translate-x-1/2 sm:mt-20"
      >
        <div className="border-y-2 border-afterburn bg-[#f6ead4] px-6 py-14 sm:px-10 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <ComingSoonInner
              headingId="skagway-coming-soon"
              variant="product"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="home-coming-soon"
      className="max-w-3xl rounded-xl border-2 border-afterburn bg-[#f6ead4] px-5 py-6 shadow-[0_0_48px_rgba(232,160,69,0.2)] sm:px-7 sm:py-8"
    >
      <ComingSoonInner headingId="home-coming-soon" variant="home" />
    </section>
  );
}
