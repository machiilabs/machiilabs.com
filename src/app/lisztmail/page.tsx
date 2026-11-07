import type { Metadata } from "next";
import Image from "next/image";
import { AnnouncementSignup } from "@/components/announcement-signup";
import { SiteHeader } from "@/components/site-header";

const DESCRIPTION =
  "Liszt Mail is a private email app for Mac, iPhone and iPad from Mach II Labs. Decide on each message once, read your inbox in sections that explain themselves, and keep your mail on your own devices. Coming soon.";

export const metadata: Metadata = {
  title: "Liszt Mail — Private email for Mac, iPhone & iPad (coming soon)",
  description: DESCRIPTION,
  openGraph: {
    title: "Liszt Mail — Make your inbox a short list",
    description: DESCRIPTION,
    url: "https://machiilabs.com/lisztmail",
  },
  twitter: {
    card: "summary",
    title: "Liszt Mail — Make your inbox a short list",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://machiilabs.com/lisztmail",
  },
};

type Point = {
  title: string;
  body: string;
};

// What the app does today: nothing here promises an unbuilt feature.
const points: Point[] = [
  {
    title: "Decide once, move on.",
    body: "Clear what’s done, keep what’s waiting, pin what needs you. The screen changes the moment you act, and your mail server catches up behind you. Anything can be undone.",
  },
  {
    title: "An inbox that explains itself.",
    body: "Priority, People, Newsletters and Notifications, each in its own section. New senders wait for you to accept or block them. Every placement tells you why it’s there.",
  },
  {
    title: "Private by design.",
    body: "No tracking, no analytics, no ads. Remote images and tracking pixels stay blocked until you allow them. Passwords live in your Keychain, and your mail stays on your devices.",
  },
  {
    title: "Every account in one place.",
    body: "Gmail with Sign in with Google, iCloud, Yahoo, Fastmail and any IMAP account, side by side on your Mac, iPhone and iPad.",
  },
  {
    title: "Fast with years of mail.",
    body: "Opening, clearing and searching don’t wait on the network. Your mail is kept on your device, so the app stays quick however much of it you have.",
  },
  {
    title: "Pay once. Every update included.",
    body: "One price includes apps for your Mac, iPhone and iPad, and every future version is yours too. No subscription, no upgrade fees, no account to create with us.",
  },
];

export default function LisztMailPage() {
  return (
    <div className="relative min-h-dvh bg-ink text-snow">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 sky-drift"
          style={{
            background: `
              radial-gradient(110% 70% at 80% 0%, rgba(61, 111, 154, 0.35) 0%, transparent 55%),
              radial-gradient(80% 50% at 10% 90%, rgba(232, 160, 69, 0.14) 0%, transparent 50%),
              linear-gradient(165deg, #05080f 0%, #0a1220 42%, #081018 100%)
            `,
          }}
        />
      </div>

      <SiteHeader bordered={false} hero className="relative z-10" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-6 sm:px-10 sm:pt-8">
        <section className="max-w-2xl">
          <Image
            src="/lisztmail/app-icon.svg"
            alt=""
            width={1024}
            height={1024}
            unoptimized
            priority
            className="anim-rise mb-8 h-20 w-20 sm:h-24 sm:w-24"
          />
          <p className="anim-rise font-display text-[0.7rem] font-semibold tracking-[0.28em] text-afterburn-soft uppercase sm:text-xs">
            Coming soon · Mac, iPhone and iPad
          </p>

          {/* The Liszt[Mail] wordmark (Design/brand in the app's repo); screen readers get the name. */}
          <h1 className="anim-rise anim-rise-delay-1 mt-5">
            <span className="sr-only">Liszt Mail</span>
            <Image
              src="/lisztmail/wordmark-on-dark.svg"
              alt=""
              width={1796}
              height={420}
              unoptimized
              priority
              className="h-[clamp(2.5rem,7.5vw,4.25rem)] w-auto"
            />
          </h1>

          <p className="anim-rise anim-rise-delay-2 mt-6 font-display text-2xl leading-snug font-semibold tracking-tight text-snow sm:text-3xl">
            Make your inbox a short list.
          </p>

          <p className="anim-rise anim-rise-delay-3 mt-5 text-lg leading-relaxed text-fog sm:text-xl">
            A native email app that separates the mail that matters from the
            mail that doesn’t, and keeps all of it on your own devices.
          </p>
        </section>

        <section aria-labelledby="liszt-points" className="mt-16 sm:mt-20">
          <h2 id="liszt-points" className="sr-only">
            What Liszt Mail does
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3">
            {points.map((point) => (
              <div key={point.title}>
                <h3 className="font-display text-xl font-bold tracking-tight text-snow sm:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-fog">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <AnnouncementSignup />
        </section>
      </main>
    </div>
  );
}
